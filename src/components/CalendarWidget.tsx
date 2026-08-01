import { Calendar } from 'lucide-react';
import { useData } from '@/context/DataContext';

const typeColor: Record<string, string> = {
  event: 'text-blue-400 bg-blue-500/10',
  conference: 'text-purple-400 bg-purple-500/10',
  deadline: 'text-amber-400 bg-amber-500/10',
};

export default function CalendarWidget() {
  const { calendarEvents } = useData();

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-400" />
        <h3 className="font-bold">Upcoming</h3>
      </div>
      <div className="space-y-2">
        {calendarEvents.map((e, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
            <div className="text-center shrink-0">
              <p className="text-xs text-soft">{e.date.split(' ')[0]}</p>
              <p className="text-lg font-bold leading-none">{e.date.split(' ')[1]}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{e.title}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-lg text-xs ${typeColor[e.type]}`}>{e.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
