import { Sparkles, ArrowRight } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function AIRecommendationWidget() {
  const { aiRecommendations } = useData();

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-xl gradient-accent flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold">AI Recommendations</h3>
      </div>
      <div className="space-y-2">
        {aiRecommendations.map((r, i) => (
          <div key={i} className="p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <p className="text-sm font-medium mb-1 group-hover:text-blue-400 transition-colors">{r.title}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-soft">{r.reason}</p>
              <ArrowRight className="w-3 h-3 text-soft group-hover:text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
