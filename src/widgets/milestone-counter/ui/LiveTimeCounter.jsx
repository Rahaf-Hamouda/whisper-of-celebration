import { useEffect, useMemo, useState } from 'react';
import {
  eventConfig,
  formatEventDate,
} from '../../../shared/config/eventConfig';
import { GlassCard } from '../../../shared/ui/GlassCard';

const arabicNumber = new Intl.NumberFormat('ar-EG', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

const UNIT_ORDER = ['days', 'hours', 'minutes', 'seconds'];

const UNIT_ACCENTS = {
  days: 'from-wine-800 to-wine-500',
  hours: 'from-cream-700 to-cream-500',
  minutes: 'from-wine-600 to-wine-300',
  seconds: 'from-cream-600 to-wine-400',
};

function splitDuration(distance) {
  const totalSeconds = Math.floor(distance / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function LiveTimeCounter() {
  const targetTime = useMemo(
    () => new Date(eventConfig.occasion.date).getTime(),
    [],
  );
  const formattedDate = useMemo(() => formatEventDate(), []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const isCountdown =
    eventConfig.counter.mode === 'until' || targetTime > now;
  const distance = Math.max(0, Math.abs(targetTime - now));
  const parts = splitDuration(distance);

  const directionLabel = isCountdown
    ? eventConfig.counter.untilLabel
    : eventConfig.counter.sinceLabel;

  const accessibleSummary = `${directionLabel} ${eventConfig.counter.targetLabel}: ${parts.days} ${eventConfig.counter.units.days}، ${parts.hours} ${eventConfig.counter.units.hours}، ${parts.minutes} ${eventConfig.counter.units.minutes}، ${parts.seconds} ${eventConfig.counter.units.seconds}.`;

  return (
    <section
      aria-labelledby="counter-title"
      className="section-shell relative z-10 -mt-4 pb-10 sm:-mt-10"
    >
      <GlassCard glow="cream" className="overflow-hidden p-6 sm:p-9">
        <span
          aria-hidden="true"
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cream-400/80 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-cream-200/40 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 text-wine-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {directionLabel} {eventConfig.counter.targetLabel}
            </span>

            <h2
              id="counter-title"
              className="mt-4 text-2xl font-extrabold leading-snug text-wine-950 sm:text-3xl"
            >
              {eventConfig.counter.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              {eventConfig.counter.description}
            </p>
          </div>

          <div className="flex w-fit max-w-full items-center gap-2 rounded-2xl border border-wine-100 bg-wine-50/70 px-4 py-3 text-xs font-bold text-wine-700">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-wine-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18" />
            </svg>
            <span>{eventConfig.counter.targetLabel}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cream-500" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div
          role="timer"
          aria-label={accessibleSummary}
          aria-live="off"
          className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {UNIT_ORDER.map((unit) => (
            <div
              key={unit}
              className="group relative overflow-hidden rounded-2xl border border-wine-100/80 bg-gradient-to-b from-white/95 to-wine-50/70 px-3 py-4 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-wine-200 hover:shadow-glass-soft sm:py-5"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-8 top-0 h-0.5 rounded-full bg-gradient-to-r ${UNIT_ACCENTS[unit]} opacity-70`}
              />
              <span
                key={`${unit}-${parts[unit]}`}
                className={[
                  'block tabular-nums text-3xl font-extrabold text-wine-900 sm:text-4xl',
                  unit === 'seconds' ? 'animate-tick' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {arabicNumber.format(parts[unit])}
              </span>
              <span className="mt-1 block text-[11px] font-bold tracking-wide text-stone-500">
                {eventConfig.counter.units[unit]}
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-10 bottom-0 h-px bg-gradient-to-r ${UNIT_ACCENTS[unit]} opacity-25`}
              />
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
