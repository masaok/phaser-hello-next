# Plan: 3D Graphics with Top-Down Gameplay

## Overview

Convert the League of Lemmings game from 2D sprites to 3D graphics while maintaining the top-down MOBA gameplay style, similar to the real League of Legends.

## Current State

- **Engine:** Phaser 3.90 (2D game framework)
- **Graphics:** Procedurally generated 2D sprites using Phaser's Graphics API
- **Map:** 1024x768 arena (lemmings) / 3200x3200 Summoner's Rift demo
- **Perspective:** True top-down (orthographic)
- **Characters:** Flat colored rectangles and circles

## Target State

- **Engine:** Three.js or Babylon.js integrated with Phaser for UI/input
- **Graphics:** 3D models with proper lighting and shadows
- **Map:** 3D terrain with height variation, vegetation, structures
- **Perspective:** Isometric/elevated camera angle (~56°) like real LoL
- **Characters:** 3D animated models

---

## Phase 1: Architecture Setup

### 1.1 Choose 3D Engine
**Recommendation: Three.js**

| Option | Pros | Cons |
|--------|------|------|
| Three.js | Lightweight, huge community, easy learning curve, works well with React | Manual setup for advanced features |
| Babylon.js | Built-in physics, inspector tools, more game-focused | Heavier bundle size |
| PlayCanvas | WebGL engine, editor included | Less flexible, commercial focus |

Three.js is recommended because:
- Better React integration (@react-three/fiber)
- Lighter weight for MOBA-style game
- Extensive documentation and examples
- GLTF/GLB model support

### 1.2 Project Structure
```
src/app/lemmings-3d/
├── components/
│   ├── Game3D.tsx           # Main Three.js canvas wrapper
│   ├── Camera.tsx           # Isometric camera controller
│   ├── Lighting.tsx         # Scene lighting setup
│   └── UI/
│       ├── HealthBar3D.tsx  # Billboarded health bars
│       ├── Minimap.tsx      # 2D minimap overlay (keep Phaser)
│       └── AbilityBar.tsx   # HUD elements
├── models/
│   ├── Champion.tsx         # 3D champion component
│   ├── Minion.tsx           # 3D minion component
│   ├── Tower.tsx            # 3D tower structure
│   └── Projectile.tsx       # 3D projectile effects
├── terrain/
│   ├── Map.tsx              # Terrain mesh and textures
│   ├── River.tsx            # Animated water shader
│   ├── Bush.tsx             # Fog-of-war bushes
│   └── Structure.tsx        # Nexus, inhibitors
├── effects/
│   ├── Particles.tsx        # Particle systems
│   ├── Abilities.tsx        # Ability visual effects
│   └── Indicators.tsx       # Range/skillshot indicators
├── hooks/
│   ├── useGameLoop.ts       # RAF-based game loop
│   ├── useInput.ts          # Mouse/keyboard handling
│   └── useCamera.ts         # Camera controls
├── systems/
│   ├── GameState.ts         # Zustand or custom state
│   ├── Physics.ts           # Simple 2D physics (top-down)
│   └── Combat.ts            # Damage, abilities logic
└── page.tsx                 # Entry point
```

### 1.3 Dependencies to Add
```json
{
  "three": "^0.169.0",
  "@react-three/fiber": "^8.17.0",
  "@react-three/drei": "^9.114.0",
  "@react-three/postprocessing": "^2.16.0",
  "zustand": "^4.5.0",
  "leva": "^0.9.35"
}
```

---

## Phase 2: Core 3D Systems

### 2.1 Camera System
```
- Isometric angle: 56° from horizontal (LoL standard)
- Camera height: ~1500 units above ground
- Edge-pan scrolling when cursor near screen edges
- Zoom: Mouse wheel (min: 800, max: 2500)
- Lock-to-champion toggle (spacebar)
- Smooth camera transitions
```

### 2.2 Terrain & Map
```
Map Dimensions: 14000 x 14000 units (scaled Summoner's Rift)

Terrain Layers:
1. Base mesh (heightmap-based)
2. Lane paths (lighter texture, slightly raised)
3. Jungle areas (darker, more vegetation)
4. River (animated water shader, reflections)
5. Brush/bushes (instanced grass geometry)

Height Variations:
- Lanes: 0 units (base level)
- Jungle: -20 to +30 units (slight variation)
- River: -50 units (below lanes)
- Bases: +20 units (elevated)
```

