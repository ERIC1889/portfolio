import type { Project } from '../types'
import { column, diagram, footer, k, node, pairs, shot, step, video } from './helpers'

const REPO = 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot'

export const skillpilot: Project = {
  slug: 'skillpilot',
  name: 'SkillPilot',
  years: [2025],
  tier: 'featured',
  showcase: 'main',
  title: k('SkillPilot 자격증·커리어 플랫폼', 'SkillPilot certification and career platform'),
  product: k(
    '흩어진 IT 자격증 정보를 한곳에 모으고, 자격증 선택부터 학습, 모의시험, 면접 준비까지 이어 주는 웹 서비스',
    'A web service that gathers scattered IT certification information in one place and carries you from choosing a certification through studying, mock exams and interview preparation',
  ),
  audience: k('IT 취업을 준비하는 학생', 'Students preparing for IT jobs'),
  period: '2025.09–2026.06',
  team: k('프론트엔드 2, AI 1, 백엔드·총괄 1', 'Frontend 2, AI 1, backend and lead 1'),
  role: k('팀장 · 백엔드 전체 · 프론트엔드 개편', 'Team lead · the entire backend · frontend overhaul'),
  status: k('캡스톤 완료', 'Capstone completed'),
  statusCheckedAt: '2026-10-29',
  stack: ['Node.js', 'Express 5', 'MySQL', 'MongoDB', 'OpenAI API', 'node-cron', 'React 19'],
  summary: k(
    '공공 API 7종을 하나의 자격증 데이터로 정규화한 IT 취업 준비 플랫폼. 4인 팀에서 팀장과 백엔드 전체, 프론트엔드 개편을 맡았습니다.',
    'An IT job-preparation platform that normalizes 7 public APIs into one set of certification data. In a team of four I was the lead, built the entire backend and overhauled the frontend.',
  ),
  overview: {
    highlights: pairs([
      ['공공 API 7종 → IT 자격증 34종목 · 시험 일정 87건으로 정규화해 자동 갱신', '7 public APIs normalized into 34 IT certifications and 87 exam schedules, refreshed automatically'],
      ['13개 화면 · 16개 백엔드 라우트 모듈로 캡스톤 완료', 'Capstone finished with 13 screens and 16 backend route modules'],
      ['정규화·재시도 코드와 발표 자료를 공개 저장소에 공개', 'Normalizing and retry code and the final presentation in a public repository'],
    ]),
  },
  features: pairs([
    ['AI 기반의 맞춤형 자격증 추천', 'AI-based personalized certification recommendations'],
    ['주차별 학습 로드맵 자동 생성', 'Automatic weekly study roadmap'],
    ['실전 CBT 모의고사 및 오답 분석', 'Realistic CBT mock exams and wrong-answer analysis'],
    ['포트폴리오 구축', 'Portfolio building'],
    ['모의면접', 'Mock interviews'],
  ]),
  resumeItems: pairs([
    ['공공 API 7종 응답 정규화 — HTTP 200 속 오류 문구를 실패로 판정해 재시도, XML·JSON 통합 해석', 'Normalized 7 public APIs — error text inside an HTTP 200 counts as a failure and is retried, XML and JSON parsed alike'],
    ['node-cron 주기 동기화, 같은 조건의 AI 결과 재사용(MongoDB), 백엔드 라우트 모듈 16개', 'Periodic syncing with node-cron, reuse of AI results for the same request (MongoDB), 16 backend route modules'],
  ]),
  contribution: {
    direct: pairs([
      ['백엔드 전체: API, DB 설계, 공공 API 연동과 동기화, OpenAI 연동', 'The entire backend: API, database design, public API integration and syncing, OpenAI integration'],
      [
        '프론트엔드 개편: UI 코드 리팩터링, 페이지 이전, 공통 컴포넌트, 대시보드 위젯, 학습메이트, 모의 면접 설정 화면, 챗봇 오프라인 대체 응답',
        'Frontend overhaul: UI refactoring, page migration, shared components, dashboard widgets, the study companion, the mock-interview setup screen and an offline fallback for the chatbot',
      ],
      ['팀 운영(일정·역할 조율)과 최종 발표', 'Running the team (schedule and role coordination) and the final presentation'],
    ]),
  },
  media: [
    video(
      '/media/skillpilot/demo.mp4',
      '/media/skillpilot/demo-poster.webp',
      1280,
      710,
      ['SkillPilot 시연 영상', 'SkillPilot demo video'],
      ['시연: 대시보드 → 학습 기록 → AI 모의 면접 → CBT 모의고사 → AI 오답 해설 → 학습메이트', 'Demo: dashboard → study log → AI mock interview → CBT mock exam → AI answer review → study companion'],
      '2026-05-04',
    ),
    shot(
      '/media/skillpilot/dashboard.webp',
      1600,
      885,
      ['학습 로드맵과 학습 캘린더가 있는 대시보드', 'Dashboard with the study roadmap and study calendar'],
      ['대시보드: 주차별 학습 로드맵·캘린더 · 실제 화면', 'Dashboard: weekly study roadmap and calendar · real screen'],
      '2026-05-04',
    ),
    shot(
      '/media/skillpilot/study-log.webp',
      1600,
      885,
      ['학습 기록, 학습 시간 추이 차트, 학습 잔디밭이 있는 대시보드 아래쪽', 'Lower dashboard with the study log, a study-time trend chart and a study heatmap'],
      ['대시보드 위젯: 학습 기록·추이·잔디밭 · 실제 화면', 'Dashboard widgets: study log, trend, heatmap · real screen'],
      '2026-05-04',
    ),
    shot('/media/skillpilot/wrong-answer.webp', 1600, 885, ['AI 오답 해설 화면', 'AI wrong-answer explanation'], ['AI 오답 해설 · 실제 화면', 'AI wrong-answer explanation · real screen'], '2026-05-04'),
    shot('/media/skillpilot/interview.webp', 1600, 885, ['AI 모의 면접 설정 화면', 'AI mock interview setup'], ['AI 모의 면접 설정 · 실제 화면', 'AI mock interview setup · real screen'], '2026-05-04'),
  ],
  links: [
    { kind: 'code', label: k('공개 저장소', 'Public repository'), href: REPO },
    { kind: 'code', label: k('API 클라이언트 (정규화·재시도)', 'API client (normalizing, retries)'), href: `${REPO}/blob/main/SkillPilot-backend/src/integrations/dataGoKr/client.js` },
    { kind: 'code', label: k('동기화 서비스', 'Sync service'), href: `${REPO}/blob/main/SkillPilot-backend/src/services/certificationSync.service.js` },
    { kind: 'code', label: k('AI 결과 재사용', 'AI result reuse'), href: `${REPO}/blob/main/SkillPilot-backend/src/services/ai.service.js` },
    {
      kind: 'slides',
      label: k('최종 발표 자료 (PDF)', 'Final presentation (PDF)'),
      href: `${REPO}/blob/main/${encodeURIComponent('최종발표자료_AISW캡스톤디자인(A반_SkillPilot팀).pdf')}`,
    },
  ],
  background: pairs([
    [
      "IT 산업의 급격한 성장으로 인해 취업준비생, 경력 초년생들에게 요구되는 기술 스택과 자격증의 종류가 매우 방대해졌습니다. 하지만 정작 취업을 준비하는 개인에게는 교육, 자격증 정보, 프로젝트 준비, 채용 정보 등이 여러 플랫폼에 분산되어 있어 비효율적입니다. 이러한 문제를 해결하기 위해 React와 Node.js 및 MySQL, MongoDB를 이용하여 모바일/웹 호환 IT 커리어 올인원 플랫폼 'SkillPilot'을 개발했습니다.",
      'With the rapid growth of the IT industry, the range of tech stacks and certifications expected of job seekers and early-career engineers has become vast. Yet for the individual preparing for a job, courses, certification information, project preparation and job postings are scattered across many platforms, which is inefficient. To solve this, we built SkillPilot, an all-in-one IT career platform for mobile and web, with React, Node.js, MySQL and MongoDB.',
    ],
  ]),
  architecture: {
    diagram: diagram(
      [
        column(
          ['브라우저 · 앱', 'Browser · app'],
          [
            node('web', 'mine', ['React 19 앱', 'React 19 app'], {
              icon: 'browser',
              subtitle: ['Vite · OnboardingGuard', 'Vite · OnboardingGuard'],
              items: [['로그인 · 추천 · 학습 · CBT · 면접 · 포트폴리오', 'Login · recommendations · study · CBT · interviews · portfolio']],
              links: [['api', ['REST', 'REST'], 'sync']],
            }),
          ],
        ),
        column(
          ['API 서버', 'API server'],
          [
            node('api', 'mine', ['Node.js Express', 'Node.js Express'], {
              icon: 'server',
              subtitle: ['라우트 → 컨트롤러 → 서비스 → 모델', 'routes → controllers → services → models'],
              items: [['인증 · 검증 · 라우트 모듈 16개', 'Auth · validation · 16 route modules']],
              links: [
                ['mysql', ['CRUD', 'CRUD'], 'sync'],
                ['mongo', ['학습 로그', 'study log'], 'sync'],
                ['openai', ['AI 호출', 'AI calls'], 'paid'],
              ],
            }),
            node('cron', 'mine', ['node-cron', 'node-cron'], {
              icon: 'clock',
              subtitle: ['자격증 매일 04:00 · 시험 일정 매주 월 05:00', 'Certifications daily 04:00 · schedules Mondays 05:00'],
              links: [
                ['data', ['XML · 정규화', 'XML · normalization'], 'sync'],
                ['mysql', ['findOrCreate', 'findOrCreate'], 'sync'],
              ],
            }),
          ],
        ),
        column(
          ['외부 서비스', 'External services'],
          [
            node('openai', 'external', ['OpenAI', 'OpenAI'], {
              icon: 'sparkles',
              subtitle: ['GPT-4o-mini', 'GPT-4o-mini'],
              items: [['추천 · 로드맵 · 오답 분석 · 모의면접', 'Recommendations · roadmaps · answer review · mock interviews']],
            }),
            node('data', 'external', ['공공데이터', 'Public data'], {
              icon: 'globe',
              subtitle: ['data.go.kr', 'data.go.kr'],
              items: [['자격증 · 시험 일정 API 7종', '7 certification and exam-schedule APIs']],
            }),
          ],
        ),
      ],
      ['화면 → Express API → MySQL·MongoDB · 공공데이터는 node-cron이 주기적으로 동기화', 'Screens → Express API → MySQL and MongoDB · public data synced periodically by node-cron'],
      footer(
        ['데이터 (하이브리드 DB)', 'Data (hybrid DB)'],
        'database',
        [
          node('mongo', 'data', ['MongoDB', 'MongoDB'], { icon: 'database', subtitle: ['Mongoose · 문제은행 · 학습 기록 · 모의면접', 'Mongoose · question bank · study log · mock interviews'] }),
          node('mysql', 'data', ['MySQL', 'MySQL'], { icon: 'database', subtitle: ['Sequelize · 사람 · 프로필 · 목표 · 자격증', 'Sequelize · people · profiles · goals · certifications'] }),
        ],
      ),
    ),
    body: pairs([
      [
        '백엔드는 라우트(routes) → 컨트롤러(controllers) → 서비스(services) → 모델(models)의 4계층으로 책임을 분리했습니다. 공공데이터 동기화는 스케줄러(node-cron)가 담당하며, 자격증 정보는 공공데이터에서 제공하는 고유 일련번호(externalId)를 기준으로 findOrCreate되어 중복 없이 갱신됩니다. 사용자의 학습 활동(학습 시간·시험 결과 등)은 즉시 MongoDB에 로깅되어 대시보드 집계와 AI 분석의 컨텍스트(Context)로 활용됩니다',
        "The backend separates responsibilities into four layers: routes → controllers → services → models. A scheduler (node-cron) handles public-data syncing; certifications are findOrCreate'd by the unique serial number (externalId) the public data provides, so they refresh without duplicates. Users' study activity (study time, exam results and so on) is logged to MongoDB immediately and used for dashboard aggregates and as context for AI analysis.",
      ],
    ]),
    decisions: pairs([
      [
        'DB 분리: 서로 연결되는 데이터는 MySQL에, 한 덩어리로 읽고 쓰는 데이터는 MongoDB에 뒀습니다. 대신 두 DB 사이의 트랜잭션을 포기했고, 지금이라면 MySQL 하나로 시작하겠습니다.',
        'Splitting the databases: data that connects to other data went in MySQL, and data read and written as one unit went in MongoDB. That gave up transactions across the two, and today I would start with MySQL alone.',
      ],
      [
        'AI 실패 처리: AI 호출이 실패하면 오류 대신 규칙 기반 추천과 로드맵을 제공했습니다. 품질은 낮아져도 온보딩 흐름은 끊기지 않습니다. 같은 사용자의 같은 조건 요청은 저장된 결과를 다시 씁니다.',
        'Handling AI failures: when an AI call fails, rule-based recommendations and roadmaps replace the error. Quality drops, but onboarding keeps going. The same user sending the same request gets the stored result.',
      ],
    ]),
  },
  cases: [
    {
      title: k('HTTP 200 응답에 포함된 공공 API 오류 처리', 'Handling public-API errors returned inside an HTTP 200'),
      problem: step(
        [
          [
            '자격증과 시험 일정을 수집하기 위해 공공 API 7종을 연동했습니다. 이 과정에서 요청이 실패했는데도 HTTP 200과 함께 오류 문구를 반환하는 응답을 확인했습니다. 상태 코드만 검사하면 이러한 응답을 정상으로 판단해 후속 데이터 처리를 진행할 수 있었습니다.',
            'To collect certifications and exam schedules I integrated 7 public APIs. Along the way I found responses that carried an error message together with HTTP 200 even though the request had failed. Checking only the status code would have treated these as successes and carried on processing the data.',
          ],
        ],
        ['상태 코드만으로 API 성공 여부를 판단하기 어려웠습니다.', 'The status code alone could not tell whether an API call had succeeded.'],
      ),
      analysis: step(
        [
          [
            '각 API의 응답 형식과 오류 발생 시 반환 내용을 비교했습니다. 응답은 크게 정상 데이터를 반환하는 경우, 4xx·5xx 상태 코드로 실패를 알리는 경우, HTTP 200이지만 본문에 오류 문구가 포함된 경우로 나뉘었습니다.',
            'I compared each API’s response format and what it returns on an error. Responses fell into three groups: normal data, a 4xx or 5xx status signalling failure, and HTTP 200 with an error message in the body.',
          ],
          [
            '특히 본문에 `SERVICE ERROR`, `INVALID_REQUEST_PARAMETER_ERROR` 같은 문구가 반환됐습니다. 이를 통해 HTTP 상태 코드 검사만으로는 부족하며, 데이터를 파싱하기 전에 본문에 API 오류가 포함되어 있는지도 확인해야 한다고 판단했습니다.',
            'In particular, the body carried phrases such as `SERVICE ERROR` and `INVALID_REQUEST_PARAMETER_ERROR`. From this I concluded that checking the HTTP status is not enough, and that the body has to be checked for an API error before the data is parsed.',
          ],
        ],
        ['HTTP 상태와 본문 내용을 함께 확인해야 했습니다.', 'Both the HTTP status and the body had to be checked.'],
      ),
      action: step(
        [
          [
            'HTTP 상태를 확인한 뒤 응답 본문에서 확인된 오류 문구를 검사하도록 구현했습니다. 해당 문구가 포함된 응답은 정상 데이터로 파싱하지 않고 예외로 처리했습니다.',
            'After checking the HTTP status, the client inspects the body for the known error phrases. A response containing one is not parsed as data but raised as an exception.',
          ],
          [
            '실패한 요청은 0.5초, 1초 간격으로 최대 2회 재시도하도록 구성했습니다. 최초 요청을 포함해 총 3회까지 호출하며, 모두 실패하면 마지막 오류를 호출한 쪽에 전달하도록 했습니다.',
            'A failed request is retried up to twice, after 0.5 s and 1 s. Including the first attempt it is called at most three times, and if every attempt fails the last error is passed back to the caller.',
          ],
        ],
        ['공통 API 클라이언트에 본문 검사와 재시도 처리를 추가했습니다.', 'I added a body check and retries to the shared API client.'],
      ),
      result: step(
        [
          [
            'HTTP 200이더라도 확인된 오류 문구가 포함된 응답은 정상 파싱 단계로 넘어가지 않도록 구성했습니다. API별 호출 코드에서 같은 검사를 반복하지 않고, 공통 클라이언트에서 오류 판별과 재시도 횟수를 관리하도록 정리했습니다.',
            'A response with a known error phrase never reaches the parsing step, even with HTTP 200. Error detection and the retry count live in the shared client instead of being repeated in each API’s call code.',
          ],
          [
            '다만 현재는 입력 오류와 일시적인 장애를 구분하지 않고 재시도합니다. 이후에는 오류 유형에 따라 재시도 여부를 나누고, 정상 응답과 오류 응답을 자동 테스트로 검증할 계획입니다.',
            'For now, though, it retries without distinguishing input errors from transient failures. The plan is to decide retries by error type and to verify normal and error responses with automated tests.',
          ],
        ],
        ['상태 코드에 드러나지 않는 실패도 공통 처리 흐름에 포함했습니다.', 'Failures that the status code does not show are now part of the shared handling.'],
      ),
    },
    {
      title: k('XML, JSON 등 제각각인 응답구조', 'Response structures that differed: XML, JSON and more'),
      problem: step(
        [
          [
            '공공 API 7종은 XML·JSON 형식뿐 아니라 목록 위치와 필드명도 달랐습니다. 조회 건수에 따라 배열·객체·빈 태그가 반환되는 문제가 있었습니다.',
            'The 7 public APIs differed not only between XML and JSON but in where the list sat and what the fields were called. Depending on the number of results, an array, an object or an empty tag came back.',
          ],
        ],
        ['응답 형식과 같은 데이터의 표기가 API마다 달랐습니다', 'Response formats and the way the same data was written differed from API to API.'],
      ),
      analysis: step(
        [
          [
            '각 API의 응답을 비교한 결과 XML, JSON 해석과 오류 검사, 목록 추출 등은 공통으로 처리할 수 있었습니다. 하지만 자격증 코드나 이름, 시험일에 해당하는 필드와 데이터 연결 방식은 API마다 달랐습니다. 일부 일정 API의 경우 종목코드를 제공하지 않아 호출한 뒤 자격증과 연결해야 했습니다.',
            'Comparing the responses showed that parsing XML and JSON, checking for errors and extracting the list could be handled in one place. The fields for the certification code, name and exam date, and how records linked together, differed per API. Some schedule APIs did not provide the item code, so the schedule had to be linked to the certification after the call.',
          ],
          [
            '필드명을 설정 파일로 매핑하는 방식도 고려했지만, 누락된 데이터 처리와 날짜 변환 등 API별 예외까지 처리하면 설정이 복잡해진다고 판단해 응답 해석과 목록 추출은 공통 API 클라이언트에서 처리하고, 필드 변환은 엔드포인트별 정규화 함수로 분리했고 정규화된 데이터를 자격증과 연결하고 저장하는 작업은 동기화 서비스가 처리했습니다.',
            'I considered mapping field names in a config file, but handling missing data, date conversion and other per-API exceptions there would have made the config complicated. So response parsing and list extraction went into the shared API client, field conversion into a normalization function per endpoint, and linking the normalized data to certifications and saving it into the sync service.',
          ],
        ],
        ['공통 처리와 API별 변환 규칙을 구분했습니다.', 'I separated the shared handling from the per-API conversion rules.'],
      ),
      action: step(
        [
          [
            '공통 API 클라이언트에서 XML·JSON을 해석하고 목록을 배열로 통일했습니다. HTTP 200이어도 응답이 오류를 나타내면 예외로 처리하고, 종목코드는 문자열로 유지했습니다.',
            'The shared client parses XML and JSON and always returns the list as an array. A response that signals an error is raised as an exception even with HTTP 200, and the item code is kept as a string.',
          ],
          [
            '정규화 함수에서는 필드명 차이를 매핑하고, 날짜를 같은 형식으로 변환하며, 불필요한 CSS 조각과 HTML 엔티티를 정리해 내부 모델에 맞췄습니다.',
            'The normalization functions map the differing field names, convert dates to one format and strip stray CSS fragments and HTML entities to fit the internal model.',
          ],
        ],
        ['공통 API 클라이언트 1개와 정규화 함수 7개로 처리 단계를 나눴습니다.', 'One shared API client and seven normalization functions split the work into stages.'],
      ),
      result: step(
        [
          [
            '전체 국가자격 613종목에서 IT 분야를 선별해 자격증 34종목과 시험 일정 87건을 MySQL에 저장했습니다. API별 변환 규칙을 분리했으며, 공통 클라이언트와 정규화 함수는 네트워크 호출 없이 실행하는 단위 테스트 31개로 검증했습니다.',
            'From all 613 national certifications I selected the IT field and stored 34 certifications and 87 exam schedules in MySQL. The conversion rules are separated per API, and the shared client and normalization functions are verified by 31 unit tests that run without network calls.',
          ],
        ],
        ['IT 자격증 34종목과 시험 일정 87건을 저장했습니다', '34 IT certifications and 87 exam schedules were stored.'],
      ),
    },
  ],
  results: pairs([
    [
      '공공데이터 API 7종을 하나의 자격증 데이터로 정규화해, 자격증은 매일 04:00에, 시험 일정은 매주 월요일 05:00에 자동으로 갱신됩니다.',
      'Normalized 7 public data APIs into one set of certification data; certifications refresh every day at 04:00 and exam schedules every Monday at 05:00.',
    ],
    [
      '전체 국가자격 613종목에서 IT 분야 34종목과 시험 일정 87건을 저장했고, 공통 클라이언트와 정규화 함수는 단위 테스트 31개로 검증했습니다. 동기화가 맞게 돌았는지는 관리자 수동 실행과 주기 실행으로 확인했습니다.',
      'From 613 national certifications, 34 IT certifications and 87 exam schedules were stored, with the shared client and normalization functions covered by 31 unit tests. Whether the sync ran correctly was confirmed through manual admin runs and the scheduled runs.',
    ],
    [
      '13개 화면과 16개 백엔드 라우트 모듈(인증·자격증·로드맵·모의고사·면접·대시보드 등)로 캡스톤을 마쳤습니다.',
      'Finished the capstone with 13 screens and 16 backend route modules (auth, certifications, roadmap, mock exams, interviews, dashboard and more).',
    ],
  ]),
  retro: pairs([
    [
      '공공 API는 문서와 실제 응답이 달라서, 연동 코드보다 응답을 확인하고 정규화하는 코드가 더 많아졌습니다. 외부 데이터는 받는 쪽에서 의심하고 검사해야 한다는 것을 배웠습니다.',
      'Public APIs answered differently from their documentation, so the code that checks and normalizes responses outgrew the integration itself. I learned that external data has to be doubted and checked on the receiving side.',
    ],
  ]),
  material: pairs([
    [
      '정규화·재시도(client.js), 동기화(certificationSync.service.js), AI 결과 재사용(ai.service.js) 코드와 최종 발표 자료를 학교 공개 저장소에서 볼 수 있습니다.',
      "The normalizing and retry code (client.js), syncing (certificationSync.service.js), AI result reuse (ai.service.js) and the final presentation are in the school's public repository.",
    ],
  ]),
}
