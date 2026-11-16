import { useState } from 'react';
import {
  eventConfig,
  formatEventDate,
} from '../../../shared/config/eventConfig';
import { GlassCard } from '../../../shared/ui/GlassCard';
import { TypewriterText } from '../../../features/typewriter-message/ui/TypewriterText';

function OccasionMark({ type }) {
  const marks = {
    graduation: (
      <>
        <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" />
        <path d="M5.5 11v4.2c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8V11" />
        <path d="M21.5 9v5" />
      </>
    ),
    engagement: (
      <>
        <circle cx="9" cy="14.5" r="4.5" />
        <circle cx="15" cy="14.5" r="4.5" />
        <path d="M12 5l2 3h-4l2-3Z" />
      </>
    ),
    milestone: (
      <>
        <path d="M12 3c.6 4.7 1.8 5.9 6.5 6.5-4.7.6-5.9 1.8-6.5 6.5-.6-4.7-1.8-5.9-6.5-6.5C10.2 8.9 11.4 7.7 12 3Z" />
        <path d="M18.5 16.5c.3 2.2.8 2.7 3 3-2.2.3-2.7.8-3 3-.3-2.2-.8-2.7-3-3 2.2-.3 2.7-.8 3-3Z" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {marks[type] ?? marks.milestone}
    </svg>
  );
}

export function HeroDedication() {
  const { recipient, hero, occasion, sender } = eventConfig;
  const [isTyped, setIsTyped] = useState(false);

  return (
    <section className="relative mx-auto flex min-h-[92svh] w-full max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-24 text-center sm:pb-24 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full border border-wine-200/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[48%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-cream-200/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-52 h-64 w-64 -translate-x-1/2 rounded-full bg-wine-300/25 blur-[90px]"
      />
      <span
        aria-hidden="true"
        className="animate-twinkle absolute left-[12%] top-40 h-1.5 w-1.5 rounded-full bg-wine-300"
      />
      <span
        aria-hidden="true"
        className="animate-twinkle absolute right-[15%] top-56 h-2 w-2 rounded-full bg-cream-400"
        style={{ animationDelay: '1.4s' }}
      />
      <span
        aria-hidden="true"
        className="animate-twinkle absolute bottom-40 left-[20%] h-1 w-1 rounded-full bg-wine-400"
        style={{ animationDelay: '2.6s' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <span className="eyebrow animate-fade-up">
          <span className="text-wine-600">
            <OccasionMark type={occasion.key} />
          </span>
          {occasion.label} · {occasion.subtitle}
        </span>

        <p
          className="animate-fade-up mt-7 font-serif text-xl text-wine-600 sm:text-2xl"
          style={{ animationDelay: '0.1s' }}
        >
          {recipient.honorific}
        </p>

        <h1
          className="heading-gradient animate-fade-up relative mt-1 font-sans text-[clamp(4.5rem,14vw,9rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ animationDelay: '0.18s' }}
        >
          {recipient.name}
        </h1>

        <div
          className="animate-fade-up mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] font-bold tracking-wide text-wine-600"
          style={{ animationDelay: '0.26s' }}
        >
          <span
            aria-hidden="true"
            className="h-px w-10 bg-gradient-to-l from-wine-300 to-transparent"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 text-cream-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 11h18" />
          </svg>
          <span>{formatEventDate()}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cream-500" />
          <span>{hero.kicker}</span>
          <span
            aria-hidden="true"
            className="h-px w-10 bg-gradient-to-r from-wine-300 to-transparent"
          />
        </div>

        <GlassCard
          className="animate-fade-up relative mt-10 w-full max-w-3xl overflow-hidden px-6 py-9 sm:px-12 sm:py-12"
          style={{ animationDelay: '0.34s' }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-wine-300/70 to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-cream-200/45 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-wine-200/40 blur-3xl"
          />

          <div className="relative flex items-center justify-center gap-2 text-[10px] font-extrabold tracking-[0.28em] text-cream-700">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3c.6 4.7 1.8 5.9 6.5 6.5-4.7.6-5.9 1.8-6.5 6.5-.6-4.7-1.8-5.9-6.5-6.5C10.2 8.9 11.4 7.7 12 3Z" />
            </svg>
            {hero.badge}
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-l from-cream-300 to-transparent"
            />
          </div>

          <div className="relative mt-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 right-0 font-serif text-[6rem] leading-none text-wine-200/60"
            >
              ”
            </span>
            <TypewriterText
              text={hero.dedication}
              speed={32}
              startDelay={900}
              onComplete={() => setIsTyped(true)}
              className="relative block font-serif text-lg leading-[2.15] text-wine-950 sm:text-[1.55rem] sm:leading-[2.05]"
            />
          </div>

          <div
            className={`relative mt-7 flex items-center justify-center gap-3 transition-all duration-700 ${
              isTyped ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            <span
              aria-hidden="true"
              className="h-px w-12 bg-gradient-to-l from-wine-300 to-transparent sm:w-16"
            />
            <p className="font-serif text-sm text-wine-700 sm:text-base">
              {sender.signature}،{' '}
              <span className="font-bold text-wine-900">{sender.name}</span>
            </p>
            <span
              aria-hidden="true"
              className="h-px w-12 bg-gradient-to-r from-wine-300 to-transparent sm:w-16"
            />
          </div>
        </GlassCard>

        <div
          className="animate-fade-in mt-12 flex flex-col items-center gap-3"
          style={{ animationDelay: '0.9s' }}
        >
          <p className="text-[11px] font-bold tracking-[0.18em] text-wine-600">
            {hero.scrollHint}
          </p>
          <span className="motion-safe:animate-bounce flex h-9 w-9 items-center justify-center rounded-full border border-wine-200/80 bg-white/60 text-wine-600 shadow-sm backdrop-blur-sm">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14m7-7-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
