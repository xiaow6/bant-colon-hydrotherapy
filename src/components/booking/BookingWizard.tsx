'use client';

import { useReducer, useCallback } from 'react';
import type { BookingState, BookingStep, SessionType, TimeSlot, ClientDetails } from '@/types/booking';
import SessionTypeSelect from './SessionTypeSelect';
import DatePicker from './DatePicker';
import SlotPicker from './SlotPicker';
import ClientDetailsForm from './ClientDetailsForm';
import PaymentStep from './PaymentStep';
import { ChevronLeft } from 'lucide-react';

type Action =
  | { type: 'SET_SESSION_TYPE'; payload: SessionType }
  | { type: 'SET_DATE'; payload: Date }
  | { type: 'SET_SLOT'; payload: { slot: TimeSlot; deviceId: string } }
  | { type: 'SET_CLIENT_DETAILS'; payload: ClientDetails }
  | { type: 'SET_BOOKING_LOCKED'; payload: { bookingId: string; lockExpiresAt: string } }
  | { type: 'SET_STEP'; payload: BookingStep }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

const initialState: BookingState = {
  step: 1,
  sessionType: null,
  selectedDate: null,
  selectedSlot: null,
  selectedDeviceId: null,
  clientDetails: null,
  bookingId: null,
  lockExpiresAt: null,
  isLoading: false,
  error: null,
};

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'SET_SESSION_TYPE':
      return { ...state, sessionType: action.payload, step: 2, error: null };
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload, step: 3, error: null };
    case 'SET_SLOT':
      return {
        ...state,
        selectedSlot: action.payload.slot,
        selectedDeviceId: action.payload.deviceId,
        step: 4,
        error: null,
      };
    case 'SET_CLIENT_DETAILS':
      return { ...state, clientDetails: action.payload, error: null };
    case 'SET_BOOKING_LOCKED':
      return {
        ...state,
        bookingId: action.payload.bookingId,
        lockExpiresAt: new Date(action.payload.lockExpiresAt),
        step: 5,
        error: null,
      };
    case 'SET_STEP':
      return { ...state, step: action.payload, error: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const stepLabels = ['Session', 'Date', 'Time', 'Details', 'Payment'];

export default function BookingWizard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleBack = useCallback(() => {
    if (state.step > 1) {
      dispatch({ type: 'SET_STEP', payload: (state.step - 1) as BookingStep });
    }
  }, [state.step]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {stepLabels.map((label, i) => {
            const stepNum = (i + 1) as BookingStep;
            const isActive = state.step >= stepNum;
            return (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-aqua-700 text-white'
                      : 'bg-sage-100 text-foreground/40'
                  }`}
                >
                  {stepNum}
                </div>
                <span
                  className={`text-xs hidden sm:block ${
                    isActive ? 'text-aqua-700 font-medium' : 'text-foreground/40'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="h-1.5 bg-sage-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-aqua-600 rounded-full transition-all duration-500"
            style={{ width: `${((state.step - 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Back button */}
      {state.step > 1 && state.step < 5 && (
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-foreground/50 hover:text-foreground/70 mb-4 transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      )}

      {/* Error */}
      {state.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {state.error}
        </div>
      )}

      {/* Steps */}
      {state.step === 1 && (
        <SessionTypeSelect
          onSelect={(st) => dispatch({ type: 'SET_SESSION_TYPE', payload: st })}
        />
      )}
      {state.step === 2 && (
        <DatePicker
          onSelect={(d) => dispatch({ type: 'SET_DATE', payload: d })}
        />
      )}
      {state.step === 3 && state.sessionType && state.selectedDate && (
        <SlotPicker
          sessionType={state.sessionType}
          date={state.selectedDate}
          onSelect={(slot, deviceId) =>
            dispatch({ type: 'SET_SLOT', payload: { slot, deviceId } })
          }
        />
      )}
      {state.step === 4 && state.selectedSlot && state.selectedDeviceId && state.sessionType && state.selectedDate && (
        <ClientDetailsForm
          sessionType={state.sessionType}
          date={state.selectedDate}
          slot={state.selectedSlot}
          deviceId={state.selectedDeviceId}
          isLoading={state.isLoading}
          onSubmit={async (details) => {
            dispatch({ type: 'SET_CLIENT_DETAILS', payload: details });
            dispatch({ type: 'SET_LOADING', payload: true });

            try {
              // Lock the slot
              const lockRes = await fetch('/api/booking/lock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  date: state.selectedDate!.toISOString().split('T')[0],
                  start_time: state.selectedSlot!.start_time,
                  end_time: state.selectedSlot!.end_time,
                  session_type_id: state.sessionType!.id,
                  device_id: state.selectedDeviceId,
                }),
              });

              if (!lockRes.ok) {
                const err = await lockRes.json();
                dispatch({ type: 'SET_ERROR', payload: err.error || 'Failed to reserve slot' });
                return;
              }

              const lockData = await lockRes.json();

              // Confirm with client details
              const confirmRes = await fetch('/api/booking/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  booking_id: lockData.booking_id,
                  client_name: details.name,
                  client_email: details.email,
                  client_phone: details.phone,
                  client_notes: details.notes,
                }),
              });

              if (!confirmRes.ok) {
                const err = await confirmRes.json();
                dispatch({ type: 'SET_ERROR', payload: err.error || 'Failed to confirm booking' });
                return;
              }

              const confirmData = await confirmRes.json();

              dispatch({
                type: 'SET_BOOKING_LOCKED',
                payload: {
                  bookingId: lockData.booking_id,
                  lockExpiresAt: lockData.lock_expires_at,
                },
              });

              // Store PayFast data in sessionStorage for the payment step
              sessionStorage.setItem(
                'payfast_data',
                JSON.stringify(confirmData)
              );
            } catch {
              dispatch({ type: 'SET_ERROR', payload: 'Something went wrong. Please try again.' });
            } finally {
              dispatch({ type: 'SET_LOADING', payload: false });
            }
          }}
        />
      )}
      {state.step === 5 && state.bookingId && state.lockExpiresAt && state.sessionType && (
        <PaymentStep
          bookingId={state.bookingId}
          lockExpiresAt={state.lockExpiresAt}
          sessionType={state.sessionType}
          onExpired={() => {
            dispatch({ type: 'SET_ERROR', payload: 'Your slot reservation has expired. Please start over.' });
            dispatch({ type: 'RESET' });
          }}
        />
      )}
    </div>
  );
}
