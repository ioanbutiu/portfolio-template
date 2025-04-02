'use client'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { AsciiBackground } from '@/components/shared/AsciiBackground'
import { Clock, Navigation, RefreshCcw, Copyright } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';

interface HeaderProps {
  description?: any
}

export function Header(props: HeaderProps) {
  const { description } = props
  if (!description) {
    return null
  }

  const [time, setTime] = useState('');
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const headerRef = useRef<HTMLDivElement>(null);

  // Set up scroll handler for fade effect
  useEffect(() => {
    // Skip on server
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Find when sticky-bg hits top of viewport for the cutoff point
      const stickyElement = document.getElementById('sticky-bg');
      const scrollY = window.scrollY;

      if (stickyElement) {
        const stickyTop = stickyElement.getBoundingClientRect().top;

        // If sticky element is at top, hide header completely
        if (stickyTop <= 0) {
          setOpacity(0);
          return;
        }
      }

      // Calculate opacity based on scroll position
      const newOpacity = Math.max(0, Math.min(1, 1 - scrollY / 600));

      const newScale = Math.max(0.92, Math.min(1, 1 - (scrollY / 400) * 0.08));

      setOpacity(newOpacity);
      setScale(newScale);
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Set initial time
    setTime(new Date().toLocaleTimeString('en-US', {
      timeZone: 'America/Mexico_City',
      hour12: false,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    }));

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Mexico_City',
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={headerRef}
      style={{ '--header-opacity': opacity } as React.CSSProperties}
      className="w-full flex flex-col gap-4 mb-0 sticky top-16 -z-10 pt-48 pb-52 justify-center items-center min-h-[60vh]"
    >
      <AsciiBackground />

      {/* Background overlay that becomes more opaque as you scroll */}
      <div
        style={{
          opacity: 1 - opacity, // Inverse of content opacity
          transition: 'opacity 0.2s ease-out',
          backgroundColor: 'hsl(var(--background))',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 5 // Above ASCII but below content
        }}
        aria-hidden="true"
      />

      {description && (
        <div
          style={{
            opacity: opacity,
            transform: `scale(${scale})`,
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            position: 'relative',
            zIndex: 10
          }}
          className="col-span-12 text-center text-pretty text-4xl leading-snug max-w-[50ch] font-sans w-full"
        >
          {description.displayText == true && (
            <CustomPortableText value={description.text} />
          )}
        </div>
      )}
      <div
        className='absolute bottom-0 w-full flex justify-between font-mono text-xxs uppercase -mb-12 leading-none'
      >
        <div className='flex gap-8'>
          <div className='flex items-center gap-2 align-middle'>
            <span className='text-primary'>
              <Navigation size={12} />
            </span>
            Ciudad de México
          </div>
          <div className='flex items-center gap-2 align-middle'>
            <span className='text-primary'>
              <Clock size={12} />
            </span>
            {time}
          </div>
          <div className='flex items-center gap-2 align-middle'>
            <span className='text-primary'>
              <RefreshCcw size={12} />
            </span>
            {`Updated March 2025`}
          </div>
        </div>

        <div className="text-center md:text-right flex items-center gap-2 align-middle">
          <Copyright size={12} /> <span>Ioan Butiu {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}
