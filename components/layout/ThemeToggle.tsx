"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
      size="icon"
      type="button"
      variant="ghost"
    >
      <Sun
        aria-hidden="true"
        className="h-5 w-5 scale-100 transition-transform dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute h-5 w-5 scale-0 transition-transform dark:scale-100"
      />
    </Button>
  );
}
