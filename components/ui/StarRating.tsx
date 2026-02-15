interface StarRatingProps {
  rating: number;
  className?: string;
}

export default function StarRating({ rating, className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;

  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={
            i < fullStars
              ? "#D4A574"
              : i === fullStars && hasHalf
                ? "url(#half)"
                : "none"
          }
          stroke="#D4A574"
          strokeWidth="1.5"
        >
          {i === fullStars && hasHalf && (
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#D4A574" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          )}
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-earth/70">{rating}</span>
    </div>
  );
}
