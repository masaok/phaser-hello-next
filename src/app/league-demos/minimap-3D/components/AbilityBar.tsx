'use client'

import { AbilityState } from './AbilitySystem'

interface AbilityBarProps {
  abilityState: AbilityState
}

export default function AbilityBar({ abilityState }: AbilityBarProps) {
  const abilities = [
    { ...abilityState.q, isToggle: true, active: abilityState.usingRockets },
    abilityState.w,
    abilityState.e,
    abilityState.r,
  ]

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      {/* Health and Mana bars */}
      <div className="flex gap-2 mb-2">
        {/* Health bar */}
        <div className="w-48 h-5 bg-gray-800 rounded border border-gray-600 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all"
            style={{ width: `${(abilityState.health / abilityState.maxHealth) * 100}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold" style={{ lineHeight: '20px', marginTop: '-20px' }}>
            {Math.floor(abilityState.health)} / {abilityState.maxHealth}
          </div>
        </div>

        {/* Mana bar */}
        <div className="w-48 h-5 bg-gray-800 rounded border border-gray-600 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all"
            style={{ width: `${(abilityState.mana / abilityState.maxMana) * 100}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
            {Math.floor(abilityState.mana)} / {abilityState.maxMana}
          </div>
        </div>
      </div>

      {/* Ability buttons */}
      <div className="flex gap-2">
        {abilities.map((ability, index) => {
          const isOnCooldown = ability.currentCooldown > 0
          const cooldownPercent = isOnCooldown
            ? (ability.currentCooldown / ability.cooldown) * 100
            : 0
          const canAfford = abilityState.mana >= ability.manaCost
          const isActive = 'active' in ability && ability.active

          return (
            <div
              key={ability.key}
              className="relative group"
            >
              {/* Ability button */}
              <div
                className={`
                  w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center
                  transition-all cursor-pointer
                  ${isOnCooldown
                    ? 'border-gray-600 bg-gray-800'
                    : canAfford
                      ? 'border-yellow-500 bg-gray-700 hover:bg-gray-600 hover:border-yellow-400'
                      : 'border-blue-800 bg-gray-800'
                  }
                  ${isActive ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-gray-900' : ''}
                `}
              >
                {/* Cooldown overlay */}
                {isOnCooldown && (
                  <div
                    className="absolute inset-0 bg-black/70 rounded-lg"
                    style={{
                      clipPath: `polygon(0 ${100 - cooldownPercent}%, 100% ${100 - cooldownPercent}%, 100% 100%, 0 100%)`,
                    }}
                  />
                )}

                {/* Key */}
                <span className="text-xl font-bold text-white z-10">{ability.key}</span>

                {/* Cooldown text */}
                {isOnCooldown && (
                  <span className="text-sm font-bold text-white z-10">
                    {ability.currentCooldown.toFixed(1)}
                  </span>
                )}

                {/* Mana cost indicator */}
                {!isOnCooldown && ability.manaCost > 0 && (
                  <span className={`text-xs z-10 ${canAfford ? 'text-blue-400' : 'text-red-400'}`}>
                    {ability.manaCost}
                  </span>
                )}

                {/* Toggle indicator for Q */}
                {'isToggle' in ability && ability.isToggle && (
                  <span className="absolute -top-1 -right-1 text-xs bg-pink-600 px-1 rounded">
                    {isActive ? '🚀' : '🔫'}
                  </span>
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-gray-900 border border-gray-600 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <div className="text-yellow-400 font-bold text-sm">{ability.name}</div>
                <div className="text-gray-300 text-xs mt-1">{ability.description}</div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-gray-400">CD: {ability.cooldown}s</span>
                  {ability.manaCost > 0 && (
                    <span className="text-blue-400">Mana: {ability.manaCost}</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Weapon indicator */}
      <div className="text-sm text-gray-400 mt-1">
        {abilityState.usingRockets ? (
          <span className="text-pink-400">🚀 Fishbones (Rockets) - AoE, costs mana</span>
        ) : (
          <span className="text-cyan-400">🔫 Pow-Pow (Minigun) - Fast attacks</span>
        )}
      </div>

      {/* Controls hint */}
      <div className="text-xs text-gray-500 mt-1">
        Press Q/W/E/R to cast • Right-click to move
      </div>
    </div>
  )
}
