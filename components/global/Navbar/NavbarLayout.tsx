'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { HeaderLink } from '@/components/shared/HeaderLink'
import { Switch } from "@/components/ui/switch"
import { cn } from '@/lib/utils'
import { resolveHref, urlForLogo } from '@/sanity/lib/utils'
import type { LinkItem, PageItem, SettingsPayload, ShowcaseProject } from '@/types'

import ThemeSwitch from './ThemeSwitch'

interface NavbarProps {
  data: SettingsPayload
  title: string | null
  logo: any | null
  projects: ShowcaseProject[] | null
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const title = props.title ?? ''

  const menuItems = data?.menuItems ?? {}
  const menuPages = menuItems?.page || ([] as PageItem[])
  const menuLinks = menuItems?.link || ([] as LinkItem[])

  const footerLinks = data?.footerLinks ?? ([] as LinkItem[])

  const customLogo = props?.logo
  const logoImageUrl = customLogo && urlForLogo(customLogo)?.url()

  const pathname = usePathname()

  return (
    <div className={cn("flex flex-wrap justify-between items-center gap-1 md:gap-2 p-2 md:p-4 lg:px-4 sticky top-0 z-50 w-full h-auto md:h-16", pathname !== '/' ? '' : '')}>
      {customLogo && customLogo ? (
        <Link href={`/`} className={`h-full md:hover:text-secondary`}>
          <div className="flex h-6">
            <Image
              alt={title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 'auto', height: 'auto' }}
              src={logoImageUrl}
            />
          </div>
        </Link>
      ) : (
        <div className='w-auto md:w-48 leading-none flex flex-wrap gap-1 grow md:grow-0'>

          <HeaderLink href={`/`} title={title} />
        </div>


      )}
      <div className={cn("flex flex-wrap order-3 md:order-none w-full gap-1 col-span-6 justify-center md:w-max", pathname !== '/' ? '' : '')}>

        {menuPages &&
          menuPages.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return <HeaderLink key={key} href={href} title={menuItem.title} />
          })}

        {menuLinks &&
          menuLinks.map((menuItem, key) => {
            return (
              <HeaderLink key={key} target={'_blank'} href={menuItem.url} title={menuItem.title} />
            )
          })}
        <HeaderLink href='#' title={'Contact'} />
        <HeaderLink href={'#'} title={'Index'} projects={props.projects || []} />
        {/* <HeaderLink target={'_blank'} href={'mailto:ioan.butiu@gmail.com'} title={'Email'} /> */}
        {/* <HeaderLink href={'/blog'} title={'Blog'} /> */}
        {/* <HeaderLink href={'/guestbook'} title={'Guestbook'} /> */}


      </div>
      <div className={cn('w-auto md:w-48 flex justify-end', pathname !== '/' ? '' : '')}>
        {/* {footerLinks &&
          footerLinks.map((footerLink, key) => {
            return (
              <HeaderLink key={key} target={'_blank'} href={footerLink.url} title={footerLink.title} />
            )
          })} */}
        <ThemeSwitch />
        {/* <Switch /> */}
      </div>
    </div >
  )
}
