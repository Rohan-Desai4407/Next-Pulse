import { useState } from 'react';
import { User, Bell, Lock, Palette, Globe, Zap, Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [aiSummary, setAiSummary] = useState(true);
  const [language, setLanguage] = useState('English');

  const sections = [
    {
      icon: User, title: 'Account',
      items: [
        { label: 'Display Name', value: 'Alex Morgan', type: 'text' as const },
        { label: 'Email', value: 'alex@nextpulse.io', type: 'text' as const },
      ],
    },
    {
      icon: Bell, title: 'Notifications',
      items: [
        { label: 'Email Notifications', type: 'toggle' as const, value: emailNotif, onChange: () => setEmailNotif(!emailNotif) },
        { label: 'Push Notifications', type: 'toggle' as const, value: pushNotif, onChange: () => setPushNotif(!pushNotif) },
      ],
    },
    {
      icon: Zap, title: 'AI Features',
      items: [
        { label: 'AI Summaries', type: 'toggle' as const, value: aiSummary, onChange: () => setAiSummary(!aiSummary) },
        { label: 'AI Recommendations', type: 'toggle' as const, value: true, onChange: () => {} },
      ],
    },
    {
      icon: Palette, title: 'Appearance',
      items: [
        { label: 'Dark Mode', type: 'toggle' as const, value: theme === 'dark', onChange: toggle },
      ],
    },
    {
      icon: Globe, title: 'Language & Region',
      items: [
        { label: 'Language', type: 'select' as const, value: language, options: ['English', 'Spanish', 'French', 'German', 'Japanese'], onChange: setLanguage },
      ],
    },
    {
      icon: Lock, title: 'Privacy',
      items: [
        { label: 'Profile Visibility', type: 'toggle' as const, value: true, onChange: () => {} },
        { label: 'Reading History', type: 'toggle' as const, value: true, onChange: () => {} },
      ],
    },
  ];

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        {sections.map((s) => (
          <div key={s.title} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <s.icon className="w-5 h-5 text-blue-400" />
              <h2 className="font-bold text-lg">{s.title}</h2>
            </div>
            <div className="space-y-3">
              {s.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="text-sm text-soft">{item.label}</span>
                  {item.type === 'text' && <span className="text-sm font-medium">{item.value}</span>}
                  {item.type === 'toggle' && (
                    <button
                      onClick={item.onChange}
                      className={`w-11 h-6 rounded-full transition-colors relative ${item.value ? 'gradient-primary' : 'glass'}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${item.value ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  )}
                  {item.type === 'select' && (
                    <select
                      value={item.value}
                      onChange={(e) => item.onChange?.(e.target.value)}
                      className="px-3 py-1.5 rounded-xl glass bg-transparent text-sm outline-none"
                    >
                      {item.options?.map((o) => <option key={o} value={o} className="bg-slate-800">{o}</option>)}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 rounded-2xl gradient-primary text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform">
        <Check className="w-4 h-4" /> Save Changes
      </button>
    </div>
  );
}
