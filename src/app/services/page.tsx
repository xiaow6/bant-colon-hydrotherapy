import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, CreditCard, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our colon hydrotherapy services — initial consultations, maintenance sessions, and detox packages. Book your session in Roodepoort today.',
};

const services = [
  {
    name: 'Initial Consultation',
    duration: '90 minutes',
    description: 'Perfect for first-time clients. Includes a comprehensive consultation to understand your health goals, followed by a full colon hydrotherapy session.',
    includes: [
      'Health & wellness consultation',
      'Full colon hydrotherapy session',
      'Personalised aftercare guidance',
      'Hydration & recovery support',
    ],
    image: '/images/benefits/detox.jpeg',
  },
  {
    name: 'Maintenance Session',
    duration: '60 minutes',
    description: 'For returning clients who want to maintain their digestive wellness. A focused treatment session to keep you feeling your best.',
    includes: [
      'Progress check-in',
      'Full colon hydrotherapy session',
      'Updated aftercare recommendations',
      'Hydration & recovery support',
    ],
    image: '/images/benefits/detox-alt.jpeg',
  },
];

const steps = [
  { step: 1, title: 'Book Online', description: 'Choose your session type, pick a date and time that works for you, and pay a deposit to secure your slot.' },
  { step: 2, title: 'Prepare', description: 'Follow our simple preparation guidelines — avoid eating 2 hours before and stay hydrated.' },
  { step: 3, title: 'Your Session', description: 'Arrive at our calm, private clinic. Your therapist will guide you through every step.' },
  { step: 4, title: 'Feel the Difference', description: 'Leave feeling lighter, refreshed, and energised. We provide aftercare guidance for best results.' },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-aqua-900 mb-6">
            Our Services
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A gentle, water-based cleansing process that supports the body&apos;s
            natural detoxification. Experience our comfort-first approach with
            modern equipment and guided, professional sessions.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sage-100 flex flex-col">
                <div className="relative h-56">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h2 className="font-heading text-2xl font-bold text-white">{service.name}</h2>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                      <Clock size={16} className="text-aqua-600" />
                      {service.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                      <CreditCard size={16} className="text-aqua-600" />
                      Deposit required
                    </div>
                  </div>
                  <p className="text-foreground/70 mb-5 leading-relaxed">{service.description}</p>
                  <div className="space-y-2 mb-6 flex-1">
                    {service.includes.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-foreground/70">
                        <CheckCircle2 size={16} className="text-sage-400 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/book"
                    className="block w-full text-center bg-aqua-700 text-white py-3 rounded-full font-semibold hover:bg-aqua-800 transition-colors"
                  >
                    Book This Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 md:py-20 bg-aqua-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-aqua-900 mb-12 text-center">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-aqua-700 text-white font-bold text-lg flex items-center justify-center">
                  {s.step}
                </div>
                <h3 className="font-heading font-semibold text-aqua-900 mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-aqua-900 mb-6">
            What Makes BANT Different?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-sage-50 rounded-xl p-6">
              <h3 className="font-heading font-semibold text-aqua-800 mb-2">Comfort-First Approach</h3>
              <p className="text-sm text-foreground/60">Your comfort is never compromised. We take the time to ensure you feel safe and relaxed.</p>
            </div>
            <div className="bg-sage-50 rounded-xl p-6">
              <h3 className="font-heading font-semibold text-aqua-800 mb-2">Modern Equipment</h3>
              <p className="text-sm text-foreground/60">We use modern, closed-system hydrotherapy equipment for the most gentle and effective experience.</p>
            </div>
            <div className="bg-sage-50 rounded-xl p-6">
              <h3 className="font-heading font-semibold text-aqua-800 mb-2">Guided Sessions</h3>
              <p className="text-sm text-foreground/60">Our trained therapists guide you through every step, ensuring a professional and supportive experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 md:py-20 bg-aqua-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-4">Packages Available</h2>
          <p className="text-aqua-200 mb-2">We offer single sessions, maintenance plans, and multi-session detox packages.</p>
          <p className="text-aqua-300 text-sm mb-8">Contact us to learn about current specials.</p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-white text-aqua-800 px-8 py-4 rounded-full font-bold hover:bg-aqua-50 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
