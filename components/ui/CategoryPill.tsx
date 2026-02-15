interface CategoryPillProps {
  label: string;
  className?: string;
}

export default function CategoryPill({ label, className }: CategoryPillProps) {
  return (
    <span
      className={`inline-block rounded-full bg-sage-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-earth transition-colors ${className ?? ""}`}
    >
      {label}
    </span>
  );
}
