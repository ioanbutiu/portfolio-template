import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

import ImageBox from '@/components/shared/ImageBox'
import { resolveHref } from '@/sanity/lib/utils'
import type { ShowcaseProject } from '@/types'

interface ProjectProps {
  previous: ShowcaseProject
  next: ShowcaseProject
}

export function MoreProjects(props: ProjectProps) {
  const { previous, next } = props

  return (
    <div className="flex justify-between pt-8 md:pt-20 flex-col md:flex-row gap-2">
      {/* Previous project */}
      <div className="">
        {previous && (
          <Link href={resolveHref(previous?._type, previous?.slug) ?? {}} className='bg-card group'>
            <div className={`flex flex-col gap-2 md:gap-4 dark:bg-card dark:hover:bg-muted bg-muted hover:bg-popover transition-colors p-3 rounded-md`}>

              {/* Title */}
              <div className="flex items-center justify-between uppercase text-xxs font-mono gap-2 transition-opacity duration-400 leading-none"><ArrowLeft size={12} /> {previous.title}</div>


              <div className="md:w-96 overflow-hidden rounded-sm">
                <ImageBox
                  image={previous.coverImage}
                  alt={`Cover image from ${previous.title}`}
                  classesWrapper="relative aspect-[3/2] group-hover:scale-[104%] transition-all duration-400"
                />
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Next project */}
      <div className="">
        {next && (
          <Link href={resolveHref(next?._type, next?.slug) ?? {}} className='bg-card group'>
            <div className={`flex flex-col gap-2 md:gap-4 dark:bg-card dark:hover:bg-muted bg-muted hover:bg-popover transition-colors p-3 rounded-md`}>
              {/* Title */}
              <div className="flex items-center justify-between uppercase text-xxs font-mono gap-2 transition-opacity duration-400 leading-none">{next.title} <ArrowRight size={12} /></div>

              <div className="md:w-96 overflow-hidden rounded-sm">
                <ImageBox
                  image={next.coverImage}
                  alt={`Cover image from ${next.title}`}
                  classesWrapper="relative aspect-[3/2] group-hover:scale-[104%] transition-all duration-400"
                />
              </div>
            </div>
          </Link>
        )}
      </div>
    </div >
  )
}
