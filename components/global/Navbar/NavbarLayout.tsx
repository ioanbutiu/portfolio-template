import Image from 'next/image'
import Link from 'next/link'

import { HeaderLink } from '@/components/shared/HeaderLink'
import { Switch } from "@/components/ui/switch"
import { resolveHref, urlForLogo } from '@/sanity/lib/utils'
import type { LinkItem, PageItem, SettingsPayload } from '@/types'
import ThemeSwitch from './ThemeSwitch'


interface NavbarProps {
  data: SettingsPayload
  title: string | null
  logo: any | null
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

  return (
    <div className="grid grid-cols-12 justify-between items-center gap-x-4 px-4 md:py-4 lg:px-4 sticky top-0 z-50 w-full h-16">
      {customLogo && customLogo ? (
        <Link href={`/`} className={`h-full hover:text-secondary`}>
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
        <div className='col-span-3 leading-none flex flex-wrap gap-1 mt-4 md:mt-0'>

          <HeaderLink href={`/`} title={title} />
        </div>


      )}
      <div className="flex flex-wrap gap-1 mt-4 md:mt-0 col-span-6 justify-center">
        <HeaderLink href={'/index'} title={'Index'} />
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
        {/* <HeaderLink target={'_blank'} href={'mailto:ioan.butiu@gmail.com'} title={'Email'} /> */}
        {/* <HeaderLink href={'/blog'} title={'Blog'} /> */}
        {/* <HeaderLink href={'/guestbook'} title={'Guestbook'} /> */}


      </div>
      <div className='self-stretch flex flex-wrap justify-end items-center gap-1 mt-4 md:mt-0 col-span-3'>
        {/* {footerLinks &&
          footerLinks.map((footerLink, key) => {
            return (
              <HeaderLink key={key} target={'_blank'} href={footerLink.url} title={footerLink.title} />
            )
          })} */}
        <ThemeSwitch />
        {/* <Switch /> */}
      </div>
    </div>
  )
}
