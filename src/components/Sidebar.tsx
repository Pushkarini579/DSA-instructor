import React from 'react';
import { 
  Hash, 
  GitCommit, 
  Layers, 
  FlipVertical, 
  TreePine, 
  Network,
  ChevronRight
} from 'lucide-react';

export interface Topic {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
}

const topics: Topic[] = [
  { id: 'arrays', label: 'Arrays', icon: <Hash size={18} />, prompt: "What are Arrays in DSA? Please explain with a simple example." },
  { id: 'linkedlist', label: 'Linked List', icon: <GitCommit size={18} />, prompt: "Can you explain Linked Lists and why they are useful?" },
  { id: 'stack', label: 'Stack', icon: <Layers size={18} />, prompt: "How does a Stack work? Explain the LIFO principle." },
  { id: 'queue', label: 'Queue', icon: <FlipVertical size={18} />, prompt: "What is a Queue? Explain the FIFO principle." },
  { id: 'trees', label: 'Trees', icon: <TreePine size={18} />, prompt: "What are Binary Trees? Explain the basic structure." },
  { id: 'graphs', label: 'Graphs', icon: <Network size={18} />, prompt: "What are Graphs in DSA? Explain nodes and edges simply." },
];

interface SidebarProps {
  selectedTopicId: string | null;
  onTopicClick: (topic: Topic) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTopicId, onTopicClick }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-100 flex flex-col h-full hidden md:flex">
      <div className="p-6">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
          Learning Tracks
        </h2>
        <nav className="space-y-1">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onTopicClick(topic)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                selectedTopicId === topic.id
                  ? 'bg-soft-blue-50 text-soft-blue-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  selectedTopicId === topic.id ? 'bg-white shadow-sm' : 'bg-slate-50 group-hover:bg-white'
                }`}>
                  {topic.icon}
                </div>
                <span className="text-sm font-semibold">{topic.label}</span>
              </div>
              <ChevronRight 
                size={14} 
                className={`transition-transform ${
                  selectedTopicId === topic.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`} 
              />
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-50">
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Progress
          </p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-soft-blue-500 h-full w-1/3 rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">
            2 of 6 topics explored
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
