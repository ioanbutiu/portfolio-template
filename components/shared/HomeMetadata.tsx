'use client'

import { Clock, Navigation, RefreshCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function HomeMetadata({ updatedAt, isFixed = false }) {

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
    <div className={`${isFixed ? 'fixed bottom-0 left-0' : ''} p-4 uppercase font-mono text-xxs leading-none flex flex-col gap-2 pb-[18px]`}>
      <div className='flex items-center gap-2 align-middle'>
        <span className='text-[#000]'>
          <Navigation size={14} />
        </span>
        Ciudad de México
      </div>
      <div className='flex items-center gap-2 align-middle'>
        <span className='text-[#000]'>
          <Clock size={14} />
        </span>
        {time}
      </div>
      <div className='flex items-center gap-2 align-middle'>
        <span className='text-[#000]'>
          <RefreshCcw size={14} />
        </span>
        <div className="text-center md:text-left col-span-3 self-center col-start-4">
          {`Updated `}
          {new Date(updatedAt).toLocaleString('en-GB', {
            year: "numeric",
            month: "short"
          })}
        </div>
      </div>
    </div>
  )
}