import { BUSINESS_HOURS, SLOT_INTERVAL_MINUTES } from './constants';
import { formatTime } from './utils';

export function generateSlots(durationMinutes: number): { start: string; end: string }[] {
  const slots: { start: string; end: string }[] = [];
  const startMinutes = BUSINESS_HOURS.open * 60;
  const endMinutes = BUSINESS_HOURS.close * 60;

  for (let m = startMinutes; m + durationMinutes <= endMinutes; m += SLOT_INTERVAL_MINUTES) {
    slots.push({
      start: formatTime(m),
      end: formatTime(m + durationMinutes),
    });
  }
  return slots;
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function timesOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string
): boolean {
  const aS = timeToMinutes(aStart);
  const aE = timeToMinutes(aEnd);
  const bS = timeToMinutes(bStart);
  const bE = timeToMinutes(bEnd);
  return aS < bE && bS < aE;
}
