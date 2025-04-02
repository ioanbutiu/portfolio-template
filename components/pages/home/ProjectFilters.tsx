'use client'

import { useEffect, useState } from 'react'

import { ProjectFilter } from "@/components/shared/ProjectFilter"
import { ShowcaseProject, Tag } from '@/types'

interface ProjectFiltersProps {
  projects: ShowcaseProject[]
  activeTagIds: string[]
  onTagToggle: (tagId: string) => void
}

export function ProjectFilters({ projects, activeTagIds, onTagToggle }: ProjectFiltersProps) {
  const [uniqueTags, setUniqueTags] = useState<Tag[]>([])

  useEffect(() => {
    // Filter out projects without tags, and ensure tags are non-null
    const allTags = projects
      .flatMap(p => p.tags || [])
      .filter(Boolean)

    const uniqueTagsById = Object.values(
      allTags.reduce((acc, tag) => ({
        ...acc,
        [tag._id]: tag
      }), {})
    ).sort((a: Tag, b: Tag) => a.title.localeCompare(b.title))

    setUniqueTags(uniqueTagsById as Tag[])
  }, [projects])

  return (
    <div className="w-auto">
      <div className="flex flex-wrap justify-start gap-1 w-full">
        {uniqueTags && uniqueTags.length > 0 && (uniqueTags.map((tag) => (
          <ProjectFilter
            key={tag._id}
            {...tag}
            isActive={activeTagIds.includes(tag._id)}
            onToggle={onTagToggle}
          />
        )))}
      </div>
    </div>
  )
}