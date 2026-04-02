import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion'
import translations, { skillsData } from './i18n'
import profileImg from '/profile.jpeg?url'
import { Canvas } from '@react-three/fiber'
import Global3DScene from './components/Global3DScene'



/* ===== Variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] } })
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }

/* ===== useIsMobile ===== */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < breakpoint)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

/* ===== Hooks ===== */
function useTypingEffect(texts, speed = 80, del = 40, pause = 2200) {
  const [d, setD] = useState(''); const [ti, setTi] = useState(0); const [ci, setCi] = useState(0); const [isD, setIsD] = useState(false)
  useEffect(() => { const c = texts[ti]; let t
    if (!isD && ci < c.length) t = setTimeout(() => { setD(c.slice(0, ci + 1)); setCi(x => x + 1) }, speed)
    else if (!isD && ci === c.length) t = setTimeout(() => setIsD(true), pause)
    else if (isD && ci > 0) t = setTimeout(() => { setD(c.slice(0, ci - 1)); setCi(x => x - 1) }, del)
    else if (isD && ci === 0) { setIsD(false); setTi(i => (i + 1) % texts.length) }
    return () => clearTimeout(t) }, [ci, isD, ti, texts, speed, del, pause]); return d
}

function Counter({ target, duration = 2000 }) {
  const [c, setC] = useState(0); const ref = useRef(null); const s = useRef(false)
  useEffect(() => { const el = ref.current; const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !s.current) { s.current = true; const n = parseInt(target); if (isNaN(n)) { setC(target); return }
    const st = Date.now(); const tick = () => { const p = Math.min((Date.now() - st) / duration, 1); setC(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(tick) }; requestAnimationFrame(tick) }
  }, { threshold: 0.5 }); if (el) obs.observe(el); return () => obs.disconnect() }, [target, duration])
  return <span ref={ref}>{c}{typeof target === 'string' ? target.replace(/[\d]/g, '') : ''}</span>
}

function TiltCard({ children, className, onClick, disableTilt }) {
  const ref = useRef(null); const x = useMotionValue(0); const y = useMotionValue(0)
  const rx = useTransform(y, [-0.5, 0.5], [6, -6]); const ry = useTransform(x, [-0.5, 0.5], [-6, 6])
  const move = (e) => { if (disableTilt || !ref.current) return; const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5
    x.set(px); y.set(py); ref.current.style.setProperty('--mx', `${(px + 0.5) * 100}%`); ref.current.style.setProperty('--my', `${(py + 0.5) * 100}%`) }
  return <motion.div ref={ref} className={className} style={disableTilt ? {} : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
    onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0) }} whileHover={disableTilt ? {} : { scale: 1.02 }} onClick={onClick}>{children}</motion.div>
}

function Modal({ isOpen, onClose, children }) {
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [isOpen])
  useEffect(() => { const h = e => e.key === 'Escape' && onClose(); if (isOpen) window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h) }, [isOpen, onClose])
  return <AnimatePresence>{isOpen && (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal-body" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>{children}
      </motion.div>
    </motion.div>
  )}</AnimatePresence>
}

/* ===== Scroll-animated section wrapper ===== */
function ScrollSection({ children, className, id }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.15], [60, 0])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOp = useSpring(opacity, { stiffness: 100, damping: 30 })

  return (
    <section ref={ref} className={className} id={id}>
      <motion.div style={{ opacity: smoothOp, y: smoothY }}>
        {children}
      </motion.div>
    </section>
  )
}

