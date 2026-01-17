import cn from "../lib/cn";
import { ExternalLink } from "lucide-react";
import { GithubSVG } from "../svgs/Svgs";

export default function Projects() {
  const projects = [
    {
      title: "2minPortfolio",
      description:
        "Build your portfolio in no time with our user‑friendly interface, allowing you to showcase your work effortlessly.",
      techStack: ["React", "MongoDB", "Express", "Node"],
      links: {
        live: "https://sachin-2min-portfolio.vercel.app/",
        github: "https://github.com/sachingangwar13/2minPortfolio",
      },
      imageSrc: "2minPortfolio.png",
    },
    {
      title: "DisasterView",
      description:
        " An interactive web app for visualizing geospatial disaster data, allowing users to explore events by type, date, and location.",
      techStack: ["Python", "Streamit", "Folium", "MongoDB", "NewsAPI"],
      links: {
        live: "https://real-time-disaster-monitoring-g2ahujtkratzemcycuqncl.streamlit.app/",
        github: "https://github.com/sachingangwar13/real-time-disaster-monitoring/",
      },
      imageSrc: "realTimeDisaster.png",
    },
  ];

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="text-sm font-semibold">Projects.</div>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="border shadow-[inset_0px_0px_6px_rgba(0,0,0,0.3)] rounded-md dark:border-neutral-800 mt-4 p-3 flex flex-col md:flex-row gap-5 mb-5 justify-between">
          <a
            className={cn(
              "bg-neutral-200 dark:bg-neutral-950 border border-neutral-500 dark:border-neutral-800 rounded-xl overflow-hidden flex justify-center items-center",
              "bg-[radial-gradient(var(--color-neutral-600)_1px,transparent_1px)] dark:bg-[radial-gradient(var(--color-neutral-700)_1px,transparent_1px)]",
              "[background-size:10px_10px]",
              "shadow-2xl p-2 group"
            )}
            href={project.links.live}
            target="_blank"
          >
            <img
              src={project.imageSrc}
              alt=""
              className="object-contain rounded-lg border group-hover:scale-103 transition-all duration-300"
            />
          </a>
          
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row  justify-between gap-2 md:gap-5">
              <div className="font-semibold tracking-wide">{project.title}</div>
              <div className="flex  gap-3">
                <a
                  className={cn(
                    "border-1 rounded-[3px] text-xs border-neutral-700 dark:border-neutral-800 px-2 bg-neutral-200 dark:bg-neutral-900",
                    "shadow-[1px_1px_0px_0px_var(--color-neutral-700)] dark:shadow-[0px_-1px_0px_0px_var(--color-neutral-600)]",
                    "flex justify-center gap-2 items-center hover:opacity-80 transition-all duration-200 cursor-pointer"
                  )}
                  href={project.links.live}
                  target="_blank"
                >
                  <ExternalLink className="size-3 " />
                  <span>Live</span>
                </a>
                <a
                  className={cn(
                    "border-1 rounded-[3px] text-xs border-neutral-700 dark:border-neutral-800 px-2 bg-neutral-200 dark:bg-neutral-900",
                    "shadow-[1px_1px_0px_0px_var(--color-neutral-700)] dark:shadow-[0px_-1px_0px_0px_var(--color-neutral-600)]",
                    "flex justify-center gap-2 items-center hover:opacity-80 transition-all duration-200 cursor-pointer"
                  )}
                  href={project.links.github}
                  target="_blank"
                >
                  <GithubSVG/>
                  <span>Github</span>
                </a>
              </div>
            </div>

            <div className="text-[10px]">
              <span className="dark:text-neutral-500 text-neutral-700  tracking-wide text-xs">{project.description}</span>
              <div>
                <div className="font-semibold text-xs py-2">
                  Technologies Used:
                </div>
                {project.techStack.map((tech, i) => (
                  <button
                    key={i}
                    className={cn(
                    "border-1 rounded-[3px] text-xs border-neutral-700 dark:border-neutral-800 px-2 bg-neutral-200 dark:bg-neutral-900",
                    "shadow-[1px_1px_0px_0px_var(--color-neutral-700)] dark:shadow-[0px_-1px_0px_0px_var(--color-neutral-600)]",
                    "transition-all duration-200  mr-2 mb-1 mt-0.5",
                  )}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
