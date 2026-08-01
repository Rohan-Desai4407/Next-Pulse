import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, TrendingUp, Calendar, Briefcase, Rocket, Newspaper,
  ArrowRight, Trophy, Star, Zap, Eye, Flame,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import NewsCard from '@/components/NewsCard';
import Sidebar from '@/components/Sidebar';
import TrendingSidebar from '@/components/TrendingSidebar';
import TodaysBriefWidget from '@/components/TodaysBriefWidget';
import AIRecommendationWidget from '@/components/AIRecommendationWidget';
import CalendarWidget from '@/components/CalendarWidget';
import WeatherWidget from '@/components/WeatherWidget';
import MarketWidget from '@/components/MarketWidget';
import OpportunityCard from '@/components/OpportunityCard';

export default function DashboardPage() {
  const { articles, opportunities } = useData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const breaking = articles.filter((a) => a.breaking);
  const trending = articles.filter((a) => a.trending);
  const editorsPicks = articles.filter((a) => a.editorsPick);
  const internships = opportunities.filter((o) => o.type === 'internship').slice(0, 2);
  const hackathons = opportunities.filter((o) => o.type === 'hackathon').slice(0, 2);
  const jobs = opportunities.filter((o) => o.type === 'job').slice(0, 2);

  return (
    <div className="flex gap-6 py-6">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 space-y-8">
        {/* Breaking Banner */}
        {breaking.length > 0 && (
          <div className="glass-strong rounded-2xl p-4 flex items-center gap-3 border-red-500/20 animate-fade-in-down hover-glow">
            <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> BREAKING
            </span>
            <div className="overflow-hidden flex-1">
              <p className="text-sm truncate">{breaking[0].title}</p>
            </div>
            <Link to={`/article/${breaking[0].id}`} className="text-xs text-blue-400 hover:text-blue-300 shrink-0 flex items-center gap-1 group">Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></Link>
          </div>
        )}

        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-1">Good morning, Alex</h1>
          <p className="text-soft">Here your personalized AI-powered news dashboard.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TodaysBriefWidget />

            {/* Trending Stories */}
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2"><Flame className="w-5 h-5 text-orange-400 animate-pulse-slow" /> Trending Stories</h2>
                <Link to="/feed" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 group">View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {trending.slice(0, 4).map((a, i) => (
                  <NewsCard key={a.id} article={a} index={i} />
                ))}
              </div>
            </div>

            {/* Editor's Picks */}
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2"><Star className="w-5 h-5 text-amber-400" /> Editor Picks</h2>
                <Link to="/feed" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 group">View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {editorsPicks.slice(0, 4).map((a, i) => (
                  <NewsCard key={a.id} article={a} index={i} />
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="animate-fade-in-up">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-cyan-400 animate-pulse-slow" /> AI Recommendations</h2>
              <AIRecommendationWidget />
            </div>

            {/* Today's Top Headlines */}
            <div className="animate-fade-in-up">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><Newspaper className="w-5 h-5 text-blue-400" /> Today Top Headlines</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {articles.slice(0, 4).map((a, i) => (
                  <NewsCard key={a.id} article={a} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="animate-fade-in-up"><TrendingSidebar /></div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}><WeatherWidget /></div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}><CalendarWidget /></div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}><MarketWidget /></div>
            <div className="glass rounded-2xl p-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="font-bold mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-cyan-400" /> Quick Links</h3>
              <div className="space-y-1">
                <Link to="/search" className="block p-2 rounded-xl text-sm text-soft hover:text-white hover:bg-white/5 transition-colors">Search Articles</Link>
                <Link to="/assistant" className="block p-2 rounded-xl text-sm text-soft hover:text-white hover:bg-white/5 transition-colors">Ask AI Assistant</Link>
                <Link to="/saved" className="block p-2 rounded-xl text-sm text-soft hover:text-white hover:bg-white/5 transition-colors">View Saved</Link>
                <Link to="/settings" className="block p-2 rounded-xl text-sm text-soft hover:text-white hover:bg-white/5 transition-colors">Settings</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity Spotlight */}
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Rocket className="w-5 h-5 text-purple-400" /> Opportunity Spotlight</h2>
            <Link to="/opportunities" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 group">View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-cyan-400" /> Latest Internships</h3>
              <div className="space-y-4">
                {internships.map((o, i) => <OpportunityCard key={o.id} opp={o} index={i} />)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-400" /> Upcoming Hackathons</h3>
              <div className="space-y-4">
                {hackathons.map((o, i) => <OpportunityCard key={o.id} opp={o} index={i} />)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Rocket className="w-5 h-5 text-purple-400" /> Job Openings</h3>
              <div className="space-y-4">
                {jobs.map((o, i) => <OpportunityCard key={o.id} opp={o} index={i} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Category Highlights */}
        <div className="animate-fade-in-up">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><Eye className="w-5 h-5 text-green-400" /> Category Highlights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['AI', 'Business', 'Science', 'Sports'].map((cat, ci) => {
              const catArticles = articles.filter((a) => a.category === cat).slice(0, 1);
              if (catArticles.length === 0) return null;
              return (
                <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="block animate-fade-in-up" style={{ animationDelay: `${ci * 0.08}s` }}>
                  <div className="glass rounded-2xl p-4 hover-lift group">
                    <p className="text-xs text-blue-400 font-medium mb-2">{cat}</p>
                    <p className="text-sm font-medium line-clamp-3 group-hover:text-blue-400 transition-colors">{catArticles[0].title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
