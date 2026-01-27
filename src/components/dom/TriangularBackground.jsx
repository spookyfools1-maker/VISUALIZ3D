import { useEffect, useRef, useState } from 'react'

export default function TriangularBackground() {
    const canvasRef = useRef(null)
    const [hoveredTile, setHoveredTile] = useState(null)
    const animatingTilesRef = useRef(new Map())
    const mousePos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Triangle configuration
        const triangleSize = 60 // Size of each triangle
        const cols = Math.ceil(canvas.width / triangleSize) + 2
        const rows = Math.ceil(canvas.height / (triangleSize * Math.sqrt(3) / 2)) + 2

        // Create triangle grid
        const triangles = []
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * triangleSize
                const y = row * (triangleSize * Math.sqrt(3) / 2)

                // Upward pointing triangle
                triangles.push({
                    id: `${row}-${col}-up`,
                    points: [
                        { x: x, y: y + (triangleSize * Math.sqrt(3) / 2) },
                        { x: x + triangleSize / 2, y: y },
                        { x: x + triangleSize, y: y + (triangleSize * Math.sqrt(3) / 2) }
                    ],
                    brightness: 0,
                    targetBrightness: 0
                })

                // Downward pointing triangle
                triangles.push({
                    id: `${row}-${col}-down`,
                    points: [
                        { x: x + triangleSize / 2, y: y },
                        { x: x + triangleSize, y: y + (triangleSize * Math.sqrt(3) / 2) },
                        { x: x + triangleSize + triangleSize / 2, y: y }
                    ],
                    brightness: 0,
                    targetBrightness: 0
                })
            }
        }

        // Random animation controller
        const startRandomAnimation = () => {
            const randomTile = triangles[Math.floor(Math.random() * triangles.length)]
            if (!animatingTilesRef.current.has(randomTile.id)) {
                animatingTilesRef.current.set(randomTile.id, {
                    startTime: Date.now(),
                    duration: 2000 + Math.random() * 2000, // 2-4 seconds
                    fadeIn: true
                })
            }
        }

        // Start random animations periodically
        const randomInterval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every interval
                startRandomAnimation()
            }
        }, 200)

        // Point in triangle test
        const pointInTriangle = (point, triangle) => {
            const { points } = triangle
            const [p0, p1, p2] = points

            const area = 0.5 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y)
            const s = 1 / (2 * area) * (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * point.x + (p0.x - p2.x) * point.y)
            const t = 1 / (2 * area) * (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * point.x + (p1.x - p0.x) * point.y)

            return s >= 0 && t >= 0 && (1 - s - t) >= 0
        }

        // Mouse move handler
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }

            // Find hovered triangle
            let found = null
            for (const triangle of triangles) {
                if (pointInTriangle(mousePos.current, triangle)) {
                    found = triangle.id
                    break
                }
            }
            setHoveredTile(found)
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const now = Date.now()

            // Update animating tiles
            animatingTilesRef.current.forEach((anim, tileId) => {
                const elapsed = now - anim.startTime
                const progress = Math.min(elapsed / anim.duration, 1)

                const triangle = triangles.find(t => t.id === tileId)
                if (triangle) {
                    if (anim.fadeIn) {
                        triangle.targetBrightness = Math.sin(progress * Math.PI) * 0.8
                    } else {
                        triangle.targetBrightness = Math.sin(progress * Math.PI) * 0.8
                    }

                    if (progress >= 1) {
                        animatingTilesRef.current.delete(tileId)
                        triangle.targetBrightness = 0
                    }
                }
            })

            // Draw triangles
            triangles.forEach((triangle) => {
                // Smooth brightness transition
                triangle.brightness += (triangle.targetBrightness - triangle.brightness) * 0.1

                // Check if hovered
                const isHovered = triangle.id === hoveredTile

                // Calculate color
                let fillColor
                if (isHovered) {
                    // Galactic purple glow on hover
                    fillColor = `rgba(138, 43, 226, 0.6)` // Bright purple
                } else if (triangle.brightness > 0.01) {
                    // Random animation - galactic purple
                    const alpha = triangle.brightness
                    fillColor = `rgba(138, 43, 226, ${alpha * 0.5})`
                } else {
                    // Off state - dark gray
                    fillColor = 'rgba(60, 60, 60, 0.3)'
                }

                // Draw triangle
                ctx.beginPath()
                ctx.moveTo(triangle.points[0].x, triangle.points[0].y)
                ctx.lineTo(triangle.points[1].x, triangle.points[1].y)
                ctx.lineTo(triangle.points[2].x, triangle.points[2].y)
                ctx.closePath()

                ctx.fillStyle = fillColor
                ctx.fill()

                // Stroke for definition
                ctx.strokeStyle = 'rgba(100, 100, 100, 0.2)'
                ctx.lineWidth = 0.5
                ctx.stroke()
            })

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            clearInterval(randomInterval)
        }
    }, [hoveredTile])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    )
}
