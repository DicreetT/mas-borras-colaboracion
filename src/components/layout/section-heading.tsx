import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      {children ? (
        <p className="mt-4 text-lg leading-8 text-muted">{children}</p>
      ) : null}
    </div>
  );
}
