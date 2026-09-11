import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "choice" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg font-bold uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-primary px-6 py-3 text-primary-foreground shadow-tactical hover:bg-primary/90 active:translate-y-px",
        variant === "choice" && "border border-border bg-card px-4 py-4 text-left normal-case text-card-foreground hover:border-primary hover:bg-accent",
        variant === "ghost" && "px-3 py-2 text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}