import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { ProjectScene } from "@/components/project-scene";

// Unbekannte Slugs sollen sofort auf Routing-Ebene 404en, statt Next.js
// dazu zu bringen, sie zur Laufzeit erst noch zu versuchen zu rendern.
export const dynamicParams = false;

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};
    return {
        title: project.name,
        description: project.description,
        alternates: {
            canonical: `/projects/${project.slug}`,
        },
        openGraph: {
            title: `${project.name} | Anthime Willmann`,
            description: project.description,
            url: `/projects/${project.slug}`,
            images: [project.image],
        },
    };
}

export default async function ProjectPage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();

    // key sorgt für einen sauberen Remount, wenn direkt zwischen zwei
    // /projects/[slug]-Seiten gewechselt wird (z.B. über die Browser-History),
    // damit interner State (Observer, failedImages, Scroll-Progress) nicht
    // vom vorherigen Projekt "kleben bleibt".
    return <ProjectScene key={project.slug} project={project} />;
}
