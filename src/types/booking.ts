export interface SessionType {
  id: string;
  name: string;
  duration_minutes: number;
  deposit_amount: number;
  full_price: number;
  description: string;
  is_active: boolean;
}

export interface Device {
  id: string;
  name: string;
  is_active: boolean;
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  total_devices: number;
  available_devices: string[];
  booked_count: number;
}

export interface Booking {
  id: string;
  device_id: string;
  session_type_id: string;
  date: string;
  start_time: string;
  end_time: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_notes?: string;
  is_first_visit: boolean;
  status: 'locked' | 'pending_payment' | 'confirmed' | 'cancelled' | 'completed';
  locked_at?: string;
  lock_expires_at?: string;
  payfast_payment_id?: string;
  deposit_paid: boolean;
  deposit_amount: number;
}

export interface ClientDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
  isFirstVisit: boolean;
}

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingState {
  step: BookingStep;
  sessionType: SessionType | null;
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  selectedDeviceId: string | null;
  clientDetails: ClientDetails | null;
  bookingId: string | null;
  lockExpiresAt: Date | null;
  isLoading: boolean;
  error: string | null;
}
