'use client'

/**
 * Simple Full Screen Example
 */

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// This fixes "Error: HTMLVideoElement is not defined"
const Game = dynamic(() => import('./SpaceBarGame'), {
  ssr: false,
})

export default function HelloPage() {
  useEffect(() => {
    function handleResize() {
      // Reload the page
      window.location.reload()
    }

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="container">
      <main>
        <Game />
      </main>
    </div>
  )
}
