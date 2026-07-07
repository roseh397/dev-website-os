import React, { useState, useRef, useEffect } from 'react';

export default function Window({ title, children, onClose }) {
  const [isReady, setIsReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  
  const windowRef = useRef(null);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handlePointerDown = (e) => {
    if (e.target.closest('.title-bar')) {
      if (!isMoved) {
        const rect = windowRef.current.getBoundingClientRect();
        setPos({ x: rect.left, y: rect.top });
        setIsMoved(true);
      }
      setIsDragging(true);
      e.preventDefault();
    }
  };

  const windowStyle = isMoved 
    ? { position: 'fixed', left: pos.x, top: pos.y, zIndex: 1000 }
    : { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 };

  return (
    <div
      ref={windowRef}
      style={{
        ...windowStyle,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.1s ease-in'
      }}
      className="bg-stone-100 border-2 border-stone-800 rounded flex flex-col w-[800px] h-[550px]"
    >
      <div 
        onPointerDown={handlePointerDown}
        className="title-bar cursor-move bg-purple-900 text-white p-2 flex justify-between items-center select-none"
      >
        <span className="font-bold text-sm">{title}</span>
        <button onClick={onClose} className="bg-red-500 text-white font-bold px-2 rounded">X</button>
      </div>

      <div className="p-4 flex-1 text-stone-800 overflow-auto">
        {children}
      </div>
    </div>
  );
}