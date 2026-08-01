import { useState } from 'react';
import { Briefcase, Trophy, GraduationCap, Award } from 'lucide-react';
import { useData } from '@/context/DataContext';
import OpportunityCard from '@/components/OpportunityCard';

const filters = [
  { key: 'all', label: 'All', icon: Briefcase },
  { key: 'internship', label: 'Internships', icon: GraduationCap },
  { key: 'job', label: 'Jobs', icon: Briefcase },
  { key: 'hackathon', label: 'Hackathons', icon: Trophy },
  { key: 'scholarship', label: 'Scholarships', icon: Award },
];

export default function OpportunityCenterPage() {
  const { opportunities } = useData();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? opportunities : opportunities.filter((o) => o.type === filter);

  return (
    <div className="py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Opportunity Center</h1>
        <p className="text-soft">Internships, jobs, hackathons, and scholarships AI-matched to your profile.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === f.key ? 'gradient-primary text-white' : 'glass text-soft hover:text-white'
            }`}
          >
            <f.icon className="w-4 h-4" /> {f.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((o, i) => (
          <OpportunityCard key={o.id} opp={o} index={i} />
        ))}
      </div>
    </div>
  );
}
