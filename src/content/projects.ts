import type { CaseSection, Project } from './types'

// Every claim here stays inside spec §5–6 (verified against code, papers and documents).
// Each text is a [Korean, English] pair; the English says the same thing, no more.
type Pair = [ko: string, en: string]

const k = (ko: string, en: string) => ({ ko, en })
const pair = ([ko, en]: Pair) => ({ ko, en })

function section(id: CaseSection['id'], title: Pair, body: Pair[], extra: Partial<CaseSection> = {}): CaseSection {
  return { id, title: pair(title), body: body.map(pair), ...extra }
}

const scene = (minus: Pair, plus: Pair) => ({ minus: pair(minus), plus: pair(plus) })

const OVERVIEW: Pair = ['개요', 'Overview']
const PROBLEM: Pair = ['문제와 제약', 'Problem and constraints']
const DECISION: Pair = ['선택과 이유', 'Decisions and why']
const IMPLEMENTATION: Pair = ['구현', 'Implementation']
const VALIDATION: Pair = ['어떻게 확인했나', 'How I checked it']
const RESULT: Pair = ['결과', 'Result']
const RETRO: Pair = ['다시 만든다면', 'If I built it again']
const EVIDENCE: Pair = ['증거·링크', 'Evidence and links']

export const projects: Project[] = [
  // ── featured ──────────────────────────────────────────────────────────────
  {
    slug: 'suzihouse',
    name: '수지하우스',
    nameEn: 'SuziHouse',
    years: [2026],
    tier: 'featured',
    period: '2026.01–',
    role: k('풀스택 개발 (직함 CTO)', 'Full-stack development (title: CTO)'),
    status: k('회사 웹 운영 중 · 환급 앱 MVP 미출시', 'Company website live · refund app MVP not yet released'),
    stack: ['Next.js', 'TypeScript', 'Expo', 'React Native', 'FastAPI', 'MySQL', 'Redis', 'Celery'],
    summary: k(
      '부동산 세금 계산 플랫폼에서 회사 웹과 세금 비교 기능, 청년 세금 환급 앱 MVP를 만들었습니다.',
      'At a real-estate tax calculation platform, I built the company website, a tax comparison feature and the MVP of a tax refund app for young people.',
    ),
    question: k('세금 계산 서비스에서 "돌아간다"와 "맞다"는 어떻게 다를까?', 'In a tax calculator, how is "it runs" different from "it is right"?'),
    throughline: 6,
    scene: scene(
      ['CODEF·국토부 API가 느리고 제약이 많다', 'The CODEF and land ministry APIs are slow and full of constraints'],
      ['인증 세션 재사용·간격 조회·주간 캐시, 기다림이 보이는 진행 화면', 'Reuse the auth session, space out queries, cache by the week, and show the wait on a progress screen'],
    ),
    links: [{ label: k('서비스 suzijip.com', 'Live service: suzijip.com'), href: 'https://suzijip.com' }],
    sections: [
      section('overview', OVERVIEW, [
        [
          '수지하우스는 부동산 세금 계산 플랫폼입니다. 2026년 1월부터 CTO 직함으로 회사의 웹과 앱, 기술 전반을 맡았습니다.',
          'SuziHouse is a real-estate tax calculation platform. Since January 2026, with the title of CTO, I have been responsible for its web, app and technology as a whole.',
        ],
        [
          '맡은 일은 성격이 달라 나눠서 적습니다. 회사 웹과 세금 비교 기능은 직접 개발해 운영하고 있고, 청년 세금 환급 앱은 모바일·백엔드 MVP까지 만들었지만 아직 출시 전입니다.',
          'The work comes in different kinds, so I describe it separately. I built and run the company website and the tax comparison feature myself; the tax refund app for young people reached a mobile and backend MVP but has not been released yet.',
        ],
      ]),
      section('problem', PROBLEM, [
        [
          '세무를 잘 모르는 사람이 쓰는 서비스라, 계산 결과 하나가 큰 결정을 바꿉니다. 화면이 잘 뜨는 것만으로는 부족했고, 숫자가 맞아야 했습니다.',
          'The service is used by people who know little about tax, so a single calculated number can change a big decision. A screen that loads well was not enough; the numbers had to be right.',
        ],
        [
          '외부 API도 마음대로 되지 않았습니다. 홈택스 자료를 가져오는 CODEF 간편인증은 사용자가 휴대폰 인증 앱에서 승인할 때까지 기다려야 하고, 연도별 조회는 하나씩 간격을 두고 보내야 하며, 같은 요청이 겹치면 오류가 납니다. 국토교통부 실거래가 API는 응답이 느렸습니다.',
          "The external APIs didn't make it easy either. CODEF simple authentication, which pulls records from Hometax, has to wait until the user approves it in an authentication app on their phone; yearly queries must be sent one at a time with gaps in between; and overlapping identical requests fail. The real-transaction price API of the Ministry of Land, Infrastructure and Transport was slow to respond.",
        ],
      ]),
      section('decision', DECISION, [
        [
          'Python으로 된 세금 계산 엔진을 웹에서 바로 쓸 수 있도록 TypeScript로 옮겼습니다.',
          'I ported the tax calculation engine from Python to TypeScript so the website could use it directly.',
        ],
        [
          '앱은 Expo(React Native)와 FastAPI로 만들고, 계산과 외부 연동은 서버에 두었습니다.',
          'I built the app with Expo (React Native) and FastAPI, and kept the calculations and external integrations on the server.',
        ],
        [
          '기다림은 숨기지 않기로 했습니다. 인증과 조회가 오래 걸리는 동안 사용자가 "멈췄다"고 느끼지 않도록, 지금 무엇을 하는 중인지 보여 주는 화면을 먼저 설계했습니다.',
          'I decided not to hide the wait. So that users would not feel the app had "frozen" while authentication and queries took their time, I first designed a screen that shows what is happening right now.',
        ],
      ]),
      section(
        'implementation',
        ['회사 웹 · 세금 비교 — 직접 개발', 'Company website · tax comparison (built by me)'],
        [
          [
            'Next.js·TypeScript로 회사 웹을 만들어 운영합니다. 국토교통부 실거래가 조회 API는 응답이 느려 12시간 단위로 다시 확인하고 월별 데이터를 동시에 불러오게 했고, 인증키(serviceKey)가 인코딩되면 요청이 실패해 URL을 직접 조립했습니다.',
            'I built and run the company website with Next.js and TypeScript. The land ministry real-transaction price API was slow, so the site re-checks it every 12 hours and loads monthly data in parallel; requests failed whenever the service key (serviceKey) got encoded, so I assemble the URL by hand.',
          ],
          [
            'TypeScript로 옮긴 세금 엔진으로 부동산 A·B를 양도·증여·부담부증여로 처분할 때의 세금을 중과 규칙 적용 전후로 비교하고, 결과를 PDF 리포트로 내려받게 했습니다.',
            'With the ported TypeScript tax engine, users compare the tax on disposing of properties A and B by sale, gift or gift with assumed debt, before and after the heavier-tax rules apply, and download the result as a PDF report.',
          ],
        ],
        {
          scenes: [
            scene(
              ['실거래가 API가 느리고, 인증키가 인코딩되면 요청이 실패한다', 'The real-transaction price API is slow, and requests fail when the service key gets encoded'],
              ['12시간 단위 재확인과 월별 동시 조회, URL 직접 조립', 'Re-check every 12 hours, load months in parallel, and assemble the URL by hand'],
            ),
          ],
        },
      ),
      section(
        'implementation',
        ['청년 세금 환급 앱 — 모바일·백엔드 MVP (미출시)', 'Tax refund app for young people: mobile and backend MVP (not released)'],
        [
          [
            'Expo·FastAPI로 간편인증 → 지급명세서 조회 → 환급액 계산 → 결제로 이어지는 흐름을 만들었습니다.',
            'With Expo and FastAPI, I built the flow from simple authentication → fetching payment statements → calculating the refund → payment.',
          ],
          [
            'CODEF 간편인증은 3초 간격으로 상태를 확인하고 270초가 지나면 만료로 처리합니다. 인증 상태는 대기·요청·확인 중·완료·실패·만료 여섯 가지를 하나의 타입으로 관리하고, 실패와 만료에는 다시 시도할 수 있게 했습니다.',
            'CODEF simple authentication checks the status every 3 seconds and treats it as expired after 270 seconds. Its six states (idle, requested, checking, done, failed, expired) are managed as a single type, and a failed or expired attempt can be retried.',
          ],
          [
            '인증 한 번으로 얻은 세션을 연도별 조회에 다시 쓰고, 조회는 3초 간격으로 하나씩 보냅니다. 같은 요청이 겹쳤다는 오류가 오면 5초, 10초를 기다렸다 다시 시도합니다. 기다리는 동안에는 연도별 진행 화면을 보여 주고, 마지막 두 단계는 실제 응답이 올 때까지 붙잡아 둡니다. 인증은 됐는데 자료가 없으면 3초 뒤 직접 입력으로 넘어갑니다. CODEF로 조회한 소득 자료는 서버 DB에 저장하지 않고 계산에만 쓰며, 시뮬레이션 결과는 사용자가 저장을 눌렀을 때만 남깁니다.',
            'The session from a single authentication is reused for every yearly query, and the queries go out one at a time, 3 seconds apart. If an error says identical requests overlapped, it waits 5 seconds, then 10, and tries again. Meanwhile a per-year progress screen is shown, and its last two steps hold until the real response arrives. If authentication succeeds but there are no records, it moves to manual entry after 3 seconds. Income records fetched through CODEF are not stored in the server database and are used only for the calculation; simulation results are kept only when the user taps save.',
          ],
          [
            '결제(토스페이먼츠)를 요청한 사람이 실제 의뢰의 주인인지, 금액과 이미 결제됐는지를 서버에서 다시 확인합니다. 사용자·세무사·관리자마다 다른 화면을 보여 주지만, 실제 권한 검사는 서버가 합니다. 실거래가는 서버에도 캐시를 두어 이번 달 자료는 7일, 지난 달 자료는 30일 동안 다시 씁니다.',
            "For payments (Toss Payments), the server re-checks that the person paying actually owns the request, the amount, and whether it has already been paid. Users, tax accountants and admins each see different screens, but the real permission checks happen on the server. Real-transaction prices are cached on the server too: this month's data is reused for 7 days and last month's for 30.",
          ],
        ],
        {
          scenes: [
            scene(
              [
                'CODEF 간편인증은 사용자가 승인할 때까지 기다려야 하고, 겹치는 요청은 오류가 난다',
                'CODEF simple authentication has to wait until the user approves, and overlapping requests fail',
              ],
              [
                '세션 재사용·3초 간격 순차 조회·5초→10초 재시도, 기다림이 보이는 연도별 진행 화면',
                'Reuse the session, query one by one 3 seconds apart, retry after 5 s → 10 s, and show the wait on a per-year progress screen',
              ],
            ),
          ],
        },
      ),
      section(
        'implementation',
        ['세무 SaaS FINZ — 기술 결정 · 개발 참여 · QA', 'FINZ tax SaaS: technical decisions · development · QA'],
        [
          [
            'FINZ는 세무사가 쓰는 세무 SaaS로, 협력 개발사와 함께 만들었습니다(출시 전). 저는 수지하우스 쪽 기술 PM으로 세금 계산 엔진의 초안을 만들고, 외부 API 연동과 배포·운영 방식, 개발 도구를 개발사와 함께 정하며 개발에 참여했습니다.',
            "FINZ is a tax SaaS for tax accountants, built together with a partner development company (not yet launched). As SuziHouse's technical PM, I drafted the tax calculation engine, decided the external API integrations, the deployment and operations approach and the development tools together with the vendor, and took part in development.",
          ],
          [
            '제가 만든 세목별 자산 분류를 기존 전문가용 프로그램의 화면 기준 개발 매핑표로 보완해, 무엇을 반드시 개발할지 정하는 근거로 썼습니다. 요금·체험 정책 사양서는 개발사가 사양 그대로 구현했습니다.',
            'I extended my own asset classification for each tax type into a development mapping table, based on the screens of an established professional program, and it became the basis for deciding what had to be built. The pricing and trial policy spec I wrote was implemented by the vendor exactly as specified.',
          ],
          [
            '배포가 실패했을 때는 코드 결함이 아니라 서버 메모리 부족이 원인임을 측정과 재현으로 확정했고, 개발사가 진단을 확인해 수정했습니다. 출시 운영환경 협의도 맡아 서버 구성을 전수 점검했습니다.',
            'When deployments failed, I established through measurement and reproduction that the cause was not a code defect but a lack of server memory; the vendor confirmed the diagnosis and fixed it. I also took on the discussions about the launch environment and audited the whole server setup.',
          ],
          [
            '개발사와 주고받은 이슈 원장 269건은 코드·테스트·화면 근거로 대조해 확인류 233건과 잔여 36건으로 판정해 관리했고(확인류가 모두 재현 테스트로 해결을 확인했다는 뜻은 아닙니다), 기준시가가 입력되지 않은 필지가 경고 없이 세액 계산에서 빠지는 High 등급 결함을 찾아 수정 요청에 반영했습니다.',
            'I checked the 269 items in the issue ledger with the vendor against the code, tests and screens, classifying 233 as confirmed-type and 36 as remaining ("confirmed-type" does not mean every item was shown to be fixed by a reproduction test), and found a High-severity defect where land parcels with no standard price entered were silently left out of the tax calculation, which went into a fix request.',
          ],
        ],
      ),
      section('validation', VALIDATION, [
        [
          '세금 비교는 화면 테스트(Vitest·Testing Library)와 별개로, 기준 워크북의 기대값과 API 응답을 대조하는 검증 스크립트로 계산을 확인했습니다. 화면이 잘 뜨는 것과 숫자가 맞는 것은 다른 테스트로 나눴습니다.',
          'Apart from the UI tests (Vitest, Testing Library), I checked the tax comparison with a validation script that compares API responses against the expected values in a reference workbook. Whether the screen renders and whether the numbers are right are covered by different tests.',
        ],
        [
          '환급 앱 백엔드는 보안 테스트 57개를 GitHub Actions에서 돌립니다. 정적 분석(Bandit) 결과는 리포트로 모으지만, 지금은 배포를 막지 않습니다.',
          'The refund app backend runs 57 security tests in GitHub Actions. Static analysis (Bandit) results are collected into a report, but for now they do not block deployment.',
        ],
      ]),
      section('result', RESULT, [
        [
          '회사 웹은 suzijip.com에서 운영 중이고, 청년 세금 환급 앱은 MVP까지 만들었지만 아직 출시하지 않았습니다.',
          'The company website is live at suzijip.com. The tax refund app for young people reached MVP but has not been released yet.',
        ],
        [
          '이 일을 하며 기능을 만드는 것과 그 결과가 맞는지 확인하는 것을 서로 다른 일로 다루게 됐습니다.',
          'This work taught me to treat building a feature and checking that its results are right as two separate jobs.',
        ],
      ]),
      section('retro', RETRO, [
        [
          '기준 워크북 대조에 경계값·반올림·잘못된 입력 사례를 처음부터 넣고, 기준 워크북 자체가 틀렸을 때 알아챌 방법도 함께 정하겠습니다.',
          'I would put boundary values, rounding and invalid-input cases into the workbook comparison from the start, and also decide how we would notice if the reference workbook itself were wrong.',
        ],
        [
          '결제 승인 뒤 저장이 실패하거나 같은 요청이 두 번 오는 것처럼 외부 시스템과 상태가 어긋나는 상황을, 실패를 일부러 일으켜 확인해 두겠습니다.',
          'I would deliberately cause failures to check the cases where our state drifts from an external system, such as saving failing after a payment is approved, or the same request arriving twice.',
        ],
        ['정적 분석이 실패하면 배포가 멈추도록 CI를 바꾸겠습니다.', 'I would change CI so that a failed static analysis stops deployment.'],
      ]),
      section('evidence', EVIDENCE, [
        [
          '회사 웹은 suzijip.com에서 볼 수 있습니다. 웹·앱·백엔드 코드는 회사 비공개 저장소에 있어 링크하지 않습니다.',
          "The company website can be seen at suzijip.com. The web, app and backend code is in the company's private repositories, so it is not linked.",
        ],
      ]),
    ],
  },
  {
    slug: 'closetmate',
    name: 'ClosetMate',
    years: [2026],
    tier: 'featured',
    period: '2026.03–2026.06',
    team: k('개인 프로젝트 · 딥러닝 기초 수업', 'Solo project · intro to deep learning course'),
    role: k('기획 · 모델 학습 · 모바일·API 개발', 'Planning · model training · mobile and API development'),
    status: k('수업 프로젝트 (미출시)', 'Course project (not released)'),
    stack: ['Expo', 'Next.js', 'PostgreSQL', 'Drizzle', 'ONNX Runtime', 'PyTorch', 'OpenAI API'],
    summary: k(
      '옷 사진으로 옷장을 만들고, 가진 옷으로 코디를 추천하는 앱',
      'An app that builds your wardrobe from photos of your clothes and suggests outfits from what you own',
    ),
    question: k(
      'LLM이 옷장에 없는 옷을 추천하면 어디에서 막아야 할까?',
      "If an LLM recommends clothes that aren't in the wardrobe, where should that be stopped?",
    ),
    throughline: 5,
    scene: scene(
      [
        'LLM이 옷장에 없는 옷을 추천할 수 있다 / Expo Go가 기기 모델을 못 돌린다',
        "The LLM can recommend clothes that aren't in the wardrobe / Expo Go can't run a model inside the phone",
      ],
      [
        '옷 ID·후보 조합을 서버에서 대조, 실패 시 보조 모델 후 재검증 / 분류는 서버 ONNX로',
        'Check clothing IDs and candidate outfits on the server, and on failure re-check with a backup model / classify on the server with ONNX',
      ],
    ),
    sections: [
      section('overview', OVERVIEW, [
        [
          '옷 사진을 올리면 종류를 분류해 옷장에 넣고, 가진 옷으로 코디를 추천하는 모바일 앱입니다. 딥러닝 기초 수업에서 혼자 기획하고, 모델 학습부터 앱과 API까지 만들었습니다.',
          'A mobile app that classifies a photo of a garment, adds it to your wardrobe and suggests outfits from the clothes you own. I planned it alone for an intro to deep learning course and built everything from model training to the app and API.',
        ],
      ]),
      section('problem', PROBLEM, [
        [
          'LLM에게 코디를 맡기면 그럴듯하지만 틀린 답이 나옵니다. 옷장에 없는 옷의 ID를 만들어 내거나, 처음부터 만들 수 없는 조합을 고르기도 합니다. 이런 답을 그대로 보여 주거나 저장하면 옷장 데이터가 틀어질 수 있습니다.',
          "Left to an LLM, outfit suggestions come out plausible but wrong. It can invent IDs for clothes that aren't in the wardrobe, or pick combinations that could never be put together. Showing or saving such answers as they are could corrupt the wardrobe data.",
        ],
        [
          '또 Expo Go에서는 기기 안에서 분류 모델(TFLite)을 불러올 수 없었습니다.',
          "On top of that, Expo Go couldn't load the classification model (TFLite) inside the phone.",
        ],
      ]),
      section('decision', DECISION, [
        [
          'LLM이 처음부터 답을 만들게 하지 않고, 규칙으로 만든 후보 코디 중에서 고르게 했습니다. 그리고 LLM의 응답을 믿지 않고 서버에서 다시 확인하는 층을 두었습니다.',
          "Instead of letting the LLM write an answer from scratch, I had it choose from candidate outfits generated by rules. And rather than trust the LLM's response, I added a layer on the server that checks it again.",
        ],
        [
          '분류는 서버에서 ONNX로 돌리기로 했습니다. 기기 안에서 돌리는 경로는 이번 구조에서 완성하지 않았습니다.',
          'I decided to run classification on the server with ONNX. The path that runs it inside the phone was not finished in this design.',
        ],
        ['돈이 드는 Vision 호출은 사용자가 직접 누를 때만 하게 했습니다.', 'Paid Vision calls happen only when the user taps for one.'],
      ]),
      section(
        'implementation',
        IMPLEMENTATION,
        [
          [
            'LLM 응답을 받으면 ① 응답 형식 → ② 추천한 옷 ID가 실제 옷장에 있는지 → ③ 그 조합이 미리 만든 후보에 있는지를 차례로 확인합니다. 하나라도 어긋나면 보조 모델에게 다시 받아 같은 검사를 다시 거치고, 어떤 모델이 답했는지와 보조 모델로 넘어갔는지를 저장합니다.',
            'When the LLM responds, the server checks in order: ① the response format → ② whether the recommended clothing IDs actually exist in the wardrobe → ③ whether that combination is among the prepared candidates. If anything is off, it gets a new answer from the backup model and runs the same checks again, and it records which model answered and whether it fell back.',
          ],
          [
            '분류 모델은 MobileNetV3와 ResNet50을 고정된 백본 위에 분류기를 얹는 방식으로 학습해 비교했습니다.',
            'For classification, I trained MobileNetV3 and ResNet50, each with a classifier on top of a frozen backbone, and compared them.',
          ],
        ],
        {
          scenes: [
            scene(
              [
                'LLM이 옷장에 없는 옷 ID나 후보 밖 조합을 낼 수 있다',
                'The LLM can return clothing IDs not in the wardrobe, or combinations outside the candidates',
              ],
              [
                '형식 → 옷 ID → 후보 조합 순서로 서버에서 대조, 어긋나면 보조 모델로 다시 받아 재검증',
                'Check on the server in the order format → clothing IDs → candidate combination; on a mismatch, ask the backup model and check again',
              ],
            ),
            scene(
              ['Expo Go에서 기기용 분류 모델을 불러올 수 없다', "Expo Go can't load a classification model built for the phone"],
              ['분류는 서버 ONNX 추론으로', 'Classify with ONNX inference on the server'],
            ),
          ],
        },
      ),
      section('validation', VALIDATION, [
        [
          '테스트용 이미지 43장으로 사진 업로드부터 추천까지 실제 흐름을 돌려 봤습니다.',
          'I ran the real flow, from photo upload to recommendation, with 43 test images.',
        ],
        [
          'CPU 벤치마크에서는 파일 크기가 15분의 1인 MobileNetV3가 오히려 ResNet50보다 느렸고(평균 30.83ms 대 20.45ms), 이 결과를 그대로 문서에 남기고 이유를 정리했습니다.',
          'In a CPU benchmark, MobileNetV3, at one fifteenth of the file size, was actually slower than ResNet50 (30.83 ms vs 20.45 ms on average); I left that result in the docs as it was and wrote down why.',
        ],
      ]),
      section('result', RESULT, [
        [
          '사진 → 분류 → 옷장 → 후보 생성 → LLM 추천 → 검증으로 이어지는 흐름이 동작합니다. 형식이 틀렸거나 옷장에 없는 옷을 담은 응답은 사용자에게 가기 전에 걸러집니다.',
          'The flow from photo → classification → wardrobe → candidate generation → LLM recommendation → validation works. Responses with the wrong format, or with clothes that are not in the wardrobe, are filtered out before they reach the user.',
        ],
      ]),
      section('retro', RETRO, [
        [
          '모델이 스스로 매긴 확신도로 결과를 거르는 부분과, API 호출 자체가 실패하면 보조 모델로 넘어가지 않는 부분을 고치겠습니다.',
          "I would fix the part that filters results by the model's own self-rated confidence, and the part where a failed API call doesn't fall back to the backup model.",
        ],
        [
          '서버가 받은 URL을 그대로 불러오는 부분과 x-user-id 헤더만으로 사용자를 구분하는 부분은, 공개 서비스라면 가장 먼저 막아야 할 곳입니다.',
          'The server fetching whatever URL it receives, and telling users apart by the x-user-id header alone, are the first things to close off for a public service.',
        ],
        [
          '학습 코드에서 검증용 변환이 적용되지 않았습니다. 평가를 분리하고 고정된 테스트 세트로 다시 재기 전까지는 분류 성능 숫자를 쓰지 않습니다.',
          "The training code never applied the validation transforms. Until I separate evaluation and measure again on a fixed test set, I don't report classification performance numbers.",
        ],
      ]),
      section('evidence', EVIDENCE, [['코드는 비공개 저장소에 있어 링크하지 않습니다.', 'The code is in a private repository, so it is not linked.']]),
    ],
  },
  {
    slug: 'skillpilot',
    name: 'SkillPilot',
    years: [2025],
    tier: 'featured',
    period: '2025.09–2026.06',
    team: k('4인 캡스톤', '4-person capstone'),
    role: k('팀장 · 백엔드 전체 · 프론트엔드 일부', 'Team lead · the entire backend · part of the frontend'),
    status: k('캡스톤 완료', 'Capstone completed'),
    stack: ['React', 'Vite', 'Express 5', 'MySQL', 'Sequelize', 'MongoDB', 'node-cron', 'OpenAI API'],
    summary: k('IT 취업준비생을 위한 자격증·커리어 플랫폼', 'A certification and career platform for people preparing for IT jobs'),
    question: k(
      '구조가 다른 공공 API 7종을 어떻게 하나의 자격증 데이터로 묶을까?',
      'How do you merge 7 public APIs with different structures into one set of certification data?',
    ),
    throughline: 3,
    scene: scene(
      ['공공 API가 HTTP 200으로 에러 문자열을 보내거나 JSON 대신 XML을 준다', 'Public APIs send error strings with HTTP 200, or return XML instead of JSON'],
      ['에러 문구 감지 → XML로 다시 해석 → 간격 두고 재시도', 'Detect the error text → re-parse as XML → retry after a delay'],
    ),
    evidence: 'certificationSync.service.js · integrations/dataGoKr/client.js',
    image: '/images/projects/skillpilot.png',
    links: [
      {
        label: k('GitHub · Hanshin-OSS-Hub/capstone25-skillpilot', 'GitHub · Hanshin-OSS-Hub/capstone25-skillpilot'),
        href: 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot',
      },
    ],
    sections: [
      section('overview', OVERVIEW, [
        [
          '자격증 추천, 주간 학습 로드맵, 모의시험, 모의 면접, 직무별 부족 역량 분석까지 IT 취업 준비를 한곳에서 돕는 플랫폼입니다. 4인 캡스톤에서 팀장을 맡았고, 백엔드는 처음부터 끝까지 제가 만들었습니다.',
          'A platform that supports IT job preparation in one place: certification recommendations, weekly study roadmaps, mock exams, mock interviews and an analysis of missing skills for each job role. I led the 4-person capstone team and built the backend from start to finish.',
        ],
      ]),
      section('problem', PROBLEM, [
        [
          '자격증 정보는 공공데이터 API 7곳에 흩어져 있었고, 응답 구조가 제각각이었습니다.',
          'Certification data was scattered across 7 public data APIs, each with its own response structure.',
        ],
        [
          '게다가 이 API들은 실패해도 HTTP 200으로 "SERVICE ERROR" 문자열을 보내거나, JSON을 요청했는데 XML을 돌려주기도 했습니다. 상태 코드만 보고 성공으로 처리하면 틀린 데이터가 그대로 들어옵니다.',
          'On top of that, when these APIs failed they sometimes sent a "SERVICE ERROR" string with HTTP 200, or returned XML when JSON had been requested. Treating a call as successful by its status code alone lets wrong data straight in.',
        ],
        [
          'AI 추천과 로드맵은 요청마다 OpenAI를 부르면 느리고 비용도 듭니다.',
          'Calling OpenAI on every request for AI recommendations and roadmaps is slow and costs money.',
        ],
      ]),
      section('decision', DECISION, [
        [
          '외부 응답을 그대로 쓰지 않고, 먼저 내부 구조로 정규화한 뒤 자격증 코드로 상세·통계·시험 일정을 결합하기로 했습니다.',
          'Rather than use external responses as they came, I chose to first normalize them into an internal structure, then join details, statistics and exam schedules by certification code.',
        ],
        [
          '정형 데이터는 MySQL에, AI가 만든 결과는 MongoDB에 두고, 같은 사용자의 같은 조건 요청이면 저장된 결과를 다시 쓰기로 했습니다.',
          'Structured data went into MySQL and AI-generated results into MongoDB, and a request from the same user with the same conditions reuses the stored result.',
        ],
      ]),
      section(
        'implementation',
        IMPLEMENTATION,
        [
          [
            '7개 엔드포인트마다 정규화 함수를 두었습니다. 응답 본문에 에러 문구가 있으면 실패로 보고, XML로 다시 해석한 뒤 간격을 두고 재시도합니다. IT와 관련 없는 자격증은 키워드 필터로 걸러 냅니다.',
            'Each of the 7 endpoints has its own normalization function. If the response body contains error text, the call is treated as a failure, re-parsed as XML and retried after a delay. Certifications unrelated to IT are filtered out by keyword.',
          ],
          [
            '동기화는 node-cron으로 주기적으로 돌고, 관리자가 직접 실행할 수도 있습니다. API 키가 없으면 스케줄러가 건너뛰고, 엔드포인트별 키가 없으면 기본 키를 씁니다.',
            'Syncing runs periodically with node-cron, and an admin can also start it by hand. Without an API key the scheduler skips the run, and an endpoint with no key of its own uses the default key.',
          ],
          [
            '새 OpenAI 모델이 토큰 제한 파라미터 하나를 거부해 400 오류가 나면, 다른 파라미터로 바꿔 다시 요청하게 했습니다.',
            'When a newer OpenAI model rejects one token-limit parameter with a 400 error, the request is sent again with a different parameter.',
          ],
        ],
        {
          scenes: [
            scene(
              ['공공 API가 HTTP 200으로 에러 문자열을 보내거나 JSON 대신 XML을 준다', 'Public APIs send error strings with HTTP 200, or return XML instead of JSON'],
              ['에러 문구 감지 → XML로 다시 해석 → 간격 두고 재시도', 'Detect the error text → re-parse as XML → retry after a delay'],
            ),
          ],
        },
      ),
      section('validation', VALIDATION, [
        [
          '저장소에 자동 테스트는 없습니다. 대신 동기화를 바로 다시 실행할 수 있는 관리자 경로를 두어, 필요할 때 실제 응답을 다시 받아 볼 수 있게 했습니다.',
          'The repository has no automated tests. Instead, I added an admin route that re-runs the sync on the spot, so the real responses can be fetched again whenever needed.',
        ],
      ]),
      section('result', RESULT, [
        [
          '자격증 데이터 동기화와 AI 추천·로드맵, 모의시험과 모의 면접까지 동작하는 플랫폼으로 캡스톤을 마쳤고, 최종 발표를 맡았습니다.',
          'We finished the capstone with a working platform, from certification data syncing to AI recommendations and roadmaps, mock exams and mock interviews, and I gave the final presentation.',
        ],
      ]),
      section('retro', RETRO, [
        [
          '저장된 AI 결과를 다시 쓸 때 입력 JSON 문자열을 그대로 키로 써서, 필드 순서만 달라도 놓칩니다. 키를 정규화하고 모델·프롬프트 버전과 만료 시간을 함께 넣겠습니다.',
          'Stored AI results are looked up with the raw input JSON string as the key, so a different field order alone causes a miss. I would normalize the key and add the model and prompt version and an expiry time to it.',
        ],
        [
          'MySQL과 MongoDB를 함께 쓴 선택이 꼭 필요했는지, 하나로 줄였을 때의 비용과 비교해 보겠습니다.',
          'I would weigh whether using both MySQL and MongoDB was really necessary against the cost of cutting it down to one.',
        ],
        ['무엇보다 테스트부터 만들겠습니다.', 'Above all, I would start with tests.'],
      ]),
      section('evidence', EVIDENCE, [
        [
          '공개 저장소 Hanshin-OSS-Hub/capstone25-skillpilot에서 정규화(integrations/dataGoKr), 동기화(certificationSync.service.js), AI 결과 재사용(ai.service.js) 코드를 볼 수 있습니다.',
          'The public repository Hanshin-OSS-Hub/capstone25-skillpilot has the code for normalization (integrations/dataGoKr), syncing (certificationSync.service.js) and reusing AI results (ai.service.js).',
        ],
      ]),
    ],
  },
  {
    slug: 'pitches',
    name: 'Pitches',
    years: [2024, 2026],
    tier: 'featured',
    period: '2024.10–2026.05',
    team: k(
      '2024 해커톤 5인 팀 → 2025 2인으로 발전 → 2026 혼자 리뉴얼',
      '2024 hackathon team of 5 → developed further by 2 in 2025 → renewed solo in 2026',
    ),
    role: k('백엔드·AI (앱 UI는 팀원) · 2026 리뉴얼은 전체', 'Backend and AI (app UI by a teammate) · all of the 2026 renewal'),
    status: k('2024–25 대회·논문 · 2026 리뉴얼 진행 중', '2024–25 competitions and paper · 2026 renewal in progress'),
    stack: ['Flask', 'SenseVoice-Small', 'FunASR', 'OpenAI Assistants', 'Fastify', 'Socket.IO', 'BullMQ', 'Whisper', 'Expo'],
    summary: k(
      '발표하는 동안 말 속도와 감정을 분석해 알려 주는 코칭 서비스',
      'A coaching service that analyzes your speaking pace and emotion while you present, and lets you know',
    ),
    question: k(
      '즉각적인 피드백과 무거운 AI 분석을 같은 요청에서 처리해야 할까?',
      'Should instant feedback and heavy AI analysis be handled in the same request?',
    ),
    throughline: 2,
    scene: scene(
      ['실시간 피드백에 Whisper는 너무 느리다(10초 음성에 0.5~1.3초)', 'Whisper is too slow for real-time feedback (0.5–1.3 s for 10 s of audio)'],
      [
        '10초를 70ms에 처리하는 SenseVoice-Small을 고르고, LLM은 실시간 경로에서 빼서 발표 후 한 번만 → 무거운 분석은 요청 밖으로, 2026년엔 큐·재시도로 다시 설계',
        'Pick SenseVoice-Small, which handles 10 s in 70 ms, and take the LLM off the live path to run once after the talk → heavy analysis moves out of the request; redesigned in 2026 with a queue and retries',
      ],
    ),
    image: '/images/projects/pitches.png',
    imageCaption: k('2024년 대회 제출 당시의 화면 디자인 목업', 'Screen design mockup from the 2024 competition submission'),
    sections: [
      section('overview', OVERVIEW, [
        [
          'Pitches는 발표 중에 말 속도·감정·톤을 분석해 색으로 알려 주고, 발표가 끝나면 AI 코칭 보고서를 만들어 주는 서비스입니다.',
          'Pitches analyzes your speaking pace, emotion and tone while you present and shows them as colors, then writes an AI coaching report when you finish.',
        ],
        [
          '2024년 해커톤에서 5인 팀으로 시작했고, 저는 백엔드와 AI를 맡았습니다(앱 UI는 팀원이 Flutter로 만들었습니다). 이후 둘이 발전시켜 창업 경진대회와 논문으로 이어 갔고, 2026년에는 같은 문제를 혼자 처음부터 다시 설계해 리뉴얼했습니다.',
          'It began at a 2024 hackathon with a team of five, where I handled the backend and AI (a teammate built the app UI in Flutter). Two of us then developed it further into a startup competition entry and a paper, and in 2026 I took the same problem and redesigned it from scratch on my own.',
        ],
      ]),
      section('problem', PROBLEM, [
        [
          '발표 중 피드백은 바로 와야 하는데, 음성을 글로 바꾸고 감정을 분석하고 LLM으로 조언을 만드는 일은 모두 무겁습니다. 이걸 한 요청 안에서 처리하면 화면이 멈추고, 실시간이라는 말이 무색해집니다.',
          'Feedback during a talk has to arrive right away, but turning speech into text, analyzing emotion and writing advice with an LLM are all heavy. Doing them inside one request freezes the screen and makes "real-time" meaningless.',
        ],
        [
          'Whisper 계열 모델은 10초 음성을 처리하는 데 0.5~1.3초가 걸려 실시간 피드백에 쓰기 어려웠습니다.',
          'Whisper-family models took 0.5–1.3 seconds to process 10 seconds of audio, which made them hard to use for real-time feedback.',
        ],
      ]),
      section('decision', DECISION, [
        [
          '속도로 모델을 골랐습니다. 10초 음성을 70ms에 처리하는 SenseVoice-Small을 골랐고, 이 모델은 결과에 감정 태그를 함께 붙여 주어 모델 하나로 글자와 감정을 같이 얻을 수 있었습니다.',
          'I chose the model by speed. SenseVoice-Small processes 10 seconds of audio in 70 ms, and it attaches emotion tags to its output, so one model gave me both the text and the emotion.',
        ],
        [
          'LLM은 실시간 경로에서 뺐습니다. 코칭 보고서는 발표가 끝난 뒤 한 번만 만들어, 실시간 화면을 막지 않고 비용도 줄였습니다.',
          'I took the LLM off the real-time path. The coaching report is generated once, after the talk, so it never blocks the live screen, and it costs less.',
        ],
      ]),
      section(
        'implementation',
        ['2024–25 — 팀 버전 (백엔드·AI)', '2024–25: the team version (backend and AI)'],
        [
          [
            'Flask 서버가 녹음 파일을 받아 wav로 바꾼 뒤, 분석은 백그라운드 스레드로 넘깁니다. 스레드는 음성을 5초씩 잘라 SenseVoice로 분석하고, 구간마다 말 속도(분당 단어 수)와 감정, 받아쓴 문장을 JSON으로 저장합니다.',
            'A Flask server receives the recording, converts it to WAV and hands the analysis to a background thread. The thread cuts the audio into 5-second pieces, analyzes each with SenseVoice, and saves the speaking rate (words per minute), emotion and transcript of each piece as JSON.',
          ],
          [
            '앱은 결과를 다시 물어보고, 아직 분석 중이면 "processing"을 받습니다. 발표가 끝나면 받아쓴 내용과 감정 데이터를 OpenAI Assistants에 넘겨 코칭 보고서를 받습니다.',
            'The app asks again for the result and gets "processing" while the analysis is still running. When the talk is over, the transcript and emotion data go to OpenAI Assistants, which returns the coaching report.',
          ],
        ],
        {
          scenes: [
            scene(
              ['음성 분석이 오래 걸려 요청이 묶인다', 'Speech analysis takes long and ties up the request'],
              [
                '분석은 백그라운드 스레드로 넘기고, 앱은 상태를 다시 물어보게(processing → 결과)',
                'Hand the analysis to a background thread and have the app ask again for the status (processing → result)',
              ],
            ),
          ],
        },
      ),
      section(
        'implementation',
        ['2026 — 혼자 리뉴얼한 버전', '2026: my solo renewal'],
        [
          [
            'Expo 앱이 약 0.25초 조각으로 소리를 Socket.IO로 보내고, 서버는 조각을 5초 단위로 모아 실시간으로는 음량만 분석해 색으로 보여 줍니다.',
            'The Expo app sends audio over Socket.IO in pieces of about 0.25 seconds; the server gathers them into 5-second blocks and, in real time, analyzes only the volume and shows it as color.',
          ],
          [
            '발표가 끝나면 받아쓰기(Whisper)·말 속도·간투사·LLM 보고서·PDF 생성을 BullMQ 작업으로 넘깁니다. 처음 시도를 포함해 최대 2번 시도하고, 실패하면 간격을 늘려 다시 시도하며, 동시에 2개까지 처리합니다.',
            'After the talk, transcription (Whisper), speaking rate, filler words, the LLM report and PDF generation are handed off as BullMQ jobs. Each job gets at most 2 attempts including the first, retries with a growing delay when it fails, and up to 2 jobs run at the same time.',
          ],
          [
            'Whisper가 날것의 음성 데이터를 받지 않아 WAV 헤더를 직접 만들어 붙였고, iOS에서 녹음이 시작되지 않던 오류는 오디오 세션을 켜는 순서를 바꿔 해결했습니다.',
            "Whisper wouldn't take raw audio data, so I built the WAV header myself and attached it; a bug where recording wouldn't start on iOS was fixed by changing the order in which the audio session is turned on.",
          ],
        ],
        {
          scenes: [
            scene(
              [
                '앱은 0.25초 조각으로 보내는데 분석에는 5초가 필요하다 / Whisper는 날것의 음성을 받지 않는다',
                "The app sends 0.25 s pieces but analysis needs 5 s / Whisper won't take raw audio",
              ],
              [
                '서버에 세션별 버퍼를 두고 5초씩 모으기 / WAV 헤더를 직접 만들어 붙이기',
                'A per-session buffer on the server that collects 5 s at a time / build and attach the WAV header by hand',
              ],
            ),
          ],
        },
      ),
      section('validation', VALIDATION, [
        [
          '팀 버전은 해커톤과 창업 경진대회에서 시연했고, 측정 결과는 아래 논문에 정리했습니다.',
          'The team version was demonstrated at the hackathon and the startup competition, and its measurements are written up in the paper below.',
        ],
        [
          '2026년 버전은 iOS 시뮬레이터 빌드까지 확인했고, 자동 테스트는 아직 없습니다.',
          'The 2026 version has been checked as far as an iOS simulator build; it has no automated tests yet.',
        ],
      ]),
      section('result', RESULT, [
        [
          '5인 팀으로 만든 해커톤 버전이 캡스톤 디자인 및 AI 해커톤 대상(2024.10)을 받았고, 발전시킨 버전으로 SW중심대학 AI 창업 아이디어 경진대회 특별상(2025.05)을 받고 APIC-IST 2025에서 논문을 발표했습니다.',
          'The hackathon version built by the team of five won the grand prize at the Capstone Design & AI Hackathon (Oct 2024); the developed version won a special award at the SW-Centered University AI Startup Idea Competition (May 2025) and was presented as a paper at APIC-IST 2025.',
        ],
        [
          '2026년 리뉴얼은 실시간 음량 피드백과 발표 후 보고서 작업이 분리되어 동작하지만, 보고서를 앱에서 보여 주는 화면은 아직 만들지 못했습니다.',
          "In the 2026 renewal, live volume feedback and the post-talk report jobs run separately, but I haven't yet built the screen that shows the report in the app.",
        ],
      ]),
      section('paper', ['논문 — APIC-IST 2025', 'Paper: APIC-IST 2025'], [
        [
          '아래는 논문에서 제안하고 보고한 내용입니다. 위의 코드 설명과 구분해 적습니다.',
          'What follows is what the paper proposed and reported, kept apart from the description of the code above.',
        ],
        [
          '"Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI" — APIC-IST 2025, 공동저자(2저자).',
          '"Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI": APIC-IST 2025, co-author (second author).',
        ],
        [
          '모델 선택: 10초 음성 처리 시간이 Whisper-Small 518ms, Whisper-Large-V3 1,281ms인 데 비해 SenseVoice-Small은 70ms로, Whisper-Large보다 15배 이상 빠릅니다(SenseVoice 공개 벤치마크 인용).',
          "Model choice: processing 10 seconds of audio takes 518 ms with Whisper-Small and 1,281 ms with Whisper-Large-V3, against 70 ms with SenseVoice-Small, more than 15 times faster than Whisper-Large (citing SenseVoice's public benchmark).",
        ],
        [
          '구조: 실시간 피드백 루프(SenseVoice → WebSocket → 색상 표시), 받아쓰기 루프, 발표 후 보고서 루프(GPT-4o-mini, 세션당 1회 호출)로 나눴습니다.',
          'Architecture: split into a real-time feedback loop (SenseVoice → WebSocket → color display), a transcription loop and a post-talk report loop (GPT-4o-mini, one call per session).',
        ],
        [
          '측정: 말에서 화면 표시까지 평균 125ms(σ=18ms), 동시 20세션에서도 최악 170ms였습니다. 다국어 시험(5명, 영어 3·한국어 2)과 사용자 설문(5명)을 함께 보고했습니다.',
          'Measurements: 125 ms on average from speech to on-screen display (σ = 18 ms), and 170 ms at worst even with 20 concurrent sessions. The paper also reported a multilingual test (5 people: 3 in English, 2 in Korean) and a user survey (5 people).',
        ],
      ]),
      section('retro', RETRO, [
        [
          '2026년 버전은 재시도할 때 받아쓰기와 LLM을 처음부터 다시 부르므로, 같은 세션이 두 번 처리되면 비용이 겹칠 수 있습니다. 작업 단계마다 상태를 남겨 이미 끝난 단계는 건너뛰게 하겠습니다.',
          'On a retry, the 2026 version calls transcription and the LLM again from the start, so if the same session is processed twice, the cost can double. I would record the state of each job step so finished steps are skipped.',
        ],
        [
          '보고서를 앱에서 보여 주는 화면과, 시간 초과·워커 중단 같은 실패를 일부러 일으켜 보는 테스트부터 채우겠습니다.',
          'I would start by adding the screen that shows the report in the app, and tests that deliberately cause failures such as timeouts and a worker going down.',
        ],
        [
          '2024년 버전의 말 속도는 띄어쓰기 단위로 세어서 한국어에서는 정확하지 않습니다.',
          "The 2024 version counts speaking rate by spaces between words, so it isn't exact for Korean.",
        ],
      ]),
      section('evidence', EVIDENCE, [
        [
          '2024·2026 코드 모두 비공개 저장소에 있어 링크하지 않습니다. 논문은 APIC-IST 2025 발표 논문입니다.',
          'Both the 2024 and the 2026 code are in private repositories, so they are not linked. The paper was presented at APIC-IST 2025.',
        ],
      ]),
    ],
  },

  // ── cards ─────────────────────────────────────────────────────────────────
  {
    slug: 'media-pulse',
    name: 'Media Pulse',
    years: [2023],
    tier: 'card',
    period: '2023.03–2023.10',
    role: k('첫 웹 프로젝트', 'My first web project'),
    stack: ['Node.js', 'Express', 'MongoDB', 'Plotly.js', 'Naver API'],
    summary: k(
      '네이버 검색 데이터를 모아 키워드 트렌드를 차트로 보여 주는 웹 서비스. 프론트엔드와 백엔드, API를 처음 배운 프로젝트입니다.',
      'A web service that collects Naver search data and charts keyword trends. The project where I first learned frontend, backend and APIs.',
    ),
    throughline: 1,
    scene: scene(
      ['검색어 트렌드 API가 비율(%)만 준다', 'The search trend API only gives ratios (%)'],
      [
        '광고 API의 실제 월간 검색 수를 기준점으로 엮어 월별 실제 검색량을 복원',
        "Use the ad API's real monthly search counts as an anchor to recover the actual search volume for each month",
      ],
    ),
    image: '/images/projects/media-pulse.png',
  },
  {
    slug: 'label-light',
    name: 'Label Light',
    years: [2024],
    tier: 'card',
    period: '2024.04–2024.11',
    team: k('팀 프로젝트 · 1저자 논문', 'Team project · first-author paper'),
    role: k('기획 · 백엔드', 'Planning · backend'),
    stack: ['Express', 'OpenAI Assistants', 'Whisper', 'Google TTS'],
    summary: k(
      '시니어가 일상 대화를 나누는 동안 우울 척도(GDS)에 맞춰 상태를 살피는 음성 챗봇. 2024 한신 AISW 페스티벌 일반부 특별상, 2025 한국디지털콘텐츠학회 하계 1저자 논문.',
      'A voice chatbot that checks on seniors against the Geriatric Depression Scale (GDS) while they chat about everyday things. Special Award at the 2024 Hanshin AISW Festival; first-author paper at the 2025 Korea Digital Contents Society summer conference.',
    ),
    scene: scene(
      ['GDS 30문항을 그대로 물으면 어르신이 지친다', 'Asking the 30 GDS questions as they are wears older users out'],
      [
        '문항을 일상 대화 속에서 끌어내는 방식으로 바꾸고, 대화 맥락은 Assistants 스레드로 이어 가기',
        'Draw the questions out through everyday conversation instead, and carry the context forward in an Assistants thread',
      ],
    ),
    image: '/images/projects/label-light.png',
  },
  {
    slug: 'wildfire',
    name: '산불 예측',
    nameEn: 'Wildfire Risk Model',
    years: [2025],
    tier: 'card',
    period: '2025',
    team: k('3인 · 통계청 논문 공모전', 'Team of 3 · Statistics Korea paper contest'),
    stack: ['Python', 'pandas', 'LightGBM', 'Prophet'],
    summary: k(
      '동해안 10개 시·군의 2022–2024년 시간 단위 데이터 21만여 행에 날씨·공식 산불위험지수·관광객 수·공휴일과 축제를 엮어, 사람이 만드는 위험까지 보려 한 다요인 산불 위험 모델입니다. 하루 단위로만 있던 방문객 수는 지역 유형별 곡선으로 시간대에 나눴습니다.',
      'A multi-factor wildfire risk model that tries to see human-made risk as well, joining over 210,000 hourly rows (2022–2024) for 10 cities and counties on the east coast with weather, the official wildfire risk index, tourist numbers, holidays and festivals. Visitor counts, which existed only per day, were spread across the hours with a curve for each type of area.',
    ),
    throughline: 4,
    scene: scene(
      ['실제 화재가 너무 드물어 직접 예측이 불가능', 'Actual fires are too rare to predict directly'],
      [
        '목표를 공식 위험 등급으로 바꾸고, 실제 화재일에 맞는지 따로 확인',
        'Change the target to the official risk level, and check separately whether it lines up with actual fire days',
      ],
    ),
  },
  {
    slug: 'edumatrix',
    name: 'EduMatrix',
    years: [2025],
    tier: 'card',
    period: '2025.03–2025.12',
    team: k('4인 · 캡스톤', 'Team of 4 · capstone'),
    stack: ['React', 'Express', 'MySQL', 'MongoDB', 'OpenAI Assistants'],
    summary: k(
      '수준 진단 퀴즈로 시작해 학습 달력, 주간·분야별 퀴즈와 리포트로 이어지는 학습 플랫폼. 한국디지털콘텐츠학회 논문 2편(하계·추계).',
      'A learning platform that starts with a placement quiz and moves on to a study calendar, weekly and per-topic quizzes, and reports. Two papers at the Korea Digital Contents Society (summer and fall).',
    ),
    scene: scene(
      ['AI 호출이 느려 버튼을 여러 번 누르면 같은 요청이 겹친다', 'AI calls are slow, so pressing the button again and again stacks up identical requests'],
      [
        '앱에서 한 번 막고, 서버도 진행 중인 요청을 기억해 429로 돌려보내기',
        'Block it once in the app, and have the server also remember in-flight requests and send repeats back with 429',
      ],
    ),
    image: '/images/projects/edumatrix.png',
  },
  {
    slug: 'innoview',
    name: 'InnoView',
    years: [2025],
    tier: 'card',
    period: '2025.05–2025.08',
    team: k('팀 · 오픈소스 개발자 대회', 'Team · Open Source Developer Competition'),
    stack: ['React', 'Express', 'MySQL', 'Whisper', 'OpenAI Assistants', 'TensorFlow.js'],
    summary: k(
      '이력서와 직무에 맞춘 면접 질문을 만들고, 답변을 Whisper로 받아 적어 꼬리 질문을 이어 가는 모의 면접 서비스. 끝나면 AI가 쓴 리포트를 PDF로 받고, 웹캠으로 자세도 추적합니다.',
      'A mock-interview service that writes interview questions tailored to your résumé and role, transcribes your answers with Whisper and keeps going with follow-up questions. At the end you get an AI-written report as a PDF, and the webcam tracks your posture too.',
    ),
    scene: scene(
      [
        '브라우저는 WebM으로 녹음하는데 받아쓰기에는 다른 형식이 필요하다',
        'The browser records in WebM, but transcription needs a different format',
      ],
      ['서버에서 ffmpeg로 WAV로 바꿔 넘기기', 'Convert it to WAV with ffmpeg on the server before passing it on'],
    ),
    image: '/images/projects/innoview.png',
  },
  {
    slug: 'restplanner',
    name: 'RestPlanner',
    years: [2025],
    tier: 'card',
    period: '2025.09–2025.12',
    team: k('개인 · 논문', 'Solo · paper'),
    stack: ['Express', 'React', 'OpenAI API', 'Google Calendar API'],
    summary: k(
      'LLM이 일정을 제안하면 다른 LLM 역할이 휴식과 과부하 기준으로 검토하고(최대 2번), 사용자가 승인해야 Google 캘린더에 기록하는 일정 관리 서비스.',
      'A scheduling service where one LLM proposes a schedule, another LLM role reviews it against rest and overload criteria (up to twice), and nothing goes into Google Calendar until the user approves.',
    ),
    scene: scene(
      ['저장된 프롬프트가 JSON 대신 설명 문장을 자꾸 덧붙인다', 'The stored prompt keeps adding explanatory sentences instead of plain JSON'],
      [
        '마지막 JSON 생성 단계만 Chat Completions로 바꿔 형식을 고정',
        'Move only the final JSON-generation step to Chat Completions to pin the format down',
      ],
    ),
    image: '/images/projects/restplanner.png',
  },
  {
    slug: 'ai-hiring-textmining',
    name: '텍스트마이닝 연구',
    nameEn: 'AI-era Hiring Text Mining',
    years: [2026],
    tier: 'card',
    period: '2026.05–2026.06',
    team: k('4인 · 수업 논문', 'Team of 4 · course paper'),
    role: k('뉴스 담론 분석 · 국내외 비교 분석', 'News discourse analysis · Korea vs. global comparison'),
    stack: ['Python', 'KoNLPy', 'BERTopic'],
    summary: k(
      '"AI가 개발자를 대체한다"는 뉴스 담론이 실제 채용 공고(점핏·원티드)의 요구 역량과 맞는지 비교한 연구입니다. 링크드인 글로벌 공고와의 비교 분석도 맡았고, 데이터가 받쳐 주지 않는 주장은 스스로 낮춰 적었습니다.',
      "A study comparing the news narrative that \"AI will replace developers\" with the skills real job postings ask for (Jumpit, Wanted). I also handled the comparison with global LinkedIn postings, and toned down my own claims where the data didn't support them.",
    ),
    scene: scene(
      [
        '기술이 하나도 추출되지 않은 공고까지 섞이면 결과를 믿기 어렵다',
        'With postings where no skill was extracted at all mixed in, the results are hard to trust',
      ],
      [
        '기술이 1개 이상 추출된 공고만으로 다시 계산해 결과가 유지되는지 확인',
        'Recompute with only the postings that have at least one extracted skill, and check that the results hold',
      ],
    ),
  },
  {
    slug: 'jarvis',
    name: 'J.A.R.V.I.S',
    years: [2026],
    tier: 'card',
    period: '2026.04',
    team: k('개인 · 취미', 'Solo · hobby'),
    stack: ['Electron', 'React', 'Three.js', 'MediaPipe Hands', 'Ollama', 'faster-whisper', 'Kokoro TTS'],
    summary: k(
      'Mac 안에서만 도는 홀로그램 비서. 손동작으로 화면을 다루고, 말로 묻고 답을 듣습니다. 클라우드나 유료 API 없이 로컬 LLM으로 만들었습니다.',
      'A holographic assistant that runs entirely on a Mac. You work the screen with hand gestures, ask questions out loud and hear the answers. Built on a local LLM, with no cloud or paid APIs.',
    ),
    throughline: 7,
    scene: scene(
      ['로컬 LLM 답이 끝날 때까지 기다리면 말이 늦다', 'Waiting for the local LLM to finish its answer makes the speech lag'],
      ['답을 문장 단위로 끊어 나오는 대로 읽기', 'Cut the answer into sentences and read each one aloud as it comes'],
    ),
  },
  {
    slug: 'dev-blog',
    name: '개발 블로그',
    nameEn: 'Dev Blog',
    years: [2026],
    tier: 'card',
    period: '2026.05–2026.09',
    team: k('개인', 'Solo'),
    stack: ['Next.js 16', 'MDX', 'Keystatic', 'Vercel'],
    summary: k(
      '배운 것을 글로 남기는 기술 블로그. 혼자 3개월 넘게 쓰고 배포했습니다.',
      'A tech blog where I write down what I learn. I have written and deployed it on my own for more than three months.',
    ),
    scene: scene(
      [
        '글 메타데이터가 틀리면 배포된 뒤에야 깨진 걸 안다',
        "If a post's metadata is wrong, you only find out it's broken after it's deployed",
      ],
      ['빌드 전에 zod로 검사해 틀리면 빌드를 멈추기', "Check it with zod before the build, and stop the build if it's wrong"],
    ),
    links: [{ label: k('junyoung-dev-notes.vercel.app', 'junyoung-dev-notes.vercel.app'), href: 'https://junyoung-dev-notes.vercel.app' }],
  },

  // ── one-liners ────────────────────────────────────────────────────────────
  {
    slug: 'llm-dolbom',
    name: 'LLM 디지털 돌봄',
    nameEn: 'LLM Digital Care',
    years: [2024],
    tier: 'line',
    period: '2024.06–2024.12',
    stack: ['Express', 'OpenAI Assistants', 'Whisper'],
    summary: k(
      '메타버스(Quest 3) 속 NPC 돌봄이 서비스의 LLM 대화 백엔드. 한신 ABC 캠프 해커톤 우수상(팀).',
      'The LLM conversation backend for an NPC caregiver service in the metaverse (Quest 3). Excellence Award at the Hanshin ABC Camp Hackathon (team).',
    ),
    image: '/images/projects/llm-dolbom.png',
  },
  {
    slug: 'patentry',
    name: 'Patentry',
    years: [2024],
    tier: 'line',
    period: '2024.01–2024.04',
    stack: ['OpenAI Assistants'],
    summary: k(
      '특허법·통계 문서를 근거로 답하는 AI 변리사 챗봇 프로토타입.',
      'A prototype AI patent-attorney chatbot that answers from patent law and statistics documents.',
    ),
  },
  {
    slug: 'dreamtrack',
    name: 'DreamTrack',
    years: [2025],
    tier: 'line',
    period: '2025.10',
    stack: ['React', 'TypeScript', 'Express', 'MySQL', 'OpenAI API'],
    summary: k(
      '고등학생 진로 진단과 로드맵 플랫폼. SUMTECH 해커톤 장려상(팀).',
      'A career assessment and roadmap platform for high-school students. Honorable Mention at the SUMTECH Hackathon (team).',
    ),
    image: '/images/projects/dreamtrack.png',
  },
  {
    slug: 'teamflow',
    name: 'TeamFlow',
    years: [2026],
    tier: 'line',
    period: '2026.03–2026.04',
    stack: ['React', 'Gemini API'],
    summary: k(
      '회의 발언을 받아 적어 문장별 감정과 회의 요약을 보여 주는 브라우저 프로토타입(3인).',
      'A browser prototype that transcribes what is said in a meeting and shows the emotion of each sentence and a summary of the meeting (team of 3).',
    ),
    image: '/images/projects/teamflow.png',
  },
  {
    slug: 'unifit',
    name: 'UniFit',
    years: [2026],
    tier: 'line',
    period: '2026.02–2026.03',
    stack: ['React', 'TypeScript', 'Express', 'MySQL', 'JWT'],
    summary: k(
      '학업·진로·팀 프로젝트를 한곳에서 관리하는 풀스택 프로토타입(29개 테이블, 역할 기반 권한).',
      'A full-stack prototype for managing coursework, career plans and team projects in one place (29 tables, role-based permissions).',
    ),
    image: '/images/projects/unifit.png',
  },
  {
    slug: 'formcoach',
    name: 'FormCoach',
    years: [2026],
    tier: 'line',
    period: '2026.08–',
    stack: ['React Native', 'MediaPipe', 'NestJS'],
    summary: k(
      '졸업 논문으로 설계 중인 홈트레이닝 자세 코칭 앱. 영상은 폰에 두고 관절 좌표만 서버로 보냅니다(진행 중).',
      'A home-workout form-coaching app I am designing for my graduation thesis. The video stays on the phone and only joint coordinates go to the server (in progress).',
    ),
  },
]
