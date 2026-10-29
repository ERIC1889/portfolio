import { describe, expect, it } from 'vitest'
import { archive, chapters, getPaperCounts, getRecordStats, getTopAwards, profile, projects } from './index'
import * as ui from './ui'
import { checkEn, checkKo, checkLinks, checkNoLocalPaths, checkNoPhoneNumbers, collectStrings } from './validate'

const ALL_CONTENT = { profile, chapters, projects, archive, ui: { ...ui } }

const textOf = (content: unknown) =>
  collectStrings(content)
    .map((s) => s.value)
    .join('\n')

describe('site content', () => {
  it('has no empty Korean or English text', () => {
    expect(checkKo(ALL_CONTENT)).toEqual([])
    expect(checkEn(ALL_CONTENT)).toEqual([])
  })

  it('links only to allowed public destinations', () => {
    expect(checkLinks(ALL_CONTENT)).toEqual([])
  })

  it('never exposes a local filesystem path or a phone number', () => {
    expect(checkNoLocalPaths(ALL_CONTENT)).toEqual([])
    expect(checkNoPhoneNumbers(ALL_CONTENT)).toEqual([])
  })

  it('uses no words of exhaustion or hardship anywhere on the site', () => {
    const text = textOf(ALL_CONTENT)
    for (const word of ['지쳐', '지쳤', '지치', '힘들', '힘겨', '괴로', 'worn out', 'wore myself', 'exhausted', 'burned out', 'burnt out']) {
      expect(text, word).not.toContain(word)
    }
  })

  it('names the company Finz Labs everywhere and leaves out the coding-instructor job', () => {
    const text = textOf(ALL_CONTENT)
    for (const old of ['수지하우스', 'SuziHouse', '컴세바', 'Comseba']) expect(text, old).not.toContain(old)
  })

  it('makes no unmeasurable claims', () => {
    const text = textOf(ALL_CONTENT)
    for (const claim of ['환각 0%', '해결률', '기여도', '완벽', 'flawless', '100%']) {
      expect(text, claim).not.toContain(claim)
    }
  })
})

