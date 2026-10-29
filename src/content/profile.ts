import type { Profile } from './types'

export const profile: Profile = {
  whoami: { ko: '~/junyoung $ whoami → 허준영 · full-stack · AI 서비스', en: '~/junyoung $ whoami → Heo Jun Young · full-stack · AI products' },
  // The quote breaks after the comma on purpose (rendered with white-space: pre-line).
  quote: { ko: '익숙한 기술에 머물기보다,\n필요한 것을 직접 만들어 왔습니다.', en: "Beyond the tools I knew,\nI've built what was needed." },
  intro: {
    ko: '화면부터 서버, 데이터, AI까지. 아이디어로 끝내지 않고 설계·구현·배포·검증을 거쳐 결과로 남겼습니다.',
    en: "From screens to servers, data and AI. Instead of stopping at ideas, I've carried them through design, build, deployment and verification into results.",
  },
  photo: '/profile.jpeg',
  contacts: [
    {
      kind: 'email',
      label: { ko: '이메일', en: 'Email' },
      value: { ko: 'eric1889@naver.com', en: 'eric1889@naver.com' },
      href: 'mailto:eric1889@naver.com',
    },
    { kind: 'languages', label: { ko: '언어', en: 'Languages' }, value: { ko: '한국어 · 영어', en: 'Korean · English' } },
    {
      kind: 'github',
      label: { ko: 'GitHub', en: 'GitHub' },
      value: { ko: 'github.com/ERIC1889', en: 'github.com/ERIC1889' },
      href: 'https://github.com/ERIC1889',
    },
    {
      kind: 'linkedin',
      label: { ko: 'LinkedIn', en: 'LinkedIn' },
      value: { ko: 'LinkedIn', en: 'LinkedIn' },
      href: 'https://www.linkedin.com/in/%EC%A4%80%EC%98%81-%ED%97%88-8142a130a/',
    },
  ],
}
