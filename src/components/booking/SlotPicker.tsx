'use client';

import { useState, useEffect } from 'react';
import type { SessionType, TimeSlot } from '@/types/booking';
import { format } from 'date-fns';
import { formatTimeDisplay } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface Props {
  sessionType: SessionType;
  date: Date;
  onSelect: (slot: TimeSlot, deviceId: string) => void;
}

export default function SlotPicker({ sessionType, date, onSelect }: Props) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      setError(null);
      try {
        const dateStr = format(date, 'yyyy-MM-dd');
        const res = await fetch(
          `/api/booking/slots?date=${dateStr}&session_type_id=${sessionType.id}`
        );
        if (!res.ok) throw new Error('Failed to fetch slots');
        const data = await res.json();
        setSlots(data.slots || []);
        if (data.blocked) {
          setError('This date is not available for bookings.');
        }
      } catch {
        setError('Failed to load available slots. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, [date, sessionType.id]);

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-2xl font-bold text-aqua-900">Select a Time</h2>
      <p className="text-foreground/60 text-sm">
        Available slots for {format(date, 'EEEE, d MMMM yyyy')} &mdash; {sessionType.name} ({sessionType.duration_minutes} min)
      </p>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-sage-50 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && slots.length === 0 && (
        <div className="p-6 bg-sage-50 rounded-xl text-center">
          <p className="text-foreground/60">No available slots for this date.</p>
          <p className="text-sm text-foreground/40 mt-1">Please try another date.</p>
        </div>
      )}

      {!loading && !error && slots.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {slots.map((slot) => (
            <button
              key={slot.start_time}
              onClick={() => onSelect(slot, slot.available_devices[0])}
              className="p-4 bg-white border-2 border-sage-100 rounded-xl hover:border-aqua-400 hover:bg-aqua-50/30 transition-all text-center group"
            >
              <div className="font-semibold text-aqua-800 group-hover:text-aqua-600">
                {formatTimeDisplay(slot.start_time)}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-foreground/40 mt-1">
                <Clock size={12} />
                {formatTimeDisplay(slot.end_time)}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
