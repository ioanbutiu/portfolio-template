'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */

import { colorInput } from '@sanity/color-input'
import { visionTool } from '@sanity/vision'
import { defineConfig, NavbarProps, useWorkspace } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { Logo } from '@/sanity/plugins/Logo'
import * as resolve from '@/sanity/plugins/resolve'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import project from '@/sanity/schemas/documents/project'
import tag from '@/sanity/schemas/documents/tag'
import about from '@/sanity/schemas/singletons/about'
import sketches from '@/sanity/schemas/singletons/sketches'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import { muxInput } from 'sanity-plugin-mux-input'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'ioan.website'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  // icon: Logo,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      about,
      settings,
      sketches,
      // Documents
      project,
      tag,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings, about, sketches]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name, about.name, sketches.name]),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    // visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
    media(),
    // Unsplash image asset source
    unsplashImageAsset(),
    // Mux video input
    muxInput(),
  ],
})
