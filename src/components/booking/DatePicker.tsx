'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  format,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from 'date-fns';
import { cn } from '@/lib/utils';

interface Props {
  onSelect: (date: Date) => void;
}

export default function DatePicker({ onSelect }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = useMemo(() => startOfDay(new Date()), []);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    const daysArr: Date[] = [];
    let day = start;
    while (day <= end) {
      daysArr.push(day);
      day = addDays(day, 1);
    }
    return daysArr;
  }, [currentMonth]);

  const isDisabled = (date: Date) => {
    if (isBefore(date, today)) return true;
    // Disable Sundays
    if (date.getDay() === 0) return true;
    return false;
  };

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-2xl font-bold text-aqua-900">Select a Date</h2>
      <p className="text-foreground/60 text-sm">Choose a date for your appointment.</p>

      <div className="bg-white border border-sage-100 rounded-xl p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className="p-2 hover:bg-sage-50 rounded-lg transition-colors"
            disabled={isSameMonth(currentMonth, today)}
          >
            <ChevronLeft size={20} className="text-foreground/50" />
          </button>
          <h3 className="font-heading font-semibold text-aqua-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-sage-50 rounded-lg transition-colors"
          >
            <ChevronRight size={20} className="text-foreground/50" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="text-center text-xs font-medium text-foreground/40 py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            const disabled = isDisabled(day) || !isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, today);
            return (
              <button
                key={i}
                onClick={() => !disabled && onSelect(day)}
                disabled={disabled}
                className={cn(
                  'h-10 rounded-lg text-sm transition-colors relative',
                  disabled
                    ? 'text-foreground/20 cursor-not-allowed'
                    : 'text-foreground/70 hover:bg-aqua-100 hover:text-aqua-800 cursor-pointer',
                  isToday && !disabled && 'font-bold text-aqua-700',
                  !isSameMonth(day, currentMonth) && 'invisible'
                )}
              >
                {format(day, 'd')}
                {isToday && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-aqua-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
