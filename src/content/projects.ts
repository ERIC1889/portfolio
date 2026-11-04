import type { CaseSection, Flow, FlowStep, Media, Metric, Project } from './types'

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


const OUTCOMES: Pair = ['핵심 성과', 'Key results']
const PROBLEM_DEFINITION: Pair = ['문제 정의', 'Problem']
const ARCHITECTURE: Pair = ['시스템 구조', 'System structure']
const DECISIONS: Pair = ['주요 의사 결정', 'Key decisions']
const SOLVED: Pair = ['핵심 기술 문제 해결', 'Technical problems solved']
const SOLVED_WEB: Pair = ['핵심 기술 문제 해결 · 개인 세금 계산기', 'Technical problems solved · personal tax calculators']
const SOLVED_APP: Pair = ['핵심 기술 문제 해결 · Finz 모바일 앱', 'Technical problems solved · Finz mobile app']
const SOLVED_SAAS: Pair = ['핵심 기술 문제 해결 · 세무사용 FINZ', 'Technical problems solved · FINZ for tax accountants']
const REFLECTION: Pair = ['회고 및 개선 방향', 'Reflection and next steps']
const MATERIAL: Pair = ['관련 자료', 'Related material']

const ROLE: Pair = ['담당 역할 및 기여', 'My role and contribution']
const MEMORABLE: Pair = ['인상적인 문제', 'A memorable problem']

const SKILLPILOT_REPO = 'https://github.com/Hanshin-OSS-Hub/capstone25-skillpilot'

