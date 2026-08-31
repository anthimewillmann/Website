import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section
      aria-labelledby="projects-title"
      className="bg-[var(--background)] px-6 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-20 md:px-14 lg:pt-72"
    >
      <div className="mx-auto w-full max-w-[1360px]">
        <h2
          id="projects-title"
          className="text-center font-sans text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--foreground)]"
        >
          Projects
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-20 sm:mt-20 lg:grid-cols-2 lg:gap-x-10">
          {projects.map((project) => (
            <article key={project.name} className="text-center">
              <Link
                href={`/projects/${project.slug}`}
                scroll={true}
                className="group block rounded-[32px] outline-offset-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                aria-label={`${project.name} und Bildergalerie öffnen`}
              >
                <div
                  className={
                    project.portrait
                      ? "mx-auto w-[320px]"
                      : `mx-auto ${project.overviewImageWidth ?? "w-full"}`
                  }
                >
                  <Image
                    src={project.image}
                    alt=""
                    width={project.portrait ? 600 : 1600}
                    height={project.portrait ? 1300 : 1000}
                    className="h-auto w-full rounded-[32px] shadow-xl ring-1 ring-black/[0.05] transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </div>

                <p className="mt-8 font-sans text-[clamp(0.72rem,1vw,0.85rem)] font-medium tracking-[0.01em] text-[var(--foreground)]">
                  {project.description}
                </p>

                <h3 className="mt-4 font-sans text-[clamp(2.1rem,4.2vw,3.675rem)] font-medium leading-none tracking-[-0.045em] text-[var(--foreground)] transition-transform duration-200 group-hover:scale-105">
                  {project.name}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
