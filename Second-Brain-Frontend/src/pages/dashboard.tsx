import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { useContent } from '../hooks/useContent';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { Plus, Share2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const { contents, setContents, refresh, isLoading } = useContent();
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  async function handleDelete(contentId: string) {
    const originalContents = [...contents];
    // Optimistic UI update
    setContents(contents.filter(c => c._id !== contentId));
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId },
        headers: {
          authorization: localStorage.getItem("token")
        }
      } as any);
      // Deletion successful, UI is already updated
    } catch (e) {
      console.error("Failed to delete content", e);
      alert("Failed to delete content. Please ensure your backend is updated and running.");
      setContents(originalContents); // Revert optimistic update
    }
  }

  async function handleShare() {
    setIsSharing(true);
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
    } finally {
      setIsSharing(false);
    }
  }

  const filteredContents = contents.filter((c: any) => filter === "all" || c.type === filter);

  return (
    <div className="flex bg-black min-h-screen text-zinc-50 font-sans selection:bg-zinc-800 selection:text-white">
      <Sidebar filter={filter} setFilter={setFilter} />
      
      <div className="flex-1 ml-72">
        <CreateContentModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
        
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Your Brain</h1>
          
          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              onClick={handleShare} 
              variant="secondary" 
              text="Share Brain" 
              startIcon={<Share2 className="w-4 h-4" />} 
              loading={isSharing}
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center mt-32">
              <Loader2 className="w-10 h-10 animate-spin text-white mb-4" />
              <p className="text-zinc-400 font-medium">Loading your brain...</p>
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-32 text-center">
              <div className="w-24 h-24 rounded-full bg-zinc-900/50 border border-dashed border-zinc-800 flex items-center justify-center mb-6">
                <Plus className="w-10 h-10 text-zinc-600" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-100 mb-2">It's empty in here</h2>
              <p className="text-zinc-400 mb-6 max-w-sm">
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
              className="columns-[320px] gap-6 max-w-full"
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