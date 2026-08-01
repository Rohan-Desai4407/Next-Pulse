import { TrendingUp, TrendingDown, Flame } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function TrendingSidebar() {
  const { trendingTopics } = useData();

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-orange-400" />
        <h3 className="font-bold">Trending Now</h3>
      </div>
      <div className="space-y-1">
        {trendingTopics.map((t, i) => (
          <div key={t.topic} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-soft w-5">{i + 1}</span>
              <div>
                <p className="text-sm font-medium">{t.topic}</p>
                <p className="text-xs text-soft">{t.count}</p>
              </div>
            </div>
            {t.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
