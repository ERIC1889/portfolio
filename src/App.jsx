import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import translations, { skillsData } from './i18n'
import profileImg from '/profile.jpeg?url'

const HeroScene = lazy(() => import('./components/HeroScene'))

/* ===== Animation Variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

/* ===== Typing Effect ===== */
function useTypingEffect(texts, speed = 80, deleteSpeed = 40, pauseTime = 2200) {
  const [display, setDisplay] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    let timeout
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1) }, speed)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, deleteSpeed)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex(i => (i + 1) % texts.length)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime])

  return display
}

/* ===== Animated Counter ===== */
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const num = parseInt(target)
        if (isNaN(num)) { setCount(target); return }
        const startTime = Date.now()
        const tick = () => {
          const progress = Math.min((Date.now() - startTime) / duration, 1)
          setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * num))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  const suffix = typeof target === 'string' ? target.replace(/[\d]/g, '') : ''
  return <span ref={ref}>{count}{suffix}</span>
}

/* ===== 3D Tilt Card ===== */
function TiltCard({ children, className, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px); y.set(py)
    ref.current.style.setProperty('--mouse-x', `${(px + 0.5) * 100}%`)
    ref.current.style.setProperty('--mouse-y', `${(py + 0.5) * 100}%`)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

/* ===== Modal ===== */
function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-body"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>×</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ===== Mobile Check ===== */
function useIsMobile() {
  const [m, setM] = useState(false)
  useEffect(() => {
    const check = () => setM(window.innerWidth < 768)
    check(); window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return m
}

/* ===== MAIN APP ===== */
function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || ((navigator.language || '').startsWith('ko') ? 'ko' : 'en'))
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState({ open: false, content: null })
  const [navScrolled, setNavScrolled] = useState(false)
  const isMobile = useIsMobile()

  const t = translations[lang]

  const typingTexts = lang === 'ko'
    ? ['AI 엔지니어', '프로덕트 빌더', 'WebDB 랩장', '풀스택 개발자']
    : ['AI Engineer', 'Product Builder', 'WebDB Lab Leader', 'Full-Stack Developer']
  const typedText = useTypingEffect(typingTexts)

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme) }, [theme])
  useEffect(() => { localStorage.setItem('lang', lang); document.documentElement.lang = lang }, [lang])
  useEffect(() => {
    const h = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h)
  }, [])

  const openModal = useCallback((c) => setModal({ open: true, content: c }), [])
  const closeModal = useCallback(() => setModal({ open: false, content: null }), [])

  const navItems = ['about', 'projects', 'papers', 'experience', 'work', 'skills', 'awards', 'certs', 'contact']

  const groupedSkills = {}
  skillsData.forEach(s => { if (!groupedSkills[s.category]) groupedSkills[s.category] = []; groupedSkills[s.category].push(s.name) })

  return (
    <>
      {/* ===== NAV ===== */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo gradient-text">JY.DEV</div>
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item}><a href={`#${item}`}>{t.nav[item]}</a></li>
            ))}
          </ul>
          <div className="nav-controls">
            <button className="toggle-btn" onClick={() => setLang(l => l === 'ko' ? 'en' : 'ko')}>{lang === 'ko' ? 'EN' : 'KO'}</button>
            <button className="toggle-btn" onClick={() => setTheme(th => th === 'light' ? 'dark' : 'light')}>{theme === 'light' ? '🌙' : '☀️'}</button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '✕' : '☰'}</button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="nav-mobile" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <ul>{navItems.map(item => (<li key={item}><a href={`#${item}`} onClick={() => setMenuOpen(false)}>{t.nav[item]}</a></li>))}</ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">
        {!isMobile ? (
          <Suspense fallback={null}><div className="hero-canvas"><HeroScene /></div></Suspense>
        ) : (
          <div className="hero-mobile-bg" />
        )}
        <div className="hero-grid-bg" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-content">
          <motion.img src={profileImg} alt="Profile" className="hero-photo" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
          <motion.p className="hero-greeting" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>{t.hero.greeting}</motion.p>
          <motion.h1 className="hero-name gradient-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>{t.hero.name}</motion.h1>
          <motion.p className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>{typedText}<span className="typing-cursor" /></motion.p>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}>{t.hero.subtitle}</motion.p>
          <motion.div className="hero-stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
            {t.hero.stats.map((s, i) => (
              <div className="stat-item" key={i}>
                {i > 0 && <div className="stat-divider" />}
                <div className="stat-number gradient-text"><AnimatedCounter target={s.number} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
          <motion.a href="#about" className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} whileHover={{ y: -3 }}>{t.hero.cta} ↓</motion.a>
        </div>
        <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}>
          <div className="scroll-mouse" />
        </motion.div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section" id="about">
        <div className="section-inner">
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.about.title}</motion.h2>
          <div className="about-layout">
            <div>
              <motion.p className="about-intro" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.about.intro}</motion.p>
              <motion.button className="btn-glass" style={{ marginBottom: 24 }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} onClick={() => openModal(
                <div><h3 className="modal-title">{t.about.title}</h3><p className="modal-desc">{t.about.fullText}</p></div>
              )}>{t.about.readMore}</motion.button>
              <motion.div className="values-row" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {t.about.values.map((v, i) => (
                  <motion.div key={i} className="glass value-chip" variants={fadeUp} whileHover={{ y: -3 }}>
                    <span className="value-icon">{v.icon}</span>
                    <div><div className="value-title">{v.title}</div><div className="value-desc">{v.desc}</div></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div>
              <motion.h3 className="subsection-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.about.education}</motion.h3>
              {t.about.educationData.map((ed, i) => (
                <motion.div key={i} className="glass edu-card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ x: 4 }}>
                  <div className="edu-period">{ed.period}</div>
                  <div className="edu-school">{ed.school}</div>
                  {ed.gpa && <div className="edu-gpa">GPA: {ed.gpa}</div>}
                  <span className="edu-status">{ed.status}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="section section-alt" id="projects">
        <div className="section-inner">
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.projects.title}</motion.h2>
          <motion.div className="projects-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            {t.projects.data.map((p, i) => (
              <TiltCard key={i} className="glass project-card" onClick={() => openModal(
                <div>
                  <h3 className="modal-title">{p.name}</h3>
                  <div className="modal-tags">{p.tags.map((tag, j) => <span className="tag-modal" key={j}>{tag}</span>)}</div>
                  <div className="modal-meta"><strong>{t.projects.period}:</strong> {p.period}</div>
                  {p.competitions && <div className="modal-competition">{p.competitions}</div>}
                  <p className="modal-desc">{p.detail}</p>
                </div>
              )}>
                <motion.div variants={fadeUp}>
                  <div className="project-tags">{p.tags.map((tag, j) => <span className="tag" key={j}>{tag}</span>)}</div>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-summary">{p.summary}</p>
                  <div className="project-period">{p.period}</div>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PAPERS ===== */}
      <section className="section" id="papers">
        <div className="section-inner">
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.papers.title}</motion.h2>
          <motion.div className="papers-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {t.papers.data.map((p, i) => (
              <motion.div key={i} className="glass paper-card" variants={fadeUp} whileHover={{ x: 4 }} onClick={() => openModal(
                <div>
                  <h3 className="modal-title">{p.title}</h3>
                  <div className="modal-meta">
                    <div><strong>{t.papers.authors}:</strong> {p.authors}</div>
                    <div><strong>{t.papers.venue}:</strong> {p.venue}</div>
                    <div className="modal-tags" style={{ marginTop: 8 }}>{p.type.split(', ').map((tag, j) => <span className="tag-modal" key={j}>{tag}</span>)}</div>
                  </div>
                </div>
              )}>
                <div className="paper-icon">📄</div>
                <div><h4 className="paper-title">{p.title}</h4><p className="paper-venue">{p.venue}</p></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section className="section section-alt" id="experience">
        <div className="section-inner">
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.experience.title}</motion.h2>
          <motion.div className="exp-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {t.experience.data.filter(e => e.highlight).map((e, i) => (
              <motion.div key={i} className="glass exp-card exp-card-hl" variants={fadeUp} whileHover={{ y: -4, scale: 1.02 }}>
                <div className="exp-badge">★</div>
                <h4 className="exp-name">{e.name}</h4>
                <div className="exp-period">{e.period}</div>
                <div className="exp-location">{e.location}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div style={{ textAlign: 'center' }} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <button className="btn-glass" onClick={() => openModal(
              <div>
                <h3 className="modal-title">{t.experience.title}</h3>
                <div className="modal-exp-list">
                  {t.experience.data.map((e, i) => (
                    <div key={i} className="modal-exp-item">
                      <div className="modal-exp-dot" />
                      <div><div className="modal-exp-name">{e.name}</div><div className="modal-exp-meta">{e.period} · {e.location}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}>
              {lang === 'ko' ? `전체 ${t.experience.data.length}개 경험 보기` : `View all ${t.experience.data.length} experiences`}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== WORK ===== */}
      <section className="section" id="work">
        <div className="section-inner">
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.work.title}</motion.h2>
          <motion.div className="work-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {t.work.data.map((w, i) => (
              <TiltCard key={i} className={`glass work-card ${w.current ? 'current' : ''}`} onClick={() => openModal(
                <div>
                  <h3 className="modal-title">{w.company}</h3>
                  <div className="modal-role">{w.role}</div>
                  <div className="modal-meta"><strong>{w.period}</strong></div>
                  <p className="modal-desc">{w.detail}</p>
                </div>
              )}>
                <motion.div variants={fadeUp}>
                  {w.current && <span className="current-badge">{lang === 'ko' ? '현재' : 'Current'}</span>}
                  <h3 className="work-company">{w.company}</h3>
                  <div className="work-role">{w.role}</div>
                  <div className="work-period-text">{w.period}</div>
                  <p className="work-summary">{w.summary}</p>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="section section-alt" id="skills">
        <div className="section-inner">
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.skills.title}</motion.h2>
          <motion.div className="skills-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {Object.entries(groupedSkills).map(([cat, skills]) => (
              <motion.div key={cat} className="glass skill-category" variants={fadeUp}>
                <h4 className="skill-cat-title">{t.skills.categories[cat] || cat}</h4>
                <div className="skill-pills">
                  {skills.map((s, j) => (
                    <motion.span key={j} className={`skill-pill cat-${cat.toLowerCase()}`}
                      whileHover={{ y: -2, scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >{s}</motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== AWARDS ===== */}
      <section className="section" id="awards">
        <div className="section-inner">
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.awards.title}</motion.h2>
          <motion.div className="awards-list" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {t.awards.data.map((a, i) => (
              <motion.div key={i} className={`glass award-card rank-${a.rank}`} variants={fadeUp} whileHover={{ x: 6 }}>
                <span className="award-medal">{a.rank === 'gold' ? '🥇' : a.rank === 'silver' ? '🥈' : '🥉'}</span>
                <div><div className="award-name">{a.award}</div><div className="award-meta">{a.org} · {a.date}</div></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CERTS ===== */}
      <section className="section section-alt" id="certs">
        <div className="section-inner">
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.certs.title}</motion.h2>
          <motion.div className="certs-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {t.certs.data.map((c, i) => (
              <motion.div key={i} className="glass cert-card" variants={scaleIn} whileHover={{ y: -4 }}>
                <div className="cert-icon">{c.icon}</div>
                <div className="cert-name">{c.name}</div>
                {c.detail && <div className="cert-detail">{c.detail}</div>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section" id="contact">
        <div className="section-inner">
          <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{t.contact.title}</motion.h2>
          <motion.div className="contact-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: '📞', label: t.contact.phone, value: '+82 10-3506-1889' },
              { icon: '✉️', label: t.contact.email, value: <a href="mailto:eric1889@hs.ac.kr">eric1889@hs.ac.kr</a> },
              { icon: '📍', label: t.contact.address, value: t.contact.addressValue },
              { icon: '🌐', label: t.contact.languages, value: t.contact.languagesValue },
              { icon: '💻', label: 'GitHub', value: <a href="https://github.com/ERIC1889" target="_blank" rel="noopener noreferrer">github.com/ERIC1889</a> },
              { icon: '🔗', label: 'LinkedIn', value: <a href="https://www.linkedin.com/in/%EC%A4%80%EC%98%81-%ED%97%88-8142a130a/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a> },
            ].map((item, i) => (
              <motion.div key={i} className="glass contact-card" variants={fadeUp} whileHover={{ y: -5 }}>
                <div className="contact-icon">{item.icon}</div>
                <div className="contact-label">{item.label}</div>
                <div className="contact-value">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="footer"><p>{t.footer.copyright}</p></footer>

      <Modal isOpen={modal.open} onClose={closeModal}>{modal.content}</Modal>
    </>
  )
}

export default App
