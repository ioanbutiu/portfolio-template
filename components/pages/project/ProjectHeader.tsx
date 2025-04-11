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
  details?: {
    _key: string
    role: string
    name: string
  }[]
  tags?: Tag[]
}

export function ProjectHeader(props: ProjectHeaderProps) {
  const { title, year, tags, site, overview, details } = props

  console.log(details)

  return (
    <div className="w-full mt-4 flex flex-col md:flex-row gap-4">

      <div className='md:w-1/2 self-stretch flex flex-col gap-4 justify-between'>
        {/* Title */}
        {title && <h1 className="text-5xl font-display text-balance">{title}</h1>}

      </div>

      {/* Year */}
      {/* {year && <div className="md:mt-2">{year}</div>} */}

      <div className="md:w-1/2 text-pretty">
        {/* Overview */}
        {overview && <CustomPortableText value={overview} paragraphClasses='!mb-0' />}

        {/* Site */}
        {site && (
          <Link
            target="_blank"
            className="link mt-4 inline-block"
            href={site.url}
          >
            {site.urltitle}
          </Link>
        )}

        {/* Details */}
        {details && (
          <div className='my-4'>
            {details.map(detail => (
              <div key={detail._key} className='flex items-baseline'><span className='shrink-0 text-secondary'>{detail.role}:&nbsp;</span><span>{detail.name}</span></div>
            ))}
          </div>)
        }

        {/* Tags */}
        <div className='flex gap-2 flex-wrap mt-[18px]'>
          {tags && tags.map((tag) => {
            return <ProjectTag key={tag._id} {...tag} />
          })}
        </div>

      </div>
    </div>
  )
}
