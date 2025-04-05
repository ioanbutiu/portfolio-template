'use client'

import { useEffect, useState } from 'react'
import React from 'react'
import MuxPlayer from '@mux/mux-player-react';
import { cn } from '@/lib/utils';

interface SketchVideoProps {
  video?: { asset?: any }
  caption?: string
}

export default function SketchVideo({ video, caption }: SketchVideoProps) {
  const [isClient, setIsClient] = useState(false)
  const playerRef = React.useRef<any>(null)

  // Apply loop attribute directly to the DOM element after mounting
  useEffect(() => {
    if (isClient && playerRef.current) {
      // Wait for component to be fully mounted
      const timer = setTimeout(() => {
        // Find the underlying mux-player element
        const playerEl = playerRef.current
        if (playerEl && !playerEl.hasAttribute('loop')) {
          console.log('Adding loop attribute directly to player element')
          playerEl.setAttribute('loop', '')
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isClient])

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get the video URL from the Mux asset
  const videoAsset = video?.asset || {}

  // Get the aspect ratio of the video
  // Calculate aspect ratio from the format string (e.g., "2:1")
  const aspectRatio = React.useMemo(() => {
    const aspectRatioStr = videoAsset?.data?.aspect_ratio || "16:9"
    const [width, height] = aspectRatioStr.split(':').map(Number)
    return width / height
  }, [videoAsset])

  return (
    <div className="w-full h-full">
      <div
        className="w-full h-auto overflow-hidden rounded-sm bg-red-300"
        style={{ aspectRatio: aspectRatio }}
      >
        {isClient && videoAsset ? (
          <MuxPlayer
            ref={playerRef}
            autoPlay='any'
            loop
            muted
            playbackId={videoAsset.playbackId}
            metadata={{
              video_id: videoAsset._id,
              video_title: caption,
            }}
            nohotkeys
            defaultShowRemainingTime={false}
            style={{
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              ['--controls' as string]: 'none',
              ['--media-background-color' as string]: 'transparent',
              ['--media-object-fit' as string]: 'cover',
              ['--media-webkit-appearance' as string]: 'none',
              ['--media-webkit-box-shadow' as string]: 'none',
              ['--media-webkit-border' as string]: 'none',
              ['--webkit-appearance' as string]: 'none',
              ['--webkit-box-shadow' as string]: 'none',
              ['--webkit-border' as string]: 'none',
              boxShadow: 'none',
              border: 'none',
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 animate-pulse" />
        )}
      </div>
      {caption && (
        <div className="mt-2 text-xxs uppercase font-mono text-secondary">{caption}</div>
      )}
    </div>
  )
}