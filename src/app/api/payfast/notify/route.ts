import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { validatePayFastSignature } from '@/lib/payfast';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  // Validate signature
  if (data.signature && !validatePayFastSignature(data, data.signature)) {
    return new NextResponse('Invalid signature', { status: 400 });
  }

  const bookingId = data.m_payment_id;
  const paymentStatus = data.payment_status;

  if (!bookingId) {
    return new NextResponse('Missing payment ID', { status: 400 });
  }

  const supabase = createServerClient();

  if (paymentStatus === 'COMPLETE') {
    const { error } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        deposit_paid: true,
        payfast_payment_id: data.pf_payment_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId);

    if (error) {
      console.error('Failed to confirm booking:', error);
      return new NextResponse('Database error', { status: 500 });
    }
  } else if (paymentStatus === 'CANCELLED') {
    await supabase.from('bookings').delete().eq('id', bookingId);
  }

  return new NextResponse('OK', { status: 200 });
}
