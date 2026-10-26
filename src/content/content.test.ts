import { describe, expect, it } from 'vitest'
import { archive, chapters, getHeroStats, profile, projects } from './index'
import { NAV_LABELS, UI } from './ui'
import { checkEn, checkKo, checkLinks, checkNoLocalPaths, collectStrings } from './validate'

const ALL_CONTENT = { profile, chapters, projects, archive, NAV_LABELS, UI }

describe('site content', () => {
  it('has no empty Korean text', () => {
    expect(checkKo(ALL_CONTENT)).toEqual([])
  })

  it('has no empty English text', () => {
    expect(checkEn(ALL_CONTENT)).toEqual([])
  })

  it('uses the approved English first-screen copy', () => {
    expect(profile.whoami.en).toBe('~/junyoung $ whoami → Heo Jun Young · full-stack · AI products')
    expect(profile.quote.en).toBe("Not bound to one stack,\nI've built what was needed.")
    expect(profile.intro.en).toBe(
      "From screens to servers, data and AI. Instead of stopping at ideas, I've carried them through design, build, deployment and verification into results.",
    )
  })

  it('links only to allowed public destinations', () => {
    expect(checkLinks(ALL_CONTENT)).toEqual([])
  })

  it('never exposes a local filesystem path', () => {
    expect(checkNoLocalPaths(ALL_CONTENT)).toEqual([])
  })
})

describe('profile', () => {
  it('uses the approved first-screen copy word for word', () => {
    expect(profile.whoami.ko).toBe('~/junyoung $ whoami → 허준영 · full-stack · AI 서비스')
    expect(profile.quote.ko).toBe('한 가지 기술에 머물기보다,\n필요한 것을 직접 만들어 왔습니다.')
    expect(profile.intro.ko).toBe('화면부터 서버, 데이터, AI까지. 아이디어로 끝내지 않고 설계·구현·배포·검증을 거쳐 결과로 남겼습니다.')
  })

  it('counts the hero numbers from the data itself', () => {
    expect(getHeroStats().map((s) => [s.label.ko, s.value])).toEqual([
      ['수상', archive.awards.length],
      ['논문', archive.papers.length],
      ['프로젝트', projects.length],
    ])
  })

  it('lists the six contact channels with their public links', () => {
    expect(profile.contacts.map((c) => c.kind)).toEqual(['phone', 'email', 'address', 'languages', 'github', 'linkedin'])
    const href = (kind: string) => profile.contacts.find((c) => c.kind === kind)?.href
    expect(href('phone')).toBe('tel:+821035061889')
    expect(href('email')).toBe('mailto:eric1889@naver.com')
    expect(href('github')).toBe('https://github.com/ERIC1889')
    expect(href('linkedin')).toBe('https://www.linkedin.com/in/%EC%A4%80%EC%98%81-%ED%97%88-8142a130a/')
    expect(href('address')).toBeUndefined()
  })
})

describe('four-year story', () => {
  it('has the four chapters in order with their names', () => {
    expect(chapters.map((c) => c.year)).toEqual([2023, 2024, 2025, 2026])
    expect(chapters.map((c) => c.name.ko)).toEqual(['배우다', '만들다', '함께하다', '책임지다'])
  })

  it('keeps every chapter short: 2–3 paragraphs, at most 420 characters, plus a one-line lesson', () => {
    for (const chapter of chapters) {
      expect(chapter.essay.length).toBeGreaterThanOrEqual(2)
      expect(chapter.essay.length).toBeLessThanOrEqual(3)
      const length = chapter.essay.reduce((sum, p) => sum + p.ko.length, 0)
      expect(length, `${chapter.year} is ${length} characters`).toBeLessThanOrEqual(420)
      expect(chapter.lesson.ko.length).toBeLessThanOrEqual(40)
    }
  })

  it('leaves out personal details a recruiter does not need', () => {
    const text = collectStrings(chapters)
      .map((s) => s.value)
      .join('\n')
    for (const detail of ['카페', '회식', 'MT', '배낭여행', '교수님']) {
      expect(text).not.toContain(detail)
    }
  })

  it('leaves out military service, job-hunting timing and present-tense distress', () => {
    const text = collectStrings(chapters)
      .map((s) => s.value)
      .join('\n')
    for (const banned of ['병역', '산업기능요원', '취업 준비', '요즘 힘들']) {
      expect(text).not.toContain(banned)
    }
  })

  it('closes 2025 with the CES visit as a school representative', () => {
    const essay2025 = chapters[2].essay.map((p) => p.ko).join(' ')
    expect(essay2025).toContain('CES')
    expect(essay2025).toContain('학교 대표')
  })

  it('ends the story still growing', () => {
    const last = chapters[3].essay.at(-1)?.ko ?? ''
    expect(last).toContain('성장 중')
  })
})

describe('archive', () => {
  it('carries the latest award and activity lists in full', () => {
    expect(archive.awards).toHaveLength(13)
    expect(archive.activities).toHaveLength(17)
  })

  it('keeps "(1등)" only on the Capstone Design & AI Hackathon grand prize', () => {
    const firsts = archive.awards.filter((a) => a.name.ko.includes('(1등)'))
    expect(firsts.map((a) => a.name.ko)).toEqual(['캡스톤 디자인 및 AI 해커톤 대상(1등)'])
  })

  it('credits the 2025 summer conference awards to the Korea Digital Contents Society', () => {
    const summer2025 = archive.awards.filter((a) => a.date.startsWith('25.07'))
    expect(summer2025).toHaveLength(2)
    for (const award of summer2025) expect(award.org.ko).toBe('한국 디지털 콘텐츠 학회')
  })

  it('groups skills into the four groups of the latest resume', () => {
    expect(archive.skills.map((g) => g.group.ko)).toEqual(['웹·API', '데이터·비동기 처리', '모바일·Python', 'AI·품질 도구'])
    expect(archive.skills.map((g) => g.items)).toEqual([
      ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js'],
      ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'BullMQ'],
      ['Expo / React Native', 'Python', 'FastAPI'],
      ['OpenAI API', 'Whisper', 'ONNX Runtime', 'Vitest', 'pytest', 'GitHub Actions'],
    ])
  })

  it('states the current education', () => {
    expect(archive.education.period).toBe('2023.03–2027.02')
    expect(archive.education.gpa).toBe('3.7 / 4.5')
    expect(archive.education.major.ko).toContain('소프트웨어전공')
    expect(archive.education.note.ko).toContain('인지감성컴퓨팅')
  })

  it('lists papers by title, venue and year only, marking the international one', () => {
    expect(archive.papers).toHaveLength(8)
    const international = archive.papers.filter((p) => p.international)
    expect(international.map((p) => p.title)).toEqual([
      'Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI',
    ])
    for (const paper of archive.papers) expect(Object.keys(paper).sort()).not.toContain('authors')
  })

  it('gives every Korean-titled paper an English title', () => {
    const untranslated = archive.papers.filter((p) => /[가-힣]/.test(p.title) && !p.titleEn)
    expect(untranslated.map((p) => p.title)).toEqual([])
  })

  it('keeps only the coding-instructor job under work (SuziHouse is a case study)', () => {
    expect(archive.work.map((w) => w.company.ko)).toEqual(['컴세바 입시 컨설팅 학원'])
  })
})
