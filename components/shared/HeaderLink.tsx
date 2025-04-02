'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SquareArrowOutUpRight } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface HeaderLinks {
  title?: string
  href?: any
  target?: string
}

export function HeaderLink(props: HeaderLinks) {
  const { title, href = '/', target = '' } = props
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const isContact = title === 'Contact'

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
      if (key === 'c') {
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
  }, [href, title, router, target, setOpen])

  const isActive = pathname === href && href !== '/'

  // Return link wrapped in a dialog if it's the Contact link
  if (isContact) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className={`${isActive ? 'bg-primary text-primary-foreground' : 'bg-card text-primary'} font-mono uppercase rounded-sm text-xxs pl-2 pr-2.5 min-h-7 pt-2 pb-2 leading-none hover:bg-primary hover:text-primary-foreground transition-colors`}>
            [C]{` `}{title}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md aspect-[5/6] border-none p-4">
          <DialogHeader>
            <DialogTitle className="font-mono text-xxs uppercase font-normal h-8 flex items-center">Contact</DialogTitle>
            <DialogDescription className="pt-2 text-3xl text-secondary">
              Get in touch through one of these channels:
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Link href="mailto:email@example.com" className="group flex items-center gap-1 text-sm hover:text-primary-foreground hover:bg-primary transition-all bg-card rounded-sm px-4 justify-between">
              Email
              <SquareArrowOutUpRight size={14} className='text-primary-foreground group-hover:opacity-100 opacity-0 transition-all' />
            </Link>
            <Link href="https://github.com/" target="_blank" className="group flex items-center gap-1 text-sm hover:text-primary-foreground hover:bg-primary transition-all bg-card rounded-sm px-4 justify-between">
              GitHub
              <SquareArrowOutUpRight size={14} className='text-primary-foreground group-hover:opacity-100 opacity-0 transition-all' />
            </Link>
            <Link href="https://linkedin.com/" target="_blank" className="group flex items-center gap-1 text-sm hover:text-primary-foreground hover:bg-primary transition-all bg-card rounded-sm px-4 justify-between">
              LinkedIn
              <SquareArrowOutUpRight size={14} className='text-primary-foreground group-hover:opacity-100 opacity-0 transition-all' />
            </Link>
            <Link href="https://twitter.com/" target="_blank" className="group flex items-center gap-1 text-sm hover:text-primary-foreground hover:bg-primary transition-all bg-card rounded-sm px-4 justify-between">
              Instagram
              <SquareArrowOutUpRight size={14} className='text-primary-foreground group-hover:opacity-100 opacity-0 transition-all' />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Return normal link for non-Contact links
  return (
    <Link className={`${isActive ? 'bg-primary text-primary-foreground' : 'bg-card text-primary'} font-mono uppercase rounded-sm text-xxs pl-2 pr-2.5 pt-2 pb-2 leading-none hover:bg-primary hover:text-primary-foreground transition-colors min-h-7`} href={href} target={target}>
      [{title && href !== '/' ? title === 'Are.na' ? '*' : title === 'Instagram' ? 'N' : title.charAt(0) : '/'}]{` `}{title}
    </Link>
  )
}
