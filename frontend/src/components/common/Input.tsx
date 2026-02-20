import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export function Input({ error, label, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/70">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 border-[#1a1a1a] text-[#1a1a1a]",
          "transition-all duration-300 ease-out",
          "focus:outline-none focus:border-[#d4754e]",
          "placeholder:text-[#1a1a1a]/30 placeholder:font-light",
          error && "border-red-600",
          className,
        )}
        {...props}
      />
      {error && (
        <span className="font-mono text-xs text-red-600 mt-1">{error}</span>
      )}
    </div>
  );
}
