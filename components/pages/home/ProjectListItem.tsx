import ImageBox from '@/components/shared/ImageBox'
import { ProjectTag } from '@/components/shared/ProjectTag'
import type { ShowcaseProject } from '@/types'

interface ProjectProps {
  project: ShowcaseProject
}

export function ProjectListItem(props: ProjectProps) {
  const { project } = props

  return (
    <div className={`flex flex-col gap-y-0 break-inside-avoid mb-4`}>
      <div className="w-full">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative"
        />
      </div>
      <div className="flex">
        <TextBox project={project} />
      </div>
    </div>
  )
}

function TextBox({ project }: { project: ShowcaseProject }) {
  return (
    <div className="flex justify-between mt-2 mb-2 w-full items-start">
      {/* Title */}
      <div className="flex text-xl">{project.title}</div>
      <div className='flex gap-1'>


        {/* Tags */}
        {project.tags && project.tags.map((tag) => {
          return <ProjectTag key={tag._id} {...tag} />
        })}
        {/* Year */}
        {/* <ProjectTag {...project.year}/> */}
      </div>
    </div>
  )
}
