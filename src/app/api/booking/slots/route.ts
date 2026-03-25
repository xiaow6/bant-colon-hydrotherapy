import { NextRequest, NextResponse } from 'next/server';
import { generateSlots, timesOverlap } from '@/lib/booking';
import { isSupabaseConfigured, mock } from '@/lib/mock';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const sessionTypeId = searchParams.get('session_type_id');

  if (!date || !sessionTypeId) {
    return NextResponse.json({ error: 'date and session_type_id are required' }, { status: 400 });
  }

  // --- Supabase mode ---
  if (isSupabaseConfigured()) {
    const { createServerClient } = await import('@/lib/supabase/server');
    const supabase = createServerClient();

    await supabase.from('bookings').delete().eq('status', 'locked').lt('lock_expires_at', new Date().toISOString());

    const { data: blocked } = await supabase.from('blocked_dates').select('id').eq('date', date).limit(1);
    if (blocked && blocked.length > 0) {
      return NextResponse.json({ date, slots: [], blocked: true });
    }

    const { data: sessionType, error: stError } = await supabase.from('session_types').select('*').eq('id', sessionTypeId).single();
    if (stError || !sessionType) {
      return NextResponse.json({ error: 'Invalid session type' }, { status: 400 });
    }

    const { data: devices } = await supabase.from('devices').select('*').eq('is_active', true);
    if (!devices || devices.length === 0) {
      return NextResponse.json({ date, slots: [] });
    }

    const { data: existingBookings } = await supabase.from('bookings').select('*').eq('date', date).in('status', ['locked', 'pending_payment', 'confirmed']);
    const bookings = existingBookings || [];

    const possibleSlots = generateSlots(sessionType.duration_minutes);
    const availableSlots = possibleSlots
      .map((slot) => ({
        start_time: slot.start,
        end_time: slot.end,
        available_devices: devices.filter((device) => !bookings.some((b) => b.device_id === device.id && timesOverlap(slot.start, slot.end, b.start_time, b.end_time))).map((d) => d.id),
      }))
      .filter((slot) => slot.available_devices.length > 0);

    return NextResponse.json({ date, slots: availableSlots });
  }

  // --- Mock mode ---
  mock.cleanExpiredLocks();

  const sessionType = mock.getSessionType(sessionTypeId);
  if (!sessionType) {
    return NextResponse.json({ error: 'Invalid session type' }, { status: 400 });
  }

  const devices = mock.getDevices();
  const bookings = mock.getBookingsForDate(date);
  const possibleSlots = generateSlots(sessionType.duration_minutes);

  const availableSlots = possibleSlots
    .map((slot) => ({
      start_time: slot.start,
      end_time: slot.end,
      available_devices: devices.filter((device) => !bookings.some((b) => b.device_id === device.id && timesOverlap(slot.start, slot.end, b.start_time, b.end_time))).map((d) => d.id),
    }))
    .filter((slot) => slot.available_devices.length > 0);

  return NextResponse.json({ date, slots: availableSlots });
}
