import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Get answers to common questions about colon hydrotherapy — safety, procedure, preparation, aftercare, and booking at BANT Colon Hydrotherapy.',
};

export default function FAQPage() {
  const allFaqs = FAQS.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })));

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-aqua-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-aqua-700 font-heading text-lg italic">
            Cleanse. Restore. Renew.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {FAQS.map((category, ci) => (
            <div key={ci} className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-aqua-800 mb-6 pb-2 border-b border-sage-200">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.items.map((faq, fi) => (
                  <details
                    key={fi}
                    className="group bg-white rounded-xl border border-sage-100 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-medium text-aqua-900 hover:bg-sage-50/50 transition-colors">
                      <span className="pr-4">{faq.question}</span>
                      <span className="shrink-0 text-aqua-500 transition-transform group-open:rotate-45 text-xl leading-none">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-foreground/70 leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-aqua-50/50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-aqua-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-foreground/60 mb-6">
            We&apos;re happy to help. Reach out via WhatsApp or book a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-aqua-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-aqua-800 transition-colors"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allFaqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
