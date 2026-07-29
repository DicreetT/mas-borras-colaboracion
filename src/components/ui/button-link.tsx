import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonTone = "primary" | "secondary" | "ghost";

const toneClasses: Record<ButtonTone, string> = {
  primary:
    "border-olive bg-olive text-white hover:bg-olive-dark focus-visible:outline-terracotta",
  secondary:
    "border-line bg-surface text-foreground hover:border-olive hover:bg-mist",
  ghost:
    "border-transparent text-foreground hover:border-line hover:bg-surface/80",
};

export function ButtonLink({
  children,
  tone = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & {
  children: ReactNode;
  tone?: ButtonTone;
}) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold transition ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
