import type { L, ResumeVariant } from './types'

const k = (ko: string, en: string): L => ({ ko, en })

/** The site's hero line, as the user keeps it */
const TAGLINE: L = k('문제를 이해하는 것에서 시작해, 신뢰할 수 있는 결과로 완성합니다.', 'I start by understanding the problem and finish with results you can trust.')

/** 자기소개서: the user's own text (2026-11-11), verbatim */
const INTRO: L = k(
  '사용자의 불편을 이해하고 요구를 기술적 해결책으로 구체화하고, 이를 실제 작동하는 서비스로 구현해온 백엔드 개발자 허준영입니다. JavaScript와 TypeScript 중심으로 화면, 서버, AI 기능을 연결하며 제품 개발의 여러단계를 경험했습니다. 개발 과정에서는 기술을 선택한 이유와 구현한 결과를 어떻게 확인할 수 있는지를 중요하게 생각합니다.',
  'I am Heo Jun Young, a backend developer who understands what users struggle with, turns their needs into technical solutions and builds them into services that actually run. Working mainly in JavaScript and TypeScript, I have connected screens, servers and AI features across many stages of product development. What matters to me in the process is why a technology was chosen and how the result can be verified.',
)
const SUMMARY: L[] = [
  k(
    'Finz Labs에서는 초기 창업 멤버이자 회사 내 유일한 개발자로 일했습니다. 개인 세금 계산기를 설계·개발·운영했으며, 모바일 애플리케이션을 개발하고 협력 개발사와 세무사용 서비스의 설계 및 검증을 진행했습니다. 세무사의 업무 지식을 코드로 옮기는 과정에서 계산 기준을 함께 이해하고, 결과를 확인할 근거를 마련하는 경험을 쌓았습니다.',
    'At Finz Labs I worked as an early founding member and the only developer in the company. I designed, built and ran the personal tax calculators, built the mobile application, and designed and verified the service for tax accountants with a partner company. Turning a tax accountant’s working knowledge into code taught me to understand the calculation rules together and to prepare the evidence that confirms the results.',
  ),
  k(
    '저는 작업을 시작할 때 해결할 문제와 완료 여부를 확인할 기준부터 정하려고 합니다. 외부 API의 응답이나 AI가 생성한 결과도 실제로 사용할 수 있는지 검사합니다. Claude Code와 Codex를 매일 개발에 활용하며 작업에 맞게 역할을 나누지만, 무엇을 만들지와 결과가 요구사항에 맞는지는 직접 판단합니다. 기획과 설계, 검증에 충분한 시간을 쓰는 이유도 제가 내보낸 결과를 이해하고 책임지기 위해서입니다.',
    'When I start a task I first settle the problem to solve and the standard that will show it is done. External API responses and AI output are checked for whether they can really be used. I use Claude Code and Codex every day, dividing roles to fit the work, but what to build and whether the result meets the requirements I judge myself. I spend real time on planning, design and verification because I want to understand and answer for what I ship.',
  ),
  k(
    '학부에서는 WebDB 랩장과 AID 랩 학부 연구생으로 활동하며 프로젝트 17개, 학술대회 논문 7편, 수상 13건의 경험을 쌓았습니다. 다양한 문제를 접하면서 새로운 도구를 익히고 적용하는 경험을 얻었고, 이제는 그 경험을 백엔드의 깊이로 연결하는 데 집중하고 있습니다.',
    'At university, as lead of the WebDB lab and an undergraduate researcher at the AID lab, I built up 17 projects, 7 conference papers and 13 awards. Meeting many kinds of problems taught me to pick up and apply new tools, and I now focus on turning that experience into depth as a backend developer.',
  ),
  k(
    '앞으로도 사용자에게 필요한 결과가 전달될 때까지 문제를 따라가겠습니다. 새로운 기술을 빠르게 적용하는 실행력에 탄탄한 기본기와 검증 습관을 더해, 동료가 믿고 함께 일할 수 있는 백엔드 개발자로 성장하고 싶습니다.',
    'I will keep following a problem until the result users need actually reaches them. By adding solid fundamentals and a habit of verification to the drive to apply new technology quickly, I want to grow into a backend developer colleagues can trust and work with.',
  ),
]

