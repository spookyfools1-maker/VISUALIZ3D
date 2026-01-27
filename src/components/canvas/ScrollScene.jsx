import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

export default function ScrollScene() {
    const meshRef = useRef()
    const groupRef = useRef()

    useFrame((state) => {
        // In a real app we might use a dedicated scroll sync hook, but window.scrollY works for simple effects
        const t = state.clock.getElapsedTime()
        const scrollY = window.scrollY

        if (meshRef.current) {
            // Rotate continuous + scroll influence
            meshRef.current.rotation.x = t * 0.2 + scrollY * 0.001
            meshRef.current.rotation.y = t * 0.3 + scrollY * 0.002
        }

        if (groupRef.current) {
            // Move the whole group slightly based on scroll for Parallax feel
            // Note: this depends on where the View is on screen, simplified here
            groupRef.current.rotation.z = scrollY * 0.0005
        }
    })

    return (
        <group ref={groupRef}>
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />

            <mesh ref={meshRef}>
                <dodecahedronGeometry args={[1.5, 0]} />
                <meshPhysicalMaterial
                    color="#2a2a2a"
                    roughness={0.2}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    wireframe={false}
                />
            </mesh>

            {/* Surrounding particles */}
            {[...Array(20)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 5
                    ]}
                >
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color="#646cff" />
                </mesh>
            ))}
        </group>
    )
}
