import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, LiveServerMessage, Modality, Type } from '@google/genai';
import { SessionStatus, BookRecommendation, ConversationTurn, UserProfile } from '../types';
import AudioVisualizer from './AudioVisualizer';

interface SessionPageProps {
  onResults: (results: BookRecommendation[]) => void;
}

const SessionPage: React.FC<SessionPageProps> = ({ onResults }) => {
  const [status, setStatus] = useState<SessionStatus>(SessionStatus.IDLE);
  const [transcript, setTranscript] = useState<ConversationTurn[]>([]);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const transcriptBufferRef = useRef<{ user: string; ai: string }>({ user: '', ai: '' });
  const timerIntervalRef = useRef<number | null>(null);

  const cleanup = useCallback(() => {
    if (sessionRef.current) sessionRef.current.close?.();
    if (audioContextRef.current) audioContextRef.current.close();
    if (inputContextRef.current) inputContextRef.current.close();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, []);

  const decode = (base64: string) => {
    const b = atob(base64);
    const y = new Uint8Array(b.length);
    for (let i = 0; i < b.length; i++) y[i] = b.charCodeAt(i);
    return y;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  };

  const startSession = async () => {
    try {
      setStatus(SessionStatus.CONNECTING);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const saved = localStorage.getItem('echoink_profile');
      const profile: UserProfile | null = saved ? JSON.parse(saved) : null;
      const historyContext = profile?.history?.slice(0, 3).map(h => h.summary).join("; ") || "A new seeker enters Lumina's sanctuary for the first time.";

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus(SessionStatus.ACTIVE);
            const source = inputContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputContextRef.current!.destination);
            timerIntervalRef.current = window.setInterval(() => setTimer(prev => prev + 1), 1000);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) transcriptBufferRef.current.ai += message.serverContent.outputTranscription.text;
            else if (message.serverContent?.inputTranscription) transcriptBufferRef.current.user += message.serverContent.inputTranscription.text;
            if (message.serverContent?.turnComplete) {
              const u = transcriptBufferRef.current.user.trim();
              const a = transcriptBufferRef.current.ai.trim();
              if (u) setTranscript(prev => [...prev, { role: 'user', text: u }]);
              if (a) setTranscript(prev => [...prev, { role: 'ai', text: a }]);
              transcriptBufferRef.current = { user: '', ai: '' };
            }
            const b64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (b64 && audioContextRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              const ab = await decodeAudioData(decode(b64), audioContextRef.current, 24000, 1);
              const src = audioContextRef.current.createBufferSource();
              src.buffer = ab; src.connect(audioContextRef.current.destination); src.start(nextStartTimeRef.current);
              nextStartTimeRef.current += ab.duration;
              sourcesRef.current.add(src); src.onended = () => sourcesRef.current.delete(src);
            }
          },
          onerror: () => setStatus(SessionStatus.ERROR),
          onclose: () => console.log('Lumina Consultation Ended')
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: `You are Lumina, the Sanctuary Guardian and Master of the Prose Apothecary. 
          Your voice is deep, compassionate, and resonant—like vellum and mahogany. 
          CONTEXT: ${historyContext}.
          Role: Conduct a 3-minute voice reflection to identify complex emotional needs.
          Your task is to facilitate bibliotherapy—healing through reading.
          Be supportive, inquisitive, and poetic. Treat every conversation like a precious manuscript.`
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { setStatus(SessionStatus.ERROR); }
  };

  const endAndGenerate = async () => {
    setStatus(SessionStatus.PROCESSING);
    cleanup();
    try {
      const saved = localStorage.getItem('echoink_profile');
      const profile: UserProfile | null = saved ? JSON.parse(saved) : null;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // CRITICAL: Using gemini-3-pro-preview with max thinking budget for complex analysis
      const res = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Apothecary Deep Curation. Transcript analysis for bibliotherapy prescription: ${transcript.map(t => `${t.role}: ${t.text}`).join('\n')}`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING }, author: { type: Type.STRING },
                    whyThisBook: { type: Type.STRING }, journalPrompts: { type: Type.ARRAY, items: { type: Type.STRING } },
                    type: { type: Type.STRING },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            }
          }
        }
      });
      
      const data = JSON.parse(res.text || '{}');
      if (profile) {
        profile.history.unshift({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          transcript: [...transcript],
          summary: data.summary || "Reflection with Lumina",
          recommendations: data.recommendations || [],
          pointsEarned: 150
        });
        profile.points += 150;
        localStorage.setItem('echoink_profile', JSON.stringify(profile));
      }
      onResults(data.recommendations || []);
      navigate('/results');
    } catch (err) { setStatus(SessionStatus.ERROR); }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-24">
      <div className="page-layer min-h-[750px] flex flex-col items-center justify-center p-16 text-center rounded-sm bg-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950"></div>
        
        {status === SessionStatus.IDLE && (
          <div className="space-y-12 relative z-10">
            <div className="w-28 h-28 border-2 border-amber-900 rounded-full flex items-center justify-center mx-auto mb-12 shadow-inner group transition-all hover:bg-amber-950">
              <span className="text-5xl font-serif italic text-amber-900 group-hover:text-white transition-colors">L</span>
            </div>
            <h2 className="text-6xl font-serif font-bold text-stone-900">Consult with Lumina.</h2>
            <p className="text-2xl text-stone-500 max-w-md mx-auto font-serif italic leading-relaxed">
              Step into the vault of silence. Lumina is ready to hear your narrative and scan the Apothecary for the texts that will mend you.
            </p>
            <button onClick={startSession} className="btn-apothecary text-xl">
              Initiate Dialogue
            </button>
          </div>
        )}

        {status === SessionStatus.ACTIVE && (
          <div className="w-full flex flex-col items-center relative z-10">
            <div className="flex justify-between w-full mb-20 items-center border-b border-stone-100 pb-10">
               <div className="flex items-center gap-4 font-serif italic text-amber-900 text-xl">
                 <span className="w-3 h-3 rounded-full bg-amber-600 animate-ping"></span>
                 Lumina is hearing your reflection...
               </div>
               <div className="text-5xl font-serif italic text-stone-800 tabular-nums font-bold">
                 {Math.floor(timer/60)}:{(timer%60).toString().padStart(2,'0')}
               </div>
            </div>
            
            <AudioVisualizer isPlaying={true} />

            <div className="mt-20 space-y-12">
               <p className="text-3xl font-serif italic text-stone-400">"The ink flows. Share your heart..."</p>
               <button onClick={endAndGenerate} className="px-16 py-7 btn-apothecary text-lg">
                 Finish Consultation
               </button>
            </div>
          </div>
        )}

        {(status === SessionStatus.CONNECTING || status === SessionStatus.PROCESSING) && (
          <div className="space-y-12">
             <div className="w-20 h-20 border-4 border-stone-100 border-t-amber-900 rounded-full animate-spin mx-auto"></div>
             <p className="text-4xl font-serif italic text-amber-900 animate-pulse">
               {status === SessionStatus.CONNECTING ? "Illuminating the Vault..." : "Deep Analysis in Progress..."}
             </p>
          </div>
        )}

        {status === SessionStatus.ERROR && (
          <div className="space-y-10">
             <h3 className="text-5xl font-serif italic text-red-900">Consultation interrupted.</h3>
             <p className="text-stone-500 font-serif text-xl">The sanctuary connection has flickered out. Please try again.</p>
             <button onClick={() => window.location.reload()} className="px-12 py-5 btn-apothecary">Reconnect</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionPage;