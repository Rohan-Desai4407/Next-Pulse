import { Users, FileText, TrendingUp, Eye, Activity, Shield, Zap, BarChart3 } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function AdminDashboardPage() {
  const { articles, opportunities, notifications } = useData();

  const stats = [
    { icon: Users, label: 'Total Users', value: '12,847', change: '+12.5%', trend: 'up' },
    { icon: FileText, label: 'Articles Published', value: articles.length + 1247, change: '+8.2%', trend: 'up' },
    { icon: TrendingUp, label: 'Active Now', value: '1,234', change: '+3.1%', trend: 'up' },
    { icon: Eye, label: 'Page Views', value: '2.4M', change: '-1.2%', trend: 'down' },
  ];

  const topArticles = articles.slice(0, 5).map((a, i) => ({
    ...a, views: 12000 - i * 1500, engagement: 85 - i * 5,
  }));

  const recentUsers = [
    { name: 'Sarah Chen', email: 'sarah@mit.edu', role: 'Student', joined: '2h ago' },
    { name: 'Marcus Johnson', email: 'marcus@google.com', role: 'Professional', joined: '5h ago' },
    { name: 'Emma Rodriguez', email: 'emma@spacex.com', role: 'Professional', joined: '8h ago' },
    { name: 'David Park', email: 'david@tesla.com', role: 'Professional', joined: '12h ago' },
    { name: 'Lisa Wang', email: 'lisa@bloomberg.com', role: 'Professional', joined: '1d ago' },
  ];

  return (
    <div className="py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-2"><Shield className="w-7 h-7 text-blue-400" /> Admin Dashboard</h1>
        <p className="text-soft">Platform overview and content management.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={s.label} className="glass rounded-2xl p-5 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-medium ${s.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{s.change}</span>
            </div>
            <p className="text-2xl font-bold animate-count-up">{s.value}</p>
            <p className="text-sm text-soft">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-400" /> Top Articles Performance</h2>
            <div className="space-y-3">
              {topArticles.map((a, i) => (
                <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="text-sm font-bold text-soft w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-soft">{a.source} {a.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">{a.views.toLocaleString()}</p>
                    <p className="text-xs text-soft">views</p>
                  </div>
                  <div className="w-20 shrink-0">
                    <div className="h-2 rounded-full glass overflow-hidden">
                      <div className="h-full gradient-primary rounded-full animate-bar-grow" style={{ width: `${a.engagement}%`, animationDelay: `${i * 0.1}s` }} />
                    </div>
                    <p className="text-xs text-soft mt-1 text-center">{a.engagement}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-cyan-400" /> Platform Health</h3>
            <div className="space-y-3">
              {[
                { label: 'Server Uptime', value: '99.9%', color: 'bg-green-500' },
                { label: 'AI Response Time', value: '142ms', color: 'bg-blue-500' },
                { label: 'Error Rate', value: '0.01%', color: 'bg-green-500' },
                { label: 'Active Sessions', value: '1,234', color: 'bg-cyan-500' },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-sm text-soft">{m.label}</span>
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${m.color}`} /> {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400" /> Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl glass text-center">
                <p className="text-xl font-bold">{opportunities.length}</p>
                <p className="text-xs text-soft">Opportunities</p>
              </div>
              <div className="p-3 rounded-xl glass text-center">
                <p className="text-xl font-bold">{notifications.length}</p>
                <p className="text-xs text-soft">Notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-purple-400" /> Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-soft text-left border-b border-app">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.email} className="border-b border-app last:border-0">
                  <td className="py-3 font-medium">{u.name}</td>
                  <td className="py-3 text-soft">{u.email}</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-lg glass text-xs">{u.role}</span></td>
                  <td className="py-3 text-soft">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
