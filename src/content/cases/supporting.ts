import type { Project } from '../types'
import { k, pairs, step } from './helpers'

export const edumatrix: Project = {
  slug: 'edumatrix',
  name: 'EduMatrix',
  years: [2025],
  tier: 'supporting',
  showcase: 'supporting',
  period: '2025.03–2025.12',
  team: k('4인 · 캡스톤', 'Team of 4 · capstone'),
  role: k('프론트엔드·백엔드 구조 설계 및 개발 · AI 에이전트 구조 · DB 설계', 'Frontend and backend structure and development · AI agent structure · database design'),
  status: k('캡스톤 완료 · 논문 2편', 'Capstone completed · two papers'),
  statusCheckedAt: '2026-11-09',
  stack: ['React', 'Express', 'MySQL', 'MongoDB', 'OpenAI Assistants'],
  summary: k(
    '목표 설정, 노트 작성, 퀴즈 풀이, 피드백, 학습 계획 조정으로 이어지는 흐름을 구상하고 설계한 AI 통합 학습 지원 시스템. 요청 의도에 맞는 모델과 도구로 보내는 AI Agent·MCP 구조와 MySQL·MongoDB 저장 구조를 설계했습니다. 한국디지털콘텐츠학회 1저자 논문 2편(은상 2회).',
    'An AI learning-support system conceived and designed around a flow from setting goals to notes, quizzes, feedback and adjusting the plan. The design covers an AI Agent and MCP structure that sends each request to a suitable model or tool, and storage split across MySQL and MongoDB. Two first-author Korea Digital Contents Society papers (two Silver Awards).',
  ),
  product: k(
    '목표 설정, 노트 작성, 퀴즈 풀이, 피드백, 학습 계획 조정으로 이어지는 흐름을 구상하고 설계한 AI 통합 학습 지원 시스템',
    'An AI learning-support system conceived and designed around a flow from setting goals to notes, quizzes, feedback and adjusting the plan',
  ),
  overview: {
    highlights: pairs([
      ['한국디지털콘텐츠학회 1저자 논문 2편 · 대학생 논문경진대회 은상 2회', 'Two first-author Korea Digital Contents Society papers · two Silver Awards in the student paper competition'],
      ['2025 한신 AISW 페스티벌 캡스톤 디자인 부문 특별상', 'Special Award (Capstone Design) at the 2025 Hanshin AISW Festival'],
    ]),
    scope: pairs([
      ['프론트엔드와 백엔드의 전체 구조, AI 에이전트의 요청 처리 흐름, 데이터베이스 선정과 스키마 설계를 맡았습니다.', 'I handled the overall frontend and backend structure, the AI agent’s request-handling flow, and choosing the databases and designing their schema.'],
    ]),
  },
  background: pairs([
    [
      '기존 학습 관리 시스템은 콘텐츠 제공과 성적 관리에 집중해, 학습자의 패턴을 활용한 일정 조정과 피드백이 제한적입니다. 그래서 학습자가 목표를 세우고 노트와 퀴즈 결과로 계획을 고쳐 나가는 흐름을 하나의 시스템으로 구상했습니다.',
      'Existing learning management systems focus on delivering content and managing grades, with limited scheduling and feedback based on how each learner studies. So I planned one system in which learners set goals and keep adjusting their plan from notes and quiz results.',
    ],
  ]),
  architecture: {
    body: pairs([
      [
        '시스템을 6개 모듈로 나눠 설계했습니다. 화면, 백엔드·외부 API 연결, 데이터 저장이 기반을 맡고, 학습 일정·성과 관리, AI 퀴즈 생성, AI 분석·추천 모듈이 학습 흐름을 맡습니다.',
        'The system is designed as six modules. Interface, backend and external APIs, and storage form the base; schedule and progress, quiz generation, and analysis and recommendation carry the study flow.',
      ],
      [
        '요청은 의도 분석(AI Agent) → 모델 선택(라우팅) → 데이터 연동(MCP) → 응답 생성 → 로그 저장 순서로 처리하도록 설계했습니다.',
        'Requests are designed to flow through intent analysis (AI Agent) → model selection (routing) → data access (MCP) → response → logging.',
      ],
    ]),
    decisions: pairs([
      [
        'AI 구조: 요청 의도를 먼저 분석해 GPT, Claude, Gemini 같은 모델이나 외부 도구로 보내는 AI Agent 라우팅을 구상했고, 외부 API와 내부 DB 연동은 MCP가 맡도록 나눴습니다.',
        'AI structure: I planned AI Agent routing that first analyzes the intent and sends a request to a model such as GPT, Claude or Gemini or to an external tool, with MCP set apart for external APIs and internal databases.',
      ],
      [
        '학습 순환: 노트와 이전 퀴즈 결과로 문제를 만들어 채점하고, 강점과 취약점 리포트가 다음 계획으로 이어지도록 설계했습니다.',
        'The study loop: questions come from notes and earlier quiz results, and a report on strengths and weaknesses feeds into the next plan.',
      ],
    ]),
  },
  cases: [
    {
      title: k('데이터 저장을 어떻게 나눌까', 'How to split the data storage'),
      problem: step(
        [
          [
            '개인정보·인증·학습 계획처럼 서로 연결되고 구조가 고정된 데이터와, 채팅·퀴즈·AI 피드백 로그처럼 구조가 바뀌기 쉬운 데이터를 함께 다뤄야 했습니다.',
            'The system had to hold both tightly connected, fixed-shape data such as personal details, authentication and study plans, and data whose shape changes easily, such as chats, quizzes and AI feedback logs.',
          ],
        ],
        ['성격이 다른 데이터를 한 저장소에 두기 어려웠습니다.', 'Data of two different natures did not fit one store.'],
      ),
      analysis: step(
        [
          [
            '연결되는 데이터는 관계형 데이터베이스가 정합성을 지키기 쉽고, 한 덩어리로 읽고 쓰는 로그 성격의 데이터는 문서형 데이터베이스가 구조 변화를 받아들이기 쉽다고 판단했습니다.',
            'A relational database keeps connected data consistent more easily, while a document database absorbs structural change better for log-like data read and written as one unit.',
          ],
        ],
        ['관계형과 문서형의 장단점을 비교했습니다.', 'I weighed relational against document storage.'],
      ),
      action: step(
        [
          [
            '개인정보, 인증, 학습 계획은 MySQL에, 채팅, 퀴즈, AI 피드백 로그처럼 구조가 바뀌기 쉬운 데이터는 MongoDB에 나눠 저장하도록 설계했습니다.',
            'Personal details, authentication and study plans go in MySQL, while data whose shape changes easily, such as chats, quizzes and AI feedback logs, goes in MongoDB.',
          ],
        ],
        ['MySQL과 MongoDB로 나눠 저장하도록 설계했습니다.', 'The design splits storage between MySQL and MongoDB.'],
      ),
      result: step(
        [
          [
            'EduMatrix 설계를 한국디지털콘텐츠학회 2025 하계·추계 학술대회에서 1저자 논문 2편으로 발표해 각각 대학생 논문경진대회 은상을 받았습니다.',
            'The EduMatrix design was presented as two first-author papers at the 2025 summer and fall Korea Digital Contents Society conferences, each winning a Silver Award in the student paper competition.',
          ],
        ],
        ['설계는 논문 2편으로 발표해 은상 2회를 받았습니다.', 'The design was published in two papers and won two Silver Awards.'],
      ),
    },
  ],
  results: pairs([
    ['2025 한신 AISW 페스티벌 캡스톤 디자인 부문 특별상을 받았습니다.', 'Special Award (Capstone Design) at the 2025 Hanshin AISW Festival.'],
    ['한국디지털콘텐츠학회 2025 하계·추계 학술대회에서 논문 두 편을 1저자로 발표해 각각 대학생 논문경진대회 은상을 받았습니다.', 'Presented two first-author papers at the 2025 summer and fall Korea Digital Contents Society conferences, each winning a Silver Award in the student paper competition.'],
  ]),
  retro: pairs([
    [
      '구조를 설계하는 일과 그 구조가 실제 사용자 데이터에서 돌아가는지 확인하는 일은 다르다는 것을 느꼈고, 설계할 때 무엇으로 검증할지도 함께 정해야 한다는 것을 배웠습니다.',
      'Designing a structure and confirming that it works on real user data turned out to be different jobs, and I learned to decide how a design will be verified while drawing it.',
    ],
  ]),
  imageSize: [1481, 843],
  image: '/images/projects/edumatrix.png',
  imageCaption: k('학습 진행률·계획 캘린더·추천 학습이 있는 대시보드 · 실제 화면', 'Dashboard with progress, a study calendar and recommendations · real screen'),
}

