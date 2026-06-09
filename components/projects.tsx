import Image from "next/image";

const projects = [
  {
    description:
      "Educational relational database in Go with MVCC, WAL, Raft, replication, and sharding.",
    name: "PolarisDB",
    image: "/PolarisDB.png",
    href: "https://github.com/anthimewillmann/PolarisDB",
    smallerLandscape: true,
  },
  {
    description:
      "Event-driven Go platform for agent orchestration, task execution, evaluation, memory management, and multi-agent workflow automation.",
    name: "Distributed Agent Operating System",
    image: "/Distributed-Agent-Operating-System.png",
    href: "https://github.com/anthimewillmann/Distributed-Agent-Operating-System",
    smallerLandscape: true,
  },
  {
    description:
      "AI-powered iOS recipe manager built with SwiftUI, Foundation Models, and Vision OCR for recipe generation, scanning, and guided cooking.",
    name: "Culinaro",
    image: "/Culinaro.PNG",
    href: "https://apps.apple.com/us/app/culinaro/id6764299394",
    portrait: true,
  },
  {
    description:
      "Safari Web Extension for AI-powered webpage summaries and follow-up questions using Apple Foundation Models.",
    name: "Sumari",
    image: "/Sumari.PNG",
    href: "https://github.com/anthimewillmann/Sumari",
    portrait: true,
  },
  {
    description:
      "Data Science Project: The Personal Traffic around Kiel in the past five years",
    name: "Kiel Traffic Analysis",
    image: "/Kiel-Traffic-Analysis.png",
    href: "https://kiel-traffic-analysis-7q4iyxxr2obfcxkxzmuq2k.streamlit.app/",
    alignWithLabyrinth: true,
    smallerLandscape: true,
  },
  {
    description:
      "Java Swing maze game with difficulty modes, keyboard controls, and Dijkstra-based pursuers.",
    name: "Labyrinth",
    image: "/Labyrinth.jpeg",
    href: "https://github.com/anthimewillmann/Labyrinth",
    smaller: true,
  },
];

export function Projects() {
  return (
    <section
      aria-labelledby="projects-title"
      className="bg-white px-6 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-20 md:px-14 lg:pt-72"
    >
      <div className="mx-auto w-full max-w-[1360px]">
        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2 lg:gap-x-10">
          <h2
            id="projects-title"
            className="text-center font-sans text-[clamp(3.5rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.055em] text-[#0A0A0A]"
          >
            Projects
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-20 sm:mt-20 lg:grid-cols-2 lg:gap-x-10">
          {projects.map((project) => (
            <article
              key={project.name}
              className={`text-center ${
                project.alignWithLabyrinth || project.smaller
                  ? "lg:self-center"
                  : ""
              }`}
            >
              {project.portrait ? (
                <div className="mx-auto w-[320px]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={600}
                    height={1300}
                    className="w-full rounded-[32px] shadow-xl ring-1 ring-inset ring-black/[0.05]"
                  />
                </div>
              ) : project.smaller ? (
                <div className="mx-auto w-[82%]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={1600}
                    height={1000}
                    className="h-auto w-full rounded-[32px] shadow-xl ring-1 ring-black/[0.05]"
                  />
                </div>
              ) : (
                <div
                  className={`mx-auto ${
                    project.smallerLandscape ? "w-[88%]" : "w-full"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={1600}
                    height={1000}
                    className="h-auto w-full rounded-[32px] shadow-xl ring-1 ring-black/[0.05]"
                  />
                </div>
              )}

              <p className="mt-8 font-sans text-[clamp(0.72rem,1vw,0.85rem)] font-medium tracking-[0.01em] text-[#0A0A0A]">
                {project.description}
              </p>

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-sans text-[clamp(2.1rem,4.2vw,3.675rem)] font-medium leading-none tracking-[-0.045em] text-[#0A0A0A] transition-transform duration-200 hover:scale-105"
              >
                {project.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
