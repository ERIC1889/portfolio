import type { AiWork } from './types'

const k = (ko: string, en: string) => ({ ko, en })

export const aiWork: AiWork = {
  lead: k(
    'Claude Code · Codex · Antigravity를 거의 매일, 역할을 나눠 씁니다. 구현 속도는 AI에 기대되, 무엇을 만들지, 어떤 구조로 갈지, 결과를 내보낼지는 제가 정하고, 내보낸 결과는 제가 책임집니다.',
    'I use Claude Code, Codex and Antigravity almost every day, each in its own role. AI gives me speed; what to build, which structure to take and whether to ship the result are my decisions, and what ships is my responsibility.',
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
      title: k('맡기는 일과 제가 정하는 일', 'What I hand over, and what I decide'),
      body: k(
        '초기 스켈레톤과 기술 스택 선택지, 시스템 구조는 같이 고민하고 피드백을 주고받습니다. 기획 단계의 자료 조사 일부와 방향이 합리적인지 비교하는 일도 맡깁니다. 구현은 Claude Code가, 디자인은 Antigravity가 합니다. 무엇을 만들지와 어떤 구조로 갈지, 언제 내보낼지는 제가 정합니다.',
        'We work out the initial skeleton, the stack options and the system structure together, trading feedback. I also hand over part of the research at the planning stage and the comparison of whether a direction makes sense. Claude Code builds; Antigravity designs. What to build, which structure to take and when to ship are my calls.',
      ),
    },
    {
      title: k('교차 리뷰 다음은 제 검증', 'Cross-review, then my own verification'),
      body: k(
        'Claude Code가 만든 결과는 Codex가, Antigravity의 디자인은 Claude Code와 Codex가 리뷰합니다. 그다음은 제 차례입니다. AI가 쓴 코드라고 그대로 믿지 않고 정적 분석과 타입 검사를 먼저 돌린 뒤 테스트와 실제 실행 결과를 확인하고, 인증이나 개인정보 처리처럼 민감한 영역은 직접 읽고 공식 문서와 대조한 뒤에만 반영합니다. 어떤 구조로 왜 그렇게 동작하는지 설명할 수 없는 코드는 제 이름으로 내보내지 않습니다.',
        'Codex reviews what Claude Code built, and Claude Code and Codex review Antigravity’s designs. Then it is my turn. I do not trust code because an AI wrote it: static analysis and type checks run first, then tests and real runs, and sensitive areas such as authentication or personal data are read by me and checked against the official documentation before anything lands. Code whose structure and reasons I cannot explain does not ship under my name.',
      ),
    },
    {
      title: k('통제와 보안', 'Control and security'),
      body: k(
        '저장소 전체를 고칠 권한은 주지 않고 자동 허용 명령은 최소로 둡니다. 필요한 자료와 문맥을 먼저 줘서 답변의 효율을 높이고, 플러그인·skills·MCP로 품질을 관리합니다. API 키는 도구에 절대 보여 주지 않고, 민감한 고객 자료는 미리 마스킹합니다. 이 기준은 도구가 아니라 제가 정한 것입니다.',
        'No tool gets permission to rewrite the whole repository, and auto-approved commands are kept to a minimum. I give the material and context first so answers are efficient, and manage quality with plugins, skills and MCP servers. API keys are never shown to the tools, and sensitive client data is masked beforehand. These rules are mine, not the tools’.',
      ),
    },
  ],
  example: {
    text: k(
      '간편인증 — AI 초안이 특정 연도만 조회하고 느려지자, 다시 시키는 대신 코드를 읽어 연도마다 재인증하는 구조를 찾았습니다. 서비스와 분리한 스크립트로 "첫 인증 세션을 재사용할 수 있다"는 가설을 먼저 확인한 뒤, 인증과 조회를 분리해 백엔드에 직접 반영했습니다.',
      'Simple authentication — when the AI draft fetched only one year and slowed down, I read the code instead of re-prompting and found it re-authenticated for every year. A script kept apart from the service first confirmed that the first session could be reused; then I split authentication from fetching and rebuilt the backend myself.',
    ),
    figure: k('휴대폰 인증 5번 → 1번 · 조회 연도 1개 → 5개', 'Phone approvals 5 → 1 · years fetched 1 → 5'),
    href: '/projects/finz#refund-app',
  },
  blog: {
    label: k('AI 도구를 개발 과정에 안전하게 붙이는 법 (기술 블로그)', 'Attaching AI tools safely to the development process (tech blog)'),
    href: 'https://junyoung-dev-notes.vercel.app/posts/ai-tools-in-the-workflow',
  },
}
