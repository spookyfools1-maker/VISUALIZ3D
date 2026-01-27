import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function LimitedTiltEye({ position }) {
    const ref = useRef()
    const { viewport } = useThree()

    useFrame((state) => {
        if (ref.current) {
            const { x, y } = state.pointer

            // Calculate 3D position of mouse on a plane in front of the grid
            // Grid is at z=0. 
            // Previous: z=5 (flatter angles). New: z=2 (steeper angles, stronger effect).

            const targetX = (x * viewport.width) / 2
            const targetY = (y * viewport.height) / 2
            const targetZ = 2

            ref.current.lookAt(targetX, targetY, targetZ)
        }
    })

    return (
        <group ref={ref} position={position}>
            {/* Eye housing/Ball */}
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#eeeeee" roughness={0.2} metalness={0.3} />
            </mesh>
            {/* Pupil for visibility (on surface) */}
            <mesh position={[0, 0, 0.28]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
        </group>
    )
}

export default function CursorScene() {
    const positions = useMemo(() => {
        const pos = []
        const cols = 16  // Increased from 12
        const rows = 10  // Increased from 8
        const spacing = 0.7

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                pos.push([
                    (i - cols / 2 + 0.5) * spacing,
                    (j - rows / 2 + 0.5) * spacing,
                    0
                ])
            }
        }
        return pos
    }, [])

    return (
        <group scale={1.1}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#646cff" />

            {positions.map((p, i) => (
                <LimitedTiltEye key={i} position={p} />
            ))}
        </group>
    )
}
