import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Shield, Leaf, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about BANT Colon Hydrotherapy — our story, philosophy, and commitment to safe, accessible digestive wellness care in South Africa.',
};

const values = [
  { icon: Heart, title: 'Client Comfort', description: 'Every decision we make centres around your comfort and wellbeing.' },
  { icon: Shield, title: 'Safety First', description: 'Strict hygiene protocols and modern equipment for your peace of mind.' },
  { icon: Leaf, title: 'Natural Wellness', description: 'Supporting your body\'s own ability to cleanse and restore balance.' },
  { icon: Users, title: 'Personalised Approach', description: 'No two bodies are the same — we tailor every session to you.' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-aqua-900 mb-6">
                Our Story
              </h1>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  At BANT Colon Hydrotherapy, we believe that true wellness begins in the gut.
                  Our mission is to support your body&apos;s natural detoxification process through
                  safe and effective colon hydrotherapy treatments.
                </p>
                <p>
                  We provide a calm, private, and professional environment where your comfort
                  and dignity are our priority. Whether you are looking to improve digestion,
                  reduce bloating, boost energy, or begin a wellness journey, we are here to
                  guide and support you every step of the way.
                </p>
                <p>
                  Based in Roodepoort&apos;s Cascades Shopping Centre, we serve clients
                  from across the West Rand and greater Johannesburg area with modern,
                  state-of-the-art equipment and trained professionals.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[350px] lg:h-[450px]">
              <Image
                src="/images/clinic/treatment-female.jpeg"
                alt="Client relaxing during a colon hydrotherapy session at BANT"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Facility */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden h-[350px] lg:h-[400px] order-2 lg:order-1">
              <Image
                src="/images/clinic/equipment-empty.jpeg"
                alt="BANT modern colon hydrotherapy equipment"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-aqua-900 mb-6">
                Our Facility
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Our clinic features modern, state-of-the-art colon hydrotherapy equipment
                  in a calm, spa-like setting. Each treatment room is private, comfortable,
                  and designed to put you completely at ease.
                </p>
                <p>
                  We use single-use, disposable materials and follow strict hygiene protocols.
                  Your health and safety are non-negotiable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-20 bg-aqua-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-aqua-900 mb-6">
            Our Philosophy
          </h2>
          <blockquote className="text-2xl md:text-3xl font-heading italic text-aqua-700 mb-6">
            &ldquo;A healthy gut is the foundation of a healthy life.&rdquo;
          </blockquote>
          <p className="text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            We believe that digestive health is the cornerstone of overall wellbeing.
            When your gut is functioning optimally, you experience better energy,
            clearer thinking, improved immunity, and a greater sense of vitality.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-aqua-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-aqua-100 flex items-center justify-center">
                  <value.icon size={26} className="text-aqua-700" />
                </div>
                <h3 className="font-heading font-semibold text-aqua-900 mb-2">{value.title}</h3>
                <p className="text-sm text-foreground/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-aqua-900 mb-8">
            What Our Clients Say
          </h2>
          <blockquote className="text-lg text-foreground/70 italic leading-relaxed mb-4">
            &ldquo;I felt lighter and more energized after my session at BANT Colon Hydrotherapy.
            The environment was clean, professional, and very welcoming. Highly recommend!&rdquo;
          </blockquote>
          <p className="text-sm font-semibold text-aqua-700">&mdash; Happy Client</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-aqua-900 mb-4">
            Experience the BANT Difference
          </h2>
          <p className="text-foreground/60 mb-8">
            Ready to take the first step towards better digestive wellness?
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-aqua-700 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-aqua-800 transition-colors"
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </div>
  );
}
