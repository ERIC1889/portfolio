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
    slug: 'finz',
    name: 'Finz',
    years: [2026],
    tier: 'featured',
    showcase: 'flagship',
    title: k('Finz 개인 세금 계산기', 'Finz personal tax calculators'),
    product: k(
      '부동산 6Way 비교, 디지털 자산 세금, 해외주식 양도세·증여 평가를 회원가입 없이 계산하고, 계산마다 세법 조문 근거를 함께 보여 주는 웹 서비스',
      'A web service that works out tax on disposing of two homes (6Way), on digital assets and on foreign stocks (capital gains and gift valuation) without sign-up, citing the statute behind each step',
    ),
    audience: k('집·가상자산·해외주식을 가진 개인', 'Individuals with homes, crypto or foreign stocks'),
    period: '2026.04–',
    team: k('주식회사 Finz Labs (직원 5명) · 유일한 개발자', 'Finz Labs (five people) · the only developer'),
    role: k('설계·개발·운영 (직함 CTO)', 'Design, build and operation (title: CTO)'),
    status: k('운영 중 (finz.kr)', 'Live (finz.kr)'),
    statusCheckedAt: '2026-10-29',
    stack: ['Next.js', 'TypeScript', 'React', 'Vitest'],
    summary: k(
      '부동산·디지털 자산·해외주식 세금 계산기가 있는 회사 웹 finz.kr을 혼자 설계·개발·운영하고, Finz 모바일 앱(청년 세금 환급 MVP 등)을 만들었습니다.',
      'I designed, built and run the company website finz.kr on my own, with its property, digital-asset and foreign-stock tax calculators, and built the Finz mobile app (a tax refund MVP and more).',
    ),
    features: pairs([
      [
        '해외주식 양도세 엔진: 매수·매도를 각자의 결제일 환율로 원화 환산하고, 이익을 주가로 생긴 몫과 환율로 생긴 몫으로 나눔. 증여 평가(전후 2개월 평균 종가)와 증여세 추정까지',
        'Foreign-stock capital gains engine: each buy and sell converted at its own settlement-date rate, with the gain split into a stock-price part and an exchange-rate part; plus gift valuation (two-month average close) and a gift-tax estimate',
      ],
      [
        '시세·환율 데이터 계층: Upbit→CoinGecko, 한국은행 ECOS→ECB로 대체 조회하고, 확정된 값만 오래 캐시하며 사용자별·전체 요청을 제한',
        'Market-data layer: Upbit→CoinGecko and Bank of Korea ECOS→ECB fallbacks, long caching only for settled values, and per-user plus global rate limits',
      ],
      [
        '부동산 6Way: 세무사와 함께 Python으로 작성한 계산 로직을 TypeScript로 옮기고, 국토교통부 실거래가 조회와 PDF 리포트를 붙임',
        'Property 6Way: the tax logic written in Python with a tax accountant, ported to TypeScript, with real-transaction price lookup and a PDF report',
      ],
      [
        '디지털 자산: 회사 세무 SaaS의 가상자산 계산 엔진을 개인용으로 옮겨 과세연도 판정, 시가가 없을 때의 보수적 대체값, 쉬운 오류 문구를 붙임',
        'Digital assets: the company SaaS’s crypto tax engine adapted for individuals, with tax-year filtering, a cautious fallback when a price is missing and plain-language errors',
      ],
    ]),
    contribution: {
      direct: pairs([
        [
          '회사 웹 finz.kr 전체: 화면, 계산 라이브러리, 시세·환율·실거래가 연동, API (2026.04–)',
          'All of the company website finz.kr: screens, calculation library, market-data and price integrations, API (2026.04–)',
        ],
        [
          '해외주식 양도세 엔진과 증여세 추정, 시세·환율 데이터 계층, 부동산 6Way 엔진과 PDF 리포트',
          'The foreign-stock capital gains engine and gift-tax estimate, the market-data layer, the property 6Way engine and its PDF report',
        ],
        [
          '디지털 자산 엔진·증여 평가 모듈: 회사 세무 SaaS의 코드를 개인용으로 옮기고 연도 판정·대체값·오류 문구를 더함',
          'Digital-asset engine and gift valuation module: company SaaS code adapted for individuals, adding tax-year filtering, fallbacks and plain-language errors',
        ],
        ['Finz 모바일 앱과 백엔드 (Expo · FastAPI, 미출시)', 'The Finz mobile app and its backend (Expo · FastAPI, not released)'],
        [
          '세무사용 FINZ: 가격 정책·기능 잠금 범위 사양, 개발사 작업 269건 재검증, 배포 장애 원인 분석',
          'FINZ for tax accountants: the pricing and feature-lock spec, re-verifying 269 vendor items, the deployment-failure root cause',
        ],
      ]),
      joint: pairs([
        ['세금 계산 로직 정리 (세무사와 함께)', 'Working out the tax logic (with a tax accountant)'],
        [
          '세무사용 FINZ의 세금 계산 엔진 초안, 외부 API 연동, 배포·운영 방식, 개발 도구 (협력 개발사와 함께)',
          'For FINZ for tax accountants: the tax-engine draft, external API integrations, the deployment and operations approach and the development tools (with the partner developer)',
        ],
      ]),
      verified: pairs([
        [
          '기준 워크북 사례와 대조: 6Way 웹 API 21개 항목, Python 엔진 테스트 43개',
          'Checked against a reference workbook case: 21 items through the 6Way web API, 43 tests on the Python engine',
        ],
        [
          '운영 중인 웹 저장소 테스트 184개 통과: 계산 엔진 53개(가상자산 25·해외주식 28), 시세·환율 데이터 소스 31개 포함',
          'All 184 tests in the live website’s repository pass, including 53 calculation-engine tests (crypto 25, foreign stocks 28) and 31 market-data tests',
        ],
      ]),
      notYet: pairs([
        ['사용자 수 같은 운영 지표는 집계하지 않음', 'No usage metrics such as user counts are collected'],
        ['디지털 자산·해외주식 결과는 PDF로 내보내지 않음', 'Digital-asset and foreign-stock results are not exported to PDF'],
      ]),
    },
    media: [
      video(
        '/media/finz/web-demo.mp4',
        '/media/finz/web-demo-poster.webp',
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
        '/media/finz/web-crypto.webp',
        1600,
        1449,
        ['가상자산 매수·매도 거래를 입력하고 2027년 예상 세금을 계산한 화면', 'Crypto buys and sells entered, with the 2027 tax estimate'],
        ['디지털 자산 세금 계산기 · 운영 사이트 실제 화면 · 사이트 예시 입력', 'Digital-asset tax calculator · live site · the site’s own sample input'],
        '2026-10-29',
      ),
      shot(
        '/media/finz/web-stock.webp',
        1600,
        1409,
        ['결제일 환율로 해외주식 양도세를 계산하고 이익을 주가 몫과 환율 몫으로 나눈 화면', 'Foreign-stock gains converted at settlement-date rates and split into price and currency effects'],
        ['해외주식 양도세 계산기 · 운영 사이트 실제 화면 · 사이트 예시 입력', 'Foreign-stock capital gains calculator · live site · the site’s own sample input'],
        '2026-10-29',
      ),
      shot(
        '/media/finz/web-stock-gift.webp',
        1600,
        1483,
        ['증여일 전후 2개월 평균 종가로 해외주식 증여 평가액과 증여세를 계산한 화면', 'Gift value of a foreign stock from the two-month average close, with the gift tax'],
        ['해외주식 증여 평가 계산기 · 운영 사이트 실제 화면 · 사이트 예시 입력', 'Foreign-stock gift valuation calculator · live site · the site’s own sample input'],
        '2026-10-29',
      ),
      shot(
        '/media/finz/web-six-way.webp',
        1600,
        956,
        ['여섯 가지 처분 방법별 중과 유예 전후 세금 비교', 'Tax for the six options before and after the surcharge grace period'],
        ['여섯 가지 경우 비교 · 운영 사이트 실제 화면 · 예시 입력', 'Six-way comparison · live site · sample input'],
        '2026-10-29',
      ),
    ],
    flow: flow(
      ['입력부터 결과까지', 'From input to result'],
      [
        '운영 중인 finz.kr 코드 기준. 검증 스크립트는 6Way 계산 API에 기준 사례를 넣어 워크북 기대값과 비교합니다.',
        'Drawn from the code running on finz.kr. The verification script sends the reference case to the 6Way calculation API and compares it with the workbook’s expected values.',
      ],
      [
        step(
          'mine',
          ['입력', 'Input'],
          ['주택 두 채 · 가상자산 거래 · 해외주식 종목. 시세·환율은 날짜로 자동 채우되 직접 입력한 값은 덮어쓰지 않음', 'Two homes · crypto trades · foreign stocks; prices and rates fill in by date but never overwrite what the user typed'],
        ),
        step(
          'mine',
          ['시세·환율·실거래가 API (Next.js)', 'Market-data API routes (Next.js)'],
          ['실패하면 대체 출처로 조회하고 그 값에 표시를 남김. 확정된 값만 오래 캐시, 사용자별·전체 요청 제한', 'Falls back to a second source and marks the value; caches only settled values for long; per-user and global rate limits'],
        ),
        step('external', ['외부 데이터', 'External data'], ['Upbit · CoinGecko · 한국은행 ECOS · ECB · Yahoo Finance · 국토교통부 실거래가', 'Upbit · CoinGecko · Bank of Korea ECOS · ECB · Yahoo Finance · land ministry prices']),
        step(
          'mine',
          ['TypeScript 계산 엔진', 'TypeScript calculation engines'],
          ['6Way · 가상자산 · 해외주식 양도세 · 증여 평가. 결과마다 세법 조문 근거', '6Way · crypto · foreign-stock gains · gift valuation, each result with its statute'],
        ),
        step('mine', ['결과 화면 · PDF', 'Results · PDF'], ['계산 근거를 펼쳐 볼 수 있는 결과 화면, 6Way는 인쇄용 PDF 리포트', 'Results with the reasoning one tap away; a printable PDF report for 6Way']),
      ],
    ),
    metrics: [
      metric(
        ['기준 워크북 대조 (6Way 웹 API)', 'Reference workbook check (6Way web API)'],
        '21/21',
        ['실제 2주택 사례 1건: 6가지 경우의 중과 전·후 합계와 증가분, 집계 3개', 'One real two-home case: before/after totals and increase for six options, plus three aggregates'],
        ['단계마다 원 미만 절사, ±10원 허용 · 최대 차이 1원', 'Fractions of a won dropped at each step, ±10 won allowed · largest gap 1 won'],
        'measured',
        '2026-10-29',
      ),
      metric(
        ['운영 웹 저장소 테스트', 'Live website repository tests'],
        '184 통과',
        [
          '계산 엔진 53개(가상자산 25 · 해외주식 28, 익명화한 실제 증여 사례 포함), 시세·환율 데이터 소스 31개, 화면·입력 변환 등',
          'Calculation engines 53 (crypto 25 · foreign stocks 28, including an anonymised real gift case), market-data sources 31, plus screens and input mapping',
        ],
        ['Vitest, 외부 API는 모의 응답, 로컬 실행', 'Vitest with mocked external APIs, run locally'],
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
      { kind: 'live', label: k('개인 세금 계산기 열기', 'Open the calculators'), href: 'https://www.finz.kr/personal' },
      { kind: 'live', label: k('디지털 자산 계산기', 'Digital-asset calculator'), href: 'https://www.finz.kr/personal/digital-asset/calculator' },
      { kind: 'live', label: k('해외주식 양도세 계산기', 'Foreign-stock gains calculator'), href: 'https://www.finz.kr/personal/foreign-stock/capital-gains' },
      { kind: 'live', label: k('해외주식 증여 평가 계산기', 'Foreign-stock gift valuation'), href: 'https://www.finz.kr/personal/foreign-stock/valuation' },
      { kind: 'live', label: k('부동산 6Way', 'Property 6Way'), href: 'https://www.finz.kr/personal/property' },
      { kind: 'site', label: k('회사 웹 finz.kr', 'Company website finz.kr'), href: 'https://www.finz.kr' },
    ],
    sections: [
      section('problem', PROBLEM, [
        [
          '세무를 잘 모르는 사람이 쓰는 계산기라 결과 숫자 하나가 큰 결정을 바꿉니다. 화면이 뜨는 것보다 숫자가 맞는 것과, 그 숫자가 어느 조문에서 나왔는지 보여 주는 것이 먼저였습니다.',
          'People who know little about tax use these calculators, so one number can change a big decision. Getting the numbers right, and showing which statute each one comes from, came before getting the screens up.',
        ],
        [
          '세금은 날짜에 따라 달라집니다. 가상자산은 2027년부터 과세되고 2026-12-31 시가가 취득가액이 될 수 있으며, 해외주식은 결제일 환율로 원화 환산합니다. 그런데 그날의 시세·환율을 주는 외부 API는 느리거나 실패하고, 아직 오지 않은 날짜에는 값이 없습니다.',
          'Tax depends on dates. Crypto is taxed from 2027 and the 2026-12-31 price can become the cost basis; foreign stocks convert at settlement-date exchange rates. But the APIs that supply those prices and rates are slow or fail, and a date that hasn’t come yet has no value at all.',
        ],
        [
          '6Way 계산 로직은 세무사와 함께 Python으로 작성해 두었고, 웹에서 바로 쓰려고 TypeScript로 옮긴 뒤 원본과 같은 결과를 내는지 기준 사례로 확인하기로 했습니다.',
          'The 6Way logic had been written in Python together with a tax accountant; I ported it to TypeScript for the website and decided to prove with a reference case that it gives the same results.',
        ],
      ]),
      section('implementation', IMPLEMENTATION, [
        [
          '해외주식 양도세는 매수·매도를 각자의 결제일 환율로 원화 환산해 원 미만을 버리고, 이익을 주가로 생긴 몫과 환율로 생긴 몫으로 나눠 보여 줍니다. 신고 기한은 다음 해 5월 31일(주말·공휴일이면 그다음 평일)로 계산합니다.',
          'Foreign-stock gains convert each buy and sell at its own settlement-date rate, truncated to the won, and show the gain split into a stock-price part and an exchange-rate part. The filing deadline is worked out as 31 May of the next year, moved past weekends and holidays.',
        ],
        [
          '증여는 증여일 앞뒤 2개월 종가 평균을 증여일 환율로 환산해 평가하고(자동 조회·시세표 붙여넣기·평균 직접 입력), 받는 사람별 공제·10년 합산·신고세액공제로 증여세를 추정합니다.',
          'A gift is valued at the average close over the two months either side of the gift date, converted at the gift-date rate (looked up, pasted from a price table or typed in), and the gift tax is estimated with relationship-based deductions, 10-year aggregation and the filing credit.',
        ],
        [
          '디지털 자산은 회사 세무 SaaS의 가상자산 계산 엔진을 개인용으로 옮겼습니다. 판 날짜로 과세연도를 정하고, 2026-12-31 시가를 아직 조회할 수 없으면 실제 산 가격을 쓰는 보수적인 쪽을 택해 화면에 알리며, 엔진 오류는 쉬운 문장으로 바꿔 보여 줍니다.',
          'For digital assets I adapted the company SaaS’s crypto tax engine for individuals: the tax year comes from the sale date, a missing 2026-12-31 price falls back to the actual cost (the cautious choice) with a note on screen, and engine errors are rewritten in plain language.',
        ],
        [
          '시세는 Upbit 1분봉을 먼저 쓰고 실패하면 CoinGecko로, 환율은 한국은행 ECOS를 먼저 쓰고 실패하면 ECB 기준환율로 대체합니다. 대체한 값에는 표시를 남겨 캐시하지 않거나 짧게만 두고, 해외주식 종가는 기간이 모두 끝나고 거래일이 충분할 때만 캐시합니다. 아직 오지 않은 날짜는 외부를 부르지 않고 바로 거절합니다.',
          'Prices come from Upbit 1-minute candles, falling back to CoinGecko; rates from the Bank of Korea ECOS, falling back to the ECB reference rate. Fallback values are marked and cached briefly or not at all, foreign-stock closes are cached only when the range is closed and complete, and a date that hasn’t come yet is refused without calling out.',
        ],
        [
          '부동산 6Way는 A·B 주택마다 양도·증여·부담부증여를 계산해 여섯 가지 경우를 만들고, 각 경우를 중과 유예 전과 후 규칙으로 따로 계산합니다. 실거래가는 12시간 단위로 다시 확인하고 월별로 동시에 불러오며, 인증키가 인코딩되면 실패해 URL을 직접 조립했습니다. PDF는 숨긴 iframe에 리포트를 그린 뒤 브라우저 인쇄로 저장합니다.',
          'Property 6Way builds six options (sale, gift, gift with debt for homes A and B) and computes each under the rules before and after the grace period. Real-transaction prices are re-checked every 12 hours and loaded month by month in parallel, with the URL assembled by hand because an encoded key failed. The PDF is a report drawn in a hidden iframe and saved through the print dialog.',
        ],
      ]),
      section(
        'implementation',
        ['같은 회사의 다른 작업 · Finz 모바일 앱 (청년 세금 환급 MVP, 미출시)', 'Also at Finz Labs · Finz mobile app (tax refund MVP, not released)'],
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
            '인증 한 번으로 얻은 세션을 연도별 조회에 다시 쓰고, 조회는 3초 간격으로 하나씩 보냅니다. 같은 요청이 겹쳤다는 오류가 오면 5초, 10초를 기다렸다 다시 시도합니다. 기다리는 동안에는 진행 화면을 보여 줍니다. CODEF로 조회한 소득 자료는 서버 DB에 저장하지 않고 계산에만 씁니다.',
            'The session from a single authentication is reused for every yearly query, and the queries go out one at a time, 3 seconds apart. If an error says identical requests overlapped, it waits 5 seconds, then 10, and tries again. Meanwhile a progress screen is shown. Income records fetched through CODEF are not stored in the server database and are used only for the calculation.',
          ],
          [
            '결제(토스페이먼츠)를 요청한 사람이 실제 의뢰의 주인인지, 금액과 이미 결제됐는지를 서버에서 다시 확인합니다. 사용자·세무사·관리자마다 다른 화면을 보여 주지만, 실제 권한 검사는 서버가 합니다.',
            'For payments (Toss Payments), the server re-checks that the person paying owns the request, the amount, and whether it has already been paid. Users, tax accountants and admins see different screens, but the real permission checks happen on the server.',
          ],
          [
            '같은 백엔드에서 실거래가 데이터는 Celery Beat로 매주 월요일 조정대상지역 전체를 동기화하고, 실패하면 시간을 두고 다시 시도합니다. 보안 테스트는 GitHub Actions에서 push마다 실행됩니다.',
            'In the same backend, Celery Beat syncs real-transaction prices for every regulated area each Monday and retries after a delay on failure. The security tests run in GitHub Actions on every push.',
          ],
          [
            '같은 앱에서 세무사 목록 → 의뢰 → 서류 업로드 → 채팅(5초 간격 갱신) → 결제로 이어지는 세무사 상담 연결을 실제 백엔드 API로 만들었습니다.',
            'In the same app I built the tax-accountant connection on the real backend API: accountant list → request → document upload → chat (refreshed every 5 s) → payment.',
          ],
          [
            '생애주기 금융 기능(금융 교육 퀴즈, 모의투자, 소비·자산 대시보드, 금융 상품 비교)은 예시 데이터로 동작하는 시연 화면입니다. 상품 비교의 검색은 입력한 문장에서 상품 종류·기간·정렬 조건을 뽑아내는 규칙 기반 파서로 만들었습니다.',
            'The life-stage finance features (a financial-literacy quiz, mock investing, a spending and assets dashboard, financial product comparison) are demo screens running on example data; the product search is a rule-based parser that pulls the product type, term and sort order out of a typed sentence.',
          ],
        ],
        {
          anchor: 'refund-app',
          media: [
            video(
              '/media/finz/app-demo.mp4',
              '/media/finz/app-demo-poster.webp',
              1280,
              720,
              ['청년 소득세 환급 앱 시연 영상', 'Tax refund app demo video'],
              [
                '청년 소득세 환급 · 앱 실제 화면을 단계별 설명과 함께 편집한 영상 (1분 45초, 예시 데이터)',
                'Tax refund for young people · real app screens edited with step captions (1 min 45 s, sample data)',
              ],
              '2026-09-10',
            ),
          ],
        },
      ),
      section(
        'implementation',
        ['같은 회사의 다른 작업 · 세무사용 FINZ (협력 개발사와 함께, 출시 전)', 'Also at Finz Labs · FINZ for tax accountants (with a partner company, not yet launched)'],
        [
          [
            '세무사용 FINZ는 양도·증여·상속·종부세 계산, 홈택스 신고 파일 생성, AI 세무 어시스턴트를 갖춘 세무사용 SaaS로, 협력 개발사와 함께 개발했습니다. 저는 회사 쪽 기술 책임자로 세금 계산 엔진 초안과 외부 API 연동, 배포·운영 방식, 개발 도구를 개발사와 함께 정하며 개발에 참여했고, 사양 작성과 검증, 장애 원인 분석을 맡았습니다.',
            'FINZ for tax accountants is a SaaS that calculates capital gains, gift, inheritance and comprehensive property tax, produces Hometax filing files and has an AI tax assistant, developed together with a partner development company. As the company-side technical lead I took part in development, deciding the tax-engine draft, external API integrations, the deployment and operations approach and the development tools together with the vendor, and I wrote the specs, verified the work and found the causes of failures.',
          ],
          [
            '세무사는 고객과 신고건을 만든 뒤 자료를 모읍니다. 시세는 국토교통부 실거래가로 채우고, 등기부·건축물대장은 공공조회로, 감정평가서·매매계약서 같은 서류는 스캔본 OCR로 불러오며(추출값은 검수한 뒤에만 계산기에 들어감), 세대 구성과 과거 양도 이력은 고객 간편인증으로 조회합니다.',
            'A tax accountant opens a client and a filing, then gathers the facts: market prices from the land ministry’s transaction data, the property register and building ledger through public lookups, appraisals and contracts through scanned-document OCR (extracted values reach the calculator only after review), and the household and past sales through the client’s simple authentication.',
          ],
          [
            '신고는 양도소득세 4단계 위저드(양도인 → 자산 → 양수인 → 세액·전자신고)와 주식 양도·증여·상속·종합부동산세·주식평가 화면에서 만들고, 홈택스 전자신고 파일로 내보냅니다. AI 세무 어시스턴트는 문장 하나로 조회와 계산을 이어 주지만 세무사가 검토·확정해야 문서가 만들어지고, 법령 개정 모니터는 엔진이 참조하는 17개 법령·시행령의 시행일을 법제처와 대조해 바뀐 것을 보정 대상으로 표시합니다.',
            'Filings are built in a four-step capital gains wizard (seller → assets → buyer → tax and e-filing) and in the stock-sale, gift, inheritance, comprehensive property tax and share-valuation screens, then exported as Hometax e-filing files. The AI tax assistant chains lookups and calculations from a single sentence, but a document is produced only after the accountant reviews and confirms it; a law-change monitor compares the effective dates of the 17 statutes and decrees the engine relies on with the Ministry of Government Legislation and flags anything that changed.',
          ],
          [
            '배포가 9번 잇달아 실패했을 때, 블록체인 라이브러리 도입 전후를 같은 방법으로 재어 타입 검사 메모리가 1,083MB에서 1,472MB로 36% 늘어난 것(검사 대상 파일 2,619 → 3,619개)을 확인했습니다. 서버와 같은 메모리 상한(973MB)에서 오류를 재현해 코드 결함이 아니라 서버 메모리 부족이 원인임을 밝혔고, 두 가지 해결책을 시험해 8GB 서버나 CI에서 이미지를 빌드하는 방식을 권했습니다. 개발사는 진단이 맞다고 확인하고, 실패한 배포가 서비스를 멈추지 않도록 바꿨습니다.',
            'When nine deployments failed in a row, I measured before and after the blockchain library arrived and found type-check memory up 36%, from 1,083 MB to 1,472 MB (files checked: 2,619 → 3,619). Reproducing the crash under the server’s 973 MB heap cap showed the cause was server memory, not a code defect; I tested two fixes and recommended an 8 GB server or building images in CI. The vendor confirmed the diagnosis and changed deployment so a failed build no longer takes the service down.',
          ],
          [
            '개발사가 완료했다고 한 269건을 코드·테스트·화면 근거로 하나씩 다시 확인해 233건을 확인하고 36건은 미완료로 남겼으며(PR 참조 317개 대조), 새 결함 45건을 찾았습니다. 그중 2건은 출시 전에 막아야 할 결함(결제·요금제 잠금)이었고, 기준시가가 비어 있는 필지가 경고 없이 세액 계산에서 빠져 세액이 약 973만 원 적게 나오는 High 결함은 원인 코드 위치까지 찾아 1순위 수정 요청으로 넘겼습니다.',
            'I re-checked, one by one against code, tests and screens, the 269 items the vendor reported as done: 233 confirmed and 36 left open (317 PR references cross-checked), plus 45 new defects. Two had to be fixed before launch (payment and plan locking); for a High defect, where a parcel with no standard price was silently dropped from the tax and understated it by about ₩9.73 million, I traced the exact code and sent it as the top fix request.',
          ],
          [
            '문서 인식(OCR) 현장 시험(서류 11종, 17개 파일)에서 인식이 끊기는 원인을 출력 토큰 상한(1,200)으로 짚었고, 개발사는 상한을 8,000으로 올리며 코드 주석에 그 진단을 남겼습니다. CI가 실제로 계산 오류를 잡는지 한 줄짜리 버그 7개를 심어 7개 모두 걸리는 것을 확인했고, 제가 쓴 가격 정책·기능 잠금 범위 사양은 그대로 구현되어 코드에 출처로 남았습니다.',
            'In an OCR field test (11 document types, 17 files) I traced incomplete recognition to the output-token cap (1,200); the vendor raised it to 8,000 and credited the diagnosis in a code comment. I planted seven one-line bugs to see whether CI really catches calculation errors, and it caught all seven; my pricing and feature-lock spec was implemented as written and is cited as the source in the code.',
          ],
        ],
        {
          anchor: 'finz-saas',
          media: [
            shot(
              '/media/finz/saas-assistant.webp',
              1600,
              836,
              ['자연어로 케이스를 입력하면 오른쪽 작업 타임라인에 조회·계산 과정이 쌓이는 AI 세무 어시스턴트', 'AI tax assistant: a case typed in plain language, with lookups and calculations collecting in the task timeline'],
              ['세무사용 FINZ · AI 세무 어시스턴트 · 개발 서버 실제 화면(시연용 가명 데이터)', 'FINZ for tax accountants · AI tax assistant · real screen on the development server (demo pseudonyms)'],
              '2026-10-12',
            ),
            shot(
              '/media/finz/saas-wizard.webp',
              1600,
              836,
              ['양도인 → 자산 → 양수인 → 세액·전자신고로 이어지는 양도소득세 신고 위저드', 'Capital gains filing wizard: seller → assets → buyer → tax and e-filing'],
              ['양도소득세 신고 4단계 위저드 · 개발 서버 실제 화면(시연용 가명 데이터)', 'Four-step capital gains filing wizard · real screen on the development server (demo pseudonyms)'],
              '2026-10-12',
            ),
            shot(
              '/media/finz/saas-documents.webp',
              1600,
              836,
              ['등기부·건축물대장은 공공조회, 감정평가서·매매계약서는 스캔본 OCR로 불러오는 화면', 'Loading documents: public lookups for the register and building ledger, OCR for appraisals and contracts'],
              ['서류 불러오기(공공조회·OCR) · 개발 서버 실제 화면', 'Document loading (public lookup and OCR) · real screen on the development server'],
              '2026-10-12',
            ),
            shot(
              '/media/finz/saas-calculator.webp',
              1600,
              836,
              ['단일자산·1세대1주택·지분양도·공동명의 등 경우별 탭이 있는 부동산 양도세 계산 화면', 'Property capital gains calculator with tabs for each case: single asset, one-home household, partial share, joint ownership'],
              ['부동산 양도세 계산기 · 개발 서버 실제 화면(시연용 가명 데이터)', 'Property capital gains calculator · real screen on the development server (demo pseudonyms)'],
              '2026-10-12',
            ),
            shot(
              '/media/finz/saas-law-monitor.webp',
              1600,
              836,
              ['엔진이 참조하는 17개 법령·시행령의 시행일을 법제처와 대조하는 화면', 'Checking the effective dates of the 17 statutes and decrees the engine relies on'],
              ['법령 개정 모니터 · 개발 서버 실제 화면', 'Law-change monitor · real screen on the development server'],
              '2026-10-12',
            ),
          ],
        },
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
          [
            '운영 중인 웹 저장소의 테스트 184개가 모두 통과합니다. 가상자산 엔진 25개, 해외주식 엔진 28개(익명화한 실제 증여 사례를 원 단위로 맞추는 검사 포함), 시세·환율 데이터 소스 31개가 들어 있고, 외부 API는 모의 응답으로 대신해 네트워크 없이 돕니다.',
            'All 184 tests in the live website’s repository pass: 25 for the crypto engine, 28 for the foreign-stock engines (including checks that match an anonymised real gift case to the won) and 31 for the market-data sources, with external APIs mocked so they run offline.',
          ],
        ],
        { anchor: 'validation' },
      ),
      section('result', RESULT, [
        [
          '부동산 6Way, 디지털 자산, 해외주식 양도세·증여 평가 계산기가 finz.kr에서 운영 중입니다. 사용자 수 같은 운영 지표는 집계하지 않아 적지 않습니다.',
          'The property 6Way, digital-asset and foreign-stock gains and gift-valuation calculators are live at finz.kr. No usage metrics such as user counts are collected, so none are given.',
        ],
        [
          'Finz 앱(청년 세금 환급·부동산 6Way)으로 출품한 2026 AI-SW중심대학 AI·블록체인 비즈니스모델 경진대회에서 우수상을 받았습니다(2026.05).',
          'The Finz app (youth tax refund and property 6Way) won an Excellence Award at the 2026 AI-SW-Centered University AI & Blockchain Business Model Competition (May 2026).',
        ],
      ]),
      section('retro', RETRO, [
        [
          '기준 사례가 하나뿐입니다. 경계값·반올림·잘못된 입력 사례를 늘리고, 워크북 자체가 틀렸을 때 알아챌 방법도 정하겠습니다.',
          'There is only one reference case. I would add boundary, rounding and invalid-input cases, and decide how we would notice if the workbook itself were wrong.',
        ],
        [
          '디지털 자산 엔진과 증여 평가 모듈은 회사 세무 SaaS의 코드를 옮긴 것이라, 그 뒤 SaaS에 들어간 수정(10원 미만 절사, 공제 근거 조문 정정 등)이 개인 계산기에는 아직 없습니다. 두 곳이 같은 엔진을 쓰도록 공용 패키지로 묶겠습니다.',
          'The crypto engine and the gift-valuation module were adapted from the company SaaS, so fixes made in the SaaS since then (rounding down below 10 won, a corrected statute reference) are not in the public calculators yet. I would move the engine into a shared package both use.',
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
    period: '2024.10–2026.10',
    team: k('2024 해커톤 5인 팀 → 2025 2인으로 발전 → 2026 혼자 리뉴얼', '2024 hackathon team of 5 → developed further by 2 in 2025 → renewed solo in 2026'),
    role: k('백엔드·AI (앱 UI는 팀원) · 2026 리뉴얼은 전체', 'Backend and AI (app UI by a teammate) · all of the 2026 renewal'),
    status: k('2026 리뉴얼: 실시간 피드백·발표 후 분석·보고서 화면 구현, 실기기 확인 전', '2026 renewal: live feedback, post-talk analysis and report screens built; not yet checked on a real phone'),
    statusCheckedAt: '2026-10-29',
    stack: ['Fastify', 'Socket.IO', 'BullMQ', 'Redis', 'PostgreSQL', 'Whisper', 'OpenAI API', 'Expo', 'Flask', 'SenseVoice-Small'],
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
                k('Socket.IO로 0.25초 조각 전송, 서버가 5초씩 모아 음량·말 속도·간투사(·감정) 분석, 발표 후 분석은 BullMQ', 'Socket.IO sends 0.25 s chunks; the server analyzes volume, pace, filler words (and emotion) every 5 s; post-talk analysis runs on BullMQ'),
                k('전체', 'All of it'),
                k('보고서 화면까지 구현, 단위 테스트 30개 통과, 실기기 확인 전', 'Built through the report screen; 30 unit tests pass; not yet checked on a real phone'),
              ],
            ],
          },
        },
      ),
      section('implementation', IMPLEMENTATION, [
        [
          '2026 버전은 발표 중 0.25초마다 음성 조각을 Socket.IO로 보내고, 서버가 5초씩 모아 음량·말 속도·간투사를 계산합니다(감정 분석 서비스가 켜져 있으면 감정까지). 조용한 구간은 받아쓰기를 건너뛰고, 받아쓰기가 4초 안에 끝나지 않으면 음량만으로 피드백합니다.',
          'In the 2026 version the app sends a slice of audio every 0.25 s over Socket.IO, and the server computes volume, speaking pace and filler words every 5 s (plus emotion when that service is running). Silent stretches skip transcription, and if transcription takes over 4 s the feedback falls back to volume alone.',
        ],
        [
          '발표가 끝나면 받아쓰기(Whisper) → LLM 보고서 → PDF를 BullMQ 작업으로 넘깁니다. 실패하면 5초 뒤 한 번 더 시도하고, 동시에 2개까지 처리합니다. 보고서·기록·홈 화면에서 결과와 PDF를 봅니다.',
          'After the talk, transcription (Whisper) → the LLM report → a PDF run as BullMQ jobs: one retry 5 s after a failure, up to 2 jobs at once. The report, history and home screens show the results and the PDF.',
        ],
        [
          'Whisper가 날것의 음성 데이터를 받지 않아 WAV 헤더를 직접 만들어 붙였습니다. iOS에서 녹음이 되지 않던 문제는 React Native 새 아키텍처를 지원하지 않던 녹음 라이브러리를 @siteed/audio-studio로 바꾸고 iOS 최소 버전을 16.4로 올려 해결했습니다.',
          "Whisper wouldn't take raw audio data, so I build the WAV header myself. Recording that didn't work on iOS was fixed by replacing a recording library that didn't support React Native's new architecture with @siteed/audio-studio and raising the minimum iOS version to 16.4.",
        ],
      ]),
      section('validation', VALIDATION, [
        [
          '팀 버전은 해커톤과 창업 경진대회에서 시연했습니다.',
          'The team version was demonstrated at the hackathon and the startup competition.',
        ],
        [
          '2026 버전은 단위 테스트 30개(Vitest, 6개 파일)가 통과하고, Docker로 띄우는 통합 테스트 6개와 감정 분석 서비스의 pytest 9개가 따로 있습니다. 휴대폰 없이 녹음부터 보고서 PDF까지 전체 흐름을 재현하는 스크립트로 확인했고 iOS 시뮬레이터 빌드는 성공했습니다. 실제 휴대폰에서는 아직 확인하지 않았습니다.',
          'The 2026 version passes 30 unit tests (Vitest, 6 files); 6 integration tests that run under Docker and 9 pytest cases for the emotion service sit alongside. A script that replays the whole flow without a phone, from recording to the report PDF, was used to check it, and the iOS simulator build succeeds. It has not been checked on a real phone yet.',
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
          '첫 시도가 실패하면 재시도가 남아 있어도 세션을 "실패"로 바꿔, 재시도가 성공해도 앱에는 실패로 보입니다. 마지막 시도가 실패했을 때만 상태를 바꾸도록 고치겠습니다.',
          'When the first attempt fails, the session is marked "failed" even though a retry is pending, so a successful retry still shows as a failure in the app. I would change the status only after the last attempt fails.',
        ],
        [
          '재시도하면 받아쓰기와 LLM을 처음부터 다시 부르므로 비용이 겹칠 수 있습니다. 단계마다 결과를 남겨 끝난 단계는 건너뛰게 하겠습니다.',
          'A retry calls transcription and the LLM again from the start, so costs can double. I would keep each step’s result so finished steps are skipped.',
        ],
        [
          '2024 버전의 말 속도는 띄어쓰기 단위로 세어 한국어에서는 정확하지 않습니다.',
          "The 2024 version counts speaking rate by spaces between words, so it isn't exact for Korean.",
        ],
      ]),
      section('evidence', EVIDENCE, [
        [
          '2024·2026 코드는 공개하지 않았습니다. 논문은 APIC-IST 2025 발표 논문입니다.',
          'The 2024 and 2026 code are not public. The paper was presented at APIC-IST 2025.',
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
    imageCaption: k('월별 검색량 추이 차트 · 실제 화면', "Monthly search-volume chart · real screen"),
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
    imageCaption: k('음성 대화 화면 · 실제 화면', "Voice conversation screen · real screen"),
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
    imageCaption: k('학습 진행률·계획 캘린더·추천 학습이 있는 대시보드 · 실제 화면', "Dashboard with progress, a study calendar and recommendations · real screen"),
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
    imageCaption: k('면접 질문과 답변 입력 화면 · 실제 화면', "Interview question and answer screen · real screen"),
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
    imageCaption: k('일정 요청 입력 화면 · 실제 화면(로컬 실행)', "Schedule request screen · real screen (local run)"),
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
    imageCaption: k('메타버스 속 NPC 대화 장면 · 팀 결과물 화면', "An NPC conversation in the metaverse · the team's build"),
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
    imageCaption: k('회원가입 화면 · 실제 화면', "Sign-up screen · real screen"),
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
    imageCaption: k('회의 화면과 AI 퍼실리테이터 패널 · 실제 화면(로컬 실행)', "Meeting screen with the AI facilitator panel · real screen (local run)"),
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
    imageCaption: k('진로 로드맵 화면 · 실제 화면', "Career roadmap screen · real screen"),
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
