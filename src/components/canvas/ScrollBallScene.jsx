import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function RollingBall({ scrollProgress }) {
    const ballRef = useRef()
    const trailRef = useRef()

    useFrame(() => {
        if (ballRef.current) {
            // Create a longer curved path (3 full sine wave cycles)
            const t = scrollProgress
            const x = (t - 0.5) * 12 // Extended horizontal range
            const y = Math.sin(t * Math.PI * 6) * 2.5 // 3 full cycles (6π)
            const z = 0

            ballRef.current.position.set(x, y, z)

            // Rotate ball based on movement (rolling effect)
            ballRef.current.rotation.z = -t * Math.PI * 8
        }
    })

    return (
        <group>
            {/* Rolling ball */}
            <Sphere ref={ballRef} args={[0.5, 32, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#646cff"
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            {/* Path visualization - longer curve */}
            <mesh>
                <tubeGeometry args={[
                    new THREE.CatmullRomCurve3(
                        Array.from({ length: 100 }, (_, i) => {
                            const t = i / 99
                            const x = (t - 0.5) * 12
                            const y = Math.sin(t * Math.PI * 6) * 2.5
                            return new THREE.Vector3(x, y, 0)
                        })
                    ),
                    128, // More segments for smoother curve
                    0.05,
                    8,
                    false
                ]} />
                <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
            </mesh>
        </group>
    )
}

export default function ScrollBallScene({ scrollProgress = 0 }) {
    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, 0, 5]} intensity={0.5} color="#646cff" />

            <RollingBall scrollProgress={scrollProgress} />
        </group>
    )
}
