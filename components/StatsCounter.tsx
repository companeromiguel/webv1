"use client";

import { useEffect, useRef, useState } from "react";

// Created March 26, 1997; LWUA recognition followed July 17, 1998.
// Source: https://tmcwaterdistrict.weebly.com/history-of-tmcwd.html
const ESTABLISHED_YEAR = 1997;

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const stats: Stat[] = [
  // City geography, not a claim about TMCWD service coverage.
  // Source: https://trecemartirescity.gov.ph/history/
  { value: 13,    suffix: "",   label: "Barangays in Trece Martires City" },
  { value: 32000, suffix: "+",  label: "Active Connections" },
  { value: 24,    suffix: "/7", label: "Emergency Response" },
];

function useCountUp(target: number, decimals = 0, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, decimals, duration, start]);

  return count;
}

function StatItem({ stat, animate }: { stat: Stat; animate: boolean }) {
  const count = useCountUp(stat.value, stat.decimals ?? 0, 1800, animate);
  const display = stat.decimals ? count.toFixed(stat.decimals) : Math.round(count).toLocaleString();

  return (
    <div className="flex flex-col items-center text-center px-4 py-5">
      <span className="font-heading text-3xl sm:text-4xl font-bold text-[#370A77] leading-none tabular-nums">
        {display}
        <span className="text-[#0591D4]">{stat.suffix}</span>
      </span>
      <span className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[#2A2A29]/50 leading-tight">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 mb-12">
      <div className="flex flex-col items-center text-center px-4 py-5">
        <span className="font-heading text-3xl sm:text-4xl font-bold text-[#370A77] leading-none tabular-nums">
          {ESTABLISHED_YEAR}
        </span>
        <span className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-[#2A2A29]/50 leading-tight">
          Established
        </span>
      </div>
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} animate={animate} />
      ))}
    </div>
  );
}
