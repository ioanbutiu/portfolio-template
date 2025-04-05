import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { SketchesPage } from '@/components/pages/sketches/SketchesPage'
import { studioUrl } from '@/sanity/lib/api'
import { getSketchesPage } from '@/sanity/loader/loadQuery'

const SketchesPagePreview = dynamic(
  () => import('@/components/pages/sketches/SketchesPagePreview'),
)

export default async function SketchesRoute() {
  const initial = await getSketchesPage()

  if (draftMode().isEnabled) {
    return <SketchesPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center p-8">
        Congrats! You can now go to your Studio and{' '}
        <Link href={`${studioUrl}/structure/sketches`} className="underline">
          start adding sketches content
        </Link>
        !
      </div>
    )
  }

  return <SketchesPage data={initial.data} />
}