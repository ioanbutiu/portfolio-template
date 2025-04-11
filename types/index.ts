import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface MenuItem {
  page?: {
    _type: string
    slug?: string
    title?: string
  }
  link?: {
    _type: string
    url?: string
    title?: string
  }
}

export interface PageItem {
  _type: string
  slug?: string
  title?: string
}

export interface LinkItem {
  _type: string
  url?: string
  title?: string
}

export interface Tag {
  _id: string
  title: string
  color: {
    hex: string
  }
}

export interface ShowcaseProject {
  _id: string
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: Tag[]
  title?: string
  year?: string
  _updatedAt?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: any
  showcaseProjects?: ShowcaseProject[]
  title?: string
  customLogo?: Image
  _updatedAt?: string
}

export interface ProjectPayload {
  year?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  details?: {
    _key: string
    role: string
    name: string
  }[]
  site?: {
    urltitle?: string
    url: string
  }
  slug: string
  tags?: Tag[]
  title?: string
  content?: Content[]
}

export interface Content {
  _type: string
  _key: string
  photo: object[]
  photoOne: object[]
  photoTwo: object[]
  textBlock: object[]
  videoLink: object[]
}

export interface SettingsPayload {
  menuItems?: {
    page?: PageItem[]
    link?: LinkItem[]
  }
  footerLinks?: LinkItem[]
  ogImage?: Image
  favIcon?: Image
  title?: string
  bgColor: {
    r?: string
    g?: string
    b?: string
  }
  textColor: {
    r?: string
    g?: string
    b?: string
  }
  displayLastUpdated: boolean
}

export interface AboutPayload {
  overview?: PortableTextBlock[]
  title?: string
  sections?: {
    _key: string
    heading: string
    content: any
  }[]
  aboutImage?: {
    asset: Image
    width: number
    height: number
  }
  aboutLinks?: LinkItem[]
}

export interface SketchContent {
  _type: string
  _key: string
  image?: {
    asset?: any
    lqip?: string
  }
  video?: {
    asset?: any
  }
  caption?: string
  size?: string
}

export interface SketchesPayload {
  _id: string
  title?: string
  content?: SketchContent[]
}
