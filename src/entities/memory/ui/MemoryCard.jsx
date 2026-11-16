import { GlassCard } from '../../../shared/ui/GlassCard';

const memoryNumber = new Intl.NumberFormat('ar-EG', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

export function MemoryCard({ memory, index }) {
  return (
    <GlassCard
      as="article"
      interactive
      className="group overflow-hidden rounded-[1.85rem]"
    >
      <figure className="relative aspect-[16/10] overflow-hidden">
        <img
          src={memory.image}
          alt={memory.imageAlt}
          width="1024"
          height="768"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-wine-950/70 via-wine-900/5 to-transparent"
        />
        <span className="absolute right-4 top-4 inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-white/30 bg-white/20 px-3 font-serif text-lg text-white backdrop-blur-md">
          {memoryNumber.format(index + 1)}
        </span>
        <figcaption className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-extrabold text-wine-800 shadow-sm backdrop-blur-sm">
            {memory.date}
          </span>
          <span className="rounded-full border border-white/30 bg-wine-950/40 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
            {memory.tag}
          </span>
        </figcaption>
      </figure>

      <div className="relative p-6 sm:p-7">
        <div
          aria-hidden="true"
          className="absolute left-6 top-6 h-16 w-16 rounded-full bg-gradient-to-br from-wine-200/40 to-cream-200/30 blur-2xl"
        />
        <h3 className="relative text-2xl font-extrabold text-wine-950">
          {memory.title}
        </h3>
        <p className="relative mt-3 text-sm leading-8 text-stone-600">
          {memory.description}
        </p>
        <div className="relative mt-5 flex items-center gap-2 text-[11px] font-bold text-wine-600">
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
            <path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" />
          </svg>
          <span>من ألبوم الذكريات</span>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-gradient-to-l from-wine-200 to-transparent"
          />
        </div>
      </div>
    </GlassCard>
  );
}
