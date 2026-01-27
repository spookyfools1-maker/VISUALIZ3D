import { View } from '@react-three/drei'
import ScrollScene from '../canvas/ScrollScene'

export default function ScrollShowcase() {
    return (
        <section className="min-h-screen w-full py-20 bg-transparent text-white relative flex items-center">
            <div className="container mx-auto px-10">
                <h2 className="text-5xl font-bold mb-16 text-center">Fluid Scroll Animations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="h-[500px] w-full relative">
                        {/* The 3D View Container */}
                        <div className="w-full h-full border border-gray-800 rounded-2xl overflow-hidden relative bg-black/20">
                            <View className="absolute inset-0 w-full h-full">
                                <ScrollScene />
                            </View>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6">
                        <p className="text-3xl font-light text-white leading-relaxed">
                            "Scroll down to see the magic."
                        </p>
                        <p className="text-xl text-gray-400">
                            We build immersive experiences where the content reacts to your users' movement.
                            Simple interactions become memorable moments with high-performance 3D animations driven by native scrolling.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
