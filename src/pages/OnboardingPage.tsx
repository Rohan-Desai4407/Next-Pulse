import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Check, ArrowRight, ArrowLeft, Sparkles, Bell, User } from 'lucide-react';
import { ONBOARDING_INTERESTS, ONBOARDING_ROLES, ONBOARDING_NOTIFS, useData } from '@/context/DataContext';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [role, setRole] = useState('');
  const [notifs, setNotifs] = useState<string[]>([]);
  const navigate = useNavigate();
  const { setUserInterests, setUserRole } = useData();

  const toggleInterest = (i: string) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const toggleNotif = (n: string) =>
    setNotifs((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  const finish = () => {
    setUserInterests(interests);
    setUserRole(role);
    navigate('/dashboard');
  };

  const canProceed = step === 1 ? interests.length > 0 : step === 2 ? !!role : notifs.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-2xl font-bold">Next<span className="gradient-text">Pulse</span></span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'gradient-primary text-white' : 'glass text-soft'}`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 rounded-full ${step > s ? 'bg-blue-500' : 'bg-app'}`} />}
            </div>
          ))}
        </div>

        <div className="glass-strong rounded-3xl p-8 min-h-[400px]">
          {step === 1 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-6">
                <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
                <h1 className="text-2xl font-bold mb-2">Select Your Interests</h1>
                <p className="text-soft text-sm">Choose topics you care about. You can change these later.</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                {ONBOARDING_INTERESTS.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${interests.includes(i) ? 'gradient-primary text-white' : 'glass text-soft hover:text-white hover:bg-white/5'}`}
                  >
                    {interests.includes(i) && <Check className="w-3.5 h-3.5 inline mr-1" />}
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-6">
                <div className="w-10 h-10 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Choose Your Role</h1>
                <p className="text-soft text-sm">This helps us personalize your experience.</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                {ONBOARDING_ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`p-4 rounded-2xl text-sm font-medium transition-all ${role === r ? 'gradient-primary text-white' : 'glass text-soft hover:text-white hover:bg-white/5'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-6">
                <Bell className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h1 className="text-2xl font-bold mb-2">Notification Preferences</h1>
                <p className="text-soft text-sm">Choose what you want to be notified about.</p>
              </div>
              <div className="space-y-3 max-w-md mx-auto">
                {ONBOARDING_NOTIFS.map((n) => (
                  <button
                    key={n}
                    onClick={() => toggleNotif(n)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${notifs.includes(n) ? 'glass-strong border-blue-500/30' : 'glass'}`}
                  >
                    <span className="text-sm font-medium">{n}</span>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${notifs.includes(n) ? 'gradient-primary' : 'glass'}`}>
                      {notifs.includes(n) && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-colors flex items-center gap-2 ${step > 1 ? 'glass hover:bg-white/5' : 'invisible'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {step < 3 ? (
            <button
              onClick={() => canProceed && setStep((s) => s + 1)}
              disabled={!canProceed}
              className="px-5 py-2.5 rounded-2xl gradient-primary text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={finish}
              disabled={!canProceed}
              className="px-5 py-2.5 rounded-2xl gradient-primary text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              Start Exploring <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
