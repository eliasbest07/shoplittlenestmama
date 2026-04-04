"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <div className="panel-surface max-w-2xl px-8 py-12 md:px-12">
        <p className="eyebrow mb-3">oh no!</p>
        <h1 className="font-playfair text-[48px] font-bold text-earth md:text-[64px]">
          Something Went Wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-mist">
          We hit a bump in the road. Let&apos;s try that again.
        </p>
        <button onClick={reset} className="btn-primary mt-8">
          Try Again
        </button>
      </div>
    </div>
  );
}