### 2.3 Lighting Setup
```
Lights:
- Directional light (sun): position (1, 2, 1), cast shadows
- Ambient light: low intensity for fill
- Point lights at objectives (Baron/Dragon)
- Team-colored lights at bases

Shadows:
- Cascade shadow maps for large terrain
- Shadow quality settings (Low/Medium/High)
- Characters and structures cast shadows
```

### 2.4 3D Models Strategy

**Option A: Procedural (Fast, Lower Quality)**
- Generate simple 3D shapes from code
- Box/cylinder-based characters
- Good for prototyping

**Option B: Low-Poly Models (Medium)**
- Create or source low-poly GLTF models
- ~500-2000 triangles per character
- Hand-painted textures

**Option C: Full Models (High Quality)**
- Use Mixamo or custom rigged models
- Skeletal animation
- PBR materials

**Recommended: Start with Option A, iterate to B**

---

## Phase 3: Character Implementation

### 3.1 Champion 3D Model
```
Components:
- Body mesh (capsule or humanoid)
- Weapon meshes (switchable for Jinx)
- Animation mixer for walk/attack/ability
- Billboard health/mana bars above head
- Team color indicator (glow/outline)

Animations:
- Idle
- Walk (8-directional or blend)
- Auto-attack (per weapon type)
- Ability casts (Q, W, E, R)
- Death
- Recall
```

### 3.2 Movement System
```
- Pathfinding: A* or navmesh-based
- Click-to-move with path preview
- Smooth rotation toward target
- Movement speed modifiers (slows, roots)
- Collision avoidance with other units
```

### 3.3 Ability Visuals
```
Q - Switcheroo:
- Weapon swap animation
- Particle effect on switch
- Model arm changes

W - Zap:
- Line indicator (skillshot)
- Laser beam effect
- Hit spark particles

E - Flame Chompers:
- 3D trap models placed
- Glow/pulse effect
- Explosion on trigger

R - Super Mega Death Rocket:
- Large 3D rocket model
- Trail particles
- Screen shake on fire
- Massive explosion effect
```

---

## Phase 4: Visual Effects

### 4.1 Particle Systems
```
Using Three.js Points or instanced meshes:
- Attack projectiles (bullets, rockets)
- Ability effects (zap beam, explosions)
- Environmental (river sparkles, bush movement)
- Impact effects (hit markers, damage numbers)
```

### 4.2 Shaders
```
Custom shaders for:
- Water (animated normals, reflections)
- Fog of war (soft edge blending)
- Health bars (gradient fill)
- Skill indicators (circular/line ranges)
- Outline effect (selected units)
```

### 4.3 Post-Processing
```
Effects pipeline:
- Bloom (for abilities and lights)
- SSAO (ambient occlusion for depth)
- Color grading (LoL's slightly desaturated look)
- Vignette (optional)
```

---

## Phase 5: UI Layer

### 5.1 Hybrid Approach
```
- Keep Phaser OR use React/HTML for 2D UI
- Three.js handles 3D world
- UI overlays on top via CSS positioning

UI Elements:
- Minimap (bottom-right, 200x200)
- Ability bar (bottom-center)
- Stats panel (top-left)
- Scoreboard (tab to view)
- Shop (if implemented)
```

### 5.2 3D UI Elements
```
Rendered in 3D space:
- Health bars (billboard sprites)
- Damage numbers (floating, fading)
- Ability range indicators
- Targeting circles
- Waypoint markers
```

---

## Phase 6: Optimization

### 6.1 Performance Targets
```
- 60 FPS on mid-range hardware
- < 200MB memory usage
- < 5MB initial bundle (lazy load models)
```

### 6.2 Techniques
```
- Level of Detail (LOD) for distant objects
- Frustum culling (automatic in Three.js)
- Instanced rendering for minions/particles
- Texture atlases for UI
- Object pooling for projectiles
- Web Workers for pathfinding
```

### 6.3 Quality Settings
```
Low:
- No shadows
- Reduced particles
- Simple water shader
- 720p render scale

Medium:
- Basic shadows
- Normal particles
- Standard water
- 1080p render scale

High:
- Full shadows
- All particles
- Reflective water
- Post-processing
- Native resolution
```

