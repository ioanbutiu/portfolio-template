import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface ProjectHeaderProps {
  title?: string
  year?: string
  site?: {
    url: string
    urltitle?: string
  }
  overview?: any
}

export function ProjectHeader(props: ProjectHeaderProps) {
  const { title, year, site, overview } = props

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-2"></div>
      <div className="col-span-3">
        {/* Title */}
        {title && <div className="">{title}</div>}
        {/* Year */}
        {year && <div className="md:mt-2">{year}</div>}
      </div>
      <div className="col-span-5 text-pretty">
        {/* Overview */}
        {overview && <CustomPortableText value={overview} />}
        {/* Site */}
        {site && (
          <div className="mt-3">
            {site && (
              <Link
                target="_blank"
                className="break-words underline"
                href={site.url}
              >
                {site.urltitle}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
