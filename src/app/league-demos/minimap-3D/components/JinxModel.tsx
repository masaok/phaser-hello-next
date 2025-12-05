'use client'

import * as THREE from 'three'

interface JinxModelProps {
  usingRockets: boolean
}

// High-poly Jinx model - improved to match reference images
export default function JinxModel({ usingRockets }: JinxModelProps) {
  return (
    <group>
      {/* ============================================ */}
      {/* ================= HEAD ==================== */}
      {/* ============================================ */}

      {/* Head base - sculpted shape matching ref */}
      <mesh position={[0, 1.08, 0]} castShadow>
        <sphereGeometry args={[0.24, 64, 64]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Skull back - elongated for hair volume */}
      <mesh position={[0, 1.12, -0.1]} castShadow>
        <sphereGeometry args={[0.22, 48, 48]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Forehead - prominent, slightly angular */}
      <mesh position={[0, 1.18, 0.1]} castShadow>
        <sphereGeometry args={[0.18, 48, 48]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Face front - narrower, more angular */}
      <mesh position={[0, 1.02, 0.14]} castShadow>
        <sphereGeometry args={[0.2, 48, 48]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Cheekbones - high and pronounced */}
      <mesh position={[-0.13, 1.0, 0.12]} castShadow>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial color="#f2d2c5" />
      </mesh>
      <mesh position={[0.13, 1.0, 0.12]} castShadow>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial color="#f2d2c5" />
      </mesh>

      {/* Temple depressions */}
      <mesh position={[-0.18, 1.06, 0.02]} castShadow>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>
      <mesh position={[0.18, 1.06, 0.02]} castShadow>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* Jaw - narrow and angular (Jinx's signature look) */}
      <mesh position={[0, 0.9, 0.1]} castShadow>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>
      <mesh position={[-0.09, 0.9, 0.06]} castShadow>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>
      <mesh position={[0.09, 0.9, 0.06]} castShadow>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* Chin - very pointed and small (Jinx characteristic) */}
      <mesh position={[0, 0.82, 0.14]} castShadow>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>
      <mesh position={[0, 0.78, 0.12]} castShadow>
        <sphereGeometry args={[0.04, 20, 20]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>
      <mesh position={[0, 0.75, 0.1]} castShadow>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* ============================================ */}
      {/* ================= EYES ==================== */}
      {/* ============================================ */}

      {/* Pink eye shadow/makeup - matching reference - LARGER and more visible */}
      <mesh position={[-0.09, 1.04, 0.2]} castShadow>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color="#d88090" />
      </mesh>
      <mesh position={[0.09, 1.04, 0.2]} castShadow>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color="#d88090" />
      </mesh>

      {/* Eye shadow outer - darker pink border */}
      <mesh position={[-0.12, 1.05, 0.18]} castShadow>
        <sphereGeometry args={[0.05, 24, 24]} />
        <meshStandardMaterial color="#a05060" />
      </mesh>
      <mesh position={[0.12, 1.05, 0.18]} castShadow>
        <sphereGeometry args={[0.05, 24, 24]} />
        <meshStandardMaterial color="#a05060" />
      </mesh>

      {/* Eyeballs - LARGE crazy eyes - matching reference */}
      <mesh position={[-0.09, 1.04, 0.24]} castShadow>
        <sphereGeometry args={[0.065, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.09, 1.04, 0.24]} castShadow>
        <sphereGeometry args={[0.065, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Irises - LARGE bright pink/magenta - very visible */}
      <mesh position={[-0.09, 1.04, 0.295]} castShadow>
        <sphereGeometry args={[0.048, 32, 32]} />
        <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.09, 1.04, 0.295]} castShadow>
        <sphereGeometry args={[0.048, 32, 32]} />
        <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.6} />
      </mesh>

      {/* Iris detail rings - darker pink */}
      <mesh position={[-0.09, 1.04, 0.3]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.038, 0.008, 12, 24]} />
        <meshStandardMaterial color="#b01060" />
      </mesh>
      <mesh position={[0.09, 1.04, 0.3]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.038, 0.008, 12, 24]} />
        <meshStandardMaterial color="#b01060" />
      </mesh>

      {/* Pupils - bright glowing center */}
      <mesh position={[-0.09, 1.04, 0.32]} castShadow>
        <sphereGeometry args={[0.025, 24, 24]} />
        <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.09, 1.04, 0.32]} castShadow>
        <sphereGeometry args={[0.025, 24, 24]} />
        <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={1.5} />
      </mesh>

      {/* Eye highlights - LARGER for sparkle */}
      <mesh position={[-0.08, 1.06, 0.31]} castShadow>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.0} />
      </mesh>
      <mesh position={[0.1, 1.06, 0.31]} castShadow>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.0} />
      </mesh>
      <mesh position={[-0.1, 1.025, 0.305]} castShadow>
        <sphereGeometry args={[0.01, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.08, 1.025, 0.305]} castShadow>
        <sphereGeometry args={[0.01, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>

      {/* Eyelids - upper - skin colored */}
      <mesh position={[-0.09, 1.08, 0.23]} rotation={[0.6, 0, 0]} castShadow>
        <capsuleGeometry args={[0.035, 0.055, 12, 20]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>
      <mesh position={[0.09, 1.08, 0.23]} rotation={[0.6, 0, 0]} castShadow>
        <capsuleGeometry args={[0.035, 0.055, 12, 20]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Heavy eyeliner - thick black lines - MORE VISIBLE */}
      {[-0.09, 0.09].map((x, idx) => (
        <group key={`eyelash-group-${idx}`}>
          {/* Main eyeliner - thick black band */}
          <mesh position={[x, 1.085, 0.26]} rotation={[0.5, 0, 0]} castShadow>
            <capsuleGeometry args={[0.015, 0.07, 10, 20]} />
            <meshStandardMaterial color="#101010" />
          </mesh>
          {/* Wing eyeliner extending outward */}
          <mesh position={[x + (x < 0 ? -0.045 : 0.045), 1.075, 0.24]} rotation={[0.35, 0, x < 0 ? 0.5 : -0.5]} castShadow>
            <capsuleGeometry args={[0.012, 0.035, 8, 16]} />
            <meshStandardMaterial color="#101010" />
          </mesh>
          {/* Lower lash line */}
          <mesh position={[x, 1.01, 0.26]} rotation={[0.25, 0, 0]} castShadow>
            <capsuleGeometry args={[0.008, 0.05, 8, 16]} />
            <meshStandardMaterial color="#1a1010" />
          </mesh>
          {/* Individual lashes - longer and more dramatic */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <mesh key={`lash-${idx}-${i}`} position={[x + (i - 4.5) * 0.011, 1.092, 0.265]} rotation={[0.4 + i * 0.03, 0, (i - 4.5) * 0.1 * (x < 0 ? 1 : -1)]} castShadow>
              <cylinderGeometry args={[0.003, 0.001, 0.04, 8]} />
              <meshStandardMaterial color="#101010" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Eyebrows - cyan/teal, arched and expressive - THICKER */}
      <mesh position={[-0.1, 1.15, 0.18]} rotation={[0.25, 0, 0.4]} castShadow>
        <capsuleGeometry args={[0.022, 0.08, 12, 24]} />
        <meshStandardMaterial color="#00a0c0" />
      </mesh>
      <mesh position={[-0.08, 1.16, 0.2]} rotation={[0.2, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.018, 0.06, 10, 20]} />
        <meshStandardMaterial color="#00c0e0" />
      </mesh>
      <mesh position={[-0.06, 1.155, 0.21]} rotation={[0.15, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.014, 0.04, 8, 16]} />
        <meshStandardMaterial color="#00d8f0" />
      </mesh>
      <mesh position={[0.1, 1.15, 0.18]} rotation={[0.25, 0, -0.4]} castShadow>
        <capsuleGeometry args={[0.022, 0.08, 12, 24]} />
        <meshStandardMaterial color="#00a0c0" />
      </mesh>
      <mesh position={[0.08, 1.16, 0.2]} rotation={[0.2, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.018, 0.06, 10, 20]} />
        <meshStandardMaterial color="#00c0e0" />
      </mesh>
      <mesh position={[0.06, 1.155, 0.21]} rotation={[0.15, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.014, 0.04, 8, 16]} />
        <meshStandardMaterial color="#00d8f0" />
      </mesh>

      {/* ============================================ */}
      {/* ================= NOSE ==================== */}
      {/* ============================================ */}

      {/* Nose bridge - slim and defined */}
      <mesh position={[0, 1.03, 0.2]} rotation={[0.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.014, 0.05, 12, 24]} />
        <meshStandardMaterial color="#e8c5b8" />
      </mesh>
      <mesh position={[0, 0.99, 0.22]} rotation={[0.25, 0, 0]} castShadow>
        <capsuleGeometry args={[0.016, 0.04, 12, 24]} />
        <meshStandardMaterial color="#e8c5b8" />
      </mesh>

      {/* Nose tip - small and upturned */}
      <mesh position={[0, 0.945, 0.26]} castShadow>
        <sphereGeometry args={[0.025, 24, 24]} />
        <meshStandardMaterial color="#eac8b8" />
      </mesh>
      <mesh position={[0, 0.94, 0.265]} castShadow>
        <sphereGeometry args={[0.018, 20, 20]} />
        <meshStandardMaterial color="#e8c5b5" />
      </mesh>

      {/* Nostrils */}
      <mesh position={[-0.016, 0.935, 0.25]} castShadow>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="#d8b5a8" />
      </mesh>
      <mesh position={[0.016, 0.935, 0.25]} castShadow>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshStandardMaterial color="#d8b5a8" />
      </mesh>
      <mesh position={[-0.014, 0.93, 0.255]} castShadow>
        <sphereGeometry args={[0.005, 12, 12]} />
        <meshStandardMaterial color="#a08078" />
      </mesh>
      <mesh position={[0.014, 0.93, 0.255]} castShadow>
        <sphereGeometry args={[0.005, 12, 12]} />
        <meshStandardMaterial color="#a08078" />
      </mesh>

      {/* ============================================ */}
      {/* ================= MOUTH =================== */}
      {/* ============================================ */}

      {/* Wide grinning mouth - Jinx's signature mischievous smile - LARGER */}

      {/* Mouth opening - dark interior - BIGGER */}
      <mesh position={[0, 0.855, 0.22]} castShadow>
        <capsuleGeometry args={[0.035, 0.08, 16, 24]} />
        <meshStandardMaterial color="#301015" />
      </mesh>

      {/* Upper lip - wide smile shape - MORE PROMINENT */}
      <mesh position={[0, 0.88, 0.24]} castShadow>
        <capsuleGeometry args={[0.02, 0.08, 12, 24]} />
        <meshStandardMaterial color="#c06060" />
      </mesh>
      {/* Cupid's bow detail */}
      <mesh position={[-0.02, 0.885, 0.25]} castShadow>
        <sphereGeometry args={[0.016, 16, 16]} />
        <meshStandardMaterial color="#d07070" />
      </mesh>
      <mesh position={[0.02, 0.885, 0.25]} castShadow>
        <sphereGeometry args={[0.016, 16, 16]} />
        <meshStandardMaterial color="#d07070" />
      </mesh>

      {/* Lower lip - pulled back in smile */}
      <mesh position={[0, 0.825, 0.22]} castShadow>
        <capsuleGeometry args={[0.022, 0.07, 12, 24]} />
        <meshStandardMaterial color="#b85858" />
      </mesh>
      <mesh position={[0, 0.82, 0.225]} castShadow>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#c06060" />
      </mesh>

      {/* Smile corners - pulled up for grin - WIDER */}
      <mesh position={[-0.055, 0.865, 0.2]} castShadow>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#c06060" />
      </mesh>
      <mesh position={[0.055, 0.865, 0.2]} castShadow>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#c06060" />
      </mesh>
      {/* Corner creases */}
      <mesh position={[-0.065, 0.87, 0.18]} castShadow>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshStandardMaterial color="#d8b0a8" />
      </mesh>
      <mesh position={[0.065, 0.87, 0.18]} castShadow>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshStandardMaterial color="#d8b0a8" />
      </mesh>

      {/* TEETH - visible in wide grin - LARGER AND MORE VISIBLE */}
      {/* Upper teeth row */}
      {[-0.035, -0.022, -0.008, 0.008, 0.022, 0.035].map((x, i) => (
        <mesh key={`utooth-${i}`} position={[x, 0.865, 0.25]} castShadow>
          <boxGeometry args={[0.012, 0.018, 0.012]} />
          <meshStandardMaterial color="#f8f8f0" />
        </mesh>
      ))}
      {/* Lower teeth row */}
      {[-0.028, -0.012, 0.012, 0.028].map((x, i) => (
        <mesh key={`ltooth-${i}`} position={[x, 0.845, 0.24]} castShadow>
          <boxGeometry args={[0.012, 0.015, 0.01]} />
          <meshStandardMaterial color="#f5f5e8" />
        </mesh>
      ))}

      {/* Tongue hint - visible in open mouth */}
      <mesh position={[0, 0.845, 0.21]} castShadow>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#c04545" />
      </mesh>

      {/* Dimples from smiling - MORE PRONOUNCED */}
      <mesh position={[-0.1, 0.88, 0.16]} castShadow>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial color="#dab5a8" />
      </mesh>
      <mesh position={[0.1, 0.88, 0.16]} castShadow>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial color="#dab5a8" />
      </mesh>

      {/* Nasolabial folds (smile lines) */}
      <mesh position={[-0.08, 0.9, 0.17]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.008, 0.04, 8, 12]} />
        <meshStandardMaterial color="#e0c0b5" />
      </mesh>
      <mesh position={[0.08, 0.9, 0.17]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.008, 0.04, 8, 12]} />
        <meshStandardMaterial color="#e0c0b5" />
      </mesh>

      {/* ============================================ */}
      {/* ================= EARS ==================== */}
      {/* ============================================ */}

      <mesh position={[-0.2, 1.02, -0.02]} rotation={[0, -0.25, 0.1]} castShadow>
        <capsuleGeometry args={[0.022, 0.04, 12, 16]} />
        <meshStandardMaterial color="#f0d0c5" />
      </mesh>
      <mesh position={[0.2, 1.02, -0.02]} rotation={[0, 0.25, -0.1]} castShadow>
        <capsuleGeometry args={[0.022, 0.04, 12, 16]} />
        <meshStandardMaterial color="#f0d0c5" />
      </mesh>

      {/* ============================================ */}
      {/* ================= HAIR ==================== */}
      {/* ============================================ */}

      {/* Main hair volume - teal/cyan color matching reference */}
      <mesh position={[0, 1.26, -0.04]} castShadow>
        <sphereGeometry args={[0.3, 64, 64]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>
      <mesh position={[0, 1.3, 0.02]} castShadow>
        <sphereGeometry args={[0.24, 48, 48]} />
        <meshStandardMaterial color="#00d4e8" />
      </mesh>
      <mesh position={[0, 1.22, -0.12]} castShadow>
        <sphereGeometry args={[0.26, 48, 48]} />
        <meshStandardMaterial color="#00b8cc" />
      </mesh>

      {/* Hair front swoosh - messy bangs */}
      <mesh position={[0, 1.28, 0.14]} castShadow>
        <sphereGeometry args={[0.18, 40, 40]} />
        <meshStandardMaterial color="#00daf0" />
      </mesh>
      <mesh position={[0.06, 1.26, 0.16]} castShadow>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#00e0f8" />
      </mesh>
      <mesh position={[-0.06, 1.27, 0.15]} castShadow>
        <sphereGeometry args={[0.1, 28, 28]} />
        <meshStandardMaterial color="#00d8f0" />
      </mesh>

      {/* Hair spikes/strands on top - more chaotic */}
      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * Math.PI * 2
        const heightVar = (i % 4) * 0.015
        const sizeVar = 0.04 + (i % 3) * 0.01
        return (
          <group key={`spike-group-${i}`}>
            <mesh position={[Math.sin(angle) * 0.18, 1.42 + heightVar, Math.cos(angle) * 0.12 - 0.06]} rotation={[Math.cos(angle) * 0.4, 0, Math.sin(angle) * 0.4]} castShadow>
              <coneGeometry args={[sizeVar, 0.2, 16]} />
              <meshStandardMaterial color="#00c0d4" />
            </mesh>
            <mesh position={[Math.sin(angle + 0.2) * 0.15, 1.38 + heightVar, Math.cos(angle + 0.2) * 0.1 - 0.05]} rotation={[Math.cos(angle) * 0.35, 0, Math.sin(angle) * 0.35]} castShadow>
              <coneGeometry args={[sizeVar * 0.6, 0.12, 12]} />
              <meshStandardMaterial color="#00d4e8" />
            </mesh>
          </group>
        )
      })}

      {/* Hair sides - left */}
      <mesh position={[-0.26, 1.1, -0.02]} castShadow>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>
      <mesh position={[-0.3, 1.0, -0.04]} castShadow>
        <sphereGeometry args={[0.1, 28, 28]} />
        <meshStandardMaterial color="#00c0d4" />
      </mesh>
      <mesh position={[-0.28, 0.9, -0.05]} castShadow>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#00b8cc" />
      </mesh>

      {/* Hair sides - right */}
      <mesh position={[0.26, 1.1, -0.02]} castShadow>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>
      <mesh position={[0.3, 1.0, -0.04]} castShadow>
        <sphereGeometry args={[0.1, 28, 28]} />
        <meshStandardMaterial color="#00c0d4" />
      </mesh>
      <mesh position={[0.28, 0.9, -0.05]} castShadow>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#00b8cc" />
      </mesh>

      {/* Hair back volume */}
      <mesh position={[0, 1.1, -0.2]} castShadow>
        <sphereGeometry args={[0.26, 40, 40]} />
        <meshStandardMaterial color="#00b0c0" />
      </mesh>
      <mesh position={[0, 0.96, -0.22]} castShadow>
        <sphereGeometry args={[0.2, 36, 36]} />
        <meshStandardMaterial color="#00a8b8" />
      </mesh>

      {/* ============================================ */}
      {/* ================= BRAIDS ================== */}
      {/* ============================================ */}

      {/* Left braid - long flowing, 24 segments */}
      {[...Array(24)].map((_, i) => {
        const yPos = 0.72 - i * 0.12
        const zPos = -0.14 - i * 0.01 + Math.sin(i * 0.5) * 0.015
        const xPos = -0.36 - Math.sin(i * 0.35) * 0.05
        const size = Math.max(0.075 - i * 0.0022, 0.022)
        const twist = i * 0.25
        return (
          <group key={`lbraid-group-${i}`}>
            {/* Main braid segment */}
            <mesh position={[xPos, yPos, zPos]} rotation={[0, 0, twist]} castShadow>
              <sphereGeometry args={[size, 24, 24]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#00d4e8" : "#00b8cc"} />
            </mesh>
            {/* Braid strand details - 3 strands */}
            <mesh position={[xPos - 0.015, yPos + 0.015, zPos + 0.01]} rotation={[0, twist, 0]} castShadow>
              <sphereGeometry args={[size * 0.45, 16, 16]} />
              <meshStandardMaterial color="#00c0d8" />
            </mesh>
            <mesh position={[xPos + 0.015, yPos - 0.01, zPos - 0.01]} rotation={[0, -twist, 0]} castShadow>
              <sphereGeometry args={[size * 0.45, 16, 16]} />
              <meshStandardMaterial color="#00c8e0" />
            </mesh>
            <mesh position={[xPos, yPos - 0.012, zPos + 0.012]} rotation={[0, twist * 0.5, 0]} castShadow>
              <sphereGeometry args={[size * 0.4, 14, 14]} />
              <meshStandardMaterial color="#00d0e8" />
            </mesh>
          </group>
        )
      })}

      {/* Left braid gold bands - matching reference */}
      {[[0.52, 0.085], [0.12, 0.07], [-0.28, 0.055], [-0.68, 0.045], [-1.08, 0.035]].map(([y, size], i) => (
        <group key={`lband-${i}`}>
          <mesh position={[-0.36 - Math.sin((6 - i * 1.5) * 0.35) * 0.05, y, -0.14 - (6 - i * 1.5) * 0.01]} castShadow>
            <cylinderGeometry args={[size, size, 0.055, 24]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[-0.36 - Math.sin((6 - i * 1.5) * 0.35) * 0.05, y + 0.022, -0.14 - (6 - i * 1.5) * 0.01]} castShadow>
            <torusGeometry args={[size - 0.004, 0.006, 10, 24]} />
            <meshStandardMaterial color="#a88015" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[-0.36 - Math.sin((6 - i * 1.5) * 0.35) * 0.05, y - 0.022, -0.14 - (6 - i * 1.5) * 0.01]} castShadow>
            <torusGeometry args={[size - 0.004, 0.006, 10, 24]} />
            <meshStandardMaterial color="#a88015" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Left braid tip - tapered end */}
      <mesh position={[-0.38, -1.2, -0.28]} rotation={[0.3, 0, 0.15]} castShadow>
        <coneGeometry args={[0.04, 0.25, 20]} />
        <meshStandardMaterial color="#00d4e8" />
      </mesh>
      <mesh position={[-0.4, -1.38, -0.3]} rotation={[0.4, 0, 0.25]} castShadow>
        <coneGeometry args={[0.025, 0.18, 16]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>
      <mesh position={[-0.42, -1.52, -0.32]} rotation={[0.45, 0, 0.3]} castShadow>
        <coneGeometry args={[0.015, 0.1, 12]} />
        <meshStandardMaterial color="#00c0d4" />
      </mesh>

      {/* Right braid - 24 segments */}
      {[...Array(24)].map((_, i) => {
        const yPos = 0.72 - i * 0.12
        const zPos = -0.14 - i * 0.01 + Math.sin(i * 0.5) * 0.015
        const xPos = 0.36 + Math.sin(i * 0.35) * 0.05
        const size = Math.max(0.075 - i * 0.0022, 0.022)
        const twist = -i * 0.25
        return (
          <group key={`rbraid-group-${i}`}>
            <mesh position={[xPos, yPos, zPos]} rotation={[0, 0, twist]} castShadow>
              <sphereGeometry args={[size, 24, 24]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#00d4e8" : "#00b8cc"} />
            </mesh>
            <mesh position={[xPos + 0.015, yPos + 0.015, zPos + 0.01]} rotation={[0, twist, 0]} castShadow>
              <sphereGeometry args={[size * 0.45, 16, 16]} />
              <meshStandardMaterial color="#00c0d8" />
            </mesh>
            <mesh position={[xPos - 0.015, yPos - 0.01, zPos - 0.01]} rotation={[0, -twist, 0]} castShadow>
              <sphereGeometry args={[size * 0.45, 16, 16]} />
              <meshStandardMaterial color="#00c8e0" />
            </mesh>
            <mesh position={[xPos, yPos - 0.012, zPos + 0.012]} rotation={[0, twist * 0.5, 0]} castShadow>
              <sphereGeometry args={[size * 0.4, 14, 14]} />
              <meshStandardMaterial color="#00d0e8" />
            </mesh>
          </group>
        )
      })}

      {/* Right braid gold bands */}
      {[[0.52, 0.085], [0.12, 0.07], [-0.28, 0.055], [-0.68, 0.045], [-1.08, 0.035]].map(([y, size], i) => (
        <group key={`rband-${i}`}>
          <mesh position={[0.36 + Math.sin((6 - i * 1.5) * 0.35) * 0.05, y, -0.14 - (6 - i * 1.5) * 0.01]} castShadow>
            <cylinderGeometry args={[size, size, 0.055, 24]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.36 + Math.sin((6 - i * 1.5) * 0.35) * 0.05, y + 0.022, -0.14 - (6 - i * 1.5) * 0.01]} castShadow>
            <torusGeometry args={[size - 0.004, 0.006, 10, 24]} />
            <meshStandardMaterial color="#a88015" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.36 + Math.sin((6 - i * 1.5) * 0.35) * 0.05, y - 0.022, -0.14 - (6 - i * 1.5) * 0.01]} castShadow>
            <torusGeometry args={[size - 0.004, 0.006, 10, 24]} />
            <meshStandardMaterial color="#a88015" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Right braid tip */}
      <mesh position={[0.38, -1.2, -0.28]} rotation={[0.3, 0, -0.15]} castShadow>
        <coneGeometry args={[0.04, 0.25, 20]} />
        <meshStandardMaterial color="#00d4e8" />
      </mesh>
      <mesh position={[0.4, -1.38, -0.3]} rotation={[0.4, 0, -0.25]} castShadow>
        <coneGeometry args={[0.025, 0.18, 16]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>
      <mesh position={[0.42, -1.52, -0.32]} rotation={[0.45, 0, -0.3]} castShadow>
        <coneGeometry args={[0.015, 0.1, 12]} />
        <meshStandardMaterial color="#00c0d4" />
      </mesh>

      {/* ============================================ */}
      {/* ================= NECK ==================== */}
      {/* ============================================ */}

      {/* Neck - slim and long */}
      <mesh position={[0, 0.7, 0.02]} castShadow>
        <cylinderGeometry args={[0.07, 0.088, 0.14, 32]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>
      <mesh position={[0, 0.66, 0.02]} castShadow>
        <cylinderGeometry args={[0.075, 0.07, 0.06, 28]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* Neck muscles hint */}
      <mesh position={[-0.035, 0.68, 0.045]} rotation={[0.18, 0, 0.12]} castShadow>
        <capsuleGeometry args={[0.012, 0.07, 10, 16]} />
        <meshStandardMaterial color="#e8c8bc" />
      </mesh>
      <mesh position={[0.035, 0.68, 0.045]} rotation={[0.18, 0, -0.12]} castShadow>
        <capsuleGeometry args={[0.012, 0.07, 10, 16]} />
        <meshStandardMaterial color="#e8c8bc" />
      </mesh>

      {/* Choker - black with detail */}
      <mesh position={[0, 0.64, 0.02]} castShadow>
        <cylinderGeometry args={[0.088, 0.088, 0.032, 40]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0.654, 0.02]} castShadow>
        <torusGeometry args={[0.086, 0.005, 10, 40]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, 0.626, 0.02]} castShadow>
        <torusGeometry args={[0.086, 0.005, 10, 40]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Choker pendant - purple gem */}
      <mesh position={[0, 0.64, 0.11]} castShadow>
        <octahedronGeometry args={[0.028, 2]} />
        <meshStandardMaterial color="#8040c0" emissive="#8040c0" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.64, 0.095]} castShadow>
        <cylinderGeometry args={[0.018, 0.022, 0.012, 10]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* ============================================ */}
      {/* ================= TORSO =================== */}
      {/* ============================================ */}

      {/* Shoulders - slim build */}
      <mesh position={[0, 0.56, 0.02]} castShadow>
        <cylinderGeometry args={[0.21, 0.23, 0.09, 40]} />
        <meshStandardMaterial color="#5a4838" />
      </mesh>

      {/* Upper chest - crop top (olive/army green like reference) */}
      <mesh position={[0, 0.48, 0.03]} castShadow>
        <cylinderGeometry args={[0.22, 0.21, 0.11, 40]} />
        <meshStandardMaterial color="#5a4838" />
      </mesh>

      {/* Chest - main top */}
      <mesh position={[0, 0.4, 0.03]} castShadow>
        <cylinderGeometry args={[0.21, 0.2, 0.12, 40]} />
        <meshStandardMaterial color="#5a4838" />
      </mesh>

      {/* Chest shaping */}
      <mesh position={[-0.08, 0.45, 0.11]} castShadow>
        <sphereGeometry args={[0.065, 24, 24]} />
        <meshStandardMaterial color="#584738" />
      </mesh>
      <mesh position={[0.08, 0.45, 0.11]} castShadow>
        <sphereGeometry args={[0.065, 24, 24]} />
        <meshStandardMaterial color="#584738" />
      </mesh>

      {/* Crop top straps */}
      <mesh position={[-0.12, 0.55, 0.1]} rotation={[0.2, 0, 0.35]} castShadow>
        <boxGeometry args={[0.04, 0.16, 0.022]} />
        <meshStandardMaterial color="#4a3a2d" />
      </mesh>
      <mesh position={[0.12, 0.55, 0.1]} rotation={[0.2, 0, -0.35]} castShadow>
        <boxGeometry args={[0.04, 0.16, 0.022]} />
        <meshStandardMaterial color="#4a3a2d" />
      </mesh>

      {/* Strap buckles - gold */}
      <mesh position={[-0.1, 0.49, 0.115]} castShadow>
        <boxGeometry args={[0.022, 0.018, 0.012]} />
        <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.1, 0.49, 0.115]} castShadow>
        <boxGeometry args={[0.022, 0.018, 0.012]} />
        <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Bullet strap across chest - matching reference */}
      <mesh position={[0, 0.48, 0.12]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.025, 0.35, 0.018]} />
        <meshStandardMaterial color="#4a3a2d" />
      </mesh>
      {/* Bullets on strap */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`bullet-${i}`} position={[-0.08 + i * 0.03, 0.55 - i * 0.02, 0.13]} rotation={[0, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.025, 12]} />
          <meshStandardMaterial color="#b08830" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Cross strap on back */}
      <mesh position={[0, 0.5, -0.11]} rotation={[0, 0, 0.28]} castShadow>
        <boxGeometry args={[0.028, 0.24, 0.018]} />
        <meshStandardMaterial color="#4a3a2d" />
      </mesh>
      <mesh position={[0, 0.5, -0.11]} rotation={[0, 0, -0.28]} castShadow>
        <boxGeometry args={[0.028, 0.24, 0.018]} />
        <meshStandardMaterial color="#4a3a2d" />
      </mesh>

      {/* Midriff - exposed skin */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.11, 40]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.16, 0.08, 40]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.155, 0.15, 0.06, 40]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Belly button */}
      <mesh position={[0, 0.2, 0.148]} castShadow>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial color="#d8b8a8" />
      </mesh>
      <mesh position={[0, 0.2, 0.153]} castShadow>
        <sphereGeometry args={[0.006, 12, 12]} />
        <meshStandardMaterial color="#c8a898" />
      </mesh>

      {/* Tattoos on midriff - cloud/swirl pattern */}
      {[
        [0.1, 0.26, 0.135, 0.035],
        [-0.08, 0.29, 0.125, 0.025],
        [0.12, 0.21, 0.145, 0.02],
        [-0.1, 0.23, 0.135, 0.03],
        [0.07, 0.32, 0.115, 0.022],
        [-0.11, 0.18, 0.145, 0.018],
      ].map(([x, y, z, size], i) => (
        <group key={`tat-group-${i}`}>
          <mesh position={[x, y, z]} rotation={[0, 0, i * 0.55]} castShadow>
            <torusGeometry args={[size, 0.005, 12, 24]} />
            <meshStandardMaterial color="#4080a8" transparent opacity={0.7} />
          </mesh>
          <mesh position={[x, y, z + 0.004]} rotation={[0, 0, i * 0.55 + 0.45]} castShadow>
            <torusGeometry args={[(size as number) * 0.55, 0.003, 10, 20]} />
            <meshStandardMaterial color="#5090b8" transparent opacity={0.55} />
          </mesh>
        </group>
      ))}

      {/* ============================================ */}
      {/* ================= HIPS ==================== */}
      {/* ============================================ */}

      {/* Hip area - top of pants */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.17, 0.1, 40]} />
        <meshStandardMaterial color="#4a3828" />
      </mesh>

      {/* Hip bones */}
      <mesh position={[-0.13, 0.1, 0.07]} castShadow>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color="#4a3828" />
      </mesh>
      <mesh position={[0.13, 0.1, 0.07]} castShadow>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color="#4a3828" />
      </mesh>

      {/* Lower hip/pelvis - transition to purple pants */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.19, 0.18, 0.08, 40]} />
        <meshStandardMaterial color="#9a4070" />
      </mesh>

      {/* Hip joint spheres */}
      <mesh position={[-0.11, -0.02, 0]} castShadow>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshStandardMaterial color="#9a4070" />
      </mesh>
      <mesh position={[0.11, -0.02, 0]} castShadow>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshStandardMaterial color="#9a4070" />
      </mesh>

      {/* Belt - brown leather */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.185, 0.18, 0.055, 40]} />
        <meshStandardMaterial color="#4a3828" />
      </mesh>
      <mesh position={[0, 0.122, 0]} castShadow>
        <torusGeometry args={[0.18, 0.01, 12, 40]} />
        <meshStandardMaterial color="#3a2818" />
      </mesh>
      <mesh position={[0, 0.078, 0]} castShadow>
        <torusGeometry args={[0.18, 0.01, 12, 40]} />
        <meshStandardMaterial color="#3a2818" />
      </mesh>

      {/* Belt buckle - gold */}
      <mesh position={[0, 0.1, 0.17]} castShadow>
        <boxGeometry args={[0.1, 0.065, 0.025]} />
        <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.1, 0.185]} castShadow>
        <boxGeometry args={[0.07, 0.045, 0.012]} />
        <meshStandardMaterial color="#a88018" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.1, 0.19]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.035, 10]} />
        <meshStandardMaterial color="#b89020" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Belt pouches */}
      <mesh position={[-0.15, 0.08, 0.11]} castShadow>
        <boxGeometry args={[0.055, 0.065, 0.04]} />
        <meshStandardMaterial color="#3a2818" />
      </mesh>
      <mesh position={[-0.15, 0.105, 0.11]} castShadow>
        <boxGeometry args={[0.06, 0.018, 0.045]} />
        <meshStandardMaterial color="#4a3828" />
      </mesh>
      <mesh position={[0.15, 0.08, 0.11]} castShadow>
        <boxGeometry args={[0.055, 0.065, 0.04]} />
        <meshStandardMaterial color="#3a2818" />
      </mesh>
      <mesh position={[0.15, 0.105, 0.11]} castShadow>
        <boxGeometry args={[0.06, 0.018, 0.045]} />
        <meshStandardMaterial color="#4a3828" />
      </mesh>

      {/* Side pouches */}
      <mesh position={[-0.18, 0.06, 0]} rotation={[0, 0, -0.18]} castShadow>
        <boxGeometry args={[0.035, 0.075, 0.045]} />
        <meshStandardMaterial color="#3a2818" />
      </mesh>
      <mesh position={[0.18, 0.06, 0]} rotation={[0, 0, 0.18]} castShadow>
        <boxGeometry args={[0.035, 0.075, 0.045]} />
        <meshStandardMaterial color="#3a2818" />
      </mesh>

      {/* Zap pistol on hip (small gun) */}
      <mesh position={[0.19, 0.04, 0.06]} rotation={[0.1, 0.3, 0.15]} castShadow>
        <boxGeometry args={[0.08, 0.04, 0.025]} />
        <meshStandardMaterial color="#404040" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.21, 0.02, 0.06]} rotation={[0.1, 0.3, -0.1]} castShadow>
        <boxGeometry args={[0.025, 0.06, 0.02]} />
        <meshStandardMaterial color="#303030" />
      </mesh>

      {/* ============================================ */}
      {/* ================= ARMS ==================== */}
      {/* ============================================ */}

      {/* Left Arm Group */}
      <group name="leftArm" position={[-0.27, 0.52, 0]}>
        {/* Left shoulder */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[-0.02, 0.015, 0]} castShadow>
          <sphereGeometry args={[0.055, 28, 28]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Left deltoid */}
        <mesh position={[-0.02, -0.045, 0]} castShadow>
          <sphereGeometry args={[0.065, 28, 28]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>

        {/* Left upper arm */}
        <mesh position={[-0.04, -0.14, 0]} rotation={[0, 0, 0.12]} castShadow>
          <capsuleGeometry args={[0.05, 0.17, 20, 32]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[-0.03, -0.11, 0.025]} castShadow>
          <sphereGeometry args={[0.035, 20, 20]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Left elbow */}
        <mesh position={[-0.075, -0.3, 0.02]} castShadow>
          <sphereGeometry args={[0.045, 28, 28]} />
          <meshStandardMaterial color="#e8cdc2" />
        </mesh>

        {/* Left forearm */}
        <mesh position={[-0.11, -0.44, 0.055]} rotation={[0.38, 0, 0.22]} castShadow>
          <capsuleGeometry args={[0.04, 0.19, 20, 32]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[-0.09, -0.36, 0.065]} castShadow>
          <sphereGeometry args={[0.03, 20, 20]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Left arm tattoos */}
        <mesh position={[-0.09, -0.36, 0.095]} rotation={[0.45, 0.15, 0.25]} castShadow>
          <torusGeometry args={[0.032, 0.005, 12, 20]} />
          <meshStandardMaterial color="#4080a8" transparent opacity={0.7} />
        </mesh>
        <mesh position={[-0.075, -0.4, 0.085]} rotation={[0.35, 0.08, 0.18]} castShadow>
          <torusGeometry args={[0.022, 0.004, 10, 18]} />
          <meshStandardMaterial color="#4080a8" transparent opacity={0.65} />
        </mesh>
        <mesh position={[-0.1, -0.32, 0.09]} rotation={[0.5, 0.12, 0.2]} castShadow>
          <torusGeometry args={[0.018, 0.003, 10, 16]} />
          <meshStandardMaterial color="#5090b8" transparent opacity={0.6} />
        </mesh>

        {/* Left bracer/glove - purple */}
        <mesh position={[-0.15, -0.54, 0.09]} rotation={[0.38, 0, 0.28]} castShadow>
          <cylinderGeometry args={[0.048, 0.054, 0.11, 28]} />
          <meshStandardMaterial color="#6040a0" />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={`lbracer-${i}`} position={[-0.15, -0.5 - i * 0.038, 0.09]} rotation={[0.38, 0, 0.28]} castShadow>
            <torusGeometry args={[0.05, 0.007, 10, 28]} />
            <meshStandardMaterial color="#5030a0" />
          </mesh>
        ))}
        <mesh position={[-0.16, -0.58, 0.11]} rotation={[0.38, 0, 0.28]} castShadow>
          <cylinderGeometry args={[0.05, 0.046, 0.045, 28]} />
          <meshStandardMaterial color="#5030a0" />
        </mesh>

        {/* Left hand */}
        <mesh position={[-0.18, -0.62, 0.14]} castShadow>
          <sphereGeometry args={[0.04, 24, 24]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[-0.18, -0.64, 0.15]} castShadow>
          <boxGeometry args={[0.055, 0.045, 0.028]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Left fingers */}
        {[0, 1, 2, 3].map((i) => (
          <group key={`lfinger-group-${i}`}>
            <mesh position={[-0.19 + i * 0.016, -0.66, 0.16 + i * 0.007]} rotation={[0.48, 0, 0]} castShadow>
              <capsuleGeometry args={[0.009, 0.032, 10, 16]} />
              <meshStandardMaterial color="#e8cdc2" />
            </mesh>
            <mesh position={[-0.19 + i * 0.016, -0.695, 0.178 + i * 0.008]} rotation={[0.55, 0, 0]} castShadow>
              <capsuleGeometry args={[0.007, 0.022, 8, 14]} />
              <meshStandardMaterial color="#e8cdc2" />
            </mesh>
          </group>
        ))}
        <mesh position={[-0.155, -0.64, 0.16]} rotation={[0.28, 0.28, 0.45]} castShadow>
          <capsuleGeometry args={[0.01, 0.028, 10, 16]} />
          <meshStandardMaterial color="#e8cdc2" />
        </mesh>
      </group>

      {/* Right Arm Group */}
      <group name="rightArm" position={[0.27, 0.52, 0]}>
        {/* Right shoulder */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[0.02, 0.015, 0]} castShadow>
          <sphereGeometry args={[0.055, 28, 28]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Right deltoid */}
        <mesh position={[0.02, -0.045, 0]} castShadow>
          <sphereGeometry args={[0.065, 28, 28]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>

        {/* Right upper arm */}
        <mesh position={[0.04, -0.14, 0]} rotation={[0, 0, -0.12]} castShadow>
          <capsuleGeometry args={[0.05, 0.17, 20, 32]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[0.03, -0.11, 0.025]} castShadow>
          <sphereGeometry args={[0.035, 20, 20]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Right elbow */}
        <mesh position={[0.075, -0.3, 0.02]} castShadow>
          <sphereGeometry args={[0.045, 28, 28]} />
          <meshStandardMaterial color="#e8cdc2" />
        </mesh>

        {/* Right forearm */}
        <mesh position={[0.11, -0.44, 0.055]} rotation={[0.38, 0, -0.22]} castShadow>
          <capsuleGeometry args={[0.04, 0.19, 20, 32]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[0.09, -0.36, 0.065]} castShadow>
          <sphereGeometry args={[0.03, 20, 20]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Right arm tattoos */}
        <mesh position={[0.09, -0.36, 0.095]} rotation={[0.45, -0.15, -0.25]} castShadow>
          <torusGeometry args={[0.032, 0.005, 12, 20]} />
          <meshStandardMaterial color="#4080a8" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.075, -0.4, 0.085]} rotation={[0.35, -0.08, -0.18]} castShadow>
          <torusGeometry args={[0.022, 0.004, 10, 18]} />
          <meshStandardMaterial color="#4080a8" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0.1, -0.32, 0.09]} rotation={[0.5, -0.12, -0.2]} castShadow>
          <torusGeometry args={[0.018, 0.003, 10, 16]} />
          <meshStandardMaterial color="#5090b8" transparent opacity={0.6} />
        </mesh>

        {/* Right bracer/glove */}
        <mesh position={[0.15, -0.54, 0.09]} rotation={[0.38, 0, -0.28]} castShadow>
          <cylinderGeometry args={[0.048, 0.054, 0.11, 28]} />
          <meshStandardMaterial color="#6040a0" />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={`rbracer-${i}`} position={[0.15, -0.5 - i * 0.038, 0.09]} rotation={[0.38, 0, -0.28]} castShadow>
            <torusGeometry args={[0.05, 0.007, 10, 28]} />
            <meshStandardMaterial color="#5030a0" />
          </mesh>
        ))}
        <mesh position={[0.16, -0.58, 0.11]} rotation={[0.38, 0, -0.28]} castShadow>
          <cylinderGeometry args={[0.05, 0.046, 0.045, 28]} />
          <meshStandardMaterial color="#5030a0" />
        </mesh>

        {/* Right hand */}
        <mesh position={[0.18, -0.62, 0.14]} castShadow>
          <sphereGeometry args={[0.04, 24, 24]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[0.18, -0.64, 0.15]} castShadow>
          <boxGeometry args={[0.055, 0.045, 0.028]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Right fingers */}
        {[0, 1, 2, 3].map((i) => (
          <group key={`rfinger-group-${i}`}>
            <mesh position={[0.19 - i * 0.016, -0.66, 0.16 + i * 0.007]} rotation={[0.48, 0, 0]} castShadow>
              <capsuleGeometry args={[0.009, 0.032, 10, 16]} />
              <meshStandardMaterial color="#e8cdc2" />
            </mesh>
            <mesh position={[0.19 - i * 0.016, -0.695, 0.178 + i * 0.008]} rotation={[0.55, 0, 0]} castShadow>
              <capsuleGeometry args={[0.007, 0.022, 8, 14]} />
              <meshStandardMaterial color="#e8cdc2" />
            </mesh>
          </group>
        ))}
        <mesh position={[0.155, -0.64, 0.16]} rotation={[0.28, -0.28, -0.45]} castShadow>
          <capsuleGeometry args={[0.01, 0.028, 10, 16]} />
          <meshStandardMaterial color="#e8cdc2" />
        </mesh>
      </group>

      {/* ============================================ */}
      {/* ================= WEAPONS ================= */}
      {/* ============================================ */}

      {!usingRockets ? (
        // Pow-Pow (Minigun) - held in RIGHT hand, pointing down/forward like reference
        <group position={[0.42, -0.08, 0.22]} rotation={[0.7, 0.15, -0.25]}>
          {/* Main body - bronze */}
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.22, 0.22]} />
            <meshStandardMaterial color="#8b7014" metalness={0.75} roughness={0.25} />
          </mesh>

          {/* Body panel details */}
          <mesh position={[0, 0.115, 0]} castShadow>
            <boxGeometry args={[0.5, 0.022, 0.18]} />
            <meshStandardMaterial color="#6b5010" metalness={0.65} roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.115, 0]} castShadow>
            <boxGeometry args={[0.5, 0.022, 0.18]} />
            <meshStandardMaterial color="#6b5010" metalness={0.65} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0, 0.115]} castShadow>
            <boxGeometry args={[0.5, 0.18, 0.022]} />
            <meshStandardMaterial color="#7a6012" metalness={0.65} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0, -0.115]} castShadow>
            <boxGeometry args={[0.5, 0.18, 0.022]} />
            <meshStandardMaterial color="#7a6012" metalness={0.65} roughness={0.35} />
          </mesh>

          {/* Rear grip */}
          <mesh position={[-0.2, -0.18, 0]} castShadow>
            <boxGeometry args={[0.1, 0.18, 0.09]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>
          <mesh position={[-0.2, -0.26, 0.015]} rotation={[0.32, 0, 0]} castShadow>
            <boxGeometry args={[0.09, 0.11, 0.07]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={`grip-${i}`} position={[-0.2, -0.12 - i * 0.038, 0.048]} castShadow>
              <boxGeometry args={[0.1, 0.012, 0.008]} />
              <meshStandardMaterial color="#2a1a10" />
            </mesh>
          ))}

          {/* Front grip */}
          <mesh position={[0.1, -0.15, 0]} castShadow>
            <boxGeometry args={[0.06, 0.12, 0.06]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>

          {/* Barrel housing - cylindrical */}
          <mesh position={[0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.14, 0.16, 0.2, 40]} />
            <meshStandardMaterial color="#6b5010" metalness={0.75} roughness={0.25} />
          </mesh>

          {/* Barrel housing front plate */}
          <mesh position={[0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.12, 0.14, 0.022, 40]} />
            <meshStandardMaterial color="#5a4008" metalness={0.75} roughness={0.25} />
          </mesh>

          {/* Barrel rotation mechanism */}
          <mesh position={[0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.07, 0.09, 0.055, 32]} />
            <meshStandardMaterial color="#4a3008" metalness={0.65} roughness={0.35} />
          </mesh>

          {/* Purple barrels - 3 in triangle */}
          {[[0, 0.075], [0.065, -0.038], [-0.065, -0.038]].map(([y, z], i) => (
            <group key={`barrel-full-${i}`}>
              <mesh position={[0.54, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.035, 0.035, 0.38, 28]} />
                <meshStandardMaterial color="#6040a0" metalness={0.65} roughness={0.25} />
              </mesh>
              {[0, 1, 2].map((j) => (
                <mesh key={`ridge-${i}-${j}`} position={[0.42 + j * 0.095, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                  <torusGeometry args={[0.037, 0.005, 10, 28]} />
                  <meshStandardMaterial color="#5030a0" />
                </mesh>
              ))}
              <mesh position={[0.73, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.025, 0.035, 0.045, 28]} />
                <meshStandardMaterial color="#4030a0" metalness={0.75} roughness={0.2} />
              </mesh>
              <mesh position={[0.76, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.018, 0.018, 0.022, 20]} />
                <meshStandardMaterial color="#1a1020" />
              </mesh>
              <mesh position={[0.77, y, z]} castShadow>
                <sphereGeometry args={[0.012, 16, 16]} />
                <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={0.35} />
              </mesh>
            </group>
          ))}

          {/* Ammo drum - cylindrical magazine */}
          <mesh position={[-0.05, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.11, 0.13, 32]} />
            <meshStandardMaterial color="#5a4a10" metalness={0.65} roughness={0.35} />
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={`drum-${i}`} position={[-0.05, 0.18, 0.045 - i * 0.045]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <torusGeometry args={[0.105, 0.008, 10, 32]} />
              <meshStandardMaterial color="#4a3a08" metalness={0.65} roughness={0.35} />
            </mesh>
          ))}
          <mesh position={[-0.05, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.11, 0.022, 32]} />
            <meshStandardMaterial color="#4a3a08" metalness={0.65} roughness={0.35} />
          </mesh>

          {/* Sight */}
          <mesh position={[0.14, 0.14, 0]} castShadow>
            <boxGeometry args={[0.09, 0.045, 0.035]} />
            <meshStandardMaterial color="#3a3a3a" metalness={0.55} roughness={0.45} />
          </mesh>
          <mesh position={[0.14, 0.165, 0]} castShadow>
            <boxGeometry args={[0.018, 0.028, 0.022]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>

          {/* Gold trim */}
          <mesh position={[0.24, 0, 0.115]} castShadow>
            <boxGeometry args={[0.16, 0.045, 0.012]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.24, 0, -0.115]} castShadow>
            <boxGeometry args={[0.16, 0.045, 0.012]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.24, 0.115, 0]} castShadow>
            <boxGeometry args={[0.16, 0.012, 0.045]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ) : (
        // Fishbones (Rocket Launcher) - shark-shaped
        <group position={[0.42, 0.36, 0.12]} rotation={[-0.12, 0.08, -0.38]}>
          {/* Main body - gray metal */}
          <mesh castShadow>
            <boxGeometry args={[0.7, 0.28, 0.28]} />
            <meshStandardMaterial color="#5a5a5a" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* Body panel details */}
          <mesh position={[0, 0.145, 0]} castShadow>
            <boxGeometry args={[0.65, 0.022, 0.24]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.55} roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.145, 0]} castShadow>
            <boxGeometry args={[0.65, 0.022, 0.24]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* Shark head/nose cone */}
          <mesh position={[0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <coneGeometry args={[0.16, 0.38, 28]} />
            <meshStandardMaterial color="#505050" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* Shark jaw - lower */}
          <mesh position={[0.52, -0.09, 0]} rotation={[0, 0, Math.PI / 2 + 0.32]} castShadow>
            <coneGeometry args={[0.11, 0.23, 24]} />
            <meshStandardMaterial color="#484848" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* Shark teeth - top row */}
          {[-0.11, -0.055, 0, 0.055, 0.11].map((z, i) => (
            <mesh key={`ttooth-${i}`} position={[0.57, 0.09, z]} castShadow>
              <coneGeometry args={[0.018, 0.075, 10]} />
              <meshStandardMaterial color="#f8f8f8" />
            </mesh>
          ))}

          {/* Shark teeth - bottom row */}
          {[-0.09, -0.035, 0.035, 0.09].map((z, i) => (
            <mesh key={`btooth-${i}`} position={[0.53, -0.07, z]} rotation={[Math.PI, 0, 0]} castShadow>
              <coneGeometry args={[0.016, 0.06, 10]} />
              <meshStandardMaterial color="#f8f8f8" />
            </mesh>
          ))}

          {/* Shark eyes - glowing pink */}
          <mesh position={[0.3, 0.11, 0.15]} castShadow>
            <sphereGeometry args={[0.042, 28, 28]} />
            <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0.3, 0.11, -0.15]} castShadow>
            <sphereGeometry args={[0.042, 28, 28]} />
            <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.8} />
          </mesh>

          {/* Shark eye pupils */}
          <mesh position={[0.32, 0.12, 0.165]} castShadow>
            <sphereGeometry args={[0.02, 20, 20]} />
            <meshStandardMaterial color="#1a0020" />
          </mesh>
          <mesh position={[0.32, 0.12, -0.165]} castShadow>
            <sphereGeometry args={[0.02, 20, 20]} />
            <meshStandardMaterial color="#1a0020" />
          </mesh>

          {/* Eye highlights */}
          <mesh position={[0.31, 0.13, 0.155]} castShadow>
            <sphereGeometry args={[0.009, 14, 14]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.45} />
          </mesh>
          <mesh position={[0.31, 0.13, -0.155]} castShadow>
            <sphereGeometry args={[0.009, 14, 14]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.45} />
          </mesh>

          {/* Dorsal fin */}
          <mesh position={[0.06, 0.22, 0]} rotation={[0, 0, 0.22]} castShadow>
            <boxGeometry args={[0.2, 0.16, 0.028]} />
            <meshStandardMaterial color="#606060" metalness={0.55} roughness={0.35} />
          </mesh>
          <mesh position={[0.1, 0.26, 0]} rotation={[0, 0, 0.22]} castShadow>
            <boxGeometry args={[0.13, 0.018, 0.022]} />
            <meshStandardMaterial color="#505050" />
          </mesh>

          {/* Side fins */}
          <mesh position={[0.1, 0, 0.17]} rotation={[0.52, 0, 0]} castShadow>
            <boxGeometry args={[0.11, 0.09, 0.022]} />
            <meshStandardMaterial color="#585858" metalness={0.55} roughness={0.35} />
          </mesh>
          <mesh position={[0.1, 0, -0.17]} rotation={[-0.52, 0, 0]} castShadow>
            <boxGeometry args={[0.11, 0.09, 0.022]} />
            <meshStandardMaterial color="#585858" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* Rocket tube/barrel */}
          <mesh position={[-0.16, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.45, 32]} />
            <meshStandardMaterial color="#3a3a3a" metalness={0.65} roughness={0.35} />
          </mesh>

          {/* Rocket tube details */}
          {[0, 1, 2].map((i) => (
            <mesh key={`tube-${i}`} position={[-0.23 + i * 0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <torusGeometry args={[0.11, 0.012, 12, 32]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>
          ))}

          {/* Rocket tube opening */}
          <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.022, 32]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          <mesh position={[-0.41, 0, 0]} castShadow>
            <sphereGeometry args={[0.055, 20, 20]} />
            <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={0.55} transparent opacity={0.65} />
          </mesh>

          {/* Rocket tip visible in barrel */}
          <mesh position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <coneGeometry args={[0.06, 0.2, 24]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[-0.22, 0, 0]} castShadow>
            <sphereGeometry args={[0.055, 20, 20]} />
            <meshStandardMaterial color="#d4342d" metalness={0.5} roughness={0.4} />
          </mesh>

          {/* Handle */}
          <mesh position={[-0.23, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.042, 0.052, 0.18, 20]} />
            <meshStandardMaterial color="#4a3a30" />
          </mesh>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={`hgrip-${i}`} position={[-0.23, -0.14 - i * 0.032, 0.045]} castShadow>
              <boxGeometry args={[0.045, 0.012, 0.008]} />
              <meshStandardMaterial color="#3a2a20" />
            </mesh>
          ))}

          {/* Gold trim rivets */}
          {[[0.16, 0, 0.15], [0.16, 0, -0.15], [-0.06, 0.145, 0.11], [-0.06, 0.145, -0.11]].map(([x, y, z], i) => (
            <mesh key={`rivet-${i}`} position={[x, y, z]} castShadow>
              <sphereGeometry args={[0.038, 20, 20]} />
              <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
            </mesh>
          ))}

          {/* Gold trim band */}
          <mesh position={[-0.1, 0.145, 0]} castShadow>
            <boxGeometry args={[0.16, 0.022, 0.09]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Glow effect */}
          <pointLight position={[0.52, 0, 0]} color="#ff4400" intensity={6} distance={7} />
        </group>
      )}

      {/* Fishbones on back when using minigun - over LEFT shoulder, rocket tip above head */}
      {!usingRockets && (
        <group position={[-0.18, 0.55, -0.12]} rotation={[-0.2, 0.15, 0.18]}>
          {/* Main rocket launcher body - larger, matching reference */}
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.8, 0.22]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* Gold trim bands on body */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.24, 0.06, 0.24]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.1, 0]} castShadow>
            <boxGeometry args={[0.24, 0.06, 0.24]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0, -0.25, 0]} castShadow>
            <boxGeometry args={[0.23, 0.04, 0.23]} />
            <meshStandardMaterial color="#b89020" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Shark head/nose at top - pointing UP */}
          <mesh position={[0, 0.55, 0]} rotation={[0, 0, 0]} castShadow>
            <coneGeometry args={[0.14, 0.3, 24]} />
            <meshStandardMaterial color="#505050" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* Shark jaw detail */}
          <mesh position={[0.06, 0.48, 0]} rotation={[0, 0, -0.4]} castShadow>
            <coneGeometry args={[0.08, 0.18, 20]} />
            <meshStandardMaterial color="#454545" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* ROCKET TIP visible above head - RED/SILVER */}
          <mesh position={[0, 0.78, 0]} castShadow>
            <coneGeometry args={[0.06, 0.22, 24]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.85} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0.92, 0]} castShadow>
            <sphereGeometry args={[0.055, 24, 24]} />
            <meshStandardMaterial color="#cc2222" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Rocket tip stripe */}
          <mesh position={[0, 0.85, 0]} castShadow>
            <cylinderGeometry args={[0.048, 0.055, 0.04, 20]} />
            <meshStandardMaterial color="#aa1818" metalness={0.5} roughness={0.4} />
          </mesh>

          {/* Shark eyes - pink glowing, visible from front */}
          <mesh position={[0.08, 0.42, 0.1]} castShadow>
            <sphereGeometry args={[0.035, 24, 24]} />
            <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0.08, 0.42, -0.1]} castShadow>
            <sphereGeometry args={[0.035, 24, 24]} />
            <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.7} />
          </mesh>
          {/* Eye pupils */}
          <mesh position={[0.1, 0.43, 0.11]} castShadow>
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshStandardMaterial color="#200020" />
          </mesh>
          <mesh position={[0.1, 0.43, -0.11]} castShadow>
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshStandardMaterial color="#200020" />
          </mesh>

          {/* Dorsal fin */}
          <mesh position={[-0.08, 0.35, 0]} rotation={[0, 0, 0.25]} castShadow>
            <boxGeometry args={[0.02, 0.18, 0.12]} />
            <meshStandardMaterial color="#505050" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* Side fins */}
          <mesh position={[0, 0.15, 0.13]} rotation={[0.5, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.12, 0.02]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.55} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.15, -0.13]} rotation={[-0.5, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.12, 0.02]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.55} roughness={0.35} />
          </mesh>

          {/* Gold rivets */}
          <mesh position={[0.12, 0.1, 0.08]} castShadow>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.12, 0.1, -0.08]} castShadow>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.12, -0.15, 0.08]} castShadow>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.12, -0.15, -0.08]} castShadow>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color="#c9a227" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Bottom of launcher */}
          <mesh position={[0, -0.45, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.11, 0.15, 24]} />
            <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.35} />
          </mesh>

          {/* Shoulder strap - diagonal across chest */}
          <mesh position={[0.22, -0.1, 0.12]} rotation={[0.3, 0.5, 0.7]} castShadow>
            <boxGeometry args={[0.03, 0.55, 0.018]} />
            <meshStandardMaterial color="#3a2a1d" />
          </mesh>
          <mesh position={[0.35, -0.35, 0.18]} rotation={[0.2, 0.3, 0.5]} castShadow>
            <boxGeometry args={[0.03, 0.4, 0.018]} />
            <meshStandardMaterial color="#3a2a1d" />
          </mesh>
        </group>
      )}
    </group>
  )
}

