import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import {
  getHomePageTitle,
  loadAllProjects,
  loadHomePage,
  loadSettings,
} from '@/sanity/loader/loadQuery'

import NavbarLayout from './NavbarLayout'
const NavbarPreview = dynamic(() => import('./NavbarPreview'))

export async function Navbar() {
  const initial = await loadSettings()
  const title = await getHomePageTitle()
  const customLogo = await loadHomePage()
  const allProjects = await loadAllProjects()

  if (draftMode().isEnabled) {
    return (
      <NavbarPreview
        initial={initial}
        title={title.data}
        logo={customLogo.data?.customLogo}
        projects={allProjects.data}
      />
    )
  }

  return (
    <NavbarLayout
      data={initial.data}
      title={title.data}
      logo={customLogo.data?.customLogo}
      projects={allProjects.data}
    />
  )
}
