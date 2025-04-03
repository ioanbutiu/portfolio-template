import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { Module } from '@/components/modules'
import { MoreProjects } from '@/components/pages/project/MoreProjects'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { ProjectPayload } from '@/types'
import type { HomePagePayload } from '@/types'

import { ProjectHeader } from './ProjectHeader'

export interface ProjectPageProps {
  data: ProjectPayload | null
  moreProjects: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ProjectPage({
  data,
  moreProjects,
  encodeDataAttribute,
}: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { year, overview, site, tags, title, content, slug } = data ?? {}

  // Get a list of showcased projects
  const { showcaseProjects = [] } = moreProjects ?? {}

  // Get previous and next project
  const projects = showcaseProjects
  const currentProjectIndex = projects.findIndex(
    (project) => project.slug === slug,
  )
  const prevProject = projects[currentProjectIndex - 1] || null
  const nextProject = projects[currentProjectIndex + 1] || null

  return (
    <div className='w-full px-2 md:px-0'>
      <div className='md:w-3/4 mx-auto'>

        <div className="mb-10 md:mb-20 space-y-4">
          <ProjectHeader
            title={title}
            year={year}
            tags={tags}
            site={site}
            overview={overview}
          />
          <div>
            {/* Display project content by type */}
            {content?.map((content, key) => (
              <Module key={key} content={content} />
            ))}
          </div>
        </div>

      </div>

      {/* Previous and next project links */}
      {projects && <MoreProjects previous={prevProject} next={nextProject} />}

    </div>
  )
}

export default ProjectPage
