import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Lightbulb, Trash2, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading?: boolean;
  placeholder?: string;
  title?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  isLoading = false,
  placeholder = "Ask a DSA question...",
  title = "DSA Instructor AI"
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent, customText?: string) => {
    e?.preventDefault();
    const textToSend = customText || input;
    if (textToSend.trim() && !isLoading) {
      onSendMessage(textToSend);
      if (!customText) setInput('');
    }
  };

  const quickActions = [
    { label: "Give me example", icon: <Sparkles size={14} />, prompt: "Can you give me a practical example of this?" },
    { label: "Explain simply", icon: <Lightbulb size={14} />, prompt: "Can you explain this in very simple terms for a beginner?" }
  ];

  return (
    <div className="flex flex-col h-full bg-white border border-slate-100/80 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 relative">
      {/* Header with soft gradient */}
      <div className="py-4 md:py-6 px-6 md:px-8 flex items-center justify-between bg-gradient-to-r from-soft-blue-50 to-white border-b border-slate-50 relative overflow-hidden z-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-soft-blue-100/30 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-3 md:gap-4 relative z-10">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-soft-blue-500 flex items-center justify-center text-white shadow-xl shadow-soft-blue-200 transform transition-transform hover:scale-105 duration-300">
            <Bot size={22} className="md:w-6 md:h-6" />
          </div>
          <div>
            <h2 className="text-base md:text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <span className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Instructor</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClearChat}
          className="p-2 md:p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all relative z-10 group"
          title="Clear Conversation"
        >
          <Trash2 size={20} className="md:w-5 md:h-5 transition-transform group-hover:scale-110" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 md:space-y-10 bg-[#fafcff]/50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-soft-blue-50 rounded-full flex items-center justify-center text-soft-blue-500 mb-2 shadow-inner">
              <MessageSquare size={32} className="md:w-10 md:h-10 opacity-40" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800">Ask me any DSA question!</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-xs md:max-w-md leading-relaxed">
              I'm your expert instructor for Data Structures and Algorithms. Pick a topic from the sidebar or type a question below to start learning.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`flex gap-3 md:gap-5 max-w-[95%] md:max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm transition-all duration-300 hover:shadow-md ${
                  message.sender === 'user' ? 'bg-soft-blue-100 text-soft-blue-600' : 'bg-white text-slate-400 border border-slate-100'
                }`}>
                  {message.sender === 'user' ? <User size={16} className="md:w-5 md:h-5" /> : <Bot size={16} className="md:w-5 md:h-5" />}
                </div>
                <div className={`px-4 py-3 md:px-6 md:py-5 rounded-[1.2rem] md:rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.02)] text-sm md:text-[15px] leading-relaxed transition-all duration-300 ${
                  message.sender === 'user'
                    ? 'bg-soft-blue-500 text-white rounded-tr-none hover:shadow-soft-blue-200/50'
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100/50 hover:border-slate-200'
                }`}>
                  <div className="markdown-container prose prose-slate max-w-none prose-sm md:prose-base prose-headings:font-bold prose-headings:text-slate-900 prose-p:my-2 md:prose-p:my-3 prose-li:my-1 prose-code:bg-slate-100 prose-code:text-soft-blue-600 prose-code:font-semibold prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-lg">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex gap-3 items-center text-slate-500 text-xs bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border border-slate-100 shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-soft-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-soft-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-soft-blue-500 rounded-full animate-bounce"></span>
              </div>
              Instructor is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Area */}
      <div className="p-4 md:p-8 bg-white border-t border-slate-50 space-y-4 md:space-y-6">
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleSubmit(undefined, action.prompt)}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-white border border-slate-200 rounded-full text-[11px] md:text-[13px] font-bold text-slate-600 hover:border-soft-blue-300 hover:text-soft-blue-600 hover:bg-soft-blue-50 hover:shadow-sm transform active:scale-95 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-soft-blue-500">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full px-5 py-4 md:px-8 md:py-5 pr-14 md:pr-20 bg-slate-50/50 border border-slate-200 rounded-[1.2rem] md:rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-soft-blue-500/5 focus:border-soft-blue-400 focus:bg-white transition-all placeholder:text-slate-400 text-slate-700 shadow-inner group-hover:bg-white/80 text-sm md:text-base"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-1.5 top-1.5 bottom-1.5 md:right-2.5 md:top-2.5 md:bottom-2.5 px-4 md:px-6 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
              input.trim() && !isLoading
                ? 'bg-soft-blue-500 text-white shadow-lg shadow-soft-blue-200 hover:bg-soft-blue-600 hover:translate-y-[-1px] active:scale-95 active:translate-y-0'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} className="md:w-5 md:h-5" />
          </button>
        </form>
        <p className="hidden md:block text-center text-[11px] text-slate-400 uppercase tracking-[0.3em] font-extrabold opacity-60">
          Mastering Data Structures & Algorithms
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
