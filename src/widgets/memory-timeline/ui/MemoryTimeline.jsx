import { useEffect, useRef } from 'react';
import { eventConfig } from '../../../shared/config/eventConfig';
import { memoriesData } from '../../../entities/memory/model/memoriesData';
import { MemoryCard } from '../../../entities/memory/ui/MemoryCard';

export function MemoryTimeline() {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    const items = Array.from(list.querySelectorAll('[data-reveal]'));

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
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="memories"
      aria-labelledby="memories-title"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-wine-200/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 rounded-full bg-cream-200/40 blur-3xl"
      />

      <div className="section-shell relative">
        <header className="mx-auto max-w-2xl text-center">
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
              <path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6.5a2.5 2.5 0 0 1 0-5H19" />
              <path d="M8 7h7" />
            </svg>
            {eventConfig.memories.kicker}
          </span>
          <h2
            id="memories-title"
            className="animate-fade-up mt-5 font-serif text-3xl leading-snug text-wine-950 sm:text-5xl"
            style={{ animationDelay: '0.08s' }}
          >
            {eventConfig.memories.title}
          </h2>
          <p
            className="animate-fade-up mt-4 text-sm leading-8 text-stone-600 sm:text-base"
            style={{ animationDelay: '0.16s' }}
          >
            {eventConfig.memories.description}
          </p>
          <span
            aria-hidden="true"
            className="animate-fade-up mx-auto mt-7 flex items-center justify-center gap-3"
            style={{ animationDelay: '0.24s' }}
          >
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-wine-200" />
            <span className="h-2 w-2 rotate-45 rounded-[2px] border border-wine-300 bg-cream-50" />
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-wine-200" />
          </span>
        </header>

        <ol ref={listRef} className="relative mx-auto mt-14 max-w-6xl list-none sm:mt-16">
          <span aria-hidden="true" className="timeline-line" />

          {memoriesData.map((memory, index) => {
            const isRightSide = index % 2 === 0;

            return (
              <li
                key={memory.id}
                data-reveal
                className="reveal relative mb-10 ps-12 last:mb-0 md:mb-16 md:grid md:grid-cols-2 md:items-center md:gap-16 md:ps-0"
                style={{ transitionDelay: `${(index % 4) * 80}ms` }}
              >
                <span aria-hidden="true" className="timeline-dot">
                  <span className="timeline-dot__core" />
                </span>

                <div
                  className={
                    isRightSide
                      ? 'md:col-start-1 md:pe-14'
                      : 'md:col-start-2 md:ps-14'
                  }
                >
                  <MemoryCard memory={memory} index={index} />
                </div>

                <div
                  aria-hidden="true"
                  className={
                    isRightSide
                      ? 'hidden md:col-start-2 md:block md:ps-14 md:text-start'
                      : 'hidden md:col-start-1 md:row-start-1 md:block md:pe-14 md:text-end'
                  }
                >
                  <span className="year-label block font-serif text-6xl leading-none lg:text-8xl">
                    {memory.year}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-wine-600">
                    <span
                      className={`h-px w-8 bg-gradient-to-l from-wine-300 to-transparent ${
                        isRightSide ? '' : 'order-2 rotate-180'
                      }`}
                    />
                    {memory.tag}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-12 text-center font-serif text-lg text-wine-600 sm:mt-16 sm:text-xl">
          ...وما زالت الحكاية تُكتب
        </p>
      </div>
    </section>
  );
}
