import Image from 'next/image';

export default function EmotionalSelling() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px]">
            <Image
              src="/images/about/happy-people.png"
              alt="Happy, healthy people"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-aqua-900 mb-6">
              Feel the Difference
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p className="text-lg">Imagine:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-aqua-500 mt-2 shrink-0" />
                  <span>Waking up feeling lighter and more refreshed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-aqua-500 mt-2 shrink-0" />
                  <span>Having sustained energy throughout your day</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-aqua-500 mt-2 shrink-0" />
                  <span>Experiencing less discomfort and bloating</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-aqua-500 mt-2 shrink-0" />
                  <span>Feeling confident in your body and your health</span>
                </li>
              </ul>
              <p className="text-lg font-heading font-semibold text-aqua-800 pt-2">
                That&apos;s the BANT experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
