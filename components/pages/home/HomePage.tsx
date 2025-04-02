import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { HomeMetadata } from '@/components/shared/HomeMetadata'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

import { ProjectFilters } from './ProjectFilters'
import { ShowcaseProjects } from './ShowcaseProjects'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [] } = data ?? {}

  return (
    <div className="space-y-0 relative pb-12 overflow-visible">
      {/* Header */}
      {overview && <Header description={overview} />}
      {/* Homepage Metadata */}
      {/* <HomeMetadata updatedAt={data?._updatedAt ?? ''} /> */}
      {/* Showcase projects */}
      <ShowcaseProjects showcaseProjects={showcaseProjects} encodeDataAttribute={encodeDataAttribute} updatedAt={data?._updatedAt ?? ''} />

    </div>
  )
}

export default HomePage
