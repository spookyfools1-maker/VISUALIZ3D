import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Window({ title, children, onClose, isOpen }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 bg-black/60 z-40"
                        onClick={onClose}
                    />

                    {/* Full-page overlay sliding from top */}
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth easing
                        }}
                        className="fixed inset-0 z-50 bg-zinc-900/95 backdrop-blur-xl"
                    >
                        {/* Close button - top left */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 left-6 z-[100] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        {/* Content */}
                        <div className="w-full h-full overflow-hidden">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
