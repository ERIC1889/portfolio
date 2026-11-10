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
          ['클라이언트', 'Client'],
          [
            node('web', 'mine', ['브라우저', 'Browser'], {
              icon: 'browser',
              subtitle: ['React 19 · Vite', 'React 19 · Vite'],
              links: [['api', ['요청 · 응답', 'request · response'], 'sync']],
            }),
          ],
        ),
        column(
          ['API 서버', 'API server'],
          [
            node('api', 'mine', ['API 서버', 'API server'], {
              icon: 'server',
              subtitle: ['Node.js · Express', 'Node.js · Express'],
              links: [
                ['mysql', ['조회 · 저장', 'read · write'], 'sync'],
                ['mongo', ['조회 · 저장', 'read · write'], 'sync'],
                ['openai', ['AI 요청', 'AI request'], 'paid'],
              ],
            }),
            node('cron', 'mine', ['스케줄러', 'Scheduler'], {
              icon: 'clock',
              subtitle: ['node-cron · 주기 동기화', 'node-cron · periodic sync'],
              links: [
                ['data', ['가져오기', 'fetch'], 'sync'],
                ['mysql', ['저장', 'write'], 'sync'],
              ],
            }),
          ],
        ),
        column(
          ['외부 서비스', 'External services'],
          [
            node('openai', 'external', ['OpenAI', 'OpenAI'], { icon: 'sparkles', subtitle: ['GPT-4o-mini', 'GPT-4o-mini'] }),
            node('data', 'external', ['공공데이터 API', 'Public data API'], { icon: 'globe', subtitle: ['data.go.kr · 7종', 'data.go.kr · 7 APIs'] }),
          ],
        ),
      ],
      [
        '브라우저 → Express API → MySQL · MongoDB. 공공데이터는 스케줄러가 주기적으로 가져와 MySQL에 넣고, AI 기능은 OpenAI를 부른다 · 로컬 · Docker로 실행',
        'Browser → Express API → MySQL · MongoDB. A scheduler pulls the public data into MySQL periodically, and the AI features call OpenAI · runs locally and in Docker',
      ],
      footer(
        ['데이터', 'Data'],
        'database',
        [
          node('mongo', 'data', ['MongoDB', 'MongoDB'], { icon: 'database', subtitle: ['시험 결과 · 로드맵 · 면접 대화', 'Exam results · roadmaps · interview conversations'] }),
          node('mysql', 'data', ['MySQL', 'MySQL'], { icon: 'database', subtitle: ['계정 · 학습 목표 · 자격증', 'Accounts · study goals · certifications'] }),
        ],
      ),
    ),
    body: pairs([
      [
        '사용자는 React 앱으로 들어오고, 모든 요청은 Express API 서버 하나를 거칩니다. API 서버는 계정·학습 목표·자격증처럼 서로 연결되는 데이터는 MySQL에, 시험 결과·로드맵·면접 대화처럼 한 덩어리로 읽고 쓰는 데이터는 MongoDB에 저장하고, 추천·로드맵·모의면접은 OpenAI를 호출해 만듭니다. 자격증 정보는 사용자가 요청할 때마다 공공데이터를 부르지 않고, 스케줄러가 주기적으로 7종 API에서 가져와 MySQL에 넣어 둔 것을 읽습니다. 서버 코드는 라우트 → 컨트롤러 → 서비스 → 모델 4계층으로 나눴고, 로컬과 Docker에서 실행했습니다.',
        'Users come in through the React app, and every request goes through one Express API server. The server keeps data that connects to other data (accounts, study goals, certifications) in MySQL and data read and written as one piece (exam results, roadmaps, interview conversations) in MongoDB, and calls OpenAI for recommendations, roadmaps and mock interviews. Certification information is not fetched from the public APIs on each request: a scheduler pulls it periodically from the 7 APIs into MySQL, and the server reads it from there. The server code is split into four layers, routes → controllers → services → models, and it ran locally and in Docker.',
      ],
    ]),
    decisions: pairs([
      [
        'DB 분리: 앞선 팀 프로젝트 EduMatrix에서는 AI 리포트를 MongoDB 문서로 저장하면서 같은 점수가 MySQL에도 들어가 두 DB의 경계가 흐려졌습니다. 그래서 SkillPilot에서는 읽고 쓰는 단위를 기준으로 삼아, 계정·학습 목표·자격증처럼 서로 연결되고 정합성이 중요한 데이터는 MySQL에, 시험 결과·로드맵·면접 대화처럼 한 덩어리로 읽고 쓰는 데이터는 MongoDB에 두고 같은 데이터가 양쪽에 있지 않게 했습니다. 팀이 MongoDB에 익숙했던 것도 이유였습니다. 대가는 두 DB 사이에 트랜잭션이 없다는 점이어서, 로드맵을 저장한 뒤 일정 갱신이 실패하면 두 DB가 어긋날 수 있습니다. 돌아보면 MongoDB에 둔 데이터를 내부 필드로 조회하는 코드가 없었고 자격증 과목 목록은 MySQL JSON 컬럼으로 충분했기 때문에, 지금 다시 한다면 MySQL 하나로 시작하고 부하나 구조 변경 빈도가 근거로 쌓일 때 분리하겠습니다.',
        'Splitting the databases: in an earlier team project, EduMatrix, AI reports were stored as MongoDB documents while the same scores also went into MySQL, and the line between the two databases blurred. So in SkillPilot the rule was the unit of reading and writing: data that connects to other data and has to stay consistent (accounts, study goals, certifications) went in MySQL, data read and written as one piece (exam results, roadmaps, interview conversations) went in MongoDB, and nothing was stored on both sides. The team being used to MongoDB was part of the reason too. The price is that there are no transactions across the two databases, so if the schedule update fails after a roadmap is saved, the two drift apart. Looking back, no code queried the MongoDB data by its inner fields and the certification subject list was fine as a MySQL JSON column, so today I would start with MySQL alone and split only once load or the pace of schema changes gave a reason.',
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
      '흩어진 IT 자격증 정보를 한곳에서 늘 최신으로 볼 수 있게, 공공데이터 API 7종을 하나의 자격증 데이터로 정규화하고 스케줄러가 자동으로 갱신하도록 만들었습니다. 손으로 갱신할 일이 없고, 전체 국가자격 613종목 중 IT 34종목과 시험 일정 87건이 저장됩니다.',
      'So that scattered IT certification information can be seen in one place and stays current, 7 public data APIs are normalized into one set of certification data that a scheduler refreshes on its own. Nothing is updated by hand, and 34 IT certifications and 87 exam schedules out of 613 national certifications are stored.',
    ],
    [
      'API마다 응답 형식이 다르고 실패를 상태 코드로 알리지 않는 문제는 공통 클라이언트 1개와 API별 정규화 함수 7개로 나눠 처리했고, 단위 테스트 31개와 관리자 수동 실행으로 확인했습니다.',
      'Each API answers in its own format and does not report failure through the status code; one shared client and seven per-API normalization functions handle that, checked with 31 unit tests and manual admin runs.',
    ],
    [
      'AI 호출이 실패해도 추천과 로드맵이 끊기지 않도록 규칙 기반 대체 응답을 두고, 같은 조건의 요청은 저장된 결과를 다시 씁니다.',
      'Rule-based fallbacks keep recommendations and roadmaps going when an AI call fails, and the same request reuses the stored result.',
    ],
    [
      '13개 화면과 16개 백엔드 라우트 모듈로 캡스톤을 마쳤고, 최종 발표를 맡았습니다.',
      'The capstone was finished with 13 screens and 16 backend route modules, and I gave the final presentation.',
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
