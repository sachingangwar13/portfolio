import { a } from "framer-motion/client";
import { Github, Linkedin, Twitter, Mail, Home } from "lucide-react";

const socials = [
  {
    link: "#",
    icon: <Home className="h-4 w-4" />,
    name: "Home",
  },
  {
    link: "https://twitter.com/sachinn_gangwar",
    icon: <Twitter className="h-4 w-4" />,
    name: "Twitter",
  },
  {
    link: "https://github.com/sachingangwar13",
    icon: <Github className="h-4 w-4" />,
    name: "Github",
  },
  {
    link: "https://linkedin.com/in/sachingangwar",
    icon: <Linkedin className="h-4 w-4" />,
    name: "Linkedin",
  },
  {
    link: "mailto:sachin.13.gangwar@gmail.com",
    icon: <Mail className="h-4 w-4" />,
    name: "Mail",
  },
];

function Navbar() {
  return (
    <nav
      aria-label="Quick actions"
      class="flex items-center gap-1 rounded-xl border border-neutral-200 bg-white/90 p-1.5 shadow-lg backdrop-blur-xs dark:backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80"
    >
      {socials.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="group inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
          target='_blank'
        >
          {item.icon}
        </a>
      ))}
    </nav>
  );
}

export default Navbar;
