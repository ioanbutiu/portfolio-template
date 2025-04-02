# Commands
- Build: `npm run build` - Build for production
- Dev: `npm run dev` - Start development server
- Lint: `npm run lint` - Run ESLint
- Lint & Fix: `npm run lint:fix` - Format with Prettier and fix ESLint issues
- Format: `npm run format` - Format code with Prettier
- Type Check: `npm run type-check` - Run TypeScript type checking

# Code Style
- TypeScript with strictNullChecks enabled
- No semicolons, single quotes (Prettier config)
- ESLint with Next.js config and simple-import-sort plugin
- Tailwind CSS for styling

# Conventions
- Function components with explicit TypeScript interfaces
- PascalCase for components/interfaces, camelCase for variables/functions
- Props interfaces named with "Props" suffix
- Import order: React/Next.js → external → types → local components
- Destructure props at top of component
- Use optional chaining (?.) for nullable properties
- Conditional rendering with && or ternary operators
- Export named components, default exports at end of file