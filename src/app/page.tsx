import Link from "next/link";
import profile from "@/data/profile.json";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="mt-1 text-lg text-black/60 dark:text-white/60">
          {profile.title}
        </p>
        <p className="mt-4 leading-relaxed">{profile.bio}</p>
        <ul className="mt-4 flex gap-4 text-sm">
          {profile.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                className="underline underline-offset-4 hover:text-black/60 dark:hover:text-white/60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">作品一覧</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="block h-full rounded-lg border border-black/10 dark:border-white/10 p-4 hover:border-black/30 dark:hover:border-white/30 transition-colors"
              >
                <h3 className="font-medium">{project.title}</h3>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                  {project.summary}
                </p>
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
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
