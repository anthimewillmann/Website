const projects = [
  {
    description: "AI PRODUCT · DESIGN · DEVELOPMENT",
    name: "Project One",
  },
  {
    description: "WEB · DESIGN · DEVELOPMENT",
    name: "Project Two",
  },
  {
    description: "AI PRODUCT · DESIGN · DEVELOPMENT",
    name: "Project Three",
  },
  {
    description: "WEB · DESIGN · DEVELOPMENT",
    name: "Project Four",
  },
  {
    description: "PRODUCT · DESIGN · DEVELOPMENT",
    name: "Project Five",
  },
  {
    description: "AI · WEB · DEVELOPMENT",
    name: "Project Six",
  },
];

export function Projects() {
  return (
    <section
      aria-labelledby="projects-title"
      className="bg-white px-6 pb-24 pt-16 sm:px-10 sm:pb-32 sm:pt-20 md:px-14 lg:pt-72"
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

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:grid-cols-2 lg:gap-x-10">
          {projects.map((project) => (
            <article key={project.name} className="text-center">
              <div
                aria-hidden="true"
                className="aspect-[4/3] w-full rounded-[28px] bg-[#E8E8E8] ring-1 ring-inset ring-black/[0.05] sm:rounded-[36px]"
              />

              <p className="mt-8 font-sans text-[clamp(0.72rem,1vw,0.85rem)] font-medium tracking-[0.01em] text-[#0A0A0A]">
                {project.description}
              </p>
              <h3 className="mt-4 font-sans text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.045em] text-[#0A0A0A]">
                {project.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
