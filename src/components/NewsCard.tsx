import { Link } from 'react-router-dom';
import { Bookmark, Share2, Clock, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { useData, Article } from '@/context/DataContext';

export default function NewsCard({ article, index = 0 }: { article: Article; index?: number }) {
  const { savedIds, likedIds, toggleSave, toggleLike } = useData();
  const saved = savedIds.includes(article.id);
  const liked = likedIds.includes(article.id);

  return (
    <article
      className="glass rounded-2xl overflow-hidden hover-lift group animate-fade-in-up flex flex-col"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <Link to={`/article/${article.id}`} className="block relative overflow-hidden">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {article.breaking && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> BREAKING
          </span>
        )}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass-strong text-xs font-medium">
          {article.category}
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link to={`/article/${article.id}`}>
          <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3 rounded-xl glass p-2.5">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <p className="text-xs text-soft line-clamp-2">{article.aiSummary}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-lg text-xs glass text-soft">#{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-soft mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-medium">{article.source}</span>
            <span></span>
            <Clock className="w-3 h-3" />
            <span>{article.readTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleLike(article.id)}
              className="p-1.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1"
              aria-label="Like article"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{article.likes + (liked ? 1 : 0)}</span>
            </button>
            <button
              onClick={() => toggleSave(article.id)}
              className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Save article"
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-blue-500 text-blue-500' : ''}`} />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" aria-label="Share article">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Link to={`/article/${article.id}`} className="mt-3 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium">
          Read More <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
