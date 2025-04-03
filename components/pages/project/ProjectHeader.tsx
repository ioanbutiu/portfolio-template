import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Tag } from '@/types'
import { ProjectTag } from '@/components/shared/ProjectTag'

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
    <div className="w-full mt-24 flex gap-4">

      <div className='w-1/2 self-stretch flex flex-col justify-between'>
        {/* Title */}
        {title && <h1 className="text-4xl">{title}</h1>}
        <div className='flex gap-2'>
          {/* Tags */}
          {tags && tags.map((tag) => {
            return <ProjectTag key={tag._id} {...tag} />
          })}
        </div>
      </div>

      {/* Year */}
      {/* {year && <div className="md:mt-2">{year}</div>} */}

      <div className="w-1/2 text-pretty max-w-[60ch]">
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
