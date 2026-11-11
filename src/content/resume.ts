import type { L, ResumeVariant } from './types'

const k = (ko: string, en: string): L => ({ ko, en })

/** 자기 소개 after the site's intro paragraph: what I do now, how I work, what the record shows */
const SUMMARY: L[] = [
  k(
    '주식회사 Finz Labs에 초기 창업 멤버로 함께해, 회사 내 유일한 개발자로 세금 계산 서비스 finz.kr을 설계·개발·운영하고 있습니다. 세무사와 함께 만든 6Way 계산 로직을 Python에서 TypeScript로 옮겨 기준 사례 21개 항목을 대조해 최대 차이 1원을 확인했고, 저장소 테스트 192개로 지키고 있습니다. 협력 개발사와 함께 만드는 세무사용 FINZ에서는 완료 보고 269건을 다시 검증하고 배포 9번 연속 실패의 원인을 재현했습니다.',
    'I joined Finz Labs as an early founding member and, as the only developer in the company, I design, build and run the tax-calculation service finz.kr. The 6Way tax logic built with a tax accountant was ported from Python to TypeScript and checked against 21 reference-case items with a largest gap of 1 won, guarded by 192 repository tests. For FINZ for tax accountants, built with a partner company, I re-verified 269 items reported as done and reproduced the cause of nine failed deployments in a row.',
  ),
  k(
    '만드는 시간보다 확인하는 시간이 길었습니다. 끝냈다고 말하기 전에 무엇으로 확인했는지부터 정하고, 외부 데이터와 AI 결과는 받는 쪽에서 의심하고 검사합니다. Claude Code · Codex · Antigravity를 매일 역할을 나눠 쓰지만, 무엇을 만들지와 결과가 맞는지는 제가 정하고 확인하며 내보낸 결과는 제가 책임집니다.',
    'Checking has taken longer than building. Before calling anything done I decide what will confirm it, and external data and AI output are doubted and checked on the receiving side. I use Claude Code, Codex and Antigravity every day in separate roles, but what to build and whether the result is right are mine to decide and verify, and I answer for what ships.',
  ),
  k(
    '학부에서는 WebDB 랩장과 AID 랩 학부 연구생으로 지내며 프로젝트 17개, 학술대회 논문 7편(국제 1편 · 1저자 6편), 수상 13건을 쌓았습니다. 넓게 벌린 만큼 깊이가 고르지 않다는 것을 알고, 지금은 대표작을 정해 실패 복구까지 완성하는 방식으로 고치고 있습니다.',
    'At university, as lead of the WebDB lab and an undergraduate researcher at the AID lab, I built up 17 projects, 7 conference papers (1 international, 6 as first author) and 13 awards. Spreading that wide left the depth uneven, so I now pick a flagship and finish it through to failure recovery.',
  ),
]

/** Why this team; the submission copy only */
const MOTIVATION: L[] = [
  k(
    '당근에 지원하는 이유는 세 가지입니다. 출시 뒤 지표와 사용자 로그로 판단하는 팀에서 일하고 싶습니다. 혼자 운영하며 지표 없이 무엇을 놓치는지 체감했기 때문입니다. 제가 다뤄 온 외부 연동, 캐시, 재시도, 비동기 처리를 당근의 트래픽 규모에서 풀어 보고 싶습니다. 그리고 언어와 프레임워크를 팀이 푸는 문제에 맞춰 고른다는 당근 백엔드의 방식이, Node.js와 Python을 오가며 일해 온 저와 맞습니다.',
    'Three reasons. I want to work in a team that judges by metrics and user logs after release; running a service alone without them showed me what I was missing. I want to take the external integrations, caching, retries and asynchronous work I have handled to Daangn\'s scale of traffic. And choosing the language and framework by the problem the team is solving, as Daangn\'s backend does, fits how I have worked across Node.js and Python.',
  ),
]

/** Five awards shown in full, newest first on the page; the other eight are counted */
const TOP_AWARDS = [
  '2026년 AI-SW중심대학 AI·블록체인 비즈니스모델 경진대회 우수상',
  '2025년도 추계종합학술대회 및 대학생 논문경진대회 은상',
  '2025 한신 AISW 페스티벌 캡스톤 디자인 부문 특별상',
  'SW중심대학 AI 창업 아이디어 경진대회 특별상',
  '캡스톤 디자인 및 AI 해커톤 대상(1등)',
]

