"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      size="icon"
      type="button"
      variant="ghost"
    >
      <Sun
        aria-hidden="true"
        className="h-[1.15rem] w-[1.15rem] scale-100 transition-transform dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute h-[1.15rem] w-[1.15rem] scale-0 transition-transform dark:scale-100"
      />
    </Button>
  );
}
