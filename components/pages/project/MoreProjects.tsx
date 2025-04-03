import Link from 'next/link'

import ImageBox from '@/components/shared/ImageBox'
import { resolveHref } from '@/sanity/lib/utils'
import type { ShowcaseProject } from '@/types'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface ProjectProps {
  previous: ShowcaseProject
  next: ShowcaseProject
}

export function MoreProjects(props: ProjectProps) {
  const { previous, next } = props

  return (
    <div className="flex justify-between gap-x-4 pt-8 md:pt-20 flex-col md:flex-row gap-4">
      {/* Previous project */}
      <div className="">
        {previous && (
          <Link href={resolveHref(previous?._type, previous?.slug) ?? {}} className='bg-card group'>
            <div className={`flex flex-col gap-2 md:gap-4 bg-card p-2 rounded-sm`}>

              {/* Title */}
              <div className="flex items-center uppercase text-xxs font-mono gap-2 group-hover:opacity-70 transition-opacity duration-400"><ArrowLeft size={12} /> {previous.title}</div>


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
            <div className={`flex flex-col gap-2 md:gap-4 bg-card p-2 rounded-sm`}>
              {/* Title */}
              <div className="flex items-center justify-end uppercase text-xxs font-mono gap-2 group-hover:opacity-70 transition-opacity duration-400">{next.title} <ArrowRight size={12} /></div>

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
