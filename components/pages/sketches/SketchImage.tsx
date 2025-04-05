import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'

interface SketchImageProps {
  image?: { asset?: any; lqip?: any }
  alt?: string
  caption?: string
}

export default function SketchImage({
  image,
  alt = 'Sketch image',
  caption,
}: SketchImageProps) {
  const imageUrl = image && urlForImage(image)?.url()

  return (
    <div className="w-full h-full">
      <div className="w-full overflow-hidden rounded-sm">
        {imageUrl && (
          <Image
            alt={alt}
            sizes="(min-width: 940px) 50vw, 100vw"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
            width={1200}
            height={800}
            src={imageUrl}
            placeholder="blur"
            blurDataURL={image?.lqip || ''}
          />
        )}
      </div>
      {caption && (
        <div className="mt-2 text-xxs font-mono uppercase text-secondary">{caption}</div>
      )}
    </div>
  )
}