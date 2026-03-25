import { NextRequest, NextResponse } from 'next/server';
import { timesOverlap } from '@/lib/booking';
import { LOCK_DURATION_MINUTES } from '@/lib/constants';
import { isSupabaseConfigured, mock } from '@/lib/mock';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { date, start_time, end_time, session_type_id, device_id } = body;

  if (!date || !start_time || !end_time || !session_type_id || !device_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const now = new Date();
  const lockExpiresAt = new Date(now.getTime() + LOCK_DURATION_MINUTES * 60 * 1000);

  // --- Supabase mode ---
  if (isSupabaseConfigured()) {
    const { createServerClient } = await import('@/lib/supabase/server');
    const supabase = createServerClient();

    await supabase.from('bookings').delete().eq('status', 'locked').lt('lock_expires_at', now.toISOString());

    const { data: conflicts } = await supabase.from('bookings').select('*').eq('device_id', device_id).eq('date', date).in('status', ['locked', 'pending_payment', 'confirmed']);
    const hasConflict = (conflicts || []).some((b) => timesOverlap(start_time, end_time, b.start_time, b.end_time));

    if (hasConflict) {
      return NextResponse.json({ error: 'This slot is no longer available. Please choose another time.' }, { status: 409 });
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({ device_id, session_type_id, date, start_time, end_time, client_name: 'Pending', client_email: 'pending@temp.com', client_phone: '0000000000', status: 'locked', locked_at: now.toISOString(), lock_expires_at: lockExpiresAt.toISOString() })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to lock slot' }, { status: 500 });
    }

    return NextResponse.json({ booking_id: booking.id, lock_expires_at: lockExpiresAt.toISOString() });
  }

  // --- Mock mode ---
  mock.cleanExpiredLocks();

  const bookings = mock.getBookingsForDate(date);
  const hasConflict = bookings.some((b) => b.device_id === device_id && timesOverlap(start_time, end_time, b.start_time, b.end_time));

  if (hasConflict) {
    return NextResponse.json({ error: 'This slot is no longer available. Please choose another time.' }, { status: 409 });
  }

  const booking = mock.createBooking({
    device_id,
    session_type_id,
    date,
    start_time,
    end_time,
    client_name: 'Pending',
    client_email: 'pending@temp.com',
    client_phone: '0000000000',
    client_notes: null,
    status: 'locked',
    locked_at: now.toISOString(),
    lock_expires_at: lockExpiresAt.toISOString(),
    deposit_amount: null,
    deposit_paid: false,
  });

  return NextResponse.json({ booking_id: booking.id, lock_expires_at: lockExpiresAt.toISOString() });
}
