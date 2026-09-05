'use client';

import { useState } from 'react';
import { FilmCarousel } from '@/app/components/FilmCarousel';
import { GalleryView } from '@/app/components/GalleryView';
import { Film } from '@/app/lib/types';
import filmsData from '@/data/films.json';

export default function Home() {
  const films: Film[] = filmsData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const selectFilm = (film: Film) => {
    setCurrentIndex(films.findIndex((f) => f.id === film.id));
    setGalleryOpen(true);
  };

  return (
    <>
      <FilmCarousel
        films={films}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        onSelectFilm={selectFilm}
      />
      {galleryOpen && (
        <GalleryView
          film={films[currentIndex]}
          allFilms={films}
          onSelectFilm={selectFilm}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
}
