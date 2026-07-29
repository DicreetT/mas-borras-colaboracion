import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

const icons = {
  empty: Inbox,
  loading: Loader2,
  error: AlertCircle,
};

export function StateBlock({
  type,
  title,
  children,
}: {
  type: keyof typeof icons;
  title: string;
  children: ReactNode;
}) {
  const Icon = icons[type];

  return (
    <div className="rounded-[8px] border border-dashed border-line bg-surface/75 p-6 text-center">
      <Icon
        className={`mx-auto mb-3 h-6 w-6 text-terracotta ${
          type === "loading" ? "animate-spin" : ""
        }`}
        aria-hidden="true"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted">
        {children}
      </p>
    </div>
  );
}
