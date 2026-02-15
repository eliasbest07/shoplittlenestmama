import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { mdxComponents } from "@/components/blog/MDXComponents";

interface MDXRemoteProps {
  source: string;
}

export async function MDXRemote({ source }: MDXRemoteProps) {
  const code = String(
    await compile(source, {
      outputFormat: "function-body",
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { default: MDXContent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  } as any);

  return <MDXContent components={mdxComponents} />;
}
