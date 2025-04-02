'use client'

import { X, SquareArrowOutUpRight } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useMemo, useState, useRef } from 'react'
import { useEffect } from 'react'

import { resolveHref } from '@/sanity/lib/utils'
import { ShowcaseProject } from '@/types'

import { ProjectFilters } from './ProjectFilters'
import { ProjectListItem } from './ProjectListItem'
import { HomeMetadata } from '@/components/shared/HomeMetadata'

interface ShowcaseProjectsProps {
  showcaseProjects: ShowcaseProject[]
  encodeDataAttribute?: (paths: string[]) => string | undefined
  updatedAt: any
}

export function ShowcaseProjects({ showcaseProjects, encodeDataAttribute, updatedAt }: ShowcaseProjectsProps) {
  const [activeTagIds, setActiveTagIds] = useState<string[]>([])
  const stickyBg = useRef<HTMLDivElement>(null)

  const router = useRouter()

  useEffect(() => {
    // Function to check if the element has reached the top of the viewport
    const checkPosition = () => {
      if (stickyBg.current) {
        const rect = stickyBg.current.getBoundingClientRect()
        const hasReachedTop = rect.top <= 0

        // Set background color based on position
        stickyBg.current.style.background = hasReachedTop
          ? 'hsl(var(--background))'
          : 'transparent'
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
      <div className='col-span-12 rounded-sm flex flex-col'>
        <div ref={stickyBg} id='sticky-bg' className='pt-16 sticky top-0 z-10'>
          <div className='font-mono uppercase text-xxs items-center leading-none border-b-2 border-background px-4 py-4 w-full flex justify-between bg-card h-12 rounded-t-sm'>
            <div>
              <span>{'Selected Work'}</span>
              <span>{' '}</span>
              <span>({filteredProjects.length})</span>
            </div>
            <div className='flex items-center gap-2'>
              <span>{'Filter'}</span>
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
            <div className='columns-1 lg:columns-2 xl:columns-3 gap-x-4 gap-y-8'>
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
            <div className="py-10 text-center text-gray-500">
              No projects match the selected filters
            </div>
          )}
        </div>
      </div>
    </div>
  )
}