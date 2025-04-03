'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ProjectsDrawer } from '@/components/shared/ProjectsDrawer'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ShowcaseProject } from '@/types'

interface HeaderLinks {
  title?: string
  href?: any
  target?: string
  projects?: ShowcaseProject[]
}

export function HeaderLink(props: HeaderLinks) {
  const { title, href = '/', target = '', projects = [] } = props
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isContact = title === 'Contact'
  const isIndex = title === 'Index'

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore key presses if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      const key = event.key.toLowerCase()

      // Handle contact dialog with 'c' key - toggle open/closed
      if (key === 'c' && isContact) {
        event.preventDefault()
        setOpen(prevOpen => !prevOpen)
        return
      }

      // Handle home navigation with forward slash
      if (key === '/' && href === '/') {
        event.preventDefault()
        router.push('/')
        return
      }

      // Handle Are.na link with asterisk  
      if (key === '*' && title === 'Are.na') {
        event.preventDefault()
        window.open(href, '_blank')
        return
      }

      // Handle Instagram link with n  
      if (key === 'n' && title === 'Instagram') {
        event.preventDefault()
        window.open(href, '_blank')
        return
      }

      // Handle navigation for other links using first letter
      if (title &&
        title !== 'Are.na' &&
        title !== 'Instagram' &&
        title !== 'Contact' &&
        title !== 'Index' &&
        title !== 'Ioan Butiu' &&
        key === title.charAt(0).toLowerCase()) {
        event.preventDefault()
        if (target === '_blank') {
          window.open(href, '_blank')
        } else {
          router.push(href)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [href, title, router, target, setOpen, isContact])

  const isActive = pathname === href && href !== '/'

  // Return link wrapped in a projects drawer if it's the Index link
  if (isIndex && projects.length > 0) {
    return (
      <ProjectsDrawer projects={projects}>
        <button className={`${isActive ? 'bg-primary text-primary-foreground' : 'bg-card text-primary'} font-mono uppercase rounded-sm text-xxs pl-2 pr-2.5 min-h-7 pt-2 pb-2 leading-none md:hover:bg-primary md:hover:text-primary-foreground transition-colors grow md:grow-0 text-left`}>
          [I]{` `}{title}
        </button>
      </ProjectsDrawer>
    )
  }

  // Return link wrapped in a dialog if it's the Contact link
  if (isContact) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className={`${isActive ? 'bg-primary text-primary-foreground' : 'bg-card text-primary'} font-mono uppercase rounded-sm text-xxs pl-2 pr-2.5 min-h-7 pt-2 pb-2 leading-none md:hover:bg-primary md:hover:text-primary-foreground transition-colors grow md:grow-0 text-left`}>
            [C]{` `}{title}
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-xs md:max-w-md aspect-[5/6] border-none p-4 rounded-md">
          <DialogHeader>
            <DialogTitle className="font-mono text-xxs uppercase font-normal h-8 flex items-center"><span className='text-secondary'>Contact</span></DialogTitle>
            <DialogDescription className="pt-2 text-2xl md:text-3xl text-left text-balance">
              Get in touch if you want more information about my work or if you&apos;d like to discuss a project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 grow md:grow-0">
            <Link href="mailto:email@example.com" className="group flex items-center gap-1 text-sm md:hover:text-primary-foreground md:hover:bg-primary transition-all bg-card rounded-sm px-4 py-2 justify-between">
              Email
              <SquareArrowOutUpRight size={14} className='text-primary-foreground group-md:hover:opacity-100 opacity-0 transition-all' />
            </Link>
            <Link href="https://github.com/" target="_blank" className="group flex items-center gap-1 text-sm md:hover:text-primary-foreground md:hover:bg-primary transition-all bg-card rounded-sm px-4 py-2 justify-between">
              GitHub
              <SquareArrowOutUpRight size={14} className='text-primary-foreground group-md:hover:opacity-100 opacity-0 transition-all' />
            </Link>
            <Link href="https://linkedin.com/" target="_blank" className="group flex items-center gap-1 text-sm md:hover:text-primary-foreground md:hover:bg-primary transition-all bg-card rounded-sm px-4 py-2 justify-between">
              LinkedIn
              <SquareArrowOutUpRight size={14} className='text-primary-foreground md:group-hover:opacity-100 opacity-0 transition-all' />
            </Link>
            <Link href="https://twitter.com/" target="_blank" className="group flex items-center gap-1 text-sm md:hover:text-primary-foreground md:hover:bg-primary transition-all bg-card rounded-sm px-4 py-2 justify-between">
              Instagram
              <SquareArrowOutUpRight size={14} className='text-primary-foreground md:group-hover:opacity-100 opacity-0 transition-all' />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Return normal link for other links
  return (
    <Link className={`${isActive ? 'bg-primary text-primary-foreground' : 'bg-card text-primary'} font-mono uppercase rounded-sm text-xxs pl-2 pr-2.5 pt-2 pb-2 leading-none hover:bg-primary hover:text-primary-foreground transition-colors min-h-7 whitespace-nowrap grow md:grow-0`} href={href} target={target}>
      [{title && href !== '/' ? title === 'Are.na' ? '*' : title === 'Instagram' ? 'N' : title.charAt(0) : '/'}]{` `}{title}
    </Link>
  )
}
