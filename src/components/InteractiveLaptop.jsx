import { useState, useEffect, useRef } from 'react'

const CODE_LINES = [
  { text: 'const developer = {', color: '#c792ea' },
  { text: '  name: "허준영",', color: '#c3e88d' },
  { text: '  role: "AI Engineer",', color: '#c3e88d' },
  { text: '  skills: ["React", "Python"],', color: '#89ddff' },
  { text: '  passion: "Building things",', color: '#f78c6c' },
  { text: '};', color: '#c792ea' },
  { text: '', color: '#545454' },
  { text: 'while (developer.alive) {', color: '#c792ea' },
  { text: '  developer.learn();', color: '#82aaff' },
  { text: '  developer.build();', color: '#82aaff' },
  { text: '  developer.grow();', color: '#82aaff' },
  { text: '}', color: '#c792ea' },
]

export default function InteractiveLaptop() {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 })
  const [isHappy, setIsHappy] = useState(false)

  // Mouse tracking for tilt + eyes
  useEffect(() => {
    const handleMouse = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (window.innerWidth / 2)
      const dy = (e.clientY - cy) / (window.innerHeight / 2)
      setTilt({ x: dy * -12, y: dx * 12 })
      setEyePos({ x: dx * 4, y: dy * 3 })
    }
    const handleLeave = () => {
      setTilt({ x: 0, y: 0 })
      setEyePos({ x: 0, y: 0 })
    }
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  // Typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= CODE_LINES.length) return 0
        return prev + 1
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(interval)
  }, [])

  // Random happy face
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHappy(true)
      setTimeout(() => setIsHappy(false), 2000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="laptop-wrapper" ref={containerRef}>
      <div
        className="laptop-3d"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Screen / Lid */}
        <div className="laptop-lid">
          {/* Face on the back of the lid */}
          <div className="laptop-face">
            <div className="face-eyes">
              <div className="face-eye">
                <div className="face-pupil" style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }} />
              </div>
              <div className="face-eye">
                <div className="face-pupil" style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }} />
              </div>
            </div>
            <div className={`face-mouth ${isHappy ? 'happy' : ''}`} />
            <div className="face-blush face-blush-l" style={{ opacity: isHappy ? 1 : 0 }} />
            <div className="face-blush face-blush-r" style={{ opacity: isHappy ? 1 : 0 }} />
          </div>

          {/* Screen */}
          <div className="laptop-screen">
            <div className="screen-header">
              <div className="screen-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="screen-title">portfolio.js</span>
            </div>
            <div className="screen-content">
              {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="screen-line">
                  <span className="line-num">{i + 1}</span>
                  <span style={{ color: line.color }}>{line.text}</span>
                  {i === visibleLines - 1 && (
                    <span className="screen-cursor" style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
                  )}
                </div>
              ))}
            </div>
            {/* Screen reflection */}
            <div className="screen-reflection" />
          </div>
        </div>

        {/* Base / Keyboard */}
        <div className="laptop-base-body">
          <div className="keyboard-area">
            {Array.from({ length: 4 }, (_, row) => (
              <div key={row} className="key-row">
                {Array.from({ length: 10 - (row === 3 ? 4 : 0) }, (_, col) => (
                  <div
                    key={col}
                    className={`key ${row === 3 && col === 2 ? 'key-space' : ''}`}
                    style={{
                      animationDelay: `${(row * 10 + col) * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="trackpad" />
          {/* Status LED */}
          <div className="status-led" />
        </div>

        {/* Laptop hinge */}
        <div className="laptop-hinge" />

        {/* Shadow */}
        <div className="laptop-shadow" />

        {/* Stickers */}
        <div className="sticker sticker-1">⚛️</div>
        <div className="sticker sticker-2">🐍</div>
        <div className="sticker sticker-3">🤖</div>
      </div>
    </div>
  )
}
