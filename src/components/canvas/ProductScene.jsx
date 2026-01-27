import { useRef } from 'react'
import { Stage, OrbitControls, PerspectiveCamera } from '@react-three/drei'

export default function ProductScene({ color, model }) {
    const mesh = useRef()

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

            {/* autoRotate enabled. makeDefault should now only affect THIS camera */}
            <OrbitControls makeDefault enableZoom={false} autoRotate autoRotateSpeed={2} />

            <Stage intensity={0.5} environment="city" adjustCamera={false}>
                {model === 'cube' && (
                    <mesh ref={mesh}>
                        <boxGeometry args={[2, 2, 2]} />
                        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
                    </mesh>
                )}

                {model === 'sphere' && (
                    <mesh ref={mesh}>
                        <sphereGeometry args={[1.4, 64, 64]} />
                        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
                    </mesh>
                )}

                {model === 'torus' && (
                    <mesh ref={mesh}>
                        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
                        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
                    </mesh>
                )}
            </Stage>
        </>
    )
}
