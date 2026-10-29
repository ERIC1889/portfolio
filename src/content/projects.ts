import type { CaseSection, Flow, FlowStep, Media, Metric, Project } from './types'

// Every claim here is backed by code, a run, a document or the owner's own answer (see docs/superpowers/specs).
// Each text is a [Korean, English] pair; the English says the same thing, no more.
type Pair = [ko: string, en: string]

const k = (ko: string, en: string) => ({ ko, en })
const pair = ([ko, en]: Pair) => ({ ko, en })
const pairs = (items: Pair[]) => items.map(pair)

function section(id: CaseSection['id'], title: Pair, body: Pair[], extra: Partial<CaseSection> = {}): CaseSection {
  return { id, title: pair(title), body: body.map(pair), ...extra }
}

function shot(src: string, width: number, height: number, alt: Pair, caption: Pair, capturedAt: string, shape: Media['shape'] = 'wide'): Media {
  return { kind: 'screenshot', src, width, height, alt: pair(alt), caption: pair(caption), capturedAt, shape }
}

function video(src: string, poster: string, width: number, height: number, alt: Pair, caption: Pair, capturedAt: string, shape: Media['shape'] = 'wide'): Media {
  return { kind: 'video', src, poster, width, height, alt: pair(alt), caption: pair(caption), capturedAt, shape }
}

function metric(label: Pair, value: string, target: Pair, condition: Pair, source: Metric['source'], checkedAt: string): Metric {
  return { label: pair(label), value, target: pair(target), condition: pair(condition), source, checkedAt }
}

function step(owner: FlowStep['owner'], label: Pair, detail?: Pair, branches?: [when: Pair, then: Pair][]): FlowStep {
  return {
    owner,
    label: pair(label),
    ...(detail ? { detail: pair(detail) } : {}),
    ...(branches ? { branches: branches.map(([when, then]) => ({ when: pair(when), then: pair(then) })) } : {}),
  }
}

function flow(title: Pair, caption: Pair, steps: FlowStep[]): Flow {
  return { title: pair(title), caption: pair(caption), steps }
}

const PROBLEM: Pair = ['문제와 선택', 'Problem and choices']
const IMPLEMENTATION: Pair = ['구현', 'Implementation']
const VALIDATION: Pair = ['검증', 'Verification']
const RESULT: Pair = ['결과', 'Result']
const RETRO: Pair = ['남은 한계와 다음', 'Limits and next steps']
const EVIDENCE: Pair = ['코드·자료', 'Code and material']

const SKILLPILOT_REPO = 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot'

