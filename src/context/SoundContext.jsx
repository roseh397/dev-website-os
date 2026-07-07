import React, { createContext, useContext, useState, useEffect } from 'react';
export const SoundContext = createContext();

const downSound = new Audio('src/assets/audio/sfx/down_click.wav');
const upSound = new Audio('src/assets/audio/sfx/release_click.wav');

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // if sounds are disabled in settings, don't attach listeners
    if (!soundEnabled) return;

    const handlePointerDown = () => {
      // reset audio to start in case of rapid clicking
      downSound.currentTime = 0; 
      downSound.play().catch(err => console.log("Playback blocked:", err));
    };

    const handlePointerUp = () => {
      upSound.currentTime = 0;
      upSound.play().catch(err => console.log("Playback blocked:", err));
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [soundEnabled]);

  const playClick = () => {}; 

  return (
  <SoundContext.Provider value={{ soundEnabled, setSoundEnabled, playClick: () => {} }}>
    {children}
  </SoundContext.Provider>
);
}