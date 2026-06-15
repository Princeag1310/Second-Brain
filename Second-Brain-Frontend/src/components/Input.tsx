import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    reference?: any; // Keeping the old reference prop for backward compatibility
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, reference, type, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    type={type || "text"}
                    ref={ref || reference}
                    className={cn(
                        "flex h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/30 px-4 py-2 text-sm text-zinc-100 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-600 focus-visible:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = "Input";