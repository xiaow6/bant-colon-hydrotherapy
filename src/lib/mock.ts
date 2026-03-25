// In-memory mock store for local development without Supabase

export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

const MOCK_DEVICES = [
  { id: 'device-a', name: 'Device A', is_active: true },
  { id: 'device-b', name: 'Device B', is_active: true },
];

const MOCK_SESSION_TYPES: Record<string, { name: string; duration_minutes: number; deposit_amount: number; full_price: number }> = {
  'initial-consultation': { name: 'Initial Consultation', duration_minutes: 90, deposit_amount: 35000, full_price: 95000 },
  'maintenance-session': { name: 'Maintenance Session', duration_minutes: 60, deposit_amount: 25000, full_price: 65000 },
};

// Simple in-memory booking store (resets on server restart)
interface MockBooking {
  id: string;
  device_id: string;
  session_type_id: string;
  date: string;
  start_time: string;
  end_time: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_notes: string | null;
  status: string;
  locked_at: string;
  lock_expires_at: string;
  deposit_amount: number | null;
  deposit_paid: boolean;
}

const mockBookings: MockBooking[] = [];

export const mock = {
  getDevices() {
    return MOCK_DEVICES;
  },

  getSessionType(id: string) {
    return MOCK_SESSION_TYPES[id] || null;
  },

  cleanExpiredLocks() {
    const now = new Date().toISOString();
    for (let i = mockBookings.length - 1; i >= 0; i--) {
      if (mockBookings[i].status === 'locked' && mockBookings[i].lock_expires_at < now) {
        mockBookings.splice(i, 1);
      }
    }
  },

  getBookingsForDate(date: string) {
    return mockBookings.filter(
      (b) => b.date === date && ['locked', 'pending_payment', 'confirmed'].includes(b.status)
    );
  },

  getBooking(id: string) {
    return mockBookings.find((b) => b.id === id) || null;
  },

  createBooking(booking: Omit<MockBooking, 'id'>): MockBooking {
    const newBooking: MockBooking = {
      ...booking,
      id: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
    mockBookings.push(newBooking);
    return newBooking;
  },

  updateBooking(id: string, updates: Partial<MockBooking>) {
    const idx = mockBookings.findIndex((b) => b.id === id);
    if (idx >= 0) {
      mockBookings[idx] = { ...mockBookings[idx], ...updates };
      return mockBookings[idx];
    }
    return null;
  },

  deleteBooking(id: string) {
    const idx = mockBookings.findIndex((b) => b.id === id);
    if (idx >= 0) mockBookings.splice(idx, 1);
  },
};
