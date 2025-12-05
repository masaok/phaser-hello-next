'use client'

import Link from 'next/link'

const demos = [
  {
    id: 'minimap',
    title: 'Minimap Demo',
    description: 'Champion walking around a large map with a minimap in the bottom-right corner.',
    status: 'ready',
  },
  {
    id: 'fog-of-war',
    title: 'Fog of War',
    description: 'Vision system with fog covering unexplored areas.',
    status: 'coming-soon',
  },
  {
    id: 'pathfinding',
    title: 'Pathfinding',
    description: 'A* pathfinding around obstacles and terrain.',
    status: 'coming-soon',
  },
  {
    id: 'abilities',
    title: 'Ability System',
    description: 'Cooldowns, mana costs, and ability effects.',
    status: 'coming-soon',
  },
]

export default function LeagueDemosPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            League Demos
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
          >
            Back Home
          </Link>
        </div>

        <p className="text-gray-400 mb-8">
          Proof-of-concept demos showcasing various League of Legends-style game mechanics.
        </p>

        <div className="grid gap-4">
          {demos.map((demo) => (
            <div
              key={demo.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {demo.title}
                  </h2>
                  <p className="text-gray-400">{demo.description}</p>
                </div>
                {demo.status === 'ready' ? (
                  <Link
                    href={`/league-demos/${demo.id}`}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Try Demo
                  </Link>
                ) : (
                  <span className="px-6 py-3 bg-gray-600 text-gray-400 font-bold rounded-lg whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
