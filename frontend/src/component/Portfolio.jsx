import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  SunIcon,
  MoonIcon,
  Moon,
  House,
} from "lucide-react";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Achievements from "./Achievements";
import Education from "./Education";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AboutMe from "./AboutMe";
import { ReactSVG, Mongodb, NodeJs, Express } from "../svgs/Svgs";
import GetInTouch from "./GetInTouch";
import Navbar from "./Navbar";

export default function () {
  const { theme, setTheme } = useTheme("dark");
  const [systemTheme, setSystemTheme] = useState("dark");
  // console.log(theme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const SWITCH_THEME = () => {
    switch (theme) {
      case "light": {
        setTheme("dark");
        return;
      }
      case "dark": {
        setTheme("light");
        return;
      }
      case "system": {
        setTheme(systemTheme === "dark" ? "light" : "dark");
      }
    }
  };
  return (
    <div className="min-h-dvh  mx-auto pt-6 pb-28 bg-grid ">
      <nav className="mx-auto  py-2 flex w-full max-w-xl items-center justify-between px-4 md:px-4 lg:px-8 text-xs text-neutral-600 dark:text-neutral-300">
        <div className="font-normal text-neutral-900 dark:text-neutral-500 flex items-center">
          sachin.
        </div>
        <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-400">
          <a
            href="#"
            onClick={() => {
              const el = document.getElementById("experience");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
          >
            Experience
          </a>
          {/* <a href="#">Achievement</a> */}
          <a
            href="#"
            onClick={() => {
              const el = document.getElementById("project");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
          >
            Projects
          </a>
          <button
            type="button"
            aria-label="Toggle color theme"
            onClick={SWITCH_THEME}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md shadow-[inset_0px_0px_3px_rgba(0,0,0,0.3)] dark:shadow-[inset_0px_0px_3px_rgba(255,255,255,0.2)] dark:bg-black bg-white hover:bg-neutral-100 dark:hover:bg-neutral-950 transition-all duration-150"
          >
            {theme === "dark" ? (
              <SunIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"}
            </span>
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-[610px] px-4 ">
        <article className="relative shadow-[inset_0px_0px_6px_rgba(0,0,0,0.4)] rounded-2xl  bg-white border dark:border-neutral-800 dark:bg-black">
          <div className="p-4">
            <section className="border shadow-[inset_0px_0px_6px_rgba(0,0,0,0.4)]  dark:border-neutral-800  rounded-xl p-4">
              <AboutMe />
            </section>

            <section className="text-[14px] mt-3 leading-6 px-3 dark:text-neutral-500 selection:text-white selection:bg-neutral-600">
              I'm a{" "}
              <span className="dark:text-neutral-200">
                Full Stack Developer
              </span>{" "}
              who loves building efficient, scalable, and intuitive application.
              I enjoy crafting websites with <ReactSVG /> React.js, <Express />{" "}
              Express.js, <NodeJs /> Node.js and using<Mongodb /> MongoDB.
            </section>

            <section>
              <Skills />
            </section>

            <section
              id="experience"
              className="border shadow-[inset_0px_0px_6px_rgba(0,0,0,0.3)]  dark:border-neutral-800 rounded-md p-2 mt-4"
            >
              <Experience />
            </section>

            <section
              id="project"
              className="border shadow-[inset_0px_0px_6px_rgba(0,0,0,0.3)] dark:border-neutral-800 rounded-xl p-2 mt-4"
            >
              <Projects />
            </section>

            {/* <section className="border border-neutral-400 dark:border-neutral-800 rounded-xl p-2 mt-4">
              <Achievements />
            </section> */}

            <section className="border shadow-[inset_0px_0px_6px_rgba(0,0,0,0.3)] dark:border-neutral-800 rounded-xl p-2 mt-4">
              <Education />
            </section>

            <section className="border shadow-[inset_0px_0px_6px_rgba(0,0,0,0.3)] dark:border-neutral-800 rounded-xl p-2 mt-4">
              <GetInTouch />
            </section>
          </div>
        </article>
      </div>

      <div className="pointer-events-auto fixed inset-x-0 bottom-6 z-50 flex justify-center">
        <Navbar/>
      </div>
    </div>
  );
}
