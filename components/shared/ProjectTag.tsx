export function ProjectTag(props) {
  const { title, color } = props

  return (
    <div className="text-primary self-start px-1.5 py-1 leading-none rounded-sm text-xxs font-mono uppercase"
      style={{
        backgroundColor: color ? 'hsl(var(--secondary-foreground))' : 'hsl(var(--secondary-foreground))',
        // boxShadow: color ? `0px 0px 4px 4px ${color.hex}` : ''
      }}
    >
      {title}
    </div>
  )
} 