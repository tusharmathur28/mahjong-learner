import React, { useState, useEffect, useMemo } from 'react';
import { Tile } from './components/Tile';
import { TILES } from './data/tiles';
import { speak } from './utils/speech';

function App() {
  const [mode, setMode] = useState('learn'); // 'learn' | 'quiz'
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem('mahjong-score') || '0');
  });
  const [attempts, setAttempts] = useState(() => {
    return parseInt(localStorage.getItem('mahjong-attempts') || '0');
  });

  // Quiz State
  const [quizTarget, setQuizTarget] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizStatus, setQuizStatus] = useState('waiting'); // 'waiting' | 'correct' | 'wrong'

  useEffect(() => {
    localStorage.setItem('mahjong-score', score.toString());
    localStorage.setItem('mahjong-attempts', attempts.toString());
  }, [score, attempts]);

  const generateQuestion = () => {
    const target = TILES[Math.floor(Math.random() * TILES.length)];
    const distractors = [];
    while (distractors.length < 3) {
      const d = TILES[Math.floor(Math.random() * TILES.length)];
      if (d.id !== target.id && !distractors.find(x => x.id === d.id)) {
        distractors.push(d);
      }
    }
    // Shuffle options
    const options = [target, ...distractors].sort(() => Math.random() - 0.5);

    setQuizTarget(target);
    setQuizOptions(options);
    setQuizStatus('waiting');
  };

  const handleQuizAnswer = (tile) => {
    if (quizStatus !== 'waiting') return;

    setAttempts(a => a + 1);

    if (tile.id === quizTarget.id) {
      setScore(s => s + 1);
      setQuizStatus('correct');
      // speak('Correct! ' + quizTarget.pinyin); // Replaced with audio files
      speak(quizTarget.audio);
      setTimeout(generateQuestion, 1500);
    } else {
      setQuizStatus('wrong');
      // speak('Wrong. Try again.'); // No audio for wrong, or need a specific wrong sound file. I'll just silence it for now as I don't have wrong.mp3
      setTimeout(generateQuestion, 2000);
    }
  };

  // Initial Question
  useEffect(() => {
    if (mode === 'quiz' && !quizTarget) {
      generateQuestion();
    }
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col items-center pb-10 overflow-hidden">

      {/* Top Bar / Gamified Header */}
      <div className="w-full max-w-2xl mx-auto flex justify-center items-center p-6 mt-4">
        <div className="bg-slate-900/60 px-8 py-4 rounded-full backdrop-blur-md border border-white/20 flex gap-8 text-lg font-bold shadow-2xl">
          <button onClick={() => setMode('learn')} className={`hover:scale-105 transition-transform ${mode === 'learn' ? 'text-accent-cyan scale-110 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-slate-400'}`}>LEARN</button>
          <div className="w-[2px] bg-white/20"></div>
          <button onClick={() => setMode('quiz')} className={`hover:scale-105 transition-transform ${mode === 'quiz' ? 'text-accent-pink scale-110 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]' : 'text-slate-400'}`}>QUIZ</button>
        </div>

        {mode === 'quiz' && (
          <div className="absolute right-4 top-8 flex gap-2">
            <div className="bg-slate-900/80 text-accent-yellow px-4 py-2 rounded-full font-bold shadow-lg border border-yellow-500/30">
              ★ {score}
            </div>
          </div>
        )}
      </div>

      <main className="w-full px-2 mt-8 flex-1 flex flex-col items-center">

        {/* LEARN MODE */}
        {mode === 'learn' && (
          <div className="animate-pop w-full max-w-7xl">
            <h1 className="text-center mb-10 text-white drop-shadow-lg text-5xl">
              <span className="text-accent-cyan">Mahjong</span> <span className="text-accent-pink">Dojo</span>
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-12 gap-x-4 justify-items-center pb-20 mx-auto">
              {TILES.map(tile => (
                <div key={tile.id} className="flex flex-col items-center group w-full">
                  <div className="relative hover:-translate-y-3 transition-transform duration-300">
                    <Tile data={tile} onClick={() => speak(tile.audio)} />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/20 rounded-full blur-sm group-hover:scale-75 group-hover:opacity-50 transition-all" />
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-lg font-bold text-white tracking-wide leading-tight">{tile.pinyin}</div>
                    <div className="text-[10px] text-accent-cyan font-bold uppercase tracking-wider bg-slate-900/60 px-2 py-0.5 rounded mt-1 shadow-sm backdrop-blur-sm">{tile.meaning}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QUIZ MODE */}
        {mode === 'quiz' && quizTarget && (
          <div className="flex flex-col items-center flex-1 max-w-md mx-auto w-full">

            {/* Progress Bar (Visual only for now) */}
            <div className="w-full h-3 bg-slate-800 rounded-full mb-8 overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-accent-cyan to-blue-500 transition-all duration-500"
                style={{ width: `${Math.min((score / (score + 5)) * 100, 100)}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="relative mb-12 animate-pop">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-accent-cyan/20 blur-3xl rounded-full" />
              <div className="relative transform scale-125">
                <Tile data={quizTarget} size="large" />
              </div>
            </div>

            {/* Answers Grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {quizOptions.map((tile, i) => {
                let btnStyle = "btn-gamified";
                if (i === 0) btnStyle += " text-cyan-700";
                if (i === 1) btnStyle += " text-purple-700";
                if (i === 2) btnStyle += " text-pink-700";
                if (i === 3) btnStyle += " text-emerald-700";

                if (quizStatus === 'correct' && tile.id === quizTarget.id) btnStyle = "btn-gamified bg-green-400 text-white shadow-[0_6px_0_#15803d]";
                if (quizStatus === 'wrong' && tile.id !== quizTarget.id) btnStyle += " opacity-50";

                return (
                  <button
                    key={tile.id}
                    onClick={() => handleQuizAnswer(tile)}
                    className={`${btnStyle} h-24 flex flex-col items-center justify-center gap-1 active:scale-95`}
                    disabled={quizStatus !== 'waiting'}
                  >
                    <span className="text-sm opacity-70 font-bold">{['A', 'B', 'C', 'D'][i]}</span>
                    <span className="text-lg leading-tight">{tile.pinyin}</span>
                  </button>
                );
              })}
            </div>

            {quizStatus === 'correct' && (
              <div className="mt-8 text-2xl font-black text-white bg-green-500 px-6 py-2 rounded-xl shadow-lg animate-bounce">
                AWESOME!
              </div>
            )}

            {quizStatus === 'wrong' && (
              <div className="mt-8 text-xl font-bold text-red-200 bg-red-900/50 px-6 py-2 rounded-xl border border-red-500/50 animate-shake">
                Try Again!
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}

export default App;
