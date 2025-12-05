'use client'

import dynamic from 'next/dynamic'

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
