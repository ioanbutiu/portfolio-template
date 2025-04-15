'use client'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { urlForImage } from '@/sanity/lib/utils'

interface ImageBoxProps {
  image?: { asset?: any; lqip?: any; dimensions?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
  caption?: string
  previewImageUrl?: any
  'data-sanity'?: string
  dimensions?: any

}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = image?.dimensions?.width || 1000,
  height = image?.dimensions?.height || 500,
  size = '(min-width: 1200px) 50vw, (min-width: 768px) 50vw, 100vw',
  classesWrapper,
  previewImageUrl = image?.lqip,
  dimensions = image?.dimensions,
  ...props
}: ImageBoxProps) {
  const imageUrl =
    image && urlForImage(image)?.width(width).height(height).quality(80).url()
  //image && urlForImage(image)?.height(height).width(width).fit('max').url()

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })


  //console.log('dimensions', dimensions)

  return (
    <div
      className={`w-full h-auto overflow-hidden ${classesWrapper}`}
      data-sanity={props['data-sanity']}
    >
      {imageUrl && (
        // <Image
        //   className="absolute w-full h-full"
        //   ref={ref}
        //   style={{
        //     opacity: inView ? 1 : 0,
        //     transition: 'opacity 0.3s linear',
        //     objectFit: 'cover',
        //     width: '100%',
        //     height: 'auto',
        //   }}
        //   alt={alt}
        //   width={width}
        //   height={height}
        //   sizes={size}
        //   src={imageUrl}
        // />
        <Image
          className="absolute w-full h-full object-cover"
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.3s linear',
            //objectFit: 'cover',
            //width: '100%',
            //height: 'auto',
          }}
          alt={alt}
          width={width}
          height={height}
          //fill
          sizes={size}
          src={imageUrl}
        />
      )}
      <div className={`w-full overflow-hidden h-auto`}>
        {/* <Image
          width={width}
          height={height}
          src={previewImageUrl}
          style={{
            height: '100%',
          }}
          alt=""
          role="presentation"
        /> */
          <Image
            className=''
            width={width}
            height={height}
            src={previewImageUrl}
            //fill
            style={{
              height: 'auto',
              width: '100%',
              aspectRatio: dimensions?.aspectRatio || '3/2'
            }}
            alt=""
            role="presentation"
          />}
      </div>
    </div>
  )
}
