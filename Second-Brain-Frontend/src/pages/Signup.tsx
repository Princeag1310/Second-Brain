import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (!username || !password) return;

        setLoading(true);
        setError("");
        
        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            });
            navigate("/signin");
        } catch (e: any) {
            setError(e.response?.data?.message || "Failed to sign up. Username may be taken.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden p-4">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-4">
                        <BrainCircuit className="w-7 h-7 text-indigo-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-100">Create Account</h1>
                    <p className="text-slate-400 text-sm mt-2">Start organizing your digital life</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Username</label>
                        <Input reference={usernameRef} placeholder="Choose a username" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Password</label>
                        <Input reference={passwordRef} placeholder="Create a strong password" type="password" />
                    </div>
                    <div className="pt-2">
                        <Button 
                            onClick={signup} 
                            variant="primary" 
                            text="Create Account" 
                            fullWidth 
                            loading={loading} 
                        />
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Sign in
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}