/** 지원 동기: the user's own text (2026-11-11), verbatim; the submission copy only */
const MOTIVATION: L[] = [
  k(
    '제가 만든 기능이 사람들의 실제 생활에서 어떤 변화를 만드는지 가까이에서 확인하며 일하고 싶어 당근에 지원했습니다. 당근은 중고거래에서 출발해 동네생활, 일자리, 모임 등 지역 안의 사람과 기회를 연결하고 있습니다. 앱에서 정보를 찾고 대화를 나누는 경험이 이웃과의 거래나 새로운 만남으로 이어진다는 점에 매력을 느꼈습니다. 사용자가 가까운 곳에서 필요한 것을 발견하고 행동으로 옮길 수 있도록, 그 연결을 안정적으로 뒷받침하는 백엔드를 만들고 싶습니다.',
    'I applied to Daangn because I want to work close to the changes my features make in people’s real lives. Starting from second-hand trading, Daangn now connects people and opportunities within a neighbourhood: local life, jobs, gatherings. What drew me is that finding information and talking in the app leads to trades with neighbours and new meetings. I want to build the backend that reliably supports that connection, so users can find what they need nearby and act on it.',
  ),
  k(
    '당근의 문화 중 가장 공감한 것은 사용자에게 생기는 변화를 판단의 기준으로 삼는 ‘유저 임팩트’입니다. Finz에서 세무사에게 사용성과 데이터 유출에 대한 우려를 직접 들으며, 기능이 동작하는 것만으로는 사용자가 안심하고 서비스를 이용할 수 없다는 점을 배웠습니다. 이후 암호화와 마스킹을 중점적으로 점검하고 보완했습니다. 계산 기능에서도 결과의 정확성과 함께 사용자가 그 근거를 이해할 수 있는지를 고민했습니다. 이 경험을 통해 개발자가 정한 완료 기준을 실제 사용자의 관점에서 다시 살펴보는 습관을 갖게 됐습니다.',
    'The part of Daangn’s culture I identify with most is “user impact”: judging by the change that reaches the user. At Finz, hearing a tax accountant’s worries about usability and data leaks taught me that a working feature alone does not let users trust a service. I then reviewed and strengthened encryption and masking, and in the calculators I asked not only whether a result was correct but whether users could understand its basis. That experience gave me the habit of re-examining a developer’s definition of done from the real user’s point of view.',
  ),
  k(
    '직무의 경계를 넘어 문제를 해결하는 ‘빌더십’도 제가 일해 온 방식과 맞닿아 있습니다. 작은 팀에서는 사용자의 문제를 해결하기 위해 화면과 서버, 데이터 처리 과정을 함께 살펴야 했습니다. SkillPilot에서는 백엔드를 맡으면서 주요 화면과 공통 컴포넌트도 개선했고, Pitches에서는 음성 전송부터 분석 결과 전달과 보고서 생성까지 연결했습니다. 필요한 일을 맡으며 여러 기술을 익혔고, 각 기능이 사용자 경험 안에서 어떻게 이어지는지를 이해하는 것이 제 강점이 됐습니다.',
    '“Buildership”, solving problems across role boundaries, also matches how I have worked. In a small team, solving a user’s problem meant looking at the screens, the server and the data processing together. On SkillPilot I owned the backend and also improved the main screens and shared components; on Pitches I connected everything from audio streaming to delivering analysis results and generating reports. Taking on what was needed taught me many technologies, and understanding how each feature links up inside the user’s experience became my strength.',
  ),
  k(
    '이번 공고에서 엔지니어가 문제 정의부터 출시 이후의 지표와 운영까지 책임진다는 설명에 특히 끌렸습니다. 지금까지 직접 만들고 검증해 온 경험을 바탕으로, 당근에서는 동료들과 문제를 함께 정의하고 실제 사용자 반응을 통해 판단을 발전시키고 싶습니다. 제 선택의 이유와 아직 확인하지 못한 부분을 공유하고, 다른 직군의 의견을 듣고 더 나은 근거가 있다면 구현 방향을 수정하겠습니다.',
    'What drew me most in this posting is that engineers own everything from defining the problem to the metrics and operations after release. Building on what I have built and verified myself, at Daangn I want to define problems together with colleagues and sharpen my judgement through real user responses. I will share the reasons for my choices and what I have not yet confirmed, listen to other roles, and change the implementation when there is better evidence.',
  ),
  k('입사 후에는 사용자가 불편을 겪는 지점을 스스로 찾아 해결하는 동료가 되고 싶습니다.', 'After joining, I want to be the colleague who finds where users struggle and fixes it without being asked.'),
]

