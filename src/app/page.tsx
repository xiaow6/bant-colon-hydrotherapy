import HeroSection from '@/components/home/HeroSection';
import ScarcityBanner from '@/components/home/ScarcityBanner';
import ValueProposition from '@/components/home/ValueProposition';
import BenefitsGrid from '@/components/home/BenefitsGrid';
import EmotionalSelling from '@/components/home/EmotionalSelling';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScarcityBanner />
      <ValueProposition />
      <BenefitsGrid />
      <EmotionalSelling />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
