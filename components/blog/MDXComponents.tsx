import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mb-6 mt-10 font-playfair text-[32px] font-bold leading-tight text-earth md:text-[40px]"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mb-4 mt-10 font-playfair text-[24px] font-semibold leading-tight text-earth md:text-[32px]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mb-3 mt-8 font-playfair text-[20px] font-semibold text-earth md:text-[24px]"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="mb-2 mt-6 font-inter text-lg font-semibold text-earth"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mb-5 text-base leading-[1.7] text-earth/80 md:text-lg" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-5 ml-6 list-disc space-y-2 text-base text-earth/80 md:text-lg" {...props} />
  ),
  ol: (props) => (
    <ol
      className="mb-5 ml-6 list-decimal space-y-2 text-base text-earth/80 md:text-lg"
      {...props}
    />
  ),
  li: (props) => <li className="leading-[1.7]" {...props} />,
  a: (props) => (
    <a
      className="text-sage underline underline-offset-2 transition-colors hover:text-sage-hover"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-warm pl-6 italic text-earth/70"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-earth" {...props} />,
  em: (props) => <em className="italic text-earth/70" {...props} />,
  hr: () => <hr className="my-8 border-warm/30" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm md:text-base" {...props} />
    </div>
  ),
  thead: (props) => <thead className="border-b-2 border-sage-soft" {...props} />,
  th: (props) => (
    <th className="px-4 py-3 text-left font-semibold text-earth" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-sage-soft/50 px-4 py-3 text-earth/80" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-sage-soft px-1.5 py-0.5 font-mono text-sm text-earth" {...props} />
  ),
  pre: (props) => (
    <pre className="my-6 overflow-x-auto rounded-xl bg-deep-nest p-6 text-sm text-cream" {...props} />
  ),
};
