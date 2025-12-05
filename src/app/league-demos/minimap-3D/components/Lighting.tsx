'use client'

export default function Lighting() {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.4} />

      {/* Main directional light (sun) - casts shadows */}
      <directionalLight
        position={[50, 100, 50]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-bias={-0.0001}
      />

      {/* Fill light from opposite side */}
      <directionalLight
        position={[-30, 50, -30]}
        intensity={0.3}
      />

      {/* Blue base glow */}
      <pointLight
        position={[-85, 10, 85]}
        color="#4488ff"
        intensity={20}
        distance={40}
      />

      {/* Red base glow */}
      <pointLight
        position={[85, 10, -85]}
        color="#ff4444"
        intensity={20}
        distance={40}
      />

      {/* Dragon pit ambient */}
      <pointLight
        position={[-30, 5, 10]}
        color="#8844aa"
        intensity={15}
        distance={25}
      />

      {/* Baron pit ambient */}
      <pointLight
        position={[30, 5, -10]}
        color="#aa44aa"
        intensity={15}
        distance={25}
      />
    </>
  )
}
