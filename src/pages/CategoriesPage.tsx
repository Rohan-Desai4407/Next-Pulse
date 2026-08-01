import { Link } from 'react-router-dom';
import { ALL_CATEGORIES, useData } from '@/context/DataContext';

const categoryColors: Record<string, string> = {
  Technology: 'from-blue-500 to-blue-600', AI: 'from-purple-500 to-purple-600',
  Business: 'from-emerald-500 to-emerald-600', Finance: 'from-green-500 to-green-600',
  Economy: 'from-teal-500 to-teal-600', Education: 'from-indigo-500 to-indigo-600',
  Sports: 'from-orange-500 to-orange-600', Entertainment: 'from-pink-500 to-pink-600',
  Movies: 'from-rose-500 to-rose-600', Health: 'from-red-500 to-red-600',
  Science: 'from-cyan-500 to-cyan-600', Environment: 'from-green-500 to-emerald-600',
  Politics: 'from-slate-500 to-slate-600', World: 'from-blue-500 to-cyan-600',
  Local: 'from-amber-500 to-amber-600', Lifestyle: 'from-violet-500 to-violet-600',
  Travel: 'from-sky-500 to-sky-600', Food: 'from-amber-500 to-orange-600',
  Gaming: 'from-fuchsia-500 to-fuchsia-600', Automobiles: 'from-zinc-500 to-zinc-600',
  Space: 'from-indigo-500 to-purple-600', Startups: 'from-emerald-500 to-teal-600',
};

export default function CategoriesPage() {
  const { articles } = useData();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-2">All Categories</h1>
      <p className="text-soft mb-8">Explore news across 22 categories. Something for everyone.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ALL_CATEGORIES.map((cat, i) => {
          const count = articles.filter((a) => a.category === cat).length;
          const gradient = categoryColors[cat] || 'from-blue-500 to-purple-600';
          return (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/\s/g, '-')}`}
              className="glass rounded-2xl p-5 hover-lift group relative overflow-hidden animate-pop-in"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-2xl group-hover:opacity-50 group-hover:scale-150 transition-all duration-500`} />
              <div className="relative">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradient} mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform`} />
                <h3 className="font-bold text-lg mb-1">{cat}</h3>
                <p className="text-sm text-soft">{count} {count === 1 ? 'article' : 'articles'}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
