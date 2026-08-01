import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Zap, TrendingUp, Globe, Brain, Rocket,
  Newspaper, Users, Shield, Clock, ChevronDown, Star, Quote,
} from 'lucide-react';
import BreakingTicker from '@/components/BreakingTicker';
import NewsCard from '@/components/NewsCard';
import { useData, ALL_CATEGORIES, testimonials, faqs } from '@/context/DataContext';

const categoryIcons: Record<string, string> = {
  Technology: '', AI: '', Business: '', Finance: '', Sports: '', Science: '',
  Health: '', Space: '', Entertainment: '', Politics: '', Environment: '',
};

export default function LandingPage() {
  const { articles } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    { icon: Brain, title: 'AI-Powered Summaries', desc: 'Get the gist of any article in seconds with our AI engine that distills key insights and explains why they matter.' },
    { icon: TrendingUp, title: 'Real-Time Trending', desc: 'Stay ahead with live trending topics and breaking news from across the globe, updated every second.' },
    { icon: Rocket, title: 'Opportunity Hub', desc: 'Discover internships, jobs, hackathons, and scholarships matched to your interests and career goals.' },
    { icon: Globe, title: 'Personalized Feed', desc: 'Your feed learns what you care about and surfaces stories that matter to you across 22 categories.' },
    { icon: Users, title: 'Built for Everyone', desc: 'Students, professionals, entrepreneurs, researchers, and everyday readers all find value here.' },
    { icon: Shield, title: 'Privacy First', desc: 'Your data is yours. Bank-grade encryption, no data selling, and full control over your preferences.' },
  ];

  const whyChoose = [
    { icon: Sparkles, title: 'AI That Understands You', desc: 'Our AI learns your reading habits and curates a feed that gets smarter every day.' },
    { icon: Clock, title: 'Save Hours Weekly', desc: 'AI summaries and daily briefs let you stay informed in minutes, not hours.' },
    { icon: Newspaper, title: '22 Categories, One Platform', desc: 'From AI to Food, Sports to Space everything you care about in one beautiful place.' },
  ];

  return (
    <div>
      <BreakingTicker />

      {/* Hero */}
      <section className="relative pt-20 pb-24 text-center overflow-hidden">
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl animate-float" />
        <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl animate-float-slow" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 animate-fade-in-down hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse-slow" />
            <span className="text-sm text-soft">AI-Powered News for Everyone</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.05] animate-fade-in-up">
            Beyond Headlines.
            <br />
            <span className="gradient-text animate-gradient">Into Insights.</span>
          </h1>
          <p className="text-lg text-soft max-w-2xl mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            Personalized news, opportunities, and AI-powered insights tailored to your interests.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <Link to="/signup" className="px-6 py-3 rounded-2xl gradient-primary text-white font-semibold flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all animate-glow">
              Get Started <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/feed" className="px-6 py-3 rounded-2xl glass text-app font-semibold flex items-center gap-2 hover:bg-soft hover:scale-105 transition-all">
              Explore News
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why Choose NextPulse?</h2>
          <p className="text-soft max-w-xl mx-auto">Wee reimagined how news should work in the AI era.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {whyChoose.map((w, i) => (
            <div key={w.title} className="glass rounded-2xl p-6 hover-lift animate-fade-in-up group" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <w.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{w.title}</h3>
              <p className="text-sm text-soft leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Features That Empower You</h2>
          <p className="text-soft max-w-xl mx-auto">Everything you need to stay informed and ahead, powered by cutting-edge AI.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={f.title} className="glass rounded-2xl p-6 hover-lift animate-fade-in-up group" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-soft leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Explore 22 Categories</h2>
          <p className="text-soft max-w-xl mx-auto">News for everyone, not just tech. Find your interests.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {ALL_CATEGORIES.map((cat, i) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/\s/g, '-')}`}
              className="px-4 py-2.5 rounded-2xl glass text-sm font-medium hover:bg-white/5 hover:scale-110 hover:-translate-y-1 transition-all animate-pop-in"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Preview Stories */}
      <section className="py-16">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold">Latest Stories</h2>
          <Link to="/feed" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 group">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.slice(0, 6).map((a, i) => (
            <NewsCard key={a.id} article={a} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Loved by Readers Everywhere</h2>
          <p className="text-soft max-w-xl mx-auto">Join thousands whoe transformed how they consume news.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={t.name} className="glass rounded-2xl p-6 hover-lift animate-fade-in-up group" style={{ animationDelay: `${i * 0.08}s` }}>
              <Quote className="w-8 h-8 text-blue-400/30 mb-3 group-hover:text-blue-400/50 transition-colors" />
              <p className="text-sm leading-relaxed mb-4">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-soft">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 animate-pop-in" fill="currentColor" style={{ animationDelay: `${j * 0.1}s` }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-soft">Everything you need to know about NextPulse.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-soft shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-soft leading-relaxed animate-fade-in-down">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="glass-strong rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden animate-scale-in">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl animate-float" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl animate-float-slow" />
          <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse-slow" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Ready to Transform How You Read News?</h2>
          <p className="text-soft max-w-xl mx-auto mb-6">Join thousands of readers staying ahead with AI-powered insights.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl gradient-primary text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all animate-glow">
            Start Free Today <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
