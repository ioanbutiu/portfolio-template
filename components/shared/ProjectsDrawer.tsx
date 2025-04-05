'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import ImageBox from '@/components/shared/ImageBox'
import { ProjectTag } from '@/components/shared/ProjectTag'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { resolveHref } from '@/sanity/lib/utils'
import { ShowcaseProject } from '@/types'

interface ProjectsDrawerProps {
  projects: ShowcaseProject[]
  children: React.ReactNode
}

export function ProjectsDrawer({ projects, children }: ProjectsDrawerProps) {
  const [open, setOpen] = useState(false)

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

      // Open drawer with 'i' key
      if (key === 'i') {
        event.preventDefault()
        setOpen(prevOpen => !prevOpen)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] md:h-[90vh]">
        <DrawerHeader className="border-b border-background dark:border-card">
          <DrawerTitle className="font-mono text-xxs uppercase font-normal flex items-center">
            <span className='text-secondary'>Index</span>
          </DrawerTitle>
          {/* <DrawerDescription>
            All projects
          </DrawerDescription> */}
        </DrawerHeader>
        <div className="overflow-auto">
          <div className="grid gap-0 divide-y divide-background dark:divide-card">
            {projects.map((project) => {
              const href = resolveHref(project?._type, project?.slug)
              if (!href) return null

              return (
                <Link
                  key={project._id}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="group flex flex-row items-start gap-4 md:gap-16 md:items-center justify-start hover:bg-background dark:hover:bg-card transition-all p-4"
                >
                  <div className="w-16 md:w-32 h-auto aspect-[3/2] overflow-hidden rounded-sm shrink-0">
                    <ImageBox
                      image={project.coverImage}
                      alt={`Cover image from ${project.title}`}
                      classesWrapper="relative group-hover:scale-[104%] transition-all duration-400 aspect-[3/2]"
                    />
                  </div>
                  <div className='flex flex-col md:flex-row self-center grow'>
                    <div className='md:w-1/2'>
                      <span className="text-2xl text-balance font-display">{project.title}</span>
                    </div>
                    <div className='hidden md:flex self-center items-center gap-2 grow'>
                      {/* Tags */}
                      {project.tags && project.tags.slice(0, project.tags.length - 1).map((tag) => {
                        return <ProjectTag key={tag._id} {...tag} />
                      })}
                    </div>
                    <div className='hidden md:block self-center'>
                      {/* Year */}
                      {project.tags && project.tags.slice(project.tags.length - 1).map((tag) => {
                        return <ProjectTag key={tag._id} {...tag} />
                      })}
                    </div>
                    {/* Mobile tags */}
                    {/* <div className='flex md:hidden gap-2 flex-wrap'>
                      {project.tags && project.tags.map((tag) => {
                        return <ProjectTag key={tag._id} {...tag} />
                      })}
                    </div> */}
                  </div>

                  {/* <div className='flex md:hidden'>
                    <span className="text-xl">{project.title}</span>
                    <div className='flex gap-2 grow'>
                      {project.tags && project.tags.map((tag) => {
                        return <ProjectTag key={tag._id} {...tag} />
                      })}
                    </div>
                  </div> */}


                </Link>
              )
            })}
          </div>
        </div>
        {/* <DrawerFooter className="w-max mx-auto p-2 bg-card">
          <DrawerClose className="font-mono text-xxs uppercase">
            Close
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  )
}