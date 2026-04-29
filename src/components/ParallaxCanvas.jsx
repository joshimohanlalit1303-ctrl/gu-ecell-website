import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════════
   ParallaxCanvas — Premium 3D ambient background
   Improvements over v1:
   • Spring-inertia camera (velocity dampening, feels alive)
   • Gyroscope parallax on mobile (deviceorientation)
   • Depth-stratified parallax layers (near objects move fast)
   • Per-star twinkle via animated BufferAttribute
   • Animated pulsing connection lines
   • Atmospheric nebula rings deep in the scene
   • Scroll → smooth camera Z-push (depth zoom)
   • Cluster-based object placement (not pure random scatter)
   ═══════════════════════════════════════════════════════════ */

export default function ParallaxCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = () => window.innerWidth
    const H = () => window.innerHeight

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W(), H())
    renderer.setClearColor(0x000000, 0)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 250)
    camera.position.set(0, 0, 30)

    const onResize = () => {
      renderer.setSize(W(), H())
      camera.aspect = W() / H()
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // ── Helpers ───────────────────────────────────────────────
    const rand  = (a, b) => a + Math.random() * (b - a)
    const pick  = arr  => arr[Math.floor(Math.random() * arr.length)]
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

    // ── Brand palette ─────────────────────────────────────────
    const COLORS = [
      0x6c47ff, 0xff4778, 0x00e5ff,
      0x9b7eff, 0xff8fa3, 0x80f0ff,
      0xa78bfa, 0xf472b6, 0x38bdf8,
    ]

    // ── Lighting ──────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x6c47ff, 0.5))
    ;[
      { c: 0x6c47ff, i: 5,   d: 100, p: [-24, 20, 14]  },
      { c: 0xff4778, i: 4,   d: 100, p: [ 24,-18,  8]  },
      { c: 0x00e5ff, i: 3,   d: 80,  p: [  0, 10, 24]  },
      { c: 0xa78bfa, i: 2.5, d: 70,  p: [-12,-22, 12]  },
      { c: 0x38bdf8, i: 2,   d: 60,  p: [ 18, 16,-10]  },
    ].forEach(({ c, i, d, p }) => {
      const l = new THREE.PointLight(c, i, d)
      l.position.set(...p)
      scene.add(l)
    })

    // ── Materials factory ─────────────────────────────────────
    const matWire = c => new THREE.MeshStandardMaterial({
      color: c, wireframe: true, transparent: true,
      opacity: rand(0.45, 0.85),
      emissive: c, emissiveIntensity: 0.3,
    })
    const matSolid = c => new THREE.MeshStandardMaterial({
      color: c, transparent: true,
      opacity: rand(0.07, 0.20),
      roughness: 0.05, metalness: 0.98,
      emissive: c, emissiveIntensity: 0.18,
    })
    const matGlass = c => new THREE.MeshPhysicalMaterial({
      color: c, transparent: true,
      opacity: rand(0.06, 0.14),
      roughness: 0, metalness: 0,
      transmission: 0.9, thickness: 1.2,
      emissive: c, emissiveIntensity: 0.1,
    })

    // ── Geometry pool ─────────────────────────────────────────
    const geos = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.BoxGeometry(1.4, 1.4, 1.4),
      new THREE.TorusGeometry(0.8, 0.24, 10, 20),
      new THREE.DodecahedronGeometry(1, 0),
      new THREE.ConeGeometry(0.8, 1.6, 5),
      new THREE.TorusKnotGeometry(0.55, 0.16, 64, 8),
      new THREE.SphereGeometry(0.85, 10, 10),
      new THREE.CylinderGeometry(0, 0.9, 1.8, 5),    // pyramid
      new THREE.TorusGeometry(1.1, 0.08, 6, 24),      // thin ring
    ]

    // ── Cluster-based placement ───────────────────────────────
    // Instead of pure random, objects spawn around cluster centres
    // for a more natural nebula-like grouping.
    const CLUSTERS = [
      [-20, 12, -20], [18, -10, -15], [-8, -18, -30],
      [28, 14, -40],  [-26, -8, -35], [4, 22, -10],
      [0, 0, -50],    [-14, 5, -8],   [16, -20, -25],
    ]

    const objects = []
    const COUNT   = 80

    for (let i = 0; i < COUNT; i++) {
      const [cx, cy, cz] = pick(CLUSTERS)
      const geo   = pick(geos).clone()
      const color = pick(COLORS)
      const r     = Math.random()
      const mat   = r < 0.45 ? matWire(color)
                  : r < 0.75 ? matSolid(color)
                  :             matGlass(color)

      const mesh = new THREE.Mesh(geo, mat)
      const s    = rand(0.35, 2.8)
      mesh.scale.setScalar(s)

      // Scatter within cluster radius
      const spread = rand(6, 18)
      mesh.position.set(
        cx + rand(-spread, spread),
        cy + rand(-spread * 0.6, spread * 0.6),
        cz + rand(-spread * 0.5, spread * 0.5),
      )
      mesh.rotation.set(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2))
      scene.add(mesh)

      // Depth layer: objects closer to camera have higher layer (stronger parallax)
      const depth = clamp((mesh.position.z + 60) / 60, 0, 1) // 0=far, 1=near
      objects.push({
        mesh,
        spinX:     (Math.random() - 0.5) * 0.010,
        spinY:     (Math.random() - 0.5) * 0.008,
        spinZ:     (Math.random() - 0.5) * 0.005,
        floatAmp:  rand(0.3, 1.8),
        floatSpd:  rand(0.2, 0.7),
        floatOff:  rand(0, Math.PI * 2),
        layer:     0.1 + depth * 0.9,   // parallax strength
        baseY:     mesh.position.y,
        pulseSpd:  rand(0.25, 0.9),
        pulseOff:  rand(0, Math.PI * 2),
        baseOp:    mat.opacity,
      })
    }

    // ── Atmospheric nebula rings ──────────────────────────────
    const ringsData = []
    ;[
      { c: 0x6c47ff, r: 14, t: 0.8, z: -55, rx: 1.2, ry: 0.4 },
      { c: 0xff4778, r: 10, t: 0.6, z: -45, rx: 0.6, ry: 1.1 },
      { c: 0x00e5ff, r: 18, t: 1.2, z: -70, rx: 1.8, ry: 0.2 },
    ].forEach(({ c, r, t, z, rx, ry }) => {
      const geo  = new THREE.TorusGeometry(r, t, 4, 60)
      const mat  = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.025 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(rand(-8, 8), rand(-5, 5), z)
      mesh.rotation.set(rx, ry, 0)
      scene.add(mesh)
      ringsData.push({ mesh, rotSpd: rand(0.0008, 0.002) })
    })

    // ── Large background glow spheres ─────────────────────────
    ;[0x6c47ff, 0xff4778, 0x00e5ff, 0xa78bfa].forEach(c => {
      const geo  = new THREE.SphereGeometry(rand(4, 9), 8, 8)
      const mat  = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: rand(0.025, 0.05) })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(rand(-35, 35), rand(-25, 25), rand(-80, -40))
      scene.add(mesh)
    })

    // ── Star field with twinkle (per-vertex animated opacity) ──
    const STAR_COUNT = 1200
    const starPositions = new Float32Array(STAR_COUNT * 3)
    const starSizes     = new Float32Array(STAR_COUNT)
    const starPhases    = new Float32Array(STAR_COUNT)

    for (let i = 0; i < STAR_COUNT; i++) {
      starPositions[i * 3]     = rand(-90, 90)
      starPositions[i * 3 + 1] = rand(-60, 60)
      starPositions[i * 3 + 2] = rand(-130, 5)
      starSizes[i]   = rand(0.08, 0.22)
      starPhases[i]  = rand(0, Math.PI * 2)
    }

    const starsGeo = new THREE.BufferGeometry()
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
    starsGeo.setAttribute('size',     new THREE.Float32BufferAttribute(starSizes, 1))

    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.14,
      transparent: true, opacity: 0.6,
      sizeAttenuation: true,
    })
    const stars = new THREE.Points(starsGeo, starsMat)
    scene.add(stars)

    // Colored accent stars
    ;[0x9b7eff, 0xff8fa3, 0x80f0ff].forEach(c => {
      const n   = 200
      const pos = new Float32Array(n * 3)
      for (let i = 0; i < n; i++) {
        pos[i * 3]     = rand(-80, 80)
        pos[i * 3 + 1] = rand(-55, 55)
        pos[i * 3 + 2] = rand(-110, 0)
      }
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      scene.add(new THREE.Points(g, new THREE.PointsMaterial({
        color: c, size: 0.06, transparent: true, opacity: 0.4, sizeAttenuation: true,
      })))
    })

    // ── Pulsing connection lines ──────────────────────────────
    const lineData = []
    for (let i = 0; i < objects.length; i++) {
      for (let j = i + 1; j < objects.length; j++) {
        const d = objects[i].mesh.position.distanceTo(objects[j].mesh.position)
        if (d < 14 && Math.random() > 0.6) {
          const pts = [
            objects[i].mesh.position.clone(),
            objects[j].mesh.position.clone(),
          ]
          const mat = new THREE.LineBasicMaterial({
            color: Math.random() > 0.5 ? 0x6c47ff : 0xff4778,
            transparent: true,
            opacity: 0.08,
          })
          const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat)
          scene.add(line)
          lineData.push({
            line,
            baseOp:   0.08,
            pulseSpd: rand(0.3, 1.0),
            pulseOff: rand(0, Math.PI * 2),
          })
        }
      }
    }

    // ── Mouse / gyroscope / scroll state ─────────────────────
    let targetX = 0, targetY = 0   // normalised −1…1
    let velX    = 0, velY    = 0   // spring velocity
    let camX    = 0, camY    = 0   // actual camera offset
    let scrollY = 0

    const onMouse = e => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // Gyroscope for mobile
    const onGyro = e => {
      if (e.beta  == null || e.gamma == null) return
      // beta: front/back tilt −180…180, gamma: left/right −90…90
      targetX =  clamp(e.gamma / 30, -1, 1)
      targetY =  clamp((e.beta  - 45) / 30, -1, 1)
    }
    window.addEventListener('deviceorientation', onGyro, { passive: true })

    // Touch fallback (also bridges for tubes, but we want our own parallax)
    const onTouch = e => {
      if (!e.touches.length) return
      targetX = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2
      targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('touchmove', onTouch, { passive: true })

    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Animation loop ────────────────────────────────────────
    const clock = new THREE.Clock()
    let rafId

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // ─ Spring-inertia camera (feels organic, not robotic) ─
      const STIFFNESS = 0.06   // spring pull strength
      const DAMPING   = 0.82   // velocity drag (< 1 = damping)
      velX = velX * DAMPING + (targetX * 6 - camX) * STIFFNESS
      velY = velY * DAMPING + (-targetY * 4 - camY) * STIFFNESS
      camX += velX
      camY += velY
      camera.position.x = camX
      camera.position.y = camY

      // ─ Scroll: smooth camera push forward + gentle tilt ─
      const sf  = scrollY * 0.003
      const tz  = 30 - sf * 8          // camera Z zooms in with scroll
      camera.position.z += (tz - camera.position.z) * 0.04
      camera.lookAt(camX * 0.3, camY * 0.3, 0)

      // ─ Scene roll on scroll ─
      scene.rotation.x = sf * 0.03
      scene.rotation.z = Math.sin(t * 0.05) * 0.008   // very slow drift

      // ─ Animate objects ─
      objects.forEach(o => {
        o.mesh.rotation.x += o.spinX
        o.mesh.rotation.y += o.spinY
        o.mesh.rotation.z += o.spinZ

        // Float
        o.mesh.position.y = o.baseY + Math.sin(t * o.floatSpd + o.floatOff) * o.floatAmp

        // Depth-layered parallax X  (near = fast, far = slow)
        const pTarget = targetX * 3.5 * o.layer
        o.mesh.position.x += (pTarget - o.mesh.position.x) * 0.012 * o.layer

        // Pulse opacity
        if (o.mesh.material.transparent) {
          const pulse = 0.7 + 0.3 * Math.sin(t * o.pulseSpd + o.pulseOff)
          o.mesh.material.opacity = o.baseOp * pulse
        }
      })

      // ─ Rotate nebula rings ─
      ringsData.forEach(({ mesh, rotSpd }) => {
        mesh.rotation.z += rotSpd
        mesh.rotation.y += rotSpd * 0.4
      })

      // ─ Twinkle stars ─
      starsMat.opacity = 0.45 + 0.2 * Math.sin(t * 0.4)

      // ─ Pulse connection lines ─
      lineData.forEach(ld => {
        ld.line.material.opacity =
          clamp(ld.baseOp * (0.5 + 0.5 * Math.sin(t * ld.pulseSpd + ld.pulseOff)), 0, 0.18)
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize',            onResize)
      window.removeEventListener('mousemove',         onMouse)
      window.removeEventListener('deviceorientation', onGyro)
      window.removeEventListener('touchmove',         onTouch)
      window.removeEventListener('scroll',            onScroll)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="parallax-canvas" aria-hidden="true" />
}