export const projects: Project[] = [
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
    team: k('주식회사 Finz Labs (직원 5명)', 'Finz Labs (five people)'),
    role: k('개발 총괄 (설계·개발·운영)', 'Head of development (design, build, operation)'),
    status: k('운영 중 (finz.kr)', 'Live (finz.kr)'),
    statusCheckedAt: '2026-10-29',
    stack: ['Next.js', 'TypeScript', 'React', 'Vitest'],
    summary: k(
      '부동산·디지털 자산·해외주식 세금 계산기가 있는 회사 웹 finz.kr을 혼자 설계·개발·운영하고, Finz 모바일 앱(청년 세금 환급 MVP 등)을 만들었습니다.',
      'I designed, built and run the company website finz.kr on my own, with its property, digital-asset and foreign-stock tax calculators, and built the Finz mobile app (a tax refund MVP and more).',
    ),
    features: pairs([
      [
        '해외주식 양도세·증여세: 매수·매도를 각자의 결제일 환율로 환산하고 이익을 주가 몫·환율 몫으로 나눠 표시, 증여 평가(전후 2개월 평균 종가)와 증여세 추정',
        'Foreign-stock capital gains and gift tax: each buy and sell converted at its own settlement-date rate, the gain shown split into a price part and a currency part, plus gift valuation (two-month average close) and a gift-tax estimate',
      ],
      [
        '시세·환율 데이터 계층: Upbit→CoinGecko, 한국은행 ECOS→ECB 대체 조회, 확정된 값만 오래 캐시, 사용자별·전체 요청 제한',
        'Market-data layer: Upbit→CoinGecko and Bank of Korea ECOS→ECB fallbacks, long caching only for settled values, per-user and global rate limits',
      ],
      [
        '부동산 6Way: 세무사와 Python으로 만든 계산 로직을 TypeScript로 이식, 국토교통부 실거래가 조회와 PDF 리포트 연동',
        'Property 6Way: the tax logic written in Python with a tax accountant ported to TypeScript, with land-ministry transaction prices and a PDF report',
      ],
      [
        '디지털 자산: 세무사용 FINZ(회사 세무 SaaS)의 가상자산 엔진을 개인용으로 이식, 과세연도 판정·시가 없을 때의 보수적 대체값·쉬운 오류 문구 추가',
        'Digital assets: the crypto engine of FINZ for tax accountants (the company SaaS) adapted for individuals, adding tax-year filtering, a cautious fallback when a price is missing and plain-language errors',
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
          '디지털 자산 엔진·증여 평가 모듈: 세무사용 FINZ, 즉 회사 세무 SaaS의 코드를 개인용으로 옮기고 연도 판정·대체값·오류 문구를 더함',
          'Digital-asset engine and gift valuation module: code from FINZ for tax accountants (the company SaaS) adapted for individuals, adding tax-year filtering, fallbacks and plain-language errors',
        ],
        ['Finz 모바일 앱과 백엔드 (Expo · FastAPI, 미출시)', 'The Finz mobile app and its backend (Expo · FastAPI, not released)'],
        [
          '세무사용 FINZ 가격 정책·기능 잠금 범위 사양 작성 (구현에 그대로 반영)',
          'The pricing and feature-lock spec for FINZ for tax accountants (implemented as written)',
        ],
      ]),
      joint: pairs([
        ['세금 계산 로직 정리 (세무사)', 'Working out the tax logic (with a tax accountant)'],
        [
          '세무사용 FINZ의 세금 계산 엔진 초안, 외부 API 연동, 배포·운영 방식, 개발 도구 (협력 개발사)',
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
        [
          '간편인증 한 번으로 5개 연도 조회: 서비스와 분리한 스크립트로 CODEF 개발 환경에서 확인하고 홈택스에서 받은 자료와 대조',
          'Five years fetched with one simple authentication: checked with a script kept apart from the service in the CODEF development environment, and compared with records downloaded from Hometax',
        ],
        [
          '세무사용 FINZ: 개발사 작업 269건 재검증(233 확인 · 36 미완료 · 새 결함 45), 배포 9번 연속 실패 원인 재현',
          'FINZ for tax accountants: re-verified 269 vendor items (233 confirmed · 36 open · 45 new defects), reproduced the cause of nine failed deployments in a row',
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
          '부동산 6Way · 운영 사이트 실제 화면 · 예시 입력 → 결과 → B주택을 조정대상지역으로 바꿔 재계산',
          'Property 6Way · live site · sample input → results → recalculated with home B in a regulated area',
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
      ARCHITECTURE,
      [
        '운영 중인 finz.kr 코드를 기준으로 그린 흐름입니다.',
        'The flow as it runs in the finz.kr code.',
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
        ['finz.kr 저장소 테스트', 'finz.kr repository tests'],
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
        ['보안 테스트 (Finz 앱 백엔드)', 'Security tests (Finz app backend)'],
        '57 통과',
        ['설정, 암호화, JWT, 미들웨어, 모델 제약, 비밀번호 규칙', 'Configuration, encryption, JWT, middleware, model constraints, password rules'],
        ['pytest, 로컬 실행 · 웹 계산 기능과는 별개', 'pytest, run locally · separate from the web calculator'],
        'measured',
        '2026-10-29',
      ),
    ],
    links: [
      { kind: 'live', label: k('개인 세금 계산기 열기', 'Open the calculators'), href: 'https://www.finz.kr/personal' },
      { kind: 'live', label: k('부동산 6Way', 'Property 6Way'), href: 'https://www.finz.kr/personal/property' },
      { kind: 'live', label: k('디지털 자산 계산기', 'Digital-asset calculator'), href: 'https://www.finz.kr/personal/digital-asset/calculator' },
      { kind: 'live', label: k('해외주식 양도세 계산기', 'Foreign-stock gains calculator'), href: 'https://www.finz.kr/personal/foreign-stock/capital-gains' },
      { kind: 'live', label: k('해외주식 증여 평가 계산기', 'Foreign-stock gift valuation'), href: 'https://www.finz.kr/personal/foreign-stock/valuation' },
      { kind: 'site', label: k('회사 웹 finz.kr', 'Company website finz.kr'), href: 'https://www.finz.kr' },
    ],
    sections: [
      section(
        'result',
        OUTCOMES,
        [
          [
            '부동산 6Way, 디지털 자산, 해외주식 양도세·증여 평가 계산기를 finz.kr에서 운영하고 있습니다.',
            'The property 6Way, digital-asset and foreign-stock capital gains and gift-valuation calculators are live at finz.kr.',
          ],
          [
            '세무사와 함께 만든 6Way 계산 로직을 웹으로 옮긴 뒤 기준 워크북의 결과 항목 21개와 대조해, 모두 ±10원 안(최대 차이 1원)에 들어오는 것을 확인했습니다.',
            'After the 6Way logic built with a tax accountant was ported to the web, all 21 result items checked against the reference workbook landed within ±10 won (largest gap 1 won).',
          ],
          [
            'Finz 모바일 앱(청년 세금 환급·부동산 6Way)으로 출품한 2026 AI-SW중심대학 AI·블록체인 비즈니스모델 경진대회에서 우수상을 받았습니다(2026.05).',
            'The Finz mobile app (youth tax refund and property 6Way) won an Excellence Award at the 2026 AI-SW-Centered University AI & Blockchain Business Model Competition (May 2026).',
          ],
          [
            'Finz 모바일 앱에서는 간편인증 한 번으로 여러 연도의 근로소득 지급명세서를 조회하도록 바꿨고, CODEF 개발 환경에서 5개 연도를 조회해 홈택스에서 받은 자료와 대조했습니다.',
            'In the Finz mobile app, a single simple authentication now fetches several years of employment-income statements; five years were fetched in the CODEF development environment and checked against records downloaded from Hometax.',
          ],
        ],
        { lead: true },
      ),
      section(
        'problem',
        PROBLEM_DEFINITION,
        [
          [
            '세무를 잘 모르는 사람이 쓰는 계산기라 결과 숫자 하나가 큰 결정을 바꿉니다. 화면을 빨리 만드는 것보다 숫자가 맞는 것과, 그 숫자가 어느 조문에서 나왔는지 보여 주는 것이 먼저였습니다.',
            'People who know little about tax use these calculators, so one number can change a big decision. Getting the numbers right, and showing which statute each one comes from, came before getting screens out quickly.',
          ],
          [
            '세금은 날짜에 따라 달라집니다. 가상자산은 2027년부터 과세되고 2026-12-31 시가가 취득가액이 될 수 있으며, 해외주식은 결제일 환율로 원화 환산합니다.',
            'Tax depends on dates. Crypto is taxed from 2027 and the 2026-12-31 price can become the cost basis; foreign stocks convert at settlement-date exchange rates.',
          ],
        ],
        { lead: true },
      ),
      section(
        'implementation',
        DECISIONS,
        [
          [
            '계산 엔진을 웹 안으로: 세무사와 Python으로 작성한 6Way 계산 로직을 서버로 따로 띄우지 않고 TypeScript로 옮겨 Next.js 안에서 계산했습니다. 저장할 상태가 없고 혼자 운영하는 단계라 배포 단위를 하나로 두는 편이 낫다고 봤습니다. 대신 엔진이 두 벌이 되어, 옮긴 뒤 같은 값을 내는지 기준 사례로 확인하는 것을 결정의 일부로 묶었습니다.',
            'Moving the engine into the web app: rather than running the 6Way logic, written in Python with a tax accountant, as a separate server, I ported it to TypeScript and calculate inside Next.js. With no state to store and one person running it, a single deployment was the better trade. The cost is two copies of the engine, so checking the port against a reference case was part of the decision.',
          ],
          [
            '저장하지 않는 계산기: 회원가입 없이 쓰고, 입력한 세금 정보는 서버에 저장하지 않습니다. 민감한 정보를 맡지 않는 쪽을 택했습니다.',
            'A calculator that keeps nothing: it needs no sign-up, and the tax details people enter are not stored on the server. The choice was not to hold sensitive data.',
          ],
          [
            'PDF 리포트: 별도 PDF 라이브러리 없이, 숨긴 iframe에 리포트를 그린 뒤 브라우저 인쇄로 저장합니다.',
            'The PDF report: instead of a PDF library, the report is drawn in a hidden iframe and saved through the browser’s print dialog.',
          ],
        ],
        { anchor: 'decisions' },
      ),
      section(
        'implementation',
        SOLVED_WEB,
        [
          [
            '날짜마다 다른 시세와 환율. 문제: 해외주식은 결제일 환율, 가상자산은 2026-12-31 시가가 필요한데, 외부 API는 느리거나 실패하고 아직 오지 않은 날짜에는 값이 없습니다. 해결: 시세는 Upbit 1분봉 다음 CoinGecko, 환율은 한국은행 ECOS 다음 ECB 기준환율로 대체하고, 대체한 값에는 표시를 남겨 캐시하지 않거나 짧게만 둡니다. 해외주식 종가는 기간이 모두 끝나고 거래일이 충분할 때만 캐시하고, 아직 오지 않은 날짜는 외부 API를 호출하지 않습니다.',
            'Prices and rates that change by date. Problem: foreign stocks need settlement-date exchange rates and crypto needs the 2026-12-31 price, but the APIs are slow or fail, and a date that hasn’t come yet has no value. Fix: prices fall back from Upbit 1-minute candles to CoinGecko and rates from the Bank of Korea ECOS to the ECB reference rate; fallback values are marked and cached briefly or not at all. Foreign-stock closes are cached only once the range is closed and complete, and a date that has not come yet never triggers an external call.',
          ],
          [
            '결제일 환율과 이익 나누기. 문제: 매수와 매도의 환율이 달라, 이익이 주가에서 왔는지 환율에서 왔는지 보이지 않습니다. 해결: 매수·매도를 각자의 결제일 환율로 원화 환산해 원 미만을 버리고, 이익을 주가로 생긴 몫과 환율로 생긴 몫으로 나눠 보여 줍니다. 신고 기한은 다음 해 5월 31일(주말·공휴일이면 그다음 평일)로 계산합니다.',
            'Settlement-date rates and splitting the gain. Problem: buys and sells convert at different rates, so a gain does not show whether it came from the stock price or the currency. Fix: each buy and sell is converted at its own settlement-date rate, truncated to the won, and the gain is shown split into a stock-price part and an exchange-rate part. The filing deadline is 31 May of the next year, moved past weekends and holidays.',
          ],
          [
            '증여 평가에 필요한 넉 달치 종가. 문제: 해외주식 증여는 증여일 앞뒤 2개월 종가 평균을 증여일 환율로 환산해 평가해야 합니다. 해결: 종가는 자동 조회, 시세표 붙여넣기, 평균 직접 입력 중에서 고를 수 있게 하고, 받는 사람별 공제·10년 합산·신고세액공제로 증여세를 추정합니다.',
            'Four months of closes for a gift valuation. Problem: a gifted foreign stock is valued at the average close over the two months either side of the gift date, converted at the gift-date rate. Fix: the closes can be looked up, pasted from a price table or entered as an average, and the gift tax is estimated with relationship-based deductions, 10-year aggregation and the filing credit.',
          ],
          [
            '아직 시가가 없는 가상자산. 문제: 2026-12-31 시가가 취득가액이 될 수 있지만 그날 전에는 조회할 수 없습니다. 해결: 세무사용 FINZ의 가상자산 계산 엔진을 개인용으로 옮기면서 판 날짜로 과세연도를 정하고, 시가가 없으면 실제 산 가격을 쓰는 보수적인 쪽을 택해 화면에 알립니다. 세금이 더 나올 수는 있어도 적게 안내하지는 않는 방향입니다. 엔진 오류는 쉬운 문장으로 바꿔 보여 줍니다.',
            'Crypto with no price yet. Problem: the 2026-12-31 price can become the cost basis, but it cannot be looked up before that day. Fix: in adapting the crypto tax engine of FINZ for tax accountants for individuals, the tax year comes from the sale date, and a missing price falls back to the actual cost with a note on screen. The estimate may come out higher that way, but it never understates the tax. Engine errors are rewritten in plain language.',
          ],
          [
            '여섯 가지 경우. 문제: 주택 두 채를 각각 양도·증여·부담부증여하는 여섯 경우를 중과 유예 전·후 규칙으로 모두 계산해야 합니다. 해결: 경우마다 전후 규칙으로 따로 계산하고, 결과를 한 화면에서 비교합니다.',
            'Six options. Problem: selling, gifting or gifting-with-debt each of two homes makes six options, each to be computed under the rules before and after the surcharge grace period. Fix: each option is computed separately under both rules, and the results are compared on one screen.',
          ],
          [
            '실거래가 API. 문제: 이미 인코딩된 인증키를 다시 인코딩하면 인증이 실패하고, 조회가 월 단위라 느립니다. 해결: URL을 직접 조립하고, 월별로 동시에 불러 12시간 단위로 다시 확인합니다.',
            'The transaction-price API. Problem: encoding an already encoded key fails authentication, and month-by-month lookups are slow. Fix: the URL is assembled by hand, and the months load in parallel and are re-checked every 12 hours.',
          ],
          [
            '옮긴 엔진이 같은 값을 내는지. 문제: Python 로직을 TypeScript로 옮기면 같은 결과를 낸다는 보장이 없습니다. 해결: 기준 워크북(실제 2주택 사례)의 기대값과 웹 계산 API 결과를 비교하는 스크립트로 21개 항목이 모두 ±10원 안(최대 차이 1원)인 것을 확인했고, Python 엔진에는 같은 사례를 원 단위까지 맞추는 테스트가 있습니다. 워크북은 소수점 이하를 그대로 두고 엔진은 단계마다 원 미만을 버리기 때문에 ±10원을 허용 범위로 정했습니다. finz.kr 저장소의 테스트 184개는 외부 API를 모의 응답으로 대신해 네트워크 없이 실행됩니다.',
            'Does the port give the same numbers? Problem: porting Python logic to TypeScript does not guarantee the same results. Fix: a script compares the web calculation API with the expected values in a reference workbook (a real two-home case), and all 21 items land within ±10 won (largest gap 1 won); the Python engine has tests that match the same case to the won. The workbook keeps fractions while the engine drops fractions of a won at each step, hence the ±10 won tolerance. The website’s 184 tests mock external APIs so they run offline.',
          ],
        ],
        { anchor: 'solved' },
      ),
      section(
        'implementation',
        ['Finz 모바일 앱 (미출시)', 'Finz mobile app (not released)'],
        [
          [
            'Finz 모바일 앱은 같은 회사에서 진행한 청년 세금 환급 MVP입니다. Expo·FastAPI로 간편인증 → 지급명세서 조회 → 환급액 계산 → 결제로 이어지는 흐름을 만들었습니다. CODEF로 조회한 소득 자료는 서버 DB에 저장하지 않고 계산에만 씁니다.',
            'The Finz mobile app is a youth tax-refund MVP built at the same company. With Expo and FastAPI, I built the flow from simple authentication → fetching payment statements → calculating the refund → payment. Income records fetched through CODEF are not stored in the server database and are used only for the calculation.',
          ],
          [
            '결제(토스페이먼츠)를 요청한 사람이 실제 의뢰의 주인인지, 금액이 맞는지, 이미 결제된 건은 아닌지를 서버에서 다시 확인합니다. 사용자·세무사·관리자마다 다른 화면을 보여 주지만, 실제 권한 검사는 서버가 합니다.',
            'For payments (Toss Payments), the server re-checks that the person paying owns the request, the amount, and whether it has already been paid. Users, tax accountants and admins see different screens, but the real permission checks happen on the server.',
          ],
          [
            '실거래가 데이터는 같은 백엔드의 Celery Beat가 매주 월요일 조정대상지역 전체를 동기화하고, 실패하면 시간을 두고 다시 시도합니다. 보안 테스트는 GitHub Actions에서 push마다 실행됩니다.',
            'Real-transaction prices are synced for every regulated area each Monday by Celery Beat in the same backend, with a delayed retry on failure. The security tests run in GitHub Actions on every push.',
          ],
          [
            '세무사 상담 연결(세무사 목록 → 의뢰 → 서류 업로드 → 채팅(5초 간격 갱신) → 결제)도 실제 백엔드 API로 만들었습니다.',
            'The tax-accountant connection (accountant list → request → document upload → chat refreshed every 5 s → payment) is also built on the real backend API.',
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
              ['청년 세금 환급 앱 시연 영상', 'Youth tax refund app demo video'],
              [
                '청년 세금 환급 · 실제 앱 화면을 단계별 설명과 함께 편집한 영상',
                'Youth tax refund · real app screens edited with step captions',
              ],
              '2026-09-10',
            ),
          ],
        },
      ),
      section(
        'implementation',
        SOLVED_APP,
        [
          [
            '연도마다 다시 걸리던 간편인증. 문제: 처음 구현은 연도마다 간편인증을 새로 요청해, 첫 연도만 조회되고 그 뒤에서 멈췄습니다. 사용자가 연도 수만큼 휴대폰 인증을 해야 하는 구조였습니다. 해결: CODEF 문서와 인증 흐름을 다시 확인해, 제출내역 조회에 세션 데이터를 요청하면 인증 세션(commSession)을 받고 이 세션으로 지급명세서를 연도만 바꿔 조회할 수 있다는 것을 찾았습니다. 서비스 코드와 분리한 Node.js 스크립트로 CODEF 개발 환경에서 간편인증 한 번에 5개 연도를 조회해 홈택스에서 받은 자료와 대조한 뒤, 백엔드를 인증 단계와 조회 단계로 나눠 다시 구현했습니다. 조회는 3초 간격으로 하나씩 보내고, 같은 요청이 겹쳤다는 오류가 오면 5초, 10초를 기다렸다 다시 시도합니다.',
            'Simple authentication repeated for every year. Problem: the first implementation asked for a new simple authentication for every year, so the first year came back and then it stalled; users would have had to approve on their phone once per year. Fix: going back through the CODEF documentation and the authentication flow showed that asking the submission-list lookup for session data returns an authenticated session (commSession), and that the payment-statement lookup can reuse it with only the year changed. A Node.js script kept apart from the service fetched five years with one authentication in the CODEF development environment, the results were checked against records downloaded from Hometax, and the backend was then rebuilt with authentication and lookup as separate steps. Lookups go out one at a time, 3 seconds apart, and an error saying identical requests overlapped is retried after 5 seconds, then 10.',
          ],
          [
            '간편인증 대기와 만료. 문제: 간편인증은 사용자가 휴대폰에서 승인할 때까지 결과를 알 수 없습니다. 해결: 3초 간격으로 상태를 확인하고 270초가 지나면 만료로 처리합니다. 인증 상태는 대기·요청·확인 중·완료·실패·만료 여섯 가지를 하나의 타입으로 관리하고, 실패와 만료에는 다시 시도할 수 있게 했습니다.',
            'Waiting for and expiring authentication. Problem: simple authentication gives no result until the user approves it on their phone. Fix: the status is checked every 3 seconds and treated as expired after 270 seconds; the six states (idle, requested, checking, done, failed, expired) are managed as one type, and a failed or expired attempt can be retried.',
          ],
        ],
        { anchor: 'solved-app' },
      ),
      section(
        'implementation',
        ['세무사용 FINZ · 협력 개발사와 공동 개발 (출시 전)', 'FINZ for tax accountants · co-developed with a partner company (not yet launched)'],
        [
          [
            '세무사용 FINZ는 같은 회사에서 협력 개발사와 함께 개발한 세무사용 SaaS로, 양도·증여·상속·종부세 계산, 홈택스 신고 파일 생성, AI 세무 어시스턴트를 갖췄습니다. 저는 회사 쪽 기술 책임자로 세금 계산 엔진 초안과 외부 API 연동, 배포·운영 방식, 개발 도구를 개발사와 함께 정하며 개발에 참여했고, 사양 작성과 검증, 장애 원인 분석을 맡았습니다. 제가 쓴 가격 정책·기능 잠금 범위 사양은 그대로 구현되었습니다.',
            'FINZ for tax accountants is a SaaS developed at the same company together with a partner development company: capital gains, gift, inheritance and comprehensive property tax calculations, Hometax filing files and an AI tax assistant. As the company-side technical lead I took part in development, deciding the tax-engine draft, external API integrations, the deployment and operations approach and the development tools together with the vendor, and I wrote the specs, verified the work and found the causes of failures. My pricing and feature-lock spec was implemented as written.',
          ],
          [
            '세무사는 고객과 신고건을 만든 뒤 자료를 모읍니다. 시세는 국토교통부 실거래가로 채우고, 등기부·건축물대장은 공공조회로, 감정평가서·매매계약서 같은 서류는 스캔본 OCR로 불러오며(추출값은 검수한 뒤에만 계산기에 들어감), 세대 구성과 과거 양도 이력은 고객 간편인증으로 조회합니다.',
            'A tax accountant opens a client and a filing, then gathers the facts: market prices from the land ministry’s transaction data, the property register and building ledger through public lookups, appraisals and contracts through scanned-document OCR (extracted values reach the calculator only after review), and the household and past sales through the client’s simple authentication.',
          ],
          [
            '신고는 양도소득세 4단계 위저드(양도인 → 자산 → 양수인 → 세액·전자신고)와 주식 양도·증여·상속·종합부동산세·주식평가 화면에서 만들고, 홈택스 전자신고 파일로 내보냅니다. AI 세무 어시스턴트는 문장 하나로 조회와 계산을 이어 주지만 세무사가 검토·확정해야 문서가 만들어지고, 법령 개정 모니터는 엔진이 참조하는 17개 법령·시행령의 시행일을 법제처와 대조해 바뀐 것을 보정 대상으로 표시합니다.',
            'Filings are built in a four-step capital gains wizard (seller → assets → buyer → tax and e-filing) and in the stock-sale, gift, inheritance, comprehensive property tax and share-valuation screens, then exported as Hometax e-filing files. The AI tax assistant chains lookups and calculations from a single sentence, but a document is produced only after the accountant reviews and confirms it; a law-change monitor compares the effective dates of the 17 statutes and decrees the engine relies on with the Ministry of Government Legislation and flags anything that changed.',
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
              ['세무사용 FINZ · AI 세무 어시스턴트 · 개발 서버 실제 화면', 'FINZ for tax accountants · AI tax assistant · real screen on the development server'],
              '2026-10-12',
            ),
            shot(
              '/media/finz/saas-wizard.webp',
              1600,
              836,
              ['양도인 → 자산 → 양수인 → 세액·전자신고로 이어지는 양도소득세 신고 위저드', 'Capital gains filing wizard: seller → assets → buyer → tax and e-filing'],
              ['양도소득세 신고 4단계 위저드 · 개발 서버 실제 화면', 'Four-step capital gains filing wizard · real screen on the development server'],
              '2026-10-12',
            ),
            shot(
              '/media/finz/saas-documents.webp',
              1600,
              836,
              ['등기부·건축물대장은 공공조회, 감정평가서·매매계약서는 스캔본 OCR로 불러오는 화면', 'Loading documents: public lookups for the register and building ledger, OCR for appraisals and contracts'],
              ['서류 불러오기 · 개발 서버 실제 화면', 'Document loading · real screen on the development server'],
              '2026-10-12',
            ),
            shot(
              '/media/finz/saas-calculator.webp',
              1600,
              836,
              ['단일자산·1세대1주택·지분양도·공동명의 등 경우별 탭이 있는 부동산 양도세 계산 화면', 'Property capital gains calculator with tabs for each case: single asset, one-home household, partial share, joint ownership'],
              ['부동산 양도세 계산기 · 개발 서버 실제 화면', 'Property capital gains calculator · real screen on the development server'],
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
        'implementation',
        SOLVED_SAAS,
        [
          [
            '배포 9번 연속 실패. 문제: 배포가 9번 잇달아 실패했는데 코드 결함인지 서버 문제인지 불분명했습니다. 해결: 블록체인 라이브러리 도입 전후를 같은 방법으로 재어 타입 검사 메모리가 1,083MB에서 1,472MB로 36% 늘어난 것(검사 대상 파일 2,619 → 3,619개)을 확인했고, 서버와 같은 메모리 상한(973MB)에서 오류를 재현해 서버 메모리 부족이 원인임을 밝혔습니다. 두 가지 해결책을 시험해 8GB 서버나 CI에서 이미지를 빌드하는 방식을 권했고, 개발사는 진단이 맞다고 확인한 뒤 실패한 배포가 서비스를 멈추지 않도록 바꿨습니다.',
            'Nine failed deployments in a row. Problem: deployments failed nine times running, and it was unclear whether the code or the server was at fault. Fix: measuring before and after the blockchain library arrived showed type-check memory up 36%, from 1,083 MB to 1,472 MB (files checked: 2,619 → 3,619), and reproducing the crash under the server’s 973 MB heap cap showed the cause was server memory. After two fixes were tested, an 8 GB server or building images in CI was recommended; the vendor confirmed the diagnosis and changed deployment so a failed build no longer takes the service down.',
          ],
          [
            '완료 보고 269건. 문제: 개발사가 완료했다고 보고한 작업이 실제로 끝났는지 알 수 없었습니다. 해결: 269건을 코드·테스트·화면 근거로 하나씩 다시 확인해 233건을 확인하고 36건은 미완료로 남겼으며(PR 참조 317개 대조), 새 결함 45건을 찾았습니다. 그중 2건은 출시 전에 막아야 할 결함(결제·요금제 잠금)이었습니다. 기준시가가 비어 있는 필지가 경고 없이 세액 계산에서 빠져 세액이 약 973만 원 적게 나오는 결함은 원인 코드 위치까지 찾아 1순위 수정 요청으로 넘겼습니다.',
            '269 items reported done. Problem: there was no way to tell whether the work the vendor reported as done was really finished. Fix: each of the 269 items was re-checked against code, tests and screens: 233 confirmed and 36 left open (317 PR references cross-checked), plus 45 new defects. Two had to be fixed before launch (payment and plan locking). For a defect where a parcel with no standard price was silently dropped from the tax and understated it by about ₩9.73 million, the exact code was traced and sent as the top fix request.',
          ],
          [
            '끊기는 문서 인식과 CI 점검. 문제: 문서 인식(OCR) 현장 시험(서류 11종, 17개 파일)에서 인식 결과가 끝까지 나오지 않고 끊겼고, CI가 계산 오류를 실제로 잡는지도 확인된 적이 없었습니다. 해결: 끊김의 원인을 출력 토큰 상한(1,200)으로 짚었고, 개발사는 상한을 8,000으로 올리며 코드 주석에 그 진단을 남겼습니다. CI에는 한 줄짜리 버그 7개를 심어 7개 모두 잡아내는 것을 확인했습니다.',
            'Cut-off OCR and checking CI. Problem: in an OCR field test (11 document types, 17 files) recognition stopped before the end of the document, and no one had checked whether CI really catches calculation errors. Fix: the cut-off was traced to the output-token cap (1,200); the vendor raised it to 8,000 and credited the diagnosis in a code comment. Seven one-line bugs were planted, and CI caught all seven.',
          ],
        ],
        { anchor: 'solved-saas' },
      ),
      section('retro', REFLECTION, [
        [
          '기준 사례가 하나뿐입니다. 경계값·반올림·잘못된 입력 사례를 늘리고, 워크북 자체가 틀렸을 때 알아챌 방법도 정하겠습니다.',
          'There is only one reference case. I would add boundary, rounding and invalid-input cases, and decide how we would notice if the workbook itself were wrong.',
        ],
        [
          '디지털 자산 엔진과 증여 평가 모듈은 세무사용 FINZ의 코드를 옮긴 것이라, 그 뒤 세무사용 FINZ에 들어간 수정(10원 미만 절사, 공제 근거 조문 정정 등)이 개인 계산기에는 아직 없습니다. 두 곳이 같은 엔진을 쓰도록 공용 패키지로 묶겠습니다.',
          'The crypto engine and the gift-valuation module were adapted from FINZ for tax accountants, so fixes made there since then (rounding down below 10 won, a corrected statute reference) are not in the public calculators yet. I would move the engine into a shared package both use.',
        ],
        [
          '앱의 연도별 조회는 요청 하나 안에서 3초 간격으로 순서대로 돌아, 연도가 많으면 몇 분이 걸립니다. 조회를 작업으로 넘기고 앱이 진행 상태를 확인하게 바꾸겠습니다. 세션이 만료되면 다시 인증받지 않고 멈추는 점은 재인증을 요청하도록, 일부 연도만 실패해도 완료로 끝나는 점은 실패한 연도를 알려 주도록 고치겠습니다.',
          'In the app, the yearly lookups run one after another, 3 seconds apart, inside a single request, so many years can take minutes. I would hand the lookups to a background job and let the app poll its progress. When the session expires the backend stops instead of asking for re-authentication, and a run where only some years fail still ends as done; I would fix the first to request re-authentication and the second to report which years failed.',
        ],
        [
          '앱에서 결제 승인 뒤 저장이 실패하거나 같은 요청이 두 번 오는 것처럼 외부 시스템과 상태가 어긋나는 상황을, 실패를 일부러 일으켜 확인해 두겠습니다.',
          'I would deliberately cause failures to check the cases where the app’s state drifts from an external system, such as saving failing after a payment is approved, or the same request arriving twice.',
        ],
      ]),
      section('evidence', MATERIAL, [
        [
          '코드는 회사 비공개 저장소에 있어 링크하지 않습니다. 대신 운영 화면과 시연 영상, 검증 조건과 수치를 이 페이지에 적었습니다. 기준 사례의 단지 이름과 금액은 고객 정보일 수 있어 공개하지 않습니다.',
          "The code is in the company's private repositories, so it is not linked. The live screens, demo videos and the verification conditions and figures are on this page instead. The reference case's apartment names and amounts are not shown because they may be client data.",
        ],
      ]),
    ],
  },

  {
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
    team: k('4인 캡스톤 (프론트엔드 2, AI 1, 백엔드·총괄 1)', '4-person capstone (frontend 2, AI 1, backend and lead 1)'),
    role: k('팀장 · 백엔드 전체 · 프론트엔드 개편', 'Team lead · the entire backend · frontend overhaul'),
    status: k('캡스톤 완료', 'Capstone completed'),
    statusCheckedAt: '2026-10-29',
    stack: ['Node.js', 'Express 5', 'MySQL', 'MongoDB', 'OpenAI API', 'node-cron', 'React 19'],
    summary: k(
      '공공 API 7종을 하나의 자격증 데이터로 정규화한 IT 취업 준비 플랫폼. 4인 팀에서 팀장과 백엔드 전체, 프론트엔드 개편을 맡았습니다.',
      'An IT job-preparation platform that normalizes 7 public APIs into one set of certification data. In a team of four I was the lead, built the entire backend and overhauled the frontend.',
    ),
    features: pairs([
      ['프로필 기반 자격증 추천, 주차별 학습 로드맵 생성·편집', 'Certification recommendations from your profile, and generating and editing a weekly study roadmap'],
      ['자격증·시험 일정 자동 갱신', 'Automatic updates of certifications and exam schedules'],
      ['CBT 모의고사와 AI 오답 해설, 대화형 모의 면접', 'CBT mock exams with AI explanations of wrong answers, and conversational mock interviews'],
      ['스킬갭 분석, 채용 매칭, 포트폴리오, 학습 대시보드', 'Skill-gap analysis, job matching, a portfolio and a study dashboard'],
    ]),
    resumeItems: pairs([
      [
        '공공 API 7종 응답 정규화: HTTP 200 속 오류 문구는 실패로 보고 재시도, XML·JSON 응답 모두 해석',
        'Normalizing 7 public APIs: error text inside an HTTP 200 counts as a failure and is retried, and both XML and JSON responses are parsed',
      ],
      [
        'node-cron 주기 동기화와 관리자 수동 실행, 같은 사용자·같은 조건의 AI 결과 재사용(MongoDB)',
        'Periodic syncing with node-cron plus a manual admin run, and reuse of AI results for the same user and request (MongoDB)',
      ],
      [
        '프론트엔드 개편: 디자인 토큰, 공통 컴포넌트 6종, 13개 페이지 이전, 대시보드 위젯 5종, 학습메이트(학습동반 챗봇)',
        'Frontend overhaul: design tokens, 6 shared components, 13 pages migrated, 5 dashboard widgets, a study-companion chatbot',
      ],
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
      others: pairs([['프론트엔드 초기 화면(팀원 2), AI 프롬프트·추천 로직(팀원 1)', 'The initial frontend screens (two teammates) and the AI prompts and recommendation logic (one teammate)']]),
      notYet: pairs([['자동 테스트 없음', 'No automated tests']]),
    },
    media: [
      shot(
        '/media/skillpilot/dashboard.webp',
        1600,
        885,
        ['학습 로드맵과 학습 캘린더가 있는 대시보드', 'Dashboard with the study roadmap and study calendar'],
        ['대시보드: 주차별 학습 로드맵·캘린더 · 실제 화면', 'Dashboard: weekly study roadmap and calendar · real screen'],
        '2026-05-04',
      ),
      video(
        '/media/skillpilot/demo.mp4',
        '/media/skillpilot/demo-poster.webp',
        1280,
        710,
        ['SkillPilot 시연 영상', 'SkillPilot demo video'],
        [
          '시연: 대시보드 → 학습 기록 → AI 모의 면접 → CBT 모의고사 → AI 오답 해설 → 학습메이트',
          'Demo: dashboard → study log → AI mock interview → CBT mock exam → AI answer review → study companion',
        ],
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
      shot(
        '/media/skillpilot/wrong-answer.webp',
        1600,
        885,
        ['AI 오답 해설 화면', 'AI wrong-answer explanation'],
        ['AI 오답 해설 · 실제 화면', 'AI wrong-answer explanation · real screen'],
        '2026-05-04',
      ),
      shot(
        '/media/skillpilot/interview.webp',
        1600,
        885,
        ['AI 모의 면접 설정 화면', 'AI mock interview setup'],
        ['AI 모의 면접 설정 · 실제 화면', 'AI mock interview setup · real screen'],
        '2026-05-04',
      ),
    ],
    flow: flow(
      ARCHITECTURE,
      [
        'React 앱이 Express REST API를 호출하고, 서버는 라우트, 컨트롤러, 서비스, 모델 계층으로 나뉩니다. 아래는 그중 공공데이터 동기화 흐름입니다.',
        'A React app calls an Express REST API, and the server is split into route, controller, service and model layers. Below is the public data sync within it.',
      ],
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
              ['정상 응답 (XML·JSON)', 'Valid response (XML or JSON)'],
              ['해석해 다음 단계로', 'Parsed and passed on'],
            ],
          ],
        ),
        step('mine', ['엔드포인트별 정규화', 'Per-endpoint normalization'], ['자격증 코드로 상세·통계·일정을 결합', 'Joins details, statistics and schedules by certification code']),
        step('mine', ['저장 → API → 화면', 'Storage → API → screens'], ['계정과 자격증은 MySQL에, 시험 결과, 로드맵, 면접 세션, AI 결과는 MongoDB에 저장', 'Accounts and certifications go in MySQL; test results, roadmaps, interview sessions and AI results go in MongoDB']),
      ],
    ),
    links: [
      { kind: 'code', label: k('공개 저장소', 'Public repository'), href: SKILLPILOT_REPO },
      { kind: 'code', label: k('API 클라이언트 (정규화·재시도)', 'API client (normalizing, retries)'), href: `${SKILLPILOT_REPO}/blob/main/SkillPilot-backend/src/integrations/dataGoKr/client.js` },
      { kind: 'code', label: k('동기화 서비스', 'Sync service'), href: `${SKILLPILOT_REPO}/blob/main/SkillPilot-backend/src/services/certificationSync.service.js` },
      { kind: 'code', label: k('AI 결과 재사용', 'AI result reuse'), href: `${SKILLPILOT_REPO}/blob/main/SkillPilot-backend/src/services/ai.service.js` },
      {
        kind: 'slides',
        label: k('최종 발표 자료 (PDF)', 'Final presentation (PDF)'),
        href: `${SKILLPILOT_REPO}/blob/main/${encodeURIComponent('최종발표자료_AISW캡스톤디자인(A반_SkillPilot팀).pdf')}`,
      },
    ],
    sections: [
      section(
        'result',
        OUTCOMES,
        [
          ['공공데이터 API 7종을 하나의 자격증 데이터로 정규화해 자격증과 시험 일정이 자동으로 갱신됩니다.', 'Normalized 7 public data APIs into one set of certification data, so certifications and exam schedules update automatically.'],
          ['13개 화면과 16개 백엔드 라우트 모듈(인증·자격증·로드맵·모의고사·면접·대시보드 등)로 캡스톤을 마쳤습니다.', 'Finished the capstone with 13 screens and 16 backend route modules (auth, certifications, roadmap, mock exams, interviews, dashboard and more).'],
        ],
        { lead: true },
      ),
      section(
        'problem',
        PROBLEM_DEFINITION,
        [
          [
            '취업 준비생은 시험 일정은 Q-Net에서, 강의는 교육 플랫폼에서, 채용 정보는 또 다른 곳에서 찾아야 합니다. 어떤 자격증부터 준비할지와 공부한 내용을 어떻게 포트폴리오와 면접으로 이을지도 스스로 정해야 합니다.',
            'Job seekers find exam schedules on Q-Net, courses on learning platforms and job postings somewhere else again. They also have to work out on their own which certification comes first and how to carry what they study into a portfolio and interviews.',
          ],
        ],
        { lead: true },
      ),
      section(
        'implementation',
        DECISIONS,
        [
          [
            'DB 분리: 서로 연결되는 데이터는 MySQL에, 한 덩어리로 읽고 쓰는 데이터는 MongoDB에 뒀습니다. 대신 두 DB 사이의 트랜잭션을 포기했고, 지금이라면 MySQL 하나로 시작하겠습니다.',
            'Splitting the databases: data that connects to other data went in MySQL, and data read and written as one unit went in MongoDB. That gave up transactions across the two, and today I would start with MySQL alone.',
          ],
          [
            'AI 실패 처리: AI 호출이 실패하면 오류 대신 규칙 기반 추천과 로드맵을 제공했습니다. 품질은 낮아져도 온보딩 흐름은 끊기지 않습니다. 같은 사용자의 같은 조건 요청은 저장된 결과를 다시 씁니다.',
            'Handling AI failures: when an AI call fails, rule-based recommendations and roadmaps replace the error. Quality drops, but onboarding keeps going. The same user sending the same request gets the stored result.',
          ],
        ],
        { anchor: 'decisions' },
      ),
      section(
        'implementation',
        SOLVED,
        [
          [
            'HTTP 200 속의 실패. 문제: 공공 API는 실패해도 HTTP 200으로 "SERVICE ERROR" 같은 문구를 보내는 경우가 있어, 상태 코드만 보면 틀린 데이터가 저장될 수 있습니다. 해결: 본문의 오류 문구까지 검사해 실패로 판정하고, 0.5초, 1초 간격으로 최대 2번 다시 시도합니다.',
            'Failures inside an HTTP 200. Problem: public APIs sometimes answer a failure with HTTP 200 and text such as "SERVICE ERROR", so judging by status code alone could store wrong data. Fix: the body is checked for error text too, counted as a failure and retried up to twice, 0.5 s and 1 s apart.',
          ],
          [
            '제각각인 응답 구조. 문제: 응답은 대부분 XML이고 목록 위치가 API마다 다르며, 결과가 하나면 객체로 옵니다. 해결: XML과 JSON 응답을 모두 해석하고, 목록을 항상 배열로 돌려준 뒤 7개 엔드포인트별 정규화 함수로 내부 구조에 맞춥니다.',
            'Responses of every shape. Problem: most responses are XML, the list sits in a different place per API, and a single result arrives as an object. Fix: both XML and JSON responses are parsed, lists always come back as arrays, and a normalization function for each of the 7 endpoints maps them to an internal structure.',
          ],
          [
            '서비스 키 처리. 문제: 이미 인코딩된 서비스 키를 다시 인코딩하면 인증이 깨질 수 있습니다. 해결: 키는 문자열로 직접 붙이고 나머지 파라미터만 인코딩합니다. 키가 없는 API는 건너뛰고 나머지 동기화를 계속합니다.',
            'Service keys. Problem: encoding an already encoded service key can break authentication. Fix: the key is appended as a string and only the other parameters are encoded. An API without a key is skipped and the rest of the sync continues.',
          ],
          [
            '자격증과 시험 일정 결합. 문제: 국가전문자격 일정에는 자격증 코드가 없고, 같은 일정이 중복될 수 있습니다. 해결: 코드가 없으면 종목명으로 매칭하고, 자격증과 시험일로 찾아 있으면 접수 기간만 갱신합니다. 다만 unique 제약이 없어 동시 실행까지 막지는 못합니다.',
            'Joining certifications and exam schedules. Problem: professional certification schedules have no certification code, and a schedule could be duplicated. Fix: without a code, matching uses the name, and a schedule found by certification and exam date only has its registration period updated. With no unique constraint, concurrent runs are not prevented.',
          ],
          [
            '모델 파라미터 호환. 문제: 모델에 따라 max_completion_tokens나 max_tokens만 받아 챗봇 호출이 400으로 실패합니다. 해결: 이 오류가 오면 다른 파라미터로 바로 다시 호출합니다.',
            'Model parameter compatibility. Problem: depending on the model, only max_completion_tokens or max_tokens is accepted, so chatbot calls fail with a 400. Fix: on that error the call is retried at once with the other parameter.',
          ],
          [
            '제각각이던 화면. 문제: 팀원 둘이 만든 13개 페이지의 스타일과 컴포넌트가 달라 수정이 두 배로 들었습니다. 해결: 디자인 토큰과 공통 컴포넌트 6종으로 옮기고, 챗봇은 호출이 실패해도 시연이 멈추지 않도록 오프라인 대체 응답을 두었습니다.',
            'Screens that did not match. Problem: the 13 pages built by two teammates differed in styling and components, so every change cost twice. Fix: they were moved onto design tokens and 6 shared components, and the chatbot got an offline fallback so a failed call never stops a demo.',
          ],
        ],
        { anchor: 'solved' },
      ),
      section('retro', REFLECTION, [
        [
          '자동 테스트가 없습니다. 관리자 수동 실행은 실제 응답을 다시 받아 눈으로 확인하는 용도이지 테스트가 아닙니다. 동기화 중복을 막는 unique 제약과 두 DB의 일관성 처리도 부족합니다. 다시 한다면 동기화 정규화 테스트, unique 제약, 실행 이력 기록부터 넣겠습니다.',
          'There are no automated tests; the manual admin run is for fetching real responses again and checking them by eye, not a test. The unique constraints against duplicate syncs and the consistency handling across the two databases also fall short. Next time I would start with sync and normalization tests, unique constraints and a record of each run.',
        ],
        [
          '오류 문구, XML과 JSON 응답, 결과가 하나일 때와 여럿일 때, 빈 결과·시간 초과·재시도 초과, 같은 자격증 코드 중복 실행을 자동 테스트로 확인하겠습니다.',
          'I would cover error text, XML and JSON responses, single versus multiple items, empty results, timeouts, running out of retries and duplicate runs for the same certification code with automated tests.',
        ],
        [
          '저장된 AI 결과는 입력 JSON 문자열을 그대로 키로 써서 필드 순서만 달라도 놓칩니다. 키를 정규화하고 모델·프롬프트 버전과 만료 시간을 넣겠습니다.',
          'Stored AI results are keyed by the raw input JSON string, so a different field order alone causes a miss. I would normalize the key and add the model and prompt version and an expiry time.',
        ],
      ]),
      section('evidence', MATERIAL, [
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
    showcase: 'main',
    title: k('ClosetMate 옷장·코디 추천 앱', 'ClosetMate wardrobe and outfit app'),
    product: k(
      '옷 사진을 찍으면 종류, 색상, 스타일을 분류해 옷장에 넣고, 말이나 글로 상황을 입력하면 가진 옷으로만 코디를 추천하는 모바일 앱',
      'A mobile app that sorts a photo of a garment by type, color and style into your wardrobe and, when you describe the occasion by voice or text, recommends outfits only from clothes you own',
    ),
    period: '2026.03–2026.06',
    team: k('개인 프로젝트', 'Solo project'),
    role: k('기획 · 모델 학습 · 모바일·API 개발', 'Planning · model training · mobile and API development'),
    status: k('미출시', 'Not released'),
    statusCheckedAt: '2026-10-29',
    stack: ['Expo', 'Next.js', 'PostgreSQL', 'Drizzle', 'ONNX Runtime', 'PyTorch', 'OpenAI API', 'Whisper'],
    summary: k(
      '옷 사진으로 옷장을 만들고, LLM이 추천한 코디를 서버에서 검증해 가진 옷으로만 보여 주는 앱. 혼자 기획부터 모델 학습, 앱과 API까지 만들었습니다.',
      'An app that builds a wardrobe from photos and checks LLM outfit suggestions on the server so only owned clothes are shown. I built it alone, from planning and model training to the app and API.',
    ),
    features: pairs([
      ['사진 기반 옷 등록과 자동 분류, 카테고리별 옷장', 'Adding clothes by photo with automatic labels, and a wardrobe by category'],
      ['글·음성 코디 요청, 날씨와 상황을 반영한 추천', 'Outfit requests by text or voice, with suggestions that reflect the weather and occasion'],
      ['착용 기록, 옷장 통계, 선택형 OpenAI Vision 상세 분석', 'Wear history, wardrobe stats and optional detailed OpenAI Vision analysis'],
    ]),
    resumeItems: pairs([
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
          '추천 결과 · 실제 앱 화면 · gpt-5.4-nano, 후보 10개',
          'Suggestions · real app screen · gpt-5.4-nano, 10 candidates',
        ],
        '2026-05-25',
        'device',
      ),
      shot(
        '/media/closetmate/classify.webp',
        560,
        974,
        ['사진을 분류한 결과를 확인하고 고치는 화면', 'Checking and correcting the classification of a photo'],
        ['옷 추가 · 실제 앱 화면 · MobileNetV3 분류', 'Adding a garment · real app screen · MobileNetV3 label'],
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
        ['시연 · 실제 앱 화면 녹화', 'Demo · real app screen recording'],
        '2026-05-25',
        'device',
      ),
    ],
    flow: flow(
      ARCHITECTURE,
      [
        'Expo 앱이 Next.js 서버를 호출합니다. 서버는 PostgreSQL에 옷장과 추천 기록을 저장하고, ONNX 모델로 옷을 분류하며, OpenAI API로 추천을 받습니다. 모델 학습은 PyTorch로 따로 진행했습니다.',
        'The Expo app calls a Next.js server, which stores the wardrobe and suggestion records in PostgreSQL, labels clothes with an ONNX model and gets suggestions from the OpenAI API. Model training ran separately in PyTorch.',
      ],
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
      section(
        'result',
        OUTCOMES,
        [
          ['사진 등록부터 분류, 후보 생성, LLM 추천, 서버 검증까지 전체 흐름을 구현했습니다.', 'Built the whole flow from adding a photo through labeling, candidate outfits, LLM suggestions and the server check.'],
          ['MobileNetV3-Small과 ResNet50을 같은 조건으로 비교해 약 15분의 1 크기인 MobileNetV3-Small을 채택했습니다.', 'Compared MobileNetV3-Small and ResNet50 under the same settings and adopted MobileNetV3-Small at about one fifteenth of the size.'],
          ['형식이 틀렸거나 옷장에 없는 옷을 담은 추천은 사용자에게 보내기 전에 차단합니다.', 'Suggestions with the wrong format or with clothes not in the wardrobe are blocked before they reach the user.'],
        ],
        { lead: true },
      ),
      section(
        'problem',
        PROBLEM_DEFINITION,
        [
          [
            '옷장은 꽉 차 있어도 가진 옷을 다 기억하지 못하고 상황에 맞게 조합하기 어렵습니다. LLM에 코디를 그냥 맡기면 그럴듯하지만 옷장에 없는 옷을 추천할 수 있습니다.',
            "Even with a full wardrobe it's hard to remember everything you own and combine it for the occasion. Left alone, an LLM can give plausible suggestions that include clothes you don't have.",
          ],
        ],
        { lead: true },
      ),
      section(
        'implementation',
        DECISIONS,
        [
          [
            '후보 안에서만 고르는 LLM: LLM이 처음부터 답을 쓰지 않고, 규칙으로 만든 후보(색상, 스타일, 날씨, 최근 착용 반영) 중에서 고르게 했습니다.',
            'An LLM that only picks from candidates: instead of writing an answer from scratch, it chooses from rule-based candidates that reflect color, style, weather and recent wear.',
          ],
          [
            '가벼운 모델 우선: 백본을 고정한 전이학습에서 두 모델을 비교해 MobileNetV3-Small을 골랐습니다. Fashion Product Images Small 유효 샘플 약 3만 5천 장을 8:2로 나눠 10 epoch 학습했고, 학습 시간은 약 23분과 53분이었습니다. CPU 추론에서는 MobileNetV3가 오히려 느렸지만, 기기 안 추론을 염두에 두고 속도보다 크기(약 15분의 1)를 우선했습니다.',
            'The lighter model first: with a frozen backbone I compared the two models and chose MobileNetV3-Small. About 35,000 valid samples from Fashion Product Images Small were split 8:2 and trained for 10 epochs, taking about 23 and 53 minutes. On CPU, MobileNetV3 was actually slower, but with on-phone inference in mind, size (about one fifteenth) came before speed.',
          ],
          [
            '서버 추론: Expo Go에서는 기기 안에서 모델을 불러올 수 없어 서버에서 ONNX로 추론했습니다. 비용이 드는 Vision 분석은 사용자가 직접 누를 때만 호출합니다.',
            'Server inference: Expo Go could not load the model on the phone, so inference runs on the server with ONNX. The paid Vision analysis is called only when the user taps for it.',
          ],
        ],
        { anchor: 'decisions' },
      ),
      section(
        'implementation',
        SOLVED,
        [
          [
            '옷장에 없는 옷을 추천하는 문제. 문제: LLM에 맡기면 없는 옷의 ID를 만들어 내거나 만들 수 없는 조합을 고릅니다. 해결: 규칙으로 점수를 매긴 후보를 먼저 만들고(기온 28도 이상이면 아우터 제외, 최근 입은 옷은 점수 낮춤) LLM은 그중에서만 고르며, 응답은 JSON Schema(strict)로 강제한 뒤 서버에서 옷 ID와 후보 조합을 다시 확인합니다.',
            'Suggesting clothes that are not in the wardrobe. Problem: left alone, an LLM invents clothing IDs or picks impossible combinations. Fix: rule-based scored candidates come first (no outerwear at 28°C and above, lower scores for recently worn clothes) and the LLM chooses only among them; the response is forced to a strict JSON Schema, and the server checks clothing IDs and the candidate outfit again.',
          ],
          [
            '실패했을 때의 처리. 문제: 검증에 한 번 실패하면 끝이었습니다. 해결: 형식, 옷 ID, 후보 조합, 확신도 중 하나라도 기준에 못 미치면 보조 모델로 다시 받아 같은 검사를 거치고, 그래도 실패하면 오류로 끝냅니다(검증 실패에만 해당하며, API 호출 자체가 실패한 경우는 아직 대체하지 않습니다). 사용 모델과 대체 이유를 기록합니다.',
            'Handling failures. Problem: one failed check used to be the end. Fix: if the format, clothing IDs, candidate outfit or confidence fall short, a backup model answers and goes through the same checks, and a second failure ends in an error (this covers failed checks only; a failed API call does not fall back yet). The model used and the reason for falling back are recorded.',
          ],
          [
            '하나의 모델로 세 분류. 문제: 카테고리, 색상, 스타일을 따로 분류하면 모델이 세 개가 됩니다. 해결: 고정 백본 위에 카테고리 7종, 색상 11종, 스타일 5종 헤드를 얹어 헤드만 학습했습니다(학습 파라미터는 MobileNetV3-Small 기준 약 2만 3천 개).',
            'Three labels from one model. Problem: classifying category, color and style separately would mean three models. Fix: heads for 7 categories, 11 colors and 5 styles sit on a frozen backbone, and only the heads are trained (about 23,000 trainable parameters with MobileNetV3-Small).',
          ],
        ],
        { anchor: 'solved' },
      ),
      section('retro', REFLECTION, [
        [
          '학습 코드에서 검증용 변환이 적용되지 않아, 평가를 분리하고 고정된 테스트 세트로 다시 재기 전까지는 분류 정확도를 쓰지 않습니다. 다시 잴 때 조명과 그림자에 약한 색상 분류도 함께 개선하겠습니다.',
          'The training code never applied the validation transforms, so I do not report classification accuracy until evaluation is separated and re-measured on a fixed test set. When I re-measure, I would also improve color labeling, which is weak under changing light and shadows.',
        ],
        [
          'API 호출 자체가 실패하면 보조 모델로 넘어가지 않는 부분과 모델이 스스로 매긴 확신도로 결과를 거르는 부분을 고치겠습니다. 서버가 받은 URL을 그대로 불러오는 부분과 x-user-id 헤더만으로 사용자를 구분하는 부분은 공개 서비스라면 가장 먼저 막아야 할 곳입니다.',
          "I would fix the case where a failed API call doesn't fall back to the backup model, and filtering by the model's own self-rated confidence. Fetching whatever URL the server receives and telling users apart by the x-user-id header alone are the first things to close off for a public service.",
        ],
      ]),
      section('evidence', MATERIAL, [['코드는 비공개 저장소에 있습니다. 화면과 시연 영상, 측정 조건을 이 페이지에 둡니다.', 'The code is in a private repository. Screens, a demo video and the measurement conditions are on this page.']]),
    ],
  },

  {
    slug: 'pitches',
    name: 'Pitches',
    years: [2024, 2025, 2026],
    tier: 'featured',
    showcase: 'main',
    title: k('Pitches 발표 코칭', 'Pitches presentation coaching'),
    product: k(
      '발표하는 동안 말 속도, 감정, 음량을 분석해 색으로 바로 알려 주고, 발표가 끝나면 AI 코칭 보고서를 만들어 주는 모바일 서비스',
      'A mobile service that analyzes speaking pace, emotion and volume during a talk, shows them right away as colors and writes an AI coaching report at the end',
    ),
    period: '2024.10–2026.10',
    team: k('2024 해커톤 5인 → 2025 논문 2인 → 2026 개인 리뉴얼', '2024 hackathon team of 5 → paper by 2 in 2025 → solo renewal in 2026'),
    role: k('팀장 · 백엔드·AI (2024–25) · 전체 (2026)', 'Team lead · backend and AI (2024–25) · everything (2026)'),
    status: k('2026 리뉴얼 구현', '2026 renewal built'),
    statusCheckedAt: '2026-10-29',
    stack: ['SenseVoice-Small', 'FunASR', 'WebSocket', 'asyncio', 'GPT-4o-mini', 'AWS', 'Fastify', 'Socket.IO', 'BullMQ', 'Redis', 'PostgreSQL', 'Whisper', 'Expo'],
    summary: k(
      '발표 중 말 속도와 감정을 분석해 알려 주는 코칭 서비스. 해커톤 대상과 창업 경진대회 특별상, 국제학술대회 논문으로 이어졌고 2026년에 혼자 다시 설계했습니다.',
      'A coaching service that analyzes speaking pace and emotion during a talk. It won a hackathon grand prize and a startup competition award, became an international conference paper, and I redesigned it alone in 2026.',
    ),
    features: pairs([
      ['발표 중 5초마다 말 속도, 음량, 간투사, 감정을 판정해 초록·노랑·빨강 원과 개선 팁으로 표시', 'Every 5 s during a talk, pace, volume, filler words and emotion are judged and shown as a green, yellow or red circle with a tip'],
      ['발표 후 종합 점수, 지난 발표와 달라진 점, 점수 그래프를 보여 주는 결과 화면', 'After the talk, a results screen with the overall score, what changed since the last talk and a score graph'],
      ['발표 요약, 음성·내용 분석, 강점, 개선점, 개선 로드맵, 발표 스크립트로 구성된 AI 코칭 보고서와 PDF 저장', 'An AI coaching report with a summary, voice and content analysis, strengths, improvements, a roadmap and a talk script, saved as a PDF'],
      ['발표 기록과 점수 추이', 'A history of talks and the score trend'],
    ]),
    resumeItems: pairs([
      [
        'SenseVoice-Small 실시간 분석 백엔드, asyncio로 여러 세션 프레임 병렬 처리 (논문 보고 지연 평균 125ms)',
        'Live-analysis backend on SenseVoice-Small, with frames from many sessions processed in parallel on asyncio (125 ms average latency as reported in the paper)',
      ],
      [
        '2026 리뉴얼: Socket.IO 0.25초 음성 스트리밍, 5초 단위 음량·말 속도·간투사 판정, BullMQ 발표 후 분석 큐',
        '2026 renewal: Socket.IO audio streaming in 0.25 s chunks, volume, pace and filler-word judgments every 5 s, a BullMQ post-talk analysis queue',
      ],
      [
        '해커톤 대상(1등) · 창업 경진대회 특별상 · APIC-IST 2025 논문 2저자',
        'Hackathon grand prize (1st) · startup competition special award · second author of the APIC-IST 2025 paper',
      ],
    ]),
    contribution: {
      direct: pairs([
        ['팀 버전: 백엔드 개발, AI 모델 선정·적용, 연구와 발표, 논문 2저자', 'Team version: backend, choosing and applying the AI models, research and presenting, second author of the paper'],
        ['2026 리뉴얼: 전체', '2026 renewal: all of it'],
      ]),
      others: pairs([['팀 버전의 앱 UI', 'The app UI of the team version']]),
      notYet: pairs([['2026 버전은 실제 휴대폰 확인 전', 'The 2026 version has not been checked on a real phone yet']]),
    },
    media: [
      video(
        '/media/pitches/demo.mp4',
        '/media/pitches/demo-poster.webp',
        720,
        1566,
        ['Pitches 앱 시연 영상', 'Pitches app demo video'],
        [
          '시연 · iOS 시뮬레이터 실제 앱 화면 · 실시간 피드백 → 분석 → 결과 → 보고서 → PDF',
          'Demo · real app in the iOS simulator · live feedback → analysis → results → report → PDF',
        ],
        '2026-11-02',
      ),
      shot(
        '/media/pitches/live-green.webp',
        720,
        1566,
        ['초록 원과 함께 말해 보라고 안내하는 실시간 분석 화면', 'Live analysis screen with a green circle, prompting the speaker'],
        ['실시간 피드백 · iOS 시뮬레이터 실제 앱 화면', 'Live feedback · real app in the iOS simulator'],
        '2026-11-02',
        'phone',
      ),
      shot(
        '/media/pitches/live-red.webp',
        720,
        1566,
        ['빨간 원과 음량 안내, 개선 팁이 나온 실시간 분석 화면', 'Live analysis screen with a red circle, a volume prompt and a tip'],
        ['판정에 따라 바뀌는 색과 팁 · iOS 시뮬레이터 실제 앱 화면', 'The color and tip change with each judgment · real app in the iOS simulator'],
        '2026-11-02',
        'phone',
      ),
      shot(
        '/media/pitches/result.webp',
        720,
        1566,
        ['종합 점수, 달라진 점, 점수 그래프가 있는 결과 화면', 'Results screen with the overall score, what changed and a score graph'],
        ['분석 결과 · iOS 시뮬레이터 실제 앱 화면 · 시험 세션', 'Results · real app in the iOS simulator · test session'],
        '2026-11-02',
        'phone',
      ),
      shot(
        '/media/pitches/report.webp',
        720,
        1566,
        ['발표 분석 요약과 음성 분석이 있는 코칭 보고서 화면', 'Coaching report with the talk summary and voice analysis'],
        ['AI 코칭 보고서 · iOS 시뮬레이터 실제 앱 화면 · 시험 세션', 'AI coaching report · real app in the iOS simulator · test session'],
        '2026-11-02',
        'phone',
      ),
      shot(
        '/media/pitches/history.webp',
        720,
        1566,
        ['점수 추이 그래프와 지난 발표 목록', 'Score trend graph and the list of past talks'],
        ['발표 기록 · iOS 시뮬레이터 실제 앱 화면 · 시험 세션', 'Talk history · real app in the iOS simulator · test session'],
        '2026-11-02',
        'phone',
      ),
    ],
    sections: [
      section(
        'result',
        OUTCOMES,
        [
          ['캡스톤 디자인 및 AI 해커톤 대상(1등, 2024.10)과 SW중심대학 AI 창업 아이디어 경진대회 특별상(2025.05)을 받았습니다.', 'Won the grand prize (1st place) at the Capstone Design & AI Hackathon (Oct 2024) and a special award at the SW-Centered University AI Startup Idea Competition (May 2025).'],
          ['APIC-IST 2025 국제학술대회에 논문을 발표했습니다.', 'Presented a paper at the APIC-IST 2025 international conference.'],
          ['논문에서 보고한 음성→지표 지연은 평균 125ms(σ=18ms), 동시 20세션에서 최악 170ms입니다(추론·네트워크·화면 표시 포함, NVIDIA A10G 1개, 5명의 3분 발표 · 영어 3·한국어 2).', 'The speech-to-indicator latency reported in the paper is 125 ms on average (σ = 18 ms) and 170 ms at worst with 20 concurrent sessions (inference, network and rendering included; one NVIDIA A10G; 3-minute talks by 5 people, 3 in English and 2 in Korean).'],
          ['소규모 사용자 조사(5명)에서 5명 모두 실시간 표시가 말 속도 교정에 도움이 된다고 답했습니다.', 'In a small user survey (5 people), all five said the live indicators helped them correct their pace.'],
        ],
        { lead: true },
      ),
      section(
        'problem',
        PROBLEM_DEFINITION,
        [
          [
            '논문이 인용한 조사에서 대학생의 61%가 발표 불안을 겪지만, 오프라인 코칭은 비용과 지역 제약이 큽니다. 기존 서비스는 녹음 후 분석이 많거나, 영어 중심이거나, 맞춤형 설명이 부족합니다. 발표 도중 바로 고칠 수 있는 낮은 지연의 피드백이 필요했습니다.',
            "In a survey the paper cites, 61% of undergraduates report presentation anxiety, while in-person coaching is limited by cost and region. Existing services often analyze after recording, focus on English or lack tailored explanations. Talks needed low-latency feedback you can act on while speaking.",
          ],
          [
            '발표 중 피드백은 바로 와야 하는데, 음성을 글로 바꾸고 감정을 분석하고 LLM으로 조언을 만드는 일은 모두 무겁습니다. 한 요청 안에서 처리하면 화면이 멈춥니다.',
            'Feedback during a talk has to arrive right away, but transcription, emotion analysis and LLM advice are all heavy. Doing them in one request freezes the screen.',
          ],
        ],
        { lead: true },
      ),
      section(
        'implementation',
        ARCHITECTURE,
        [
          [
            '실시간 피드백: 앱이 음성을 서버로 보내면 SenseVoice-Small이 분석하고, 결과를 WebSocket의 JSON으로 돌려줘 색상 지표를 갱신합니다.',
            'Live feedback: the app sends audio to the server, SenseVoice-Small analyzes it, and the result returns as JSON over WebSocket to update the color indicators.',
          ],
          [
            '받아쓰기: 앱에서 기기 음성 인식으로 처리하고, 불가능하면 서버 인식을 사용합니다.',
            'Transcription: handled by speech recognition on the device, or by the server when that is unavailable.',
          ],
          [
            '보고서 생성: 발표가 끝나면 받아쓰기와 지표를 GPT-4o-mini에 보내 보고서를 만듭니다. 호출은 세션당 한 번이라 비용을 낮게 유지합니다.',
            'Report: after the talk, the transcript and metrics go to GPT-4o-mini to write the report. It is called once per session, which keeps costs low.',
          ],
          [
            '위 세 흐름은 논문 기준 구조입니다. 시기별 구조와 역할은 아래 표로 구분합니다.',
            'These three flows are the structure in the paper. The table below separates the structure and my part by period.',
          ],
        ],
        {
          anchor: 'architecture',
          table: {
            head: [k('구분', 'Version'), k('구조', 'Architecture'), k('내 역할', 'My part'), k('상태', 'Status')],
            rows: [
              [
                k('2024–25 팀 버전', '2024–25 team version'),
                k('Flask가 녹음을 받아 백그라운드 스레드가 5초씩 SenseVoice로 분석, 앱은 결과를 다시 조회', 'Flask receives the recording; a background thread analyzes 5 s chunks with SenseVoice; the app polls for results'),
                k('백엔드·AI (5인 팀: 백엔드 2, 프론트엔드 2, 디자인 1 · 앱 UI는 팀원 Flutter)', 'Backend and AI (team of 5: backend 2, frontend 2, design 1 · app UI by a teammate in Flutter)'),
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
                k('Socket.IO로 0.25초 조각 전송, 서버가 5초씩 모아 음량·속도·간투사·감정 분석, 발표 후 분석은 BullMQ', 'Socket.IO sends 0.25 s chunks; the server analyzes volume, pace, filler words and emotion every 5 s; post-talk analysis runs on BullMQ'),
                k('전체', 'All of it'),
                k('보고서 화면까지 구현, 단위 테스트 30개 통과, iOS 시뮬레이터 시연, 실기기 확인 전', 'Built through the report screen; 30 unit tests pass; demonstrated in the iOS simulator; not yet checked on a real phone'),
              ],
            ],
          },
        },
      ),
      section(
        'implementation',
        DECISIONS,
        [
          [
            '실시간 모델: 논문이 인용한 공개 벤치마크에서 SenseVoice-Small은 10초 오디오를 약 70ms에 처리해 Whisper-Large-V3(1,281ms)보다 15배 이상 빠릅니다. 다국어와 감정 인식도 지원해 선택했습니다.',
            'The live model: in the public benchmark the paper cites, SenseVoice-Small handles 10 s of audio in about 70 ms, over 15 times faster than Whisper-Large-V3 (1,281 ms). It also supports multiple languages and emotion recognition, so I chose it.',
          ],
          [
            '역할 분리: 빠른 판정은 음성 모델이, 설명형 보고서는 GPT-4o-mini가 맡게 나눴습니다.',
            'Splitting the work: the speech model makes the fast calls and GPT-4o-mini writes the explanatory report.',
          ],
        ],
        { anchor: 'decisions' },
      ),
      section(
        'implementation',
        SOLVED,
        [
          [
            '낮은 지연 유지(논문). 문제: 큰 음성 모델은 10초 오디오에 1초 이상 걸려 발표 중 피드백에 쓰기 어렵습니다. 해결: SenseVoice-Small을 쓰고 여러 세션의 프레임을 asyncio로 묶어 병렬 처리했습니다. 20세션에서 GPU 사용률은 약 70%였고, 지연은 평균 125ms, 최악 170ms로 보고했습니다.',
            'Keeping latency low (paper). Problem: large speech models take over a second for 10 s of audio, too slow for feedback during a talk. Fix: SenseVoice-Small, with frames from many sessions batched in parallel on asyncio. With 20 sessions GPU use was about 70%, and latency was reported at 125 ms on average and 170 ms at worst.',
          ],
          [
            '느린 외부 호출(2026). 문제: 부분 받아쓰기와 감정 분석을 기다리면 다음 판정이 밀립니다. 해결: 서버가 음성을 5초씩 모아 음량을 먼저 계산하고, 받아쓰기와 감정 분석은 병렬로 부르며 각각 4초와 3초 제한을 둡니다. 실패해도 음량 피드백은 계속 나갑니다.',
            'Slow external calls (2026). Problem: waiting for partial transcription and emotion analysis delays the next call. Fix: the server gathers audio into 5 s windows and computes volume first, then calls transcription and emotion in parallel with 4 s and 3 s limits. Volume feedback keeps going even when they fail.',
          ],
          [
            '무음 구간(2026). 문제: 조용한 구간까지 Whisper에 보내면 비용이 들고, 없는 말을 만들어 내기도 합니다. 해결: 음량이 기준보다 낮으면 받아쓰기를 건너뛰고, 무음에서 자주 생기는 가짜 문구는 목록으로 걸러 말 속도 계산에서 뺍니다.',
            'Silent stretches (2026). Problem: sending silence to Whisper costs money and can produce phrases nobody said. Fix: below a volume threshold transcription is skipped, and the false phrases that silence tends to produce are filtered out of the pace calculation by a list.',
          ],
          [
            '무거운 분석 분리(2026). 문제: 발표 후 Whisper, LLM, PDF를 요청 안에서 처리하면 실시간 서버를 막습니다. 해결: BullMQ 작업으로 넘겨 별도 워커가 처리합니다. 실패하면 5초 뒤 한 번 더 시도하고, 결과는 세션 기준 upsert로 저장해 중복되지 않습니다.',
            'Moving heavy analysis out (2026). Problem: running Whisper, the LLM and the PDF inside a request blocks the live server. Fix: they go to BullMQ jobs on a separate worker. A failure retries once after 5 s, and results are upserted per session so nothing is duplicated.',
          ],
          [
            '녹음 처리(2026). Whisper가 헤더 없는 PCM 음성을 받지 않아 WAV 헤더를 직접 붙였고, iOS 녹음 문제는 React Native 새 아키텍처를 지원하는 라이브러리로 바꾸고 최소 iOS 버전을 16.4로 올려 해결했습니다.',
            'Recording (2026). Whisper would not take headerless PCM audio, so I add the WAV header myself; recording on iOS was fixed by switching to a library that supports the React Native new architecture and raising the minimum iOS version to 16.4.',
          ],
          [
            '확인 방법(2026). 단위 테스트 30개가 통과하고 전체 흐름을 재현 스크립트로 확인했으며, iOS 시뮬레이터에서 로그인부터 보고서 PDF 저장까지 시연했습니다. 실제 휴대폰에서는 아직 확인하지 않았습니다.',
            'How it was checked (2026). 30 unit tests pass, a script replays the whole flow, and it was demonstrated in the iOS simulator from login to saving the report PDF. It has not been checked on a real phone yet.',
          ],
        ],
        { anchor: 'solved' },
      ),
      section('retro', REFLECTION, [
        [
          '사용자 조사가 5명으로 적었습니다. 지연 수치는 논문 시점 구조의 값이고 2026 버전에서 다시 재지 않았으며, 2026 버전은 실제 휴대폰 확인 전입니다. 다음 할 일은 재측정, 큐 재시도 처리 보완, 장기 추적 대시보드입니다.',
          'The user survey had only 5 people. The latency figures belong to the structure at the time of the paper and were not re-measured on the 2026 version, which has not been checked on a real phone yet. Next come re-measuring, better queue retries and a long-term tracking dashboard.',
        ],
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
      section('evidence', MATERIAL, [
        [
          '2024·2026 코드는 공개하지 않았습니다. 2026 앱의 시연 영상과 화면은 이 페이지에 있고, 수치는 APIC-IST 2025 발표 논문을 기준으로 적었습니다.',
          'The 2024 and 2026 code are not public. A demo video and screens of the 2026 app are on this page, and the figures follow the paper presented at APIC-IST 2025.',
        ],
      ]),
    ],
  },

  {
    slug: 'media-pulse',
    name: 'Media Pulse',
    years: [2023],
    tier: 'card',
    showcase: 'other',
    period: '2023.03–2023.10',
    team: k('3인 · 첫 웹 프로젝트', 'Team of 3 · my first web project'),
    role: k('팀장 · 백엔드 · DB · API 연동 · 프론트엔드 구조와 피드백', 'Team lead · backend · database · API integration · frontend structure and feedback'),
    stack: ['Node.js', 'Express', 'MongoDB', 'Python', 'Plotly.js', 'Naver API'],
    summary: k(
      '유명인 키워드의 월별 네이버 검색량 추이를 추정해 기기별 차트로 보여 주는 웹 서비스. 트렌드 API가 상대값만 주자 세 API를 비교 검증하고, 네이버 검색광고 API의 월간 검색 수를 기준값으로 삼아 검색량을 추정했습니다.',
      'A web service that estimates monthly Naver search volume for celebrity keywords and charts it by device. The trend API gave only relative values, so I compared and checked three APIs and used the monthly search counts from the Naver search ad API as the baseline for the estimate.',
    ),
    product: k(
      '유명인 키워드의 월별 네이버 검색량 추이를 추정해 기기별 차트로 보여 주는 첫 웹 서비스',
      'My first web service, which estimates monthly Naver search volume for celebrity keywords and charts it by device',
    ),
    sections: [
      section('implementation', ROLE, [['팀장으로서 백엔드·DB·네이버 API 연동을 맡았고, 프론트엔드는 화면 구조를 잡고 피드백으로 참여했습니다.', 'As team lead I handled the backend, database and Naver API integration, and on the frontend I set the screen structure and gave feedback.']], { lead: true, anchor: 'role' }),
      section('implementation', MEMORABLE, [[
        '트렌드 API가 실제 횟수 없이 상대값만 주어 세 API를 비교 검증하고, 네이버 검색광고 API의 월간 검색 수를 기준값으로 삼아 검색량을 추정했습니다. 값은 추정치입니다.',
        'The trend API gives only relative values, so I compared and checked three APIs and used the monthly search counts from the Naver search ad API as the baseline. The figures are estimates.',
      ]], { anchor: 'problem' }),
    ],
    imageSize: [955, 782],
    image: '/images/projects/media-pulse.png',
    imageCaption: k('월별 검색량 추이 차트 · 실제 화면', "Monthly search-volume chart · real screen"),
  },
  {
    slug: 'label-light',
    name: 'Label Light',
    years: [2024],
    tier: 'supporting',
    showcase: 'supporting',
    period: '2024.04–2024.11',
    team: k('2인 · 1저자 논문', 'Team of 2 · first-author paper'),
    role: k('기획 · 백엔드 · AI 챗봇 설계', 'Planning · backend · AI chatbot design'),
    stack: ['Express', 'MySQL', 'OpenAI Assistants', 'GPT-4o-mini', 'Whisper', 'Google TTS'],
    summary: k(
      '시니어가 일상 대화를 나누는 동안 노인 우울 척도(GDS) 문항을 대화 속에서 끌어내는 음성 챗봇. 직접 설문과 일상 대화 방식을 비교해 거부감이 적은 대화 방식으로 구성하고, 모델 3종을 비교해 고른 GPT-4o-mini에 파인튜닝, RAG, 프롬프트를 결합했습니다. 2024 한신 AISW 페스티벌 일반 부문 특별상 · 2025 한국디지털콘텐츠학회 하계 논문(1저자 · 동상).',
      'A voice chatbot that draws Geriatric Depression Scale questions out of everyday conversation with seniors. After comparing a direct questionnaire with everyday conversation, it uses conversation, which people resist less. GPT-4o-mini, chosen from three compared models, combines fine-tuning, RAG and prompts. Special Award (General) at the 2024 Hanshin AISW Festival · first-author paper (Bronze Award) at the 2025 Korea Digital Contents Society summer conference.',
    ),
    product: k(
      '시니어가 일상 대화를 나누는 동안 노인 우울 척도(GDS) 문항을 대화 속에서 끌어내는 음성 서비스',
      'A voice service that draws Geriatric Depression Scale questions out of everyday conversation with seniors',
    ),
    features: pairs([
      ['음성으로만 진행하는 대화와 대화 기반 GDS 평가', 'Voice-only conversation and GDS assessment from it'],
      ['GDS 점수, 감정 상태, 개선 방안을 담은 결과 보고서', 'A report with the GDS score, emotional state and suggestions'],
      ['큰 글씨와 간결한 버튼의 시니어용 화면', 'Large text and simple buttons for seniors'],
    ]),
    sections: [
      section('result', OUTCOMES, [
        ['2024 한신 AISW 페스티벌 일반 부문 특별상을 받았습니다.', 'Won the Special Award (General) at the 2024 Hanshin AISW Festival.'],
        ['2025 한국디지털콘텐츠학회 하계종합학술대회에 1저자로 논문을 발표해 대학생 논문경진대회 동상을 받았습니다.', 'Presented a first-author paper at the 2025 Korea Digital Contents Society summer conference and won a Bronze Award in the student paper competition.'],
      ], { lead: true }),
      section(
        'problem',
        PROBLEM_DEFINITION,
        [
          [
            '시니어를 위한 정신건강 자가 점검 서비스는 부족하고, 정신건강 검사라는 말 자체에 거부감이 있습니다. 글을 읽고 입력하는 것이 불편한 사용자도 많습니다.',
            'Mental-health self-check services for seniors are scarce, many resist the idea of a mental health test, and many find reading and typing difficult.',
          ],
        ],
        { lead: true },
      ),
      section(
        'implementation',
        ROLE,
        [
          [
            '서비스 기획, AI 챗봇 설계, 백엔드 개발을 맡았고 논문 1저자로 참여했습니다. 화면 개발은 팀원이 맡았습니다.',
            'I handled service planning, the AI chatbot design and backend development, and was first author of the paper. A teammate built the frontend.',
          ],
        ],
        { lead: true, anchor: 'role' },
      ),
      section(
        'implementation',
        ARCHITECTURE,
        [
          [
            'Express 서버와 MySQL을 쓰고, OpenAI Assistants API가 대화를 맡습니다. 음성 대화는 브라우저 녹음(WebM) → ffmpeg로 WAV 변환 → Whisper 받아쓰기 → Assistant 응답 → Google TTS 재생 순서로 이어집니다.',
            'It uses an Express server and MySQL, with the OpenAI Assistants API handling conversation. A voice exchange runs from a browser recording (WebM) → conversion to WAV with ffmpeg → Whisper transcription → the Assistant’s response → Google TTS playback.',
          ],
        ],
        { anchor: 'architecture' },
      ),
      section(
        'implementation',
        DECISIONS,
        [
          [
            '검사 방식: 직접 설문은 명확하지만 거부감을 일으킬 수 있고, 일상 대화는 다소 부정확해도 거부감이 적습니다. 두 방식을 시험해 보고 일상 대화 방식으로 구성했습니다.',
            'How to assess: a direct questionnaire is clear but can provoke resistance, while everyday conversation can be less exact but meets less resistance. After testing both, I built the service around conversation.',
          ],
          [
            '모델 선정: GPT-4o, GPT-4o-mini, Llama 3.1 8B를 가격, 응답 속도, 대화 자연스러움 등으로 비교해 GPT-4o-mini를 골랐습니다.',
            'Choosing the model: GPT-4o, GPT-4o-mini and Llama 3.1 8B were compared on price, response speed, how natural the conversation felt and more, and GPT-4o-mini was chosen.',
          ],
        ],
        { anchor: 'decisions' },
      ),
      section(
        'implementation',
        SOLVED,
        [
          [
            '일관된 평가와 자연스러운 대화. 문제: 평가는 일관되어야 하는데 대화는 설문처럼 들리지 않아야 합니다. 해결: 정신과 대화 데이터를 전처리해 파인튜닝하고, GDS 자료와 보고서 양식은 RAG로 참고하며, 30문항을 일상 대화처럼 묻는 것은 프롬프트로 맞췄습니다.',
            'Consistent assessment in natural conversation. Problem: the assessment must be consistent, but the conversation must not sound like a questionnaire. Fix: psychiatric conversation data was preprocessed for fine-tuning, RAG supplies GDS material and the report template, and prompts ask the 30 questions like everyday conversation.',
          ],
          [
            '글을 쓰기 어려운 사용자. 문제: 글을 읽고 입력하는 것이 불편한 사용자가 많습니다. 해결: Whisper와 Google TTS로 음성으로만 대화하게 하고, 큰 글씨와 간결한 버튼을 썼습니다.',
            'Users who find typing hard. Problem: many users find reading and typing difficult. Fix: Whisper and Google TTS allow a voice-only conversation, with large text and simple buttons.',
          ],
        ],
        { anchor: 'solved' },
      ),
      section('retro', REFLECTION, [
        [
          '테스트 케이스가 적고 실제 사용자 검증을 하지 못했습니다. 다음에는 실제 사용 사례로 검증하고, 음성의 높낮이와 영상까지 활용해 보겠습니다.',
          'There were few test cases and no checks with real users. Next I would validate with real use and try using pitch and video too.',
        ],
      ]),
    ],
    imageSize: [695, 868],
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
    tier: 'supporting',
    showcase: 'supporting',
    period: '2025.03–2025.12',
    team: k('4인 · 캡스톤', 'Team of 4 · capstone'),
    role: k('프론트엔드·백엔드 구조 설계 및 개발 · AI 에이전트 구조 · DB 설계', 'Frontend and backend structure and development · AI agent structure · database design'),
    stack: ['React', 'Express', 'MySQL', 'MongoDB', 'OpenAI Assistants'],
    summary: k(
      '목표 설정, 노트 작성, 퀴즈 풀이, 피드백, 학습 계획 조정으로 이어지는 흐름을 구상하고 설계한 AI 통합 학습 지원 시스템. 요청 의도에 맞는 모델과 도구로 보내는 AI Agent·MCP 구조와 MySQL·MongoDB 저장 구조를 설계했습니다. 한국디지털콘텐츠학회 논문 2편(은상 2회).',
      'An AI learning-support system conceived and designed around a flow from setting goals to notes, quizzes, feedback and adjusting the plan. The design covers an AI Agent and MCP structure that sends each request to a suitable model or tool, and storage split across MySQL and MongoDB. Two Korea Digital Contents Society papers (two Silver Awards).',
    ),
    product: k(
      '목표 설정, 노트 작성, 퀴즈 풀이, 피드백, 학습 계획 조정으로 이어지는 흐름을 구상하고 설계한 AI 통합 학습 지원 시스템',
      'An AI learning-support system conceived and designed around a flow from setting goals to notes, quizzes, feedback and adjusting the plan',
    ),
    sections: [
      section('result', OUTCOMES, [
        ['2025 한신 AISW 페스티벌 캡스톤 디자인 부문 특별상을 받았습니다.', 'Special Award (Capstone Design) at the 2025 Hanshin AISW Festival.'],
        ['한국디지털콘텐츠학회 2025 하계·추계 학술대회에서 논문 두 편을 발표해 각각 대학생 논문경진대회 은상을 받았습니다.', 'Presented two papers at the 2025 summer and fall Korea Digital Contents Society conferences, each winning a Silver Award in the student paper competition.'],
      ], { lead: true }),
      section(
        'problem',
        PROBLEM_DEFINITION,
        [
          [
            '기존 학습 관리 시스템은 콘텐츠 제공과 성적 관리에 집중해, 학습자의 패턴을 활용한 일정 조정과 피드백이 제한적입니다. 그래서 학습자가 목표를 세우고 노트와 퀴즈 결과로 계획을 고쳐 나가는 흐름을 하나의 시스템으로 구상했습니다.',
            'Existing learning management systems focus on delivering content and managing grades, with limited scheduling and feedback based on how each learner studies. So I planned one system in which learners set goals and keep adjusting their plan from notes and quiz results.',
          ],
        ],
        { lead: true },
      ),
      section(
        'implementation',
        ROLE,
        [
          [
            '프론트엔드와 백엔드의 전체 구조, AI 에이전트의 요청 처리 흐름, 데이터베이스 선정과 스키마 설계를 맡았습니다.',
            'I handled the overall frontend and backend structure, the AI agent’s request-handling flow, and choosing the databases and designing their schema.',
          ],
        ],
        { lead: true, anchor: 'role' },
      ),
      section(
        'implementation',
        ARCHITECTURE,
        [
          [
            '시스템을 6개 모듈로 나눠 설계했습니다. 화면, 백엔드·외부 API 연결, 데이터 저장이 기반을 맡고, 학습 일정·성과 관리, AI 퀴즈 생성, AI 분석·추천 모듈이 학습 흐름을 맡습니다.',
            'The system is designed as six modules. Interface, backend and external APIs, and storage form the base; schedule and progress, quiz generation, and analysis and recommendation carry the study flow.',
          ],
          [
            '요청은 의도 분석(AI Agent) → 모델 선택(라우팅) → 데이터 연동(MCP) → 응답 생성 → 로그 저장 순서로 처리하도록 설계했습니다.',
            'Requests are designed to flow through intent analysis (AI Agent) → model selection (routing) → data access (MCP) → response → logging.',
          ],
        ],
        { anchor: 'architecture' },
      ),
      section(
        'implementation',
        DECISIONS,
        [
          [
            '데이터 저장: 개인정보, 인증, 학습 계획은 MySQL에, 채팅, 퀴즈, AI 피드백 로그처럼 구조가 바뀌기 쉬운 데이터는 MongoDB에 나눠 저장하도록 설계했습니다.',
            'Storage: personal details, authentication and study plans go in MySQL, while data whose shape changes easily, such as chats, quizzes and AI feedback logs, goes in MongoDB.',
          ],
          [
            'AI 구조: 요청 의도를 먼저 분석해 GPT, Claude, Gemini 같은 모델이나 외부 도구로 보내는 AI Agent 라우팅을 구상했고, 외부 API와 내부 DB 연동은 MCP가 맡도록 나눴습니다.',
            'AI structure: I planned AI Agent routing that first analyzes the intent and sends a request to a model such as GPT, Claude or Gemini or to an external tool, with MCP set apart for external APIs and internal databases.',
          ],
          [
            '학습 순환: 노트와 이전 퀴즈 결과로 문제를 만들어 채점하고, 강점과 취약점 리포트가 다음 계획으로 이어지도록 설계했습니다.',
            'The study loop: questions come from notes and earlier quiz results, and a report on strengths and weaknesses feeds into the next plan.',
          ],
        ],
        { anchor: 'decisions' },
      ),
      section('retro', REFLECTION, [
        [
          '설계한 구조를 실제 사용자 데이터로 검증하지 못했습니다.',
          'I did not validate the design with real user data.',
        ],
      ]),
    ],
    imageSize: [1481, 843],
    image: '/images/projects/edumatrix.png',
    imageCaption: k('학습 진행률·계획 캘린더·추천 학습이 있는 대시보드 · 실제 화면', "Dashboard with progress, a study calendar and recommendations · real screen"),
  },
  {
    slug: 'innoview',
    name: 'InnoView',
    years: [2025],
    tier: 'supporting',
    showcase: 'supporting',
    period: '2025.05–2025.12',
    team: k('팀 초안(2025.05–08) · 오픈소스 개발자대회 출품 → 개인 리뉴얼(2025.10–12)', 'Team draft (May–Aug 2025) · entered in the Open Source Developer Competition → solo renewal (Oct–Dec 2025)'),
    role: k('백엔드·프론트엔드·AI 모델(초안) · 리뉴얼과 직무별 면접 전체(개인)', 'Backend, frontend and AI models (draft) · all of the renewal and role-based interviews (solo)'),
    stack: ['React', 'Express', 'MySQL', 'Whisper', 'Google TTS', 'OpenAI Assistants', 'AssemblyAI', 'TensorFlow.js'],
    summary: k(
      '이력서와 직무에 맞는 면접 질문을 만들고, 답변을 음성, 텍스트, 영상으로 분석해 꼬리 질문을 이어 가는 모의 면접 서비스. 표정, 시선, 자세와 발음, 말 속도를 함께 살펴보고, 꼬리 질문이 끝없이 이어지지 않도록 면접을 서버에서 15문항으로 제한했습니다.',
      'A mock-interview service that writes questions for your résumé and role, analyzes answers through voice, text and video, and asks follow-ups. It looks at facial expression, eye contact, posture, pronunciation and speaking pace, and the server caps an interview at 15 questions so follow-ups cannot run on forever.',
    ),
    product: k(
      '이력서와 직무에 맞는 면접 질문을 만들고, 답변을 음성, 텍스트, 영상으로 분석해 꼬리 질문을 이어 가는 모의 면접 서비스',
      'A mock-interview service that writes questions for your résumé and role, analyzes answers through voice, text and video, and asks follow-ups',
    ),
    features: pairs([
      ['이력서·자기소개서 관리와 직무별·기업별 AI 면접', 'Résumé and cover-letter management, and AI interviews by role and company'],
      ['음성 답변 받아쓰기와 AI 면접관 음성', 'Transcribed spoken answers and a spoken AI interviewer'],
      ['표정·시선·자세, 발음·감정·말 속도·간투사 분석', 'Analysis of expression, eye contact, posture, pronunciation, emotion, pace and filler words'],
      ['세션 피드백과 PDF 리포트', 'Session feedback and a PDF report'],
    ]),
    sections: [
      section('result', OUTCOMES, [
        ['2025 한신 AISW 페스티벌 창업 아이디어 부문 장려상을 받았습니다.', 'Honorable Mention (Startup Idea) at the 2025 Hanshin AISW Festival.'],
        ['오픈소스 개발자대회 출품작이며, 한신대 AI 면접 특강 2회(2025.10)와 쏘랩 시연(2025.11)에서 학생들이 직접 써 봤습니다.', 'Entered in the Open Source Developer Competition; students tried it themselves at two AI interview workshops at Hanshin University (Oct 2025) and a SoLab demo (Nov 2025).'],
      ], { lead: true }),
      section(
        'problem',
        PROBLEM_DEFINITION,
        [
          [
            '혼자 면접을 준비하면 이력서와 직무에 맞는 질문을 받기 어렵고, 답변 내용 말고 말투, 표정, 자세에 대한 피드백도 얻기 어렵습니다.',
            'Preparing alone, it is hard to get questions that fit your résumé and role, or feedback beyond the content of your answers, such as your delivery, expression and posture.',
          ],
        ],
        { lead: true },
      ),
      section(
        'implementation',
        ROLE,
        [
          [
            '대회 초안(2025.05–08)은 팀으로 만들어 백엔드, 프론트엔드, AI 모델 개발을 맡았고, 이후 리뉴얼(2025.10–12)과 직무별 면접 추가는 혼자 진행했습니다.',
            'The competition draft (May–Aug 2025) was a team effort, where I worked on the backend, frontend and AI models. The later renewal (Oct–Dec 2025) and role-based interviews were on my own.',
          ],
        ],
        { lead: true, anchor: 'role' },
      ),
      section(
        'implementation',
        ARCHITECTURE,
        [
          [
            '면접은 자기소개 요청 → 초기 질문 → 꼬리 질문 → 다음 질문 → 마무리 순서로 진행합니다. 기업과 직무에 맞는 OpenAI Assistant가 질문을 만들고, Google TTS로 읽어 주며, 답변은 Whisper로 받아 적습니다.',
            'An interview runs from a self-introduction request → the first question → follow-ups → the next question → the close. An OpenAI Assistant matched to the company and role writes the questions, Google TTS reads them aloud, and Whisper transcribes the answers.',
          ],
          [
            '표정, 시선, 자세는 브라우저에서, 발음, 감정, 말 속도, 간투사는 서버에서 분석해 세션 피드백과 PDF 리포트로 보여 줍니다. 데이터는 MySQL 14개 테이블에 저장합니다.',
            'Expression, eye contact and posture are analyzed in the browser, and pronunciation, emotion, pace and filler words on the server, feeding session feedback and a PDF report. Data lives in 14 MySQL tables.',
          ],
        ],
        { anchor: 'architecture' },
      ),
      section(
        'implementation',
        DECISIONS,
        [
          [
            '직무별·기업별 면접관: 프롬프트 하나에 모든 직무를 넣지 않고, 기업과 직무마다 Assistant를 나눴습니다.',
            'Interviewers by role and company: instead of one prompt for every role, each company and role has its own Assistant.',
          ],
          [
            '영상은 브라우저에서 분석: 프레임 이미지는 데이터가 너무 커서 결과 값만 서버로 넘깁니다.',
            'Analyzing video in the browser: frame images are far too large, so only the results go to the server.',
          ],
        ],
        { anchor: 'decisions' },
      ),
      section(
        'implementation',
        SOLVED,
        [
          [
            '끝나지 않는 면접. 문제: AI 면접관이 꼬리 질문을 끝없이 만들었습니다. 해결: 프롬프트 수정과 함께 서버 규칙으로 제한했습니다. 총 15문항에 15번째는 고정된 마무리 질문이고, 꼬리 질문은 답변이 짧을 때 한 번까지만 만듭니다.',
            'Interviews that never ended. Problem: the AI interviewer kept generating follow-ups. Fix: prompt changes plus server rules. There are 15 questions, the 15th a fixed closing question, and a follow-up comes only after a short answer, at most once.',
          ],
          [
            '직무에 맞는 질문. 문제: 직무와 무관한 자료가 검색되어 질문이 일반적으로 나왔습니다. 해결: 질문 데이터와 검색 자료를 직무·기업별로 나눠 두고, Assistant도 직무·기업마다 따로 만들었습니다.',
            'Questions that fit the role. Problem: unrelated material was retrieved, so the questions came out generic. Fix: question data and search material are kept separately by role and company, and each role and company has its own Assistant.',
          ],
          [
            '음성 처리. Label Light에서 쓴 음성 파이프라인(WebM → ffmpeg → WAV → Whisper)을 가져오고, 연결 오류가 나면 다시 말해 달라고 안내합니다.',
            'Audio handling. The voice pipeline from Label Light (WebM → ffmpeg → WAV → Whisper) is reused, and a connection error prompts the user to try again.',
          ],
        ],
        { anchor: 'solved' },
      ),
      section('retro', REFLECTION, [
        [
          '실제 기업 면접 질문 데이터 등으로 질문 품질을 높이고, 표정과 자세 인식을 개선하겠습니다.',
          'I would raise question quality with data such as real company interview questions, and improve expression and posture recognition.',
        ],
      ]),
    ],
    imageSize: [1400, 767],
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
      'LLM이 일정을 제안하면 다른 LLM 역할이 휴식과 과부하 기준으로 검토하고(최대 2번), 사용자가 승인해야 Google 캘린더에 기록하는 일정 관리 서비스. 한국정보통신학회 2026 춘계 논문 「A2A 협업 기반 웰니스 일정 관리 시스템」(1저자).',
      'A scheduling service where one LLM proposes a schedule, another LLM role reviews it against rest and overload criteria (up to twice), and nothing goes into Google Calendar until the user approves. First-author paper at the 2026 KIICE spring conference: “A Wellness Scheduling System Based on A2A Collaboration”.',
    ),
    image: '/images/projects/restplanner.png',
    imageCaption: k('일정 요청 입력 화면 · 실제 화면', "Schedule request screen · real screen"),
  },
  {
    slug: 'ai-hiring-textmining',
    name: 'AI 채용 담론 텍스트마이닝',
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
      'Mac 안에서만 도는 홀로그램 비서 실험. 손동작으로 화면을 다루고, 말로 물으면 답을 읽어 줍니다. 로컬 LLM 답을 문장 단위로 끊어 나오는 대로 읽게 했습니다.',
      'A holographic assistant experiment that runs entirely on a Mac: hand gestures to work the screen, and spoken questions answered aloud. The local LLM’s answer is read aloud sentence by sentence as it arrives.',
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
    years: [2025, 2026],
    tier: 'line',
    period: '2025.09–2026.04',
    stack: ['React', 'Gemini API'],
    summary: k(
      '회의 발언을 받아 적어 문장별 감정과 회의 요약을 보여 주는 브라우저 프로토타입(3인). 한국디지털콘텐츠학회 2026 하계 논문(1저자).',
      'A browser prototype that transcribes what is said in a meeting and shows the emotion of each sentence and a summary of the meeting (team of 3). First-author paper at the 2026 Korea Digital Contents Society summer conference.',
    ),
    image: '/images/projects/teamflow.png',
    imageCaption: k('회의 화면과 AI 퍼실리테이터 패널 · 실제 화면', "Meeting screen with the AI facilitator panel · real screen"),
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
]
