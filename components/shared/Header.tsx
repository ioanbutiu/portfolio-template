import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface HeaderProps {
  description?: any
}
export function Header(props: HeaderProps) {
  const { description } = props
  if (!description) {
    return null
  }
  return (
    <div className="w-full flex gap-4 mb-0 sticky top-16 -z-10 pt-48 pb-48 justify-center">
      {/* <div className="col-span-1 lg:col-span-3"></div> */}
      {description && (
        <div className="col-span-12 text-center text-pretty text-4xl leading-snug max-w-[50ch] font-sans w-full">
          {description.displayText == true && (
            <CustomPortableText value={description.text} />
          )}
        </div>
      )}
    </div>
  )
}
