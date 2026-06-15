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
                    ? "bg-white/10 text-white" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            )}
        >
            <div className={cn(
                "transition-colors",
                active ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
            )}>
                {icon}
            </div>
            {text}
        </button>
    );
}