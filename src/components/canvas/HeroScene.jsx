import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function Shape({ position, type, mouse }) {
    const ref = useRef()

    useFrame((state, delta) => {
        if (ref.current) {
            // Follow mouse logic (lookAt or tilt towards)
            const x = (mouse.current[0] * window.innerWidth) / 50
            const y = -(mouse.current[1] * window.innerHeight) / 50

            ref.current.lookAt(x, y, 10)
        }
    })

    // Random geometry
    const Geometry = useMemo(() => {
        if (type === 0) return <boxGeometry args={[0.8, 0.8, 0.8]} />
        if (type === 1) return <coneGeometry args={[0.5, 1, 4]} /> // Pyramid-ish
        if (type === 2) return <dodecahedronGeometry args={[0.6]} />
        return <octahedronGeometry args={[0.6]} />
    }, [type])

    return (
        <mesh ref={ref} position={position}>
            {Geometry}
            <meshStandardMaterial
                color="#333"
                roughness={0.2}
                metalness={0.8}
                wireframe={Math.random() > 0.8} // Occasional wireframe for style
            />
        </mesh>
    )
}

export default function HeroScene() {
    const mouse = useRef([0, 0])

    useFrame((state) => {
        mouse.current = [state.pointer.x, state.pointer.y]
    })

    const shapes = useMemo(() => {
        const items = []
        // Create a spread out grid
        for (let x = -8; x <= 8; x += 3) {
            for (let y = -5; y <= 5; y += 3) {
                // Jitter position
                const jx = x + (Math.random() - 0.5)
                const jy = y + (Math.random() - 0.5)
                const jz = -2 + (Math.random() - 0.5) * 4 // Depth variation

                // Avoid center where text is
                if (Math.abs(jx) < 4 && Math.abs(jy) < 2) continue;

                items.push({
                    position: [jx, jy, jz],
                    type: Math.floor(Math.random() * 4)
                })
            }
        }
        return items
    }, [])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <Environment preset="city" />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            <group>
                {shapes.map((s, i) => (
                    <Shape key={i} position={s.position} type={s.type} mouse={mouse} />
                ))}
            </group>
        </>
    )
}
