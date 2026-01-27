import { useState } from 'react'
import { View } from '@react-three/drei'
import ProductScene from '../canvas/ProductScene'

export default function ProductShowcase({ isActive }) {
    const [color, setColor] = useState('#646cff')
    const [model, setModel] = useState('torus') // torus, sphere, cube

    return (
        <section className="h-full w-full bg-transparent relative flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden z-[60]">
                {isActive && (
                    <View className="absolute inset-0 w-full h-full">
                        <ProductScene color={color} model={model} />
                    </View>
                )}
            </div>

            <div className="w-full md:w-1/2 h-1/2 md:h-full p-10 flex flex-col justify-center bg-gray-900/90 backdrop-blur z-10">
                <h2 className="text-4xl font-bold mb-4">Interactive Product Configurations</h2>
                <p className="text-gray-400 mb-8">
                    Let customers customize their purchase in real-time. Change colors, materials, and parts instantly.
                </p>

                <div className="mb-8">
                    <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">Choose Color</h3>
                    <div className="flex gap-4 mb-8">
                        {['#646cff', '#ff4081', '#00e676', '#ffffff'].map((c) => (
                            <button
                                key={c}
                                className={`w-10 h-10 rounded-full border-2 transition-all ${color === c ? 'border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                                aria-label={`Select color ${c}`}
                            />
                        ))}
                    </div>

                    <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">Choose Model</h3>
                    <div className="flex gap-4">
                        {['torus', 'sphere', 'cube'].map((m) => (
                            <button
                                key={m}
                                className={`px-4 py-2 border rounded-lg uppercase text-sm font-semibold transition-all ${model === m ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'}`}
                                onClick={() => setModel(m)}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="px-8 py-3 bg-accent text-white font-bold rounded-lg hover:bg-blue-600 transition-colors self-start shadow-lg">
                    View Details
                </button>
            </div>
        </section>
    )
}
