'use client'

import { Circle } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Tag } from '@/types'

interface ProjectFilterProps extends Tag {
  isActive: boolean
  onToggle: (id: string) => void
}

export function ProjectFilter(props: ProjectFilterProps) {
  const { title, color, _id, isActive, onToggle } = props
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className={cn(
        'items-center flex gap-1 align-middle leading-none self-start px-1.5 py-1 rounded-sm',
        'text-xxs font-mono uppercase transition-colors',
        // isActive || isHovered
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary-foreground text-primary md:hover:bg-primary md:hover:text-primary-foreground',
        ''
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onToggle(_id)}
    >
      {title}
    </button>
  )
}