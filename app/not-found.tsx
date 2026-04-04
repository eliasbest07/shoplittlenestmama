import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <div className="panel-surface max-w-2xl px-8 py-12 md:px-12">
        <p className="eyebrow mb-3">oops!</p>
        <h1 className="font-playfair text-[48px] font-bold text-earth md:text-[64px]">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-mist">
          It looks like this page flew the nest. Let&apos;s get you back home.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
