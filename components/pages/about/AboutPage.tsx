import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'
import { Flower } from 'lucide-react'

import AboutImageBox from '@/components/shared/AboutImageBox'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { AboutPayload } from '@/types'

export interface AboutPageProps {
  data: AboutPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function AboutPage({ data }: AboutPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, overview, sections, aboutImage, aboutLinks } = data ?? {}

  console.log(sections)

  return (
    <div className="gap-4">
      <div className="w-full md:w-1/2 mx-auto my-12">
        {/* Title */}
        {/* <div>{title && title}</div> */}

        {/* {overview && (
          <div className="mt-2">
            <CustomPortableText value={overview} />
          </div>
        )} */}

        {sections && sections.map((section) => {
          return (
            <div key={section._key} className='flex flex-col md:flex-row items-start mb-1 last:mb-0 transition-colors'>
              <div className='text-xxs uppercase font-mono w-1/3 flex items-center leading-none gap-2 text-secondary'>
                <div className='h-2 w-2 bg-secondary'></div>
                <span>{section.heading}</span>
              </div>
              <div className='w-2/3 text-pretty mb-12'>
                {/* <div className='text-xxs uppercase font-mono w-1/3 flex items-center leading-none gap-2 text-secondary mb-4'>
                  <div className='h-2 w-2 bg-secondary'></div>
                  <span>{section.heading}</span>
                </div> */}
                <CustomPortableText value={section.content} />
              </div>
            </div>
          )
        })}

        {/* Links */}
        {/* <div className="mt-10 flex flex-col">
          {aboutLinks &&
            aboutLinks.map((aboutLink, key) => {
              return (
                <div key={key} className="flex flex-wrap">
                  <Link
                    target="_blank"
                    className={`flex flex-wrap text-secondary underline`}
                    href={aboutLink.url!}
                  >
                    {aboutLink.title}
                  </Link>
                </div>
              )
            })}
        </div> */}
      </div>

      <div className="w-full">
        {/* About image */}
        {aboutImage && (
          <AboutImageBox
            image={aboutImage}
            alt={`About image`}
            classesWrapper="relative"
          />
        )}
      </div>
    </div>
  )
}

export default AboutPage
