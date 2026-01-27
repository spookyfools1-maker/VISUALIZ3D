import { useRef } from 'react'
import { View } from '@react-three/drei'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import HeroScene from '../canvas/HeroScene'

export default function Hero({ onOpenWindow, isWindowOpen }) {
    const container = useRef()
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Map mouse position to rotation
    // We use window dimensions assuming full screen, but inside component works too if we get rect
    const rotateX = useTransform(y, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [15, -15])
    const rotateY = useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-15, 15])

    function handleMouse(event) {
        x.set(event.clientX)
        y.set(event.clientY)
    }

    return (
        <section
            ref={container}
            onMouseMove={handleMouse}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            style={{ perspective: '1000px' }}
        >
            {!isWindowOpen && (
                <div className="absolute inset-0 z-0">
                    <View className="w-full h-full">
                        <HeroScene />
                    </View>
                </div>
            )}

            <motion.div
                className="relative z-10 text-center"
                style={{ rotateX, rotateY }}
            >
                <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white mb-4 drop-shadow-2xl select-none pointer-events-none">
                    VISUALIZ<span className="text-accent">3D</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase select-none mb-12 pointer-events-none">
                    Next Gen Web Experiences
                </p>

                {/* Navigation Buttons */}
                <div className="flex gap-6 justify-center pointer-events-auto">
                    <button
                        onClick={() => onOpenWindow('product')}
                        className="group relative px-8 py-4 bg-gradient-to-r from-accent/20 to-purple-600/20 hover:from-accent/30 hover:to-purple-600/30 border border-accent/30 rounded-xl font-semibold text-white tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 backdrop-blur-sm"
                    >
                        <span className="relative z-10">Product Viewer</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />
                    </button>

                    <button
                        onClick={() => onOpenWindow('cursor')}
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-400/30 rounded-xl font-semibold text-white tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20 backdrop-blur-sm"
                    >
                        <span className="relative z-10">Cursor Animation</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />
                    </button>

                    <button
                        onClick={() => onOpenWindow('scroll')}
                        className="group relative px-8 py-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border border-green-400/30 rounded-xl font-semibold text-white tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/20 backdrop-blur-sm"
                    >
                        <span className="relative z-10">Scroll Animation</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />
                    </button>
                </div>
            </motion.div>
        </section>
    )
}
