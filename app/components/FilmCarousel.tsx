'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Film } from '@/app/lib/types';
import { withBasePath } from '@/app/lib/paths';

interface FilmCarouselProps {
  films: Film[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onSelectFilm: (film: Film) => void;
}

// Signed distance of a film from the current center index, wrapped so the
// carousel loops both directions (e.g. going left from index 0 reaches the
// last film).
function getOffset(index: number, currentIndex: number, total: number) {
  let diff = index - currentIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export function FilmCarousel({ films, currentIndex, onIndexChange, onSelectFilm }: FilmCarouselProps) {
  const dragStartX = useRef(0);

  const goTo = (index: number) => {
    onIndexChange(((index % films.length) + films.length) % films.length);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX =
      'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStartX.current - clientX;
    if (Math.abs(diff) > 40) {
      goTo(currentIndex + (diff > 0 ? 1 : -1));
    }
  };

  const handleCardClick = (index: number, film: Film) => {
    if (index === currentIndex) {
      onSelectFilm(film);
    } else {
      goTo(index);
    }
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ background: 'var(--bg)', perspective: '1200px' }}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {films.map((film, index) => {
          const offset = getOffset(index, currentIndex, films.length);
          const isCenter = offset === 0;
          const visible = Math.abs(offset) <= 1;

          return (
            <motion.div
              key={film.id}
              className="absolute rounded-sm overflow-hidden shadow-2xl"
              style={{ width: 260, height: 390, transformStyle: 'preserve-3d' }}
              animate={{
                x: offset * 220,
                scale: isCenter ? 1 : 0.72,
                opacity: visible ? (isCenter ? 1 : 0.4) : 0,
                rotateY: isCenter ? 0 : offset > 0 ? -22 : 22,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              onClick={() => visible && handleCardClick(index, film)}
            >
              {film.texture && (
                <img
                  src={withBasePath(film.texture)}
                  alt={film.name}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
