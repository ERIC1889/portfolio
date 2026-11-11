import type { L, ResumeVariant } from './types'

const k = (ko: string, en: string): L => ({ ko, en })

/** The site's hero line in plain style */
const TAGLINE: L = k('문제를 이해하는 것에서 시작해, 신뢰할 수 있는 결과로 완성한다.', 'I start by understanding the problem and finish with results you can trust.')

/** The opening paragraph: the site's intro in plain style */
const INTRO: L = k(
  '사용자의 요구를 기술적 해결책으로 구체화하고, 이를 실제 작동하는 서비스로 구현해 왔다. 프론트엔드부터 백엔드, AI 기능 적용까지 제품 개발의 여러 단계를 경험하며, 기능의 구현뿐 아니라 그 과정의 합리성과 결과의 완성도를 중요하게 생각한다.',
  'I turn what users need into technical solutions and build them into services that actually run. Having worked across frontend, backend and AI features, I care not only that a feature works but that the process behind it is sound and the result is finished.',
)

/** 자기소개서 after the opening: what I do now, how I work, what the record shows — plain style */
const SUMMARY: L[] = [
  k(
    '주식회사 Finz Labs에 초기 창업 멤버로 함께해, 회사 내 유일한 개발자로 세금 계산 서비스 finz.kr을 설계·개발·운영하고 있다. 세무사와 함께 만든 6Way 계산 로직을 Python에서 TypeScript로 옮겨 기준 사례 21개 항목을 대조해 최대 차이 1원을 확인했고, 저장소 테스트 192개로 지키고 있다. 협력 개발사와 함께 만드는 세무사용 FINZ에서는 완료 보고 269건을 다시 검증하고 배포 9번 연속 실패의 원인을 재현했다.',
    'I joined Finz Labs as an early founding member and, as the only developer in the company, I design, build and run the tax-calculation service finz.kr. The 6Way tax logic built with a tax accountant was ported from Python to TypeScript and checked against 21 reference-case items with a largest gap of 1 won, guarded by 192 repository tests. For FINZ for tax accountants, built with a partner company, I re-verified 269 items reported as done and reproduced the cause of nine failed deployments in a row.',
  ),
  k(
    '만드는 시간보다 확인하는 시간이 길었다. 끝냈다고 말하기 전에 무엇으로 확인했는지부터 정하고, 외부 데이터와 AI 결과는 받는 쪽에서 의심하고 검사한다. Claude Code · Codex · Antigravity를 매일 역할을 나눠 쓰지만, 무엇을 만들지와 결과가 맞는지는 직접 정하고 확인하며 내보낸 결과는 직접 책임진다.',
    'Checking has taken longer than building. Before calling anything done I decide what will confirm it, and external data and AI output are doubted and checked on the receiving side. I use Claude Code, Codex and Antigravity every day in separate roles, but what to build and whether the result is right are mine to decide and verify, and I answer for what ships.',
  ),
  k(
    '학부에서는 WebDB 랩장과 AID 랩 학부 연구생으로 지내며 프로젝트 17개, 학술대회 논문 7편(국제 1편 · 1저자 6편), 수상 13건을 쌓았다. 넓게 벌린 만큼 깊이가 고르지 않다는 것을 알고, 지금은 대표작을 정해 실패 복구까지 완성하는 방식으로 고치고 있다.',
    'At university, as lead of the WebDB lab and an undergraduate researcher at the AID lab, I built up 17 projects, 7 conference papers (1 international, 6 as first author) and 13 awards. Spreading that wide left the depth uneven, so I now pick a flagship and finish it through to failure recovery.',
  ),
]

/** Why this team; the submission copy only */
const MOTIVATION: L[] = [
  k(
    '당근에 지원하는 이유는 세 가지다. 출시 뒤 지표와 사용자 로그로 판단하는 팀에서 일하고 싶다. 혼자 운영하며 지표 없이 무엇을 놓치는지 체감했기 때문이다. 그동안 다뤄 온 외부 연동, 캐시, 재시도, 비동기 처리를 당근의 트래픽 규모에서 풀어 보고 싶다. 그리고 언어와 프레임워크를 팀이 푸는 문제에 맞춰 고른다는 당근 백엔드의 방식이, Node.js와 Python을 오가며 일해 온 방식과 맞는다.',
    'Three reasons. I want to work in a team that judges by metrics and user logs after release; running a service alone without them showed me what I was missing. I want to take the external integrations, caching, retries and asynchronous work I have handled to Daangn\'s scale of traffic. And choosing the language and framework by the problem the team is solving, as Daangn\'s backend does, fits how I have worked across Node.js and Python.',
  ),
]

