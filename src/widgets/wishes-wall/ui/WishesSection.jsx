import { useEffect, useRef, useState } from 'react';
import { eventConfig } from '../../../shared/config/eventConfig';
import { WishCard } from '../../../entities/wish/ui/WishCard';

const wishCountFormatter = new Intl.NumberFormat('ar-EG', {
  useGrouping: false,
});

export function WishesSection() {
  const [openWishes, setOpenWishes] = useState(() => new Set());
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    const items = Array.from(grid.querySelectorAll('[data-reveal]'));

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const toggleWish = (wishId) => {
    setOpenWishes((current) => {
      const next = new Set(current);
      if (next.has(wishId)) {
        next.delete(wishId);
      } else {
        next.add(wishId);
      }
      return next;
    });
  };

  return (
    <section
      id="wishes"
      aria-labelledby="wishes-title"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 h-[38rem] bg-gradient-to-b from-wine-100/45 via-cream-50/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-0 h-80 w-80 rounded-full bg-cream-200/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-wine-200/30 blur-3xl"
      />

      <div className="section-shell relative">
        <header className="mx-auto max-w-3xl text-center">
          <span className="eyebrow animate-fade-up">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 text-wine-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.8 8.6c0 5.2-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.6A4.4 4.4 0 0 1 12 6.1a4.4 4.4 0 0 1 8.8 2.5Z" />
            </svg>
            {eventConfig.wishesSection.kicker}
          </span>
          <h2
            id="wishes-title"
            className="animate-fade-up mt-5 font-serif text-3xl leading-snug text-wine-950 sm:text-5xl"
            style={{ animationDelay: '0.08s' }}
          >
            {eventConfig.wishesSection.title}
          </h2>
          <p
            className="animate-fade-up mt-4 text-sm leading-8 text-stone-600 sm:text-base"
            style={{ animationDelay: '0.16s' }}
          >
            {eventConfig.wishesSection.description}
          </p>
          <div
            className="animate-fade-up mt-6 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: '0.24s' }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-wine-100 bg-white/70 px-4 py-1.5 text-[11px] font-bold text-wine-700 shadow-sm backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-wine-600 to-cream-500"
              />
              {wishCountFormatter.format(eventConfig.wishes.length)} رسائل
            </span>
            <span className="text-[11px] font-medium text-stone-500">
              {eventConfig.wishesSection.hint}
            </span>
          </div>
        </header>

        <div
          ref={gridRef}
          className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {eventConfig.wishes.map((wish, index) => (
            <div
              key={wish.id}
              data-reveal
              className="reveal"
              style={{ transitionDelay: `${(index % 3) * 90}ms` }}
            >
              <WishCard
                wish={wish}
                index={index}
                isOpen={openWishes.has(wish.id)}
                onToggle={() => toggleWish(wish.id)}
              />
            </div>
          ))}
        </div>

        <p className="mt-12 flex items-center justify-center gap-3 text-center font-serif text-base text-wine-600 sm:text-lg">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-gradient-to-l from-transparent to-wine-200"
          />
          كل ما قيل هنا... بقيَ لكِ
          <span
            aria-hidden="true"
            className="h-px w-10 bg-gradient-to-r from-transparent to-wine-200"
          />
        </p>
      </div>
    </section>
  );
}
