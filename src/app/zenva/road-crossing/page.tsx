/**
 * Simple Full Screen Example
 */

import dynamic from 'next/dynamic'

// This fixes "Error: HTMLVideoElement is not defined"
const HelloGame = dynamic(() => import('./config'), {
  ssr: false,
})

export default function HelloPage() {
  return (
    <div className="container">
      <main>
        <HelloGame />
      </main>
    </div>
  )
}
