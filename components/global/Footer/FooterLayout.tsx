'use client'

import { Clock, Navigation, RefreshCcw } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { HeaderLink } from '@/components/shared/HeaderLink'
import { cn } from '@/lib/utils';
import type { HomePagePayload, SettingsPayload } from '@/types'


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

  const pathname = usePathname()

  // if (pathname === '/') {
  //   return null
  // }

  const title = props.title
  const lastUpdated = props.homepage?._updatedAt ?? ''
  const displayLastUpdate = props.data?.displayLastUpdated
  const footerLinks = props.data?.footerLinks
  return (
    <footer className={cn("uppercase text-xxs font-mono bottom-0 flex justify-between md:mt-12 lg:mt-0 gap-4 md:gap-x-4 p-2 pb-4 md:p-4 lg:p-4 w-full", pathname === '/' ? 'md:hidden' : '')}>
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
      <div className='hidden md:flex flex-col md:flex-row gap-2 md:gap-8'>
        <div className='flex items-center gap-2 align-middle'>
          <span className='text-primary'>
            <Navigation size={14} />
          </span>
          New York City
        </div>
        <div className='flex items-center gap-2 align-middle'>
          <span className='text-primary'>
            <Clock size={14} />
          </span>
          {time}
        </div>
        <div className='hidden md:flex items-center gap-2 align-middle'>
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

      <div className='flex w-full md:w-max justify-between flex-row gap-2 md:gap-8 items-end'>
        <div className='flex md:hidden items-center gap-2 align-middle'>
          <span className='text-primary'>
            <RefreshCcw size={12} />
          </span>
          {`Updated March 2025`}
        </div>
        <div className="text-center md:text-right">
          {title && (
            <div>
              © {title} {new Date().getFullYear()}
            </div>
          )}
        </div>
      </div>

    </footer >
  )
}
