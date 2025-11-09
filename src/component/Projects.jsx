import cn from "../lib/cn";
import { ExternalLink } from "lucide-react";

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

    // {
    //   title: "2minPortfolio",
    //   description:
    //     " A robust two-factor authentication system implementing Time-based One-Time Password (TOTP) for enhanced application security.",
    //   techStack: ["React", "MongoDB", "Express", "Node","React", "MongoDB", "Express", "Node"],
    //   links: {
    //     live: "#",
    //     github: "#",
    //   },
    //   imageSrc: "newSS.png",
    // },

  ];

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="text-sm font-semibold">Projects.</div>
      </div>

      {projects.map((project, index) => (
        <div className="border rounded-md border-neutral-400 dark:border-neutral-800 mt-4 p-3 flex flex-col md:flex-row gap-5 mb-5 justify-between">
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

          {/* <div
            className={cn(
              // "bg-neutral-200 dark:bg-neutral-950 border border-neutral-500 dark:border-neutral-800 rounded-xl overflow-hidden flex justify-center items-center",
              // "bg-[radial-gradient(var(--color-neutral-600)_1px,transparent_1px)] dark:bg-[radial-gradient(var(--color-neutral-700)_1px,transparent_1px)]",
              // "[background-size:10px_10px]",
              // "shadow-2xl p-2"
              "bg-[linear-gradient(359.5deg,rgba(200,200,200,1)_34.9%,rgba(142,14,0,0.6)_138.1%)]",
              "rounded-md border flex items-center px-2"
            )}
          >
            <img
              src={project.imageSrc}
              alt="project image"
              className="object-contain rounded-lg border shadow-black"
            />
          </div> */}
          
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <title>Github-fill SVG Icon</title>
                    <g fill="none">
                      <g clipPath="url(#akarIconsGithubFill0)">
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12"
                          clipRule="evenodd"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="akarIconsGithubFill0">
                          <path fill="#fff" d="M0 0h24v24H0z"></path>
                        </clipPath>
                      </defs>
                    </g>
                  </svg>
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
