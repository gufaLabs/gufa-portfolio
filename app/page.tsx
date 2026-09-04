'use client';

import { useState } from 'react';
import { FilmCarousel } from '@/app/components/FilmCarousel';
import { GalleryModal } from '@/app/components/GalleryModal';
import { Film } from '@/app/lib/types';
import filmsData from '@/data/films.json';

export default function Home() {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const films: Film[] = filmsData;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg, #e8e4e0)' }}>
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
        
        body { font-family: 'Lora', serif; color: var(--text); }
        h1, h2, h3, .hero { font-family: 'Instrument Serif', serif; }
      `}</style>

      {/* Header */}
      <header 
        className="sticky top-0 z-40 border-b"
        style={{ 
          background: 'linear-gradient(135deg, var(--amber), var(--amber-deep))',
          borderColor: 'var(--divider)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 
              className="hero text-4xl sm:text-5xl font-bold mb-2"
              style={{ color: '#fff', fontStyle: 'italic' }}
            >
              Film Stock Portfolio
            </h1>
            <p 
              className="text-lg"
              style={{ color: '#fff', opacity: 0.95 }}
            >
              Discover unique film stocks and their visual character
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Carousel section */}
        <section className="mb-20">
          <h2 
            className="text-3xl font-bold mb-6"
            style={{ color: 'var(--text)', fontFamily: "'Instrument Serif', serif" }}
          >
            Interactive Carousel
          </h2>
          <FilmCarousel films={films} onSelectFilm={setSelectedFilm} />
          <p 
            className="text-center mt-4"
            style={{ color: 'var(--text-muted)' }}
          >
            Drag left or right to rotate. Click any cassette to view the full gallery.
          </p>
        </section>

        {/* Featured films grid */}
        <section>
          <h2 
            className="text-3xl font-bold mb-8"
            style={{ color: 'var(--text)', fontFamily: "'Instrument Serif', serif" }}
          >
            Film Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {films.map((film) => (
              <div
                key={film.id}
                onClick={() => setSelectedFilm(film)}
                className="cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  background: 'var(--surface)',
                  border: '1px solid var(--divider)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Cassette preview */}
                <div 
                  className="aspect-video flex items-center justify-center text-center p-4 group"
                  style={{ background: 'linear-gradient(135deg, #c8922a, #a67520)' }}
                >
                  <div>
                    <p 
                      className="text-sm font-semibold mb-2"
                      style={{ color: '#fff', opacity: 0.8 }}
                    >
                      {film.name}
                    </p>
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: '#fff' }}
                    >
                      ISO {film.iso}
                    </p>
                  </div>
                </div>
                
                {/* Details */}
                <div className="p-4">
                  <h3 
                    className="font-semibold mb-2"
                    style={{ color: 'var(--text)', fontSize: '1.1rem' }}
                  >
                    {film.name}
                  </h3>
                  <p 
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {film.description}
                  </p>
                  
                  {/* Type tag */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-medium px-3 py-1 rounded"
                      style={{ 
                        background: 'var(--warn-bg, #fff8e6)',
                        color: 'var(--warn-text, #7a4f1a)',
                        border: '1px solid var(--warn-border, #c8922a)'
                      }}
                    >
                      {film.type}
                    </span>
                    <span 
                      className="text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {film.images.length} photos
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Characteristics showcase */}
        <section className="mt-20 pt-12 border-t" style={{ borderColor: 'var(--divider)' }}>
          <h2 
            className="text-3xl font-bold mb-8"
            style={{ color: 'var(--text)', fontFamily: "'Instrument Serif', serif" }}
          >
            Film Characteristics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {films.map((film) => (
              <div
                key={film.id}
                className="p-6 rounded-lg"
                style={{ 
                  background: 'var(--surface)',
                  border: '1px solid var(--divider)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <h3 
                  className="font-semibold mb-3"
                  style={{ color: 'var(--text)', fontSize: '1.1rem' }}
                >
                  {film.name}
                </h3>
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
            ))}
          </div>
        </section>
      </main>

      {/* Gallery Modal */}
      <GalleryModal film={selectedFilm} onClose={() => setSelectedFilm(null)} />
    </div>
  );
}
