export default function Education() {
    const educationList = [
        {
            college: "Shri Ram Murti Smarak College Of Engineering Technology and Research",
            duration: "2022-26",
            degree: "B.Tech in C.S.E."
        },
        {
            college: "Radha Madhav Public School",
            duration: "2018-21",
            degree: "Class XII"
        }
    ];

    return (
        <div className='flex flex-col'>
            <div className='text-sm font-semibold p-2'>Education.</div>

            {educationList.map((edu, index) => (
                <div
                    key={index}
                    className='group border  dark:border-neutral-800 shadow-[inset_0_0_6px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_0_5px_rgba(255,255,255,0.2)]  px-3 py-5 rounded-lg mt-3 first:mt-0 transition-all duration-300  hover:-translate-y-1 dark:hover:border-neutral-700'
                >
                    <div className="flex justify-between">
                        <div className='text-sm font-semibold text-neutral-900 dark:text-neutral-200 w-[80%]  transition-all'>
                            {edu.college}
                        </div>
                        <div>
                            <button className='font-sans bg-gray-200 dark:bg-gray-900 rounded-xl border border-neutral-400 font-semibold px-1 md:px-3 text-[9px] md:text-xs transition-all duration-300 group-hover:scale-105'>
                                {edu.duration}
                            </button>
                        </div>
                    </div>
                    <div className='text-sm mt-3  font-semibold text-neutral-600 dark:text-neutral-400'>
                        {edu.degree}
                    </div>
                </div>
            ))}
        </div>
    );
}
