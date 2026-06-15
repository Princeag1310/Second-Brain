import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [submitting, setSubmitting] = useState(false);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (!title || !link) {
            alert("Please fill in all fields");
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type
            }, {
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            });

            // Clear inputs
            if (titleRef.current) titleRef.current.value = "";
            if (linkRef.current) linkRef.current.value = "";
            
            onClose();
        } catch (e) {
            console.error("Failed to add content", e);
            alert("Failed to add content. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h2 className="text-xl font-semibold text-slate-100">Add New Content</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">Title</label>
                                <Input reference={titleRef} placeholder="e.g., My favorite tech talk" />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1.5">Link</label>
                                <Input reference={linkRef} placeholder="https://..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Content Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button 
                                        text="YouTube" 
                                        variant={type === ContentType.Youtube ? "primary" : "secondary"} 
                                        onClick={() => setType(ContentType.Youtube)}
                                        fullWidth
                                    />
                                    <Button 
                                        text="X" 
                                        variant={type === ContentType.Twitter ? "primary" : "secondary"} 
                                        onClick={() => setType(ContentType.Twitter)}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
                            <Button 
                                variant="ghost" 
                                text="Cancel" 
                                onClick={onClose} 
                            />
                            <Button 
                                variant="primary" 
                                text="Add Content" 
                                onClick={addContent} 
                                loading={submitting}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
