import { useEffect, useMemo, useRef, useState } from 'react';

export function TypewriterText({
  text,
  speed = 34,
  startDelay = 600,
  className = '',
  showCaret = true,
  onComplete,
}) {
  const characters = useMemo(() => Array.from(text), [text]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const timerRef = useRef(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    timerRef.current = null;
    setVisibleCount(0);
    setIsDone(false);

    if (prefersReducedMotion) {
      setVisibleCount(characters.length);
      setIsDone(true);
      completeRef.current?.();
      return undefined;
    }

    let index = 0;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;

      index += 1;
      setVisibleCount(index);

      if (index >= characters.length) {
        setIsDone(true);
        completeRef.current?.();
        return;
      }

      const current = characters[index - 1];
      const pause = /[،.؟!…؛:\n]/.test(current)
        ? Math.max(200, speed * 5.5)
        : current === ' '
          ? speed * 1.5
          : speed;

      timerRef.current = window.setTimeout(step, pause);
    };

    timerRef.current = window.setTimeout(step, startDelay);

    return () => {
      cancelled = true;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [characters, speed, startDelay]);

  return (
    <span className={className}>
      <span aria-hidden="true" className="relative block">
        <span className="invisible block" aria-hidden="true">
          {text}
        </span>
        <span className="absolute inset-0 block">
          {characters.slice(0, visibleCount).join('')}
          {showCaret && !isDone ? <span className="typewriter-caret" /> : null}
        </span>
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
