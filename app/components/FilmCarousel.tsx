'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Film } from '@/app/lib/types';

interface FilmCardProps {
  film: Film;
  position: number;
  totalFilms: number;
  onSelect: (film: Film) => void;
}

function FilmCard({ film, position, totalFilms, onSelect }: FilmCardProps) {
  const meshRef = useRef<Mesh>(null);
  const angle = (position / totalFilms) * Math.PI * 2;
  const radius = 4;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle) * radius;
      meshRef.current.position.z = Math.sin(angle) * radius;
      meshRef.current.rotation.y = angle;
      meshRef.current.scale.setScalar(0.8);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={() => onSelect(film)}
      onPointerOver={() => {
        if (meshRef.current) meshRef.current.scale.setScalar(0.9);
      }}
      onPointerOut={() => {
        if (meshRef.current) meshRef.current.scale.setScalar(0.8);
      }}
    >
      <boxGeometry args={[2, 3, 0.1]} />
      <meshStandardMaterial color={`hsl(${position * 72}, 70%, 60%)`} />
    </mesh>
  );
}

interface FilmCarouselProps {
  films: Film[];
  onSelectFilm: (film: Film) => void;
}

export function FilmCarousel({ films, onSelectFilm }: FilmCarouselProps) {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {films.map((film, index) => (
          <FilmCard
            key={film.id}
            film={film}
            position={index}
            totalFilms={films.length}
            onSelect={onSelectFilm}
          />
        ))}
      </Canvas>
    </div>
  );
}
