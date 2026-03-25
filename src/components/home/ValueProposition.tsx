import { Heart, Leaf, Users, Award } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Comfort-First Approach',
    description: 'Your comfort and dignity are our top priorities throughout every session.',
  },
  {
    icon: Leaf,
    title: 'Natural Wellness',
    description: 'Support your body\'s natural detoxification with gentle, water-based cleansing.',
  },
  {
    icon: Users,
    title: 'Personalised Care',
    description: 'Every session is tailored to your individual needs and wellness goals.',
  },
  {
    icon: Award,
    title: 'Professional Standards',
    description: 'Modern equipment, strict hygiene protocols, and trained practitioners.',
  },
];

export default function ValueProposition() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-aqua-900 mb-4">
            Why BANT?
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            At BANT Colon Hydrotherapy, we don&apos;t just offer treatments &mdash; we provide a
            transformational wellness experience designed to help you feel lighter,
            clearer, and more energised.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-aqua-50 flex items-center justify-center group-hover:bg-aqua-100 transition-colors">
                <feature.icon size={28} className="text-aqua-600" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-aqua-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
