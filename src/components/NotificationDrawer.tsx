import { X, Bell, Check } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function NotificationDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { notifications, markAllRead } = useData();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md glass-strong h-full overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 glass-strong border-b border-app p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h2 className="font-bold text-lg">Notifications</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={markAllRead} className="text-xs text-soft hover:text-white flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5">
              <Check className="w-3 h-3" /> Mark all read
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {notifications.map((n) => (
            <div key={n.id} className={`p-3 rounded-2xl transition-colors ${n.read ? 'glass' : 'glass-strong border-blue-500/30'}`}>
              <div className="flex items-start gap-3">
                {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
                <div className={n.read ? 'pl-5' : ''}>
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="text-sm text-soft mt-0.5">{n.message}</p>
                  <p className="text-xs text-soft mt-1">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
