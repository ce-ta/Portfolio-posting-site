import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const projectsDirectory = path.join(process.cwd(), "src/data/projects");

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  link: string;
};

export type Project = ProjectMeta & {
  contentHtml: string;
};

function getSlugs(): string[] {
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllProjects(): ProjectMeta[] {
  return getSlugs()
    .map((slug) => {
      const fullPath = path.join(projectsDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title as string,
        summary: data.summary as string,
        tags: (data.tags as string[]) ?? [],
        link: data.link as string,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "ja"));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    summary: data.summary as string,
    tags: (data.tags as string[]) ?? [],
    link: data.link as string,
    contentHtml,
  };
}
