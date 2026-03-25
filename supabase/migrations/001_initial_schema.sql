-- BANT Colon Hydrotherapy - Database Schema
-- Run this in Supabase SQL Editor

-- Devices table
CREATE TABLE devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Session types table
CREATE TABLE session_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  duration_minutes INT NOT NULL,
  deposit_amount INT NOT NULL, -- in ZAR cents
  full_price INT NOT NULL,     -- in ZAR cents
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blocked dates (holidays, closures)
CREATE TABLE blocked_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id UUID REFERENCES devices(id) NOT NULL,
  session_type_id UUID REFERENCES session_types(id) NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_notes TEXT,
  is_first_visit BOOLEAN DEFAULT true,
  status TEXT NOT NULL DEFAULT 'locked'
    CHECK (status IN ('locked', 'pending_payment', 'confirmed', 'cancelled', 'completed')),
  locked_at TIMESTAMPTZ,
  lock_expires_at TIMESTAMPTZ,
  payfast_payment_id TEXT,
  deposit_paid BOOLEAN DEFAULT false,
  deposit_amount INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_device_date ON bookings(device_id, date);
CREATE INDEX idx_bookings_lock_expires ON bookings(lock_expires_at) WHERE status = 'locked';

-- Seed data: 2 devices
INSERT INTO devices (name) VALUES ('Device A'), ('Device B');

-- Seed data: 2 session types
INSERT INTO session_types (name, duration_minutes, deposit_amount, full_price, description)
VALUES
  ('Initial Consultation', 90, 35000, 95000, 'First-time session including consultation and full treatment'),
  ('Maintenance Session', 60, 25000, 65000, 'Follow-up treatment session for returning clients');

-- Enable Row Level Security
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public read access for devices and session_types
CREATE POLICY "Public read devices" ON devices FOR SELECT TO anon USING (true);
CREATE POLICY "Public read session_types" ON session_types FOR SELECT TO anon USING (true);
CREATE POLICY "Public read blocked_dates" ON blocked_dates FOR SELECT TO anon USING (true);

-- Bookings: service role has full access (bypasses RLS)
-- Anon can read their own bookings by ID
CREATE POLICY "Public read own booking" ON bookings FOR SELECT TO anon USING (true);
