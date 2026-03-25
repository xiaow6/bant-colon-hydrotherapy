'use client';

import { useState, useEffect } from 'react';
import type { SessionType, TimeSlot } from '@/types/booking';
import { format } from 'date-fns';
import { formatTimeDisplay } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Clock, Users } from 'lucide-react';

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

  const availableSlots = slots.filter((s) => s.available_devices.length > 0);
  const totalDevices = slots.length > 0 ? slots[0].total_devices : 2;

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-2xl font-bold text-aqua-900">Select a Time</h2>
      <p className="text-foreground/60 text-sm">
        {format(date, 'EEEE, d MMMM yyyy')} &mdash; {sessionType.name} ({sessionType.duration_minutes} min)
      </p>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-foreground/50">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-aqua-100 border border-aqua-300" />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-50 border border-amber-300" />
          Almost full
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-red-50 border border-red-200" />
          Fully booked
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-sage-50 rounded-xl animate-pulse" />
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
          <p className="text-foreground/60">No slots available for this date.</p>
          <p className="text-sm text-foreground/40 mt-1">Please try another date.</p>
        </div>
      )}

      {!loading && !error && slots.length > 0 && (
        <>
          {/* Summary */}
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <Users size={16} className="text-aqua-600" />
            <span>
              {totalDevices} devices &mdash;{' '}
              <strong className="text-aqua-700">{availableSlots.length}</strong> time slots available,{' '}
              <strong className="text-red-500">{slots.length - availableSlots.length}</strong> fully booked
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {slots.map((slot) => {
              const isAvailable = slot.available_devices.length > 0;
              const isAlmostFull = isAvailable && slot.booked_count > 0;
              const isFullyBooked = !isAvailable;

              return (
                <button
                  key={slot.start_time}
                  onClick={() => isAvailable && onSelect(slot, slot.available_devices[0])}
                  disabled={isFullyBooked}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all text-center relative',
                    isFullyBooked
                      ? 'bg-red-50/50 border-red-100 cursor-not-allowed opacity-60'
                      : isAlmostFull
                        ? 'bg-amber-50/30 border-amber-200 hover:border-amber-400 hover:bg-amber-50 cursor-pointer'
                        : 'bg-white border-sage-100 hover:border-aqua-400 hover:bg-aqua-50/30 cursor-pointer',
                  )}
                >
                  <div className={cn(
                    'font-semibold',
                    isFullyBooked ? 'text-foreground/40' : 'text-aqua-800'
                  )}>
                    {formatTimeDisplay(slot.start_time)}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-foreground/40 mt-1">
                    <Clock size={12} />
                    {formatTimeDisplay(slot.end_time)}
                  </div>

                  {/* Status badge */}
                  <div className={cn(
                    'mt-2 text-[11px] font-medium rounded-full px-2 py-0.5 inline-block',
                    isFullyBooked
                      ? 'bg-red-100 text-red-600'
                      : isAlmostFull
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-aqua-100 text-aqua-700',
                  )}>
                    {isFullyBooked
                      ? 'Fully booked'
                      : `${slot.available_devices.length}/${totalDevices} available`}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
