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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              Film Stock Portfolio
            </h1>
            <p className="text-slate-400 text-lg">
              Explore different film stocks and their unique characteristics
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Carousel section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Browse Films</h2>
          <FilmCarousel films={films} onSelectFilm={setSelectedFilm} />
          <p className="text-slate-400 text-center mt-4">
            Click on any film stock to view the gallery and details
          </p>
        </section>

        {/* Featured films grid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {films.map((film) => (
              <div
                key={film.id}
                onClick={() => setSelectedFilm(film)}
                className="group cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900 rounded mb-3 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-semibold text-white mb-1">{film.name}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                  {film.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-slate-700 text-slate-200 px-2 py-1 rounded">
                    ISO {film.iso}
                  </span>
                  <span className="text-slate-400">{film.images.length} images</span>
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
