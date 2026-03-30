import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Benefits of Colon Hydrotherapy',
  description: 'Discover the benefits of colon hydrotherapy — improved digestion, detoxification, increased energy, skin rejuvenation, stress relief, and more.',
};

const benefits = [
  {
    title: 'Detoxification',
    description: 'Colon hydrotherapy supports your body\'s natural detoxification processes by gently removing accumulated waste from the colon. This can help reduce the toxic load on your liver and other organs, promoting overall internal cleanliness and improved organ function.',
    image: '/images/benefits/detox.jpeg',
  },
  {
    title: 'Improved Digestion',
    description: 'A clean colon can absorb nutrients more efficiently and promote regular, comfortable bowel movements. Many clients experience reduced bloating, less gas, and improved digestive comfort after their sessions.',
    image: '/images/benefits/digestion.jpeg',
  },
  {
    title: 'Increased Energy',
    description: 'When your digestive system is functioning optimally, your body doesn\'t need to expend as much energy on digestion. Many clients report feeling noticeably more energised and alert following their colon hydrotherapy sessions.',
    image: '/images/benefits/muscle-recovery.jpeg',
  },
  {
    title: 'Skin Rejuvenation',
    description: 'The skin is the body\'s largest organ and often reflects internal health. By supporting the removal of toxins through colon hydrotherapy, many clients notice improvements in their skin\'s clarity, texture, and overall appearance.',
    image: '/images/benefits/skin.jpeg',
  },
  {
    title: 'Stress Relief',
    description: 'The gut-brain connection is well-documented. A healthier gut can contribute to improved mood and reduced stress. Our calm, spa-like environment adds to the relaxation experience, helping you leave feeling both physically and mentally refreshed.',
    image: '/images/benefits/stress.jpeg',
  },
  {
    title: 'Better Sleep',
    description: 'Digestive discomfort can significantly impact sleep quality. By improving digestive function and reducing bloating, many clients find that they sleep more deeply and wake feeling more rested after a course of colon hydrotherapy.',
    image: '/images/benefits/sleep.jpeg',
  },
];

export default function BenefitsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-aqua-900 mb-6">
            Benefits of Colon Hydrotherapy
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Discover how gentle colon cleansing can support your overall health,
            energy, and vitality.
          </p>
        </div>
      </section>

      {/* Benefits - alternating layout */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              <div className={`relative rounded-2xl overflow-hidden h-[300px] lg:h-[400px] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-aqua-900 mb-4">
                  {benefit.title}
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  {benefit.description}
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center text-aqua-600 font-semibold hover:text-aqua-700 transition-colors"
                >
                  Book a session &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Before & After */}
      <section className="py-16 md:py-20 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-aqua-900 mb-4">
            The Difference Inside
          </h2>
          <p className="text-foreground/60 mb-8 max-w-2xl mx-auto">
            Colon hydrotherapy helps remove accumulated waste, supporting your body&apos;s
            natural detoxification and improving nutrient absorption.
          </p>
          <div className="relative rounded-2xl overflow-hidden max-w-xl mx-auto">
            <Image
              src="/images/infographic/before-after.jpeg"
              alt="Before and after colon hydrotherapy — cleaner, healthier colon"
              width={600}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Wellness Infographic */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-aqua-900 mb-8">
            Your Gut Controls More Than You Think
          </h2>
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/infographic/wellness-grid.png"
              alt="How colon hydrotherapy improves your overall wellness"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-aqua-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Experience These Benefits?
          </h2>
          <p className="text-aqua-200 mb-8">
            Book your first session and start your journey to better digestive wellness.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-white text-aqua-800 px-8 py-4 rounded-full font-bold hover:bg-aqua-50 transition-colors"
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </div>
  );
}
