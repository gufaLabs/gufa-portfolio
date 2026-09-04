'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Mesh, Texture, TextureLoader } from 'three';
import { Film } from '@/app/lib/types';

interface FilmCardProps {
  film: Film;
  index: number;
  totalFilms: number;
  rotation: number;
  onSelect: (film: Film) => void;
  texture: Texture | null;
}

function FilmCard({ film, index, totalFilms, rotation, onSelect, texture }: FilmCardProps) {
  const meshRef = useRef<Mesh>(null);
  const angle = (index / totalFilms) * Math.PI * 2 + rotation;
  const radius = 4;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle) * radius;
      meshRef.current.position.z = Math.sin(angle) * radius;
      meshRef.current.rotation.y = angle + Math.PI / 2;
      meshRef.current.scale.setScalar(0.85);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={() => onSelect(film)}
      onPointerOver={(e) => {
        if (meshRef.current) {
          meshRef.current.scale.setScalar(0.95);
          e.stopPropagation();
        }
      }}
      onPointerOut={() => {
        if (meshRef.current) meshRef.current.scale.setScalar(0.85);
      }}
    >
      <boxGeometry args={[2, 3, 0.2]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.1}
        emissive={texture ? '#666666' : `hsl(${index * (360 / totalFilms)}, 75%, 40%)`}
        emissiveIntensity={texture ? 0.1 : 0.3}
        emissiveMap={texture}
      />
    </mesh>
  );
}

interface FilmCarouselProps {
  films: Film[];
  onSelectFilm: (film: Film) => void;
}

export function FilmCarousel({ films, onSelectFilm }: FilmCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [textures, setTextures] = useState<Map<string, Texture | null>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const lastRotationRef = useRef(0);

  // Load textures
  useEffect(() => {
    const loader = new TextureLoader();
    const loadedTextures = new Map<string, Texture | null>();

    films.forEach((film) => {
      if (film.texture) {
        loader.load(
          film.texture,
          (texture) => {
            texture.flipY = false;
            loadedTextures.set(film.id, texture);
            setTextures(new Map(loadedTextures));
          },
          undefined,
          () => {
            loadedTextures.set(film.id, null);
            setTextures(new Map(loadedTextures));
          }
        );
      }
    });
  }, [films]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStart - clientX;
    
    if (Math.abs(diff) > 50) {
      const rotationStep = (Math.PI * 2) / films.length;
      const newRotation = rotation + (diff > 0 ? rotationStep : -rotationStep);
      setRotation(newRotation);
      lastRotationRef.current = newRotation;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <Canvas 
        camera={{ position: [0, 1.5, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -5, -10]} intensity={0.4} color="#4f46e5" />
        
        {films.map((film, index) => (
          <FilmCard
            key={film.id}
            film={film}
            index={index}
            totalFilms={films.length}
            rotation={rotation}
            onSelect={onSelectFilm}
            texture={textures.get(film.id) || null}
          />
        ))}
      </Canvas>
      
      {/* Drag hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 text-xs pointer-events-none">
        ← Drag to rotate →
      </div>
    </div>
  );
}