/** The job's 내용 row and 결과 및 성과 lines, the user's wording */
const WORK: ResumeVariant['work'] = {
  content: k(
    '부동산·디지털 자산·해외주식 세금 계산기가 있는 회사 웹 finz.kr 단독 설계·개발·운영, Finz 모바일 앱(청년 세금 환급 MVP) 제작, 세무사용 Finz 개발 및 배포, 운영 준비',
    'Sole design, development and operation of the company website finz.kr with its property, digital-asset and foreign-stock tax calculators; built the Finz mobile app (youth tax-refund MVP); development, deployment and launch preparation of Finz for tax accountants',
  ),
  results: [
    k('회사 웹 finz.kr 설계·개발·운영 — 세금 계산기 4종 운영 중, 저장소 테스트 192개 통과', 'Designed, built and run the company website finz.kr — four tax calculators live, all 192 repository tests pass'),
    k('Finz 모바일 앱(Expo · FastAPI, 미출시) — 간편인증 1번으로 5개 연도 조회, 보안 단위 테스트 57개', 'Finz mobile app (Expo · FastAPI, not released) — five years fetched with one simple authentication, 57 security unit tests'),
    k('세무사용 FINZ(협력 개발사와 공동 개발) — 완료 보고 269건 재검증·새 결함 45건, 배포 9번 연속 실패 원인 재현', 'FINZ for tax accountants (co-developed with a partner company) — re-verified 269 reported items, 45 new defects, reproduced the cause of nine failed deployments in a row'),
  ],
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
      k('캡스톤 디자인 및 AI 해커톤 대상(1등, 2024.10)', 'Grand prize (1st place) at the Capstone Design & AI Hackathon (Oct 2024)'),
      k('SW중심대학 AI 창업 아이디어 경진대회 특별상(2025.05) 수상', 'Special award at the SW-Centered University AI Startup Idea Competition (May 2025)'),
      k('APIC-IST 2025 국제학술대회 논문 발표', 'Paper presented at the APIC-IST 2025 international conference'),
      k('발표 중 5초 단위 분석과 색 표시로 즉시 피드백 — 음성→지표 지연 평균 125ms(σ=18ms), 동시 20세션 최악 170ms', 'Immediate feedback during the talk from 5-second analysis shown as a color — speech-to-indicator latency 125 ms on average (σ = 18 ms), 170 ms at worst with 20 concurrent sessions'),
      k('사용자 조사 5명 모두 실시간 표시가 말 속도 교정에 도움이 된다고 응답', 'All five people in the user survey said the live indicators helped them correct their pace'),
    ],
  },
  closetmate: {
    hideStatus: true,
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
  'A2A 협업 기반 웰니스 일정 관리 시스템',
  '개인 맞춤형 AI 학습 비서 시스템: EduMatrix 설계 및 제작',
]

/** Skill chips, the tools that appear in the entries below */
const SKILLS = ['TypeScript', 'Node.js', 'Next.js', 'Express', 'Fastify', 'Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'BullMQ', 'OpenAI API', 'Whisper', 'ONNX Runtime', 'PyTorch', 'Vitest', 'pytest', 'Docker', 'Expo']

/** Six activities with what was done (the user's wording); the other eleven are counted */
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
    name: 'CES 2026 참관',
    lines: [k('한신대 학생 대표로 라스베가스 세계 전자제품 박람회 참관', 'Visited CES, the Las Vegas consumer electronics show, as a Hanshin University student representative')],
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
