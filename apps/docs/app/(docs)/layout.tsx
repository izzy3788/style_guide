import DocsSidebar from "@/components/docs/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="flex w-full">
        <DocsSidebar />

        <main className="flex min-h-screen flex-1 min-w-0 pl-[304px]">
          <div className="mx-auto w-full max-w-[920px] px-8 py-10">
            <article className="docs-content prose prose-neutral dark:prose-invert prose-a:no-underline max-w-none space-y-12">
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
