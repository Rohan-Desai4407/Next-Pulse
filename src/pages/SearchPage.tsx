import { useState } from 'react';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';
import { useData, ALL_CATEGORIES } from '@/context/DataContext';
import NewsCard from '@/components/NewsCard';
import OpportunityCard from '@/components/OpportunityCard';

const countries = ['All', 'USA', 'UK', 'Japan', 'Spain', 'Global'];
const languages = ['All', 'English', 'Spanish', 'French', 'German'];
const dateRanges = ['All Time', 'Today', 'This Week', 'This Month'];
const popularity = ['Most Popular', 'Newest', 'Trending'];

export default function SearchPage() {
  const { articles, opportunities, trendingTopics } = useData();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All', date: 'All Time', country: 'All', language: 'All', popularity: 'Most Popular',
  });

  const q = query.toLowerCase();
  let articleResults = submitted ? articles.filter((a) =>
    a.title.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q)) ||
    a.category.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
  ) : [];
  let oppResults = submitted ? opportunities.filter((o) =>
    o.title.toLowerCase().includes(q) || o.tags.some((t) => t.toLowerCase().includes(q)) || o.company.toLowerCase().includes(q)
  ) : [];

  if (filters.category !== 'All') articleResults = articleResults.filter((a) => a.category === filters.category);
  if (filters.country !== 'All') articleResults = articleResults.filter((a) => a.country === filters.country);
  if (filters.language !== 'All') articleResults = articleResults.filter((a) => a.language === filters.language);
  if (filters.popularity === 'Trending') articleResults = articleResults.sort((a, b) => Number(b.trending) - Number(a.trending));
  if (filters.popularity === 'Most Popular') articleResults = articleResults.sort((a, b) => b.likes - a.likes);

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <div className="relative mb-4">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setSubmitted(true)}
          placeholder="Search articles, opportunities, topics..."
          className="w-full pl-12 pr-12 py-4 rounded-2xl glass bg-transparent outline-none focus:border-blue-500 transition-colors text-base"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button onClick={() => { setQuery(''); setSubmitted(false); }} className="p-1.5 rounded-lg hover:bg-white/5">
              <X className="w-4 h-4 text-soft" />
            </button>
          )}
          <button onClick={() => setShowFilters(!showFilters)} className={`p-1.5 rounded-lg transition-colors ${showFilters ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'}`}>
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="glass rounded-2xl p-5 mb-6 space-y-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="text-xs text-soft mb-1 block">Category</label>
              <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass bg-transparent text-sm outline-none">
                <option value="All" className="bg-slate-800">All</option>
                {ALL_CATEGORIES.map((c) => <option key={c} value={c} className="bg-slate-800">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-soft mb-1 block">Date</label>
              <select value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass bg-transparent text-sm outline-none">
                {dateRanges.map((d) => <option key={d} value={d} className="bg-slate-800">{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-soft mb-1 block">Country</label>
              <select value={filters.country} onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass bg-transparent text-sm outline-none">
                {countries.map((c) => <option key={c} value={c} className="bg-slate-800">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-soft mb-1 block">Language</label>
              <select value={filters.language} onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass bg-transparent text-sm outline-none">
                {languages.map((l) => <option key={l} value={l} className="bg-slate-800">{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-soft mb-1 block">Popularity</label>
              <select value={filters.popularity} onChange={(e) => setFilters({ ...filters, popularity: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass bg-transparent text-sm outline-none">
                {popularity.map((p) => <option key={p} value={p} className="bg-slate-800">{p}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {!submitted ? (
        <div>
          <h2 className="text-lg font-bold mb-4">Trending Searches</h2>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((t) => (
              <button key={t.topic} onClick={() => { setQuery(t.topic); setSubmitted(true); }}
                className="px-4 py-2 rounded-2xl glass text-sm hover:bg-white/5 transition-colors">
                {t.topic}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-soft text-sm">{articleResults.length + oppResults.length} results for {query}</p>
          {articleResults.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Articles</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {articleResults.map((a, i) => <NewsCard key={a.id} article={a} index={i} />)}
              </div>
            </div>
          )}
          {oppResults.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Opportunities</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {oppResults.map((o, i) => <OpportunityCard key={o.id} opp={o} index={i} />)}
              </div>
            </div>
          )}
          {articleResults.length === 0 && oppResults.length === 0 && (
            <div className="glass rounded-3xl p-16 text-center">
              <p className="text-xl text-soft mb-2">No results found</p>
              <p className="text-soft text-sm">Try a different search term or adjust your filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
