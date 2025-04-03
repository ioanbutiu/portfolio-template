import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { ProjectTag } from '@/components/shared/ProjectTag'
import { Tag } from '@/types'

interface ProjectHeaderProps {
  title?: string
  year?: string
  site?: {
    url: string
    urltitle?: string
  }
  overview?: any
  tags?: Tag[]
}

export function ProjectHeader(props: ProjectHeaderProps) {
  const { title, year, tags, site, overview } = props

  return (
    <div className="w-full mt-12 md:mt-24 flex flex-col md:flex-row gap-4">

      <div className='md:w-1/2 self-stretch flex flex-col gap-4 justify-between'>
        {/* Title */}
        {title && <h1 className="text-4xl">{title}</h1>}
        <div className='flex gap-2 flex-wrap'>
          {/* Tags */}
          {tags && tags.map((tag) => {
            return <ProjectTag key={tag._id} {...tag} />
          })}
        </div>
      </div>

      {/* Year */}
      {/* {year && <div className="md:mt-2">{year}</div>} */}

      <div className="md:w-1/2 text-pretty max-w-[60ch]">
        {/* Overview */}
        {overview && <CustomPortableText value={overview} paragraphClasses='!mb-0' />}
        {/* Site */}
        {/* {site && (
              <Link
                target="_blank"
                className="break-words underline"
                href={site.url}
              >
                {site.urltitle}
              </Link>
            )} */}
      </div>
    </div>
  )
}
