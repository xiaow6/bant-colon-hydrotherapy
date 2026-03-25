'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { SessionType } from '@/types/booking';
import { Lock, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Props {
  bookingId: string;
  lockExpiresAt: Date;
  sessionType: SessionType;
  onExpired: () => void;
}

export default function PaymentStep({ bookingId, lockExpiresAt, sessionType, onExpired }: Props) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [payfastData, setPayfastData] = useState<{ payfast_url: string; payfast_data: Record<string, string> } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const onExpiredRef = useRef(onExpired);
  onExpiredRef.current = onExpired;

  useEffect(() => {
    const stored = sessionStorage.getItem('payfast_data');
    if (stored) {
      setPayfastData(JSON.parse(stored));
      sessionStorage.removeItem('payfast_data');
    }
  }, []);

  const updateTimer = useCallback(() => {
    const diff = Math.max(0, Math.floor((lockExpiresAt.getTime() - Date.now()) / 1000));
    setTimeLeft(diff);
    if (diff <= 0) {
      onExpiredRef.current();
    }
  }, [lockExpiresAt]);

  useEffect(() => {
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [updateTimer]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLow = timeLeft < 120;

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-aqua-900">Complete Payment</h2>

      {/* Timer */}
      <div className={`flex items-center gap-3 p-4 rounded-xl ${isLow ? 'bg-red-50 border border-red-200' : 'bg-aqua-50 border border-aqua-200'}`}>
        <Lock size={18} className={isLow ? 'text-red-500' : 'text-aqua-600'} />
        <div>
          <p className={`text-sm font-medium ${isLow ? 'text-red-700' : 'text-aqua-800'}`}>
            Your slot is reserved for{' '}
            <span className="font-bold">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </p>
          {isLow && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertTriangle size={12} />
              Please complete payment soon to keep your reservation.
            </p>
          )}
        </div>
      </div>

      {/* Payment summary */}
      <div className="bg-white border border-sage-100 rounded-xl p-5 space-y-3">
        <h3 className="font-heading font-semibold text-aqua-900">Payment Summary</h3>
        <div className="flex justify-between text-sm">
          <span className="text-foreground/60">{sessionType.name}</span>
          <span className="text-foreground/80">{formatCurrency(sessionType.full_price)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-foreground/60">Deposit due now</span>
          <span className="font-bold text-aqua-700">{formatCurrency(sessionType.deposit_amount)}</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-sage-100">
          <span className="text-foreground/60">Remaining (pay at clinic)</span>
          <span className="text-foreground/80">{formatCurrency(sessionType.full_price - sessionType.deposit_amount)}</span>
        </div>
      </div>

      {/* PayFast form / Mock redirect */}
      {payfastData ? (
        payfastData.payfast_data._mock ? (
          // Mock mode: direct link to confirmation
          <a
            href={payfastData.payfast_url}
            className="block w-full bg-aqua-700 text-white py-4 rounded-full font-bold text-lg hover:bg-aqua-800 transition-colors text-center"
          >
            Simulate Payment — {formatCurrency(sessionType.deposit_amount)}
          </a>
        ) : (
          <form ref={formRef} action={payfastData.payfast_url} method="POST">
            {Object.entries(payfastData.payfast_data).map(([key, value]) => (
              <input type="hidden" name={key} value={value} key={key} />
            ))}
            <button
              type="submit"
              className="w-full bg-aqua-700 text-white py-4 rounded-full font-bold text-lg hover:bg-aqua-800 transition-colors"
            >
              Pay Deposit — {formatCurrency(sessionType.deposit_amount)}
            </button>
          </form>
        )
      ) : (
        <div className="text-center py-8">
          <p className="text-foreground/60">Loading payment details...</p>
        </div>
      )}

      <p className="text-xs text-foreground/40 text-center">
        {payfastData?.payfast_data._mock
          ? 'Mock mode — no real payment will be processed. Click to simulate a successful payment.'
          : `You will be redirected to PayFast to complete your payment securely. The remaining balance of ${formatCurrency(sessionType.full_price - sessionType.deposit_amount)} is payable at the clinic.`}
      </p>
    </div>
  );
}
