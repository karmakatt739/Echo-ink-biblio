import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SessionPage from './components/SessionPage';
import ResultsPage from './components/ResultsPage';
import ProfilePage from './components/ProfilePage';
import LibraryPage from './components/LibraryPage';
import { BookRecommendation, UserProfile } from './types';

const App: React.FC = () => {
  const [recommendations, setRecommendations] = useState<BookRecommendation[]>([]);
  const [user, setUser] = useState<UserProfile>({
    name: 'Seeker',
    email: '',
    tier: 'guest',
    history: [],
    badges: [],
    streak: 0,
    points: 0,
    level: 1
  });

  useEffect(() => {
    const saved = localStorage.getItem('echoink_profile');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleSignIn = () => {
    const name = prompt("Enter your name for the apothecary ledger:") || "Seeker";
    const newProfile: UserProfile = { 
      name, 
      email: "", 
      tier: 'member', 
      history: [], 
      badges: [{ id: 'initiation', label: 'Sanctuary Bound', icon: '🕊️', description: 'Crossed the threshold of healing.' }],
      streak: 1,
      points: 100,
      level: 1,
      lastActiveDate: new Date().toDateString()
    };
    localStorage.setItem('echoink_profile', JSON.stringify(newProfile));
    setUser(newProfile);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-amber-100 selection:text-amber-950">
        <div className="relative z-50 bg-stone-900 text-[10px] text-amber-200 py-3 text-center font-bold tracking-[0.5em] uppercase border-b border-amber-900/20">
          The Prose Apothecary • <span className="text-white italic">Healing Through Reading</span> • Guided Bibliotherapy
        </div>
        
        <header className="relative z-50 px-8 py-10 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-stone-100">
          <Link to="/" className="flex items-center gap-6 group">
            <div className="w-16 h-16 border-2 border-stone-900 flex items-center justify-center font-serif italic text-4xl text-stone-900 transition-all group-hover:bg-amber-900 group-hover:text-white group-hover:border-amber-900">
              A
            </div>
            <div>
              <span className="block text-3xl font-serif font-bold tracking-tight text-stone-900">The Prose Apothecary</span>
              <span className="block text-[10px] uppercase tracking-[0.5em] text-amber-800 font-bold">Bibliotherapy Sanctuary</span>
            </div>
          </Link>
          
          <nav className="flex gap-12 items-center text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
            <Link to="/library" className="hover:text-amber-900 transition-colors">The Archives</Link>
            {user.tier === 'member' ? (
              <Link to="/profile" className="flex items-center gap-5 px-7 py-3 bg-stone-50 border border-stone-200 hover:bg-white transition-all shadow-sm">
                <span className="text-amber-900 font-serif italic text-lg">{user.points}✦</span>
                <span className="w-px h-4 bg-stone-300"></span>
                <span>The Ledger</span>
              </Link>
            ) : (
              <button onClick={handleSignIn} className="hover:text-amber-900 transition-colors">Sign Register</button>
            )}
            <Link to="/session" className="btn-apothecary text-[9px] py-4 px-9">
              Consult Lumina
            </Link>
          </nav>
        </header>

        <main className="flex-grow relative">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/session" element={<SessionPage onResults={(res) => setRecommendations(res)} />} />
            <Route path="/results" element={<ResultsPage recommendations={recommendations} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
        </main>

        <footer className="px-8 py-40 border-t border-stone-200 bg-stone-950 text-stone-400">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-24">
            <div className="md:col-span-6 space-y-12">
              <h3 className="text-5xl font-serif text-white italic leading-tight">"Every heart has a matching text. We help you find it."</h3>
              <p className="text-xl text-stone-400 leading-relaxed font-serif max-w-md italic">
                The Prose Apothecary is a dedicated space for bibliotherapy—the ancient practice of using books to mend the human spirit.
              </p>
            </div>
            <div className="md:col-span-3 space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500">Directory</h4>
              <ul className="text-sm text-stone-300 space-y-5 font-serif italic">
                <li><Link to="/library" className="hover:text-amber-500 transition-colors">Intro to Bibliotherapy</Link></li>
                <li><Link to="/library" className="hover:text-amber-500 transition-colors">Curation Methodology</Link></li>
                <li><Link to="/profile" className="hover:text-amber-500 transition-colors">Personal Shelf</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3 space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500">Disclaimer</h4>
              <p className="text-xs text-stone-500 leading-relaxed italic font-serif">
                Lumina is a literary guide. While bibliotherapy is clinically recognized, this tool does not replace professional medical advice.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-10 text-[10px] font-bold uppercase tracking-[0.7em] text-stone-600">
            <div>© 2025 THE PROSE APOTHECARY — EST. IN WISDOM</div>
            <div className="flex gap-14">
              <a href="#" className="hover:text-stone-300 transition-colors">Privacy of Word</a>
              <a href="#" className="hover:text-stone-300 transition-colors">Terms of Sanctuary</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;