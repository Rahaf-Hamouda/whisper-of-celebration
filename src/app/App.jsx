import { useCallback, useEffect, useState } from 'react';
import './styles/index.css';
import { eventConfig } from '../shared/config/eventConfig';
import { CelebrationPage } from '../pages/celebration/ui/CelebrationPage';

const BACKGROUND_STARS = [
  { top: '9%', left: '12%', size: 2, delay: '0s', tone: 'bg-wine-400/60' },
  { top: '16%', left: '84%', size: 3, delay: '1.2s', tone: 'bg-cream-500/60' },
  { top: '24%', left: '42%', size: 2, delay: '2.1s', tone: 'bg-wine-300/60' },
  { top: '32%', left: '68%', size: 2, delay: '0.7s', tone: 'bg-cream-400/60' },
  { top: '41%', left: '8%', size: 3, delay: '2.8s', tone: 'bg-wine-400/40' },
  { top: '48%', left: '92%', size: 2, delay: '1.7s', tone: 'bg-cream-500/50' },
  { top: '56%', left: '26%', size: 2, delay: '3.4s', tone: 'bg-wine-300/50' },
  { top: '63%', left: '74%', size: 2, delay: '0.4s', tone: 'bg-cream-400/50' },
  { top: '71%', left: '15%', size: 3, delay: '2.4s', tone: 'bg-cream-500/40' },
  { top: '78%', left: '58%', size: 2, delay: '1.1s', tone: 'bg-wine-400/50' },
  { top: '86%', left: '88%', size: 2, delay: '3.1s', tone: 'bg-wine-300/50' },
  { top: '92%', left: '34%', size: 2, delay: '0.9s', tone: 'bg-cream-400/50' },
];

export default function App() {
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  useEffect(() => {
    document.title = eventConfig.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', eventConfig.meta.description);
  }, []);

  useEffect(() => {
    if (isGiftOpen) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [isGiftOpen]);

  const handleOpenGift = useCallback(() => setIsGiftOpen(true), []);

  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#fbf6ec] font-sans text-stone-700">
      <a href="#main" className="skip-link">
        تجاوز إلى المحتوى
      </a>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="aurora-base absolute inset-0" />
        <div className="orb orb--wine -right-40 -top-44 h-[34rem] w-[34rem] bg-wine-300/40" />
        <div className="orb orb--cream -left-48 top-1/4 h-[30rem] w-[30rem] bg-cream-300/45" />
        <div className="orb orb--rose bottom-[-18rem] left-[18%] h-[38rem] w-[38rem] bg-wine-200/45" />
        <div className="star-field absolute inset-0" />
        {BACKGROUND_STARS.map((star, index) => (
          <span
            key={`${star.top}-${star.left}-${index}`}
            className={`animate-twinkle absolute rounded-full ${star.tone}`}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
        <div className="grain-overlay absolute inset-0" />
      </div>

      <CelebrationPage
        isGiftOpen={isGiftOpen}
        onOpenGift={handleOpenGift}
      />
    </div>
  );
}
