import { GiftCoverScreen } from '../../../widgets/gift-cover/ui/GiftCoverScreen';
import { HeroDedication } from '../../../widgets/hero-dedication/ui/HeroDedication';
import { LiveTimeCounter } from '../../../widgets/milestone-counter/ui/LiveTimeCounter';
import { MemoryTimeline } from '../../../widgets/memory-timeline/ui/MemoryTimeline';
import { WishesSection } from '../../../widgets/wishes-wall/ui/WishesSection';
import { DedicationFooter } from '../../../widgets/footer-signature/ui/DedicationFooter';

export function CelebrationPage({ isGiftOpen, onOpenGift }) {
  if (!isGiftOpen) {
    return (
      <main id="main" className="relative z-10">
        <GiftCoverScreen onOpen={onOpenGift} />
      </main>
    );
  }

  return (
    <main id="main" className="relative z-10">
      <HeroDedication />
      <LiveTimeCounter />
      <MemoryTimeline />
      <WishesSection />
      <DedicationFooter />
    </main>
  );
}
