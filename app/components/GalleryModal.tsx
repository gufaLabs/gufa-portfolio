'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film } from '@/app/lib/types';
import Image from 'next/image';

interface GalleryModalProps {
  film: Film | null;
  onClose: () => void;
}

export function GalleryModal({ film, onClose }: GalleryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!film) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % film.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + film.images.length) % film.images.length
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      >
        <style>{`
          :root {
            --surface: #fafaf8;
            --bg: #e8e4e0;
            --amber: #c8922a;
            --amber-deep: #a67520;
            --text: #2c2825;
            --text-muted: #6b5e52;
            --divider: #d6cfc8;
          }
          
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Lora:ital,wght@0,400;0,500;0,600&display=swap');
        `}</style>

        <motion.div
          className="rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{ background: 'var(--surface)' }}
        >
          {/* Header */}
          <div 
            className="px-6 py-6 flex justify-between items-center border-b"
            style={{ 
              background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))',
              borderColor: 'var(--divider)'
            }}
          >
            <div>
              <h2 
                className="text-2xl font-bold mb-2"
                style={{ color: '#fff', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
              >
                {film.name}
              </h2>
              <p className="text-sm" style={{ color: '#fff', opacity: 0.95 }}>
                {film.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl transition hover:opacity-80"
              style={{ color: '#fff' }}
            >
              ✕
            </button>
          </div>

          {/* Gallery */}
          <div className="p-6">
            <div 
              className="rounded-lg overflow-hidden mb-6"
              style={{ background: 'var(--bg)', border: '1px solid var(--divider)' }}
            >
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-96"
              >
                <Image
                  src={film.images[currentImageIndex]}
                  alt={`${film.name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition"
                style={{ 
                  background: 'rgba(200, 146, 42, 0.7)',
                  color: '#fff',
                  backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = 'rgba(200, 146, 42, 0.9)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = 'rgba(200, 146, 42, 0.7)';
                }}
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition"
                style={{ 
                  background: 'rgba(200, 146, 42, 0.7)',
                  color: '#fff',
                  backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = 'rgba(200, 146, 42, 0.9)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = 'rgba(200, 146, 42, 0.7)';
                }}
              >
                →
              </button>

              {/* Image counter */}
              <div 
                className="absolute bottom-4 right-4 px-3 py-1 rounded text-sm font-medium"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff'
                }}
              >
                {currentImageIndex + 1} / {film.images.length}
              </div>
            </div>

            {/* Film details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div 
                className="p-4 rounded"
                style={{ background: 'var(--bg)', border: '1px solid var(--divider)' }}
              >
                <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>ISO</p>
                <p className="text-2xl font-bold mt-2" style={{ color: 'var(--amber)' }}>
                  {film.iso}
                </p>
              </div>
              <div 
                className="p-4 rounded"
                style={{ background: 'var(--bg)', border: '1px solid var(--divider)' }}
              >
                <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Type</p>
                <p className="text-lg font-bold mt-2" style={{ color: 'var(--text)' }}>
                  {film.type}
                </p>
              </div>
            </div>

            {/* Characteristics */}
            <div>
              <p 
                className="text-xs font-semibold mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                CHARACTERISTICS
              </p>
              <div className="flex flex-wrap gap-2">
                {film.characteristics.map((char) => (
                  <span
                    key={char}
                    className="text-xs font-medium px-3 py-1 rounded"
                    style={{ 
                      background: 'var(--warn-bg, #fff8e6)',
                      color: 'var(--warn-text, #7a4f1a)',
                      border: '1px solid var(--warn-border, #c8922a)'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
