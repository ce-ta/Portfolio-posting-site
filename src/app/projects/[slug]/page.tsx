import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-black/60 dark:hover:text-white/60"
        >
          リポジトリを見る →
        </a>
      )}
      <div
        className="mt-8 space-y-4 leading-relaxed [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-6 [&_ul]:list-disc [&_ul]:pl-5"
        dangerouslySetInnerHTML={{ __html: project.contentHtml }}
      />
    </article>
  );
}
