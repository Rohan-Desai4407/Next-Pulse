import { Sun, Cloud, CloudRain, MapPin } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function WeatherWidget() {
  const { weather } = useData();
  const Icon = weather.condition.includes('Rain') ? CloudRain : weather.condition.includes('Cloud') ? Cloud : Sun;

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Weather</h3>
        <span className="text-xs text-soft flex items-center gap-1"><MapPin className="w-3 h-3" />{weather.location}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl gradient-accent">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <p className="text-3xl font-bold">{weather.temp}</p>
          <p className="text-sm text-soft">{weather.condition}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-xs text-soft">
        <span>H: {weather.high}</span>
        <span>L: {weather.low}</span>
      </div>
    </div>
  );
}
