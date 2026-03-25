'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { formatTimeDisplay } from '@/lib/utils';
import { BUSINESS_ADDRESS, BUSINESS_PHONE, WHATSAPP_URL } from '@/lib/constants';
import { Suspense } from 'react';

interface BookingDetails {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  client_name: string;
  status: string;
  session_types: {
    name: string;
    duration_minutes: number;
  };
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id');
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId || !supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('bookings')
        .select('*, session_types(*)')
        .eq('id', bookingId)
        .single();
      setBooking(data as BookingDetails | null);
      setLoading(false);
    }
    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-12 h-12 border-4 border-aqua-200 border-t-aqua-600 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-foreground/60">Loading your booking details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-20">
        <h2 className="font-heading text-2xl font-bold text-aqua-900 mb-4">Booking Not Found</h2>
        <p className="text-foreground/60 mb-6">We couldn&apos;t find this booking. Please contact us for assistance.</p>
        <Link href="/book" className="text-aqua-600 font-semibold hover:underline">
          Book a new session
        </Link>
      </div>
    );
  }

  const isConfirmed = booking.status === 'confirmed';
  const dateObj = new Date(booking.date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isConfirmed ? 'bg-green-100' : 'bg-amber-100'}`}>
        <CheckCircle2 size={40} className={isConfirmed ? 'text-green-600' : 'text-amber-600'} />
      </div>

      <h1 className="font-heading text-3xl font-bold text-aqua-900 mb-2">
        {isConfirmed ? 'Booking Confirmed!' : 'Payment Pending'}
      </h1>
      <p className="text-foreground/60 mb-8">
        {isConfirmed
          ? `Thank you, ${booking.client_name.split(' ')[0]}! Your appointment has been confirmed.`
          : 'Your booking is being processed. You\'ll receive confirmation shortly.'}
      </p>

      {/* Booking details card */}
      <div className="bg-white border border-sage-100 rounded-2xl p-6 text-left space-y-4 mb-8">
        <h3 className="font-heading font-semibold text-aqua-900">{booking.session_types.name}</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar size={18} className="text-aqua-500 shrink-0" />
            <span className="text-foreground/70">{dateStr}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock size={18} className="text-aqua-500 shrink-0" />
            <span className="text-foreground/70">
              {formatTimeDisplay(booking.start_time)} &ndash; {formatTimeDisplay(booking.end_time)}
            </span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MapPin size={18} className="text-aqua-500 shrink-0 mt-0.5" />
            <span className="text-foreground/70">{BUSINESS_ADDRESS}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone size={18} className="text-aqua-500 shrink-0" />
            <span className="text-foreground/70">{BUSINESS_PHONE}</span>
          </div>
        </div>
      </div>

      {/* Preparation tips */}
      <div className="bg-sage-50 rounded-xl p-5 text-left mb-8">
        <h3 className="font-heading font-semibold text-aqua-900 mb-3">Before Your Appointment</h3>
        <ul className="space-y-2 text-sm text-foreground/60">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua-500 mt-1.5 shrink-0" />
            Do not eat 2 hours before your appointment
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua-500 mt-1.5 shrink-0" />
            Drink plenty of water up to one hour before
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua-500 mt-1.5 shrink-0" />
            Eat light meals and avoid heavy foods
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua-500 mt-1.5 shrink-0" />
            Avoid alcohol before your session
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-aqua-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-aqua-800 transition-colors"
        >
          Return to Home
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border-2 border-sage-200 text-foreground/70 px-6 py-3 rounded-full font-semibold hover:bg-sage-50 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="pt-20 pb-16">
      <section className="py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-aqua-200 border-t-aqua-600 rounded-full animate-spin mx-auto" />
            </div>
          }>
            <ConfirmationContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
