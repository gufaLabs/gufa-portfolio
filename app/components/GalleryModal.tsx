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
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-slate-900 rounded-lg shadow-2xl max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="bg-slate-800 px-6 py-4 flex justify-between items-center border-b border-slate-700">
            <div>
              <h2 className="text-2xl font-bold text-white">{film.name}</h2>
              <p className="text-slate-400 text-sm mt-1">{film.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-2xl transition"
            >
              ✕
            </button>
          </div>

          {/* Gallery */}
          <div className="p-6">
            <div className="relative bg-slate-800 rounded-lg overflow-hidden mb-6">
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
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
              >
                →
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                {currentImageIndex + 1} / {film.images.length}
              </div>
            </div>

            {/* Film details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800 p-4 rounded">
                <p className="text-slate-400 text-sm">ISO</p>
                <p className="text-white text-xl font-semibold">{film.iso}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded">
                <p className="text-slate-400 text-sm">Type</p>
                <p className="text-white text-xl font-semibold">{film.type}</p>
              </div>
            </div>

            {/* Characteristics */}
            <div>
              <p className="text-slate-400 text-sm mb-2">Characteristics</p>
              <div className="flex flex-wrap gap-2">
                {film.characteristics.map((char) => (
                  <span
                    key={char}
                    className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm"
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
