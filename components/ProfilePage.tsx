import React, { useEffect, useState } from 'react';
import { UserProfile, Course } from '../types';
import { Link } from 'react-router-dom';

const MOCK_COURSES: Course[] = [
  { id: '1', title: 'The Solace of Poetry', modules: 6, completedModules: 3, description: 'Using metered rhythm to regulate the nervous system.', pointsAwarded: 200 },
  { id: '2', title: 'Narrative Arcs', modules: 4, completedModules: 1, description: 'Reframing your personal story through fictional archetypes.', pointsAwarded: 150 }
];

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('echoink_profile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  if (!profile || profile.tier === 'guest') {
    return (
      <div className="max-w-4xl mx-auto px-12 py-56 text-center bg-[#fdfaf6]">
        <h2 className="text-9xl font-serif italic mb-16 text-stone-300">A Blank Page</h2>
        <p className="text-3xl text-stone-500 mb-20 max-w-xl mx-auto font-serif italic leading-relaxed">
          The journal is waiting for your signature. Begin your journey to unlock your healing archive.
        </p>
        <Link to="/session" className="px-20 py-8 btn-ink text-[12px] font-bold uppercase tracking-[0.5em]">
          Initiate First Chapter
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-12 py-32">
      <div className="grid lg:grid-cols-12 gap-24">
        {/* User Essence Section */}
        <div className="lg:col-span-4 space-y-16">
          <div className="page-card p-16 text-center rounded-sm">
            <div className="w-40 h-40 border border-stone-800 mx-auto flex items-center justify-center text-6xl font-serif text-stone-900 mb-12 italic">
              {profile.name[0]}
            </div>
            <h1 className="text-6xl font-serif text-stone-900 mb-4 italic leading-tight">{profile.name}</h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-stone-400 mb-14">Chapter {profile.level} Seeker</p>
            
            <div className="grid grid-cols-2 gap-10 pt-12 border-t border-stone-100">
              <div className="text-center">
                <div className="text-4xl font-serif text-stone-900 italic mb-2">{profile.streak}</div>
                <div className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif text-stone-900 italic mb-2">✦ {profile.points}</div>
                <div className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">Resonance</div>
              </div>
            </div>
          </div>

          <div className="page-card p-12 rounded-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-12">Stamps of Awakening</h3>
            <div className="grid grid-cols-3 gap-8">
              {profile.badges.map(b => (
                <div key={b.id} className="group relative flex flex-col items-center">
                  <div className="w-20 h-20 border border-stone-100 rounded-full flex items-center justify-center text-4xl hover:bg-stone-50 transition-all cursor-help grayscale hover:grayscale-0">
                    {b.icon}
                  </div>
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-800 text-white text-[9px] px-3 py-1 rounded pointer-events-none whitespace-nowrap">
                    {b.label}
                  </div>
                </div>
              ))}
              {[...Array(6 - profile.badges.length)].map((_, i) => (
                <div key={i} className="w-20 h-20 border border-dashed border-stone-100 rounded-full flex items-center justify-center text-2xl opacity-10">?</div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-20">
          <div className="page-card p-16 rounded-sm">
            <h2 className="text-6xl font-serif text-stone-900 italic mb-16 border-b border-stone-100 pb-8 flex justify-between items-end">
              <span>Pathways to Clarity</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300 font-bold">2 Active Modules</span>
            </h2>
            <div className="grid gap-12">
              {MOCK_COURSES.map(course => (
                <div key={course.id} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-8">
                    <div className="space-y-3">
                       <h4 className="text-3xl font-serif text-stone-900 italic group-hover:underline underline-offset-4">{course.title}</h4>
                       <p className="text-lg text-stone-500 max-w-lg leading-relaxed font-serif italic">{course.description}</p>
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase italic">
                      {course.completedModules}/{course.modules} Pages Read
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-[1px] relative overflow-hidden mb-8">
                    <div className="bg-stone-800 h-full transition-all duration-1000" style={{ width: `${(course.completedModules/course.modules)*100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="page-card p-16 rounded-sm">
            <h2 className="text-6xl font-serif text-stone-900 italic mb-16 border-b border-stone-100 pb-8">Previous Refelctions</h2>
            <div className="space-y-10">
              {profile.history.length === 0 ? (
                <div className="py-24 text-center text-stone-200 italic text-3xl font-serif">A new story is waiting to be written.</div>
              ) : (
                profile.history.map((record, idx) => (
                  <div key={record.id} className="flex gap-12 items-center group py-4">
                    <div className="text-7xl font-serif italic text-stone-100 font-bold select-none">#{profile.history.length - idx}</div>
                    <div className="flex-grow">
                      <div className="text-3xl font-serif text-stone-900 italic mb-2 group-hover:text-amber-800 transition-colors">{record.summary}</div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-300">
                        {new Date(record.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} • {record.recommendations.length} items
                      </div>
                    </div>
                    <Link to="/results" className="text-stone-400 hover:text-stone-900 font-serif italic text-xl transition-colors">
                      Recall Path →
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;