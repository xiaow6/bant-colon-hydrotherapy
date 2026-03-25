import Image from 'next/image';
import Link from 'next/link';
import { Shield, Sparkles, Lock } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-sage-50 via-white to-aqua-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-aqua-100/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-sage-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-aqua-100/60 rounded-full text-sm text-aqua-700 font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-aqua-500" />
              Professional Colon Hydrotherapy in Roodepoort
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-aqua-900 leading-tight mb-6">
              Gentle Colon Hydrotherapy for{' '}
              <span className="text-aqua-600">Total Body Wellness</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed">
              Restore your digestive health, energy, and vitality in a calm,
              private, and professional environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-aqua-700 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-aqua-800 transition-colors shadow-lg shadow-aqua-700/25"
              >
                Book Your Session
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-[#25d366] text-[#25d366] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#25d366]/5 transition-colors gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book via WhatsApp
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Shield size={18} className="text-aqua-600" />
                <span>Certified Practitioners</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Sparkles size={18} className="text-aqua-600" />
                <span>Hygienic Equipment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Lock size={18} className="text-aqua-600" />
                <span>Private Treatment Rooms</span>
              </div>
            </div>
          </div>

          {/* Image side - use the people collage which has no text */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[540px] rounded-3xl overflow-hidden shadow-2xl shadow-aqua-900/10">
              <Image
                src="/images/about/happy-people.png"
                alt="Happy, healthy people after colon hydrotherapy"
                fill
                className="object-cover"
                priority
                quality={85}
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
              <Image
                src="/images/logo/logo only.jpeg"
                alt="BANT"
                width={48}
                height={48}
                className="w-12 h-12 object-contain rounded-lg"
              />
              <div>
                <div className="text-sm font-bold text-aqua-900">BANT</div>
                <div className="text-xs text-foreground/50">Trusted Wellness Clinic</div>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 text-center">
              <div className="text-2xl font-bold text-aqua-700">500+</div>
              <div className="text-xs text-foreground/50">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
