import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        
        if (!username || !password) {
            alert("Please fill in both username and password");
            return;
        }

        setLoading(true);
        setError("");
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            });
            const jwt = (response.data as any).token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch (e: any) {
            console.error("Sign in failed", e);
            alert(e.response?.data?.message || "Invalid credentials. Please try again.");
            setError(e.response?.data?.message || "Failed to sign in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden p-4">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-4">
                        <BrainCircuit className="w-7 h-7 text-indigo-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-100">Welcome Back</h1>
                    <p className="text-slate-400 text-sm mt-2">Sign in to your Second Brain</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Username</label>
                        <Input reference={usernameRef} placeholder="Enter your username" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Password</label>
                        <Input reference={passwordRef} placeholder="Enter your password" type="password" />
                    </div>
                    <div className="pt-2">
                        <Button 
                            onClick={signin} 
                            variant="primary" 
                            text="Sign in" 
                            fullWidth 
                            loading={loading} 
                        />
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                        Sign up
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}