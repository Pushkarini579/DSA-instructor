import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import type { Message } from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import type { Topic } from './components/Sidebar';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const textError = await response.text();
        throw new Error(`Server returned non-JSON response: ${textError.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from AI');
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error.message || 'I encountered an issue. Please check your API key in Vercel settings.'}`,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopicId(topic.id);
    handleSendMessage(topic.prompt);
  };

  const handleClearChat = () => {
    setMessages([]);
    setSelectedTopicId(null);
  };

  return (
    <div className="h-screen w-screen bg-slate-50 flex overflow-hidden">
      <Sidebar 
        selectedTopicId={selectedTopicId} 
        onTopicClick={handleTopicClick} 
      />
      <main className="flex-1 p-2 md:p-8 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full max-w-5xl">
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            onClearChat={handleClearChat}
            isLoading={isLoading}
            title="DSA Instructor AI"
            placeholder="Ask about Linked Lists, Trees, Sorting..."
          />
        </div>
      </main>
    </div>
  );
};

export default App;
