'use client';

import { useEffect } from 'react';
import { withBasePath } from '@/app/lib/paths';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(withBasePath('/sw.js'))
        .catch((err) => {
          // Silent - PWA is a progressive enhancement, not a hard requirement.
          console.warn('Service worker registration failed:', err);
        });
    }
  }, []);

  return null;
}
