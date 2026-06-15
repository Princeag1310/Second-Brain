import { BrainCircuit, LogOut, LayoutGrid } from "lucide-react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

export function Sidebar({ filter, setFilter }: { filter: string, setFilter: (val: string) => void }) {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-black/50 backdrop-blur-xl border-r border-white/5 w-72 fixed left-0 top-0 flex flex-col z-20">
            {/* Logo Area */}
            <div className="flex items-center gap-3 px-8 py-8 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <BrainCircuit className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                    Second Brain
                </span>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 px-4 space-y-2 overflow-y-auto">
                <SidebarItem 
                    text="All Content" 
                    icon={<LayoutGrid className="w-5 h-5" />} 
                    active={filter === "all"}
                    onClick={() => setFilter("all")}
                />
                <SidebarItem 
                    text="X" 
                    icon={<div className="w-5 h-5 flex items-center justify-center"><TwitterIcon /></div>} 
                    active={filter === "twitter"}
                    onClick={() => setFilter("twitter")}
                />
                <SidebarItem 
                    text="YouTube" 
                    icon={<div className="w-5 h-5 flex items-center justify-center"><YoutubeIcon /></div>} 
                    active={filter === "youtube"}
                    onClick={() => setFilter("youtube")}
                />
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/5">
                <SidebarItem 
                    text="Logout" 
                    icon={<LogOut className="w-5 h-5" />} 
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}
                />
            </div>
        </div>
    );
}