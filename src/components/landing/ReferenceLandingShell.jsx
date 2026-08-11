'use client';

import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useRouter } from 'next/navigation';
import KapiPhone from './KapiPhone';

/**
 * Monta el HTML/CSS estático de la landing de referencia tal cual, y sólo
 * reemplaza el mock de chat (#kapi-phone-mount) por el teléfono real de Kapi
 * (chat conectado a /api/chat). El resto del documento — nav, ticker, secciones,
 * la demo de subir factura, el plan de reducción — es el HTML/JS original sin tocar.
 */
export default function ReferenceLandingShell({ styleCss, bodyHtml, scriptJs }) {
  const containerRef = useRef(null);
  const scriptRanOnce = useRef(false);
  const phoneRootRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Interceptar clicks en enlaces para evitar recarga (hard-refresh)
    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href') && target.getAttribute('href').includes('/dashboard')) {
        e.preventDefault();
        router.push('/dashboard');
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleLinkClick);
    }

    // La raíz del teléfono se crea una sola vez por nodo DOM: en React 18
    // StrictMode (dev) el efecto se limpia y vuelve a correr sincrónicamente,
    // y crear+destruir createRoot() en cada ciclo dispara warnings de carrera.
    if (!phoneRootRef.current) {
      const mountEl = document.getElementById('kapi-phone-mount');
      if (mountEl) phoneRootRef.current = createRoot(mountEl);
    }
    phoneRootRef.current?.render(<KapiPhone />);

    // El script original (ticker, revelado por scroll, demo de subir factura,
    // tabla del plan de reducción) sólo debe correr una vez sobre el DOM.
    if (!scriptRanOnce.current) {
      scriptRanOnce.current = true;
      try {
        // eslint-disable-next-line no-new-func
        const run = new Function(scriptJs);
        run();
      } catch (err) {
        console.error('Error ejecutando el script de la landing de referencia:', err);
      }
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleLinkClick);
      }
    };
  }, [scriptJs, router]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleCss }} />
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
