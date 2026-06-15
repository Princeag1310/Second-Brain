import { BrainCircuit, LogOut, LayoutGrid } from "lucide-react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-slate-950 border-r border-slate-800 w-72 fixed left-0 top-0 flex flex-col z-20">
            {/* Logo Area */}
            <div className="flex items-center gap-3 px-8 py-8 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.15)]">
                    <BrainCircuit className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-100">
                    Second Brain
                </span>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 px-4 space-y-2 overflow-y-auto">
                <SidebarItem 
                    text="All Content" 
                    icon={<LayoutGrid className="w-5 h-5" />} 
                    active={true}
                />
                <SidebarItem 
                    text="Twitter" 
                    icon={<div className="w-5 h-5"><TwitterIcon /></div>} 
                />
                <SidebarItem 
                    text="YouTube" 
                    icon={<div className="w-5 h-5"><YoutubeIcon /></div>} 
                />
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-800">
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