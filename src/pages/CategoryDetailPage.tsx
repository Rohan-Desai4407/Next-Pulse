import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useData, ALL_CATEGORIES } from '@/context/DataContext';
import NewsCard from '@/components/NewsCard';
import TrendingSidebar from '@/components/TrendingSidebar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

export default function CategoryDetailPage() {
  const { name } = useParams();
  const { articles } = useData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const decodedName = decodeURIComponent(name || '').replace(/-/g, ' ');
  const categoryName = ALL_CATEGORIES.find((c) => c.toLowerCase() === decodedName.toLowerCase()) || decodedName;
  const filtered = articles.filter((a) => a.category.toLowerCase() === categoryName.toLowerCase());

  return (
    <div className="flex gap-6 py-6">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm text-soft mb-4">
          <Link to="/categories" className="hover:text-white flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Categories</Link>
          <ChevronRight className="w-3 h-3" />
          <span>{categoryName}</span>
        </div>

        <h1 className="text-3xl font-bold mb-2 capitalize">{categoryName}</h1>
        <p className="text-soft mb-8">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'} in {categoryName}</p>

        {filtered.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-5">
                {filtered.map((a, i) => (
                  <NewsCard key={a.id} article={a} index={i} />
                ))}
              </div>
            </div>
            <div>
              <TrendingSidebar />
            </div>
          </div>
        ) : (
          <div className="glass rounded-3xl p-16 text-center">
            <p className="text-xl text-soft mb-2">No articles in this category yet</p>
            <p className="text-soft text-sm">Check back soon for the latest {categoryName} news.</p>
            <Link to="/feed" className="inline-block mt-4 px-5 py-2.5 rounded-2xl gradient-primary text-white text-sm font-semibold">Browse all news</Link>
          </div>
        )}
      </div>
    </div>
  );
}