export const innoview: Project = {
  slug: 'innoview',
  name: 'InnoView',
  years: [2025],
  tier: 'supporting',
  showcase: 'supporting',
  period: '2025.05–2025.12',
  team: k('팀 초안(2025.05–08) · 오픈소스 개발자대회 출품 → 개인 리뉴얼(2025.10–12)', 'Team draft (May–Aug 2025) · entered in the Open Source Developer Competition → solo renewal (Oct–Dec 2025)'),
  role: k('백엔드·프론트엔드·AI 모델(초안) · 리뉴얼과 직무별 면접 전체(개인)', 'Backend, frontend and AI models (draft) · all of the renewal and role-based interviews (solo)'),
  status: k('리뉴얼 완료 · 특강 2회 사용', 'Renewal finished · used in two workshops'),
  statusCheckedAt: '2026-11-09',
  stack: ['React', 'Express', 'MySQL', 'Whisper', 'Google TTS', 'OpenAI Assistants', 'AssemblyAI', 'TensorFlow.js'],
  summary: k(
    '이력서와 직무에 맞는 면접 질문을 만들고, 답변을 음성, 텍스트, 영상으로 분석해 꼬리 질문을 이어 가는 모의 면접 서비스. 표정, 시선, 자세와 발음, 말 속도를 함께 살펴보고, 꼬리 질문이 끝없이 이어지지 않도록 면접을 서버에서 15문항으로 제한했습니다.',
    'A mock-interview service that writes questions for your résumé and role, analyzes answers through voice, text and video, and asks follow-ups. It looks at facial expression, eye contact, posture, pronunciation and speaking pace, and the server caps an interview at 15 questions so follow-ups cannot run on forever.',
  ),
  product: k(
    '이력서와 직무에 맞는 면접 질문을 만들고, 답변을 음성, 텍스트, 영상으로 분석해 꼬리 질문을 이어 가는 모의 면접 서비스',
    'A mock-interview service that writes questions for your résumé and role, analyzes answers through voice, text and video, and asks follow-ups',
  ),
  overview: {
    highlights: pairs([
      ['2025 한신 AISW 페스티벌 창업 아이디어 부문 장려상', 'Honorable Mention (Startup Idea) at the 2025 Hanshin AISW Festival'],
      ['한신대 AI 면접 특강 2회와 쏘랩 시연에서 학생들이 직접 사용', 'Used by students at two AI interview workshops at Hanshin University and a SoLab demo'],
    ]),
    scope: pairs([
      [
        '대회 초안(2025.05–08)은 팀으로 만들어 백엔드, 프론트엔드, AI 모델 개발을 맡았고, 이후 리뉴얼(2025.10–12)과 직무별 면접 추가는 혼자 진행했습니다.',
        'The competition draft (May–Aug 2025) was a team effort, where I worked on the backend, frontend and AI models. The later renewal (Oct–Dec 2025) and role-based interviews were on my own.',
      ],
    ]),
  },
  features: pairs([
    ['이력서·자기소개서 관리와 직무별·기업별 AI 면접', 'Résumé and cover-letter management, and AI interviews by role and company'],
    ['음성 답변 받아쓰기와 AI 면접관 음성', 'Transcribed spoken answers and a spoken AI interviewer'],
    ['표정·시선·자세, 발음·감정·말 속도·간투사 분석', 'Analysis of expression, eye contact, posture, pronunciation, emotion, pace and filler words'],
    ['세션 피드백과 PDF 리포트', 'Session feedback and a PDF report'],
  ]),
  background: pairs([
    [
      '혼자 면접을 준비하면 이력서와 직무에 맞는 질문을 받기 어렵고, 답변 내용 말고 말투, 표정, 자세에 대한 피드백도 얻기 어렵습니다.',
      'Preparing alone, it is hard to get questions that fit your résumé and role, or feedback beyond the content of your answers, such as your delivery, expression and posture.',
    ],
  ]),
  architecture: {
    body: pairs([
      [
        '면접은 자기소개 요청 → 초기 질문 → 꼬리 질문 → 다음 질문 → 마무리 순서로 진행합니다. 기업과 직무에 맞는 OpenAI Assistant가 질문을 만들고, Google TTS로 읽어 주며, 답변은 Whisper로 받아 적습니다.',
        'An interview runs from a self-introduction request → the first question → follow-ups → the next question → the close. An OpenAI Assistant matched to the company and role writes the questions, Google TTS reads them aloud, and Whisper transcribes the answers.',
      ],
      [
        '표정, 시선, 자세는 브라우저에서, 발음, 감정, 말 속도, 간투사는 서버에서 분석해 세션 피드백과 PDF 리포트로 보여 줍니다. 데이터는 MySQL 14개 테이블에 저장합니다.',
        'Expression, eye contact and posture are analyzed in the browser, and pronunciation, emotion, pace and filler words on the server, feeding session feedback and a PDF report. Data lives in 14 MySQL tables.',
      ],
      [
        '브라우저 녹음(WebM)은 Whisper가 바로 받지 못해, Label Light에서 쓴 파이프라인(WebM → ffmpeg → WAV → Whisper)을 가져왔고 연결 오류가 나면 다시 말해 달라고 안내합니다.',
        'Whisper cannot take a browser recording (WebM) as it is, so the pipeline from Label Light (WebM → ffmpeg → WAV → Whisper) is reused, and a connection error prompts the user to try again.',
      ],
    ]),
    decisions: pairs([
      ['직무별·기업별 면접관: 프롬프트 하나에 모든 직무를 넣지 않고, 기업과 직무마다 Assistant를 나눴습니다.', 'Interviewers by role and company: instead of one prompt for every role, each company and role has its own Assistant.'],
      ['영상은 브라우저에서 분석: 프레임 이미지는 데이터가 너무 커서 결과 값만 서버로 넘깁니다.', 'Analyzing video in the browser: frame images are far too large, so only the results go to the server.'],
    ]),
  },
  cases: [
    {
      title: k('끝나지 않는 면접', 'Interviews that never ended'),
      problem: step(
        [['답변마다 꼬리 질문이 이어져 면접이 끝나지 않았고, 사용자는 언제 끝나는지 알 수 없었습니다.', 'A follow-up came after every answer, so the interview never ended and the user could not tell when it would.']],
        ['AI 면접관이 꼬리 질문을 끝없이 만들었습니다.', 'The AI interviewer kept generating follow-up questions.'],
      ),
      analysis: step(
        [
          [
            '질문 개수와 마무리를 프롬프트로만 지시하면 모델이 지키지 않는 경우가 있어, 면접의 길이와 끝은 모델이 아니라 서버가 정해야 한다고 판단했습니다.',
            'When the number of questions and the closing were only instructed in the prompt, the model did not always follow them, so the length and the end of an interview had to be decided by the server, not the model.',
          ],
        ],
        ['프롬프트 수정만으로는 멈추지 않아 서버 규칙으로 막기로 했습니다.', 'Prompt changes alone did not stop it, so a server rule had to.'],
      ),
      action: step(
        [
          [
            '프롬프트 수정과 함께 서버 규칙으로 제한했습니다. 총 15문항에 15번째는 고정된 마무리 질문이고, 꼬리 질문은 답변이 짧을 때 한 번까지만 만듭니다.',
            'Alongside the prompt changes, the server enforces the limits: 15 questions in total, the 15th a fixed closing question, and a follow-up only after a short answer, at most once.',
          ],
        ],
        ['총 15문항, 15번째는 고정 마무리, 꼬리 질문은 짧은 답변에 한 번까지.', '15 questions, a fixed 15th closing question, and at most one follow-up after a short answer.'],
      ),
      result: step(
        [
          [
            '면접은 15문항 안에서 끝나며, 한신대 AI 면접 특강 2회(2025.10)와 쏘랩 시연(2025.11)에서 학생들이 직접 써 봤습니다.',
            'Interviews now end within 15 questions, and students tried the service themselves at two AI interview workshops at Hanshin University (Oct 2025) and a SoLab demo (Nov 2025).',
          ],
        ],
        ['면접이 15문항 안에서 끝납니다.', 'Interviews end within 15 questions.'],
      ),
    },
    {
      title: k('직무에 맞는 질문', 'Questions that fit the role'),
      problem: step([['직무와 무관한 자료가 검색되어 질문이 일반적으로 나왔습니다.', 'Unrelated material was retrieved, so the questions came out generic.']]),
      analysis: step(
        [['면접 질문의 품질은 모델보다 검색에 어떤 자료를 넣느냐에 더 좌우됐습니다.', 'The quality of the questions depended more on what went into retrieval than on the model.']],
        ['프롬프트 하나에 모든 직무를 넣는 대신 자료와 면접관을 나누기로 했습니다.', 'Rather than one prompt for every role, the material and the interviewers would be split.'],
      ),
      action: step([
        [
          '질문 데이터와 검색 자료를 직무·기업별로 나눠 두고, Assistant도 직무·기업마다 따로 만들었습니다.',
          'Question data and search material are kept separately by role and company, and each role and company has its own Assistant.',
        ],
      ]),
      result: step([['자료를 나눈 뒤에야 질문이 지원 직무와 기업에 맞게 구체적으로 나왔습니다.', 'Only after the material was split did the questions come out specific to the role and company.']]),
    },
  ],
  results: pairs([
    ['2025 한신 AISW 페스티벌 창업 아이디어 부문 장려상을 받았습니다.', 'Honorable Mention (Startup Idea) at the 2025 Hanshin AISW Festival.'],
    ['오픈소스 개발자대회 출품작이며, 한신대 AI 면접 특강 2회(2025.10)와 쏘랩 시연(2025.11)에서 학생들이 직접 써 봤습니다.', 'Entered in the Open Source Developer Competition; students tried it themselves at two AI interview workshops at Hanshin University (Oct 2025) and a SoLab demo (Nov 2025).'],
  ]),
  retro: pairs([
    [
      '면접 질문의 품질은 모델보다 검색에 어떤 자료를 넣느냐에 더 좌우됐습니다. 직무·기업별로 자료를 나눈 뒤에야 질문이 구체적으로 나왔고, 끝없이 이어지던 꼬리 질문도 프롬프트가 아니라 서버 규칙으로 잡혔습니다.',
      'The quality of the interview questions depended more on what went into retrieval than on the model. Questions became specific only after the material was split by role and company, and the endless follow-ups were stopped by a server rule, not by the prompt.',
    ],
  ]),
  imageSize: [1400, 767],
  image: '/images/projects/innoview.png',
  imageCaption: k('면접 질문과 답변 입력 화면 · 실제 화면', 'Interview question and answer screen · real screen'),
}

