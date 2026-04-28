import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParallaxCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const W = () => window.innerWidth
    const H = () => window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W(), H())
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, W() / H(), 0.1, 200)
    camera.position.set(0, 0, 28)

    const onResize = () => {
      renderer.setSize(W(), H())
      camera.aspect = W() / H()
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // ── Rich lighting ──
    scene.add(new THREE.AmbientLight(0x6c47ff, 0.6))
    const lights = [
      { color: 0x6c47ff, intensity: 4, dist: 90, pos: [-22, 18, 12] },
      { color: 0xff4778, intensity: 3, dist: 90, pos: [22, -16, 6] },
      { color: 0x00e5ff, intensity: 2.5, dist: 70, pos: [0, 8, 22] },
      { color: 0xa78bfa, intensity: 2, dist: 60, pos: [-10, -20, 10] },
    ]
    lights.forEach(({ color, intensity, dist, pos }) => {
      const l = new THREE.PointLight(color, intensity, dist)
      l.position.set(...pos)
      scene.add(l)
    })

    // ── Materials ──
    const rand = (a, b) => a + Math.random() * (b - a)
    const pick = arr => arr[Math.floor(Math.random() * arr.length)]

    const COLORS = [0x6c47ff, 0xff4778, 0x00e5ff, 0x9b7eff, 0xff8fa3, 0x80f0ff, 0xa78bfa, 0xf472b6]

    const matWire = c => new THREE.MeshStandardMaterial({
      color: c, wireframe: true,
      transparent: true, opacity: rand(0.55, 0.9),
      emissive: c, emissiveIntensity: 0.25,
    })
    const matSolid = (c, op) => new THREE.MeshStandardMaterial({
      color: c, transparent: true, opacity: op ?? rand(0.08, 0.18),
      roughness: 0.1, metalness: 0.95,
      emissive: c, emissiveIntensity: 0.12,
    })
    const matGlow = c => new THREE.MeshBasicMaterial({
      color: c, transparent: true, opacity: rand(0.04, 0.1),
      wireframe: true,
    })

    // ── Geometry pool ──
    const geos = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.BoxGeometry(1.4, 1.4, 1.4),
      new THREE.TorusGeometry(0.7, 0.22, 8, 16),
      new THREE.DodecahedronGeometry(1, 0),
      new THREE.ConeGeometry(0.8, 1.6, 5),
      new THREE.TorusKnotGeometry(0.6, 0.18, 48, 8),
      new THREE.SphereGeometry(0.8, 8, 8),
    ]

    // ── Spawn objects across multiple z-layers ──
    const objects = []
    const COUNT = 65

    for (let i = 0; i < COUNT; i++) {
      const geo = pick(geos).clone()
      const color = pick(COLORS)
      const r = Math.random()
      let mat
      if (r < 0.5) mat = matWire(color)
      else if (r < 0.8) mat = matSolid(color)
      else mat = matGlow(color)

      const mesh = new THREE.Mesh(geo, mat)
      const s = rand(0.4, 2.5)
      mesh.scale.setScalar(s)
      // Spread across a wider volume
      mesh.position.set(rand(-45, 45), rand(-32, 32), rand(-50, 8))
      mesh.rotation.set(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2))

      scene.add(mesh)
      objects.push({
        mesh,
        spinX: (Math.random() - 0.5) * 0.012,
        spinY: (Math.random() - 0.5) * 0.009,
        spinZ: (Math.random() - 0.5) * 0.006,
        floatAmp: rand(0.4, 1.6),
        floatSpeed: rand(0.25, 0.8),
        floatOff: rand(0, Math.PI * 2),
        layer: rand(0.15, 1.0),
        baseY: mesh.position.y,
        pulseSpeed: rand(0.3, 0.8),
        pulseOff: rand(0, Math.PI * 2),
        baseOpacity: mat.opacity,
      })
    }

    // ── Add large glow spheres far back for atmosphere ──
    const glowColors = [0x6c47ff, 0xff4778, 0x00e5ff]
    glowColors.forEach((c, i) => {
      const geo = new THREE.SphereGeometry(rand(3, 6), 16, 16)
      const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.04 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(rand(-30, 30), rand(-20, 20), rand(-60, -30))
      scene.add(mesh)
    })

    // ── Stars ──
    const starPos = []
    for (let i = 0; i < 800; i++) starPos.push(rand(-70, 70), rand(-50, 50), rand(-100, 5))
    const starsGeo = new THREE.BufferGeometry()
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.14, transparent: true, opacity: 0.5, sizeAttenuation: true,
    })))

    // ── Colored star clusters ──
    ;[0x6c47ff, 0xff4778, 0x00e5ff].forEach(c => {
      const pos = []
      for (let i = 0; i < 120; i++) pos.push(rand(-60, 60), rand(-40, 40), rand(-80, 0))
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      scene.add(new THREE.Points(g, new THREE.PointsMaterial({
        color: c, size: 0.08, transparent: true, opacity: 0.35, sizeAttenuation: true,
      })))
    })

    // ── Connecting lines between nearby objects ──
    const lineMat = new THREE.LineBasicMaterial({ color: 0x6c47ff, transparent: true, opacity: 0.1 })
    const lineMat2 = new THREE.LineBasicMaterial({ color: 0xff4778, transparent: true, opacity: 0.06 })
    for (let i = 0; i < objects.length; i++) {
      for (let j = i + 1; j < objects.length; j++) {
        const d = objects[i].mesh.position.distanceTo(objects[j].mesh.position)
        if (d < 13 && Math.random() > 0.65) {
          const pts = [objects[i].mesh.position.clone(), objects[j].mesh.position.clone()]
          const lg = new THREE.BufferGeometry().setFromPoints(pts)
          scene.add(new THREE.Line(lg, Math.random() > 0.5 ? lineMat : lineMat2))
        }
      }
    }

    // ── Mouse & scroll ──
    let mx = 0, my = 0, scrollY = 0
    const onMouse = e => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── RAF Loop ──
    const clock = new THREE.Clock()
    let rafId
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Camera parallax
      camera.position.x += (mx * 5 - camera.position.x) * 0.025
      camera.position.y += (-my * 3 - camera.position.y) * 0.025
      camera.lookAt(0, 0, 0)

      // Scroll pull
      const sf = scrollY * 0.003
      scene.position.y = -sf * 4
      scene.rotation.x = sf * 0.035

      // Animate objects
      objects.forEach(o => {
        o.mesh.rotation.x += o.spinX
        o.mesh.rotation.y += o.spinY
        o.mesh.rotation.z += o.spinZ
        // Float
        o.mesh.position.y = o.baseY + Math.sin(t * o.floatSpeed + o.floatOff) * o.floatAmp
        // Parallax X drift
        o.mesh.position.x += (mx * 2.5 * o.layer - o.mesh.position.x * 0.001) * 0.005
        // Pulse opacity
        if (o.mesh.material.transparent) {
          o.mesh.material.opacity = o.baseOpacity * (0.75 + 0.25 * Math.sin(t * o.pulseSpeed + o.pulseOff))
        }
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="parallax-canvas" aria-hidden="true" />
}
