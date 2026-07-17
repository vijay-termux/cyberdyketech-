export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          CyberDyke Tech
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8">
          Cybersecurity & Technology Services
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
            Get Started
          </button>
          <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
