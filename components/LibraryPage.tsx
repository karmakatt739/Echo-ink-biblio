import React, { useState } from 'react';
import { EducationalItem } from '../types';

const MOCK_ED: EducationalItem[] = [
  { id: 'q1', type: 'quote', title: 'On Resilience', content: '"Out of suffering have emerged the strongest souls; the most massive characters are seared with scars." - Khalil Gibran', category: 'Healing' },
  { id: 'qz1', type: 'quiz', title: 'Discovery Path', content: 'A diagnostic tool to find if your resonance lies in classical verse or modern prose.', category: 'Personal Growth' },
  { id: 'e1', type: 'essay', title: 'The Power of Scriptotherapy', content: 'An exploration of how writing and reading combined create a synergistic healing loop.', category: 'Bibliotherapy 101' }
];

const LibraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'archives' | 'community' | 'education'>('curriculum');

  return (
    <div className="max-w-7xl mx-auto px-12 py-32">
      <div className="mb-24 text-center">
        <span className="text-stone-400 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block italic font-serif">— The Bibliotherapy Archive —</span>
        <h1 className="text-7xl font-serif font-bold text-stone-900 mb-12 ink-gradient italic">The Sanctuary of Lexicons</h1>
        
        <div className="flex flex-wrap justify-center gap-10 border-b border-stone-100 mt-16">
          {['curriculum', 'archives', 'community', 'education'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all ${activeTab === tab ? 'border-b-2 border-stone-800 text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
            >
              {tab.replace(/^\w/, c => c.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'curriculum' && (
          <div className="grid md:grid-cols-2 gap-16">
            <div className="page-layer p-16 flex flex-col items-start bg-white group hover:-translate-y-2 transition-transform duration-500">
              <div className="px-4 py-1.5 bg-stone-50 border border-stone-200 text-stone-600 rounded-full text-[9px] font-bold uppercase tracking-widest mb-8">Guided Course</div>
              <h3 className="text-4xl font-serif font-bold text-stone-900 mb-6 italic">The Architecture of Hope</h3>
              <p className="text-stone-500 mb-12 leading-relaxed text-lg font-serif italic">A 12-week reading path focusing on literature of survival and reconstruction.</p>
              <button className="text-[11px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900 flex items-center gap-4 transition-colors">
                Open Curriculum <span className="text-2xl">→</span>
              </button>
            </div>
            <div className="page-layer p-16 flex flex-col items-start bg-white group hover:-translate-y-2 transition-transform duration-500">
               <div className="px-4 py-1.5 bg-stone-50 border border-stone-200 text-stone-600 rounded-full text-[9px] font-bold uppercase tracking-widest mb-8">Deep Study</div>
               <h3 className="text-4xl font-serif font-bold text-stone-900 mb-6 italic">Poetics of the Mundane</h3>
               <p className="text-stone-500 mb-12 leading-relaxed text-lg font-serif italic">Finding healing in the small rituals of everyday life through haiku and short prose.</p>
               <button className="text-[11px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900 flex items-center gap-4 transition-colors">
                Open Curriculum <span className="text-2xl">→</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'archives' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="page-layer p-12 bg-white text-center group">
                <div className="aspect-[2/3] bg-stone-50 mb-10 overflow-hidden relative shadow-inner border border-stone-100">
                  <img src={`https://images.unsplash.com/photo-1543005127-029193e26fb2?auto=format&fit=crop&q=80&w=400&sig=${i}`} alt="Book Spine" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                     <span className="text-3xl font-serif italic font-bold text-stone-800 drop-shadow-sm">Volume {i}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2 italic">Healing Archive</h3>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Digital Prescription</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="grid lg:grid-cols-3 gap-12">
            {MOCK_ED.map(ed => (
              <div key={ed.id} className="page-layer p-12 bg-white group hover:bg-stone-900 transition-colors duration-500">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6 block group-hover:text-stone-500">{ed.type}</span>
                <h3 className="text-3xl font-serif font-bold text-stone-900 mb-6 group-hover:text-stone-50 transition-colors italic leading-tight">{ed.title}</h3>
                <p className="text-stone-500 text-lg font-serif leading-relaxed group-hover:text-stone-300 transition-colors italic">"{ed.content}"</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="page-layer p-24 bg-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]">
               <img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <h3 className="text-5xl font-serif italic font-bold mb-8 text-stone-900">The Sunday Circle</h3>
              <p className="text-stone-500 text-xl font-serif max-w-2xl mx-auto italic mb-16 leading-relaxed">
                A weekly bibliotherapy session with Lexia and 50 other seekers. We explore a single text and discuss its resonance in our lives.
              </p>
              <button className="btn-lexicon">Join the Circle</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;