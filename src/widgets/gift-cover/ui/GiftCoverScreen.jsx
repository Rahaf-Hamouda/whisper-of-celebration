import { useCallback, useEffect, useRef, useState } from 'react';
import { eventConfig } from '../../../shared/config/eventConfig';
import { GlassCard } from '../../../shared/ui/GlassCard';
import { OpenGiftButton } from '../../../features/open-gift/ui/OpenGiftButton';

const COVER_STARS = [
  { top: '14%', left: '10%', size: 3, delay: '0s' },
  { top: '24%', left: '82%', size: 2, delay: '1.1s' },
  { top: '56%', left: '90%', size: 3, delay: '2.2s' },
  { top: '70%', left: '7%', size: 2, delay: '0.6s' },
  { top: '38%', left: '48%', size: 2, delay: '2.8s' },
  { top: '10%', left: '62%', size: 2, delay: '1.7s' },
];

export function GiftCoverScreen({ onOpen }) {
  const { cover, recipient, occasion } = eventConfig;
  const [isLeaving, setIsLeaving] = useState(false);
  const timerRef = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current);
    },
    [],
  );

  const handleOpen = useCallback(() => {
    if (isLeaving) return;
    setIsLeaving(true);
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    timerRef.current = window.setTimeout(onOpen, prefersReducedMotion ? 30 : 700);
  }, [isLeaving, onOpen]);

  return (
    <section
      className={`relative flex min-h-svh flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-14 ${
        isLeaving ? 'cover-leaving' : ''
      }`}
    >
      <div className="w-full max-w-xl md:max-w-4xl">
        <div className="animate-fade-up">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-wine-300/35 via-cream-200/40 to-wine-200/35 blur-3xl"
            />

            <GlassCard className="cover-card group overflow-hidden rounded-[2.25rem] p-0">
              <div className="md:grid md:grid-cols-[1.05fr_1fr]">
              <div className="relative overflow-hidden bg-gradient-to-br from-wine-950 via-wine-900 to-wine-800 px-6 pb-6 pt-5 sm:px-8 md:flex md:flex-col md:justify-center md:py-8">
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-28 h-64 w-64 rounded-full border border-white/10"
                />
                <div
                  aria-hidden="true"
                  className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-cream-400/15 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute right-1/3 top-4 h-40 w-40 rounded-full bg-wine-400/25 blur-3xl"
                />
                {COVER_STARS.map((star, index) => (
                  <span
                    key={`${star.left}-${index}`}
                    aria-hidden="true"
                    className="animate-twinkle absolute rounded-full bg-cream-100/80"
                    style={{
                      top: star.top,
                      left: star.left,
                      width: star.size,
                      height: star.size,
                      animationDelay: star.delay,
                    }}
                  />
                ))}

                <div className="relative flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.2em] text-cream-100 backdrop-blur-md">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3 w-3 text-cream-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3c.6 4.7 1.8 5.9 6.5 6.5-4.7.6-5.9 1.8-6.5 6.5-.6-4.7-1.8-5.9-6.5-6.5C10.2 8.9 11.4 7.7 12 3Z" />
                    </svg>
                    {cover.badge}
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.22em] text-white/55">
                    {cover.eyebrow} · {occasion.year}
                  </span>
                </div>

                <div className="envelope-scene relative mb-1 mt-16 md:mt-10" aria-hidden="true">
                  <div className="envelope">
                    <div className="envelope-back" />
                    <div className="envelope-letter">
                      <span className="envelope-letter-heading">
                        <span className="envelope-letter-label">إلى</span>
                        <span className="envelope-letter-name">{recipient.name}</span>
                      </span>
                      <span className="envelope-letter-line" />
                      <span className="envelope-letter-note">بكل الحب</span>
                    </div>
                    <div className="envelope-flap" />
                    <div className="envelope-pocket" />
                    <div className="envelope-seal">{recipient.initial}</div>
                  </div>
                </div>

                <div className="relative mx-auto mt-4 flex w-fit max-w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-medium tracking-wide text-white/75 backdrop-blur-md">
                  <span
                    aria-hidden="true"
                    className="animate-pulse-glow h-1.5 w-1.5 shrink-0 rounded-full bg-cream-300"
                  />
                  <span className="truncate">
                    {occasion.label} · {occasion.subtitle}
                  </span>
                </div>
              </div>

              <div className="relative flex flex-col justify-center px-6 pb-8 pt-7 text-center sm:px-10 sm:pb-9 md:py-10">
                <p className="text-[11px] font-extrabold tracking-[0.3em] text-cream-700">
                  {recipient.honorific} · {recipient.name}
                </p>
                <h1 className="mt-3 font-serif text-3xl leading-snug text-wine-950 sm:text-4xl">
                  {cover.title}
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-stone-600">
                  {cover.description}
                </p>
                <OpenGiftButton
                  onOpen={handleOpen}
                  label={cover.cta}
                  hint={cover.hint}
                />
              </div>
              </div>
            </GlassCard>
          </div>

          <p className="mt-5 text-center text-[11px] font-medium tracking-[0.22em] text-wine-600">
            {cover.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
