import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
  capabilities: string[];
  icon: LucideIcon;
};

export type Project = {
  title: string;
  type: string;
  status: string;
  description: string;
  stack: string[];
};

export type Article = {
  title: string;
  category: string;
  date: string;
  description: string;
};
