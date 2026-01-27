import { useRef } from 'react'
import { View } from '@react-three/drei'
import CursorScene from '../canvas/CursorScene'

export default function CursorShowcase({ isActive, showText = true }) {
    const container = useRef()

    return (
        <section ref={container} className="h-full w-full bg-transparent text-white relative flex items-center overflow-hidden">

            {/* Background 3D View - only render when active */}
            {isActive && (
                <div className="absolute inset-0 z-[60]">
                    <View className="w-full h-full">
                        <CursorScene />
                    </View>
                </div>
            )}

            {showText && (
                <div className="container mx-auto px-10 relative z-[200] pointer-events-none">
                    <div className="max-w-xl bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                        <h2 className="text-5xl font-bold mb-6">Interactive Cursor Tracking</h2>
                        <p className="text-xl text-gray-300">
                            Engage your users with elements that respond to their presence.
                            Our 3D models intelligently track mouse movement, creating a deeply connected user experience.
                        </p>
                    </div>
                </div>
            )}
        </section>
    )
}