describe('profile', () => {
  it('states the name, the role and the owner’s own line word for word', () => {
    expect(profile.name).toEqual({ ko: '허준영', en: 'Heo Jun Young' })
    expect(profile.role.ko).toBe('백엔드 중심 풀스택 개발자 · 2027년 2월 졸업 예정')
    expect(profile.quote.ko).toBe('익숙한 기술에 머물기보다,\n필요한 것을 직접 만들어 왔습니다.')
    expect(profile.quote.en).toBe("Beyond the tools I knew,\nI've built what was needed.")
    expect(profile.intro.ko).toBe('TypeScript와 Python으로 웹과 API를 만들고, 외부 데이터 연동과 계산 결과 검증을 맡아 왔습니다.')
  })

  it('lists email and professional profiles only — no phone, no address', () => {
    expect(profile.contacts.map((c) => c.kind)).toEqual(['email', 'github', 'linkedin', 'blog'])
    const href = (kind: string) => profile.contacts.find((c) => c.kind === kind)?.href
    expect(href('email')).toBe('mailto:eric1889@naver.com')
    expect(href('github')).toBe('https://github.com/ERIC1889')
    expect(href('blog')).toBe('https://junyoung-dev-notes.vercel.app')
    expect(textOf(profile)).not.toMatch(/서초|주소|address/i)
  })

  it('shows four to six core skills', () => {
    expect(profile.coreStack.length).toBeGreaterThanOrEqual(4)
    expect(profile.coreStack.length).toBeLessThanOrEqual(6)
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

  it('leaves out personal details, military service, job-hunting timing and present-tense distress', () => {
    const text = textOf(chapters)
    for (const banned of ['카페', '회식', 'MT', '배낭여행', '교수님', '병역', '산업기능요원', '취업 준비', '처절', '무리했', '열심히만으로', '제대로 챙기지 못']) {
      expect(text).not.toContain(banned)
    }
  })

  it('dates the CES visit to the following January, as a school representative', () => {
    const essay2025 = chapters[2].essay.map((p) => p.ko).join(' ')
    expect(essay2025).toContain('이듬해 1월에는 학교 대표로 CES 2026을 참관했습니다')
    expect(essay2025).not.toContain('한 해의 끝')
  })

  it('ends the story still growing', () => {
    expect(chapters[3].essay.at(-1)?.ko ?? '').toContain('성장 중')
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

  it('picks three top awards that all exist in the list', () => {
    expect(archive.topAwards).toHaveLength(3)
    expect(getTopAwards().map((a) => a.name.ko)).toEqual(archive.topAwards)
  })

  it('credits the 2025 summer conference awards to the Korea Digital Contents Society', () => {
    const summer2025 = archive.awards.filter((a) => a.date.startsWith('25.07'))
    expect(summer2025).toHaveLength(2)
    for (const award of summer2025) expect(award.org.ko).toBe('한국 디지털 콘텐츠 학회')
  })

  it('sorts every paper by kind and counts only conference papers on the home page', () => {
    const kinds = archive.papers.map((p) => p.kind)
    expect(kinds.filter((k) => k === 'international')).toHaveLength(1)
    expect(kinds.filter((k) => k === 'domestic')).toHaveLength(6)
    expect(kinds.filter((k) => k === 'contest')).toHaveLength(1)
    expect(kinds.filter((k) => k === 'campus')).toHaveLength(2)
    expect(getPaperCounts()).toEqual({ conference: 7, international: 1, firstAuthor: 3 })
  })

  it('marks the APIC-IST paper as international and second-author', () => {
    const pitches = archive.papers.find((p) => p.title.startsWith('Pitches:'))
    expect(pitches).toMatchObject({ kind: 'international', authorOrder: 2, year: 2025 })
  })

  it('gives every Korean-titled paper an English title', () => {
    const untranslated = archive.papers.filter((p) => /[가-힣]/.test(p.title) && !p.titleEn)
    expect(untranslated.map((p) => p.title)).toEqual([])
  })

  it('lists work with its context: Finz Labs only', () => {
    expect(archive.experience.map((w) => w.org.ko)).toEqual(['주식회사 Finz Labs (finz.kr)'])
    expect(archive.experience[0].context.ko).toContain('유일한 개발자')
  })

  it('counts the record from the data: projects, conference papers, awards, activities', () => {
    expect(getRecordStats().map((s) => [s.label.ko, s.value])).toEqual([
      ['프로젝트', projects.length],
      ['학술대회 논문', 7],
      ['수상', archive.awards.length],
      ['대외 활동', archive.activities.length],
    ])
    expect(getRecordStats()[1].note?.ko).toBe('국제 1 · 1저자 3')
    // the awards note claims a first-place grand prize; keep it true
    expect(archive.awards.some((a) => a.name.ko.includes('대상(1등)'))).toBe(true)
  })

  it('groups skills into six areas, each backed by at least one link', () => {
    expect(archive.skills.map((row) => row.area.ko)).toEqual(['웹·API', 'Python 백엔드', '데이터', '비동기·배치', 'AI 응용', '검증·배포'])
    for (const row of archive.skills) {
      expect(row.items.length, row.area.ko).toBeGreaterThan(0)
      expect(row.evidence.length, row.area.ko).toBeGreaterThan(0)
    }
  })

  it('links skill evidence inside the site only to pages and anchors that exist', () => {
    const featured = projects.filter((p) => p.tier === 'featured')
    for (const { href } of archive.skills.flatMap((row) => row.evidence)) {
      if (!href.startsWith('/')) continue
      const [path, anchor] = href.split('#')
      const project = featured.find((p) => path === `/projects/${p.slug}`)
      expect(project, href).toBeDefined()
      if (anchor) expect(project?.sections?.some((s) => s.anchor === anchor), href).toBe(true)
    }
  })

  it('states the current education', () => {
    expect(archive.education.period).toBe('2023.03–2027.02')
    expect(archive.education.gpa).toBe('3.7 / 4.5')
    expect(archive.education.major.ko).toContain('소프트웨어전공')
    expect(archive.education.note.ko).toContain('인지감성컴퓨팅')
  })
})
