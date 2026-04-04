interface CategoryPillProps {
  label: string;
  className?: string;
}

export default function CategoryPill({ label, className }: CategoryPillProps) {
  return (
    <span
      className={`inline-block rounded-full border border-sage/10 bg-sage-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage transition-colors ${className ?? ""}`}
    >
      {label}
    </span>
  );
}