/** Three papers shown in full: the international one, the newest first-author one and the award-winning EduMatrix paper */
const TOP_PAPERS = [
  'Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI',
  'LLM을 활용한 실시간 회의 인지·감성 분석 웹 시스템의 설계 및 구현',
  '개인 맞춤형 AI 학습 비서 시스템: EduMatrix 설계 및 제작',
]

/** Skill chips, the tools that appear in the entries below */
const SKILLS = ['TypeScript', 'Node.js', 'Next.js', 'Express', 'Fastify', 'Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'BullMQ', 'OpenAI API', 'Whisper', 'ONNX Runtime', 'PyTorch', 'Vitest', 'pytest', 'Docker', 'Expo']

/** Six activities with what was done, in the site's own facts; the other eleven are counted */
const TOP_ACTIVITIES: ResumeVariant['topActivities'] = [
  {
    name: 'WebDB 랩장',
    lines: [k('학부 연구실 WebDB의 운영을 총괄', 'Ran the WebDB undergraduate lab'), k('연구실 프로젝트의 기획과 관리를 맡음', 'Planned and managed the lab’s projects')],
  },
  {
    name: 'AID 랩실 학부 연구생',
    lines: [
      k('대학원 연구실의 학부 연구생으로 LLM 서비스 연구에 참여', 'Undergraduate researcher in a graduate lab, working on LLM services'),
      k('시니어 정신건강 검사 음성 챗봇 Label Light 연구 — 1저자 논문과 논문경진대회 동상으로 이어짐', 'The Label Light research, a voice chatbot for senior mental-health screening, led to a first-author paper and a Bronze Award'),
    ],
  },
  {
    name: '오픈소스 개발자대회',
    lines: [
      k('모의 면접 서비스 InnoView 초안을 팀으로 만들어 출품 — 백엔드·프론트엔드·AI 모델 담당', 'Built and entered the first version of InnoView, a mock-interview service, as a team — backend, frontend and AI models'),
      k('이후 혼자 리뉴얼해 직무별 면접을 더함 (2025.10–12)', 'Later renewed it alone and added role-based interviews (Oct–Dec 2025)'),
    ],
  },
  {
    name: '한신대 AI 면접 특강 진행',
    lines: [
      k('AI 면접 서비스 InnoView를 소개하는 특강 2회 진행, 학생들이 직접 사용', 'Gave two workshops introducing InnoView, an AI interview service, which the students tried themselves'),
      k('이어서 한신대 쏘랩에서 시연 (2025.11.11)', 'Followed by a demo at Hanshin SoLab (11 Nov 2025)'),
    ],
  },
  {
    name: 'SW 인재 페스티벌',
    lines: [k('학교 대표로 부스 운영과 작품 출품', 'Ran a booth and exhibited a project as a Hanshin University representative'), k('타 대학 학생들과 교류', 'Met students from other universities')],
  },
  {
    name: '웹 프로그래밍 멘토링 멘토 · 스터디 리더',
    lines: [
      k('교내 멘토링 프로그램의 멘토로 세 학기 참여', 'Mentor in the campus mentoring program for three terms'),
      k('웹 프로그래밍 스터디를 이끌며 후배들의 웹 개발 학습을 지원', 'Led a web programming study group and helped junior students learn web development'),
    ],
  },
]

export const RESUME_SITE: ResumeVariant = { id: 'site', summary: SUMMARY, topAwards: TOP_AWARDS, topPapers: TOP_PAPERS, skills: SKILLS, topActivities: TOP_ACTIVITIES }

/** The submission copy for 당근: a backend title, the 지원 동기 paragraph and the 병역·입사 line, which stays out of the public site and the repository */
export function daangnVariant(service?: L, phone?: string, applyDate?: string): ResumeVariant {
  return {
    id: 'daangn',
    role: k('백엔드 개발자', 'Backend developer'),
    service,
    phone,
    applying: { field: k('Software Engineer, Backend', 'Software Engineer, Backend'), date: applyDate },
    summary: SUMMARY,
    motivation: MOTIVATION,
    topAwards: TOP_AWARDS,
    topPapers: TOP_PAPERS,
    skills: SKILLS,
    topActivities: TOP_ACTIVITIES,
  }
}
