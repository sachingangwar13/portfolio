import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import CurrentTime from "./CurrentTime";

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
  {
    link: "mailto:sachin.13.gangwar@gmail.com",
    icon: <Mail className="h-4 w-4" />,
  },
];

function AboutMe() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 pt-2">
        <div>
          <div className="text-[10px] text-neutral-900 dark:text-neutral-500 flex items-center pb-1">
            <span className="text-neutral-600">Hey It's me </span>
            <button className="group px-2 rounded text-neutral-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                className="transition-all duration-300 group-hover:text-red-500 group-hover:drop-shadow-[0_0_8px_#ff0000]"
              >
                <title>heart</title>
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845c.562 1.096.585 2.517-.213 4.092c-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2L12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="text-3xl font-bold dark:text-white text-neutral-800">
            Sachin Gangwar
          </div>
          <div className="flex items-center gap-2 md:gap-2 text-neutral-600 tracking-wide dark:text-neutral-400 text-xs  mt-1">
            <button className="group">
              <MapPin
                size="14"
                className="dark:text-neutral-400 mb-1 text-neutral-600 inline transition-all duration-300 group-hover:text-green-700 group-hover:drop-shadow-[1px_1px_10px_#00ff00] group-hover:dark:text-green-600"
              />
            </button>
            <span>Uttar Pradesh, India </span>
            <span className="hidden md:block">|</span>

            <button className="group hidden md:block">
              <CurrentTime />
            </button>
          </div>
        </div>
        <img
          src="dp2.webp"
          alt="dp"
          className="ring-1 ring-neutral-200 object-center dark:ring-neutral-900 rounded-sm h-22 w-22"
        />
      </div>
      <div className="flex gap-5 pt-3">
        <span className="text-xs text-neutral-600 dark:text-neutral-400">
          he/him
        </span>
        <span className="text-xs text-neutral-600 dark:text-neutral-400">
          ||
        </span>
        <span className="text-xs text-neutral-600 dark:text-neutral-400">
          Full Stack Developer
        </span>
      </div>

      <div className="mt-2 flex gap-2 ">
        <a
          href="https://drive.google.com/file/d/12raj7ArXeALFMmdTrLi0dBHUgdG-F6oY/view"
          target="_blank"
          rel="noreferrer"
          className="border px-4 py-1 rounded-lg bg-black hover:bg-black/85 duration-150 dark:bg-white dark:text-black text-white"
        >
          Resume
        </a>

        {socials.map((item, key) => (
          <button className="opacity-65 hover:opacity-100 h-8 w-8 flex items-center justify-center rounded-md border border-neutral-500 dark:text-neutral-400  dark:hover:bg-neutral-950 dark:border-neutral-600 p-1 text-neutral-700 hover:bg-neutral-50">
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
    </div>
  );
}

export default AboutMe;
