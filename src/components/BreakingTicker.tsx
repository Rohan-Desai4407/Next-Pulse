import { Radio } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function BreakingTicker() {
  const { articles } = useData();
  const breaking = articles.filter((a) => a.breaking);
  const items = breaking.length > 0 ? breaking : articles.slice(0, 8); // increased fallback to 8 items
  const quadrupled = [...items, ...items, ...items, ...items]; // more copies for smooth continuous scrolling

  return (
    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 glass border-y border-app overflow-hidden shadow-md">
      <div className="flex items-center w-full">
        <div className="flex items-center gap-3 px-5 sm:px-8 py-3.5 shrink-0 border-r border-app gradient-primary z-10 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span className="text-sm font-bold tracking-widest text-white flex items-center gap-2 whitespace-nowrap uppercase">
            <Radio className="w-4 h-4 animate-pulse-slow" /> BREAKING NEWS
          </span>
        </div>
        <div className="overflow-hidden flex-1 relative">
          <div className="flex gap-16 animate-ticker whitespace-nowrap w-max" style={{ animationDuration: '40s' }}>
            {quadrupled.map((a, i) => (
              <span key={i} className="text-sm text-soft py-3.5 flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <span className="text-blue-400 font-bold uppercase tracking-wide text-xs">{a.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-soft opacity-50" />
                <span className="font-medium">{a.title}</span>
              </span>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-app pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-l from-transparent to-app pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
