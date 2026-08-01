import { Newspaper } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function TodaysBriefWidget() {
  const { todaysBrief } = useData();

  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl" />
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-xl gradient-primary flex items-center justify-center">
          <Newspaper className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold">Today Brief</h3>
      </div>
      <p className="text-sm text-soft leading-relaxed">{todaysBrief}</p>
    </div>
  );
}
