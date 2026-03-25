import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2, Shield, Sparkles, ShieldCheck } from 'lucide-react';
import { WHATSAPP_URL, BUSINESS_PHONE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Feel Lighter, Healthier & More Energised — Naturally',
  description: 'Safe, gentle colon hydrotherapy designed to support digestion and total wellness. Book your session today at BANT Colon Hydrotherapy in Roodepoort.',
};

const benefits = [
  'Reduce bloating',
  'Improve digestion',
  'Boost energy',
  'Support detox',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-aqua-900 via-aqua-800 to-aqua-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-aqua-600/30 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Feel Lighter, Healthier &amp; More Energised
            <span className="block text-aqua-300">&mdash; Naturally</span>
          </h1>
          <p className="text-lg md:text-xl text-aqua-100 mb-8 max-w-2xl mx-auto">
            Safe, gentle colon hydrotherapy designed to support digestion and total wellness.
          </p>

          {/* CTA 1 */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#25d366] text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-[#1fb855] transition-colors gap-2 shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book via WhatsApp Now
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-aqua-900 mb-6">
                What Colon Hydrotherapy Can Do for You
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={22} className="text-aqua-600 shrink-0" />
                    <span className="text-lg text-foreground/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[350px] rounded-2xl overflow-hidden">
              <Image
                src="/images/about/happy-people.png"
                alt="Happy clients after colon hydrotherapy"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="py-12 bg-aqua-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-aqua-900 mb-4">
            Ready to Feel the Difference?
          </h2>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#25d366] text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-[#1fb855] transition-colors gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book via WhatsApp Now
          </a>
        </div>
      </section>

      {/* Social Proof placeholder */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-aqua-900 mb-8">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-sage-50 rounded-xl p-6">
              <p className="text-foreground/70 italic mb-4">&ldquo;I felt lighter after just one session!&rdquo;</p>
              <p className="text-sm font-semibold text-aqua-800">&mdash; Client</p>
            </div>
            <div className="bg-sage-50 rounded-xl p-6">
              <p className="text-foreground/70 italic mb-4">&ldquo;The experience was so professional and comfortable. Highly recommend.&rdquo;</p>
              <p className="text-sm font-semibold text-aqua-800">&mdash; Client</p>
            </div>
            <div className="bg-sage-50 rounded-xl p-6">
              <p className="text-foreground/70 italic mb-4">&ldquo;My digestion has improved so much since starting treatments at BANT.&rdquo;</p>
              <p className="text-sm font-semibold text-aqua-800">&mdash; Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Shield size={28} className="text-aqua-600" />
              <span className="text-lg font-semibold text-aqua-900">Safe</span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles size={28} className="text-aqua-600" />
              <span className="text-lg font-semibold text-aqua-900">Hygienic</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={28} className="text-aqua-600" />
              <span className="text-lg font-semibold text-aqua-900">Professional</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 3 - Final */}
      <section className="py-16 md:py-20 bg-aqua-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Feel Lighter and Refreshed?
          </h2>
          <p className="text-aqua-200 text-lg mb-8">
            Book your session today: {BUSINESS_PHONE}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#25d366] text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-[#1fb855] transition-colors gap-2 shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book via WhatsApp Now
          </a>
        </div>
      </section>
    </div>
  );
}
