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
    const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98]";
    
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] border border-indigo-500/50 focus:ring-indigo-500",
        secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 focus:ring-slate-500",
        danger: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 focus:ring-rose-500",
        ghost: "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 focus:ring-slate-500"
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