import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { View, Preload } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/sections/Hero'
import CursorShowcase from './components/sections/CursorShowcase'
import ProductShowcase from './components/sections/ProductShowcase'
import ScrollAnimationShowcase from './components/sections/ScrollAnimationShowcase'
import Contact from './components/sections/Contact'
import LoadingScreen from './components/dom/LoadingScreen'
import Window from './components/dom/Window'

function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeWindow, setActiveWindow] = useState(null)
  const container = useRef()

  const openWindow = (windowName) => setActiveWindow(windowName)
  const closeWindow = () => setActiveWindow(null)

  return (
    <div ref={container} className="relative w-full h-full overflow-x-hidden bg-black selection:bg-accent selection:text-white">

      <AnimatePresence>
        {!loaded && <LoadingScreen onFinished={() => setLoaded(true)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* DOM Content */}
        <div className="relative z-10 w-full">
          <Hero onOpenWindow={openWindow} isWindowOpen={!!activeWindow} />
          <Contact />
        </div>

        {/* Windows */}
        <Window
          title="Product Showcase"
          isOpen={activeWindow === 'product'}
          onClose={closeWindow}
        >
          <ProductShowcase isActive={activeWindow === 'product'} />
        </Window>

        <Window
          title="Cursor Showcase"
          isOpen={activeWindow === 'cursor'}
          onClose={closeWindow}
        >
          <CursorShowcase isActive={activeWindow === 'cursor'} showText={false} />
        </Window>

        <Window
          title="Scroll Animation"
          isOpen={activeWindow === 'scroll'}
          onClose={closeWindow}
        >
          <ScrollAnimationShowcase isActive={activeWindow === 'scroll'} />
        </Window>

        {/* Background Canvas - for Hero scene only */}
        {!activeWindow && (
          <Canvas
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            eventSource={document.getElementById('root')}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          >
            <Suspense fallback={null}>
              <View.Port />
              <Preload all />
            </Suspense>
          </Canvas>
        )}

        {/* Window Canvas - for window content only */}
        {activeWindow && (
          <Canvas
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            eventSource={document.getElementById('root')}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 100,
              pointerEvents: 'none'
            }}
          >
            <Suspense fallback={null}>
              <View.Port />
            </Suspense>
          </Canvas>
        )}

        {/* Text overlay - renders after Canvas to appear on top */}
        {activeWindow === 'cursor' && (
          <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center">
            <div className="w-[90vw] h-[85vh] flex items-center">
              <div className="container mx-auto px-10">
                <div className="max-w-xl bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                  <h2 className="text-5xl font-bold mb-6 text-white">Interactive Cursor Tracking</h2>
                  <p className="text-xl text-gray-300">
                    Engage your users with elements that respond to their presence.
                    Our 3D models intelligently track mouse movement, creating a deeply connected user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default App
