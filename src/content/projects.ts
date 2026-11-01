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


const OUTCOMES: Pair = ['핵심 성과', 'Key results']
const PROBLEM_DEFINITION: Pair = ['문제 정의', 'Problem']
const ARCHITECTURE: Pair = ['시스템 구조', 'System structure']
const DECISIONS: Pair = ['주요 의사 결정', 'Key decisions']
const SOLVED: Pair = ['핵심 기술 문제 해결', 'Technical problems solved']
const REFLECTION: Pair = ['회고 및 개선 방향', 'Reflection and next steps']
const MATERIAL: Pair = ['관련 자료', 'Related material']

const ROLE: Pair = ['담당 역할', 'My role']
const MEMORABLE: Pair = ['인상적인 문제', 'A memorable problem']

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
      ['부동산 6Way: 두 주택의 양도·증여·부담부증여 여섯 경우를 중과 유예 전후로 비교', 'Property 6Way: six options for sale, gift and gift with debt on two homes, compared before and after the surcharge grace period'],
      ['디지털 자산 세금: 거래를 입력해 2027년 예상 세금 계산', 'Digital-asset tax: enter trades and get the estimated 2027 tax'],
      ['해외주식 양도세: 결제일 환율로 환산하고 이익을 주가 몫과 환율 몫으로 구분', 'Foreign-stock gains: converted at settlement-date rates, with the gain split into price and currency parts'],
      ['해외주식 증여 평가: 전후 2개월 평균 종가로 평가하고 증여세 추정', 'Foreign-stock gift valuation: two-month average close and a gift-tax estimate'],
    ]),
    resumeItems: pairs([
      [
        '해외주식 양도세 엔진: 매수·매도를 각자의 결제일 환율로 원화 환산하고, 이익을 주가로 생긴 몫과 환율로 생긴 몫으로 나눔. 증여 평가(전후 2개월 평균 종가)와 증여세 추정까지',
        'Foreign-stock capital gains engine: each buy and sell converted at its own settlement-date rate, with the gain split into a stock-price part and an exchange-rate part; plus gift valuation (two-month average close) and a gift-tax estimate',
      ],
      [
        '시세·환율 연동: Upbit→CoinGecko, 한국은행 ECOS→ECB로 대체 조회하고, 확정된 값만 오래 캐시하며 사용자별·전체 요청을 제한',
        'Market-data integrations: Upbit→CoinGecko and Bank of Korea ECOS→ECB fallbacks, long caching only for settled values, and per-user plus global rate limits',
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
          '해외주식 양도세 엔진과 증여세 추정, 부동산 6Way 엔진과 PDF 리포트',
          'The foreign-stock capital gains engine and gift-tax estimate, the property 6Way engine and its PDF report',
        ],
        [
          '디지털 자산 엔진·증여 평가 모듈과 시세·환율 연동 일부: 회사 세무 SaaS의 코드를 개인용으로 옮기고 연도 판정·대체값·오류 문구를 더함',
          'Digital-asset engine, gift valuation module and part of the market-data integration: company SaaS code adapted for individuals, adding tax-year filtering, fallbacks and plain-language errors',
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
      section(
        'result',
        OUTCOMES,
        [
          ['부동산 6Way, 디지털 자산, 해외주식 양도세·증여 평가 계산기가 finz.kr에서 운영 중입니다. 사용자 수 같은 운영 지표는 집계하지 않아 적지 않습니다.', 'The property 6Way, digital-asset and foreign-stock gains and gift-valuation calculators are live at finz.kr. No usage metrics are collected, so none are given here.'],
          ['Finz 앱으로 출품한 2026 AI-SW중심대학 AI·블록체인 비즈니스모델 경진대회에서 우수상을 받았습니다(2026.05).', 'The Finz app won an Excellence Award at the 2026 AI-SW-Centered University AI & Blockchain Business Model Competition (May 2026).'],
        ],
        { lead: true },
      ),
      section(
        'problem',
        PROBLEM_DEFINITION,
        [
          [
            '세무를 잘 모르는 사람이 쓰는 계산기라 결과 숫자 하나가 큰 결정을 바꿉니다. 숫자가 맞는 것과 그 숫자가 어느 조문에서 나왔는지 보여 주는 것이 먼저입니다. 세금은 날짜의 시세·환율에 달렸는데, 그 값을 주는 외부 API는 느리거나 실패할 수 있습니다.',
            'People who know little about tax use these calculators, so one number can change a big decision. Getting it right and showing which statute it came from come first. Tax depends on prices and rates on specific dates, and the external APIs behind them can be slow or fail.',
          ],
        ],
        { lead: true },
      ),
      section(
        'implementation',
        DECISIONS,
        [
          [
            '6Way 옮기기: 세무사와 함께 Python으로 작성한 계산 로직을 웹에서 쓰려고 TypeScript로 옮기고, 원본과 같은 결과인지 기준 사례로 확인했습니다.',
            'Porting 6Way: the logic written in Python with a tax accountant was ported to TypeScript for the website and checked against the original with a reference case.',
          ],
          [
            '외부 데이터 실패: 시세·환율은 실패하면 대체 출처로 조회합니다. 대체한 값에는 표시를 남기고 캐시하지 않거나 짧게만 둡니다.',
            'External data failures: prices and rates fall back to a second source. Fallback values are marked and cached briefly or not at all.',
          ],
          [
            '보수적인 값: 2026-12-31 시가를 아직 조회할 수 없으면 실제 산 가격을 쓰고 화면에 알립니다.',
            'A cautious value: when the 2026-12-31 price is not available yet, the actual purchase price is used and the screen says so.',
          ],
        ],
        { anchor: 'decisions' },
      ),
      section(
        'implementation',
        SOLVED,
        [
          [
            '환율이 섞인 이익: 해외주식은 매수·매도를 각자의 결제일 환율로 원화 환산해 원 미만을 버리고, 이익을 주가 몫과 환율 몫으로 나눠 보여 줍니다.',
            'Gains mixed with currency moves: each foreign-stock buy and sell converts at its own settlement-date rate, truncated to the won, and the gain is shown split into price and currency parts.',
          ],
          [
            '계산 검증: 기준 워크북은 소수점을 그대로 두고 엔진은 단계마다 원 미만을 버려, ±10원을 허용 범위로 정해 비교했습니다. 21개 항목이 모두 범위 안에 들어오고 최대 차이는 1원입니다. 기준 사례의 단지 이름과 금액은 공개하지 않습니다.',
            'Checking the numbers: the reference workbook keeps fractions while the engine drops fractions of a won at each step, so ±10 won is the agreed tolerance. All 21 items land within it, with a largest gap of 1 won. The reference case’s complex name and amounts stay private.',
          ],
        ],
        { anchor: 'solved' },
      ),
      section(
        'implementation',
        ['회사의 다른 작업 · Finz 모바일 앱 (미출시)', 'Also at Finz Labs · Finz mobile app (not released)'],
        [
          [
            'Expo·FastAPI로 간편인증 → 지급명세서 조회 → 환급액 계산 → 결제로 이어지는 청년 세금 환급 MVP와 세무사 상담 연결 화면을 만들었습니다.',
            'With Expo and FastAPI, I built a tax refund MVP for young people, from simple authentication → fetching payment statements → calculating the refund → payment, and the screens connecting users with tax accountants.',
          ],
          [
            '생애주기 금융 기능(금융 교육 퀴즈, 모의투자, 소비·자산 대시보드, 금융 상품 비교)은 예시 데이터로 동작하는 시연 화면입니다.',
            'The life-stage finance features (a financial-literacy quiz, mock investing, a spending and assets dashboard, financial product comparison) are demo screens running on example data.',
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
                '청년 소득세 환급 · 앱 실제 화면을 단계별 설명과 함께 편집한 영상',
                'Tax refund for young people · real app screens edited with step captions',
              ],
              '2026-09-10',
            ),
          ],
        },
      ),
      section(
        'implementation',
        ['회사의 다른 작업 · 세무사용 FINZ (협력 개발사와 함께, 출시 전)', 'Also at Finz Labs · FINZ for tax accountants (with a partner company, not yet launched)'],
        [
          [
            '세무사용 FINZ는 양도·증여·상속·종부세 계산, 홈택스 신고 파일 생성, AI 세무 어시스턴트를 갖춘 세무사용 SaaS로, 협력 개발사와 함께 개발했습니다. 저는 회사 쪽 기술 책임자로 세금 계산 엔진 초안과 외부 API 연동, 배포·운영 방식, 개발 도구를 개발사와 함께 정하며 개발에 참여했고, 사양 작성과 검증, 장애 원인 분석을 맡았습니다.',
            'FINZ for tax accountants is a SaaS that calculates capital gains, gift, inheritance and comprehensive property tax, produces Hometax filing files and has an AI tax assistant, developed together with a partner development company. As the company-side technical lead I took part in development, deciding the tax-engine draft, external API integrations, the deployment and operations approach and the development tools together with the vendor, and I wrote the specs, verified the work and found the causes of failures.',
          ],
          [
            '배포가 9번 잇달아 실패했을 때, 타입 검사 메모리가 1,083MB에서 1,472MB로 36% 늘어난 것을 재어 확인하고 서버와 같은 메모리 상한(973MB)에서 오류를 재현해 서버 메모리 부족이 원인임을 밝혔습니다. 개발사는 진단이 맞다고 확인했습니다.',
            'When nine deployments failed in a row, I measured type-check memory up 36%, from 1,083 MB to 1,472 MB, and reproduced the crash under the server’s 973 MB heap cap, showing that server memory was the cause. The vendor confirmed the diagnosis.',
          ],
          [
            '개발사가 완료했다고 한 269건을 코드·테스트·화면 근거로 다시 확인해 233건을 확인하고 36건은 미완료로 남겼으며, 새 결함 45건을 찾았습니다.',
            'I re-checked the 269 items the vendor reported as done against code, tests and screens: 233 confirmed, 36 left open, plus 45 new defects.',
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
      section('retro', REFLECTION, [
        [
          '기준 사례가 하나뿐입니다. 경계값·반올림·잘못된 입력 사례를 늘리겠습니다.',
          'There is only one reference case. I would add boundary, rounding and invalid-input cases.',
        ],
        [
          '디지털 자산 엔진과 증여 평가 모듈은 SaaS에서 옮긴 뒤 들어간 수정이 아직 없습니다. 두 곳이 같은 엔진을 쓰도록 맞추고, 외부 시스템과 상태가 어긋나는 실패도 일부러 일으켜 확인하겠습니다.',
          'The crypto engine and gift-valuation module lack fixes made in the SaaS since they were adapted. I would have both use the same engine, and deliberately cause failures where our state drifts from an external system.',
        ],
      ]),
      section('evidence', MATERIAL, [
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
      ['CBT 모의고사와 오답 해설, 대화형 모의 면접', 'CBT mock exams with explanations of wrong answers, and conversational mock interviews'],
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
          '시연: 대시보드 → 학습 기록 → AI 모의면접 → CBT 모의고사 → AI 오답 해설 → 학습 메이트',
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
        ['AI 오답 분석 화면', 'AI wrong-answer analysis'],
        ['AI 오답 분석 · 실제 화면', 'AI wrong-answer analysis · real screen'],
        '2026-05-04',
      ),
      shot(
        '/media/skillpilot/interview.webp',
        1600,
        885,
        ['AI 모의면접 설정 화면', 'AI mock interview setup'],
        ['AI 모의면접 설정 · 실제 화면', 'AI mock interview setup · real screen'],
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
      section(
        'result',
        OUTCOMES,
        [
          ['공공데이터 API 7종을 연동해 자격증과 시험 일정을 자동으로 동기화했습니다.', 'Integrated 7 public data APIs so certifications and exam schedules sync automatically.'],
          ['13개 화면과 16개 백엔드 기능 모듈을 구현해 캡스톤을 마쳤습니다.', 'Finished the capstone with 13 screens and 16 backend feature modules.'],
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
            'HTTP 200 속의 실패: 공공 API가 실패해도 200과 "SERVICE ERROR" 문자열을 보내는 경우가 있어, 상태 코드만 보면 틀린 데이터가 저장될 수 있었습니다. 오류 문구가 담긴 200을 실패로 판정해 0.5초, 1초 간격으로 최대 2번 다시 시도하게 했습니다.',
            'Failures inside an HTTP 200: public APIs sometimes answer a failure with 200 and a "SERVICE ERROR" string, so judging by status code alone could store wrong data. A 200 with error text now counts as a failure and is retried up to twice, 0.5 s and 1 s apart.',
          ],
          [
            '7개 API 정규화: 응답 구조가 제각각이라 XML과 JSON 응답을 모두 해석해 내부 구조로 먼저 바꾸고, IT 종목만 고른 뒤 자격증 코드로 상세·통계·시험 일정을 결합했습니다. 동기화는 node-cron으로 주기적으로 돌고, 관리자가 직접 실행할 수도 있습니다.',
            'Normalizing 7 APIs: with every response shaped differently, both XML and JSON responses are parsed into an internal structure first, IT certifications are selected, and details, statistics and exam schedules are joined by certification code. Syncing runs periodically with node-cron, and an admin can also start it by hand.',
          ],
        ],
        { anchor: 'solved' },
      ),
      section('retro', REFLECTION, [
        [
          '자동화 테스트가 없고, 동기화 중복을 막는 unique 제약과 두 DB의 일관성 처리가 부족합니다. 다시 한다면 동기화 정규화 테스트, unique 제약, 실행 이력 기록부터 넣겠습니다.',
          'There are no automated tests, and the unique constraints against duplicate syncs and the consistency handling across the two databases fall short. Next time I would start with sync and normalization tests, unique constraints and a record of each run.',
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
    tier: 'supporting',
    showcase: 'supporting',
    title: k('ClosetMate 옷장·코디 추천 앱', 'ClosetMate wardrobe and outfit app'),
    product: k(
      '옷 사진을 종류, 색상, 스타일로 분류해 옷장에 넣고, 말이나 글로 상황을 입력하면 가진 옷으로만 코디를 추천하는 모바일 앱',
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
      ['착용 기록, 옷장 통계, 선택형 Vision 상세 분석', 'Wear history, wardrobe stats and optional detailed Vision analysis'],
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
    media: [
      shot(
        '/media/closetmate/recommend.webp',
        560,
        893,
        ['상황을 입력해 받은 코디 추천 결과', 'Outfit suggestions for a described occasion'],
        [
          '추천 결과 · 실제 앱 화면 · gpt-5.4-nano, 후보 10개, 응답 4,804ms',
          'Suggestions · real app screen · gpt-5.4-nano, 10 candidates, 4,804 ms',
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
    sections: [
      section(
        'result',
        OUTCOMES,
        [
          ['사진 등록부터 분류, 후보 생성, LLM 추천, 서버 검증까지 전체 흐름을 구현했습니다.', 'Built the whole flow from adding a photo through labeling, candidate outfits, LLM suggestions and the server check.'],
          ['옷장에 없는 옷을 담은 추천은 사용자에게 보내기 전에 차단합니다.', 'Suggestions with clothes not in the wardrobe are blocked before they reach the user.'],
        ],
        { lead: true },
      ),
      section('implementation', ROLE, [['기획, 모델 학습·비교, 서버 API, 모바일 앱을 혼자 맡았습니다.', 'I did the planning, model training and comparison, the server API and the mobile app on my own.']], { lead: true, anchor: 'role' }),
      section(
        'implementation',
        DECISIONS,
        [
          [
            'LLM은 규칙으로 만든 후보 중에서만 고르고, 서버가 형식 → 옷 ID → 후보 조합 순서로 검증합니다. 실패하면 보조 모델에 다시 요청합니다.',
            'The LLM picks only from rule-based candidates, and the server checks format → clothing IDs → candidate outfit. On failure it asks a backup model.',
          ],
          [
            '같은 조건 비교에서 약 15분의 1 크기인 MobileNetV3-Small을 고르고, 서버에서 ONNX로 추론합니다. CPU 추론은 오히려 ResNet50보다 느렸고, 크기를 근거로 골랐습니다.',
            'Compared under the same settings, I chose MobileNetV3-Small at about one fifteenth of the size and serve it with ONNX. On CPU it was actually slower than ResNet50; size was the reason for the choice.',
          ],
        ],
        { anchor: 'decisions' },
      ),
      section('retro', ['회고', 'Reflection'], [
        [
          '학습 코드에서 검증용 변환이 적용되지 않아, 고정 테스트 세트로 다시 재기 전까지 정확도 숫자는 쓰지 않습니다. 색상 분류, API 실패 시 대체 처리, 공개 서비스용 인증을 보완하겠습니다.',
          'The training code never applied the validation transforms, so I give no accuracy figures until re-measuring on a fixed test set. Color labeling, fallback on API failures and authentication for a public service come next.',
        ],
      ]),
    ],
  },

  // ── other featured work ───────────────────────────────────────────────────
  {
    slug: 'pitches',
    name: 'Pitches',
    years: [2024, 2026],
    tier: 'featured',
    showcase: 'main',
    title: k('Pitches 발표 코칭', 'Pitches presentation coaching'),
    product: k(
      '발표하는 동안 말 속도, 감정, 음정 변화를 분석해 색으로 바로 알려 주고, 발표가 끝나면 AI 코칭 보고서를 만들어 주는 모바일 서비스',
      'A mobile service that analyzes speaking pace, emotion and pitch during a talk, shows them right away as colors and writes an AI coaching report at the end',
    ),
    period: '2024.10–2026.10',
    team: k('2024 해커톤 5인(백엔드 2, 프론트엔드 2, 디자인 1) → 2025 2인 → 2026 혼자 리뉴얼', '2024 hackathon team of 5 (backend 2, frontend 2, design 1) → 2 in 2025 → renewed alone in 2026'),
    role: k('팀장 · 백엔드·AI 모델 적용 · 연구·발표 (앱 UI는 팀원) · 2026 리뉴얼은 전체', 'Team lead · backend and applying the AI models · research and presenting (app UI by a teammate) · all of the 2026 renewal'),
    status: k('2026 리뉴얼: 실시간 피드백·발표 후 분석·보고서 화면 구현, 실기기 확인 전', '2026 renewal: live feedback, post-talk analysis and report screens built; not yet checked on a real phone'),
    statusCheckedAt: '2026-10-29',
    stack: ['SenseVoice-Small', 'FunASR', 'WebSocket', 'asyncio', 'GPT-4o-mini', 'AWS', 'Fastify', 'Socket.IO', 'BullMQ', 'Redis', 'PostgreSQL', 'Whisper', 'Expo'],
    summary: k(
      '발표 중 말 속도와 감정을 분석해 알려 주는 코칭 서비스. 해커톤 대상과 창업 경진대회 특별상, 국제학술대회 논문으로 이어졌고 2026년에 혼자 다시 설계했습니다.',
      'A coaching service that analyzes speaking pace and emotion during a talk. It won a hackathon grand prize and a startup competition award, became an international conference paper, and I redesigned it alone in 2026.',
    ),
    features: pairs([
      ['실시간 말 속도·감정·음정 피드백과 색상 지표', 'Live feedback on pace, emotion and pitch with color indicators'],
      ['실시간 받아쓰기, 한국어·영어 지원', 'Live transcription in Korean and English'],
      ['발표 요약·음성 분석·개선 제안으로 구성된 보고서', 'A report with a talk summary, voice analysis and suggestions'],
    ]),
    resumeItems: pairs([
      [
        '발표 중 말 속도와 감정을 분석해 알려 주는 코칭 서비스. 해커톤 대상과 창업 경진대회 특별상, 국제학술대회 논문으로 이어졌고 2026년에 혼자 다시 설계했습니다.',
        'A coaching service that analyzes speaking pace and emotion during a talk. It won a hackathon grand prize and a startup competition award, became an international conference paper, and I redesigned it alone in 2026.',
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
        'result',
        OUTCOMES,
        [
          ['캡스톤 디자인 및 AI 해커톤 대상(1등, 2024.10), SW중심대학 AI 창업 아이디어 경진대회 특별상(2025.05).', 'Grand prize (1st place) at the Capstone Design & AI Hackathon (Oct 2024); special award at the SW-Centered University AI Startup Idea Competition (May 2025).'],
          ['APIC-IST 2025 국제학술대회 논문(2저자).', 'A paper at the APIC-IST 2025 international conference (second author).'],
          ['논문 측정 기준 음성-지표 지연 평균 125ms(σ=18ms), 동시 20세션에서 최악 170ms(추론, 네트워크, 화면 표시 포함).', 'As measured in the paper: 125 ms on average from speech to indicator (σ = 18 ms) and 170 ms at worst with 20 concurrent sessions (inference, network and rendering included).'],
          ['소규모 사용자 조사(5명)에서 5명 모두 실시간 표시가 말 속도 교정에 도움이 된다고 응답했습니다.', 'In a small user survey (5 people), all five said the live indicators helped them correct their pace.'],
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
            '낮은 지연 유지(논문): 오디오를 짧은 프레임으로 나누고, 여러 세션의 프레임을 asyncio 이벤트 루프로 묶어 병렬 처리했습니다. 20개 세션에서 GPU 사용률은 약 70%에서 안정되었고 최악 지연은 170ms였습니다.',
            'Keeping latency low (paper): audio is split into short frames, and frames from many sessions are batched and processed in parallel on an asyncio event loop. With 20 sessions, GPU use settled at about 70% and worst-case latency was 170 ms.',
          ],
          [
            '실시간 경로 보호(2026): 발표 후 Whisper, LLM, PDF 생성을 BullMQ 작업과 별도 워커로 분리해 실시간 경로를 막지 않게 했습니다. 실패하면 5초 뒤 한 번 더 시도하고, 동시에 2개까지 처리합니다. 받아쓰기가 4초 안에 끝나지 않으면 음량만으로 피드백합니다.',
            'Protecting the live path (2026): after the talk, Whisper, the LLM and PDF generation run as BullMQ jobs on a separate worker so they never block the live path: one retry 5 s after a failure, up to 2 jobs at once. If transcription takes over 4 s, feedback falls back to volume alone.',
          ],
        ],
        { anchor: 'solved' },
      ),
      section('retro', REFLECTION, [
        [
          '사용자 조사가 5명으로 적었습니다. 지연 수치는 논문 시점 구조의 값이고 2026 버전에서 다시 재지 않았으며, 2026 버전은 실제 휴대폰 확인 전입니다. 다음은 재측정, 큐 재시도 처리 보완, 장기 추적 대시보드입니다.',
          'The user survey had only 5 people. The latency figures belong to the structure at the time of the paper and were not re-measured on the 2026 version, which has not been checked on a real phone yet. Next come re-measuring, better queue retries and a long-term tracking dashboard.',
        ],
      ]),
      section('evidence', MATERIAL, [
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
      section('implementation', ROLE, [['팀장으로서 백엔드, DB, API 연동을 맡고, 프론트엔드는 화면 구조와 피드백으로 참여했습니다.', 'As team lead I handled the backend, database and API integration, and helped the frontend with its structure and feedback.']], { lead: true, anchor: 'role' }),
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
      '시니어가 일상 대화를 나누는 동안 우울 척도(GDS) 문항을 대화 속에서 끌어내는 음성 챗봇. 직접 설문과 일상 대화 방식을 비교해 거부감이 적은 대화 방식으로 구성하고, 모델 3종을 비교해 고른 GPT-4o-mini에 파인튜닝, RAG, 프롬프트를 결합했습니다. 2024 한신 AISW 페스티벌 일반부 특별상, 2025 한국디지털콘텐츠학회 하계 1저자 논문.',
      'A voice chatbot that draws Geriatric Depression Scale questions out of everyday conversation with seniors. After comparing a direct questionnaire with everyday conversation, it uses conversation, which people resist less. GPT-4o-mini, chosen from three compared models, combines fine-tuning, RAG and prompts. Special Award at the 2024 Hanshin AISW Festival; first-author paper at the 2025 Korea Digital Contents Society summer conference.',
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
      section('result', OUTCOMES, [['2024 한신 AISW 페스티벌 일반부 특별상, 2025 한국디지털콘텐츠학회 하계 1저자 논문.', 'Special Award at the 2024 Hanshin AISW Festival; first-author paper at the 2025 Korea Digital Contents Society summer conference.']], { lead: true }),
      section('implementation', ROLE, [['서비스 기획, AI 챗봇 설계, 백엔드 개발을 맡았습니다.', 'I handled service planning, the AI chatbot design and backend development.']], { lead: true, anchor: 'role' }),
      section('implementation', DECISIONS, [
        [
          '직접 설문은 결과가 명확하지만 거부감이 있고, 일상 대화는 다소 부정확할 수 있지만 거부감이 적습니다. 서비스 목적에 맞춰 일상 대화 방식을 골랐습니다.',
          'A direct questionnaire is clear but people resist it; everyday conversation can be less exact but meets less resistance. I chose conversation to fit the service.',
        ],
        [
          'GPT-4o-mini를 포함한 모델 3종을 가격, 응답 속도, 대화 자연스러움으로 비교해 GPT-4o-mini를 고르고, 파인튜닝, RAG, 프롬프트를 결합했습니다.',
          'I compared three models including GPT-4o-mini on price, response speed and how natural the conversation felt, chose GPT-4o-mini, and combined fine-tuning, RAG and prompts.',
        ],
      ], { anchor: 'decisions' }),
      section('retro', ['회고', 'Reflection'], [[
        '테스트 케이스가 적고 실제 사용자 검증을 하지 못했습니다. 실제 사례로 검증하고 음성과 영상까지 활용해 보겠습니다.',
        'There were few test cases and no checks with real users. I would validate with real cases and try using voice and video too.',
      ]]),
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
    role: k('프론트엔드·백엔드 구성 · AI 구조와 DB 설계', 'Frontend and backend structure · AI and database design'),
    stack: ['React', 'Express', 'MySQL', 'MongoDB', 'OpenAI Assistants'],
    summary: k(
      '목표 설정, 노트 작성, 퀴즈 풀이, 피드백, 학습 계획 조정으로 이어지는 흐름을 구상하고 설계한 AI 통합 학습 지원 시스템. 요청 의도에 맞는 모델과 도구로 보내는 AI Agent·MCP 구조와 MySQL·MongoDB 저장 구조를 설계했습니다. 한국디지털콘텐츠학회 논문 2편.',
      'An AI learning-support system conceived and designed around a flow from setting goals to notes, quizzes, feedback and adjusting the plan. The design covers an AI Agent and MCP structure that sends each request to a suitable model or tool, and storage split across MySQL and MongoDB. Two Korea Digital Contents Society papers.',
    ),
    product: k(
      '목표 설정, 노트 작성, 퀴즈 풀이, 피드백, 학습 계획 조정으로 이어지는 흐름을 구상하고 설계한 AI 통합 학습 지원 시스템',
      'An AI learning-support system conceived and designed around a flow from setting goals to notes, quizzes, feedback and adjusting the plan',
    ),
    featuresHeading: k('구상한 기능', 'Planned features'),
    features: pairs([
      ['학습 이력과 목표 기반 추천과 자동 일정', 'Recommendations and automatic schedules from study history and goals'],
      ['노트와 질문에 대한 AI 피드백, 자유 편집 노트', 'AI feedback on notes and questions, and freely editable notes'],
      ['퀴즈 자동 생성·채점과 성취도 리포트, 학습 현황 대시보드', 'Automatic quizzes, grading and progress reports, and a study dashboard'],
    ]),
    sections: [
      section('result', OUTCOMES, [['2025 한신 AISW 페스티벌 캡스톤 디자인 부문 특별상, 한국디지털콘텐츠학회 2025 하계·추계 논문 경진대회 은상.', 'Special Award (Capstone Design) at the 2025 Hanshin AISW Festival; Silver Awards at the 2025 summer and fall Korea Digital Contents Society student paper competitions.']], { lead: true }),
      section('implementation', ROLE, [['프론트엔드와 백엔드 구성, AI 에이전트 구성, 데이터베이스 선정·설계를 맡았습니다.', 'I handled the frontend and backend structure, the AI agent design, and choosing and designing the databases.']], { lead: true, anchor: 'role' }),
      section('implementation', DECISIONS, [
        [
          '개인정보, 인증, 학습 계획은 MySQL에, 채팅, 퀴즈, AI 피드백 로그는 MongoDB에 나눠 저장하도록 설계했습니다.',
          'The design keeps personal data, authentication and study plans in MySQL, and chats, quizzes and AI feedback logs in MongoDB.',
        ],
        [
          '요청 의도에 맞는 모델과 도구로 보내는 AI Agent 라우팅과 MCP 구조를 설계했습니다.',
          'I designed AI Agent routing that sends a request to a suitable model or tool, together with an MCP structure.',
        ],
      ], { anchor: 'decisions' }),
      section('retro', ['회고', 'Reflection'], [[
        '설계한 구조를 실제 사용자 데이터로 검증하지 못했습니다. 구상한 AI Agent 구조를 적용해 시험해 보고 싶습니다.',
        'I did not validate the design with real user data. I would like to apply the planned AI Agent structure and try it out.',
      ]]),
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
    team: k('초안은 팀 · 오픈소스 개발자 대회', 'Team draft · Open Source Developer Competition'),
    role: k('초안 백엔드·프론트엔드·AI 모델 · 이후 리뉴얼과 직무별 면접 추가는 혼자 진행', 'Backend, frontend and AI models in the draft · later renewal and role-based interviews on my own'),
    stack: ['React', 'Express', 'MySQL', 'Whisper', 'Google TTS', 'OpenAI Assistants', 'TensorFlow.js'],
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
      ['표정·시선·자세, 발음·감정·말 속도·필러 단어 분석', 'Analysis of expression, eye contact, posture, pronunciation, emotion, pace and filler words'],
      ['세션 피드백과 PDF 리포트', 'Session feedback and a PDF report'],
    ]),
    sections: [
      section('result', OUTCOMES, [['오픈소스 개발자대회 참가, 2025 한신 AISW 페스티벌 창업 아이디어 부문 장려상, 한신대 AI 면접 특강 시연.', 'Entered the Open Source Developer Competition; Honorable Mention (Startup Idea) at the 2025 Hanshin AISW Festival; demonstrated at AI interview workshops at Hanshin University.']], { lead: true }),
      section('implementation', ROLE, [['초안(2025.05–08, 팀)에서 백엔드, 프론트엔드, AI 모델을 맡았고, 이후 리뉴얼(2025.10–12)과 직무별 면접 추가는 혼자 진행했습니다.', 'In the team draft (May–Aug 2025) I handled the backend, frontend and AI models; the later renewal (Oct–Dec 2025) and role-based interviews were on my own.']], { lead: true, anchor: 'role' }),
      section('implementation', SOLVED, [
        [
          '꼬리 질문이 끝없이 이어지는 문제를 프롬프트 수정과 서버 규칙으로 제한했습니다. 면접은 총 15문항이고 15번째는 고정된 마무리 질문입니다.',
          'Follow-up questions ran on endlessly, so prompt changes and server rules now limit them: an interview has 15 questions, and the 15th is a fixed closing question.',
        ],
        [
          '직무별·기업별로 AI 면접관을 나눠 파인튜닝, 프롬프트, RAG 자료를 구성했습니다.',
          'AI interviewers are split by role and company, each with its own fine-tuning, prompts and RAG material.',
        ],
      ], { anchor: 'solved' }),
      section('retro', ['회고', 'Reflection'], [[
        '실제 기업 면접 질문 데이터로 질문 품질을 높이고, 표정과 자세 인식을 개선하겠습니다.',
        'I would raise question quality with real company interview data and improve expression and posture recognition.',
      ]]),
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
      'LLM이 일정을 제안하면 다른 LLM 역할이 휴식과 과부하 기준으로 검토하고(최대 2번), 사용자가 승인해야 Google 캘린더에 기록하는 일정 관리 서비스.',
      'A scheduling service where one LLM proposes a schedule, another LLM role reviews it against rest and overload criteria (up to twice), and nothing goes into Google Calendar until the user approves.',
    ),
    image: '/images/projects/restplanner.png',
    imageCaption: k('일정 요청 입력 화면 · 실제 화면', "Schedule request screen · real screen"),
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
