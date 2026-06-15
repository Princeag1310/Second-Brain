import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { useContent } from '../hooks/useContent';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { Plus, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  async function handleDelete(contentId: string) {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId },
        headers: {
          authorization: localStorage.getItem("token")
        }
      } as any);
      refresh();
    } catch (e) {
      console.error("Failed to delete content", e);
    }
  }

  async function handleShare() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
          share: true
      }, {
          headers: {
              authorization: localStorage.getItem("token")
          }
      });
      const shareUrl = `${window.location.origin}/share/${(response.data as any).hash}`;
      navigator.clipboard.writeText(shareUrl);
      alert(`Share link copied to clipboard!\n\n${shareUrl}`);
    } catch (e) {
      console.error("Failed to share brain", e);
    }
  }

  const filteredContents = contents.filter(c => filter === "all" || c.type === filter);

  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-50 font-sans selection:bg-indigo-500/30">
      <Sidebar filter={filter} setFilter={setFilter} />
      
      <div className="flex-1 ml-72">
        <CreateContentModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
        
        <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Your Brain</h1>
          
          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              onClick={handleShare} 
              variant="secondary" 
              text="Share Brain" 
              startIcon={<Share2 className="w-4 h-4" />} 
              className="whitespace-nowrap"
            />
            <Button 
              onClick={() => setModalOpen(true)} 
              variant="primary" 
              text="Add Content" 
              startIcon={<Plus className="w-4 h-4" />} 
              className="whitespace-nowrap"
            />
          </div>
        </header>

        <main className="p-8">
          {filteredContents.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-32 text-center">
              <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
                <Plus className="w-10 h-10 text-slate-500" />
              </div>
              <h2 className="text-xl font-semibold text-slate-200 mb-2">It's empty in here</h2>
              <p className="text-slate-400 mb-6 max-w-sm">
                {filter === "all" ? "Start building your second brain by adding links to your favorite Youtube videos or Tweets." : `You don't have any ${filter === 'twitter' ? 'X' : 'YouTube'} content yet.`}
              </p>
              <Button 
                onClick={() => setModalOpen(true)} 
                variant="primary" 
                text="Add Content" 
                startIcon={<Plus className="w-4 h-4" />} 
              />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] items-start"
            >
              {filteredContents.map(({ _id, type, link, title }) => (
                <Card 
                  key={_id}
                  title={title} 
                  type={type as "youtube" | "twitter"} 
                  link={link} 
                  onDelete={() => handleDelete(_id)}
                />
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}