import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, Zap } from 'lucide-react';

const suggestions = [
  'What the biggest AI news today?',
  'Find me internships in machine learning',
  'Summarize the latest quantum computing breakthrough',
  'What trending in tech right now?',
];

type Msg = { role: 'user' | 'ai'; content: string };

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', content: 'Hi! I your NextPulse AI assistant. I can summarize articles, find opportunities, analyze trends, and answer questions about any topic. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, {
        role: 'ai',
        content: `Here what I found about "${text}": Based on current trends and our AI analysis, this topic is gaining significant traction. I recommend checking the News Feed for the latest stories and the Opportunity Center for related positions. Would you like me to dive deeper into any specific aspect?`,
      }]);
    }, 800);
  };

  return (
    <div className="py-8 max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-sm text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />Online and ready</p>
        </div>
      </div>

      <div className="glass rounded-3xl flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              {m.role === 'ai' && (
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'gradient-primary text-white' : 'glass'}`}>
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl glass flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-soft" />
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-soft mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="px-3 py-1.5 rounded-xl glass text-sm text-soft hover:text-white hover:bg-white/5 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-app flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 rounded-2xl glass bg-transparent outline-none focus:border-blue-500 transition-colors text-sm"
          />
          <button onClick={() => send(input)} className="p-3 rounded-2xl gradient-primary text-white hover:scale-105 transition-transform">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