// Legs component - separate for animation
export function JinxLegs() {
  return (
    <>
      {/* ============================================ */}
      {/* ================= LEFT LEG ================ */}
      {/* ============================================ */}

      <group name="leftLeg" position={[-0.095, 0.5, 0]}>
        {/* Hip connection */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <sphereGeometry args={[0.085, 32, 32]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>

        {/* Upper thigh */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.21, 20, 36]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>
        <mesh position={[0.025, 0.25, 0.035]} castShadow>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#984070" />
        </mesh>

        {/* Lower thigh */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.15, 20, 32]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>

        {/* Pant stripes - pink/purple striped pattern */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={`lstripe-${i}`} position={[-0.065 + i * 0.026, 0.16, 0.06]} rotation={[0, 0.2 - i * 0.08, 0]} castShadow>
            <boxGeometry args={[0.01, 0.36, 0.01]} />
            <meshStandardMaterial color="#6a2850" />
          </mesh>
        ))}

        {/* Knee */}
        <mesh position={[0, -0.08, 0.02]} castShadow>
          <sphereGeometry args={[0.068, 32, 32]} />
          <meshStandardMaterial color="#8a3868" />
        </mesh>
        <mesh position={[0, -0.08, 0.055]} castShadow>
          <sphereGeometry args={[0.035, 20, 20]} />
          <meshStandardMaterial color="#7a3058" />
        </mesh>

        {/* Calf */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <capsuleGeometry args={[0.064, 0.21, 20, 32]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>
        <mesh position={[0, -0.21, -0.035]} castShadow>
          <sphereGeometry args={[0.045, 20, 20]} />
          <meshStandardMaterial color="#984070" />
        </mesh>

        {/* Ankle */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.05, 28, 28]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>
        <mesh position={[-0.028, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial color="#5a4a40" />
        </mesh>
        <mesh position={[0.028, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial color="#5a4a40" />
        </mesh>

        {/* Boot - combat style */}
        <mesh position={[0, -0.48, 0.022]} castShadow>
          <boxGeometry args={[0.12, 0.13, 0.2]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>

        {/* Boot top cuff */}
        <mesh position={[0, -0.41, 0.022]} castShadow>
          <cylinderGeometry args={[0.068, 0.074, 0.045, 28]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>
        <mesh position={[0, -0.39, 0.022]} castShadow>
          <torusGeometry args={[0.066, 0.01, 12, 28]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>

        {/* Boot sole */}
        <mesh position={[0, -0.55, 0.022]} castShadow>
          <boxGeometry args={[0.14, 0.032, 0.22]} />
          <meshStandardMaterial color="#2a2020" />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={`ltread-${i}`} position={[0, -0.565, -0.07 + i * 0.038]} castShadow>
            <boxGeometry args={[0.13, 0.008, 0.022]} />
            <meshStandardMaterial color="#1a1515" />
          </mesh>
        ))}

        {/* Boot heel */}
        <mesh position={[0, -0.53, -0.055]} castShadow>
          <boxGeometry args={[0.085, 0.065, 0.065]} />
          <meshStandardMaterial color="#2a2020" />
        </mesh>

        {/* Boot toe cap */}
        <mesh position={[0, -0.51, 0.11]} castShadow>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>

        {/* Boot straps - purple */}
        <mesh position={[0, -0.45, 0.11]} castShadow>
          <boxGeometry args={[0.13, 0.028, 0.015]} />
          <meshStandardMaterial color="#6050a0" />
        </mesh>
        <mesh position={[0, -0.49, 0.11]} castShadow>
          <boxGeometry args={[0.13, 0.028, 0.015]} />
          <meshStandardMaterial color="#6050a0" />
        </mesh>

        {/* Boot buckles */}
        <mesh position={[0, -0.45, 0.12]} castShadow>
          <boxGeometry args={[0.032, 0.022, 0.01]} />
          <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.49, 0.12]} castShadow>
          <boxGeometry args={[0.032, 0.022, 0.01]} />
          <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Boot laces */}
        {[0, 1, 2].map((i) => (
          <mesh key={`llace-${i}`} position={[0, -0.44 - i * 0.028, 0.095]} castShadow>
            <boxGeometry args={[0.075, 0.007, 0.008]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>
        ))}
      </group>

      {/* ============================================ */}
      {/* ================= RIGHT LEG =============== */}
      {/* ============================================ */}

      <group name="rightLeg" position={[0.095, 0.5, 0]}>
        {/* Hip connection */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <sphereGeometry args={[0.085, 32, 32]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>

        {/* Upper thigh */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.21, 20, 36]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>
        <mesh position={[-0.025, 0.25, 0.035]} castShadow>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#984070" />
        </mesh>

        {/* Lower thigh */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.15, 20, 32]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>

        {/* Pant stripes */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={`rstripe-${i}`} position={[0.065 - i * 0.026, 0.16, 0.06]} rotation={[0, -0.2 + i * 0.08, 0]} castShadow>
            <boxGeometry args={[0.01, 0.36, 0.01]} />
            <meshStandardMaterial color="#6a2850" />
          </mesh>
        ))}

        {/* Knee */}
        <mesh position={[0, -0.08, 0.02]} castShadow>
          <sphereGeometry args={[0.068, 32, 32]} />
          <meshStandardMaterial color="#8a3868" />
        </mesh>
        <mesh position={[0, -0.08, 0.055]} castShadow>
          <sphereGeometry args={[0.035, 20, 20]} />
          <meshStandardMaterial color="#7a3058" />
        </mesh>

        {/* Calf */}
        <mesh position={[0, -0.25, 0]} castShadow>
          <capsuleGeometry args={[0.064, 0.21, 20, 32]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>
        <mesh position={[0, -0.21, -0.035]} castShadow>
          <sphereGeometry args={[0.045, 20, 20]} />
          <meshStandardMaterial color="#984070" />
        </mesh>

        {/* Ankle */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.05, 28, 28]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>
        <mesh position={[-0.028, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial color="#5a4a40" />
        </mesh>
        <mesh position={[0.028, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial color="#5a4a40" />
        </mesh>

        {/* Boot */}
        <mesh position={[0, -0.48, 0.022]} castShadow>
          <boxGeometry args={[0.12, 0.13, 0.2]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>

        {/* Boot top cuff */}
        <mesh position={[0, -0.41, 0.022]} castShadow>
          <cylinderGeometry args={[0.068, 0.074, 0.045, 28]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>
        <mesh position={[0, -0.39, 0.022]} castShadow>
          <torusGeometry args={[0.066, 0.01, 12, 28]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>

        {/* Boot sole */}
        <mesh position={[0, -0.55, 0.022]} castShadow>
          <boxGeometry args={[0.14, 0.032, 0.22]} />
          <meshStandardMaterial color="#2a2020" />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={`rtread-${i}`} position={[0, -0.565, -0.07 + i * 0.038]} castShadow>
            <boxGeometry args={[0.13, 0.008, 0.022]} />
            <meshStandardMaterial color="#1a1515" />
          </mesh>
        ))}

        {/* Boot heel */}
        <mesh position={[0, -0.53, -0.055]} castShadow>
          <boxGeometry args={[0.085, 0.065, 0.065]} />
          <meshStandardMaterial color="#2a2020" />
        </mesh>

        {/* Boot toe cap */}
        <mesh position={[0, -0.51, 0.11]} castShadow>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>

        {/* Boot straps */}
        <mesh position={[0, -0.45, 0.11]} castShadow>
          <boxGeometry args={[0.13, 0.028, 0.015]} />
          <meshStandardMaterial color="#6050a0" />
        </mesh>
        <mesh position={[0, -0.49, 0.11]} castShadow>
          <boxGeometry args={[0.13, 0.028, 0.015]} />
          <meshStandardMaterial color="#6050a0" />
        </mesh>

        {/* Boot buckles */}
        <mesh position={[0, -0.45, 0.12]} castShadow>
          <boxGeometry args={[0.032, 0.022, 0.01]} />
          <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.49, 0.12]} castShadow>
          <boxGeometry args={[0.032, 0.022, 0.01]} />
          <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Boot laces */}
        {[0, 1, 2].map((i) => (
          <mesh key={`rlace-${i}`} position={[0, -0.44 - i * 0.028, 0.095]} castShadow>
            <boxGeometry args={[0.075, 0.007, 0.008]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>
        ))}
      </group>
    </>
  )
}
