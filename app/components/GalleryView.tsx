'use client';

import { useState } from 'react';
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
  // Collapsed by default on mobile, where the info bar sits below the
  // images and should stay out of the way until the visitor asks for it.
  // Desktop always shows the sidebar expanded (handled purely with CSS below).
  const [collapsed, setCollapsed] = useState(true);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Scrollable image grid - primary area, comes first on mobile so it
          isn't squeezed by the info bar below it. */}
      <main
        className="order-1 md:order-2 flex-1 min-h-0 overflow-y-auto"
        style={{ background: 'var(--surface)' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3">
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

      {/* Info bar: left sidebar on desktop, collapsible bottom bar on mobile */}
      <aside
        className={`order-2 md:order-1 shrink-0 w-full md:w-64 md:h-screen md:max-h-none flex flex-col px-6 py-4 md:py-8 md:justify-between overflow-y-auto transition-[max-height] duration-300 ease-out ${
          collapsed ? 'max-h-16' : 'max-h-[50vh]'
        }`}
        style={{ background: 'var(--amber-deep)' }}
      >
        <div className="flex items-center justify-between md:block">
          <button
            onClick={onClose}
            className="text-left group"
            title="Back to carousel"
          >
            <h1
              className="text-xl md:text-3xl transition group-hover:opacity-75"
              style={{ color: '#fff', fontFamily: 'var(--font-serif), serif', fontStyle: 'italic' }}
            >
              ← {film.name}
            </h1>
          </button>

          {/* Collapse/expand toggle - mobile only, desktop sidebar is always expanded */}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="md:hidden shrink-0 p-2 -mr-2"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Show film details' : 'Hide film details'}
          >
            <motion.span
              animate={{ rotate: collapsed ? 0 : 180 }}
              transition={{ duration: 0.2 }}
              className="block text-lg"
              style={{ color: '#fff' }}
            >
              ▲
            </motion.span>
          </button>
        </div>

        {/* Details block: collapsed via opacity+overflow on mobile (height
            capped by the aside's own max-h), always shown on desktop. */}
        <div
          className={`transition-opacity duration-300 md:!opacity-100 ${
            collapsed ? 'max-h-0 opacity-0 overflow-hidden' : 'opacity-100'
          }`}
        >
          <nav className="flex flex-col gap-3 mt-6 md:mt-8">
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

          {/* Lab notes / connect block */}
          <div className="pt-6 mt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
            <p className="text-[11px] tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Lab Notes
            </p>
            <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
              ISO {film.iso} · {film.type}
            </p>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {film.characteristics.join(' · ')}
            </p>
            <p className="text-[11px] tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
              The Film Dealer
            </p>
          </div>
        </div>
      </aside>
    </motion.div>
  );
}
