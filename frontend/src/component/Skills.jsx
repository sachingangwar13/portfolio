import React from 'react'
import {
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiJavascript,
  SiCplusplus,
  SiShadcnui,
  SiPostman,
  SiGithub,
  SiExpress,
  SiGit,
  SiStreamlit
} from "react-icons/si";
export default function Skills() {

  const skills = [
    { title: "MongoDB", icon: SiMongodb },
    { title: "React", icon: SiReact },
    { title: "Node.js", icon: SiNodedotjs },
    { title: "Python", icon: SiPython },
    { title: "Tailwind", icon: SiTailwindcss },
    { title: "C++", icon: SiCplusplus },
    { title: "JavaScript", icon: SiJavascript },
    
    { title: "Shadcn", icon: SiShadcnui },
    { title: "Postman", icon: SiPostman },
    { title: "GitHub", icon: SiGithub },
    { title: "Express.js", icon: SiExpress },
    { title: "git", icon: SiGit },
    { title: "streamlit", icon: SiStreamlit },
  ];

  return (
    <div className='border shadow-[inset_0px_0px_6px_rgba(0,0,0,0.3)]
 mt-5 rounded-md  dark:border-neutral-800 flex flex-col'>
      <div className='flex justify-between items-center px-4 py-1'>
        <div className='text-sm font-semibold'>Skills</div>
        <div className='text-xs hidden md:inline font-sans text-neutral-500'>hover on this🤭</div>
      </div>

      <div className="flex flex-wrap gap-2 relative p-4">
        {skills.map(({ title, icon: Icon }) => (
          <div
            key={title}
            className="select-none flex items-center gap-1.5 rounded-lg border px-1 py-.5 text-xs font-medium bg-white dark:bg-black   text-neutral-600 dark:text-neutral-400 border-neutral-400 dark:border-neutral-800 hover:scale-x-115 hover:scale-y-105 duration-150 ease-in-out transition-all"
          >
            <Icon size={16} className="flex-shrink-0" />
            <span className="leading-none">{title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
