import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles = {
  primary:
    "bg-[#1a1a1a] text-[#f7f3ef] border-2 border-[#1a1a1a] " +
    "hover:bg-[#d4754e] hover:border-[#d4754e] hover:shadow-[8px_8px_0_0_#1a1a1a] " +
    "active:shadow-[4px_4px_0_0_#1a1a1a] active:translate-x-1 active:translate-y-1",
  secondary:
    "bg-transparent text-[#1a1a1a] border-2 border-[#1a1a1a] " +
    "hover:bg-[#1a1a1a] hover:text-[#f7f3ef] hover:shadow-[8px_8px_0_0_#d4754e] " +
    "active:shadow-[4px_4px_0_0_#d4754e] active:translate-x-1 active:translate-y-1",
  text:
    "bg-transparent text-[#1a1a1a] underline-offset-4 " +
    "hover:underline hover:text-[#d4754e]",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative px-8 py-4 text-sm font-medium uppercase tracking-widest",
        "transition-all duration-300 ease-out",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0",
        variantStyles[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
