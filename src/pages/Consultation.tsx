import { Link } from 'react-router-dom';
import Aurora from '../components/Aurora';
import AnimatedContent from '../components/AnimatedContent';
import GradientText from '../components/GradientText';
import ClickSpark from '../components/ClickSpark';
import AIOrb from '../components/AIOrb';
import LeadForm from '../components/LeadForm';
import { ArrowLeft } from 'lucide-react';

export default function Consultation() {
  return (
    <ClickSpark sparkColor="#ff6a3d" sparkRadius={16} sparkCount={8} duration={500}>
      <div className="noise relative min-h-screen overflow-x-hidden bg-ink text-paper">
        <main className="relative z-10">
          <section className="relative min-h-screen overflow-hidden px-5 sm:px-6 pt-16 pb-20 sm:pt-20 sm:pb-28">
            <div className="absolute inset-0 -z-0 opacity-50">
              <Aurora
                colorStops={['#ff6a3d', '#7c5cff', '#22d3ee']}
                amplitude={0.9}
                blend={0.5}
                speed={0.6}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/55 to-ink pointer-events-none" />

            <div className="relative z-10 max-w-2xl w-full mx-auto">
              <AnimatedContent distance={40} duration={0.8}>
                <div className="text-center mb-9 sm:mb-12">
                  <Link to="/products/custom-ai" className="flex flex-col items-center gap-3 mb-6">
                    <AIOrb size={64} />
                    <span className="font-display text-base font-semibold tracking-[0.25em] uppercase">
                      Custom AI Solutions
                    </span>
                  </Link>
                  <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-5">
                    Book your{' '}
                    <GradientText
                      colors={['#ff6a3d', '#7c5cff', '#ff6a3d']}
                      animationSpeed={5}
                      className="inline-block"
                    >
                      free consultation
                    </GradientText>
                    .
                  </h1>
                  <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                    Tell us a little about your business and we’ll map your highest-ROI automation —
                    free, with no obligation. We reply within one business day.
                  </p>
                </div>
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" delay={0.15} duration={0.8}>
                <LeadForm />

                <div className="mt-8 text-center">
                  <Link
                    to="/products/custom-ai"
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-paper transition-colors"
                  >
                    <ArrowLeft size={16} strokeWidth={1.5} />
                    Back to Custom AI Solutions
                  </Link>
                </div>
              </AnimatedContent>
            </div>
          </section>
        </main>
      </div>
    </ClickSpark>
  );
}
