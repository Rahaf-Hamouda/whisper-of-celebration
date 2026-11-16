import { eventConfig, formatEventDate } from '../../../shared/config/eventConfig';

export function DedicationFooter() {
  const { footer, sender, recipient } = eventConfig;

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="relative overflow-hidden px-5 pb-10 pt-16 sm:pb-12 sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-60 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-t from-wine-100/70 to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="h-px w-full bg-gradient-to-l from-transparent via-wine-200 to-transparent" />

        <div className="pt-14 text-center">
          <span
            aria-hidden="true"
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-wine-200/80 bg-white/70 font-serif text-2xl text-wine-700 shadow-glass-soft backdrop-blur-md"
          >
            {recipient.initial}
          </span>

          <p className="mx-auto mt-7 max-w-2xl font-serif text-2xl leading-[1.9] text-wine-950 sm:text-3xl sm:leading-[1.8]">
            {footer.quote}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
            {footer.closing}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-l from-wine-200 to-transparent sm:w-16"
            />
            <p className="font-serif text-base text-wine-700 sm:text-lg">
              {sender.signature}،{' '}
              <span className="font-bold text-wine-900">{sender.name}</span>
            </p>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-wine-200 to-transparent sm:w-16"
            />
          </div>

          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-wine-100/80 bg-white/60 px-4 py-1.5 text-[11px] font-medium text-stone-600 backdrop-blur-sm">
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
            {formatEventDate()}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-wine-100/80 pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-wine-600">
            {footer.madeWith}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3 w-3 text-wine-600"
              fill="currentColor"
            >
              <path d="M20.8 8.6c0 5.2-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.6A4.4 4.4 0 0 1 12 6.1a4.4 4.4 0 0 1 8.8 2.5Z" />
            </svg>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-wine-100 bg-white/70 px-4 py-2 text-[11px] font-bold text-wine-700 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-wine-200 hover:shadow-glass-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-wine-300/50"
          >
            {footer.top}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5m7 7-7-7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
