export function GlassCard({
  as: Tag = 'div',
  glow = 'wine',
  interactive = false,
  className = '',
  children,
  ...rest
}) {
  const glowClass =
    glow === 'cream'
      ? 'border-cream-100/80 shadow-glass-soft'
      : 'border-wine-100/80 shadow-glass';

  return (
    <Tag
      className={[
        'glass-card',
        glowClass,
        interactive
          ? 'transition duration-500 ease-out hover:-translate-y-1 hover:shadow-glow'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  );
}
