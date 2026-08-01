import { useState } from 'react';
import { useData } from '@/context/DataContext';
import NewsCard from '@/components/NewsCard';
import CategoryChips from '@/components/CategoryChips';
import TrendingSidebar from '@/components/TrendingSidebar';
import BreakingTicker from '@/components/BreakingTicker';

export default function FeedPage() {
  const { articles } = useData();
  const [filter, setFilter] = useState('All');
  const [visible, setVisible] = useState(6);

  const filtered = filter === 'All' ? articles : articles.filter((a) => a.category === filter);
  const shown = filtered.slice(0, visible);

  return (
    <div className="py-8">
      <BreakingTicker />
      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold mb-1">News Feed</h1>
        <p className="text-soft mb-6">AI-curated stories tailored to your interests.</p>
        <CategoryChips onFilter={setFilter} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-5">
            {shown.map((a, i) => (
              <NewsCard key={a.id} article={a} index={i} />
            ))}
          </div>
          {visible < filtered.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisible((v) => v + 4)}
                className="px-6 py-3 rounded-2xl glass hover:bg-white/5 transition-colors font-medium"
              >
                Load More
              </button>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <TrendingSidebar />
        </div>
      </div>
    </div>
  );
}
