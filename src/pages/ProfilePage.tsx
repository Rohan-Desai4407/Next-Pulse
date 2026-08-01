import { Link } from 'react-router-dom';
import {
  Bookmark, Bell, Settings as SettingsIcon, TrendingUp, Clock, Award,
  Mail, MapPin, Briefcase, LogOut, Moon, Sun, Eye, Heart,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import NewsCard from '@/components/NewsCard';

export default function ProfilePage() {
  const { articles, savedIds, likedIds, userInterests, userRole } = useData();
  const { theme, toggle } = useTheme();
  const saved = articles.filter((a) => savedIds.includes(a.id));
  const liked = articles.filter((a) => likedIds.includes(a.id));

  const stats = [
    { icon: Bookmark, label: 'Saved', value: savedIds.length, color: 'text-blue-400' },
    { icon: Clock, label: 'Read', value: 142, color: 'text-cyan-400' },
    { icon: TrendingUp, label: 'Streak', value: '7 days', color: 'text-green-400' },
    { icon: Award, label: 'Level', value: 'Pro', color: 'text-amber-400' },
  ];

  const readingHistory = articles.slice(0, 4).map((a, i) => ({ ...a, readAt: `${i + 1}h ago` }));

  const notifPrefs = [
    { label: 'Breaking News', enabled: true },
    { label: 'Daily Digest', enabled: true },
    { label: 'Opportunity Alerts', enabled: true },
    { label: 'Weekly Summary', enabled: false },
    { label: 'Personalized Recommendations', enabled: true },
  ];

  return (
    <div className="py-8 max-w-5xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center text-4xl font-bold text-white shrink-0">
            A
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Alex Morgan</h1>
            <p className="text-soft mt-1 flex items-center gap-2"><Briefcase className="w-4 h-4" /> {userRole}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-soft">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> San Francisco, CA</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> alex@nextpulse.io</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={toggle} className="p-2.5 rounded-2xl glass hover:bg-white/5 transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link to="/settings" className="p-2.5 rounded-2xl glass hover:bg-white/5 transition-colors"><SettingsIcon className="w-5 h-5" /></Link>
            <Link to="/notifications" className="p-2.5 rounded-2xl glass hover:bg-white/5 transition-colors"><Bell className="w-5 h-5" /></Link>
            <button className="p-2.5 rounded-2xl glass hover:bg-red-500/10 hover:text-red-400 transition-colors"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5 text-center">
            <s.icon className={`w-6 h-6 mx-auto mb-2 ${s.color}`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-soft">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Interests */}
      <div>
        <h2 className="text-xl font-bold mb-4">Selected Interests</h2>
        <div className="flex flex-wrap gap-2">
          {userInterests.map((i) => (
            <span key={i} className="px-4 py-2 rounded-2xl gradient-primary text-white text-sm font-medium">{i}</span>
          ))}
          <Link to="/settings" className="px-4 py-2 rounded-2xl border-2 border-dashed border-app text-sm text-soft hover:text-white hover:border-blue-500 transition-colors">
            + Edit Interests
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reading History */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Eye className="w-5 h-5 text-cyan-400" /> Reading History</h2>
          <div className="space-y-2">
            {readingHistory.map((a) => (
              <Link key={a.id} to={`/article/${a.id}`} className="glass rounded-2xl p-3 flex items-center gap-3 hover:bg-white/5 transition-colors group">
                <img src={a.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">{a.title}</p>
                  <p className="text-xs text-soft mt-1">{a.source} {a.readAt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-amber-400" /> Notification Preferences</h2>
          <div className="glass rounded-2xl p-5 space-y-3">
            {notifPrefs.map((p) => (
              <div key={p.label} className="flex items-center justify-between">
                <span className="text-sm text-soft">{p.label}</span>
                <div className={`w-11 h-6 rounded-full transition-colors relative ${p.enabled ? 'gradient-primary' : 'glass'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${p.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Articles */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Bookmark className="w-5 h-5 text-blue-400" /> Saved Articles</h2>
        {saved.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {saved.slice(0, 3).map((a, i) => <NewsCard key={a.id} article={a} index={i} />)}
          </div>
        ) : (
          <p className="text-soft">No saved articles yet.</p>
        )}
      </div>

      {/* Liked Articles */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-red-400" /> Liked Articles</h2>
        {liked.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {liked.slice(0, 3).map((a, i) => <NewsCard key={a.id} article={a} index={i} />)}
          </div>
        ) : (
          <p className="text-soft">No liked articles yet.</p>
        )}
      </div>
    </div>
  );
}
