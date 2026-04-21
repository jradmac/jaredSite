import { Link } from 'react-router-dom';
import Aurora from '../components/Aurora';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedContent from '../components/AnimatedContent';
import GradientText from '../components/GradientText';
import ShinyText from '../components/ShinyText';

export default function ContractSuccess() {
  return (
    <div className="noise relative min-h-screen overflow-x-hidden bg-ink text-paper grid place-items-center px-5">
      <div className="absolute inset-0 -z-0 opacity-50 pointer-events-none">
        <Aurora
          colorStops={['#ff6a3d', '#7c5cff', '#22d3ee']}
          amplitude={0.9}
          blend={0.4}
          speed={0.6}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full">
        <AnimatedContent distance={30} direction="vertical" duration={0.7}>
          <SpotlightCard
            className="text-center p-8! sm:p-12!"
            spotlightColor="rgba(34, 211, 238, 0.3)"
          >
            <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs text-accent3 mb-4">
              Confirmed
            </p>

            <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05] mb-4">
              You're{' '}
              <GradientText
                colors={['#ff6a3d', '#7c5cff', '#22d3ee', '#ff6a3d']}
                animationSpeed={6}
                className="inline-block"
              >
                all set
              </GradientText>
              .
            </h1>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
              Payment successful and the contract is now active. A receipt was emailed to you, and
              your card is saved for automatic monthly billing.
            </p>

            <Link
              to="/"
              className="inline-block rounded-full bg-paper text-ink font-medium px-6 sm:px-8 py-3 text-sm sm:text-base hover:scale-105 transition-transform"
            >
              <ShinyText text="Back to home" speed={4} className="text-ink font-medium" />
            </Link>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </div>
  );
}
