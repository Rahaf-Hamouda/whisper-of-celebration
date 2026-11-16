const wishNumber = new Intl.NumberFormat('ar-EG', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

const ACCENTS = {
  wine: {
    front: 'from-wine-100/90 via-white/90 to-cream-50/80',
    icon: 'from-wine-800 to-wine-500',
    label: 'text-wine-700',
    hint: 'text-wine-700',
    soft: 'bg-wine-100 text-wine-700',
    glow: 'bg-wine-300/30',
    hover: 'group-hover:border-wine-200',
    backGlow: 'bg-wine-400/25',
    bar: 'from-wine-600 via-wine-400 to-cream-400',
  },
  gold: {
    front: 'from-cream-100/90 via-white/90 to-wine-50/80',
    icon: 'from-cream-800 to-cream-600',
    label: 'text-cream-800',
    hint: 'text-cream-800',
    soft: 'bg-cream-100 text-cream-800',
    glow: 'bg-cream-300/40',
    hover: 'group-hover:border-cream-200',
    backGlow: 'bg-cream-400/20',
    bar: 'from-cream-600 via-cream-400 to-wine-300',
  },
  cream: {
    front: 'from-cream-50/90 via-white/90 to-wine-50/70',
    icon: 'from-wine-700 to-cream-700',
    label: 'text-wine-700',
    hint: 'text-wine-700',
    soft: 'bg-cream-100 text-wine-800',
    glow: 'bg-cream-200/50',
    hover: 'group-hover:border-cream-200',
    backGlow: 'bg-cream-300/20',
    bar: 'from-wine-700 via-cream-500 to-cream-300',
  },
};

function WishIcon({ name, className = 'h-5 w-5' }) {
  const paths = {
    flower: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      </>
    ),
    star: <path d="M12 3l2.6 5.8 6.4.6-4.8 4.3 1.4 6.3-5.6-3.3-5.6 3.3 1.4-6.3L3 9.4l6.4-.6L12 3Z" />,
    heart: (
      <path d="M20.8 8.6c0 5.2-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.6A4.4 4.4 0 0 1 12 6.1a4.4 4.4 0 0 1 8.8 2.5Z" />
    ),
    sparkle: (
      <>
        <path d="M12 3c.6 4.7 1.8 5.9 6.5 6.5-4.7.6-5.9 1.8-6.5 6.5-.6-4.7-1.8-5.9-6.5-6.5C10.2 8.9 11.4 7.7 12 3Z" />
        <path d="M19 16c.2 1.9.7 2.4 2.6 2.6-1.9.2-2.4.7-2.6 2.6-.2-1.9-.7-2.4-2.6-2.6 1.9-.2 2.4-.7 2.6-2.6Z" />
      </>
    ),
    moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
    ribbon: (
      <>
        <path d="M12 12c-2-3-4-4.2-6-3.2S4 13.8 6 14.8s4-.2 6-2.8Zm0 0c2-3 4-4.2 6-3.2s2 5 0 6-4-.2-6-2.8Z" />
        <path d="M12 12v7M9 22l3-3 3 3" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] ?? paths.sparkle}
    </svg>
  );
}

export function WishCard({ wish, index, isOpen, onToggle }) {
  const accent = ACCENTS[wish.accent] ?? ACCENTS.wine;
  const number = wishNumber.format(index + 1);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className={`wish-card group block w-full rounded-[1.75rem] text-right transition-transform duration-500 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-wine-300/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fbf6ec] ${
        isOpen ? 'is-open' : ''
      }`}
    >
      <span className="wish-card__inner block h-[21rem] w-full sm:h-[22rem]">
        <span
          aria-hidden={isOpen}
          className={`wish-face border border-wine-100/70 bg-gradient-to-br ${accent.front} ${accent.hover} p-6 shadow-glass`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-l ${accent.bar} opacity-80`}
          />
          <span className="wish-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full blur-2xl ${accent.glow}`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 right-8 h-24 w-24 rounded-full bg-white/60 blur-2xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 bottom-14 font-serif text-[9rem] leading-none text-wine-200/40"
          >
            ”
          </span>

          <span className="relative flex items-start justify-between">
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.icon} text-white shadow-glow`}
            >
              <WishIcon name={wish.icon} className="h-6 w-6" />
            </span>
            <span className={`font-serif text-lg tracking-[0.18em] ${accent.label}`}>
              {number}
            </span>
          </span>

          <span className={`relative mt-6 block text-[11px] font-extrabold tracking-[0.25em] ${accent.label}`}>
            {wish.label}
          </span>
          <span className="relative mt-2 block font-serif text-2xl leading-relaxed text-wine-950 sm:text-[1.65rem]">
            {wish.teaser}
          </span>

          <span className="relative mt-auto flex items-center justify-between border-t border-wine-100/80 pt-4">
            <span className={`text-xs font-extrabold ${accent.hint}`}>افتحي الرسالة</span>
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-x-1 ${accent.soft}`}
            >
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
                <path d="M19 12H5m7 7-7-7 7-7" />
              </svg>
            </span>
          </span>
        </span>

        <span
          aria-hidden={!isOpen}
          className="wish-face wish-face--back border-white/15 bg-gradient-to-br from-wine-950 via-wine-800 to-wine-950 px-6 py-6 text-white"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full blur-3xl ${accent.backGlow}`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-cream-400/20 blur-3xl"
          />

          <span className="relative flex items-center justify-between">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-cream-200 backdrop-blur-sm">
              <WishIcon name={wish.icon} className="h-4 w-4" />
            </span>
            <span className="font-serif text-base tracking-[0.18em] text-white/50">
              {number}
            </span>
          </span>

          <span className="wish-scroll relative mt-3 min-h-0 flex-1 overflow-y-auto pe-1">
            <span className="block text-[10px] font-bold tracking-[0.25em] text-cream-300">
              {wish.label}
            </span>
            <span className="mt-2 block font-serif text-base leading-[2] text-white/90 sm:text-[1.05rem]">
              {wish.message}
            </span>
          </span>

          <span className="relative mt-4 flex items-end justify-between border-t border-white/15 pt-3">
            <span className="font-serif text-sm text-cream-200">— {wish.sender}</span>
            <span className="text-[10px] font-bold text-white/45">أغلقي الرسالة</span>
          </span>
        </span>
      </span>
    </button>
  );
}
