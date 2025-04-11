'use client'

import { Clock, Copyright, Navigation, RefreshCcw } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { AsciiBackground } from '@/components/shared/AsciiBackground'
import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface HeaderProps {
  description?: any
}

export function Header(props: HeaderProps) {
  const { description } = props

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
      timeZone: 'America/New_York',
      hour12: false,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    }));

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
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
      className="w-full flex flex-col gap-4 mb-0 sticky top-16 -z-10 pt-28 pb-20 md:pt-48 md:pb-52 justify-center items-center md:min-h-[60vh]"
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
          className="col-span-12 text-center text-[22px] md:text-[40px] leading-[1.2] max-w-[44ch] font-display md:font-normal w-full text-pretty"
        >
          {description.displayText == true && (
            <CustomPortableText value={description.text} />
          )}
        </div>
      )}
      <div
        className='absolute bottom-0 w-full flex justify-between font-mono text-xxs uppercase -mb-16 md:-mb-12 leading-none'
      >
        <div className='flex flex-col md:flex-row gap-2 md:gap-8'>

          <div className='flex items-center gap-2 align-middle'>
            <span className=''>
              <Navigation size={12} />
            </span>
            New York City
          </div>

          <div className='hidden md:flex items-center gap-2 align-middle'>
            <span className=''>
              <Clock size={12} />
            </span>
            {time}
          </div>

          <div className='md:flex items-center gap-2 align-middle hidden'>
            <span className=''>
              <RefreshCcw size={12} />
            </span>
            {`Updated March 2025`}
          </div>

        </div>

        <div className='flex flex-col md:flex-row gap-2 md:gap-8 items-end'>

          <div className='md:hidden flex items-center gap-2 align-middle'>
            <span className=''>
              <Clock size={12} />
            </span>
            {time}
          </div>

          <div className='hidden items-center gap-2 align-middle'>
            <span className=''>
              <RefreshCcw size={12} />
            </span>
            {`Updated March 2025`}
          </div>

          <div className="hidden md:flex text-center md:text-right items-center gap-2 align-middle">
            <Copyright size={12} /> <span>Ioan Butiu {new Date().getFullYear()}</span>
          </div>

        </div>

      </div>
    </div>
  )
}
