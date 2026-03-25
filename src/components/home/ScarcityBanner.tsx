import { Clock } from 'lucide-react';

export default function ScarcityBanner() {
  return (
    <div className="bg-gold-300/10 border-y border-gold-300/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-2 text-sm">
        <Clock size={16} className="text-gold-500" />
        <span className="text-foreground/70">
          <strong className="text-gold-500">Only 5 new client slots</strong> available this week
        </span>
      </div>
    </div>
  );
}
