import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, User, ArrowRight, Apple, Check } from 'lucide-react';

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', remember: false, agree: false });
  const navigate = useNavigate();

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-2xl font-bold">Next<span className="gradient-text animate-gradient">Pulse</span></span>
        </Link>

        <div className="glass-strong rounded-3xl p-8 animate-scale-in">
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-2xl glass mb-6">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'login' ? 'gradient-primary text-white' : 'text-soft hover:text-app'}`}
            >
              Login
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'signup' ? 'gradient-primary text-white' : 'text-soft hover:text-app'}`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center mb-1">
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-soft text-center mb-6">
            {tab === 'login' ? 'Sign in to your account' : 'Start your AI-powered news journey'}
          </p>

          {/* Social */}
          <div className="space-y-2 mb-6">
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 rounded-2xl glass hover:bg-soft transition-colors flex items-center justify-center gap-2 text-sm font-medium text-app">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Google
              </button>
              <button className="flex-1 py-2.5 rounded-2xl glass hover:bg-soft transition-colors flex items-center justify-center gap-2 text-sm font-medium text-app">
                <Apple className="w-4 h-4" /> Apple
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-app" />
            <span className="text-xs text-soft">or</span>
            <div className="flex-1 h-px bg-app" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            {tab === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft" />
                <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full Name" required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl glass bg-transparent outline-none focus:border-blue-500 transition-colors text-sm" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft" />
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="Email address" required
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass bg-transparent outline-none focus:border-blue-500 transition-colors text-sm" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft" />
              <input type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="Password" required
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass bg-transparent outline-none focus:border-blue-500 transition-colors text-sm" />
            </div>
            {tab === 'signup' && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft" />
                <input type="password" value={form.confirm} onChange={(e) => set('confirm', e.target.value)} placeholder="Confirm Password" required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl glass bg-transparent outline-none focus:border-blue-500 transition-colors text-sm" />
              </div>
            )}

            {tab === 'login' ? (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button type="button" onClick={() => set('remember', !form.remember)}
                    className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${form.remember ? 'gradient-primary' : 'glass'}`}>
                    {form.remember && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <span className="text-soft">Remember me</span>
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</a>
              </div>
            ) : (
              <label className="flex items-start gap-2 cursor-pointer text-sm">
                <button type="button" onClick={() => set('agree', !form.agree)}
                  className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors shrink-0 mt-0.5 ${form.agree ? 'gradient-primary' : 'glass'}`}>
                  {form.agree && <Check className="w-3 h-3 text-white" />}
                </button>
                <span className="text-soft">I agree to the <a href="#" className="text-blue-400">Terms</a> & <a href="#" className="text-blue-400">Privacy Policy</a></span>
              </label>
            )}

            <button type="submit" className="w-full py-3 rounded-2xl gradient-primary text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
              {tab === 'login' ? 'Login' : 'Create Account'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-sm text-soft text-center mt-6">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setTab(tab === 'login' ? 'signup' : 'login')} className="text-blue-400 hover:text-blue-300 font-medium">
              {tab === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