/** The job's 내용 row */
const WORK = {
  content: k(
    '부동산·디지털 자산·해외주식 세금 계산기가 있는 회사 웹 finz.kr 단독 설계·개발·운영, Finz 모바일 앱(청년 세금 환급 MVP) 제작',
    'Sole design, development and operation of the company website finz.kr with its property, digital-asset and foreign-stock tax calculators; built the Finz mobile app (youth tax-refund MVP)',
  ),
}

/** Main projects in nominal style: 문제 해결 (case — problem → action) and 결과 */
const PROJECTS: ResumeVariant['projects'] = {
  skillpilot: {
    solve: [
      k('HTTP 200 응답에 포함된 공공 API 오류 처리 — 상태 코드만으로 성공 여부 판단 불가 → 공통 API 클라이언트에 본문 검사와 재시도 추가', 'Public-API errors inside HTTP 200 — the status code alone could not tell success → body checks and retries added to the shared API client'),
      k('XML, JSON 등 제각각인 응답 구조 — 응답 형식과 표기가 API마다 다름 → 공통 클라이언트 1개와 정규화 함수 7개로 처리 단계 분리', 'Mixed XML and JSON response shapes — format and notation differed per API → one shared client and seven normalization functions'),
    ],
    results: [
      k('공공데이터 API 7종을 하나의 자격증 데이터로 정규화, 스케줄러 자동 갱신으로 수동 갱신 제거 — 전체 국가자격 613종목 중 IT 34종목 · 시험 일정 87건 저장', '7 public data APIs normalized into one set of certification data, refreshed by a scheduler with nothing updated by hand — 34 IT certifications and 87 exam schedules out of 613 national certifications'),
      k('상태 코드에 드러나지 않는 실패까지 공통 처리 흐름에 포함 — 단위 테스트 31개와 관리자 수동 실행으로 확인', 'Failures the status code does not show handled in the shared flow — checked with 31 unit tests and manual admin runs'),
      k('AI 호출 실패 시 규칙 기반 대체 응답, 같은 조건의 요청은 저장 결과 재사용 — 온보딩 흐름 유지', 'Rule-based fallbacks when an AI call fails and stored results reused for the same request — onboarding keeps going'),
      k('13개 화면 · 16개 백엔드 라우트 모듈로 캡스톤 완료, 최종 발표 담당', 'Capstone finished with 13 screens and 16 backend route modules; gave the final presentation'),
    ],
  },
  pitches: {
    solve: [
      k('실시간 피드백이 멈추지 않는 구조 — 분석 대기로 인한 실시간 피드백 지연 → 동시 요청, 제한 시간, 실패 처리로 해결', 'Feedback that never stalls — waiting on analysis delayed live feedback → parallel requests, time limits and failure handling'),
      k('무음·잡음 구간 처리 — Whisper가 무음 구간에서 전사를 만들어 내는 문제 → 무음은 호출 전에 건너뛰고, 지어낸 문구는 호출 후 제거', 'Silence and noise — Whisper invented transcripts for silent stretches → silence skipped before the call, invented phrases dropped after it'),
    ],
    results: [
      k('캡스톤 디자인 및 AI 해커톤 대상(1등, 2024.10), SW중심대학 AI 창업 아이디어 경진대회 특별상(2025.05) 수상', 'Grand prize (1st place) at the Capstone Design & AI Hackathon (Oct 2024) and a special award at the SW-Centered University AI Startup Idea Competition (May 2025)'),
      k('APIC-IST 2025 국제학술대회 논문 발표 (2저자)', 'Paper presented at the APIC-IST 2025 international conference (second author)'),
      k('발표 중 5초 단위 분석과 색 표시로 즉시 피드백 — 음성→지표 지연 평균 125ms(σ=18ms), 동시 20세션 최악 170ms', 'Immediate feedback during the talk from 5-second analysis shown as a color — speech-to-indicator latency 125 ms on average (σ = 18 ms), 170 ms at worst with 20 concurrent sessions'),
      k('사용자 조사 5명 모두 실시간 표시가 말 속도 교정에 도움이 된다고 응답', 'All five people in the user survey said the live indicators helped them correct their pace'),
    ],
  },
  closetmate: {
    solve: [
      k('옷장에 없는 옷을 추천하는 LLM — 없는 옷 ID나 만들 수 없는 조합 생성 → 규칙으로 후보를 만들고 LLM은 후보 중에서만 선택, 서버에서 형식·옷 ID·조합 검증', 'An LLM suggesting clothes not in the wardrobe — invented IDs and impossible combinations → rule-built candidates the LLM picks from, with format, IDs and combinations checked on the server'),
      k('분류 모델 선택과 적용 — 모바일에서 빠르게 돌아갈 분류 모델 필요 → MobileNetV3-Small과 ResNet50 동일 조건 비교, 헤드 3개를 얹은 MobileNetV3를 서버에서 ONNX로 추론', 'Choosing the classifier — a model fast enough for mobile → MobileNetV3-Small and ResNet50 compared under the same settings; MobileNetV3 with three heads served with ONNX'),
    ],
    results: [
      k('가진 옷으로만 추천 — 형식 오류나 옷장에 없는 옷을 담은 추천은 사용자에게 가기 전에 차단, 실측 23회 중 기본 모델 통과 19회 · 보조 모델 처리 4회 · 최종 실패 0건', 'Suggestions only from owned clothes — wrong formats and unknown clothes stopped before the user; in 23 measured runs the base model passed 19, the backup model handled 4, 0 final failures'),
      k('사진 등록 → 분류 → 후보 생성 → LLM 추천 → 서버 검증 전체 흐름 구현', 'The whole flow built: photo → labels → candidates → LLM suggestion → server check'),
      k('약 15분의 1 크기(6.0MB 대 90.2MB)의 MobileNetV3-Small 채택, 서버에서 ONNX 추론', 'MobileNetV3-Small adopted at about one fifteenth of the size (6.0 MB against 90.2 MB), served with ONNX on the server'),
    ],
  },
}

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
    lines: [k('학부 연구실 WebDB 운영 총괄', 'Ran the WebDB undergraduate lab'), k('연구실 프로젝트 기획·관리 담당', 'Planned and managed the lab’s projects')],
  },
  {
    name: 'AID 랩실 학부 연구생',
    lines: [
      k('대학원 연구실의 학부 연구생으로 LLM 서비스 연구 참여', 'Undergraduate researcher in a graduate lab, working on LLM services'),
      k('시니어 정신건강 검사 음성 챗봇 Label Light 연구 — 1저자 논문과 논문경진대회 동상으로 연결', 'The Label Light research, a voice chatbot for senior mental-health screening, led to a first-author paper and a Bronze Award'),
    ],
  },
  {
    name: '오픈소스 개발자대회',
    lines: [
      k('모의 면접 서비스 InnoView 초안 팀 제작·출품 — 백엔드·프론트엔드·AI 모델 담당', 'Built and entered the first version of InnoView, a mock-interview service, as a team — backend, frontend and AI models'),
      k('이후 단독 리뉴얼로 직무별 면접 추가 (2025.10–12)', 'Later renewed it alone and added role-based interviews (Oct–Dec 2025)'),
    ],
  },
  {
    name: '한신대 AI 면접 특강 진행',
    lines: [
      k('AI 면접 서비스 InnoView 소개 특강 2회 진행, 학생 직접 사용', 'Gave two workshops introducing InnoView, an AI interview service, which the students tried themselves'),
      k('한신대 쏘랩 시연 (2025.11.11)', 'Followed by a demo at Hanshin SoLab (11 Nov 2025)'),
    ],
  },
  {
    name: 'SW 인재 페스티벌',
    lines: [k('학교 대표로 부스 운영과 작품 출품', 'Ran a booth and exhibited a project as a Hanshin University representative'), k('타 대학 학생들과 교류', 'Met students from other universities')],
  },
  {
    name: '웹 프로그래밍 멘토링 멘토 · 스터디 리더',
    lines: [
      k('교내 멘토링 프로그램 멘토 3학기 참여', 'Mentor in the campus mentoring program for three terms'),
      k('웹 프로그래밍 스터디 리더로 후배 웹 개발 학습 지원', 'Led a web programming study group and helped junior students learn web development'),
    ],
  },
]

export const RESUME_SITE: ResumeVariant = { id: 'site', tagline: TAGLINE, intro: INTRO, summary: SUMMARY, work: WORK, projects: PROJECTS, topAwards: TOP_AWARDS, topPapers: TOP_PAPERS, skills: SKILLS, topActivities: TOP_ACTIVITIES }

/** The submission copy for 당근: a backend title, the 지원 동기 paragraph and the 병역·입사 line, which stays out of the public site and the repository */
export function daangnVariant(service?: L, phone?: string, applyDate?: string): ResumeVariant {
  return {
    id: 'daangn',
    role: k('백엔드 개발자', 'Backend developer'),
    service,
    phone,
    applying: { field: k('Software Engineer, Backend', 'Software Engineer, Backend'), date: applyDate },
    tagline: TAGLINE,
    intro: INTRO,
    summary: SUMMARY,
    motivation: MOTIVATION,
    work: WORK,
    projects: PROJECTS,
    topAwards: TOP_AWARDS,
    topPapers: TOP_PAPERS,
    skills: SKILLS,
    topActivities: TOP_ACTIVITIES,
  }
}
