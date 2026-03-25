'use client';

import { useState } from 'react';
import type { SessionType, TimeSlot, ClientDetails } from '@/types/booking';
import { format } from 'date-fns';
import { formatTimeDisplay, formatCurrency } from '@/lib/utils';
import { Calendar, Clock, CreditCard, Loader2 } from 'lucide-react';

interface Props {
  sessionType: SessionType;
  date: Date;
  slot: TimeSlot;
  deviceId: string;
  isLoading: boolean;
  onSubmit: (details: ClientDetails) => void;
}

export default function ClientDetailsForm({ sessionType, date, slot, isLoading, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Valid email is required';
    if (!phone.trim() || phone.replace(/\s/g, '').length < 10) newErrors.phone = 'Valid phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name, email, phone, notes, isFirstVisit });
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-aqua-900">Your Details</h2>

      {/* Booking summary */}
      <div className="bg-aqua-50/50 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-aqua-800">
          <Calendar size={16} />
          {format(date, 'EEEE, d MMMM yyyy')}
        </div>
        <div className="flex items-center gap-2 text-sm text-aqua-800">
          <Clock size={16} />
          {formatTimeDisplay(slot.start_time)} &ndash; {formatTimeDisplay(slot.end_time)}
        </div>
        <div className="flex items-center gap-2 text-sm text-aqua-800">
          <CreditCard size={16} />
          {sessionType.name} &mdash; Deposit: {formatCurrency(sessionType.deposit_amount)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300' : 'border-sage-200'} focus:outline-none focus:border-aqua-400 focus:ring-1 focus:ring-aqua-400 transition-colors`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-1">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300' : 'border-sage-200'} focus:outline-none focus:border-aqua-400 focus:ring-1 focus:ring-aqua-400 transition-colors`}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground/70 mb-1">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300' : 'border-sage-200'} focus:outline-none focus:border-aqua-400 focus:ring-1 focus:ring-aqua-400 transition-colors`}
            placeholder="070 123 4567"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-foreground/70 mb-1">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:border-aqua-400 focus:ring-1 focus:ring-aqua-400 transition-colors"
            placeholder="Any health conditions or questions..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="firstVisit"
            type="checkbox"
            checked={isFirstVisit}
            onChange={(e) => setIsFirstVisit(e.target.checked)}
            className="w-4 h-4 rounded border-sage-300 text-aqua-600 focus:ring-aqua-400"
          />
          <label htmlFor="firstVisit" className="text-sm text-foreground/60">
            This is my first visit
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-aqua-700 text-white py-4 rounded-full font-semibold hover:bg-aqua-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Reserving your slot...
            </>
          ) : (
            `Continue to Payment — ${formatCurrency(sessionType.deposit_amount)} deposit`
          )}
        </button>

        <p className="text-xs text-foreground/40 text-center">
          Your slot will be reserved for 10 minutes while you complete payment.
        </p>
      </form>
    </div>
  );
}
