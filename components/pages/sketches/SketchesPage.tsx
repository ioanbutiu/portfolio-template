'use client'

import { useState } from 'react'

import { SketchesPayload } from '@/types'

interface SketchesPageProps {
  data: SketchesPayload
}

import SketchImage from './SketchImage'
import SketchVideo from './SketchVideo'

export function SketchesPage({ data }: SketchesPageProps) {
  const [isLoading, setIsLoading] = useState(true)

  if (!data?.content) {
    return (
      <div className="text-center p-8">
        No sketches found. Add content in the Studio.
      </div>
    )
  }

  return (
    <div className="w-full mx-auto py-8">
      <div className='py-16'>
        <h1 className="font-display text-2xl leading-tight mb-8 text-center">
          Ideas, concepts, experiments
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
        {data.content.map((item) => {
          if (item._type === 'sketchImage') {
            return (
              <div
                key={item._key}
                className={`
                  ${item.size === 'large' ? 'col-span-1 md:col-span-4 lg:col-span-4' :
                    item.size === 'medium' ? 'col-span-1 md:col-span-3 lg:col-span-3' :
                      'col-span-1 md:col-span-2'}
                `}
              >
                <SketchImage
                  image={item.image}
                  caption={item.caption}
                  alt={item.caption || 'Sketch image'}
                />
              </div>
            )
          }

          if (item._type === 'sketchVideo') {
            return (
              <div
                key={item._key}
                className={`
                  ${item.size === 'large' ? 'col-span-1 md:col-span-4 lg:col-span-4' :
                    item.size === 'medium' ? 'col-span-1 md:col-span-3 lg:col-span-3' :
                      'col-span-1 md:col-span-2'}
                `}
              >
                <SketchVideo
                  video={item.video}
                  caption={item.caption}
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}