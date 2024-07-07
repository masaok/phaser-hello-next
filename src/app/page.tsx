import dynamic from 'next/dynamic'

// import PhaserGame from "@/games/PhaserGame";
const PhaserGame = dynamic(() => import('../games/PhaserGame'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>React Phaser Fiber Example</h1>
      </header>
      <main>
        <PhaserGame />
      </main>
    </div>
  )
}
