import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "../utils/cn";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary" | "danger" | "ghost";
    text: string;
    startIcon?: ReactElement;
    fullWidth?: boolean;
    loading?: boolean;
}

export function Button({ 
    variant, 
    text, 
    startIcon, 
    fullWidth, 
    loading, 
    className,
    disabled,
    ...props 
}: ButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98]";
    
    const variants = {
        primary: "bg-zinc-100 text-black hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-zinc-200 focus:ring-zinc-400 font-semibold",
        secondary: "bg-zinc-900/50 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/80 border border-white/5 focus:ring-zinc-700",
        danger: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 focus:ring-rose-500",
        ghost: "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-white/5 focus:ring-zinc-700"
    };

    const sizes = "px-5 py-2.5 text-sm";

    return (
        <button 
            className={cn(
                baseStyles,
                variants[variant],
                sizes,
                fullWidth && "w-full",
                (disabled || loading) && "opacity-60 cursor-not-allowed active:scale-100",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : startIcon ? (
                <span className="mr-2 flex items-center justify-center">
                    {startIcon}
                </span>
            ) : null}
            {text}
        </button>
    );
}