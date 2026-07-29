import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "clay" | "mist";
}) {
  const tones = {
    neutral: "border-line bg-surface-soft text-foreground",
    green: "border-sage bg-mist text-olive-dark",
    clay: "border-clay bg-[#f7e5d4] text-terracotta",
    mist: "border-mist bg-white/70 text-muted",
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
