import { TrendingUp, TrendingDown } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function MarketWidget() {
  const { market } = useData();

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="font-bold mb-4">Market Snapshot</h3>
      <div className="space-y-2">
        {market.map((s) => (
          <div key={s.symbol} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors">
            <div>
              <p className="text-sm font-semibold">{s.symbol}</p>
              <p className="text-xs text-soft">{s.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">${s.price.toFixed(2)}</p>
              <p className={`text-xs flex items-center gap-1 justify-end ${s.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {s.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {s.change > 0 ? '+' : ''}{s.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
