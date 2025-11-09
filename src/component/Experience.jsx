import React from "react";
import cn from "../lib/cn";

export default function Experience() {
  return (
    <div className="px-1">
      <div className="text-sm font-semibold ">Experience</div>
      <div className="border border-neutral-400 dark:border-neutral-800 rounded-md mt-4">
        <div className="p-3 flex gap-5">
          <img
            src="/techvision.jpeg"
            alt="img"
            className="rounded-full h-12 w-12 mt-2 ring-2 ring-neutral-200"
          />
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-1 md:justify-between items-start md:items-center">
              <div className="text-sm font-semibold ">
                Techvision Technologies
              </div>
              <button
                className={cn(
                  "border-1 rounded-[3px] text-xs border-neutral-700 dark:border-neutral-800 px-2 bg-neutral-200 dark:bg-neutral-900",
                  "shadow-[1px_1px_0px_0px_var(--color-neutral-700)] dark:shadow-[0px_-1px_0px_0px_var(--color-neutral-600)]",
                  "transition-all duration-200  tracking-tight leading-tight",
                  "text-neutral-800 dark:text-neutral-300"
                )}
              >
                June 2025 - August 2025
              </button>
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              Full stack developer Intern
            </div>
            <div className="text-xs  mt-4 text-neutral-600 dark:text-neutral-300">
              Developed and maintained full-stack web applications using React,
              Vite, Node.js, and Express. Built reusable UI components,
              optimized API performance, and improved UX responsiveness across
              devices.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
