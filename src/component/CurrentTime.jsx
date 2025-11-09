import { useEffect, useState } from "react";
import {Timer} from 'lucide-react'
export default function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // hour12:true,
  });

  return (
    <p className=" text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
      <Timer size="14" />
      {formattedTime}
    </p>
  );
}
