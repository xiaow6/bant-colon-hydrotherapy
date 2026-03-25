import { NextRequest, NextResponse } from 'next/server';
import { PAYMENT_EXTENSION_MINUTES } from '@/lib/constants';
import { isSupabaseConfigured, mock } from '@/lib/mock';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { booking_id, client_name, client_email, client_phone, client_notes } = body;

  if (!booking_id || !client_name || !client_email || !client_phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const extendedExpiry = new Date(Date.now() + PAYMENT_EXTENSION_MINUTES * 60 * 1000);

  // --- Supabase mode ---
  if (isSupabaseConfigured()) {
    const { createServerClient } = await import('@/lib/supabase/server');
    const { generatePayFastFormData, getPayFastUrl } = await import('@/lib/payfast');
    const supabase = createServerClient();

    const { data: booking, error: fetchError } = await supabase.from('bookings').select('*, session_types(*)').eq('id', booking_id).single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status !== 'locked') {
      return NextResponse.json({ error: 'Booking is not in locked state' }, { status: 400 });
    }

    if (new Date(booking.lock_expires_at) < new Date()) {
      await supabase.from('bookings').delete().eq('id', booking_id);
      return NextResponse.json({ error: 'Your slot reservation has expired. Please start over.' }, { status: 410 });
    }

    await supabase.from('bookings').update({
      client_name, client_email, client_phone, client_notes: client_notes || null,
      status: 'pending_payment', lock_expires_at: extendedExpiry.toISOString(),
      deposit_amount: booking.session_types.deposit_amount,
    }).eq('id', booking_id);

    const payFastData = generatePayFastFormData({
      bookingId: booking_id, amount: booking.session_types.deposit_amount,
      clientName: client_name, clientEmail: client_email, clientPhone: client_phone,
      itemName: `BANT - ${booking.session_types.name} Deposit`,
    });

    return NextResponse.json({ payfast_url: getPayFastUrl(), payfast_data: payFastData });
  }

  // --- Mock mode ---
  const booking = mock.getBooking(booking_id);

  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  if (booking.status !== 'locked') {
    return NextResponse.json({ error: 'Booking is not in locked state' }, { status: 400 });
  }

  if (new Date(booking.lock_expires_at) < new Date()) {
    mock.deleteBooking(booking_id);
    return NextResponse.json({ error: 'Your slot reservation has expired. Please start over.' }, { status: 410 });
  }

  const sessionType = mock.getSessionType(booking.session_type_id);
  const depositAmount = sessionType?.deposit_amount || 35000;

  mock.updateBooking(booking_id, {
    client_name, client_email, client_phone,
    client_notes: client_notes || null,
    status: 'pending_payment',
    lock_expires_at: extendedExpiry.toISOString(),
    deposit_amount: depositAmount,
  });

  // In mock mode, return fake PayFast data that points to the confirmation page directly
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Simulate confirming the booking immediately for local testing
  mock.updateBooking(booking_id, { status: 'confirmed', deposit_paid: true });

  return NextResponse.json({
    payfast_url: `${siteUrl}/book/confirmation?booking_id=${booking_id}`,
    payfast_data: {
      _mock: 'true',
      _message: 'Mock mode - PayFast is not configured. Click to simulate successful payment.',
    },
  });
}
