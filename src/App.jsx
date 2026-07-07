import React, { useState } from 'react';
import Window from './components/Window';

export default function App() {
  const [isGrimoireOpen, setIsGrimoireOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleIconClick = (openWindowFn) => {
    openWindowFn(true);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-b from-[#b4c6e7] to-[#dcd1f0] relative font-sans select-none">
      
      {/* Background Subtitle */}
      <div className="absolute top-12 left-10 text-slate-600/40 text-xs tracking-widest uppercase">
        ☁️ Dev Website OS v1.0
      </div>

      {/* Desktop Workspace Grid */}
      <main className="w-full h-[calc(100vh-48px)] p-6 relative">

        {/* Folder Application: Grimoire */}
        <div 
          onClick={() => handleIconClick(setIsGrimoireOpen)}
          className="flex flex-col gap-2 w-24 items-center cursor-pointer group p-2 rounded hover:bg-white/10"
        >
        <div className="text-4xl">📁</div>
        <span className="text-xs font-semibold">Grimoire</span>
        </div>

        {/* Settings App */}
        <div 
          onClick={() => handleIconClick(setIsSettingsOpen)}
          className="flex flex-col gap-2 w-24 items-center cursor-pointer group p-2 rounded hover:bg-white/10 mt-4"
        >
        <div className="text-4xl transition-transform group-hover:scale-110">⚙️</div>
        <span className="text-xs font-semibold text-slate-800 bg-white/60 px-2 py-0.5 rounded shadow-sm">Settings</span>
        </div>

        {/* SETTINGS WINDOW*/}
        {isSettingsOpen && (
          <Window title="Grimoire.txt" onClose={() => setIsSettingsOpen(false)}>
            <h3 className="text-sm font-bold text-amber-900 mb-2">🌸 EPIC SETTINGS</h3>
            <p className="mb-2 leading-relaxed">
              SETTINGS BABABABABAYYYYYY
            </p>
            <hr className="border-amber-200 my-2" />
            <div className="space-y-3 mt-2 font-mono text-[11px]">
              <div>
                <span className="text-emerald-700 font-bold">▶ </span> SOUNDSSSSS
              </div>
              <div>
                <span className="text-purple-700 font-bold">▶ </span> DARK MODE
              </div>
            </div>
          </Window>
        )}

        {/* GRIMOIRE WINDOW */}
        {isGrimoireOpen && (
          <Window title="Grimoire.txt" onClose={() => setIsGrimoireOpen(false)}>
            <h3 className="text-sm font-bold text-amber-900 mb-2">🌸 Timeline </h3>
            <p className="mb-2 leading-relaxed">
              Welcome to my portfolio! Experiance:.
            </p>
            <hr className="border-amber-200 my-2" />
            <div className="space-y-3 mt-2 font-mono text-[11px]">
              <div>
                <span className="text-emerald-700 font-bold">▶ 2026 - Present:</span> Elven Mage
              </div>
              <div>
                <span className="text-purple-700 font-bold">▶ 2024 - 2025:</span> Magical Frontend Builder
              </div>
            </div>
          </Window>
        )}

      </main>

      {/* Bottom Taskbar */}
      <footer className="w-full h-12 bg-[#8b7355] border-t-2 border-[#caa472] absolute bottom-0 flex items-center px-4 justify-between text-white shadow-lg z-50">
        <div className="flex items-center gap-4">
          <button className="bg-[#caa472] hover:bg-[#b89362] px-3 py-1 rounded text-xs font-bold text-amber-950 shadow-inner">
            🌱 Start
          </button>
        </div>
        <div className="text-xs font-mono pr-2 text-amber-100">
          {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </footer>

    </div>
  );
}