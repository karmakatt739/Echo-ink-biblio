import React, { useEffect, useState } from 'react';
import { BookRecommendation, UserProfile } from '../types';
import { Link } from 'react-router-dom';

interface ResultsPageProps {
  recommendations: BookRecommendation[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({ recommendations }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('echoink_profile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  if (recommendations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-12 py-40 text-center">
        <h2 className="text-6xl font-serif italic mb-10">Searching the stacks...</h2>
        <Link to="/session" className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">Return to Study</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-12 py-32">
      <div className="text-center mb-24 space-y-8">
        <span className="text-stone-400 font-bold uppercase tracking-[0.5em] text-[10px] block italic font-serif">— Reflection Archive —</span>
        <h2 className="text-8xl font-serif font-bold text-stone-900 leading-tight">Your Prescribed Path</h2>
        <p className="text-2xl text-stone-500 max-w-2xl mx-auto font-serif italic">Literature curated specifically for the heart you shared today.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {recommendations.map((item, idx) => (
          <div key={idx} className="page-card group">
            <div className="p-16 space-y-12">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <h4 className="text-5xl font-serif font-bold text-stone-900 italic">{item.title}</h4>
                  <p className="text-stone-400 text-xs font-bold uppercase tracking-[0.4em]">{item.author}</p>
                </div>
                <div className="text-stone-200 text-7xl font-serif select-none">0{idx + 1}</div>
              </div>

              <div className="space-y-6">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 italic">Why this Resonance:</h5>
                <p className="text-xl text-stone-700 leading-relaxed font-serif italic">"{item.whyThisBook}"</p>
              </div>
              
              <div className="space-y-8 pt-8 border-t border-stone-100">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">Reflection Prompts</h5>
                <ul className="space-y-6">
                  {item.journalPrompts?.map((p, i) => (
                    <li key={i} className="text-lg text-stone-600 font-serif italic flex gap-6">
                      <span className="text-stone-300">✎</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-12">
                <button className="w-full py-6 btn-ink text-[11px] font-bold uppercase tracking-[0.5em]">
                  Read this Chapter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 text-center">
        <Link to="/profile" className="px-16 py-7 border border-stone-800 text-stone-800 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-stone-50 transition-all">
          Archive in Journal
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;