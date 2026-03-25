import crypto from 'crypto';
import type { PayFastFormData } from '@/types/payfast';

const isSandbox = process.env.PAYFAST_SANDBOX === 'true';

export function getPayFastUrl(): string {
  return isSandbox
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process';
}

export function generatePayFastFormData(params: {
  bookingId: string;
  amount: number; // in cents
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  itemName: string;
}): PayFastFormData {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const data: Record<string, string> = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID || '',
    merchant_key: process.env.PAYFAST_MERCHANT_KEY || '',
    return_url: `${siteUrl}/book/confirmation?booking_id=${params.bookingId}`,
    cancel_url: `${siteUrl}/book?cancelled=true`,
    notify_url: `${siteUrl}/api/payfast/notify`,
    name_first: params.clientName.split(' ')[0],
    email_address: params.clientEmail,
    cell_number: params.clientPhone.replace(/\s/g, ''),
    m_payment_id: params.bookingId,
    amount: (params.amount / 100).toFixed(2),
    item_name: params.itemName,
    item_description: `Deposit for ${params.itemName}`,
  };

  const signature = generateSignature(data);
  return { ...data, signature } as PayFastFormData;
}

function generateSignature(data: Record<string, string>): string {
  const passphrase = process.env.PAYFAST_PASSPHRASE;

  // Build the parameter string in the order provided (not alphabetical for PayFast)
  const paramString = Object.entries(data)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, '+')}`)
    .join('&');

  const stringToSign = passphrase
    ? `${paramString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`
    : paramString;

  return crypto.createHash('md5').update(stringToSign).digest('hex');
}

export function validatePayFastSignature(
  data: Record<string, string>,
  receivedSignature: string
): boolean {
  const filteredData = { ...data };
  delete filteredData.signature;

  const paramString = Object.entries(filteredData)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, '+')}`)
    .join('&');

  const passphrase = process.env.PAYFAST_PASSPHRASE;
  const stringToSign = passphrase
    ? `${paramString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`
    : paramString;

  const calculatedSignature = crypto.createHash('md5').update(stringToSign).digest('hex');
  return calculatedSignature === receivedSignature;
}
