import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, Users, Rocket, ArrowRight, Building2, LineChart, Target } from 'lucide-react';
import { useData } from '@/context/DataContext';
import OpportunityCard from '@/components/OpportunityCard';
import NewsCard from '@/components/NewsCard';
import MarketWidget from '@/components/MarketWidget';
import TrendingSidebar from '@/components/TrendingSidebar';

export default function ProfessionalHubPage() {
  const { opportunities, articles } = useData();
  const jobs = opportunities.filter((o) => o.type === 'job');
  const businessArticles = articles.filter((a) => a.category === 'Business' || a.category === 'Technology').slice(0, 3);

  const tools = [
    { icon: LineChart, title: 'Market Insights', desc: 'Real-time data on tech industry trends and salaries' },
    { icon: Users, title: 'Networking', desc: 'Connect with 50K+ professionals in your field' },
    { icon: Target, title: 'Career Pathing', desc: 'AI-mapped roadmaps to your dream role' },
    { icon: Building2, title: 'Company Profiles', desc: 'Deep-dive into culture, pay, and growth at top companies' },
  ];

  return (
    <div className="py-8 space-y-10">
      <div className="glass-strong rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-soft">Professional Hub</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Level Up Your Career.</h1>
          <p className="text-soft max-w-xl mb-6">Jobs, market intelligence, and networking for tech professionals. AI-matched to your skills and goals.</p>
          <Link to="/opportunities" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl gradient-primary text-white font-semibold hover:scale-105 transition-transform">
            Explore Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((t, i) => (
          <div key={t.title} className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center mb-3">
              <t.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold mb-1">{t.title}</h3>
            <p className="text-sm text-soft">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Rocket className="w-5 h-5 text-purple-400" /> Open Positions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {jobs.map((o, i) => <OpportunityCard key={o.id} opp={o} index={i} />)}
          </div>
        </div>
        <div className="space-y-6">
          <MarketWidget />
          <TrendingSidebar />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-400" /> Business & Tech</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {businessArticles.map((a, i) => <NewsCard key={a.id} article={a} index={i} />)}
        </div>
      </div>
    </div>
  );
}
