"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
      <p className="mb-3 font-caveat text-2xl text-warm">oh no!</p>
      <h1 className="font-playfair text-[48px] font-bold text-earth md:text-[64px]">
        Something Went Wrong
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-earth/70">
        We hit a bump in the road. Let&apos;s try that again.
      </p>
      <button onClick={reset} className="btn-primary mt-8">
        Try Again
      </button>
    </div>
  );
}
