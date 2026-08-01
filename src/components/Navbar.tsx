import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Zap, Menu, X, Search, Bell, Bookmark, User, Sun, Moon,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { notifications } = useData();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const unread = notifications.filter((n) => !n.read).length;

  const links = [
    { to: '/feed', label: 'News Feed' },
    { to: '/categories', label: 'Categories' },
    { to: '/opportunities', label: 'Opportunities' },
    { to: '/assistant', label: 'AI Assistant' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-app animate-fade-in-down">
      <nav className="w-full px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-2xl gradient-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Next<span className="gradient-text animate-gradient">Pulse</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-2xl text-sm font-medium transition-all hover:bg-soft ${
                  loc.pathname.startsWith(l.to) ? 'text-app bg-soft' : 'text-soft hover:text-app'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/search" className="p-2.5 rounded-2xl hover:bg-soft transition-colors text-soft hover:text-app">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/saved" className="p-2.5 rounded-2xl hover:bg-soft transition-colors text-soft hover:text-app hidden sm:block">
            <Bookmark className="w-5 h-5" />
          </Link>
          <Link to="/notifications" className="p-2.5 rounded-2xl hover:bg-soft transition-colors text-soft hover:text-app relative hover:scale-110">
            <Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold animate-pulse">
                {unread}
              </span>
            )}
          </Link>
          <button onClick={toggle} className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-soft transition-colors text-soft hover:text-app font-medium text-sm">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:block">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <Link to="/profile" className="p-2.5 rounded-2xl hover:bg-soft transition-colors text-soft hover:text-app hidden sm:block">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/login" className="hidden sm:block ml-2 px-4 py-2 rounded-2xl gradient-primary text-white text-sm font-semibold hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
            Sign In
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2.5 rounded-2xl hover:bg-soft text-app">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass-strong border-t border-app animate-fade-in-down">
          <div className="px-4 py-3 space-y-1">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-2xl text-sm font-medium text-soft hover:text-app hover:bg-soft animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/profile" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-2xl text-sm font-medium text-soft hover:text-app hover:bg-soft">
              Profile
            </Link>
            <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-2xl text-sm font-medium gradient-primary text-white text-center">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
