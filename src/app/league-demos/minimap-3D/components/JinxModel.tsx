'use client'

import * as THREE from 'three'

interface JinxModelProps {
  usingRockets: boolean
}

// High-poly Jinx model component - doubled detail version
export default function JinxModel({ usingRockets }: JinxModelProps) {
  return (
    <group>
      {/* ============================================ */}
      {/* ================= HEAD ==================== */}
      {/* ============================================ */}

      {/* Head base - multiple overlapping spheres for shape */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.26, 48, 48]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Skull back */}
      <mesh position={[0, 1.1, -0.08]} castShadow>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Forehead - prominent */}
      <mesh position={[0, 1.18, 0.08]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Forehead detail */}
      <mesh position={[0, 1.2, 0.12]} castShadow>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Face front - main */}
      <mesh position={[0, 1.0, 0.12]} castShadow>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Face mid */}
      <mesh position={[0, 0.95, 0.14]} castShadow>
        <sphereGeometry args={[0.18, 28, 28]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Cheekbones - left */}
      <mesh position={[-0.14, 0.98, 0.12]} castShadow>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial color="#f5d0c5" />
      </mesh>
      <mesh position={[-0.16, 1.0, 0.08]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#f5d0c5" />
      </mesh>

      {/* Cheekbones - right */}
      <mesh position={[0.14, 0.98, 0.12]} castShadow>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial color="#f5d0c5" />
      </mesh>
      <mesh position={[0.16, 1.0, 0.08]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#f5d0c5" />
      </mesh>

      {/* Temple - left */}
      <mesh position={[-0.2, 1.06, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* Temple - right */}
      <mesh position={[0.2, 1.06, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* Jaw - main */}
      <mesh position={[0, 0.88, 0.1]} castShadow>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* Jaw sides */}
      <mesh position={[-0.1, 0.88, 0.06]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>
      <mesh position={[0.1, 0.88, 0.06]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* Chin - pointed (Jinx has a sharp chin) */}
      <mesh position={[0, 0.8, 0.12]} castShadow>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>
      <mesh position={[0, 0.76, 0.1]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>
      <mesh position={[0, 0.74, 0.08]} castShadow>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* ============================================ */}
      {/* ================= EYES ==================== */}
      {/* ============================================ */}

      {/* Eye sockets - slight indent */}
      <mesh position={[-0.09, 1.04, 0.18]} castShadow>
        <sphereGeometry args={[0.06, 20, 20]} />
        <meshStandardMaterial color="#e8c8c0" />
      </mesh>
      <mesh position={[0.09, 1.04, 0.18]} castShadow>
        <sphereGeometry args={[0.06, 20, 20]} />
        <meshStandardMaterial color="#e8c8c0" />
      </mesh>

      {/* Eyeballs - white with detail */}
      <mesh position={[-0.09, 1.04, 0.23]} castShadow>
        <sphereGeometry args={[0.048, 24, 24]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.09, 1.04, 0.23]} castShadow>
        <sphereGeometry args={[0.048, 24, 24]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Irises - pink/magenta (Jinx's signature) */}
      <mesh position={[-0.09, 1.04, 0.27]} castShadow>
        <sphereGeometry args={[0.032, 20, 20]} />
        <meshStandardMaterial color="#e91e8c" />
      </mesh>
      <mesh position={[0.09, 1.04, 0.27]} castShadow>
        <sphereGeometry args={[0.032, 20, 20]} />
        <meshStandardMaterial color="#e91e8c" />
      </mesh>

      {/* Iris detail rings */}
      <mesh position={[-0.09, 1.04, 0.275]} castShadow>
        <torusGeometry args={[0.025, 0.005, 8, 16]} />
        <meshStandardMaterial color="#c01070" />
      </mesh>
      <mesh position={[0.09, 1.04, 0.275]} castShadow>
        <torusGeometry args={[0.025, 0.005, 8, 16]} />
        <meshStandardMaterial color="#c01070" />
      </mesh>

      {/* Pupils - dark with glow */}
      <mesh position={[-0.09, 1.04, 0.29]} castShadow>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0.09, 1.04, 0.29]} castShadow>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.9} />
      </mesh>

      {/* Eye highlights - multiple */}
      <mesh position={[-0.085, 1.05, 0.28]} castShadow>
        <sphereGeometry args={[0.01, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.095, 1.05, 0.28]} castShadow>
        <sphereGeometry args={[0.01, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.095, 1.03, 0.275]} castShadow>
        <sphereGeometry args={[0.006, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.085, 1.03, 0.275]} castShadow>
        <sphereGeometry args={[0.006, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>

      {/* Eyelids - upper */}
      <mesh position={[-0.09, 1.065, 0.22]} rotation={[0.4, 0, 0]} castShadow>
        <capsuleGeometry args={[0.025, 0.04, 8, 12]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>
      <mesh position={[0.09, 1.065, 0.22]} rotation={[0.4, 0, 0]} castShadow>
        <capsuleGeometry args={[0.025, 0.04, 8, 12]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Eyeliner/eyelashes - detailed */}
      {[-0.09, 0.09].map((x, idx) => (
        <group key={`eyelash-group-${idx}`}>
          {/* Main eyeliner */}
          <mesh position={[x, 1.065, 0.24]} rotation={[0.3, 0, 0]} castShadow>
            <capsuleGeometry args={[0.008, 0.05, 6, 10]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Individual lashes */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={`lash-${idx}-${i}`} position={[x + (i - 2.5) * 0.012, 1.07, 0.24]} rotation={[0.3 + i * 0.05, 0, (i - 2.5) * 0.12 * (x < 0 ? 1 : -1)]} castShadow>
              <cylinderGeometry args={[0.002, 0.001, 0.025, 6]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Eyebrows - cyan with detail */}
      <mesh position={[-0.09, 1.13, 0.18]} rotation={[0.1, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.014, 0.06, 10, 20]} />
        <meshStandardMaterial color="#00b8d4" />
      </mesh>
      <mesh position={[-0.085, 1.135, 0.19]} rotation={[0.1, 0, 0.15]} castShadow>
        <capsuleGeometry args={[0.01, 0.04, 8, 16]} />
        <meshStandardMaterial color="#00d0e8" />
      </mesh>
      <mesh position={[0.09, 1.13, 0.18]} rotation={[0.1, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.014, 0.06, 10, 20]} />
        <meshStandardMaterial color="#00b8d4" />
      </mesh>
      <mesh position={[0.085, 1.135, 0.19]} rotation={[0.1, 0, -0.15]} castShadow>
        <capsuleGeometry args={[0.01, 0.04, 8, 16]} />
        <meshStandardMaterial color="#00d0e8" />
      </mesh>

      {/* ============================================ */}
      {/* ================= NOSE ==================== */}
      {/* ============================================ */}

      {/* Nose bridge - multiple segments */}
      <mesh position={[0, 1.02, 0.2]} rotation={[0.25, 0, 0]} castShadow>
        <capsuleGeometry args={[0.016, 0.05, 10, 20]} />
        <meshStandardMaterial color="#e8c5b8" />
      </mesh>
      <mesh position={[0, 0.98, 0.22]} rotation={[0.3, 0, 0]} castShadow>
        <capsuleGeometry args={[0.018, 0.04, 10, 20]} />
        <meshStandardMaterial color="#e8c5b8" />
      </mesh>

      {/* Nose tip - cute upturned */}
      <mesh position={[0, 0.94, 0.26]} castShadow>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshStandardMaterial color="#eac8b8" />
      </mesh>
      <mesh position={[0, 0.935, 0.27]} castShadow>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#e8c5b5" />
      </mesh>

      {/* Nostrils - detailed */}
      <mesh position={[-0.018, 0.93, 0.25]} castShadow>
        <sphereGeometry args={[0.012, 10, 10]} />
        <meshStandardMaterial color="#d8b5a8" />
      </mesh>
      <mesh position={[0.018, 0.93, 0.25]} castShadow>
        <sphereGeometry args={[0.012, 10, 10]} />
        <meshStandardMaterial color="#d8b5a8" />
      </mesh>
      {/* Nostril holes */}
      <mesh position={[-0.015, 0.925, 0.255]} castShadow>
        <sphereGeometry args={[0.006, 8, 8]} />
        <meshStandardMaterial color="#a08078" />
      </mesh>
      <mesh position={[0.015, 0.925, 0.255]} castShadow>
        <sphereGeometry args={[0.006, 8, 8]} />
        <meshStandardMaterial color="#a08078" />
      </mesh>

      {/* Nose sides */}
      <mesh position={[-0.03, 0.96, 0.2]} castShadow>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#e8c8bc" />
      </mesh>
      <mesh position={[0.03, 0.96, 0.2]} castShadow>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#e8c8bc" />
      </mesh>

      {/* ============================================ */}
      {/* ================= MOUTH =================== */}
      {/* ============================================ */}

      {/* Upper lip - detailed with cupid's bow */}
      <mesh position={[0, 0.865, 0.2]} castShadow>
        <capsuleGeometry args={[0.016, 0.05, 10, 20]} />
        <meshStandardMaterial color="#d07070" />
      </mesh>
      <mesh position={[-0.015, 0.868, 0.205]} castShadow>
        <sphereGeometry args={[0.012, 10, 10]} />
        <meshStandardMaterial color="#d57575" />
      </mesh>
      <mesh position={[0.015, 0.868, 0.205]} castShadow>
        <sphereGeometry args={[0.012, 10, 10]} />
        <meshStandardMaterial color="#d57575" />
      </mesh>

      {/* Lower lip - fuller */}
      <mesh position={[0, 0.84, 0.19]} castShadow>
        <capsuleGeometry args={[0.02, 0.045, 10, 20]} />
        <meshStandardMaterial color="#c86868" />
      </mesh>
      <mesh position={[0, 0.835, 0.195]} castShadow>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial color="#d07070" />
      </mesh>

      {/* Lip line/crease */}
      <mesh position={[0, 0.85, 0.21]} castShadow>
        <capsuleGeometry args={[0.004, 0.04, 6, 10]} />
        <meshStandardMaterial color="#a05050" />
      </mesh>

      {/* Smirk corners - Jinx's signature smile */}
      <mesh position={[-0.038, 0.858, 0.18]} castShadow>
        <sphereGeometry args={[0.014, 10, 10]} />
        <meshStandardMaterial color="#d07070" />
      </mesh>
      <mesh position={[0.038, 0.852, 0.18]} castShadow>
        <sphereGeometry args={[0.012, 10, 10]} />
        <meshStandardMaterial color="#d07070" />
      </mesh>

      {/* ============================================ */}
      {/* ================= EARS ==================== */}
      {/* ============================================ */}

      {/* Ears - mostly hidden by hair but visible */}
      <mesh position={[-0.22, 1.0, -0.02]} rotation={[0, -0.3, 0.1]} castShadow>
        <capsuleGeometry args={[0.025, 0.04, 8, 12]} />
        <meshStandardMaterial color="#f0d0c5" />
      </mesh>
      <mesh position={[0.22, 1.0, -0.02]} rotation={[0, 0.3, -0.1]} castShadow>
        <capsuleGeometry args={[0.025, 0.04, 8, 12]} />
        <meshStandardMaterial color="#f0d0c5" />
      </mesh>

      {/* ============================================ */}
      {/* ================= HAIR ==================== */}
      {/* ============================================ */}

      {/* Main hair volume - layered for depth */}
      <mesh position={[0, 1.24, -0.02]} castShadow>
        <sphereGeometry args={[0.32, 48, 48]} />
        <meshStandardMaterial color="#00d4e8" />
      </mesh>
      <mesh position={[0, 1.28, 0.02]} castShadow>
        <sphereGeometry args={[0.26, 40, 40]} />
        <meshStandardMaterial color="#00daf0" />
      </mesh>
      <mesh position={[0, 1.22, -0.1]} castShadow>
        <sphereGeometry args={[0.28, 36, 36]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>

      {/* Hair front swoosh - layered */}
      <mesh position={[0, 1.26, 0.12]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#00daf0" />
      </mesh>
      <mesh position={[0.05, 1.24, 0.14]} castShadow>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#00e0f8" />
      </mesh>
      <mesh position={[-0.05, 1.25, 0.13]} castShadow>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color="#00d8f0" />
      </mesh>

      {/* Hair spikes/strands on top - more detailed */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const heightVar = (i % 3) * 0.02
        return (
          <group key={`spike-group-${i}`}>
            <mesh position={[Math.sin(angle) * 0.16, 1.38 + heightVar, Math.cos(angle) * 0.1 - 0.05]} rotation={[Math.cos(angle) * 0.35, 0, Math.sin(angle) * 0.35]} castShadow>
              <coneGeometry args={[0.045, 0.18, 12]} />
              <meshStandardMaterial color="#00c8dc" />
            </mesh>
            {/* Smaller secondary spikes */}
            <mesh position={[Math.sin(angle + 0.15) * 0.14, 1.34 + heightVar, Math.cos(angle + 0.15) * 0.08 - 0.04]} rotation={[Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3]} castShadow>
              <coneGeometry args={[0.025, 0.1, 8]} />
              <meshStandardMaterial color="#00d4e8" />
            </mesh>
          </group>
        )
      })}

      {/* Hair sides - left - layered */}
      <mesh position={[-0.28, 1.08, -0.02]} castShadow>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>
      <mesh position={[-0.32, 0.98, -0.05]} castShadow>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color="#00c0d4" />
      </mesh>
      <mesh position={[-0.3, 0.88, -0.06]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00b8cc" />
      </mesh>

      {/* Hair sides - right - layered */}
      <mesh position={[0.28, 1.08, -0.02]} castShadow>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>
      <mesh position={[0.32, 0.98, -0.05]} castShadow>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color="#00c0d4" />
      </mesh>
      <mesh position={[0.3, 0.88, -0.06]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00b8cc" />
      </mesh>

      {/* Hair back - multiple layers */}
      <mesh position={[0, 1.08, -0.2]} castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#00b8cc" />
      </mesh>
      <mesh position={[0, 0.95, -0.24]} castShadow>
        <sphereGeometry args={[0.22, 28, 28]} />
        <meshStandardMaterial color="#00a8bc" />
      </mesh>
      <mesh position={[0, 0.82, -0.22]} castShadow>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#00a0b4" />
      </mesh>

      {/* ============================================ */}
      {/* ================= BRAIDS ================== */}
      {/* ============================================ */}

      {/* Left braid - 18 segments for extra smoothness */}
      {[...Array(18)].map((_, i) => {
        const yPos = 0.72 - i * 0.14
        const zPos = -0.12 - i * 0.012
        const xPos = -0.38 - Math.sin(i * 0.4) * 0.04
        const size = 0.08 - i * 0.003
        const twist = i * 0.3
        return (
          <group key={`lbraid-group-${i}`}>
            {/* Main braid segment */}
            <mesh position={[xPos, yPos, zPos]} rotation={[0, 0, twist]} castShadow>
              <sphereGeometry args={[Math.max(size, 0.025), 20, 20]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#00d4e8" : "#00b8cc"} />
            </mesh>
            {/* Braid strand detail */}
            <mesh position={[xPos - 0.02, yPos + 0.02, zPos + 0.01]} rotation={[0, twist, 0]} castShadow>
              <sphereGeometry args={[Math.max(size * 0.5, 0.015), 12, 12]} />
              <meshStandardMaterial color="#00c0d8" />
            </mesh>
            <mesh position={[xPos + 0.02, yPos - 0.01, zPos - 0.01]} rotation={[0, -twist, 0]} castShadow>
              <sphereGeometry args={[Math.max(size * 0.5, 0.015), 12, 12]} />
              <meshStandardMaterial color="#00c8e0" />
            </mesh>
          </group>
        )
      })}

      {/* Left braid twist details - more segments */}
      {[...Array(9)].map((_, i) => (
        <mesh key={`ltwist-${i}`} position={[-0.38, 0.55 - i * 0.22, -0.13 - i * 0.015]} rotation={[0.1, 0, i * 0.35]} castShadow>
          <torusGeometry args={[0.055, 0.012, 10, 16, Math.PI]} />
          <meshStandardMaterial color="#00a0b0" />
        </mesh>
      ))}

      {/* Left braid gold bands - more detailed */}
      {[[0.48, 0.09], [0.08, 0.075], [-0.35, 0.06], [-0.75, 0.05]].map(([y, size], i) => (
        <group key={`lband-${i}`}>
          <mesh position={[-0.38, y, -0.14 - i * 0.02]} castShadow>
            <cylinderGeometry args={[size, size, 0.06, 20]} />
            <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Band detail rings */}
          <mesh position={[-0.38, y + 0.025, -0.14 - i * 0.02]} castShadow>
            <torusGeometry args={[size - 0.005, 0.008, 8, 20]} />
            <meshStandardMaterial color="#b08010" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-0.38, y - 0.025, -0.14 - i * 0.02]} castShadow>
            <torusGeometry args={[size - 0.005, 0.008, 8, 20]} />
            <meshStandardMaterial color="#b08010" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Left braid tip - flowing with detail */}
      <mesh position={[-0.38, -0.95, -0.24]} rotation={[0.25, 0, 0.15]} castShadow>
        <coneGeometry args={[0.045, 0.3, 16]} />
        <meshStandardMaterial color="#00d4e8" />
      </mesh>
      <mesh position={[-0.4, -1.15, -0.26]} rotation={[0.35, 0, 0.25]} castShadow>
        <coneGeometry args={[0.03, 0.2, 12]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>
      <mesh position={[-0.42, -1.28, -0.28]} rotation={[0.4, 0, 0.3]} castShadow>
        <coneGeometry args={[0.02, 0.12, 10]} />
        <meshStandardMaterial color="#00c0d4" />
      </mesh>

      {/* Right braid - 18 segments */}
      {[...Array(18)].map((_, i) => {
        const yPos = 0.72 - i * 0.14
        const zPos = -0.12 - i * 0.012
        const xPos = 0.38 + Math.sin(i * 0.4) * 0.04
        const size = 0.08 - i * 0.003
        const twist = -i * 0.3
        return (
          <group key={`rbraid-group-${i}`}>
            <mesh position={[xPos, yPos, zPos]} rotation={[0, 0, twist]} castShadow>
              <sphereGeometry args={[Math.max(size, 0.025), 20, 20]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#00d4e8" : "#00b8cc"} />
            </mesh>
            <mesh position={[xPos + 0.02, yPos + 0.02, zPos + 0.01]} rotation={[0, twist, 0]} castShadow>
              <sphereGeometry args={[Math.max(size * 0.5, 0.015), 12, 12]} />
              <meshStandardMaterial color="#00c0d8" />
            </mesh>
            <mesh position={[xPos - 0.02, yPos - 0.01, zPos - 0.01]} rotation={[0, -twist, 0]} castShadow>
              <sphereGeometry args={[Math.max(size * 0.5, 0.015), 12, 12]} />
              <meshStandardMaterial color="#00c8e0" />
            </mesh>
          </group>
        )
      })}

      {/* Right braid twist details */}
      {[...Array(9)].map((_, i) => (
        <mesh key={`rtwist-${i}`} position={[0.38, 0.55 - i * 0.22, -0.13 - i * 0.015]} rotation={[0.1, 0, -i * 0.35]} castShadow>
          <torusGeometry args={[0.055, 0.012, 10, 16, Math.PI]} />
          <meshStandardMaterial color="#00a0b0" />
        </mesh>
      ))}

      {/* Right braid gold bands */}
      {[[0.48, 0.09], [0.08, 0.075], [-0.35, 0.06], [-0.75, 0.05]].map(([y, size], i) => (
        <group key={`rband-${i}`}>
          <mesh position={[0.38, y, -0.14 - i * 0.02]} castShadow>
            <cylinderGeometry args={[size, size, 0.06, 20]} />
            <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.38, y + 0.025, -0.14 - i * 0.02]} castShadow>
            <torusGeometry args={[size - 0.005, 0.008, 8, 20]} />
            <meshStandardMaterial color="#b08010" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.38, y - 0.025, -0.14 - i * 0.02]} castShadow>
            <torusGeometry args={[size - 0.005, 0.008, 8, 20]} />
            <meshStandardMaterial color="#b08010" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Right braid tip */}
      <mesh position={[0.38, -0.95, -0.24]} rotation={[0.25, 0, -0.15]} castShadow>
        <coneGeometry args={[0.045, 0.3, 16]} />
        <meshStandardMaterial color="#00d4e8" />
      </mesh>
      <mesh position={[0.4, -1.15, -0.26]} rotation={[0.35, 0, -0.25]} castShadow>
        <coneGeometry args={[0.03, 0.2, 12]} />
        <meshStandardMaterial color="#00c8dc" />
      </mesh>
      <mesh position={[0.42, -1.28, -0.28]} rotation={[0.4, 0, -0.3]} castShadow>
        <coneGeometry args={[0.02, 0.12, 10]} />
        <meshStandardMaterial color="#00c0d4" />
      </mesh>

      {/* ============================================ */}
      {/* ================= NECK ==================== */}
      {/* ============================================ */}

      {/* Neck - detailed with segments */}
      <mesh position={[0, 0.7, 0.02]} castShadow>
        <cylinderGeometry args={[0.075, 0.095, 0.14, 24]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>
      <mesh position={[0, 0.66, 0.02]} castShadow>
        <cylinderGeometry args={[0.08, 0.075, 0.06, 20]} />
        <meshStandardMaterial color="#efd0c5" />
      </mesh>

      {/* Neck muscles/tendons hint */}
      <mesh position={[-0.04, 0.68, 0.05]} rotation={[0.2, 0, 0.15]} castShadow>
        <capsuleGeometry args={[0.015, 0.08, 8, 12]} />
        <meshStandardMaterial color="#e8c8bc" />
      </mesh>
      <mesh position={[0.04, 0.68, 0.05]} rotation={[0.2, 0, -0.15]} castShadow>
        <capsuleGeometry args={[0.015, 0.08, 8, 12]} />
        <meshStandardMaterial color="#e8c8bc" />
      </mesh>

      {/* Choker - detailed */}
      <mesh position={[0, 0.64, 0.02]} castShadow>
        <cylinderGeometry args={[0.095, 0.095, 0.035, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Choker edge details */}
      <mesh position={[0, 0.655, 0.02]} castShadow>
        <torusGeometry args={[0.093, 0.006, 8, 32]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, 0.625, 0.02]} castShadow>
        <torusGeometry args={[0.093, 0.006, 8, 32]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Choker pendant/gem */}
      <mesh position={[0, 0.64, 0.115]} castShadow>
        <octahedronGeometry args={[0.03, 0]} />
        <meshStandardMaterial color="#8040c0" emissive="#8040c0" emissiveIntensity={0.4} />
      </mesh>
      {/* Pendant setting */}
      <mesh position={[0, 0.64, 0.1]} castShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.015, 8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ============================================ */}
      {/* ================= TORSO =================== */}
      {/* ============================================ */}

      {/* Shoulders/clavicle area */}
      <mesh position={[0, 0.56, 0.02]} castShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.1, 32]} />
        <meshStandardMaterial color="#5c4a3d" />
      </mesh>

      {/* Upper chest */}
      <mesh position={[0, 0.48, 0.03]} castShadow>
        <cylinderGeometry args={[0.23, 0.22, 0.12, 32]} />
        <meshStandardMaterial color="#5c4a3d" />
      </mesh>

      {/* Chest detail - crop top with straps */}
      <mesh position={[0, 0.4, 0.03]} castShadow>
        <cylinderGeometry args={[0.22, 0.21, 0.14, 32]} />
        <meshStandardMaterial color="#5c4a3d" />
      </mesh>

      {/* Chest sides/ribs hint */}
      <mesh position={[-0.18, 0.42, 0.05]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.05, 0.1, 8, 12]} />
        <meshStandardMaterial color="#5a483b" />
      </mesh>
      <mesh position={[0.18, 0.42, 0.05]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.05, 0.1, 8, 12]} />
        <meshStandardMaterial color="#5a483b" />
      </mesh>

      {/* Crop top straps - detailed */}
      <mesh position={[-0.13, 0.54, 0.1]} rotation={[0.2, 0, 0.35]} castShadow>
        <boxGeometry args={[0.045, 0.18, 0.025]} />
        <meshStandardMaterial color="#4a3a2d" />
      </mesh>
      <mesh position={[0.13, 0.54, 0.1]} rotation={[0.2, 0, -0.35]} castShadow>
        <boxGeometry args={[0.045, 0.18, 0.025]} />
        <meshStandardMaterial color="#4a3a2d" />
      </mesh>
      {/* Strap buckles */}
      <mesh position={[-0.11, 0.48, 0.12]} castShadow>
        <boxGeometry args={[0.025, 0.02, 0.015]} />
        <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.11, 0.48, 0.12]} castShadow>
        <boxGeometry args={[0.025, 0.02, 0.015]} />
        <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Cross strap on back (visible from front) */}
      <mesh position={[0, 0.5, -0.12]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.02]} />
        <meshStandardMaterial color="#4a3a2d" />
      </mesh>
      <mesh position={[0, 0.5, -0.12]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.02]} />
        <meshStandardMaterial color="#4a3a2d" />
      </mesh>

      {/* Midriff - exposed skin - detailed */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.19, 0.12, 32]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.17, 0.08, 32]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.165, 0.16, 0.06, 32]} />
        <meshStandardMaterial color="#f0d5ca" />
      </mesh>

      {/* Abs hint */}
      <mesh position={[0, 0.26, 0.14]} castShadow>
        <boxGeometry args={[0.08, 0.12, 0.03]} />
        <meshStandardMaterial color="#e8cdc2" />
      </mesh>

      {/* Belly button */}
      <mesh position={[0, 0.2, 0.155]} castShadow>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial color="#d8b8a8" />
      </mesh>
      <mesh position={[0, 0.2, 0.16]} castShadow>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color="#c8a898" />
      </mesh>

      {/* Tattoos - cloud/swirl pattern on midriff - more detailed */}
      {[
        [0.11, 0.26, 0.14, 0.038],
        [-0.09, 0.29, 0.13, 0.028],
        [0.13, 0.21, 0.15, 0.022],
        [-0.11, 0.23, 0.14, 0.032],
        [0.08, 0.32, 0.12, 0.025],
        [-0.12, 0.18, 0.15, 0.02],
      ].map(([x, y, z, size], i) => (
        <group key={`tat-group-${i}`}>
          <mesh position={[x, y, z]} rotation={[0, 0, i * 0.6]} castShadow>
            <torusGeometry args={[size, 0.006, 10, 20]} />
            <meshStandardMaterial color="#5080a0" transparent opacity={0.75} />
          </mesh>
          {/* Tattoo inner detail */}
          <mesh position={[x, y, z + 0.005]} rotation={[0, 0, i * 0.6 + 0.5]} castShadow>
            <torusGeometry args={[size * 0.6, 0.004, 8, 16]} />
            <meshStandardMaterial color="#6090b0" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* ============================================ */}
      {/* ================= HIPS ==================== */}
      {/* ============================================ */}

      {/* Hip area - the missing piece! */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.19, 0.18, 0.1, 32]} />
        <meshStandardMaterial color="#4a3830" />
      </mesh>

      {/* Hip bones/iliac crest */}
      <mesh position={[-0.14, 0.1, 0.08]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#4a3830" />
      </mesh>
      <mesh position={[0.14, 0.1, 0.08]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#4a3830" />
      </mesh>

      {/* Lower hip/pelvis transition */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.19, 0.08, 32]} />
        <meshStandardMaterial color="#9a4070" />
      </mesh>

      {/* Hip joint spheres - connecting to legs */}
      <mesh position={[-0.12, -0.02, 0]} castShadow>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshStandardMaterial color="#9a4070" />
      </mesh>
      <mesh position={[0.12, -0.02, 0]} castShadow>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshStandardMaterial color="#9a4070" />
      </mesh>

      {/* Belt - detailed with segments */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.195, 0.19, 0.06, 32]} />
        <meshStandardMaterial color="#4a3830" />
      </mesh>
      {/* Belt edge details */}
      <mesh position={[0, 0.125, 0]} castShadow>
        <torusGeometry args={[0.19, 0.012, 10, 32]} />
        <meshStandardMaterial color="#3a2820" />
      </mesh>
      <mesh position={[0, 0.075, 0]} castShadow>
        <torusGeometry args={[0.19, 0.012, 10, 32]} />
        <meshStandardMaterial color="#3a2820" />
      </mesh>

      {/* Belt buckle - more detailed */}
      <mesh position={[0, 0.1, 0.18]} castShadow>
        <boxGeometry args={[0.12, 0.07, 0.03]} />
        <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.1, 0.195]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.015]} />
        <meshStandardMaterial color="#b08010" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Buckle prong */}
      <mesh position={[0, 0.1, 0.2]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.04, 8]} />
        <meshStandardMaterial color="#c09018" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Belt pouches - left */}
      <mesh position={[-0.16, 0.08, 0.12]} castShadow>
        <boxGeometry args={[0.06, 0.07, 0.045]} />
        <meshStandardMaterial color="#3a2820" />
      </mesh>
      <mesh position={[-0.16, 0.105, 0.12]} castShadow>
        <boxGeometry args={[0.065, 0.02, 0.05]} />
        <meshStandardMaterial color="#4a3830" />
      </mesh>

      {/* Belt pouches - right */}
      <mesh position={[0.16, 0.08, 0.12]} castShadow>
        <boxGeometry args={[0.06, 0.07, 0.045]} />
        <meshStandardMaterial color="#3a2820" />
      </mesh>
      <mesh position={[0.16, 0.105, 0.12]} castShadow>
        <boxGeometry args={[0.065, 0.02, 0.05]} />
        <meshStandardMaterial color="#4a3830" />
      </mesh>

      {/* Side pouches */}
      <mesh position={[-0.19, 0.06, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.05]} />
        <meshStandardMaterial color="#3a2820" />
      </mesh>
      <mesh position={[0.19, 0.06, 0]} rotation={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.05]} />
        <meshStandardMaterial color="#3a2820" />
      </mesh>

      {/* ============================================ */}
      {/* ================= ARMS ==================== */}
      {/* ============================================ */}

      {/* Left Arm Group - for animation */}
      <group name="leftArm" position={[-0.28, 0.52, 0]}>
        {/* Left shoulder - detailed */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[-0.02, 0.02, 0]} castShadow>
          <sphereGeometry args={[0.06, 20, 20]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Left deltoid */}
        <mesh position={[-0.02, -0.05, 0]} castShadow>
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>

        {/* Left upper arm - bicep/tricep */}
        <mesh position={[-0.04, -0.15, 0]} rotation={[0, 0, 0.15]} castShadow>
          <capsuleGeometry args={[0.055, 0.18, 16, 24]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        {/* Bicep detail */}
        <mesh position={[-0.03, -0.12, 0.03]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Left elbow */}
        <mesh position={[-0.08, -0.32, 0.02]} castShadow>
          <sphereGeometry args={[0.05, 20, 20]} />
          <meshStandardMaterial color="#e8cdc2" />
        </mesh>

        {/* Left forearm */}
        <mesh position={[-0.12, -0.46, 0.06]} rotation={[0.4, 0, 0.25]} castShadow>
          <capsuleGeometry args={[0.045, 0.2, 16, 24]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        {/* Forearm muscle detail */}
        <mesh position={[-0.1, -0.38, 0.07]} castShadow>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Left arm tattoos - more detailed */}
        <mesh position={[-0.1, -0.38, 0.1]} rotation={[0.5, 0.2, 0.3]} castShadow>
          <torusGeometry args={[0.035, 0.006, 10, 16]} />
          <meshStandardMaterial color="#5080a0" transparent opacity={0.75} />
        </mesh>
        <mesh position={[-0.08, -0.42, 0.09]} rotation={[0.4, 0.1, 0.2]} castShadow>
          <torusGeometry args={[0.025, 0.005, 8, 14]} />
          <meshStandardMaterial color="#5080a0" transparent opacity={0.7} />
        </mesh>

        {/* Left bracer/glove - detailed */}
        <mesh position={[-0.16, -0.56, 0.1]} rotation={[0.4, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.052, 0.058, 0.12, 20]} />
          <meshStandardMaterial color="#6040a0" />
        </mesh>
        {/* Bracer ridges */}
        {[0, 1, 2].map((i) => (
          <mesh key={`lbracer-${i}`} position={[-0.16, -0.52 - i * 0.04, 0.1]} rotation={[0.4, 0, 0.3]} castShadow>
            <torusGeometry args={[0.054, 0.008, 8, 20]} />
            <meshStandardMaterial color="#5030a0" />
          </mesh>
        ))}
        <mesh position={[-0.17, -0.6, 0.12]} rotation={[0.4, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.055, 0.05, 0.05, 20]} />
          <meshStandardMaterial color="#5030a0" />
        </mesh>

        {/* Left hand - detailed */}
        <mesh position={[-0.19, -0.64, 0.15]} castShadow>
          <sphereGeometry args={[0.045, 20, 20]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        {/* Palm */}
        <mesh position={[-0.19, -0.66, 0.16]} castShadow>
          <boxGeometry args={[0.06, 0.05, 0.03]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Left fingers - more detailed */}
        {[0, 1, 2, 3].map((i) => (
          <group key={`lfinger-group-${i}`}>
            {/* Finger base */}
            <mesh position={[-0.2 + i * 0.018, -0.68, 0.17 + i * 0.008]} rotation={[0.5, 0, 0]} castShadow>
              <capsuleGeometry args={[0.01, 0.035, 8, 12]} />
              <meshStandardMaterial color="#e8cdc2" />
            </mesh>
            {/* Finger tip */}
            <mesh position={[-0.2 + i * 0.018, -0.72, 0.19 + i * 0.01]} rotation={[0.6, 0, 0]} castShadow>
              <capsuleGeometry args={[0.008, 0.025, 6, 10]} />
              <meshStandardMaterial color="#e8cdc2" />
            </mesh>
          </group>
        ))}
        {/* Thumb */}
        <mesh position={[-0.16, -0.66, 0.17]} rotation={[0.3, 0.3, 0.5]} castShadow>
          <capsuleGeometry args={[0.012, 0.03, 8, 12]} />
          <meshStandardMaterial color="#e8cdc2" />
        </mesh>
      </group>

      {/* Right Arm Group - for animation */}
      <group name="rightArm" position={[0.28, 0.52, 0]}>
        {/* Right shoulder - detailed */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[0.02, 0.02, 0]} castShadow>
          <sphereGeometry args={[0.06, 20, 20]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Right deltoid */}
        <mesh position={[0.02, -0.05, 0]} castShadow>
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>

        {/* Right upper arm */}
        <mesh position={[0.04, -0.15, 0]} rotation={[0, 0, -0.15]} castShadow>
          <capsuleGeometry args={[0.055, 0.18, 16, 24]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[0.03, -0.12, 0.03]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Right elbow */}
        <mesh position={[0.08, -0.32, 0.02]} castShadow>
          <sphereGeometry args={[0.05, 20, 20]} />
          <meshStandardMaterial color="#e8cdc2" />
        </mesh>

        {/* Right forearm */}
        <mesh position={[0.12, -0.46, 0.06]} rotation={[0.4, 0, -0.25]} castShadow>
          <capsuleGeometry args={[0.045, 0.2, 16, 24]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[0.1, -0.38, 0.07]} castShadow>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Right arm tattoos */}
        <mesh position={[0.1, -0.38, 0.1]} rotation={[0.5, -0.2, -0.3]} castShadow>
          <torusGeometry args={[0.035, 0.006, 10, 16]} />
          <meshStandardMaterial color="#5080a0" transparent opacity={0.75} />
        </mesh>
        <mesh position={[0.08, -0.42, 0.09]} rotation={[0.4, -0.1, -0.2]} castShadow>
          <torusGeometry args={[0.025, 0.005, 8, 14]} />
          <meshStandardMaterial color="#5080a0" transparent opacity={0.7} />
        </mesh>

        {/* Right bracer/glove */}
        <mesh position={[0.16, -0.56, 0.1]} rotation={[0.4, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.052, 0.058, 0.12, 20]} />
          <meshStandardMaterial color="#6040a0" />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={`rbracer-${i}`} position={[0.16, -0.52 - i * 0.04, 0.1]} rotation={[0.4, 0, -0.3]} castShadow>
            <torusGeometry args={[0.054, 0.008, 8, 20]} />
            <meshStandardMaterial color="#5030a0" />
          </mesh>
        ))}
        <mesh position={[0.17, -0.6, 0.12]} rotation={[0.4, 0, -0.3]} castShadow>
          <cylinderGeometry args={[0.055, 0.05, 0.05, 20]} />
          <meshStandardMaterial color="#5030a0" />
        </mesh>

        {/* Right hand */}
        <mesh position={[0.19, -0.64, 0.15]} castShadow>
          <sphereGeometry args={[0.045, 20, 20]} />
          <meshStandardMaterial color="#f0d5ca" />
        </mesh>
        <mesh position={[0.19, -0.66, 0.16]} castShadow>
          <boxGeometry args={[0.06, 0.05, 0.03]} />
          <meshStandardMaterial color="#efd0c8" />
        </mesh>

        {/* Right fingers */}
        {[0, 1, 2, 3].map((i) => (
          <group key={`rfinger-group-${i}`}>
            <mesh position={[0.2 - i * 0.018, -0.68, 0.17 + i * 0.008]} rotation={[0.5, 0, 0]} castShadow>
              <capsuleGeometry args={[0.01, 0.035, 8, 12]} />
              <meshStandardMaterial color="#e8cdc2" />
            </mesh>
            <mesh position={[0.2 - i * 0.018, -0.72, 0.19 + i * 0.01]} rotation={[0.6, 0, 0]} castShadow>
              <capsuleGeometry args={[0.008, 0.025, 6, 10]} />
              <meshStandardMaterial color="#e8cdc2" />
            </mesh>
          </group>
        ))}
        {/* Thumb */}
        <mesh position={[0.16, -0.66, 0.17]} rotation={[0.3, -0.3, -0.5]} castShadow>
          <capsuleGeometry args={[0.012, 0.03, 8, 12]} />
          <meshStandardMaterial color="#e8cdc2" />
        </mesh>
      </group>

      {/* ============================================ */}
      {/* ================= WEAPONS ================= */}
      {/* ============================================ */}

      {!usingRockets ? (
        // Pow-Pow (Minigun) - highly detailed
        <group position={[0.52, 0.02, 0.2]} rotation={[0.1, 0.2, -0.35]}>
          {/* Main body - bronze/gold with detail */}
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.24, 0.24]} />
            <meshStandardMaterial color="#8b7014" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Body detail panels - top */}
          <mesh position={[0, 0.125, 0]} castShadow>
            <boxGeometry args={[0.55, 0.025, 0.2]} />
            <meshStandardMaterial color="#6b5010" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Body detail panels - bottom */}
          <mesh position={[0, -0.125, 0]} castShadow>
            <boxGeometry args={[0.55, 0.025, 0.2]} />
            <meshStandardMaterial color="#6b5010" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Side panels */}
          <mesh position={[0, 0, 0.125]} castShadow>
            <boxGeometry args={[0.55, 0.2, 0.025]} />
            <meshStandardMaterial color="#7a6012" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, -0.125]} castShadow>
            <boxGeometry args={[0.55, 0.2, 0.025]} />
            <meshStandardMaterial color="#7a6012" metalness={0.6} roughness={0.4} />
          </mesh>

          {/* Rear grip assembly */}
          <mesh position={[-0.22, -0.2, 0]} castShadow>
            <boxGeometry args={[0.12, 0.2, 0.1]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>
          <mesh position={[-0.22, -0.28, 0.02]} rotation={[0.35, 0, 0]} castShadow>
            <boxGeometry args={[0.1, 0.12, 0.08]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>
          {/* Grip texture */}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={`grip-${i}`} position={[-0.22, -0.14 - i * 0.04, 0.052]} castShadow>
              <boxGeometry args={[0.11, 0.015, 0.01]} />
              <meshStandardMaterial color="#2a1a10" />
            </mesh>
          ))}

          {/* Front grip */}
          <mesh position={[0.12, -0.17, 0]} castShadow>
            <boxGeometry args={[0.07, 0.14, 0.07]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>

          {/* Barrel housing - cylindrical */}
          <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.16, 0.18, 0.22, 32]} />
            <meshStandardMaterial color="#6b5010" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Barrel housing front plate */}
          <mesh position={[0.46, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.13, 0.16, 0.025, 32]} />
            <meshStandardMaterial color="#5a4008" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Barrel rotation mechanism */}
          <mesh position={[0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.06, 24]} />
            <meshStandardMaterial color="#4a3008" metalness={0.6} roughness={0.4} />
          </mesh>

          {/* Purple barrels - 3 in triangle formation with full detail */}
          {[[0, 0.08], [0.07, -0.04], [-0.07, -0.04]].map(([y, z], i) => (
            <group key={`barrel-full-${i}`}>
              {/* Barrel body */}
              <mesh position={[0.58, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.038, 0.038, 0.4, 20]} />
                <meshStandardMaterial color="#6040a0" metalness={0.6} roughness={0.3} />
              </mesh>
              {/* Barrel ridges */}
              {[0, 1, 2].map((j) => (
                <mesh key={`ridge-${i}-${j}`} position={[0.45 + j * 0.1, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                  <torusGeometry args={[0.04, 0.006, 8, 20]} />
                  <meshStandardMaterial color="#5030a0" />
                </mesh>
              ))}
              {/* Barrel tip */}
              <mesh position={[0.78, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.028, 0.038, 0.05, 20]} />
                <meshStandardMaterial color="#4030a0" metalness={0.7} roughness={0.2} />
              </mesh>
              {/* Barrel inner */}
              <mesh position={[0.82, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.025, 16]} />
                <meshStandardMaterial color="#1a1020" />
              </mesh>
              {/* Muzzle flash hint */}
              <mesh position={[0.83, y, z]} castShadow>
                <sphereGeometry args={[0.015, 12, 12]} />
                <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={0.3} />
              </mesh>
            </group>
          ))}

          {/* Ammo drum - detailed */}
          <mesh position={[-0.06, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.14, 24]} />
            <meshStandardMaterial color="#5a4a10" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Ammo drum ridges */}
          {[0, 1, 2].map((i) => (
            <mesh key={`drum-${i}`} position={[-0.06, 0.2, 0.05 - i * 0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <torusGeometry args={[0.115, 0.01, 8, 24]} />
              <meshStandardMaterial color="#4a3a08" metalness={0.6} roughness={0.4} />
            </mesh>
          ))}
          {/* Ammo drum cap */}
          <mesh position={[-0.06, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.025, 24]} />
            <meshStandardMaterial color="#4a3a08" metalness={0.6} roughness={0.4} />
          </mesh>

          {/* Sight - more detailed */}
          <mesh position={[0.16, 0.15, 0]} castShadow>
            <boxGeometry args={[0.1, 0.05, 0.04]} />
            <meshStandardMaterial color="#3a3a3a" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[0.16, 0.18, 0]} castShadow>
            <boxGeometry args={[0.02, 0.03, 0.025]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>

          {/* Gold trim details */}
          <mesh position={[0.26, 0, 0.125]} castShadow>
            <boxGeometry args={[0.18, 0.05, 0.015]} />
            <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.26, 0, -0.125]} castShadow>
            <boxGeometry args={[0.18, 0.05, 0.015]} />
            <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.26, 0.125, 0]} castShadow>
            <boxGeometry args={[0.18, 0.015, 0.05]} />
            <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ) : (
        // Fishbones (Rocket Launcher) - highly detailed shark
        <group position={[0.45, 0.38, 0.14]} rotation={[-0.15, 0.1, -0.4]}>
          {/* Main body */}
          <mesh castShadow>
            <boxGeometry args={[0.75, 0.3, 0.3]} />
            <meshStandardMaterial color="#5a5a5a" metalness={0.5} roughness={0.4} />
          </mesh>

          {/* Body panel details */}
          <mesh position={[0, 0.155, 0]} castShadow>
            <boxGeometry args={[0.7, 0.025, 0.26]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.155, 0]} castShadow>
            <boxGeometry args={[0.7, 0.025, 0.26]} />
            <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.4} />
          </mesh>

          {/* Shark head/nose - detailed */}
          <mesh position={[0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <coneGeometry args={[0.18, 0.4, 20]} />
            <meshStandardMaterial color="#505050" metalness={0.5} roughness={0.4} />
          </mesh>

          {/* Shark jaw - lower */}
          <mesh position={[0.55, -0.1, 0]} rotation={[0, 0, Math.PI / 2 + 0.35]} castShadow>
            <coneGeometry args={[0.12, 0.25, 16]} />
            <meshStandardMaterial color="#484848" metalness={0.5} roughness={0.4} />
          </mesh>

          {/* Shark teeth - top row - more teeth */}
          {[-0.12, -0.06, 0, 0.06, 0.12].map((z, i) => (
            <mesh key={`ttooth-${i}`} position={[0.6, 0.1, z]} castShadow>
              <coneGeometry args={[0.02, 0.08, 8]} />
              <meshStandardMaterial color="#f8f8f8" />
            </mesh>
          ))}

          {/* Shark teeth - bottom row */}
          {[-0.1, -0.04, 0.04, 0.1].map((z, i) => (
            <mesh key={`btooth-${i}`} position={[0.56, -0.08, z]} rotation={[Math.PI, 0, 0]} castShadow>
              <coneGeometry args={[0.018, 0.065, 8]} />
              <meshStandardMaterial color="#f8f8f8" />
            </mesh>
          ))}

          {/* Shark eyes - glowing pink */}
          <mesh position={[0.32, 0.12, 0.16]} castShadow>
            <sphereGeometry args={[0.045, 20, 20]} />
            <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0.32, 0.12, -0.16]} castShadow>
            <sphereGeometry args={[0.045, 20, 20]} />
            <meshStandardMaterial color="#ff1493" emissive="#ff1493" emissiveIntensity={0.7} />
          </mesh>

          {/* Shark eye pupils */}
          <mesh position={[0.34, 0.13, 0.175]} castShadow>
            <sphereGeometry args={[0.022, 16, 16]} />
            <meshStandardMaterial color="#1a0020" />
          </mesh>
          <mesh position={[0.34, 0.13, -0.175]} castShadow>
            <sphereGeometry args={[0.022, 16, 16]} />
            <meshStandardMaterial color="#1a0020" />
          </mesh>

          {/* Eye highlights */}
          <mesh position={[0.33, 0.14, 0.165]} castShadow>
            <sphereGeometry args={[0.01, 10, 10]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0.33, 0.14, -0.165]} castShadow>
            <sphereGeometry args={[0.01, 10, 10]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
          </mesh>

          {/* Dorsal fin - detailed */}
          <mesh position={[0.08, 0.24, 0]} rotation={[0, 0, 0.25]} castShadow>
            <boxGeometry args={[0.22, 0.18, 0.03]} />
            <meshStandardMaterial color="#606060" metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Fin ridge */}
          <mesh position={[0.12, 0.28, 0]} rotation={[0, 0, 0.25]} castShadow>
            <boxGeometry args={[0.15, 0.02, 0.025]} />
            <meshStandardMaterial color="#505050" />
          </mesh>

          {/* Side fins */}
          <mesh position={[0.12, 0, 0.18]} rotation={[0.55, 0, 0]} castShadow>
            <boxGeometry args={[0.12, 0.1, 0.025]} />
            <meshStandardMaterial color="#585858" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0.12, 0, -0.18]} rotation={[-0.55, 0, 0]} castShadow>
            <boxGeometry args={[0.12, 0.1, 0.025]} />
            <meshStandardMaterial color="#585858" metalness={0.5} roughness={0.4} />
          </mesh>

          {/* Rocket tube/barrel */}
          <mesh position={[-0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.11, 0.13, 0.5, 24]} />
            <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.4} />
          </mesh>

          {/* Rocket tube details */}
          {[0, 1, 2].map((i) => (
            <mesh key={`tube-${i}`} position={[-0.25 + i * 0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <torusGeometry args={[0.12, 0.015, 10, 24]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>
          ))}

          {/* Rocket tube opening */}
          <mesh position={[-0.44, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.09, 0.11, 0.025, 24]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          {/* Inner glow */}
          <mesh position={[-0.45, 0, 0]} castShadow>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={0.5} transparent opacity={0.6} />
          </mesh>

          {/* Handle */}
          <mesh position={[-0.25, -0.22, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.055, 0.2, 16]} />
            <meshStandardMaterial color="#4a3a30" />
          </mesh>
          {/* Handle grip */}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={`hgrip-${i}`} position={[-0.25, -0.16 - i * 0.035, 0.048]} castShadow>
              <boxGeometry args={[0.05, 0.015, 0.01]} />
              <meshStandardMaterial color="#3a2a20" />
            </mesh>
          ))}

          {/* Gold trim rivets */}
          {[[0.18, 0, 0.16], [0.18, 0, -0.16], [-0.08, 0.155, 0.12], [-0.08, 0.155, -0.12]].map(([x, y, z], i) => (
            <mesh key={`rivet-${i}`} position={[x, y, z]} castShadow>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}

          {/* Gold trim band */}
          <mesh position={[-0.12, 0.155, 0]} castShadow>
            <boxGeometry args={[0.18, 0.025, 0.1]} />
            <meshStandardMaterial color="#d4a520" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Glow effect */}
          <pointLight position={[0.55, 0, 0]} color="#ff4400" intensity={5} distance={6} />
        </group>
      )}
    </group>
  )
}