export const labelLight: Project = {
  slug: 'label-light',
  name: 'Label Light',
  years: [2024],
  tier: 'supporting',
  showcase: 'supporting',
  period: '2024.04–2024.11',
  team: k('2인 · 1저자 논문', 'Team of 2 · first-author paper'),
  role: k('기획 · 백엔드 · AI 챗봇 설계', 'Planning · backend · AI chatbot design'),
  status: k('연구 종료 · 논문 발표', 'Research finished · paper presented'),
  statusCheckedAt: '2026-11-09',
  stack: ['Express', 'MySQL', 'OpenAI Assistants', 'GPT-4o-mini', 'Whisper', 'Google TTS'],
  summary: k(
    '시니어가 일상 대화를 나누는 동안 노인 우울 척도(GDS) 문항을 대화 속에서 끌어내는 음성 챗봇. 직접 설문과 일상 대화 방식을 비교해 거부감이 적은 대화 방식으로 구성하고, 모델 3종을 비교해 고른 GPT-4o-mini에 파인튜닝, RAG, 프롬프트를 결합했습니다. 2024 한신 AISW 페스티벌 일반 부문 특별상 · 2025 한국디지털콘텐츠학회 하계 논문(1저자 · 동상).',
    'A voice chatbot that draws Geriatric Depression Scale questions out of everyday conversation with seniors. After comparing a direct questionnaire with everyday conversation, it uses conversation, which people resist less. GPT-4o-mini, chosen from three compared models, combines fine-tuning, RAG and prompts. Special Award (General) at the 2024 Hanshin AISW Festival · first-author paper (Bronze Award) at the 2025 Korea Digital Contents Society summer conference.',
  ),
  product: k(
    '시니어가 일상 대화를 나누는 동안 노인 우울 척도(GDS) 문항을 대화 속에서 끌어내는 음성 서비스',
    'A voice service that draws Geriatric Depression Scale questions out of everyday conversation with seniors',
  ),
  overview: {
    highlights: pairs([
      ['2024 한신 AISW 페스티벌 일반 부문 특별상', 'Special Award (General) at the 2024 Hanshin AISW Festival'],
      ['한국디지털콘텐츠학회 2025 하계 논문 1저자 · 대학생 논문경진대회 동상', 'First-author paper at the 2025 Korea Digital Contents Society summer conference · Bronze Award'],
    ]),
    scope: pairs([
      ['서비스 기획, AI 챗봇 설계, 백엔드 개발을 맡았고 논문 1저자로 참여했습니다. 화면 개발은 팀원이 맡았습니다.', 'I handled service planning, the AI chatbot design and backend development, and was first author of the paper. A teammate built the frontend.'],
    ]),
  },
  features: pairs([
    ['음성으로만 진행하는 대화와 대화 기반 GDS 평가', 'Voice-only conversation and GDS assessment from it'],
    ['GDS 점수, 감정 상태, 개선 방안을 담은 결과 보고서', 'A report with the GDS score, emotional state and suggestions'],
    ['큰 글씨와 간결한 버튼의 시니어용 화면', 'Large text and simple buttons for seniors'],
  ]),
  background: pairs([
    [
      '시니어를 위한 정신건강 자가 점검 서비스는 부족하고, 정신건강 검사라는 말 자체에 거부감이 있습니다. 글을 읽고 입력하는 것이 불편한 사용자도 많습니다.',
      'Mental-health self-check services for seniors are scarce, many resist the idea of a mental health test, and many find reading and typing difficult.',
    ],
  ]),
  architecture: {
    body: pairs([
      [
        'Express 서버와 MySQL을 쓰고, OpenAI Assistants API가 대화를 맡습니다. 음성 대화는 브라우저 녹음(WebM) → ffmpeg로 WAV 변환 → Whisper 받아쓰기 → Assistant 응답 → Google TTS 재생 순서로 이어집니다. 글을 읽고 입력하기 어려운 사용자를 위해 대화는 음성으로만 진행하고, 화면은 큰 글씨와 간결한 버튼으로 구성했습니다.',
        'It uses an Express server and MySQL, with the OpenAI Assistants API handling conversation. A voice exchange runs from a browser recording (WebM) → conversion to WAV with ffmpeg → Whisper transcription → the Assistant’s response → Google TTS playback. For users who find reading and typing hard, the conversation is voice-only and the screens use large text and simple buttons.',
      ],
    ]),
    decisions: pairs([
      [
        '검사 방식: 직접 설문은 명확하지만 거부감을 일으킬 수 있고, 일상 대화는 다소 부정확해도 거부감이 적습니다. 두 방식을 시험해 보고 일상 대화 방식으로 구성했습니다.',
        'How to assess: a direct questionnaire is clear but can provoke resistance, while everyday conversation can be less exact but meets less resistance. After testing both, I built the service around conversation.',
      ],
      [
        '모델 선정: GPT-4o, GPT-4o-mini, Llama 3.1 8B를 가격, 응답 속도, 대화 자연스러움 등으로 비교해 GPT-4o-mini를 골랐습니다.',
        'Choosing the model: GPT-4o, GPT-4o-mini and Llama 3.1 8B were compared on price, response speed, how natural the conversation felt and more, and GPT-4o-mini was chosen.',
      ],
    ]),
  },
  cases: [
    {
      title: k('설문처럼 들리지 않는 검사', 'An assessment that does not sound like a questionnaire'),
      problem: step(
        [
          [
            '직접 설문은 명확하지만 "검사"라는 말에 거부감을 일으킬 수 있고, 일상 대화는 거부감이 적지만 평가가 흔들릴 수 있습니다.',
            'A direct questionnaire is clear but the word "test" provokes resistance, while everyday conversation meets less resistance but can make the assessment unsteady.',
          ],
        ],
        ['평가는 일관되어야 하는데 대화는 설문처럼 들리지 않아야 합니다.', 'The assessment had to stay consistent while the conversation must not sound like a questionnaire.'],
      ),
      analysis: step(
        [
          [
            '직접 설문과 일상 대화 방식을 시험해 비교했습니다. 거부감이 적은 일상 대화 방식으로 구성하되, 평가의 일관성은 모델 쪽에서 파인튜닝·RAG·프롬프트 세 가지로 잡기로 했습니다.',
            'I tried both the direct questionnaire and the everyday-conversation approach and compared them. The service was built around conversation, which meets less resistance, and the consistency of the assessment was to come from the model side through fine-tuning, RAG and prompts.',
          ],
        ],
        ['두 방식을 시험해 보고 일상 대화 방식을 골랐습니다.', 'After trying both, I chose everyday conversation.'],
      ),
      action: step(
        [
          [
            '정신과 대화 데이터를 전처리해 파인튜닝하고, GDS 자료와 보고서 양식은 RAG로 참고하며, 30문항을 일상 대화처럼 묻는 것은 프롬프트로 맞췄습니다.',
            'Psychiatric conversation data was preprocessed for fine-tuning, RAG supplies the GDS material and the report template, and prompts ask the 30 questions like everyday conversation.',
          ],
        ],
        ['파인튜닝, RAG, 프롬프트로 역할을 나눴습니다.', 'Fine-tuning, RAG and prompts each took a role.'],
      ),
      result: step(
        [
          [
            '2024 한신 AISW 페스티벌 일반 부문 특별상을 받았고, 2025 한국디지털콘텐츠학회 하계종합학술대회에 1저자로 발표해 대학생 논문경진대회 동상을 받았습니다.',
            'It won the Special Award (General) at the 2024 Hanshin AISW Festival, and the first-author paper presented at the 2025 Korea Digital Contents Society summer conference won a Bronze Award in the student paper competition.',
          ],
        ],
        ['일상 대화 속에서 GDS 30문항을 끌어내는 음성 챗봇으로 완성해 논문과 수상으로 이어졌습니다.', 'The voice chatbot that draws the 30 GDS questions out of conversation led to a paper and awards.'],
      ),
    },
  ],
  results: pairs([
    ['2024 한신 AISW 페스티벌 일반 부문 특별상을 받았습니다.', 'Won the Special Award (General) at the 2024 Hanshin AISW Festival.'],
    ['2025 한국디지털콘텐츠학회 하계종합학술대회에 1저자로 논문을 발표해 대학생 논문경진대회 동상을 받았습니다.', 'Presented a first-author paper at the 2025 Korea Digital Contents Society summer conference and won a Bronze Award in the student paper competition.'],
  ]),
  retro: pairs([
    [
      '설문을 대화로 바꾸는 일은 모델 선택보다 말투와 질문 순서를 정하는 프롬프트 설계가 거의 전부였습니다. 시니어 사용자를 직접 만나 확인하지 못한 점이 가장 아쉽습니다.',
      'Turning a questionnaire into a conversation was almost entirely about prompt design, the tone and the order of the questions, rather than the choice of model. What I regret most is not having checked it with senior users in person.',
    ],
  ]),
  imageSize: [695, 868],
  image: '/images/projects/label-light.png',
  imageCaption: k('음성 대화 화면 · 실제 화면', 'Voice conversation screen · real screen'),
}
