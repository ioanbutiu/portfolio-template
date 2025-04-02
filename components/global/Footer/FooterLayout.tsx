'use client'

import { HeaderLink } from '@/components/shared/HeaderLink'
import type { HomePagePayload, SettingsPayload } from '@/types'
import { Clock, Navigation, RefreshCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';


interface FooterProps {
  data: SettingsPayload
  title: string | null
  homepage: HomePagePayload | null
}
export default function Footer(props: FooterProps) {
  const { } = props ?? {}

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

  const title = props.title
  const lastUpdated = props.homepage?._updatedAt ?? ''
  const displayLastUpdate = props.data?.displayLastUpdated
  const footerLinks = props.data?.footerLinks
  return (
    <footer className="fixed -z-10 uppercase text-xxs font-mono bottom-0 flex justify-between mt-12 lg:mt-0 gap-4 md:gap-x-4 px-4 md:px-4 py-2 md:py-4 lg:px-4 w-full">
      {/* {displayLastUpdate == true ? (
        <div className="text-center md:text-left col-span-3 self-center col-start-4">
          {`Updated `}
          {new Date(lastUpdated).toLocaleString('en-GB', {
            year: "numeric",
            month: "long"
          })}
        </div>
      ) : null} */}
      {/* <div className="flex flex-wrap gap-[2px] mt-4 md:mt-0 col-span-6">
        {footerLinks &&
          footerLinks.map((menuItem, key) => {
            return (
              <HeaderLink key={key} target={'_blank'} href={menuItem.url} title={menuItem.title} />
            )
          })}
      </div> */}
      <div className='flex gap-8'>
        <div className='flex items-center gap-2 align-middle'>
          <span className='text-primary'>
            <Navigation size={14} />
          </span>
          Ciudad de México
        </div>
        <div className='flex items-center gap-2 align-middle'>
          <span className='text-primary'>
            <Clock size={14} />
          </span>
          {time}
        </div>
        <div className='flex items-center gap-2 align-middle'>
          <span className='text-primary'>
            <RefreshCcw size={14} />
          </span>
          <div className="text-center md:text-left col-span-3 self-center col-start-4">
            {`Updated March 2025`}
            {/* {new Date(updatedAt).toLocaleString('en-GB', {
            year: "numeric",
            month: "short"
            })} */}
          </div>
        </div>
      </div>


      <div className="text-center md:text-right">
        {title && (
          <div>
            © {title} {new Date().getFullYear()}
          </div>
        )}
      </div>

    </footer >
  )
}
