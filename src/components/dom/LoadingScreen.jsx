import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FullText = "VISUALIZ3D"

export default function LoadingScreen({ onFinished }) {
    const [text, setText] = useState("")
    const [index, setIndex] = useState(0)

    // Audio Context Ref
    const audioCtxRef = useRef(null)

    const playClick = () => {
        // Simple synth click
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
            }
            const ctx = audioCtxRef.current
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.connect(gain)
            gain.connect(ctx.destination)

            osc.type = 'square'
            osc.frequency.setValueAtTime(800, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1)

            gain.gain.setValueAtTime(0.05, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

            osc.start()
            osc.stop(ctx.currentTime + 0.1)
        } catch (e) {
            // Audio might be blocked or failed
            console.warn("Audio play failed", e)
        }
    }

    useEffect(() => {
        if (index < FullText.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + FullText[index])
                playClick()
                setIndex((prev) => prev + 1)
            }, 150) // Typing speed
            return () => clearTimeout(timeout)
        } else {
            // Finished typing, wait a bit then complete
            const timeout = setTimeout(() => {
                onFinished()
            }, 1000)
            return () => clearTimeout(timeout)
        }
    }, [index, onFinished])

    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
        >
            <h1 className="text-6xl md:text-8xl font-black tracking-widest text-white border-r-4 border-accent pr-2 animate-pulse">
                {text}
            </h1>
        </motion.div>
    )
}
