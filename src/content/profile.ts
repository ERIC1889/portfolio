import type { Profile } from './types'

// Public contact is email and professional profiles only (phone and address removed on purpose).
export const profile: Profile = {
  name: { ko: '허준영', en: 'Heo Jun Young' },
  role: { ko: '백엔드 중심 풀스택 개발자 · 2027년 2월 졸업 예정', en: 'Backend-focused full-stack developer · graduating Feb 2027' },
  // The owner's own words; the line breaks after the comma on purpose.
  quote: { ko: '익숙한 기술에 머물기보다,\n필요한 것을 직접 만들어 왔습니다.', en: "Beyond the tools I knew,\nI've built what was needed." },
  intro: {
    ko: 'TypeScript와 Python으로 웹과 API를 만들고, 외부 데이터 연동과 계산 결과 검증을 맡아 왔습니다.',
    en: "I build web apps and APIs in TypeScript and Python, and I've handled external data integrations and checking that calculated results are right.",
  },
  coreStack: ['TypeScript', 'Node.js', 'Next.js', 'Python · FastAPI', 'MySQL · PostgreSQL', 'Redis'],
  contacts: [
    { kind: 'email', label: { ko: '이메일', en: 'Email' }, value: 'eric1889@naver.com', href: 'mailto:eric1889@naver.com' },
    { kind: 'github', label: { ko: 'GitHub', en: 'GitHub' }, value: 'github.com/ERIC1889', href: 'https://github.com/ERIC1889' },
    {
      kind: 'linkedin',
      label: { ko: 'LinkedIn', en: 'LinkedIn' },
      value: 'LinkedIn',
      href: 'https://www.linkedin.com/in/%EC%A4%80%EC%98%81-%ED%97%88-8142a130a/',
    },
    { kind: 'blog', label: { ko: '기술 블로그', en: 'Tech blog' }, value: 'junyoung-dev-notes.vercel.app', href: 'https://junyoung-dev-notes.vercel.app' },
  ],
}
