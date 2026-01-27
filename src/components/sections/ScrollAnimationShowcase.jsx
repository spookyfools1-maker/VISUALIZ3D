import { useRef, useState, useEffect } from 'react'
import { View } from '@react-three/drei'
import ScrollBallScene from '../canvas/ScrollBallScene'

export default function ScrollAnimationShowcase({ isActive }) {
    const container = useRef()
    const [scrollProgress, setScrollProgress] = useState(0)
    const [targetProgress, setTargetProgress] = useState(0)

    useEffect(() => {
        if (!isActive) return

        const handleScroll = (e) => {
            // Prevent default scroll behavior
            e.preventDefault()

            // Update target scroll progress with reduced sensitivity for smoother control
            setTargetProgress(prev => {
                const delta = e.deltaY * 0.0003 // Reduced from 0.001 for smoother scrolling
                return Math.max(0, Math.min(1, prev + delta))
            })
        }

        window.addEventListener('wheel', handleScroll, { passive: false })
        return () => window.removeEventListener('wheel', handleScroll)
    }, [isActive])

    // Smooth interpolation (lerp) for gradual movement
    useEffect(() => {
        const animate = () => {
            setScrollProgress(prev => {
                const diff = targetProgress - prev
                // Stop animating if the difference is very small to prevent jitter
                if (Math.abs(diff) < 0.0001) {
                    return targetProgress;
                }
                return prev + diff * 0.1 // Lerp factor for smooth transition
            })
        }

        const interval = setInterval(animate, 16) // ~60fps
        return () => clearInterval(interval)
    }, [targetProgress])

    return (
        <section ref={container} className="h-full w-full bg-transparent text-white relative flex flex-col items-center justify-center overflow-hidden">

            {/* 3D View */}
            {isActive && (
                <div className="absolute inset-0 z-[60]">
                    <View className="w-full h-full">
                        <ScrollBallScene scrollProgress={scrollProgress} />
                    </View>
                </div>
            )}

            {/* Instructions */}
            <div className="relative z-[200] pointer-events-none text-center">
                <div className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 max-w-2xl">
                    <h2 className="text-5xl font-bold mb-6">Scroll-Based Animation</h2>
                    <p className="text-xl text-gray-300 mb-4">
                        Watch the ball roll along a curved path as you scroll up and down.
                        The animation responds dynamically to your scroll input.
                    </p>
                    <div className="text-sm text-gray-400">
                        Scroll Progress: {Math.round(scrollProgress * 100)}%
                    </div>
                </div>
            </div>
        </section>
    )
}
