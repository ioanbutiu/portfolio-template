'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'
import { useParams } from 'next/navigation'

import { sketchesQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { SketchesPayload } from '@/types'

import { SketchesPage } from './SketchesPage'

type Props = {
  initial: QueryResponseInitial<SketchesPayload | null>
}

export default function SketchesPagePreview({ initial }: Props) {
  const params = useParams() || {}
  const { data } = useQuery<SketchesPayload | null>(sketchesQuery, params, { initial })

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Sketches document to see the preview!
      </div>
    )
  }

  return <SketchesPage data={data} />
}