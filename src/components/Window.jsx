import React, { useState, useRef, useEffect } from 'react';

export default function Window({ title, children, onClose }) {
  const WINDOW_WIDTH = 800;
  const WINDOW_HEIGHT = 550;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const windowRef = useRef(null);

  const handlePointerDown = (e) => {
    if (e.target.closest('.title-bar')) {
      setIsDragging(true);
      
      const rect = windowRef.current.getBoundingClientRect();
      
      // store where the cursor grabbed the window handle
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      
      e.preventDefault();
    }
  };
  
  useEffect(() => {
    if (windowRef.current && windowRef.current.parentElement) {
        const parentRect = windowRef.current.parentElement.getBoundingClientRect();
        
        const centerX = (parentRect.width / 2) - (WINDOW_WIDTH / 2);
        const centerY = (parentRect.height / 2) - (WINDOW_HEIGHT / 2);

        setPosition({
        x: Math.max(0, centerX),
        y: Math.max(0, centerY)
        });
    }
  }, []);

  useEffect(() => {
    if (!isDragging || !windowRef.current) return;

    const handlePointerMove = (e) => {
      const parent = windowRef.current.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const windowRect = windowRef.current.getBoundingClientRect();

      // 1. find where the mouse wants to place the window in global space
      const desiredViewportX = e.clientX - dragOffset.x;
      const desiredViewportY = e.clientY - dragOffset.y;

      // 2. convert global space into parent workspace
      let newX = desiredViewportX - parentRect.left;
      let newY = desiredViewportY - parentRect.top;

      // 3. define local maximum constraints based on parent workspace
      const maxX = parentRect.width - windowRect.width;
      const maxY = parentRect.height - windowRect.height;

      // 4. clamp coordinates between 0 and maximum local lengths
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={windowRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${WINDOW_WIDTH}px`,
        height: `${WINDOW_HEIGHT}px`,
        touchAction: 'none',
      }}
      className={`bg-stone-100 border-2 border-stone-800 rounded flex flex-col transition-shadow duration-150 ${ isDragging ? 'shadow-2xl z-20' : 'shadow-md z-10'
      }`}
    >
      {/* drag handle */}
      <div 
        onPointerDown={handlePointerDown}
        className="title-bar cursor-move bg-purple-900 text-white p-2 flex justify-between items-center select-none"
      >
        <span className="font-bold text-sm">{title}</span>
        <button 
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-2 rounded text-xs"
        >
          X
        </button>
      </div>

      {/* content area */}
      <div className="p-4 flex-1 text-stone-800 overflow-auto">
        {children}
      </div>
    </div>
  );
}