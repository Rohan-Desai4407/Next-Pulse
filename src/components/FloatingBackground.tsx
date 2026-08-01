export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="floating-orb w-[500px] h-[500px] bg-blue-600 -top-40 -left-40 animate-float" />
      <div className="floating-orb w-[400px] h-[400px] bg-purple-600 top-1/2 -right-40 animate-float-slow" />
      <div className="floating-orb w-[300px] h-[300px] bg-cyan-500 bottom-0 left-1/3 animate-float" style={{ animationDelay: '4s' }} />
      <div className="floating-orb w-[250px] h-[250px] bg-blue-500 top-1/4 left-1/2 animate-float-slow" style={{ animationDelay: '6s' }} />
    </div>
  );
}
