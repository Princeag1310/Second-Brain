import { ExternalLink, Trash2 } from "lucide-react";
import { YoutubeIcon } from "../icons/YoutubeIcon";
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
            className="group flex flex-col bg-zinc-900/40 border border-white/5 rounded-2xl hover:border-white/10 hover:bg-zinc-900/60 transition-all duration-300 w-full break-inside-avoid"
        >
            <div className="p-4 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-xl",
                            isYoutube ? "bg-red-500/10" : 
                            isTwitter ? "bg-white/10 text-white" : 
                            "bg-white/10 text-zinc-300"
                        )}>
                            {isYoutube ? <YoutubeIcon className="w-6 h-6" /> : 
                             isTwitter ? <TwitterIcon /> : 
                             <ExternalLink className="w-5 h-5" />}
                        </div>
                        <h3 className="font-semibold text-zinc-100 truncate pr-2 text-lg">
                            {title}
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        {onDelete && (
                            <button 
                                onClick={onDelete}
                                className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-full">
                    {isYoutube && (
                        <div className="rounded-xl overflow-hidden bg-black/50 border border-white/5 relative w-full">
                            <iframe 
                                className="w-full aspect-video" 
                                src={link.replace("watch?v=", "embed/")} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            />
                        </div>
                    )}
                    {isTwitter && (
                        <div className="w-full flex justify-center overflow-hidden rounded-xl">
                            <blockquote className="twitter-tweet !m-0 w-full" data-theme="dark" style={{ width: '100%', maxWidth: '100%' }}>
                                <a href={link.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                        </div>
                    )}
                    {!isYoutube && !isTwitter && (
                        <div className="rounded-xl overflow-hidden bg-black/50 border border-white/5 relative w-full p-6 flex flex-col items-center justify-center min-h-[200px] text-center text-zinc-500 space-y-3">
                            <ExternalLink className="w-10 h-10 opacity-20" />
                            <a href={link} target="_blank" rel="noreferrer" className="text-sm hover:text-zinc-300 transition-colors break-all line-clamp-2">
                                {link}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}