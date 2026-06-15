import type { ReactElement } from "react";
import { cn } from "../utils/cn";

export function SidebarItem({
    text, 
    icon, 
    active,
    onClick
}: {
    text: string;
    icon: ReactElement;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button 
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group text-sm font-medium",
                active 
                    ? "bg-indigo-500/10 text-indigo-400" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            )}
        >
            <div className={cn(
                "transition-colors",
                active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
            )}>
                {icon}
            </div>
            {text}
        </button>
    );
}