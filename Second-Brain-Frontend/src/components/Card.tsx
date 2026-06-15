import { ExternalLink, Play, Trash2 } from "lucide-react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { useEffect } from "react";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter" | string;
    onDelete?: () => void;
}

export function Card({ title, link, type, onDelete }: CardProps) {
    const isYoutube = type === "youtube";
    const isTwitter = type === "twitter";

    useEffect(() => {
        if (isTwitter) {
            // @ts-ignore
            if (window.twttr) {
                // @ts-ignore
                window.twttr.widgets.load();
            }
        }
    }, [isTwitter, link]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="group flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-indigo-500/10 hover:border-slate-700 transition-all duration-300 w-full"
        >
            <div className="p-5 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-xl",
                            isYoutube ? "bg-red-500/10 text-red-500" : 
                            isTwitter ? "bg-sky-500/10 text-sky-500" : 
                            "bg-indigo-500/10 text-indigo-500"
                        )}>
                            {isYoutube ? <Play className="w-5 h-5 fill-current" /> : 
                             isTwitter ? <TwitterIcon /> : 
                             <ExternalLink className="w-5 h-5" />}
                        </div>
                        <h3 className="font-semibold text-slate-200 truncate pr-2 text-lg">
                            {title}
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        {onDelete && (
                            <button 
                                onClick={onDelete}
                                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="rounded-xl overflow-hidden bg-slate-950/50 border border-slate-800 relative w-full">
                    {isYoutube && (
                        <iframe 
                            className="w-full aspect-video" 
                            src={link.replace("watch?v=", "embed/")} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        />
                    )}
                    {isTwitter && (
                        <div className="w-full flex items-center justify-center">
                            <blockquote className="twitter-tweet w-full !m-0" data-theme="dark">
                                <a href={link.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                        </div>
                    )}
                    {!isYoutube && !isTwitter && (
                        <div className="p-6 flex flex-col items-center justify-center h-full text-center text-slate-500 space-y-3 min-h-[200px]">
                            <ExternalLink className="w-10 h-10 opacity-20" />
                            <a href={link} target="_blank" rel="noreferrer" className="text-sm hover:text-indigo-400 transition-colors break-all line-clamp-2">
                                {link}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}