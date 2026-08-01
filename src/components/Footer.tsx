import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const cols = [
    { title: 'Product', links: [{ to: '/feed', label: 'News Feed' }, { to: '/categories', label: 'Categories' }, { to: '/opportunities', label: 'Opportunities' }, { to: '/assistant', label: 'AI Assistant' }, { to: '/search', label: 'Search' }] },
    { title: 'Company', links: [{ to: '/', label: 'About' }, { to: '/', label: 'Contact' }, { to: '/', label: 'Help Center' }, { to: '/admin', label: 'Admin' }] },
    { title: 'Hubs', links: [{ to: '/student', label: 'Student Hub' }, { to: '/professional', label: 'Professional Hub' }, { to: '/dashboard', label: 'Dashboard' }] },
    { title: 'Account', links: [{ to: '/profile', label: 'Profile' }, { to: '/settings', label: 'Settings' }, { to: '/saved', label: 'Saved' }, { to: '/notifications', label: 'Notifications' }] },
    { title: 'Legal', links: [{ to: '/', label: 'Privacy Policy' }, { to: '/', label: 'Terms of Service' }, { to: '/', label: 'Cookie Policy' }] },
  ];

  return (
    <footer className="border-t border-app mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-2xl gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold">Next<span className="gradient-text">Pulse</span></span>
            </Link>
            <p className="text-sm text-soft max-w-xs">AI-powered news platform delivering tomorrow headlines today.</p>
            <div className="flex gap-3 mt-4">
              {[Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-xl glass hover:scale-110 transition-transform text-soft hover:text-app">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="text-sm text-soft hover:text-app transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-app flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-soft"> 2026 NextPulse. All rights reserved.</p>
          <p className="text-sm text-soft">Powered by AI. Built for the curious.</p>
        </div>
      </div>
    </footer>
  );
}
