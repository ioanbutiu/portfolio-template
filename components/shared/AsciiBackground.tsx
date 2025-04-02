// @ts-nocheck

'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

function AsciiRenderer() {
  const domRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const [fontFamily, setFontFamily] = useState('ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace')

  useEffect(() => {
    // Wait for window to be defined (client-side only)
    if (typeof window === 'undefined' || !domRef.current) return

    // Get the parent element dimensions
    const parentRect = domRef.current.getBoundingClientRect()
    const width = parentRect.width || window.innerWidth
    const height = parentRect.height || window.innerHeight

    console.log(width, height)

    // Setup scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.background.alpha = 0 // Transparent background
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: false
    })
    renderer.setClearColor(0x000000, 0) // Transparent background
    renderer.autoClear = true
    renderer.setSize(width, height)
    domRef.current.appendChild(renderer.domElement)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Create ASCII container
    const asciiContainer = document.createElement('pre')
    asciiContainer.style.position = 'fixed'
    asciiContainer.style.top = '0'
    asciiContainer.style.left = '0'
    asciiContainer.style.width = '100%'
    asciiContainer.style.height = '100%'
    asciiContainer.style.margin = '0'
    asciiContainer.style.padding = '0'
    asciiContainer.style.overflow = 'visible'
    asciiContainer.style.color = 'var(--foreground)'
    asciiContainer.style.backgroundColor = 'transparent'
    asciiContainer.style.fontSize = '7px'
    asciiContainer.style.lineHeight = '0.5em'
    asciiContainer.style.fontFamily = fontFamily
    asciiContainer.style.whiteSpace = 'pre'
    asciiContainer.style.zIndex = '-20'
    asciiContainer.style.pointerEvents = 'none'
    asciiContainer.style.opacity = '0.6'
    asciiContainer.style.letterSpacing = '-0.2em'
    // asciiContainer.style.backgroundColor = 'red'

    // Create an ASCII representation
    let asciiWidth = Math.floor(width / 2)
    let asciiHeight = Math.floor(height / 2)

    // Replace renderer with ASCII container
    if (domRef.current) {
      domRef.current.innerHTML = ''
      domRef.current.appendChild(asciiContainer)
    }

    // Load plant.obj
    const loadModel = async () => {
      try {
        // Dynamically import OBJLoader to avoid TypeScript issues
        const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader')

        const loader = new OBJLoader()
        loader.load('/plant.obj', (obj) => {
          // Center and scale the model
          const box = new THREE.Box3().setFromObject(obj)
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())

          const maxDim = Math.max(size.x, size.y, size.z)
          const scale = 30 / maxDim

          obj.position.x = -center.x * scale
          obj.position.y = -center.y * scale
          obj.position.z = -center.z * scale
          obj.scale.set(scale, scale, scale)

          // Apply material
          obj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x888888,
                roughness: 0.8,
                metalness: 0.2
              })
            }
          })

          // Add to scene and store reference
          scene.add(obj)
          modelRef.current = obj
        },
          // Progress callback
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
          },
          // Error callback
          (error) => {
            console.error('Error loading model:', error)

            // Create fallback geometry if loading fails
            const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
            const material = new THREE.MeshStandardMaterial({ color: 0x888888 })
            const fallbackModel = new THREE.Mesh(geometry, material)
            scene.add(fallbackModel)
            modelRef.current = fallbackModel
          })
      } catch (error) {
        console.error('Error importing OBJLoader:', error)

        // Create fallback cube if import fails
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshStandardMaterial({ color: 0x888888 })
        const fallbackCube = new THREE.Mesh(geometry, material)
        scene.add(fallbackCube)
        modelRef.current = fallbackCube
      }
    }

    loadModel()

    // Characters ordered by brightness - using more distinct characters
    const characters = ' .,:;+*&#%@'

    // Create an offscreen canvas for rendering
    const offscreenCanvas = document.createElement('canvas')
    offscreenCanvas.width = asciiWidth
    offscreenCanvas.height = asciiHeight
    const context = offscreenCanvas.getContext('2d')

    if (!context) {
      console.error('Could not get canvas context')
      return
    }

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate)

      // Rotate the model
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.001  // Moderate rotation speed
        // modelRef.current.rotation.x += 0.003 // Added slight x rotation for more dynamic effect
      }

      // Clear the scene
      renderer.clear()

      // Render the scene
      renderer.render(scene, camera)

      // Clear the offscreen canvas to prevent streaking
      context.clearRect(0, 0, asciiWidth, asciiHeight)

      // Draw renderer output to offscreen canvas
      context.drawImage(
        renderer.domElement,
        0, 0, renderer.domElement.width, renderer.domElement.height,
        0, 0, asciiWidth, asciiHeight
      )

      // Get image data
      const imageData = context.getImageData(0, 0, asciiWidth, asciiHeight)
      const pixels = imageData.data

      // Convert to ASCII
      let output = ''
      for (let y = 0; y < asciiHeight; y++) {
        for (let x = 0; x < asciiWidth; x++) {
          const pixelIndex = (y * asciiWidth + x) * 4

          // Get the RGB values of the pixel
          const r = pixels[pixelIndex]
          const g = pixels[pixelIndex + 1]
          const b = pixels[pixelIndex + 2]

          // Calculate brightness (0-1)
          const brightness = (0.3 * r + 0.59 * g + 0.11 * b) / 255

          // Map brightness to character
          const charIndex = Math.floor(brightness * (characters.length - 1))
          output += characters[charIndex]
        }
        output += '\n'
      }

      // Update ASCII container
      asciiContainer.textContent = output
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!domRef.current) return

      const parentRect = domRef.current.getBoundingClientRect()
      const width = parentRect.width || window.innerWidth
      const height = parentRect.height || window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)

      // Update ASCII dimensions
      asciiWidth = Math.floor(width / 2)
      asciiHeight = Math.floor(height / 2)

      // Update offscreen canvas
      offscreenCanvas.width = asciiWidth
      offscreenCanvas.height = asciiHeight
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (domRef.current) {
        domRef.current.innerHTML = ''
      }
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [fontFamily])

  return <div ref={domRef} className="absolute top-0 left-0 w-full h-full -z-20" />
}

export function AsciiBackground() {
  return <AsciiRenderer />
}