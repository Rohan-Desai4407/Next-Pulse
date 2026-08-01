import { useState } from 'react';
import { Bookmark, Briefcase, Search as SearchIcon, FolderOpen } from 'lucide-react';
import { useData } from '@/context/DataContext';
import NewsCard from '@/components/NewsCard';
import OpportunityCard from '@/components/OpportunityCard';

export default function SavedArticlesPage() {
  const { articles, opportunities, savedIds } = useData();
  const [tab, setTab] = useState<'articles' | 'opportunities' | 'searches'>('articles');

  const savedArticles = articles.filter((a) => savedIds.includes(a.id));
  const savedOpps = opportunities.filter((o) => savedIds.includes(o.id));
  const savedSearches = [
    { id: 's1', query: 'AI breakthroughs', filters: 'Category: AI, Date: This Week', count: 12 },
    { id: 's2', query: 'Quantum computing', filters: 'Category: Science', count: 5 },
    { id: 's3', query: 'Internships in ML', filters: 'Type: Internship', count: 8 },
  ];

  const tabs = [
    { key: 'articles' as const, label: 'Articles', icon: Bookmark, count: savedArticles.length },
    { key: 'opportunities' as const, label: 'Opportunities', icon: Briefcase, count: savedOpps.length },
    { key: 'searches' as const, label: 'Searches', icon: SearchIcon, count: savedSearches.length },
  ];

  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
          <Bookmark className="w-5 h-5 text-white" fill="white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Saved</h1>
          <p className="text-soft">Your saved articles, opportunities, and searches.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
              tab === t.key ? 'gradient-primary text-white' : 'glass text-soft hover:text-white'
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
            <span className={`px-1.5 py-0.5 rounded-lg text-xs ${tab === t.key ? 'bg-white/20' : 'glass'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {tab === 'articles' && (
        savedArticles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedArticles.map((a, i) => <NewsCard key={a.id} article={a} index={i} />)}
          </div>
        ) : (
          <EmptyState icon={Bookmark} title="No saved articles" desc="Bookmark articles to read them later." />
        )
      )}

      {tab === 'opportunities' && (
        savedOpps.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedOpps.map((o, i) => <OpportunityCard key={o.id} opp={o} index={i} />)}
          </div>
        ) : (
          <EmptyState icon={Briefcase} title="No saved opportunities" desc="Save internships, jobs, and hackathons to track them here." />
        )
      )}

      {tab === 'searches' && (
        savedSearches.length > 0 ? (
          <div className="space-y-3">
            {savedSearches.map((s) => (
              <div key={s.id} className="glass rounded-2xl p-5 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                    <SearchIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{s.query}</p>
                    <p className="text-xs text-soft">{s.filters} {s.count} results</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl glass text-sm font-medium hover:bg-white/5 transition-colors">Run Search</button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={FolderOpen} title="No saved searches" desc="Save your searches to run them again later." />
        )
      )}
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }: { icon: typeof Bookmark; title: string; desc: string }) {
  return (
    <div className="glass rounded-3xl p-16 text-center">
      <Icon className="w-12 h-12 text-soft mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-soft">{desc}</p>
    </div>
  );
}
