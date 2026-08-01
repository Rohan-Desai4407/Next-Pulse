import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingChat from './FloatingChat';
import FloatingBackground from './FloatingBackground';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-app">
      <FloatingBackground />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6">{children}</main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
