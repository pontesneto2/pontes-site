export default function MdxContent({ html }: { html: string }) {
  return (
    <div
      className="
        text-[15px] sm:text-base leading-relaxed text-zinc-300
        [&>*+*]:mt-5
        [&_h1]:mt-12 [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:tracking-tight [&_h1]:scroll-mt-24
        [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:tracking-tight [&_h2]:scroll-mt-24
        [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:scroll-mt-24
        [&_p]:text-zinc-300 [&_p]:text-justify
        [&_strong]:text-white [&_strong]:font-semibold
        [&_a]:text-violet-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-violet-500/40 hover:[&_a]:text-violet-300 hover:[&_a]:decoration-violet-400
        [&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10 [&_img]:w-full [&_img]:h-auto
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5
        [&_blockquote]:border-l-2 [&_blockquote]:border-violet-500/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-zinc-400
        [&_code]:text-[0.85em] [&_code]:font-mono
        [&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:bg-white/[0.08] [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-violet-200
        [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-[13px] [&_pre]:sm:text-sm
        [&_hr]:border-white/10 [&_hr]:my-10
      "
      // Content is authored exclusively via MDX files committed to this repo, not user input.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
