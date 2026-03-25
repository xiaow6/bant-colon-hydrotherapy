import { Droplets, ShieldCheck, Flower2, UserCheck, Eye } from 'lucide-react';

const reasons = [
  { icon: Droplets, title: 'Modern, Gentle Systems', description: 'Modern, gentle hydrotherapy systems designed for maximum comfort and effectiveness.' },
  { icon: ShieldCheck, title: 'Strict Hygiene Protocols', description: 'Single-use disposable materials and thorough sanitisation — your health is non-negotiable.' },
  { icon: Flower2, title: 'Calm, Spa-Like Environment', description: 'A relaxing atmosphere designed to make you feel completely at ease.' },
  { icon: UserCheck, title: 'Personalised Client Care', description: 'Every session is tailored to your individual needs and wellness goals.' },
  { icon: Eye, title: 'Discreet & Professional', description: 'Your privacy and dignity are respected throughout every visit.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-aqua-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-aqua-900 mb-4">
            Why Choose BANT?
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            We set the standard for professional colon hydrotherapy in Roodepoort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-aqua-100 flex items-center justify-center mb-4">
                <reason.icon size={22} className="text-aqua-700" />
              </div>
              <h3 className="font-heading font-semibold text-aqua-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
