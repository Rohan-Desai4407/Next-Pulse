import { Link } from 'react-router-dom';
import { GraduationCap, Trophy, Briefcase, Award, BookOpen, ArrowRight, Users, Lightbulb } from 'lucide-react';
import { useData } from '@/context/DataContext';
import OpportunityCard from '@/components/OpportunityCard';
import NewsCard from '@/components/NewsCard';
import CalendarWidget from '@/components/CalendarWidget';

export default function StudentHubPage() {
  const { opportunities, articles } = useData();
  const studentOpps = opportunities.filter((o) => o.type === 'internship' || o.type === 'hackathon' || o.type === 'scholarship');
  const aiArticles = articles.filter((a) => a.category === 'AI' || a.category === 'Technology').slice(0, 3);

  const resources = [
    { icon: BookOpen, title: 'Learning Paths', desc: 'Curated courses to upskill in AI, quantum, and more', count: '120+ paths' },
    { icon: Users, title: 'Study Groups', desc: 'Join peer communities and learn together', count: '500+ groups' },
    { icon: Lightbulb, title: 'Project Ideas', desc: 'AI-suggested projects to build your portfolio', count: '1000+ ideas' },
    { icon: Award, title: 'Scholarships', desc: 'Funding opportunities for your education', count: '50+ active' },
  ];

  return (
    <div className="py-8 space-y-10">
      <div className="glass-strong rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-soft">Student Hub</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Learn. Build. Compete.</h1>
          <p className="text-soft max-w-xl mb-6">Everything you need to accelerate your tech career internships, hackathons, scholarships, and AI-powered learning resources.</p>
          <Link to="/opportunities" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl gradient-primary text-white font-semibold hover:scale-105 transition-transform">
            Browse Opportunities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((r, i) => (
          <div key={r.title} className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="w-11 h-11 rounded-2xl gradient-accent flex items-center justify-center mb-3">
              <r.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold mb-1">{r.title}</h3>
            <p className="text-sm text-soft mb-2">{r.desc}</p>
            <p className="text-xs text-blue-400 font-medium">{r.count}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-400" /> Hackathons & Internships</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {studentOpps.map((o, i) => <OpportunityCard key={o.id} opp={o} index={i} />)}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
          <CalendarWidget />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400" /> Tech for Students</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {aiArticles.map((a, i) => <NewsCard key={a.id} article={a} index={i} />)}
        </div>
      </div>
    </div>
  );
}