/* ===== APP ===== */
function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || ((navigator.language || '').startsWith('ko') ? 'ko' : 'en'))
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState({ open: false, content: null })
  const [scrolled, setScrolled] = useState(false)
  const t = translations[lang]
  const isMobile = useIsMobile(768)

  const typingTexts = [t.hero.role]
  const typedText = useTypingEffect(typingTexts)

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme) }, [theme])
  useEffect(() => { localStorage.setItem('lang', lang); document.documentElement.lang = lang }, [lang])
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])

  const openModal = useCallback(c => setModal({ open: true, content: c }), [])
  const closeModal = useCallback(() => setModal({ open: false, content: null }), [])

  const navItems = ['about', 'projects', 'papers', 'experience', 'work', 'skills', 'awards', 'certs', 'contact']
  const gs = {}; skillsData.forEach(s => { if (!gs[s.category]) gs[s.category] = []; gs[s.category].push(s.name) })

  return (<>
    {!isMobile && (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas eventSource={typeof document !== 'undefined' ? document.body : undefined} eventPrefix="client" camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
          <Global3DScene />
        </Canvas>
      </div>
    )}
    {/* NAV */}
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo gradient-text">JY.DEV</a>
        <ul className="nav-links">{navItems.map(i => <li key={i}><a href={`#${i}`}>{t.nav[i]}</a></li>)}</ul>
        <div className="nav-right">
          <button className="toggle-btn" onClick={() => setLang(l => l === 'ko' ? 'en' : 'ko')}>{lang === 'ko' ? 'EN' : 'KO'}</button>
          <button className="toggle-btn" onClick={() => setTheme(h => h === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '✕' : '☰'}</button>
        </div>
      </div>
      <AnimatePresence>{menuOpen && (
        <motion.div className="nav-mobile" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
          <ul>{navItems.map(i => <li key={i}><a href={`#${i}`} onClick={() => setMenuOpen(false)}>{t.nav[i]}</a></li>)}</ul>
        </motion.div>
      )}</AnimatePresence>
    </nav>

    {/* HERO */}
    <section className="hero">
      <div className="hero-bg"><div className="hero-orb orb-1" /><div className="hero-orb orb-2" /><div className="hero-grid" /></div>
      <div className="hero-inner">
        <div className="hero-content">
          <motion.div className="hero-badge glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="badge-dot" />{lang === 'ko' ? '포트폴리오' : 'Portfolio'}
          </motion.div>
          <motion.img src={profileImg} alt="" className="hero-photo" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} />
          <motion.p className="hero-greeting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{t.hero.greeting}</motion.p>
          <motion.h1 className="hero-name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>{t.hero.name}</motion.h1>
          <motion.p className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <span className="code-br">&lt;</span> {typedText}<span className="cursor" /><span className="code-br"> /&gt;</span>
          </motion.p>
          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{t.hero.subtitle}</motion.p>
          <motion.div className="hero-stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            {t.hero.stats.map((s, i) => <div className="glass stat" key={i}><div className="stat-num gradient-text"><Counter target={s.number} /></div><div className="stat-label">{s.label}</div></div>)}
          </motion.div>
          <motion.a href="#about" className="hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} whileHover={{ y: -3 }}>
            {t.hero.cta} <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>↓</motion.span>
          </motion.a>
        </div>
        <motion.div className="hero-3d" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          {isMobile && <div className="hero-mobile-glow" />}
        </motion.div>
      </div>
      <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <div className="scroll-mouse" />
      </motion.div>
    </section>

    {/* ABOUT */}
    <ScrollSection className="sec" id="about">
      <div className="sec-inner">
        <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="sec-num">01</span><h2>{t.about.title}</h2></motion.div>
        <div className="about-grid">
          <div>
            <motion.p className="body-text" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.about.intro}</motion.p>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <button className="btn-glass" onClick={() => openModal(<div><h3 className="modal-title">{t.about.title}</h3><p className="modal-desc">{t.about.fullText}</p></div>)}>{t.about.readMore}</button>
            </motion.div>
            <motion.div className="values" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {t.about.values.map((v, i) => <motion.div key={i} className="glass value-card" variants={fadeUp} whileHover={{ y: -4 }}><span className="value-icon">{v.icon}</span><div><div className="value-title">{v.title}</div><div className="value-desc">{v.desc}</div></div></motion.div>)}
            </motion.div>
          </div>
          <div>
            <motion.h3 className="sub-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.about.education}</motion.h3>
            {t.about.educationData.map((ed, i) => (
              <motion.div key={i} className="glass edu-card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ x: 4 }}>
                <div className="edu-period">{ed.period}</div><div className="edu-school">{ed.school}</div>{ed.gpa && <div className="edu-gpa">GPA: {ed.gpa}</div>}<span className="edu-badge">{ed.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollSection>

    {/* PROJECTS */}
    <ScrollSection className="sec sec-alt" id="projects">
      <div className="sec-inner">
        <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="sec-num">02</span><h2>{t.projects.title}</h2></motion.div>
        <motion.div className="project-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {t.projects.data.map((p, i) => (
            <TiltCard key={i} className="glass project-card" disableTilt={isMobile} onClick={() => openModal(
              <div><h3 className="modal-title">{p.name}</h3><div className="modal-tags">{p.tags.map((tag, j) => <span className="tag" key={j}>{tag}</span>)}</div>
                <div className="modal-meta"><strong>{t.projects.period}:</strong> {p.period}</div>{p.competitions && <div className="modal-hl">{p.competitions}</div>}<p className="modal-desc">{p.detail}</p></div>
            )}><motion.div variants={fadeUp}>
              <div className="project-tags">{p.tags.map((tag, j) => <span className="tag-sm" key={j}>{tag}</span>)}</div>
              <h3 className="project-name">{p.name}</h3><p className="project-summary">{p.summary}</p><div className="project-period">{p.period}</div>
            </motion.div></TiltCard>
          ))}
        </motion.div>
      </div>
    </ScrollSection>

    {/* PAPERS */}
    <ScrollSection className="sec" id="papers">
      <div className="sec-inner">
        <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="sec-num">03</span><h2>{t.papers.title}</h2></motion.div>
        <motion.div className="paper-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {t.papers.data.map((p, i) => (
            <motion.div key={i} className="glass paper-card" variants={fadeUp} whileHover={{ x: 4 }} onClick={() => openModal(
              <div><h3 className="modal-title">{p.title}</h3><div className="modal-meta"><strong>{t.papers.authors}:</strong> {p.authors}<br /><strong>{t.papers.venue}:</strong> {p.venue}</div>
                <div className="modal-tags">{p.type.split(', ').map((tag, j) => <span className="tag" key={j}>{tag}</span>)}</div></div>
            )}><div className="paper-icon">📄</div><div><h4 className="paper-title">{p.title}</h4><p className="paper-venue">{p.venue}</p></div></motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollSection>

    {/* EXPERIENCE */}
    <ScrollSection className="sec sec-alt" id="experience">
      <div className="sec-inner">
        <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="sec-num">04</span><h2>{t.experience.title}</h2></motion.div>
        <motion.div className="exp-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {t.experience.data.filter(e => e.highlight).map((e, i) => (
            <motion.div key={i} className="glass exp-card" variants={fadeUp} whileHover={{ y: -5, scale: 1.02 }}>
              <div className="exp-badge">★</div><h4>{e.name}</h4><div className="exp-period">{e.period}</div><div className="exp-location">{e.location}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="center mt-24" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <button className="btn-glass" onClick={() => openModal(<div><h3 className="modal-title">{t.experience.title}</h3><div className="timeline">{t.experience.data.map((e, i) => <div key={i} className="tl-item"><div className="tl-dot" /><div><div className="tl-name">{e.name}</div><div className="tl-meta">{e.period} · {e.location}</div></div></div>)}</div></div>)}>
            {lang === 'ko' ? `전체 ${t.experience.data.length}개 보기` : `View all ${t.experience.data.length}`}
          </button>
        </motion.div>
      </div>
    </ScrollSection>

    {/* WORK */}
    <ScrollSection className="sec" id="work">
      <div className="sec-inner">
        <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="sec-num">05</span><h2>{t.work.title}</h2></motion.div>
        <motion.div className="work-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {t.work.data.map((w, i) => (
            <TiltCard key={i} className={`glass work-card ${w.current ? 'work-current' : ''}`} disableTilt={isMobile} onClick={() => openModal(
              <div><h3 className="modal-title">{w.company}</h3><div className="modal-role">{w.role}</div><div className="modal-meta">{w.period}</div><p className="modal-desc">{w.detail}</p></div>
            )}><motion.div variants={fadeUp}>
              {w.current && <span className="current-badge">{lang === 'ko' ? '현재' : 'Current'}</span>}
              <h3 className="work-company">{w.company}</h3><div className="work-role">{w.role}</div><div className="work-period">{w.period}</div><p className="work-summary">{w.summary}</p>
            </motion.div></TiltCard>
          ))}
        </motion.div>
      </div>
    </ScrollSection>

    {/* SKILLS */}
    <ScrollSection className="sec sec-alt" id="skills">
      <div className="sec-inner">
        <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="sec-num">06</span><h2>{t.skills.title}</h2></motion.div>
        <motion.div className="skill-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {Object.entries(gs).map(([cat, skills]) => (
            <motion.div key={cat} className="glass skill-group" variants={fadeUp}>
              <h4 className="skill-cat">{t.skills.categories[cat] || cat}</h4>
              <div className="skill-pills">{skills.map((s, j) => <motion.span key={j} className={`pill cat-${cat.toLowerCase()}`} whileHover={{ y: -2, scale: 1.08 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>{s}</motion.span>)}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollSection>

    {/* AWARDS */}
    <ScrollSection className="sec" id="awards">
      <div className="sec-inner">
        <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="sec-num">07</span><h2>{t.awards.title}</h2></motion.div>
        <motion.div className="award-list" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {t.awards.data.map((a, i) => (
            <motion.div key={i} className={`glass award-card rank-${a.rank}`} variants={fadeUp} whileHover={{ x: 6 }}>
              <span className="award-medal">{a.rank === 'gold' ? '🥇' : a.rank === 'silver' ? '🥈' : '🥉'}</span>
              <div><div className="award-name">{a.award}</div><div className="award-meta">{a.org} · {a.date}</div></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollSection>

    {/* CERTS */}
    <ScrollSection className="sec sec-alt" id="certs">
      <div className="sec-inner">
        <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="sec-num">08</span><h2>{t.certs.title}</h2></motion.div>
        <motion.div className="cert-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {t.certs.data.map((c, i) => <motion.div key={i} className="glass cert-card" variants={scaleIn} whileHover={{ y: -4 }}><div className="cert-icon">{c.icon}</div><div className="cert-name">{c.name}</div>{c.detail && <div className="cert-detail">{c.detail}</div>}</motion.div>)}
        </motion.div>
      </div>
    </ScrollSection>

    {/* CONTACT */}
    <ScrollSection className="sec" id="contact">
      <div className="sec-inner">
        <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="sec-num">09</span><h2>{t.contact.title}</h2></motion.div>
        <motion.div className="contact-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { icon: '📞', label: t.contact.phone, value: '+82 10-3506-1889' },
            { icon: '✉️', label: t.contact.email, value: <a href="mailto:eric1889@hs.ac.kr">eric1889@hs.ac.kr</a> },
            { icon: '📍', label: t.contact.address, value: t.contact.addressValue },
            { icon: '🌐', label: t.contact.languages, value: t.contact.languagesValue },
            { icon: '💻', label: 'GitHub', value: <a href="https://github.com/ERIC1889" target="_blank" rel="noopener noreferrer">github.com/ERIC1889</a> },
            { icon: '🔗', label: 'LinkedIn', value: <a href="https://www.linkedin.com/in/%EC%A4%80%EC%98%81-%ED%97%88-8142a130a/" target="_blank" rel="noopener noreferrer">LinkedIn</a> },
          ].map((item, i) => <motion.div key={i} className="glass contact-card" variants={fadeUp} whileHover={{ y: -5 }}>
            <div className="contact-icon">{item.icon}</div><div className="contact-label">{item.label}</div><div className="contact-value">{item.value}</div>
          </motion.div>)}
        </motion.div>
      </div>
    </ScrollSection>

    <footer className="footer"><p>{t.footer.copyright}</p></footer>
    <Modal isOpen={modal.open} onClose={closeModal}>{modal.content}</Modal>
  </>)
}

export default App
