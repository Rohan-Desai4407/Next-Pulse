import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowUpRight, Trophy, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Opportunity } from '@/context/DataContext';

const typeIcon = {
  internship: GraduationCap,
  job: Briefcase,
  hackathon: Trophy,
  scholarship: Award,
};

const typeColor = {
  internship: 'text-cyan-400 bg-cyan-500/10',
  job: 'text-blue-400 bg-blue-500/10',
  hackathon: 'text-purple-400 bg-purple-500/10',
  scholarship: 'text-green-400 bg-green-500/10',
};

export default function OpportunityCard({ opp, index = 0 }: { opp: Opportunity; index?: number }) {
  const Icon = typeIcon[opp.type];
  return (
    <div
      className="glass rounded-2xl p-5 hover-lift group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${typeColor[opp.type]} group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
        <Link to={opp.url} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
          <ArrowUpRight className="w-4 h-4 text-soft group-hover:text-white" />
        </Link>
      </div>
      <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">{opp.title}</h3>
      <p className="text-sm text-soft mb-3">{opp.description}</p>
      <div className="flex items-center gap-3 text-xs text-soft mb-3">
        <span className="font-medium">{opp.company}</span>
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {opp.tags.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-lg text-xs glass text-soft">{t}</span>
          ))}
        </div>
        <span className="flex items-center gap-1 text-xs text-amber-400 shrink-0 ml-2">
          <Clock className="w-3 h-3" />{opp.deadline}
        </span>
      </div>
    </div>
  );
}
