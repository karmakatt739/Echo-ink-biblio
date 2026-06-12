import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Prominent Book Imagery */}
      <section className="relative px-8 pt-32 pb-48 lg:pt-48 lg:pb-64">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-full opacity-[0.1] mix-blend-multiply">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
              alt="Ancient Library Stacks" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-3/5 text-left space-y-12">
            <div className="inline-flex items-center gap-4 bg-white/90 border border-amber-200 px-6 py-2 rounded-full backdrop-blur-sm shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-900">Lumina Apothecary Consultations</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-stone-900 leading-[1.1] tracking-tight">
              Healing through reading, <br/>
              <span className="italic font-normal ink-gradient">supported by words.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-600 font-serif italic leading-relaxed max-w-xl">
              Welcome to the Book Sanctuary. In this apothecary of prose, every shelf holds a remedy. Speak with <strong className="text-amber-950 underline decoration-amber-500/30">Lumina</strong>, our sanctuary guardian, and let her curate your literary path to peace.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link to="/session" className="btn-apothecary text-center">
                Consult Lumina
              </Link>
              <Link to="/library" className="px-10 py-5 border-2 border-stone-800 text-stone-800 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-stone-900 hover:text-white transition-all text-center flex items-center justify-center">
                Enter The Vault
              </Link>
            </div>
          </div>

          <div className="lg:w-2/5 relative">
            <div className="relative z-20 w-full max-w-sm mx-auto">
              {/* Stacked colorful, prominent books */}
              <div className="page-layer aspect-[3/4.5] overflow-hidden book-shadow rounded-sm rotate-[-3deg] transition-transform hover:rotate-0 duration-1000 bg-amber-950">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Vibrant red classic book" 
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="absolute -top-12 -right-12 w-56 h-80 page-layer book-shadow rotate-[5deg] bg-emerald-950 overflow-hidden hidden md:block">
                 <img 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600" 
                  alt="Deep emerald leather book"
                  className="w-full h-full object-cover opacity-85"
                />
              </div>
              <div className="absolute -bottom-8 -left-16 w-48 h-64 page-layer book-shadow rotate-[-8deg] bg-amber-900 overflow-hidden hidden xl:block">
                 <img 
                  src="https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=500" 
                  alt="Aged golden manuscript"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bibliotherapy Explainer Section */}
      <section className="py-32 px-8 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-3 gap-16">
          <div className="space-y-8 p-12 border border-white/10 bg-white/5 backdrop-blur-md rounded-sm group hover:border-amber-500/40 transition-colors">
            <h3 className="text-4xl font-serif italic text-amber-200">The Apothecary.</h3>
            <p className="text-stone-300 font-serif leading-relaxed text-lg italic">We treat reading as a sacred remedy. Bibliotherapy is the deliberate use of texts to aid psychological well-being.</p>
          </div>
          <div className="space-y-8 p-12 border border-white/10 bg-white/5 backdrop-blur-md rounded-sm group hover:border-amber-500/40 transition-colors">
            <h3 className="text-4xl font-serif italic text-amber-200">Lumina's Insight.</h3>
            <p className="text-stone-300 font-serif leading-relaxed text-lg italic">Lumina isn't just an AI; she is a guardian of wisdom. She identifies the "missing chapter" in your current story.</p>
          </div>
          <div className="space-y-8 p-12 border border-white/10 bg-white/5 backdrop-blur-md rounded-sm group hover:border-amber-500/40 transition-colors">
            <h3 className="text-4xl font-serif italic text-amber-200">The Curation.</h3>
            <p className="text-stone-300 font-serif leading-relaxed text-lg italic">Our archives span centuries of prose and poetry, curated for resilience, hope, and self-discovery.</p>
          </div>
        </div>
      </section>

      {/* Visual Book Grid */}
      <section className="py-48 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-800 mb-6 block">Sanctuary Prescriptions</span>
             <h2 className="text-6xl font-serif font-bold text-stone-900 italic">Explore the Vault Collections.</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              { color: 'bg-red-950', title: 'Soul & Solitude', img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353' },
              { color: 'bg-emerald-950', title: 'The Silent Forest', img: 'https://images.unsplash.com/photo-1543005127-029193e26fb2' },
              { color: 'bg-blue-950', title: 'Deep Ocean Verse', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' },
              { color: 'bg-amber-950', title: 'Vellum Visions', img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f' },
            ].map((book, i) => (
              <div key={i} className="group cursor-pointer">
                <div className={`aspect-[3/4.5] ${book.color} overflow-hidden rounded-sm book-shadow transition-all duration-700 group-hover:scale-[1.05] group-hover:-translate-y-4 relative`}>
                  <img src={`${book.img}?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 mix-blend-overlay" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <h4 className="text-3xl font-serif italic text-white leading-tight">{book.title}</h4>
                    <p className="text-amber-200 text-[9px] uppercase tracking-widest mt-2">Open Archive</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;