// Legs component - separate for animation - doubled detail
export function JinxLegs() {
  return (
    <>
      {/* ============================================ */}
      {/* ================= LEFT LEG ================ */}
      {/* ============================================ */}

      <group name="leftLeg" position={[-0.1, 0.5, 0]}>
        {/* Hip connection */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>

        {/* Upper thigh - detailed */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <capsuleGeometry args={[0.095, 0.22, 16, 28]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>
        {/* Thigh muscle detail */}
        <mesh position={[0.03, 0.25, 0.04]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#984070" />
        </mesh>

        {/* Lower thigh */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <capsuleGeometry args={[0.085, 0.16, 16, 24]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>

        {/* Pant stripes - more detailed */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`lstripe-${i}`} position={[-0.07 + i * 0.035, 0.16, 0.065]} rotation={[0, 0.22 - i * 0.15, 0]} castShadow>
            <boxGeometry args={[0.012, 0.38, 0.012]} />
            <meshStandardMaterial color="#6a2850" />
          </mesh>
        ))}

        {/* Knee - detailed */}
        <mesh position={[0, -0.08, 0.025]} castShadow>
          <sphereGeometry args={[0.072, 24, 24]} />
          <meshStandardMaterial color="#8a3868" />
        </mesh>
        {/* Kneecap */}
        <mesh position={[0, -0.08, 0.06]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#7a3058" />
        </mesh>

        {/* Calf - detailed */}
        <mesh position={[0, -0.26, 0]} castShadow>
          <capsuleGeometry args={[0.068, 0.22, 16, 24]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>
        {/* Calf muscle */}
        <mesh position={[0, -0.22, -0.04]} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#984070" />
        </mesh>

        {/* Ankle - detailed */}
        <mesh position={[0, -0.42, 0]} castShadow>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>
        {/* Ankle bone detail */}
        <mesh position={[-0.03, -0.42, 0]} castShadow>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color="#5a4a40" />
        </mesh>
        <mesh position={[0.03, -0.42, 0]} castShadow>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color="#5a4a40" />
        </mesh>

        {/* Boot - detailed */}
        <mesh position={[0, -0.5, 0.025]} castShadow>
          <boxGeometry args={[0.13, 0.14, 0.22]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>

        {/* Boot top cuff - detailed */}
        <mesh position={[0, -0.43, 0.025]} castShadow>
          <cylinderGeometry args={[0.072, 0.078, 0.05, 20]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>
        {/* Cuff edge */}
        <mesh position={[0, -0.41, 0.025]} castShadow>
          <torusGeometry args={[0.07, 0.012, 10, 20]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>

        {/* Boot sole - detailed */}
        <mesh position={[0, -0.58, 0.025]} castShadow>
          <boxGeometry args={[0.15, 0.035, 0.24]} />
          <meshStandardMaterial color="#2a2020" />
        </mesh>
        {/* Sole tread */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={`ltread-${i}`} position={[0, -0.595, -0.08 + i * 0.04]} castShadow>
            <boxGeometry args={[0.14, 0.01, 0.025]} />
            <meshStandardMaterial color="#1a1515" />
          </mesh>
        ))}

        {/* Boot heel - detailed */}
        <mesh position={[0, -0.55, -0.06]} castShadow>
          <boxGeometry args={[0.09, 0.07, 0.07]} />
          <meshStandardMaterial color="#2a2020" />
        </mesh>

        {/* Boot toe cap */}
        <mesh position={[0, -0.53, 0.12]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>

        {/* Boot straps - detailed */}
        <mesh position={[0, -0.47, 0.12]} castShadow>
          <boxGeometry args={[0.14, 0.03, 0.018]} />
          <meshStandardMaterial color="#6050a0" />
        </mesh>
        <mesh position={[0, -0.51, 0.12]} castShadow>
          <boxGeometry args={[0.14, 0.03, 0.018]} />
          <meshStandardMaterial color="#6050a0" />
        </mesh>

        {/* Boot buckles */}
        <mesh position={[0, -0.47, 0.13]} castShadow>
          <boxGeometry args={[0.035, 0.025, 0.012]} />
          <meshStandardMaterial color="#d4a520" metalness={0.85} roughness={0.15} />
        </mesh>
        <mesh position={[0, -0.51, 0.13]} castShadow>
          <boxGeometry args={[0.035, 0.025, 0.012]} />
          <meshStandardMaterial color="#d4a520" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Boot laces hint */}
        {[0, 1, 2].map((i) => (
          <mesh key={`llace-${i}`} position={[0, -0.46 - i * 0.03, 0.1]} castShadow>
            <boxGeometry args={[0.08, 0.008, 0.01]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>
        ))}
      </group>

      {/* ============================================ */}
      {/* ================= RIGHT LEG =============== */}
      {/* ============================================ */}

      <group name="rightLeg" position={[0.1, 0.5, 0]}>
        {/* Hip connection */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>

        {/* Upper thigh */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <capsuleGeometry args={[0.095, 0.22, 16, 28]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>
        <mesh position={[-0.03, 0.25, 0.04]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#984070" />
        </mesh>

        {/* Lower thigh */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <capsuleGeometry args={[0.085, 0.16, 16, 24]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>

        {/* Pant stripes */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`rstripe-${i}`} position={[0.07 - i * 0.035, 0.16, 0.065]} rotation={[0, -0.22 + i * 0.15, 0]} castShadow>
            <boxGeometry args={[0.012, 0.38, 0.012]} />
            <meshStandardMaterial color="#6a2850" />
          </mesh>
        ))}

        {/* Knee */}
        <mesh position={[0, -0.08, 0.025]} castShadow>
          <sphereGeometry args={[0.072, 24, 24]} />
          <meshStandardMaterial color="#8a3868" />
        </mesh>
        <mesh position={[0, -0.08, 0.06]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#7a3058" />
        </mesh>

        {/* Calf */}
        <mesh position={[0, -0.26, 0]} castShadow>
          <capsuleGeometry args={[0.068, 0.22, 16, 24]} />
          <meshStandardMaterial color="#9a4070" />
        </mesh>
        <mesh position={[0, -0.22, -0.04]} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#984070" />
        </mesh>

        {/* Ankle */}
        <mesh position={[0, -0.42, 0]} castShadow>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>
        <mesh position={[-0.03, -0.42, 0]} castShadow>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color="#5a4a40" />
        </mesh>
        <mesh position={[0.03, -0.42, 0]} castShadow>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color="#5a4a40" />
        </mesh>

        {/* Boot */}
        <mesh position={[0, -0.5, 0.025]} castShadow>
          <boxGeometry args={[0.13, 0.14, 0.22]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>

        {/* Boot top cuff */}
        <mesh position={[0, -0.43, 0.025]} castShadow>
          <cylinderGeometry args={[0.072, 0.078, 0.05, 20]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>
        <mesh position={[0, -0.41, 0.025]} castShadow>
          <torusGeometry args={[0.07, 0.012, 10, 20]} />
          <meshStandardMaterial color="#4a3a30" />
        </mesh>

        {/* Boot sole */}
        <mesh position={[0, -0.58, 0.025]} castShadow>
          <boxGeometry args={[0.15, 0.035, 0.24]} />
          <meshStandardMaterial color="#2a2020" />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={`rtread-${i}`} position={[0, -0.595, -0.08 + i * 0.04]} castShadow>
            <boxGeometry args={[0.14, 0.01, 0.025]} />
            <meshStandardMaterial color="#1a1515" />
          </mesh>
        ))}

        {/* Boot heel */}
        <mesh position={[0, -0.55, -0.06]} castShadow>
          <boxGeometry args={[0.09, 0.07, 0.07]} />
          <meshStandardMaterial color="#2a2020" />
        </mesh>

        {/* Boot toe cap */}
        <mesh position={[0, -0.53, 0.12]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#3a2a20" />
        </mesh>

        {/* Boot straps */}
        <mesh position={[0, -0.47, 0.12]} castShadow>
          <boxGeometry args={[0.14, 0.03, 0.018]} />
          <meshStandardMaterial color="#6050a0" />
        </mesh>
        <mesh position={[0, -0.51, 0.12]} castShadow>
          <boxGeometry args={[0.14, 0.03, 0.018]} />
          <meshStandardMaterial color="#6050a0" />
        </mesh>

        {/* Boot buckles */}
        <mesh position={[0, -0.47, 0.13]} castShadow>
          <boxGeometry args={[0.035, 0.025, 0.012]} />
          <meshStandardMaterial color="#d4a520" metalness={0.85} roughness={0.15} />
        </mesh>
        <mesh position={[0, -0.51, 0.13]} castShadow>
          <boxGeometry args={[0.035, 0.025, 0.012]} />
          <meshStandardMaterial color="#d4a520" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Boot laces */}
        {[0, 1, 2].map((i) => (
          <mesh key={`rlace-${i}`} position={[0, -0.46 - i * 0.03, 0.1]} castShadow>
            <boxGeometry args={[0.08, 0.008, 0.01]} />
            <meshStandardMaterial color="#3a2a20" />
          </mesh>
        ))}
      </group>
    </>
  )
}