export const projects: Project[] = [
  // ── flagship ──────────────────────────────────────────────────────────────
  {
    slug: 'suzihouse',
    name: '수지하우스',
    nameEn: 'SuziHouse',
    years: [2026],
    tier: 'featured',
    showcase: 'flagship',
    title: k('수지하우스 부동산 세금 비교', 'SuziHouse property tax comparison'),
    product: k(
      '집 두 채를 양도·증여·부담부증여로 처분할 때의 세금 여섯 가지를 중과 유예 전후로 비교하고, PDF로 저장하는 웹 기능',
      'A web feature that compares the tax on six ways of disposing of two homes (sale, gift or gift with assumed debt) before and after the surcharge grace period, and saves the result as a PDF',
    ),
    audience: k('집을 두 채 가진 개인', 'Individuals who own two homes'),
    period: '2026.04–',
    team: k('직원 5명 스타트업 · 유일한 개발자', 'Five-person startup · the only developer'),
    role: k('설계·개발·운영 (직함 CTO)', 'Design, build and operation (title: CTO)'),
    status: k('운영 중 (finz.kr)', 'Live (finz.kr)'),
    statusCheckedAt: '2026-10-29',
    stack: ['Next.js', 'TypeScript', 'React', 'Vitest'],
    summary: k(
      '부동산 세금 비교 계산기를 포함한 회사 웹 finz.kr을 혼자 설계·개발·운영하고, 청년 세금 환급 앱 MVP를 만들었습니다.',
      'I designed, built and run the company website finz.kr on my own, including its property tax comparison calculator, and built the MVP of a tax refund app for young people.',
    ),
    features: pairs([
      [
        '세무사와 함께 Python으로 작성한 세금 계산 로직을 TypeScript로 옮겨 웹에서 바로 계산',
        'Ported the tax logic, written in Python together with a tax accountant, to TypeScript so the website calculates directly',
      ],
      [
        '국토교통부 실거래가 API 연동: 12시간 단위 재확인, 월별 동시 조회, 인증키 인코딩 실패를 피한 URL 직접 조립',
        'Real-transaction price API integration: re-checks every 12 hours, loads months in parallel, and assembles the URL by hand to avoid failures from an encoded key',
      ],
      [
        '3단계 입력(A주택·B주택·받는 사람)과 6가지 결과 비교 화면, 인쇄용 PDF 리포트',
        'Three-step input (home A, home B, recipient), a six-way result comparison and a printable PDF report',
      ],
    ]),
    contribution: {
      direct: pairs([
        [
          '회사 웹 v2 전체: 화면, 계산 라이브러리, 실거래가 연동, API (2026.04–)',
          'All of the company website v2: screens, calculation library, price data integration and API (2026.04–)',
        ],
        ['개인 서비스 계산기 세 가지: 부동산 6Way, 디지털 자산, 해외주식', 'All three personal-service calculators: property 6Way, digital assets and foreign stocks'],
        ['결과 PDF 리포트', 'The result PDF report'],
      ]),
      joint: pairs([['세금 계산 로직 정리 (세무사와 함께)', 'Working out the tax logic (with a tax accountant)']]),
      others: pairs([['회사 웹 v1 (2026.03–04, 다른 개발자): 정적 페이지와 초기 화면', 'Company website v1 (Mar–Apr 2026, another developer): static pages and early screens']]),
      verified: pairs([
        [
          '기준 워크북 사례와 대조: 웹 API 21개 항목, Python 엔진 테스트 43개',
          'Checked against a reference workbook case: 21 items through the web API, 43 tests on the Python engine',
        ],
      ]),
      notYet: pairs([['사용자 수 같은 운영 지표는 집계하지 않음', 'No usage metrics such as user counts are collected']]),
    },
    media: [
      video(
        '/media/suzihouse/web-demo.mp4',
        '/media/suzihouse/web-demo-poster.webp',
        1280,
        800,
        ['부동산 6Way 시연: 두 주택 입력, 결과 비교, 조건 변경 후 재계산', 'Property 6Way demo: entering two homes, comparing results, recalculating after a change'],
        [
          '부동산 6Way · 운영 사이트 실제 화면 · 예시 입력 → 결과 → B주택을 조정대상지역으로 바꿔 재계산 (37초, 편집 없음)',
          'Property 6Way · live site · sample input → results → recalculated with home B in a regulated area (37 s, unedited)',
        ],
        '2026-10-29',
      ),
      shot(
        '/media/suzihouse/web-six-way.webp',
        1600,
        956,
        ['여섯 가지 처분 방법별 중과 유예 전후 세금 비교', 'Tax for the six options before and after the surcharge grace period'],
        ['여섯 가지 경우 비교 · 운영 사이트 실제 화면 · 예시 입력', 'Six-way comparison · live site · sample input'],
        '2026-10-29',
      ),
      shot(
        '/media/suzihouse/web-report.webp',
        1100,
        1556,
        ['PDF로 저장되는 비교 리포트 첫 장', 'First page of the comparison report saved as a PDF'],
        ['PDF 리포트 첫 장 · 인쇄 화면 · 예시 입력', 'PDF report, first page · print view · sample input'],
        '2026-10-29',
      ),
      shot(
        '/media/suzihouse/web-mobile.webp',
        780,
        1688,
        ['휴대폰에서 본 결과 요약', 'Result summary on a phone'],
        ['모바일 결과 화면 · 운영 사이트 실제 화면 (390px)', 'Mobile result · live site (390px)'],
        '2026-10-29',
        'phone',
      ),
      shot(
        '/media/suzihouse/web-summary.webp',
        1600,
        579,
        ['세금이 가장 적은 경우와 최대 세금 차이를 보여 주는 결과 요약', 'Result summary showing the cheapest option and the largest tax gap'],
        ['결과 요약 · 운영 사이트 실제 화면 · 예시 입력', 'Result summary · live site · sample input'],
        '2026-10-29',
      ),
      shot(
        '/media/suzihouse/web-input.webp',
        1600,
        1097,
        ['A주택 시가·취득가액·취득일·조정대상지역·전세보증금 입력 화면', 'Input for home A: market price, purchase price, date, regulated area and lease deposit'],
        ['입력 1단계 · 운영 사이트 실제 화면 · 예시 입력', 'Input step 1 · live site · sample input'],
        '2026-10-29',
      ),
    ],
    flow: flow(
      ['입력부터 PDF까지', 'From input to PDF'],
      [
        '회사 웹 코드 기준. 검증 스크립트는 같은 계산 API에 기준 사례를 넣어 워크북 기대값과 비교합니다.',
        "Drawn from the company website's code. The verification script sends the reference case to the same calculation API and compares it with the workbook's expected values.",
      ],
      [
        step(
          'mine',
          ['입력 3단계', 'Three-step input'],
          ['A주택 · B주택 · 받는 사람. 시가는 실거래가 검색으로 채울 수 있음', 'Home A · home B · recipient; market prices can be filled from a price search'],
        ),
        step(
          'mine',
          ['실거래가 조회 API (Next.js)', 'Price lookup API (Next.js)'],
          ['최근 6개월을 월별로 동시에 조회, 12시간 단위 재확인, XML 응답 해석', 'Loads the last six months in parallel, re-checks every 12 hours, parses the XML response'],
        ),
        step('external', ['국토교통부 실거래가 API', 'Land ministry real-transaction API'], ['인증키가 인코딩되면 실패해 URL을 직접 조립', 'Fails if the key gets encoded, so the URL is assembled by hand']),
        step(
          'mine',
          ['계산 API · TypeScript 계산 엔진', 'Calculation API · TypeScript engine'],
          ['6가지 처분 방법 × 중과 유예 전·후, 양도세·증여세·취득세 합산', 'Six options × before and after the grace period, adding capital gains, gift and acquisition tax'],
        ),
        step('mine', ['결과 화면 · PDF 리포트', 'Results · PDF report'], ['요약과 6가지 비교, 숨긴 iframe에 그린 리포트를 브라우저 인쇄로 저장', 'Summary and six-way comparison; a report drawn in a hidden iframe is saved through the print dialog']),
      ],
    ),
    metrics: [
      metric(
        ['기준 워크북 대조 (웹 API)', 'Reference workbook check (web API)'],
        '21/21',
        ['실제 2주택 사례 1건: 6가지 경우의 중과 전·후 합계와 증가분, 집계 3개', 'One real two-home case: before/after totals and increase for six options, plus three aggregates'],
        ['단계마다 원 미만 절사, ±10원 허용 · 최대 차이 1원', 'Fractions of a won dropped at each step, ±10 won allowed · largest gap 1 won'],
        'measured',
        '2026-10-29',
      ),
      metric(
        ['계산 엔진 테스트 (Python)', 'Calculation engine tests (Python)'],
        '58 통과',
        ['6Way 계산, 그중 같은 기준 사례를 원 단위로 맞추는 테스트 43개', '6Way calculation, including 43 tests that match the same reference case to the won'],
        ['pytest, 로컬 실행', 'pytest, run locally'],
        'measured',
        '2026-10-29',
      ),
      metric(
        ['보안 테스트 (환급 앱 백엔드)', 'Security tests (refund app backend)'],
        '57 통과',
        ['설정, 암호화, JWT, 미들웨어, 모델 제약, 비밀번호 규칙', 'Configuration, encryption, JWT, middleware, model constraints, password rules'],
        ['pytest, 로컬 실행 · 웹 계산 기능과는 별개', 'pytest, run locally · separate from the web calculator'],
        'measured',
        '2026-10-29',
      ),
    ],
    links: [
      { kind: 'live', label: k('부동산 6Way 열기', 'Open property 6Way'), href: 'https://www.finz.kr/personal/property' },
      { kind: 'site', label: k('회사 웹 finz.kr', 'Company website finz.kr'), href: 'https://www.finz.kr' },
    ],
    sections: [
      section('problem', PROBLEM, [
        [
          '세무를 잘 모르는 사람이 쓰는 계산기라 결과 숫자 하나가 큰 결정을 바꿉니다. 화면이 뜨는 것보다 숫자가 맞는 것이 먼저였습니다.',
          'People who know little about tax use this calculator, so one number can change a big decision. Getting the numbers right came before getting the screens up.',
        ],
        [
          '계산 로직은 세무사와 함께 Python으로 작성해 두었습니다. 이를 웹에서 바로 쓰려고 TypeScript로 옮기고, 원본과 같은 결과를 내는지 기준 사례로 확인하기로 했습니다.',
          'The tax logic had been written in Python together with a tax accountant. To use it directly on the website I ported it to TypeScript, and decided to prove it gives the same results with a reference case.',
        ],
        [
          '시가를 채우는 국토교통부 실거래가 API는 응답이 느리고, 인증키가 인코딩되면 요청이 실패했습니다.',
          'The land ministry real-transaction price API that fills in market prices was slow, and requests failed whenever the key got encoded.',
        ],
      ]),
      section('implementation', IMPLEMENTATION, [
        [
          '계산 엔진은 A·B 주택마다 양도·증여·부담부증여를 계산해 여섯 가지 경우를 만들고, 각 경우를 중과 유예 전과 후 규칙으로 따로 계산해 양도세·증여세·취득세를 합칩니다.',
          'The engine builds six options (sale, gift and gift with assumed debt for homes A and B) and computes each under the rules before and after the grace period, adding up capital gains, gift and acquisition tax.',
        ],
        [
          '실거래가는 12시간 단위로 다시 확인하고 월별 데이터를 동시에 불러옵니다. 인증키(serviceKey)가 인코딩되면 실패해 URL을 직접 조립했습니다.',
          'Price data is re-checked every 12 hours and monthly data is loaded in parallel. Requests failed when the serviceKey got encoded, so I assemble the URL by hand.',
        ],
        [
          'PDF는 숨긴 iframe에 리포트 문서를 그린 뒤 브라우저 인쇄로 저장합니다. 화면을 캔버스로 찍어 만드는 방식에서 생기는 빈 화면 문제를 피하려는 선택입니다.',
          "The PDF is made by drawing a report document in a hidden iframe and saving it through the browser's print dialog, which avoids the blank pages that canvas-based capture can produce.",
        ],
      ]),
      section(
        'implementation',
        ['같은 회사의 다른 작업 · 청년 세금 환급 앱 (MVP, 미출시)', 'Also at SuziHouse · tax refund app for young people (MVP, not released)'],
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
            '인증 한 번으로 얻은 세션을 연도별 조회에 다시 쓰고, 조회는 3초 간격으로 하나씩 보냅니다. 같은 요청이 겹쳤다는 오류가 오면 5초, 10초를 기다렸다 다시 시도합니다. 기다리는 동안에는 연도별 진행 화면을 보여 줍니다. CODEF로 조회한 소득 자료는 서버 DB에 저장하지 않고 계산에만 씁니다.',
            'The session from a single authentication is reused for every yearly query, and the queries go out one at a time, 3 seconds apart. If an error says identical requests overlapped, it waits 5 seconds, then 10, and tries again. Meanwhile a per-year progress screen is shown. Income records fetched through CODEF are not stored in the server database and are used only for the calculation.',
          ],
          [
            '결제(토스페이먼츠)를 요청한 사람이 실제 의뢰의 주인인지, 금액과 이미 결제됐는지를 서버에서 다시 확인합니다. 사용자·세무사·관리자마다 다른 화면을 보여 주지만, 실제 권한 검사는 서버가 합니다.',
            'For payments (Toss Payments), the server re-checks that the person paying owns the request, the amount, and whether it has already been paid. Users, tax accountants and admins see different screens, but the real permission checks happen on the server.',
          ],
          [
            '같은 백엔드에서 실거래가 데이터는 Celery Beat로 매주 월요일 조정대상지역 전체를 동기화하고, 실패하면 시간을 두고 다시 시도합니다. 보안 테스트는 GitHub Actions에서 push마다 실행됩니다.',
            'In the same backend, Celery Beat syncs real-transaction prices for every regulated area each Monday and retries after a delay on failure. The security tests run in GitHub Actions on every push.',
          ],
        ],
        {
          anchor: 'refund-app',
          media: [
            video(
              '/media/suzihouse/app-demo.mp4',
              '/media/suzihouse/app-demo-poster.webp',
              1280,
              720,
              ['청년 소득세 환급 앱 시연 영상', 'Tax refund app demo video'],
              [
                '청년 소득세 환급 · 앱 실제 화면을 단계별 설명과 함께 편집한 영상 (1분 45초, 예시 데이터)',
                'Tax refund for young people · real app screens edited with step captions (1 min 45 s, sample data)',
              ],
              '2026-09-10',
            ),
            shot(
              '/media/suzihouse/app-auth-method.webp',
              720,
              1561,
              ['간편인증 수단을 고르는 화면', 'Choosing a simple-authentication method'],
              ['인증 수단 선택 · 앱 실제 화면', 'Choosing the auth method · real app screen'],
              '2026-04-20',
              'phone',
            ),
            shot(
              '/media/suzihouse/app-auth-wait.webp',
              720,
              1561,
              ['카카오톡 인증을 기다리며 남은 시간을 보여 주는 화면', 'Waiting for KakaoTalk approval with the time remaining'],
              ['인증 대기와 남은 시간 · 앱 실제 화면', 'Waiting for approval, time remaining · real app screen'],
              '2026-04-20',
              'phone',
            ),
            shot(
              '/media/suzihouse/app-collect.webp',
              720,
              1561,
              ['연도별 소득 자료를 차례로 수집하는 진행 화면', 'Progress screen collecting income records year by year'],
              ['연도별 수집 진행 · 앱 실제 화면', 'Year-by-year collection progress · real app screen'],
              '2026-04-20',
              'phone',
            ),
          ],
        },
      ),
      section(
        'implementation',
        ['같은 회사의 다른 작업 · 세무 SaaS FINZ (협력 개발사와 함께, 출시 전)', 'Also at SuziHouse · FINZ tax SaaS (with a partner company, not yet launched)'],
        [
          [
            'FINZ는 세무사가 쓰는 세무 SaaS로, 협력 개발사와 함께 만들었습니다. 저는 수지하우스 쪽 기술 담당으로 세금 계산 엔진의 초안을 만들고, 외부 API 연동과 배포·운영 방식, 개발 도구를 개발사와 함께 정하며 개발에 참여했습니다.',
            "FINZ is a tax SaaS for tax accountants, built together with a partner development company. As SuziHouse's technical lead, I drafted the tax calculation engine, decided the external API integrations, the deployment and operations approach and the development tools together with the vendor, and took part in development.",
          ],
          [
            '배포가 실패했을 때는 코드 결함이 아니라 서버 메모리 부족이 원인임을 측정과 재현으로 확정했고, 개발사가 진단을 확인해 수정했습니다.',
            'When deployments failed, I established through measurement and reproduction that the cause was a lack of server memory rather than a code defect; the vendor confirmed the diagnosis and fixed it.',
          ],
          [
            '개발사와 주고받은 이슈 원장 269건은 코드·테스트·화면 근거로 대조해 확인류 233건과 잔여 36건으로 나눠 관리했습니다(해결 건수가 아니라 관리 분류입니다). 그 과정에서 기준시가가 입력되지 않은 필지가 경고 없이 세액 계산에서 빠지는 High 등급 결함을 찾아 수정 요청에 반영했습니다.',
            'I checked the 269 items in the issue ledger with the vendor against the code, tests and screens, and tracked them as 233 confirmed-type and 36 remaining (a tracking category, not a count of fixes). Along the way I found a High-severity defect where land parcels with no standard price entered were silently left out of the tax calculation, which went into a fix request.',
          ],
        ],
        { anchor: 'finz' },
      ),
      section(
        'validation',
        VALIDATION,
        [
          [
            '계산 검증은 화면 테스트와 나눴습니다. 기준 워크북(실제 2주택 사례)의 기대값과 비교하는 스크립트를 회사 웹 API에 돌리면 21개 항목이 모두 ±10원 안에 들어오고(최대 차이 1원), Python 엔진에는 같은 사례를 원 단위까지 맞추는 테스트가 있습니다.',
            'Checking the numbers is kept apart from UI tests. A script compares the company web API against the expected values in a reference workbook (a real two-home case): all 21 items land within ±10 won (largest gap 1 won), and the Python engine has tests that match the same case to the won.',
          ],
          [
            '워크북은 소수점 이하를 그대로 두고 엔진은 단계마다 원 미만을 버리기 때문에, ±10원을 허용 범위로 정했습니다. 기준 사례의 단지 이름과 금액은 고객 정보일 수 있어 공개하지 않습니다.',
            "The workbook keeps fractions while the engine drops fractions of a won at each step, so ±10 won is the agreed tolerance. The reference case's apartment names and amounts may be client data, so they are not shown.",
          ],
        ],
        { anchor: 'validation' },
      ),
      section('result', RESULT, [
        [
          '부동산 6Way를 포함한 회사 웹은 finz.kr에서 운영 중입니다. 사용자 수 같은 운영 지표는 집계하지 않아 적지 않습니다.',
          'The company website, including property 6Way, is live at finz.kr. No usage metrics such as user counts are collected, so none are given.',
        ],
      ]),
      section('retro', RETRO, [
        [
          '기준 사례가 하나뿐입니다. 경계값·반올림·잘못된 입력 사례를 늘리고, 워크북 자체가 틀렸을 때 알아챌 방법도 정하겠습니다.',
          'There is only one reference case. I would add boundary, rounding and invalid-input cases, and decide how we would notice if the workbook itself were wrong.',
        ],
        [
          '결제 승인 뒤 저장이 실패하거나 같은 요청이 두 번 오는 것처럼 외부 시스템과 상태가 어긋나는 상황을, 실패를 일부러 일으켜 확인해 두겠습니다.',
          'I would deliberately cause failures to check the cases where our state drifts from an external system, such as saving failing after a payment is approved, or the same request arriving twice.',
        ],
      ]),
      section('evidence', EVIDENCE, [
        [
          '코드는 회사 비공개 저장소에 있어 링크하지 않습니다. 대신 운영 화면, 시연 영상, 검증 실행 결과를 이 페이지에 둡니다.',
          "The code is in the company's private repositories, so it is not linked. The live screens, demo videos and verification results are on this page instead.",
        ],
      ]),
    ],
  },

  // ── supporting ────────────────────────────────────────────────────────────
  {
    slug: 'skillpilot',
    name: 'SkillPilot',
    years: [2025],
    tier: 'featured',
    showcase: 'supporting',
    title: k('SkillPilot 자격증·커리어 플랫폼', 'SkillPilot certification and career platform'),
    product: k(
      '공공데이터 API 7종을 하나의 자격증 데이터로 정규화하고, 추천·학습 로드맵·모의시험·모의 면접까지 IT 취업 준비를 한곳에서 돕는 웹 서비스',
      'A web service that normalizes 7 public data APIs into one set of certification data and supports IT job preparation in one place: recommendations, study roadmaps, mock exams and mock interviews',
    ),
    audience: k('IT 취업을 준비하는 학생', 'Students preparing for IT jobs'),
    period: '2025.09–2026.06',
    team: k('4인 캡스톤 (AISW 캡스톤디자인)', '4-person capstone (AISW Capstone Design)'),
    role: k('팀장 · 백엔드 전체 · 프론트엔드 개편', 'Team lead · the entire backend · frontend overhaul'),
    status: k('캡스톤 완료', 'Capstone completed'),
    statusCheckedAt: '2026-10-29',
    stack: ['Node.js', 'Express 5', 'MySQL', 'MongoDB', 'node-cron', 'React', 'OpenAI API'],
    summary: k(
      '공공 API 7종을 하나의 자격증 데이터로 정규화한 IT 취업 준비 플랫폼. 4인 팀에서 팀장과 백엔드 전체, 프론트엔드 개편을 맡았습니다.',
      'An IT job-preparation platform that normalizes 7 public APIs into one set of certification data. In a team of four I was the lead, built the entire backend and overhauled the frontend.',
    ),
    features: pairs([
      [
        '공공 API 7종 응답 정규화: HTTP 200 속 오류 문구는 재시도, JSON 대신 온 XML은 XML로 해석',
        'Normalizing 7 public APIs: error text inside an HTTP 200 is retried, and XML that arrives instead of JSON is parsed as XML',
      ],
      [
        'node-cron 주기 동기화와 관리자 수동 실행, 같은 사용자·같은 조건의 AI 결과 재사용(MongoDB)',
        'Periodic syncing with node-cron plus a manual admin run, and reuse of AI results for the same user and request (MongoDB)',
      ],
      [
        '프론트엔드 개편: 디자인 토큰, 공통 컴포넌트 6종, 13개 페이지 이전, 대시보드 위젯 5종, 학습 메이트',
        'Frontend overhaul: design tokens, 6 shared components, 13 pages migrated, 5 dashboard widgets, a study companion',
      ],
    ]),
    contribution: {
      direct: pairs([
        ['백엔드 전체: API, DB 설계, 공공 API 연동과 동기화, OpenAI 연동', 'The entire backend: API, database design, public API integration and syncing, OpenAI integration'],
        [
          '프론트엔드 개편: UI 코드 리팩터링, 페이지 이전, 공통 컴포넌트, 대시보드 위젯, 학습 메이트, 모의면접 설정 화면, 챗봇 오프라인 대체 응답',
          'Frontend overhaul: UI refactoring, page migration, shared components, dashboard widgets, the study companion, the mock-interview setup screen and an offline fallback for the chatbot',
        ],
        ['팀장과 최종 발표', 'Team lead and the final presentation'],
      ]),
      notYet: pairs([['자동 테스트 없음', 'No automated tests']]),
    },
    media: [
      shot(
        '/media/skillpilot/dashboard.webp',
        1600,
        885,
        ['학습 로드맵과 학습 캘린더가 있는 대시보드', 'Dashboard with the study roadmap and study calendar'],
        ['대시보드: 주차별 학습 로드맵·캘린더 · 실제 화면(로컬 실행)', 'Dashboard: weekly study roadmap and calendar · real screen (local run)'],
        '2026-05-04',
      ),
      video(
        '/media/skillpilot/demo.mp4',
        '/media/skillpilot/demo-poster.webp',
        1280,
        710,
        ['SkillPilot 시연 영상', 'SkillPilot demo video'],
        [
          '시연: 대시보드 → 학습 기록 → AI 모의면접 → CBT 모의고사 → AI 오답 해설 → 학습 메이트 (3분, 편집 없음)',
          'Demo: dashboard → study log → AI mock interview → CBT mock exam → AI answer review → study companion (3 min, unedited)',
        ],
        '2026-05-04',
      ),
      shot(
        '/media/skillpilot/study-log.webp',
        1600,
        885,
        ['학습 기록, 학습 시간 추이 차트, 학습 잔디밭이 있는 대시보드 아래쪽', 'Lower dashboard with the study log, a study-time trend chart and a study heatmap'],
        ['대시보드 위젯: 학습 기록·추이·잔디밭 · 실제 화면(로컬 실행)', 'Dashboard widgets: study log, trend, heatmap · real screen (local run)'],
        '2026-05-04',
      ),
      shot(
        '/media/skillpilot/wrong-answer.webp',
        1600,
        885,
        ['AI 오답 분석 화면', 'AI wrong-answer analysis'],
        ['AI 오답 분석 · 실제 화면(로컬 실행)', 'AI wrong-answer analysis · real screen (local run)'],
        '2026-05-04',
      ),
      shot(
        '/media/skillpilot/interview.webp',
        1600,
        885,
        ['AI 모의면접 설정 화면', 'AI mock interview setup'],
        ['AI 모의면접 설정 · 실제 화면(로컬 실행)', 'AI mock interview setup · real screen (local run)'],
        '2026-05-04',
      ),
      shot(
        '/media/skillpilot/mate.webp',
        736,
        924,
        ['학습 메이트와 나눈 대화 창', 'A conversation with the study companion'],
        ['학습 메이트 · 실제 화면(로컬 실행)', 'Study companion · real screen (local run)'],
        '2026-05-04',
      ),
    ],
    flow: flow(
      ['공공 API 동기화 흐름', 'Public API sync flow'],
      ['client.js · certificationSync.service.js 기준', 'Drawn from client.js and certificationSync.service.js'],
      [
        step('mine', ['동기화 시작', 'Sync starts'], ['node-cron 주기 실행 또는 관리자 수동 실행. API 키가 없으면 건너뜀', 'node-cron schedule or a manual admin run; skipped without an API key']),
        step('external', ['공공데이터 API 7종', '7 public data APIs'], ['자격증 목록·상세·통계·시험 일정 등', 'Certification lists, details, statistics, exam schedules and more']),
        step(
          'mine',
          ['응답 확인', 'Response check'],
          undefined,
          [
            [
              ['본문에 오류 문구 (HTTP 200)', 'Error text in the body (HTTP 200)'],
              ['실패로 보고 0.5초·1초 뒤 최대 2번 재시도', 'Treated as a failure; retried up to twice after 0.5 s and 1 s'],
            ],
            [
              ['JSON으로 읽히지 않음', "Doesn't parse as JSON"],
              ['XML로 해석', 'Parsed as XML'],
            ],
            [
              ['정상 JSON', 'Valid JSON'],
              ['그대로 다음 단계로', 'Passed on as is'],
            ],
          ],
        ),
        step('mine', ['엔드포인트별 정규화', 'Per-endpoint normalization'], ['자격증 코드로 상세·통계·일정을 결합', 'Joins details, statistics and schedules by certification code']),
        step('mine', ['MySQL 저장 → API → 화면', 'MySQL → API → screens'], ['추천·로드맵 같은 AI 결과는 MongoDB에 따로 저장', 'AI results such as recommendations and roadmaps are stored separately in MongoDB']),
      ],
    ),
    links: [
      { kind: 'code', label: k('API 클라이언트 (정규화·재시도)', 'API client (normalizing, retries)'), href: `${SKILLPILOT_REPO}/blob/main/SkillPilot-backend/src/integrations/dataGoKr/client.js` },
      { kind: 'code', label: k('공개 저장소', 'Public repository'), href: SKILLPILOT_REPO },
      { kind: 'code', label: k('동기화 서비스', 'Sync service'), href: `${SKILLPILOT_REPO}/blob/main/SkillPilot-backend/src/services/certificationSync.service.js` },
      { kind: 'code', label: k('AI 결과 재사용', 'AI result reuse'), href: `${SKILLPILOT_REPO}/blob/main/SkillPilot-backend/src/services/ai.service.js` },
      {
        kind: 'slides',
        label: k('최종 발표 자료 (PDF)', 'Final presentation (PDF)'),
        href: `${SKILLPILOT_REPO}/blob/main/${encodeURIComponent('최종발표자료_AISW캡스톤디자인(A반_SkillPilot팀).pdf')}`,
      },
    ],
    sections: [
      section('problem', PROBLEM, [
        [
          '자격증 정보는 공공데이터 API 7곳에 흩어져 있었고, 응답 구조가 제각각이었습니다. 게다가 실패해도 HTTP 200으로 "SERVICE ERROR" 문자열을 보내거나, JSON을 요청했는데 XML을 돌려주기도 했습니다. 상태 코드만 보고 성공으로 처리하면 틀린 데이터가 그대로 들어옵니다.',
          'Certification data was scattered across 7 public data APIs, each with its own structure. On failure they sometimes sent a "SERVICE ERROR" string with HTTP 200, or returned XML when JSON had been requested. Treating a call as successful by its status code alone lets wrong data straight in.',
        ],
        [
          '그래서 외부 응답을 그대로 쓰지 않고 먼저 내부 구조로 정규화한 뒤 자격증 코드로 상세·통계·시험 일정을 결합했습니다. 정형 데이터는 MySQL에, AI가 만든 결과는 MongoDB에 두었습니다.',
          'So instead of using external responses as they came, I normalized them into an internal structure first and joined details, statistics and exam schedules by certification code. Structured data went into MySQL and AI-generated results into MongoDB.',
        ],
      ]),
      section('implementation', IMPLEMENTATION, [
        [
          '7개 엔드포인트마다 정규화 함수를 두었습니다. API 호출은 두 경우를 나눠 처리합니다. 응답 본문에 오류 문구가 있으면 실패로 보고 0.5초, 1초 간격으로 최대 2번 다시 시도합니다. JSON을 요청했는데 JSON으로 읽히지 않으면 XML로 해석합니다.',
          'Each of the 7 endpoints has its own normalization function. API calls handle two cases separately. If the body contains error text, the call is treated as a failure and retried up to twice, 0.5 s and 1 s apart. If JSON was requested but the body does not parse as JSON, it is parsed as XML.',
        ],
        [
          '동기화는 node-cron으로 주기적으로 돌고, 관리자가 직접 실행할 수도 있습니다. API 키가 없으면 스케줄러가 건너뜁니다. AI 추천·로드맵은 같은 사용자의 같은 조건 요청이면 저장된 결과를 다시 씁니다.',
          'Syncing runs periodically with node-cron, and an admin can also start it by hand; without an API key the scheduler skips the run. AI recommendations and roadmaps reuse the stored result when the same user sends the same request.',
        ],
        [
          '2026년 1학기에는 프론트엔드를 개편했습니다. 디자인 토큰과 공통 컴포넌트 6종을 만들어 13개 페이지를 옮기고, 대시보드에 통계 카드·도넛·학습 잔디·추이 차트를 넣었습니다. 챗봇은 API 키가 없거나 호출이 실패해도 시연이 멈추지 않도록 오프라인 대체 응답을 두었습니다.',
          'In spring 2026 I overhauled the frontend: design tokens and 6 shared components, 13 pages migrated, and a dashboard with stat cards, a donut, a study heatmap and a trend chart. The chatbot got an offline fallback so a missing key or a failed call never stops a demo.',
        ],
      ]),
      section('validation', VALIDATION, [
        [
          '저장소에 자동 테스트는 없습니다. 관리자 수동 실행은 실제 응답을 다시 받아 눈으로 확인하는 용도입니다.',
          'The repository has no automated tests. The manual admin run is for fetching real responses again and checking them by eye.',
        ],
      ]),
      section('result', RESULT, [
        [
          '자격증 데이터 동기화, AI 추천·로드맵, 모의시험과 모의 면접까지 동작하는 플랫폼으로 캡스톤을 마쳤고, 최종 발표를 맡았습니다.',
          'We finished the capstone with a working platform, from certification data syncing to AI recommendations and roadmaps, mock exams and mock interviews, and I gave the final presentation.',
        ],
      ]),
      section('retro', RETRO, [
        [
          '오류 문구, JSON 대신 온 XML, 결과가 하나일 때와 여럿일 때, 빈 결과·시간 초과·재시도 초과, 같은 자격증 코드 중복 실행을 자동 테스트로 확인하겠습니다.',
          'I would cover error text, XML instead of JSON, single versus multiple items, empty results, timeouts, running out of retries and duplicate runs for the same certification code with automated tests.',
        ],
        [
          '저장된 AI 결과는 입력 JSON 문자열을 그대로 키로 써서 필드 순서만 달라도 놓칩니다. 키를 정규화하고 모델·프롬프트 버전과 만료 시간을 넣겠습니다.',
          'Stored AI results are keyed by the raw input JSON string, so a different field order alone causes a miss. I would normalize the key and add the model and prompt version and an expiry time.',
        ],
      ]),
      section('evidence', EVIDENCE, [
        [
          '정규화·재시도(client.js), 동기화(certificationSync.service.js), AI 결과 재사용(ai.service.js) 코드와 최종 발표 자료를 학교 공개 저장소에서 볼 수 있습니다.',
          "The normalizing and retry code (client.js), syncing (certificationSync.service.js), AI result reuse (ai.service.js) and the final presentation are in the school's public repository.",
        ],
      ]),
    ],
  },
  {
    slug: 'closetmate',
    name: 'ClosetMate',
    years: [2026],
    tier: 'featured',
    showcase: 'supporting',
    title: k('ClosetMate 옷장·코디 추천 앱', 'ClosetMate wardrobe and outfit app'),
    product: k(
      '옷 사진을 찍으면 종류를 분류해 옷장에 넣고, 가진 옷으로만 코디를 추천하는 모바일 앱',
      'A mobile app that classifies a photo of a garment into your wardrobe and recommends outfits only from clothes you own',
    ),
    period: '2026.03–2026.06',
    team: k('개인 프로젝트 · 딥러닝 기초 수업', 'Solo project · intro to deep learning course'),
    role: k('기획 · 모델 학습 · 모바일·API 개발', 'Planning · model training · mobile and API development'),
    status: k('수업 프로젝트, 미출시', 'Course project, not released'),
    statusCheckedAt: '2026-10-29',
    stack: ['Expo', 'Next.js', 'PostgreSQL', 'Drizzle', 'ONNX Runtime', 'PyTorch', 'OpenAI API', 'Whisper'],
    summary: k(
      '옷 사진으로 옷장을 만들고, LLM이 추천한 코디를 서버에서 검증해 가진 옷으로만 보여 주는 앱. 혼자 기획부터 모델 학습, 앱과 API까지 만들었습니다.',
      'An app that builds a wardrobe from photos and checks LLM outfit suggestions on the server so only owned clothes are shown. I built it alone, from planning and model training to the app and API.',
    ),
    features: pairs([
      [
        'LLM 추천을 서버에서 형식 → 옷 ID → 후보 조합 순서로 검증하고, 어긋나면 보조 모델로 다시 받기',
        'Checking LLM suggestions on the server in the order format → clothing IDs → candidate outfit, and asking a backup model when anything is off',
      ],
      [
        'MobileNetV3·ResNet50 전이학습 비교 후 MobileNetV3를 서버에서 ONNX로 추론',
        'Compared transfer learning on MobileNetV3 and ResNet50, then served MobileNetV3 with ONNX on the server',
      ],
      ['Expo 앱: 사진 등록·분류 확인, 옷장, 통계, 음성 입력(Whisper)', 'The Expo app: adding photos and checking labels, the wardrobe, stats and voice input (Whisper)'],
    ]),
    contribution: {
      direct: pairs([['기획, 모델 학습·비교, 서버 API, 모바일 앱 전부', 'Everything: planning, model training and comparison, the server API and the mobile app']]),
      notYet: pairs([
        ['기기 안 추론(TFLite)은 완성하지 않음', 'On-phone inference (TFLite) was not finished'],
        ['공개 서비스용 인증과 URL 처리는 보완 전', 'Authentication and URL handling are not yet fit for a public service'],
      ]),
    },
    media: [
      shot(
        '/media/closetmate/recommend.webp',
        560,
        893,
        ['상황을 입력해 받은 코디 추천 결과', 'Outfit suggestions for a described occasion'],
        [
          '추천 결과 · 실제 앱 화면(시뮬레이터) · gpt-5.4-nano, 후보 10개, 응답 4,804ms',
          'Suggestions · real app screen (simulator) · gpt-5.4-nano, 10 candidates, 4,804 ms',
        ],
        '2026-05-25',
        'device',
      ),
      shot(
        '/media/closetmate/classify.webp',
        560,
        974,
        ['사진을 분류한 결과를 확인하고 고치는 화면', 'Checking and correcting the classification of a photo'],
        ['옷 추가 · 실제 앱 화면 · MobileNetV3 분류, 신뢰도 43%', 'Adding a garment · real app screen · MobileNetV3 label, 43% confidence'],
        '2026-05-25',
        'device',
      ),
      shot(
        '/media/closetmate/wardrobe.webp',
        560,
        891,
        ['카테고리별로 정리된 옷장', 'The wardrobe grouped by category'],
        ['옷장 · 실제 앱 화면', 'Wardrobe · real app screen'],
        '2026-05-25',
        'device',
      ),
      shot(
        '/media/closetmate/voice.webp',
        560,
        993,
        ['음성으로 상황을 말하는 추천 화면', 'Describing the occasion by voice'],
        ['음성 입력 · 실제 앱 화면', 'Voice input · real app screen'],
        '2026-05-25',
        'device',
      ),
      shot(
        '/media/closetmate/stats.webp',
        560,
        967,
        ['옷장 구성, 활용률, 분류 확인이 필요한 옷 수를 보여 주는 통계 화면', 'Stats screen with the wardrobe mix, how often clothes are worn and how many labels need checking'],
        [
          '통계: 신뢰도 50% 미만 분류는 확인 필요로 표시 · 실제 앱 화면 · 시험용 옷장 데이터',
          'Stats: labels under 50% confidence are flagged for checking · real app screen · test wardrobe data',
        ],
        '2026-05-25',
        'device',
      ),
      video(
        '/media/closetmate/demo.mp4',
        '/media/closetmate/demo-poster.webp',
        540,
        1030,
        ['ClosetMate 시연 영상', 'ClosetMate demo video'],
        ['시연 · 실제 앱 화면 녹화 (2분 33초, 편집 없음)', 'Demo · real app screen recording (2 min 33 s, unedited)'],
        '2026-05-25',
        'device',
      ),
    ],
    flow: flow(
      ['사진에서 추천까지', 'From photo to suggestion'],
      ['서버 추천 코드(runner · schema · candidate_generator) 기준', 'Drawn from the server recommendation code (runner, schema, candidate_generator)'],
      [
        step('mine', ['사진 등록 (Expo 앱)', 'Add a photo (Expo app)'], ['서버 ONNX(MobileNetV3)가 종류를 분류하고, 사용자가 확인·수정', 'Server-side ONNX (MobileNetV3) labels it and the user checks or corrects it']),
        step('mine', ['옷장 저장 (PostgreSQL)', 'Saved to the wardrobe (PostgreSQL)']),
        step('mine', ['후보 코디 생성', 'Candidate outfits'], ['상황(글 또는 음성)과 옷장으로 규칙 기반 후보를 만듦', 'Rule-based candidates from the occasion (typed or spoken) and the wardrobe']),
        step('external', ['LLM이 후보 중에서 선택', 'The LLM picks from the candidates'], ['OpenAI API', 'OpenAI API']),
        step(
          'mine',
          ['서버 검증', 'Server-side check'],
          ['① 응답 형식 → ② 옷 ID가 옷장에 있는지 → ③ 후보 안의 조합인지', '① format → ② clothing IDs exist in the wardrobe → ③ the combination is one of the candidates'],
          [
            [
              ['모두 통과', 'All pass'],
              ['사용자에게 표시', 'Shown to the user'],
            ],
            [
              ['하나라도 실패', 'Any check fails'],
              ['보조 모델에 다시 받아 같은 검사, 모델과 대체 여부를 기록', 'Asks the backup model, runs the same checks, records the model and whether it fell back'],
            ],
          ],
        ),
      ],
    ),
    metrics: [
      metric(
        ['분류 추론 시간', 'Classification inference time'],
        'MobileNetV3-Small 30.83ms · ResNet50 20.45ms',
        ['이미지 1장 분류 추론 평균', 'Average inference for one image'],
        ['PyTorch, Apple M5 CPU, 224×224 무작위 입력 1장, 워밍업 5회·측정 30회', 'PyTorch on an Apple M5 CPU, one random 224×224 input, 5 warm-up and 30 measured runs'],
        'measured',
        '2026-05-25',
      ),
      metric(
        ['가중치 크기', 'Weights size'],
        '6.0MB · 90.2MB',
        ['MobileNetV3-Small · ResNet50 PyTorch 가중치 파일', 'MobileNetV3-Small · ResNet50 PyTorch weight files'],
        ['학습 결과 파일 기준', 'From the trained weight files'],
        'measured',
        '2026-05-25',
      ),
      metric(
        ['전체 흐름 확인', 'End-to-end run'],
        '43장',
        ['사진 업로드부터 추천까지', 'From photo upload to suggestion'],
        ['직접 찍은 옷 사진과 학습 데이터셋 이미지, 수동 실행 · 정확도 수치 아님', 'My own clothing photos plus dataset images, run by hand · not an accuracy figure'],
        'measured',
        '2026-05-25',
      ),
    ],
    sections: [
      section('problem', PROBLEM, [
        [
          'LLM에게 코디를 맡기면 그럴듯하지만 틀린 답이 나옵니다. 옷장에 없는 옷의 ID를 만들어 내거나, 만들 수 없는 조합을 고르기도 합니다. 그래서 LLM이 처음부터 답을 쓰게 하지 않고, 규칙으로 만든 후보 코디 중에서 고르게 한 뒤 서버에서 다시 확인하는 층을 두었습니다.',
          'Left to an LLM, outfit suggestions come out plausible but wrong: invented clothing IDs or impossible combinations. So instead of letting the LLM write an answer from scratch, I had it choose from rule-built candidate outfits and added a layer on the server that checks the answer again.',
        ],
        [
          'Expo Go에서는 기기 안에서 분류 모델을 불러올 수 없어, 분류는 서버에서 ONNX로 돌리기로 했습니다. 돈이 드는 Vision 분석은 사용자가 직접 누를 때만 호출합니다.',
          'Expo Go could not load the classification model on the phone, so classification runs on the server with ONNX. The paid Vision analysis is called only when the user taps for it.',
        ],
      ]),
      section('implementation', IMPLEMENTATION, [
        [
          'LLM 응답을 받으면 ① 응답 형식 → ② 추천한 옷 ID가 실제 옷장에 있는지 → ③ 그 조합이 미리 만든 후보에 있는지를 차례로 확인합니다. 하나라도 어긋나면 보조 모델에게 다시 받아 같은 검사를 거치고, 어떤 모델이 답했는지와 보조 모델로 넘어갔는지를 기록합니다.',
          'When the LLM responds, the server checks in order: ① the format → ② whether the recommended clothing IDs exist in the wardrobe → ③ whether the combination is among the prepared candidates. If anything is off, it asks the backup model and runs the same checks, recording which model answered and whether it fell back.',
        ],
        [
          '분류 모델은 MobileNetV3-Small과 ResNet50을 고정된 백본 위에 분류기를 얹는 방식으로 같은 조건에서 학습해 비교했습니다. CPU 추론에서는 파일이 15분의 1인 MobileNetV3가 오히려 느렸고, 이 결과를 그대로 기록했습니다.',
          'I trained MobileNetV3-Small and ResNet50 with a classifier on a frozen backbone under the same settings and compared them. On CPU, MobileNetV3, at one fifteenth of the file size, was actually slower, and I recorded that as it was.',
        ],
      ]),
      section('validation', VALIDATION, [
        [
          '직접 찍은 옷 사진과 학습 데이터셋 이미지 43장으로 사진 업로드부터 추천까지 전체 흐름을 손으로 돌려 봤습니다. 이것은 동작 확인이지 정확도 측정이 아닙니다.',
          'I ran the whole flow, from upload to suggestion, by hand with 43 images: my own clothing photos plus dataset images. This checks that it works; it does not measure accuracy.',
        ],
        [
          '학습 코드에서 검증용 변환이 적용되지 않아, 평가를 분리하고 고정된 테스트 세트로 다시 재기 전까지는 분류 정확도 숫자를 쓰지 않습니다.',
          'The training code never applied the validation transforms, so I do not report classification accuracy until evaluation is separated and re-measured on a fixed test set.',
        ],
      ]),
      section('result', RESULT, [
        [
          '사진 → 분류 → 옷장 → 후보 생성 → LLM 추천 → 검증으로 이어지는 흐름이 동작합니다. 형식이 틀렸거나 옷장에 없는 옷을 담은 응답은 사용자에게 가기 전에 걸러집니다.',
          'The flow from photo → classification → wardrobe → candidates → LLM suggestion → check works. Responses with the wrong format or with clothes that are not in the wardrobe are filtered out before they reach the user.',
        ],
      ]),
      section('retro', RETRO, [
        [
          '모델이 스스로 매긴 확신도로 결과를 거르는 부분과, API 호출 자체가 실패하면 보조 모델로 넘어가지 않는 부분을 고치겠습니다.',
          "I would fix filtering by the model's own self-rated confidence, and the case where a failed API call doesn't fall back to the backup model.",
        ],
        [
          '서버가 받은 URL을 그대로 불러오는 부분과 x-user-id 헤더만으로 사용자를 구분하는 부분은, 공개 서비스라면 가장 먼저 막아야 할 곳입니다.',
          'Fetching whatever URL the server receives, and telling users apart by the x-user-id header alone, are the first things to close off for a public service.',
        ],
      ]),
      section('evidence', EVIDENCE, [['코드는 비공개 저장소에 있습니다. 화면과 시연 영상, 측정 조건을 이 페이지에 둡니다.', 'The code is in a private repository. Screens, a demo video and the measurement conditions are on this page.']]),
    ],
  },

  // ── other featured work ───────────────────────────────────────────────────
  {
    slug: 'pitches',
    name: 'Pitches',
    years: [2024, 2026],
    tier: 'featured',
    showcase: 'other',
    title: k('Pitches 발표 코칭', 'Pitches presentation coaching'),
    product: k(
      '발표하는 동안 말 속도·감정·음량을 분석해 색으로 알려 주고, 끝나면 코칭 보고서를 만드는 서비스',
      'A service that analyzes speaking pace, emotion and volume during a talk, shows them as colors and writes a coaching report at the end',
    ),
    period: '2024.10–2026.05',
    team: k('2024 해커톤 5인 팀 → 2025 2인으로 발전 → 2026 혼자 리뉴얼', '2024 hackathon team of 5 → developed further by 2 in 2025 → renewed solo in 2026'),
    role: k('백엔드·AI (앱 UI는 팀원) · 2026 리뉴얼은 전체', 'Backend and AI (app UI by a teammate) · all of the 2026 renewal'),
    status: k('2026 리뉴얼: 실시간 피드백·사후 작업 큐까지 구현, 보고서 화면 미완성', '2026 renewal: live feedback and post-talk job queue built, report screen unfinished'),
    statusCheckedAt: '2026-10-25',
    stack: ['Flask', 'SenseVoice-Small', 'OpenAI Assistants', 'Fastify', 'Socket.IO', 'BullMQ', 'Whisper', 'Expo'],
    summary: k(
      '발표 중 말 속도와 감정을 분석해 알려 주는 코칭 서비스. 해커톤 대상과 창업 경진대회 특별상, 국제학술대회 논문으로 이어졌고 2026년에 혼자 다시 설계했습니다.',
      'A coaching service that analyzes speaking pace and emotion during a talk. It won a hackathon grand prize and a startup competition award, became an international conference paper, and I redesigned it alone in 2026.',
    ),
    image: '/images/projects/pitches.png',
    imageCaption: k('2024년 대회 제출 당시의 화면 디자인 목업', 'Screen design mockup from the 2024 competition submission'),
    media: [
      {
        kind: 'mockup',
        src: '/images/projects/pitches.png',
        width: 752,
        height: 339,
        alt: k('Pitches 앱 화면 디자인', 'Pitches app screen design'),
        caption: k('디자인 목업 · 2024년 대회 제출본 · 실제 앱 화면 아님', 'Design mockup · 2024 competition entry · not a real app screen'),
        capturedAt: '2024-10-24',
      },
    ],
    sections: [
      section(
        'problem',
        PROBLEM,
        [
          [
            '발표 중 피드백은 바로 와야 하는데, 음성을 글로 바꾸고 감정을 분석하고 LLM으로 조언을 만드는 일은 모두 무겁습니다. 한 요청 안에서 처리하면 화면이 멈춥니다.',
            'Feedback during a talk has to arrive right away, but transcription, emotion analysis and LLM advice are all heavy. Doing them in one request freezes the screen.',
          ],
          [
            '그래서 실시간 경로와 무거운 분석을 나눴습니다. 실시간에는 빠른 모델(SenseVoice-Small, 공개 벤치마크 기준 10초 음성에 70ms)을 쓰고, LLM 보고서는 발표가 끝난 뒤 한 번만 만듭니다.',
            'So I split the live path from the heavy analysis: a fast model on the live path (SenseVoice-Small, 70 ms for 10 s of audio in its public benchmark) and the LLM report once, after the talk.',
          ],
        ],
        {
          table: {
            head: [k('구분', 'Version'), k('구조', 'Architecture'), k('내 역할', 'My part'), k('상태', 'Status')],
            rows: [
              [
                k('2024–25 팀 버전', '2024–25 team version'),
                k('Flask가 녹음을 받아 백그라운드 스레드가 5초씩 SenseVoice로 분석, 앱은 결과를 다시 조회', 'Flask receives the recording; a background thread analyzes 5 s chunks with SenseVoice; the app polls for results'),
                k('백엔드·AI (앱 UI는 팀원 Flutter)', 'Backend and AI (app UI by a teammate in Flutter)'),
                k('해커톤·창업 경진대회에서 시연', 'Demonstrated at the hackathon and the startup competition'),
              ],
              [
                k('APIC-IST 2025 논문', 'APIC-IST 2025 paper'),
                k('실시간 피드백 루프 · 받아쓰기 루프 · 발표 후 보고서 루프', 'Live feedback loop · transcription loop · post-talk report loop'),
                k('공동저자 (2저자)', 'Co-author (second author)'),
                k('논문에서 제안·보고한 구조와 측정', 'Architecture and measurements as proposed and reported in the paper'),
              ],
              [
                k('2026 개인 리뉴얼', '2026 solo renewal'),
                k('Socket.IO로 0.25초 조각 전송, 서버가 5초씩 모아 실시간 음량 피드백, 발표 후 작업은 BullMQ', 'Socket.IO sends 0.25 s chunks; the server gathers 5 s for live volume feedback; post-talk jobs run on BullMQ'),
                k('전체', 'All of it'),
                k('실시간 피드백·작업 큐 동작, 보고서 화면 미완성', 'Live feedback and job queue work; report screen unfinished'),
              ],
            ],
          },
        },
      ),
      section('implementation', IMPLEMENTATION, [
        [
          '2026 버전은 발표가 끝나면 받아쓰기(Whisper)·말 속도·간투사·LLM 보고서·PDF 생성을 BullMQ 작업으로 넘깁니다. 처음 시도를 포함해 최대 2번 시도하고, 실패하면 간격을 늘려 다시 시도하며, 동시에 2개까지 처리합니다.',
          'In the 2026 version, transcription (Whisper), speaking rate, filler words, the LLM report and PDF generation become BullMQ jobs after the talk: at most 2 attempts including the first, a growing delay between retries, and up to 2 jobs at once.',
        ],
        [
          'Whisper가 날것의 음성 데이터를 받지 않아 WAV 헤더를 직접 만들어 붙였고, iOS에서 녹음이 시작되지 않던 오류는 오디오 세션을 켜는 순서를 바꿔 해결했습니다.',
          "Whisper wouldn't take raw audio data, so I built and attached the WAV header myself; recording that wouldn't start on iOS was fixed by changing the order in which the audio session is turned on.",
        ],
      ]),
      section('validation', VALIDATION, [
        [
          '팀 버전은 해커톤과 창업 경진대회에서 시연했습니다. 2026 버전은 iOS 시뮬레이터 빌드까지 확인했고 자동 테스트는 없습니다.',
          'The team version was demonstrated at the hackathon and the startup competition. The 2026 version was checked as far as an iOS simulator build and has no automated tests.',
        ],
      ]),
      section('result', RESULT, [
        [
          '팀 버전으로 캡스톤 디자인 및 AI 해커톤 대상(2024.10)과 SW중심대학 AI 창업 아이디어 경진대회 특별상(2025.05)을 받았고, APIC-IST 2025에서 논문을 발표했습니다.',
          'The team version won the grand prize at the Capstone Design & AI Hackathon (Oct 2024) and a special award at the SW-Centered University AI Startup Idea Competition (May 2025), and was presented as a paper at APIC-IST 2025.',
        ],
      ]),
      section('paper', ['논문 — APIC-IST 2025', 'Paper: APIC-IST 2025'], [
        [
          '"Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI" — APIC-IST 2025, 공동저자(2저자). 아래는 논문에서 보고한 내용이며 위의 코드 설명과 구분합니다.',
          '"Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI": APIC-IST 2025, co-author (second author). What follows is what the paper reported, kept apart from the code above.',
        ],
        [
          '모델 선택: 10초 음성 처리 시간이 Whisper-Small 518ms, Whisper-Large-V3 1,281ms, SenseVoice-Small 70ms(SenseVoice 공개 벤치마크 인용).',
          "Model choice: 10 s of audio takes 518 ms with Whisper-Small, 1,281 ms with Whisper-Large-V3 and 70 ms with SenseVoice-Small (citing SenseVoice's public benchmark).",
        ],
        [
          '측정: 말에서 화면 표시까지 평균 125ms(σ=18ms), 동시 20세션에서 최악 170ms. 다국어 시험(5명)과 사용자 설문(5명)을 함께 보고했습니다.',
          'Measurements: 125 ms on average from speech to on-screen display (σ = 18 ms), 170 ms at worst with 20 concurrent sessions, with a multilingual test (5 people) and a user survey (5 people).',
        ],
      ]),
      section('retro', RETRO, [
        [
          '2026 버전은 재시도할 때 받아쓰기와 LLM을 처음부터 다시 부르므로 비용이 겹칠 수 있습니다. 작업 단계마다 상태를 남겨 끝난 단계는 건너뛰게 하겠습니다.',
          'On a retry the 2026 version calls transcription and the LLM again from the start, so costs can double. I would record each step so finished steps are skipped.',
        ],
        [
          '2024 버전의 말 속도는 띄어쓰기 단위로 세어 한국어에서는 정확하지 않습니다.',
          "The 2024 version counts speaking rate by spaces between words, so it isn't exact for Korean.",
        ],
      ]),
      section('evidence', EVIDENCE, [
        [
          '2024·2026 코드는 비공개 저장소에 있습니다. 논문은 APIC-IST 2025 발표 논문입니다.',
          'The 2024 and 2026 code are in private repositories. The paper was presented at APIC-IST 2025.',
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
      '네이버 검색어 트렌드 API가 비율만 주자, 광고 API의 실제 월간 검색 수를 기준점으로 엮어 월별 검색량을 추정해 차트로 보여 준 첫 웹 서비스.',
      'My first web service: the Naver search trend API gave only ratios, so I anchored them to the ad API’s real monthly search counts to estimate monthly volumes and chart them.',
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
      '시니어가 일상 대화를 나누는 동안 우울 척도(GDS) 문항을 대화 속에서 끌어내는 음성 챗봇. 2024 한신 AISW 페스티벌 일반부 특별상, 2025 한국디지털콘텐츠학회 하계 1저자 논문.',
      'A voice chatbot that draws Geriatric Depression Scale questions out of everyday conversation with seniors. Special Award at the 2024 Hanshin AISW Festival; first-author paper at the 2025 Korea Digital Contents Society summer conference.',
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
      '동해안 10개 시·군의 2022–2024년 시간 단위 데이터 21만여 행에 날씨·공식 산불위험지수·관광객 수·공휴일과 축제를 엮은 다요인 산불 위험 모델. 실제 화재가 드물어 목표를 공식 위험 등급으로 두고, 실제 화재일과의 일치는 따로 확인했습니다.',
      'A multi-factor wildfire risk model joining over 210,000 hourly rows (2022–2024) for 10 east-coast cities and counties with weather, the official risk index, tourist numbers, holidays and festivals. Actual fires are rare, so the target is the official risk level, checked separately against actual fire days.',
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
      '수준 진단 퀴즈로 시작해 학습 달력, 주간·분야별 퀴즈와 리포트로 이어지는 학습 플랫폼. 느린 AI 호출에 같은 요청이 겹치지 않도록 앱과 서버(429)에서 함께 막았습니다. 한국디지털콘텐츠학회 논문 2편.',
      'A learning platform from a placement quiz to a study calendar, weekly and per-topic quizzes and reports. Duplicate requests on slow AI calls are blocked in the app and on the server (429). Two Korea Digital Contents Society papers.',
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
      '이력서와 직무에 맞춘 면접 질문을 만들고, 답변을 Whisper로 받아 적어 꼬리 질문을 이어 가는 모의 면접 서비스. 브라우저 WebM 녹음은 서버에서 ffmpeg로 WAV로 바꿔 넘겼습니다.',
      'A mock-interview service that writes questions for your résumé and role, transcribes answers with Whisper and asks follow-ups. Browser WebM recordings are converted to WAV with ffmpeg on the server.',
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
      '"AI가 개발자를 대체한다"는 뉴스 담론이 실제 채용 공고(점핏·원티드)의 요구 역량과 맞는지 비교한 연구. 링크드인 글로벌 공고와의 비교 분석을 맡았고, 데이터가 받쳐 주지 않는 주장은 낮춰 적었습니다.',
      "A study comparing the news narrative that \"AI will replace developers\" with the skills real job postings ask for (Jumpit, Wanted). I handled the comparison with global LinkedIn postings and toned down claims the data didn't support.",
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
      'Mac 안에서만 도는 홀로그램 비서 실험. 손동작으로 화면을 다루고, 말로 묻고 답을 듣습니다. 로컬 LLM 답을 문장 단위로 끊어 나오는 대로 읽게 했습니다.',
      'A holographic assistant experiment that runs entirely on a Mac: hand gestures to work the screen, questions asked out loud. The local LLM’s answer is read aloud sentence by sentence as it arrives.',
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
      '배운 것을 글로 남기는 기술 블로그. 글 메타데이터가 틀리면 빌드 전에 zod 검사로 멈추게 했습니다.',
      'A tech blog where I write down what I learn. Wrong post metadata stops the build through a zod check before it ships.',
    ),
    links: [{ kind: 'site', label: k('junyoung-dev-notes.vercel.app', 'junyoung-dev-notes.vercel.app'), href: 'https://junyoung-dev-notes.vercel.app' }],
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
    summary: k('특허법·통계 문서를 근거로 답하는 AI 변리사 챗봇 프로토타입.', 'A prototype AI patent-attorney chatbot that answers from patent law and statistics documents.'),
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
