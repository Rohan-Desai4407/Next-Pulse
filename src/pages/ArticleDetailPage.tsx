import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Clock, Bookmark, Share2, Sparkles, Tag, ChevronRight,
  Heart, Lightbulb, BookOpen, Rocket, TrendingUp,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import NewsCard from '@/components/NewsCard';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { articles, savedIds, likedIds, toggleSave, toggleLike, learningResources, opportunities } = useData();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl text-soft">Article not found.</p>
        <Link to="/feed" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">Back to feed</Link>
      </div>
    );
  }

  const related = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);
  const saved = savedIds.includes(article.id);
  const liked = likedIds.includes(article.id);
  const relatedOpps = opportunities.filter((o) => o.category === article.category).slice(0, 2);

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-soft mb-6">
        <Link to="/feed" className="hover:text-white flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Feed</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/category/${article.category.toLowerCase()}`} className="hover:text-white">{article.category}</Link>
      </div>

      <article className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            {article.breaking && (
              <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> BREAKING
              </span>
            )}
            {article.trending && (
              <span className="px-2.5 py-1 rounded-full glass text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-orange-400" /> Trending
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full glass text-xs font-medium">{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{article.title}</h1>
          <p className="text-lg text-soft mb-6">{article.excerpt}</p>

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-app">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                {article.author[0]}
              </div>
              <div>
                <p className="text-sm font-semibold">{article.author}</p>
                <p className="text-xs text-soft">{article.source} {article.publishedAt} {article.readTime} min read</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleLike(article.id)} className="p-2.5 rounded-2xl glass hover:bg-white/5 transition-colors flex items-center gap-2">
                <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="text-sm">{article.likes + (liked ? 1 : 0)}</span>
              </button>
              <button onClick={() => toggleSave(article.id)} className="p-2.5 rounded-2xl glass hover:bg-white/5 transition-colors">
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-blue-500 text-blue-500' : ''}`} />
              </button>
              <button className="p-2.5 rounded-2xl glass hover:bg-white/5 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden mb-8">
            <img src={article.image} alt={article.title} className="w-full object-cover" />
          </div>

          {/* AI Summary */}
          <div className="glass rounded-2xl p-5 mb-6 flex gap-3">
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Summary</p>
              <p className="text-sm text-soft leading-relaxed">{article.aiSummary}</p>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="glass rounded-2xl p-5 mb-8 flex gap-3">
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1 flex items-center gap-1"><Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Why This Matters</p>
              <p className="text-sm text-soft leading-relaxed">{article.whyItMatters}</p>
            </div>
          </div>

          <div className="prose-content space-y-4">
            {article.content.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-soft">{p}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {article.tags.map((tag) => (
              <Link key={tag} to="/search" className="px-3 py-1.5 rounded-2xl glass text-sm text-soft flex items-center gap-1 hover:bg-white/5 transition-colors">
                <Tag className="w-3 h-3" /> {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Sidebar - AI Features */}
        <div className="space-y-6">
          {/* Related Articles */}
          {related.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400" /> Related Articles</h3>
              <div className="space-y-3">
                {related.map((a) => (
                  <Link key={a.id} to={`/article/${a.id}`} className="block p-2 rounded-xl hover:bg-white/5 transition-colors group">
                    <p className="text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">{a.title}</p>
                    <p className="text-xs text-soft mt-1">{a.source} {a.publishedAt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Learning */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-cyan-400" /> Suggested Learning</h3>
            <div className="space-y-3">
              {learningResources.slice(0, 3).map((r, i) => (
                <div key={i} className="p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                  <p className="text-sm font-medium">{r.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-soft">
                    <span>{r.provider}</span>
                    <span></span>
                    <span>{r.duration}</span>
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-lg glass text-xs">{r.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunity Recommendations */}
          {relatedOpps.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Rocket className="w-5 h-5 text-purple-400" /> Related Opportunities</h3>
              <div className="space-y-3">
                {relatedOpps.map((o) => (
                  <Link key={o.id} to="/opportunities" className="block p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <p className="text-sm font-medium">{o.title}</p>
                    <p className="text-xs text-soft mt-1">{o.company} {o.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* AI Chat CTA */}
          <div className="glass-strong rounded-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-semibold mb-1">Have questions about this article?</p>
            <p className="text-xs text-soft mb-3">Ask our AI assistant for deeper insights.</p>
            <Link to="/assistant" className="inline-block px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold">Ask AI</Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Stories</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((a, i) => (
              <NewsCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
