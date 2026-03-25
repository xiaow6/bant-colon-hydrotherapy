import Image from 'next/image';
import Link from 'next/link';
import { BENEFITS } from '@/lib/constants';

export default function BenefitsGrid() {
  return (
    <section className="py-20 bg-sage-50" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-aqua-900 mb-4">
            Benefits of Colon Hydrotherapy
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Discover how colon hydrotherapy can support your overall health and wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, i) => (
            <Link
              key={i}
              href="/book"
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-heading text-xl font-semibold text-white">
                  {benefit.title}
                </h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {benefit.description}
                </p>
                <span className="inline-block mt-3 text-sm font-semibold text-aqua-600 group-hover:text-aqua-700 transition-colors">
                  Book a session &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
