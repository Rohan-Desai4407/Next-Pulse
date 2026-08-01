import { useState } from 'react';
import { Bell, Check, Zap, Sparkles, Rocket, Newspaper } from 'lucide-react';
import { useData } from '@/context/DataContext';

const sections = [
  { key: 'breaking', label: 'Breaking News', icon: Zap, color: 'text-red-400' },
  { key: 'recommended', label: 'Recommended Stories', icon: Sparkles, color: 'text-cyan-400' },
  { key: 'opportunity', label: 'Opportunity Alerts', icon: Rocket, color: 'text-purple-400' },
  { key: 'digest', label: 'Daily Digest', icon: Newspaper, color: 'text-blue-400' },
];

export default function NotificationsPage() {
  const { notifications, markAllRead, markRead } = useData();
  const [activeSection, setActiveSection] = useState<string>('all');

  const filtered = activeSection === 'all' ? notifications : notifications.filter((n) => n.type === activeSection);
  const grouped = sections.map((s) => ({
    ...s,
    items: notifications.filter((n) => n.type === s.key),
  }));

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-soft">{notifications.filter((n) => !n.read).length} unread</p>
          </div>
        </div>
        <button onClick={markAllRead} className="px-4 py-2 rounded-2xl glass hover:bg-white/5 transition-colors text-sm font-medium flex items-center gap-2">
          <Check className="w-4 h-4" /> Mark all read
        </button>
      </div>

      {/* Section filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveSection('all')}
          className={`px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${activeSection === 'all' ? 'gradient-primary text-white' : 'glass text-soft hover:text-white'}`}
        >
          All
        </button>
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${activeSection === s.key ? 'gradient-primary text-white' : 'glass text-soft hover:text-white'}`}
          >
            <s.icon className="w-4 h-4" /> {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'all' ? (
        <div className="space-y-8">
          {grouped.map((group) => group.items.length > 0 && (
            <div key={group.key}>
              <h2 className={`text-sm font-bold mb-3 flex items-center gap-2 ${group.color}`}>
                <group.icon className="w-4 h-4" /> {group.label}
              </h2>
              <div className="space-y-2">
                {group.items.map((n, i) => (
                  <NotifCard key={n.id} n={n} onRead={markRead} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((n, i) => (
            <NotifCard key={n.id} n={n} onRead={markRead} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="glass rounded-3xl p-12 text-center">
              <p className="text-soft">No notifications in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NotifCard({ n, onRead, index }: { n: any; onRead: (id: string) => void; index: number }) {
  return (
    <div
      onClick={() => onRead(n.id)}
      className={`p-4 rounded-2xl transition-colors animate-fade-in-up cursor-pointer ${n.read ? 'glass' : 'glass-strong border-blue-500/30'}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start gap-3">
        {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
        <div className={n.read ? 'pl-5' : ''}>
          <p className="text-sm font-semibold">{n.title}</p>
          <p className="text-sm text-soft mt-0.5">{n.message}</p>
          <p className="text-xs text-soft mt-1">{n.time}</p>
        </div>
      </div>
    </div>
  );
}
