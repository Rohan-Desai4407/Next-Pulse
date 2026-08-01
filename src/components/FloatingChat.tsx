import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, Send } from 'lucide-react';

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: 'Hi! I your AI news assistant. Ask me about any topic, trend, or opportunity.' },
  ]);
  const navigate = useNavigate();

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: userMsg }]);
    setTimeout(() => {
      setMessages((m) => [...m, {
        role: 'ai',
        content: 'Great question! I can help you explore that topic in depth. Opening the full AI Assistant for a richer experience.',
      }]);
    }, 600);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 glass-strong rounded-2xl shadow-2xl z-50 animate-fade-in-up overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-app">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Assistant</p>
                <p className="text-xs text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => navigate('/assistant')} className="text-xs text-soft hover:text-white px-2 py-1 rounded-lg hover:bg-white/5">Open full</button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5"><X className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'gradient-primary text-white' : 'glass'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-app flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-soft"
            />
            <button onClick={send} className="p-2 rounded-xl gradient-primary text-white"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-2xl gradient-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-3 transition-all z-50 group animate-pulse-slow"
        aria-label="Open AI chat"
      >
        {open ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />}
      </button>
    </>
  );
}
