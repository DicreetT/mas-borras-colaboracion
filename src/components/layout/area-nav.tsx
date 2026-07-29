"use client";

import {
  BookOpen,
  CalendarDays,
  Compass,
  FileText,
  FolderKanban,
  Home,
  Inbox,
  MessageSquare,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconMap = {
  book: BookOpen,
  calendar: CalendarDays,
  compass: Compass,
  file: FileText,
  folder: FolderKanban,
  home: Home,
  inbox: Inbox,
  message: MessageSquare,
  settings: Settings,
  user: UserRound,
  users: UsersRound,
};

export interface AreaNavItem {
  href: string;
  label: string;
  icon: keyof typeof iconMap;
}

export function AreaNav({
  title,
  items,
}: {
  title: string;
  items: AreaNavItem[];
}) {
  const pathname = usePathname();

  return (
    <aside className="rounded-[8px] border border-line bg-surface p-3 md:sticky md:top-24">
      <p className="px-3 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
        {title}
      </p>
      <nav aria-label={title} className="mt-2 grid gap-1">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-11 items-center gap-3 rounded-[8px] px-3 text-sm font-medium transition hover:bg-mist ${
                active ? "bg-mist text-olive-dark" : "text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
