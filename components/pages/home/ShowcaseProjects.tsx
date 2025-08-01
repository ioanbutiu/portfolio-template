'use client'

import { SiGithub } from '@icons-pack/react-simple-icons'
import { SquareArrowOutUpRight, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useEffect } from 'react'

import { HomeMetadata } from '@/components/shared/HomeMetadata'
import { resolveHref } from '@/sanity/lib/utils'
import { ShowcaseProject } from '@/types'

import { ProjectFilters } from './ProjectFilters'
import { ProjectListItem } from './ProjectListItem'

interface ShowcaseProjectsProps {
  showcaseProjects: ShowcaseProject[]
  encodeDataAttribute?: (paths: string[]) => string | undefined
  updatedAt: any
}

export function ShowcaseProjects({ showcaseProjects, encodeDataAttribute, updatedAt }: ShowcaseProjectsProps) {
  const [activeTagIds, setActiveTagIds] = useState<string[]>([])
  const stickyBg = useRef<HTMLDivElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  useEffect(() => {
    // Function to check if the element has reached the top of the viewport
    const checkPosition = () => {
      if (stickyBg.current && stickyContainerRef) {
        const rect = stickyBg.current.getBoundingClientRect()
        const hasReachedTop = rect.top <= 100

        // Set background color based on position
        stickyBg.current.style.background = hasReachedTop
          ? 'hsl(var(--background))'
          : 'transparent'

        // stickyContainerRef.current.style.overflow = hasReachedTop
        //   ? 'auto'
        //   : ''
      }
    }

    // Initial check
    checkPosition()

    // Add scroll event listener
    window.addEventListener('scroll', checkPosition)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkPosition)
    }
  }, [])

  const clearFilters = useCallback(() => {
    setActiveTagIds([])
  }, [])

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

      // Handle home navigation with forward slash
      if (key === 'x') {
        event.preventDefault()
        clearFilters()
        return
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [router, clearFilters])

  const handleTagToggle = useCallback((tagId: string) => {
    setActiveTagIds(prevActiveTagIds =>
      prevActiveTagIds.includes(tagId)
        ? prevActiveTagIds.filter(id => id !== tagId)
        : [...prevActiveTagIds, tagId]
    )
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeTagIds.length === 0) {
      return showcaseProjects
    }

    return showcaseProjects.filter(project => {
      // Skip projects with no tags
      if (!project.tags || project.tags.length === 0) {
        return false
      }

      // Get all tag IDs from the project
      const projectTagIds = project.tags.map(tag => tag._id)

      // Check if ALL active tag IDs are included in this project's tags
      return activeTagIds.every(activeTagId =>
        projectTagIds.includes(activeTagId)
      )
    })
  }, [showcaseProjects, activeTagIds])

  const hasActiveFilters = activeTagIds.length > 0

  return (
    <div className='relative grid grid-cols-1 lg:grid-cols-12 gap-4'>
      {/* Left Col */}
      {/* <div className='col-span-3 top-16 bg-white rounded-sm self-start'>
        <div className='font-mono uppercase text-xxs leading-none border-b-2 p-4 h-12 border-background w-full flex justify-between items-center'>
          <span>{'Latest'}</span> */}
      {/* <button
            className={`flex items-center transition-opacity ${!hasActiveFilters ? 'opacity-0 cursor-default' : 'cursor-pointer hover:opacity-70'}`}
            onClick={clearFilters}
            disabled={!hasActiveFilters}
          >
            {'[X]'}
            <span>&nbsp;</span>
            <span>Clear</span>
          </button> */}
      {/* </div>
        <div className='p-4 font-mono uppercase text-xxs leading-none'> */}

      {/* {showcaseProjects && showcaseProjects.length > 0 && (
            <ProjectFilters
              projects={showcaseProjects}
              activeTagIds={activeTagIds}
              onTagToggle={handleTagToggle}
            />
          )} */}
      {/* <HomeMetadata updatedAt={updatedAt} /> */}
      {/* <Link href={''} className='flex items-center gap-1'>
            <SquareArrowOutUpRight size={14} />
            Email
          </Link>
          <Link href={''} className='flex items-center gap-1'>
            <SquareArrowOutUpRight size={14} />
            GitHub
          </Link>
          <Link href={''} className='flex items-center gap-1'>
            <SquareArrowOutUpRight size={14} />
            Instagram
          </Link>
          <Link href={''} className='flex items-center gap-1'>
            <SquareArrowOutUpRight size={14} />
            LinkedIn
          </Link>
          <Link href={''} className='flex items-center gap-1'>
            <SquareArrowOutUpRight size={14} />
            CV
          </Link>
        </div>
      </div> */}

      {/* Right Col */}
      <div ref={stickyContainerRef} className='col-span-12 rounded-sm flex flex-col'>
        <div ref={stickyBg} id='sticky-bg' className='pt-[72px] md:pt-16 sticky top-0 z-10'>
          <div className='font-mono uppercase text-xxs md:items-center leading-none border-b-2 border-background px-4 py-4 w-full flex flex-col md:flex-row md:justify-between bg-card gap-4 items-start md:h-12 rounded-t-sm'>
            <div className='text-secondary'>
              <span className=''>{'Selected Work'}</span>
              <span>{' '}</span>
              <span>({filteredProjects.length})</span>
            </div>
            <div className='hidden md:flex flex-col items-start md:flex-row md:items-center gap-4'>
              <span className='hidden md:block text-secondary'>{'Filter'}</span>
              {showcaseProjects && showcaseProjects.length > 0 && (
                <ProjectFilters
                  projects={showcaseProjects}
                  activeTagIds={activeTagIds}
                  onTagToggle={handleTagToggle}
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-4 flex-grow bg-card rounded-b-sm">
          {filteredProjects && filteredProjects.length > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
              {filteredProjects.map((project, key) => {
                const href = resolveHref(project?._type, project?.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link
                    key={project._id}
                    href={href}
                    data-sanity={encodeDataAttribute?.([
                      'showcaseProjects',
                      key.toString(),
                      'slug',
                    ])}
                  >
                    <ProjectListItem project={project} />
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="py-10 text-center text-secondary font-mono uppercase text-xxs">
              No projects match the selected filters
            </div>
          )}
        </div>
      </div>
    </div>
  )
}