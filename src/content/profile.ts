import type { Profile } from './types'

export const profile: Profile = {
  name: { ko: '허준영', en: 'Heo Jun Young' },
  role: { ko: '백엔드 중심 풀스택 개발자', en: 'Backend-focused full-stack developer' },
  quote: { ko: '문제를 이해하는 것에서 시작해,\n신뢰할 수 있는 결과로 완성합니다.', en: "I start by understanding the problem\nand finish with results you can trust." },
  intro: {
    ko: '사용자의 요구를 기술적 해결책으로 구체화하고, 이를 실제 작동하는 서비스로 구현해 왔습니다. 프론트엔드부터 백엔드, AI 기능 적용까지 제품 개발의 여러 단계를 경험하며, 기능의 구현뿐 아니라 그 과정의 합리성과 결과의 완성도를 중요하게 생각합니다.',
    en: "I turn what users need into concrete technical solutions and build them into services that actually run. I have worked across product development, from frontend and backend to applying AI features, and I care not only about building a feature but about whether the process was sound and the result well finished.",
  },
  coreStack: ['TypeScript', 'Node.js', 'Next.js', 'Python · FastAPI', 'MySQL · PostgreSQL', 'MongoDB'],
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
