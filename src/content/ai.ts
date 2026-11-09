import type { AiWork } from './types'

const k = (ko: string, en: string) => ({ ko, en })

export const aiWork: AiWork = {
  lead: k(
    'Claude Code · Codex · Antigravity를 거의 매일, 역할을 나눠 씁니다. AI로 빠르게 만들고, 무엇을 만들지와 결과가 맞는지는 제가 정하고 확인합니다.',
    'I use Claude Code, Codex and Antigravity almost every day, each in its own role. AI builds fast; what to build, and whether the result is right, I decide and check myself.',
  ),
  tools: [
    { name: 'Claude Code', role: k('구현 · 기획과 문서', 'Implementation · planning and documents') },
    { name: 'Codex', role: k('코드 리뷰 · 문제점 파악 · 전체 리뷰 · 기획과 문서', 'Code review · finding problems · reviewing the whole result · planning and documents') },
    { name: 'Antigravity', role: k('디자인', 'Design') },
  ],
  flow: [
    { step: k('기획', 'Planning'), who: k('나 + Claude Code · Codex', 'Me + Claude Code · Codex') },
    { step: k('설계', 'Design'), who: k('나 + AI, 결정은 나', 'Me + AI; I decide') },
    { step: k('구현 · 디자인', 'Build · design'), who: k('Claude Code · Antigravity', 'Claude Code · Antigravity') },
    { step: k('교차 리뷰', 'Cross-review'), who: k('AI ↔ AI', 'AI ↔ AI') },
    { step: k('직접 검토 · 보완', 'My review and fixes'), who: k('나', 'Me') },
    { step: k('검증', 'Verification'), who: k('자동 테스트 + 나', 'Automated tests + me') },
  ],
  cards: [
    {
      title: k('함께 고민하고 맡기는 일', 'What I think through with AI, and what I hand over'),
      body: k(
        '초기 스켈레톤 설계, 기술 스택 선택지와 시스템 구조를 같이 고민하고 피드백을 주고받습니다. 기획 단계의 자료 조사 일부와 기획 방향이 합리적인지 비교하는 일도 맡깁니다. 구현은 Claude Code가, 디자인은 Antigravity가 합니다.',
        'We work out the initial skeleton, the stack options and the system structure together, trading feedback. I also hand over part of the research at the planning stage and the comparison of whether a direction makes sense. Claude Code builds; Antigravity designs.',
      ),
    },
    {
      title: k('교차 리뷰와 직접 결정', 'Cross-review, then my own decision'),
      body: k(
        'Claude Code가 만든 결과는 Codex가 리뷰하고, Antigravity의 디자인은 Claude Code와 Codex가 리뷰합니다. 문서는 서로의 잘못된 점을 보완하게 합니다. 최종 리뷰와 내용 확인은 직접 하고, 새 방향이나 기술 선택은 제가 정해 보완합니다.',
        'Codex reviews what Claude Code built, and Claude Code and Codex review Antigravity’s designs. Documents are checked by each tool against the other. The final review and the fact check are mine, and new directions and technical choices are my decisions.',
      ),
    },
    {
      title: k('통제와 보안', 'Control and security'),
      body: k(
        '권한을 제한해 저장소 전체를 고치지 못하게 하고, 자동 허용 명령은 최소로 둡니다. 필요한 자료와 문맥을 먼저 줘서 답변의 효율을 높이고, 플러그인·skills·MCP로 품질을 관리합니다. API 키는 도구에 절대 보여 주지 않고, 민감한 고객 자료는 미리 마스킹합니다.',
        'Permissions are limited so no tool can rewrite the whole repository, and auto-approved commands are kept to a minimum. I give the material and context first so answers are efficient, and manage quality with plugins, skills and MCP servers. API keys are never shown to the tools, and sensitive client data is masked beforehand.',
      ),
    },
  ],
  example: {
    text: k(
      '간편인증 — AI 초안이 첫 연도에서 멈춘 원인을 코드에서 찾아, 서비스와 분리한 스크립트로 가설을 확인한 뒤 백엔드를 직접 다시 구현했습니다.',
      'Simple authentication — I found in the code why the AI draft stalled after the first year, checked the hypothesis with a script kept apart from the service, and then rebuilt the backend myself.',
    ),
    figure: k('휴대폰 인증 5번 → 1번 · 조회 연도 1개 → 5개', 'Phone approvals 5 → 1 · years fetched 1 → 5'),
    href: '/projects/finz#refund-app',
  },
  blog: {
    label: k('AI 도구를 개발 과정에 안전하게 붙이는 법 (기술 블로그)', 'Attaching AI tools safely to the development process (tech blog)'),
    href: 'https://junyoung-dev-notes.vercel.app/posts/ai-tools-in-the-workflow',
  },
}
