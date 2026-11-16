import { useRef } from 'react';
import { triggerConfetti } from '../lib/triggerConfetti';

export function OpenGiftButton({ onOpen, label, hint }) {
  const buttonRef = useRef(null);

  const handleClick = () => {
    const rect = buttonRef.current?.getBoundingClientRect();

    triggerConfetti({
      origin:
        rect && typeof window !== 'undefined'
          ? {
              x: (rect.left + rect.width / 2) / window.innerWidth,
              y: (rect.top + rect.height / 2) / window.innerHeight,
            }
          : undefined,
    });

    onOpen?.();
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        className="cta-shine group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-l from-wine-900 via-wine-700 to-wine-600 px-8 py-4 text-base font-extrabold text-white shadow-glow ring-1 ring-white/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-16px_rgba(97,31,48,0.75)] active:translate-y-0 active:scale-[0.99] sm:px-10 sm:text-lg"
      >
        <span
          aria-hidden="true"
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-6"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 12v8H4v-8" />
            <path d="M2 7h20v5H2z" />
            <path d="M12 22V7" />
            <path d="M12 7H7.5A2.5 2.5 0 1 1 10 4.5L12 7Zm0 0h4.5A2.5 2.5 0 1 0 14 4.5L12 7Z" />
          </svg>
        </span>
        <span className="relative">{label}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="relative h-4 w-4 text-cream-200 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5m7 7-7-7 7-7" />
        </svg>
      </button>

      {hint ? (
        <p className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-wine-700/90">
          <span aria-hidden="true" className="text-cream-600">
            ✦
          </span>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
