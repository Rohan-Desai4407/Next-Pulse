import { Link, useLocation } from 'react-router-dom';
import {
  Home, Newspaper, TrendingUp, LayoutGrid, Rocket, Bookmark,
  Sparkles, Settings, X,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/feed', label: 'Latest News', icon: Newspaper },
  { to: '/feed?filter=trending', label: 'Trending', icon: TrendingUp },
  { to: '/categories', label: 'Categories', icon: LayoutGrid },
  { to: '/opportunities', label: 'Opportunities', icon: Rocket },
  { to: '/saved', label: 'Saved', icon: Bookmark },
  { to: '/assistant', label: 'AI Assistant', icon: Sparkles },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const loc = useLocation();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 glass border-r border-app p-4 transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <span className="font-bold">Menu</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5"><X className="w-5 h-5" /></button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item, i) => {
            const active = loc.pathname === item.to.split('?')[0];
            return (
              <Link
                key={item.to}
                to={item.to.split('?')[0]}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all animate-fade-in-up ${active ? 'gradient-primary text-white shadow-lg shadow-blue-500/20' : 'text-soft hover:text-white hover:bg-white/5 hover:translate-x-1'}`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 p-4 rounded-2xl glass hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm font-semibold mb-1">Upgrade to Pro</p>
          <p className="text-xs text-soft mb-3">Unlock advanced AI analysis and unlimited bookmarks.</p>
          <button className="w-full py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:scale-105 transition-transform">Upgrade</button>
        </div>
      </aside>
    </>
  );
}
