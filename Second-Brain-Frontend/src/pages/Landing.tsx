import { motion } from "framer-motion";
import { useEffect } from "react";
import { BrainCircuit, Share2, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Second Brain | Your Digital Mind";
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-50 relative overflow-hidden flex flex-col">
      {/* Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 z-10 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
          <BrainCircuit className="w-8 h-8 text-indigo-500" />
          <span>Second Brain</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/signin")}
            className="text-slate-300 hover:text-white transition-colors font-medium px-4 py-2"
          >
            Login
          </button>
          <Button 
            variant="primary" 
            text="Get Started" 
            onClick={() => navigate("/signup")} 
          />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 mt-16 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 border border-indigo-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>The ultimate knowledge hub</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
        >
          Your Digital Mind, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Perfectly Organized.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10"
        >
          Save your favorite tweets, YouTube videos, and links in one secure place. 
          Generate a beautiful public page to share your second brain with the world.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button 
            variant="primary" 
            text="Get Started" 
            onClick={() => navigate("/signup")}
            className="px-8 py-4 text-lg"
          />
        </motion.div>
      </main>

      {/* Features Grid */}
      <section className="bg-zinc-950/50 border-t border-white/5 py-24 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BrainCircuit className="w-6 h-6 text-indigo-400" />,
                title: "Centralized Knowledge",
                desc: "Never lose a link again. Store everything securely in your personal vault."
              },
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: "Lightning Fast",
                desc: "Built on modern web technologies to ensure your content loads instantly."
              },
              {
                icon: <Share2 className="w-6 h-6 text-emerald-400" />,
                title: "Share with the World",
                desc: "Generate a public link to share your curated collections with others."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-zinc-950/30 border border-white/5 hover:bg-zinc-900/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-4 border border-white/5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-200">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
