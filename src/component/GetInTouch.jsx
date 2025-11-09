import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  SunIcon,
  MoonIcon,
  Moon,
} from "lucide-react";

const socials = [
  {
    link: "https://twitter.com/sachinn_gangwar",
    icon: <Twitter className="h-4 w-4" />,
  },
  {
    link: "https://github.com/sachingangwar13",
    icon: <Github className="h-4 w-4" />,
  },
  {
    link: "https://linkedin.com/in/sachingangwar",
    icon: <Linkedin className="h-4 w-4" />,
  },
];

function GetInTouch() {
  return (
    <div className="flex flex-col items-center justify-center py-3">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
        Let's work together.
      </h2>

      <div className="mx-auto mt-3 max-w-[500px] text-center font-geist font-[300] tracking-wide mb-4   text-xs text-neutral-800 dark:text-neutral-300">
        I'm always interested in new opportunities and exciting projects.
        Whether you have a project in mind or just want to chat about tech, I'd
        love to hear from you.
      </div>

      <a
        href="mailto:sachin.13.gangwar@gmail.com"
        target='_blank'
        className="border-2 mb-4 rounded-md px-3 py-1.5 cursor-pointer items-center gap-2 text-white dark:text-black dark:bg-white bg-black flex"
      >
        <Mail size={15} />
        <div className="text-white dark:text-black ">Get in Touch</div>
      </a>

      <div className="flex gap-3 mb-3">
        {socials.map((item, key) => (
          <button className="opacity-65 hover:opacity-100 h-8 w-8 flex items-center justify-center rounded-md border border-neutral-400 dark:text-neutral-400  dark:hover:bg-neutral-950 dark:border-neutral-600 p-0 text-neutral-700 hover:bg-neutral-50">
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Twitter"
            >
              {item.icon}
            </a>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-3 max-w-[500px] text-center font-[400] tracking-wider mb-4  text-xs text-neutral-800 dark:text-neutral-300">
         Currently available for freelance work and full‑time opportunities

        <div className="tracking-wider">
            Response time: Usually within 2 hours
        </div>
      </div>
    </div>
  );
}

export default GetInTouch;
