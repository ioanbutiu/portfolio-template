import ImageBox from '@/components/shared/ImageBox'
import { ProjectTag } from '@/components/shared/ProjectTag'
import type { ShowcaseProject } from '@/types'

interface ProjectProps {
  project: ShowcaseProject
}

export function ProjectListItem(props: ProjectProps) {
  const { project } = props

  return (
    <div className={`flex flex-col gap-y-0 break-inside-avoid mb-4 group`}>
      <div className="w-full overflow-hidden rounded-sm">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative group-hover:scale-[104%] transition-all duration-400 aspect-[3/2]"
        />
      </div>
      <div className="flex group-hover:opacity-70 transition-opacity duration-400">
        <TextBox project={project} />
      </div>
    </div>
  )
}

function TextBox({ project }: { project: ShowcaseProject }) {
  return (
    <div className="flex flex-col justify-between mt-4 mb-4 gap-2 w-full items-start">
      {/* Title */}
      <div className="flex text-2xl">{project.title}</div>
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
