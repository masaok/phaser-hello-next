/**
 * Simple Full Screen Example
 */

import dynamic from 'next/dynamic'
// import HelloGame from '@/games/HelloGame'

const HelloGame = dynamic(() => import('../../games/HelloGame'), {
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