---

## Implementation Order

### Sprint 1: Foundation (Week 1-2)
1. Set up Three.js + R3F integration
2. Create basic scene with ground plane
3. Implement isometric camera
4. Add basic lighting
5. Port simple champion as 3D box

### Sprint 2: Terrain (Week 3)
1. Create full map geometry
2. Add lane/jungle textures
3. Implement water shader
4. Add bush geometry
5. Place structure placeholders

### Sprint 3: Characters (Week 4-5)
1. Create champion 3D model/geometry
2. Implement walk animation
3. Port movement system
4. Add health bar billboards
5. Implement attack animations

### Sprint 4: Abilities (Week 6-7)
1. Port Q ability (weapon switch)
2. Port W ability (skillshot)
3. Port E ability (traps)
4. Port R ability (ultimate)
5. Add particle effects

### Sprint 5: Polish (Week 8)
1. Add post-processing
2. Implement quality settings
3. Optimize performance
4. Add sound integration
5. Final bug fixes

---

## Technical Decisions

### State Management
```
Use Zustand for game state:
- Champion stats (HP, mana, position)
- Enemy states
- Ability cooldowns
- Game time
- Score/kills

Benefits:
- Simple API
- Works with React and vanilla JS
- Selective subscriptions for performance
```

### Physics
```
Keep 2D physics for gameplay:
- Three.js for visuals only
- Custom or existing 2D physics for collisions
- Hitboxes remain 2D circles/rectangles
- Height is visual only (no vertical gameplay)
```

### Input Handling
```
- Three.js raycaster for world clicks
- Screen-space UI for ability targeting
- Keyboard events for abilities
- Right-click context menu disabled
```

---

## File Migration Map

| Current File | New 3D File | Notes |
|--------------|-------------|-------|
| `lemmings/gameobjects/Champion.ts` | `lemmings-3d/models/Champion.tsx` | Convert to R3F component |
| `lemmings/gameobjects/Dummy.ts` | `lemmings-3d/models/Dummy.tsx` | Simple 3D enemy |
| `lemmings/scenes/GameScene.ts` | `lemmings-3d/components/Game3D.tsx` | Main game container |
| `lemmings/scenes/BootScene.ts` | `lemmings-3d/hooks/useAssets.ts` | Load 3D models |
| `lemmings/TheGame.tsx` | `lemmings-3d/page.tsx` | Entry point |

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Performance issues | High | Early profiling, LOD, quality settings |
| Complex animations | Medium | Start simple, use Mixamo for rigging |
| Large bundle size | Medium | Code splitting, lazy loading |
| Browser compatibility | Low | Three.js has good support, test early |
| Development time | High | Prototype first, iterate |

---

## Success Criteria

1. **Visual Quality:** Game looks like a simplified version of LoL
2. **Performance:** Consistent 60 FPS on target hardware
3. **Gameplay Parity:** All existing mechanics work in 3D
4. **Camera:** Smooth isometric view with proper controls
5. **Effects:** Abilities have satisfying visual feedback

---

## Resources

- Three.js Docs: https://threejs.org/docs/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- Drei Helpers: https://github.com/pmndrs/drei
- LoL Art Style Analysis: Study in-game screenshots for reference
- Low-poly Models: Sketchfab, Quaternius free packs
- Mixamo: Free character animations

---

## Appendix: Camera Math

```javascript
// LoL-style isometric camera setup
const CAMERA_ANGLE = 56 * (Math.PI / 180); // 56 degrees from horizontal
const CAMERA_HEIGHT = 1500;
const CAMERA_DISTANCE = CAMERA_HEIGHT / Math.tan(CAMERA_ANGLE);

// Camera position relative to look-at point
function getCameraPosition(targetX, targetZ) {
  return {
    x: targetX,
    y: CAMERA_HEIGHT,
    z: targetZ + CAMERA_DISTANCE
  };
}
```

## Appendix: Coordinate System

```
Three.js uses Y-up coordinate system:
- X: Left/Right
- Y: Up/Down (height)
- Z: Forward/Back

Map layout:
- Blue base: low X, low Z
- Red base: high X, high Z
- Mid lane: diagonal X=Z line
```
