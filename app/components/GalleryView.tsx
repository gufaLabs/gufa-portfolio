'use client';

import { motion } from 'framer-motion';
import { Film } from '@/app/lib/types';
import { withBasePath } from '@/app/lib/paths';

interface GalleryViewProps {
  film: Film;
  allFilms: Film[];
  onSelectFilm: (film: Film) => void;
  onClose: () => void;
}

export function GalleryView({ film, allFilms, onSelectFilm, onClose }: GalleryViewProps) {
  const otherFilms = allFilms.filter((f) => f.id !== film.id);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Left sidebar */}
      <aside
        className="w-64 shrink-0 h-screen flex flex-col justify-between px-6 py-8"
        style={{ background: 'var(--amber-deep)' }}
      >
        <div>
          <button
            onClick={onClose}
            className="text-left mb-8 group"
            title="Back to carousel"
          >
            <h1
              className="text-3xl transition group-hover:opacity-75"
              style={{ color: '#fff', fontFamily: 'var(--font-serif), serif', fontStyle: 'italic' }}
            >
              ← {film.name}
            </h1>
          </button>

          <nav className="flex flex-col gap-3">
            {otherFilms.map((f) => (
              <button
                key={f.id}
                onClick={() => onSelectFilm(f)}
                className="text-left text-sm tracking-wide opacity-75 hover:opacity-100 transition"
                style={{ color: '#fff' }}
              >
                {f.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Lab notes / connect block */}
        <div className="pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
          <p className="text-[11px] tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Lab Notes
          </p>
          <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
            ISO {film.iso} · {film.type}
          </p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {film.characteristics.join(' · ')}
          </p>
          <p className="text-[11px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
            gufa.Labs
          </p>
        </div>
      </aside>

      {/* Scrollable image grid */}
      <main className="flex-1 h-screen overflow-y-auto" style={{ background: 'var(--surface)' }}>
        <div className="grid grid-cols-3">
          {film.images.map((src, i) => (
            <div key={src} className="aspect-square overflow-hidden">
              <img
                src={withBasePath(src)}
                alt={`${film.name} sample ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
