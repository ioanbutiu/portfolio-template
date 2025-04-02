'use client'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { AsciiBackground } from '@/components/shared/AsciiBackground'
import { Clock, Navigation, RefreshCcw, Copyright } from 'lucide-react';
import React, { useEffect, useState } from 'react';


interface HeaderProps {
  description?: any
}
export function Header(props: HeaderProps) {
  const { description } = props
  if (!description) {
    return null
  }

  const [time, setTime] = useState('');

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
    <div className="w-full flex flex-col gap-4 mb-0 sticky top-16 -z-10 pt-48 pb-52 justify-center items-center min-h-[60vh]">
      <AsciiBackground />
      {description && (
        <div className="col-span-12 text-center text-pretty text-4xl leading-snug max-w-[50ch] font-sans w-full z-10">
          {description.displayText == true && (
            <CustomPortableText value={description.text} />
          )}
        </div>
      )}
      <div className='absolute bottom-0 w-full flex justify-between font-mono text-xxs uppercase -mb-12 leading-none z-10'>
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
