'use client';

import { useState, useEffect } from 'react';
import type { SessionType } from '@/types/booking';
import { Clock, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { supabase } from '@/lib/supabase/client';

// Fallback data when Supabase is not configured
const FALLBACK_SESSION_TYPES: SessionType[] = [
  {
    id: 'initial-consultation',
    name: 'Initial Consultation',
    duration_minutes: 90,
    deposit_amount: 35000,
    full_price: 95000,
    description: 'First-time session including consultation and full treatment',
    is_active: true,
  },
  {
    id: 'maintenance-session',
    name: 'Maintenance Session',
    duration_minutes: 60,
    deposit_amount: 25000,
    full_price: 65000,
    description: 'Follow-up treatment session for returning clients',
    is_active: true,
  },
];

interface Props {
  onSelect: (sessionType: SessionType) => void;
}

export default function SessionTypeSelect({ onSelect }: Props) {
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessionTypes() {
      if (!supabase) {
        setSessionTypes(FALLBACK_SESSION_TYPES);
        setLoading(false);
        return;
      }
      try {
        const { data } = await supabase
          .from('session_types')
          .select('*')
          .eq('is_active', true)
          .order('duration_minutes', { ascending: false });
        setSessionTypes(data && data.length > 0 ? data : FALLBACK_SESSION_TYPES);
      } catch {
        setSessionTypes(FALLBACK_SESSION_TYPES);
      }
      setLoading(false);
    }
    fetchSessionTypes();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-aqua-900">Choose Your Session</h2>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-sage-50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-2xl font-bold text-aqua-900">Choose Your Session</h2>
      <p className="text-foreground/60 text-sm">Select the type of session you&apos;d like to book.</p>
      <div className="space-y-3">
        {sessionTypes.map((st) => (
          <button
            key={st.id}
            onClick={() => onSelect(st)}
            className="w-full text-left p-5 bg-white border-2 border-sage-100 rounded-xl hover:border-aqua-400 hover:bg-aqua-50/30 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading font-semibold text-lg text-aqua-900 group-hover:text-aqua-700">
                  {st.name}
                </h3>
                <p className="text-sm text-foreground/60 mt-1">{st.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-sm text-foreground/50">
                    <Clock size={14} />
                    {st.duration_minutes} min
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-foreground/50">
                    <CreditCard size={14} />
                    {formatCurrency(st.deposit_amount)} deposit
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className="text-lg font-bold text-aqua-700">{formatCurrency(st.full_price)}</div>
                <div className="text-xs text-foreground/40">full price</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
