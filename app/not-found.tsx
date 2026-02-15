import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
      <p className="mb-3 font-caveat text-2xl text-warm">oops!</p>
      <h1 className="font-playfair text-[48px] font-bold text-earth md:text-[64px]">
        Page Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-earth/70">
        It looks like this page flew the nest. Let&apos;s get you back home.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
