"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterAnimationProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CounterAnimation({
  target,
  suffix = "",
  duration = 2000,
  className,
}: CounterAnimationProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const isFloat = target % 1 !== 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  const display =
    target % 1 !== 0
      ? count.toFixed(1)
      : count.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
