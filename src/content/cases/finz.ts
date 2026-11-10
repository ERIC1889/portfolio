import type { Case, Project } from '../types'
import { k, metric, pairs, shot, step, video } from './helpers'

const portedEngine: Case = {
  title: k('옮긴 계산 엔진이 같은 값을 내는지', 'Does the ported calculation engine give the same numbers?'),
  problem: step(
    [
      [
        '세무사와 Python으로 만든 6Way 계산 로직을 웹에서 쓰려고 TypeScript로 옮겼습니다. 옮긴 엔진이 원래 엔진과 같은 결과를 낸다는 보장이 없었고, 세금 계산에서는 1원 차이도 신뢰를 깎습니다.',
        'The 6Way calculation logic, written in Python with a tax accountant, was ported to TypeScript for the web. Nothing guaranteed that the ported engine gave the same results as the original, and in tax calculation even a one-won difference erodes trust.',
      ],
    ],
    ['Python 계산 로직을 TypeScript로 옮기면 같은 값이 나온다는 보장이 없었습니다.', 'There was no guarantee that Python logic ported to TypeScript would give the same values.'],
  ),
  analysis: step(
    [
      [
        '차이가 날 수 있는 지점은 단계마다 원 미만을 버리는 순서와 소수 계산 오차였습니다. 확인 방법은 화면에서 눈으로 비교하기, 엔진 단위 테스트만 두기, 기준 워크북의 결과와 웹 계산 API 결과를 스크립트로 자동 대조하기 중에서 골라야 했습니다. 눈으로 보는 비교는 항목 21개를 매번 다시 볼 수 없고, 단위 테스트만으로는 두 엔진 사이의 차이를 잡지 못해 자동 대조를 택했습니다. 워크북은 소수점 이하를 그대로 두고 엔진은 단계마다 원 미만을 버리기 때문에 허용 범위는 ±10원으로 정했습니다.',
        'The likely sources of difference were the order in which fractions of a won are dropped at each step and floating-point error. The options were comparing results on screen by eye, keeping only engine unit tests, or comparing the reference workbook with the web calculation API by script. Comparing by eye cannot re-check 21 items every time, and unit tests alone cannot catch differences between the two engines, so I chose the automatic comparison. The workbook keeps fractions while the engine drops fractions of a won at each step, so the tolerance was set to ±10 won.',
      ],
    ],
    ['화면 비교나 단위 테스트만으로는 부족하다고 보고 기준 사례와 자동 대조하기로 했습니다.', 'Comparing on screen or unit tests alone were not enough, so I chose an automatic check against a reference case.'],
  ),
  action: step(
    [
      [
        '실제 2주택 사례 1건의 기준 워크북에서 여섯 경우의 중과 전·후 합계와 증가분, 집계 3개까지 결과 21개 항목을 뽑아 웹 계산 API 결과와 비교하는 스크립트를 만들었습니다. Python 엔진에는 같은 사례를 원 단위까지 맞추는 테스트 43개를 두었습니다. 대조에서 드러난 1원 차이는 비율 계산의 절사를 BigInt로 바꿔 고쳤고, 6Way 회귀 테스트를 추가했습니다.',
        'From the reference workbook of one real two-home case I took 21 result items (before/after totals and the increase for six options, plus three aggregates) and wrote a script that compares them with the web calculation API. The Python engine has 43 tests that match the same case to the won. The one-won gap the comparison exposed was fixed by moving the ratio truncation to BigInt, with 6Way regression tests added.',
      ],
    ],
    ['기준 워크북 21개 항목과 웹 API 결과를 비교하는 스크립트를 두고, 절사 규칙을 고쳐 회귀 테스트를 더했습니다.', 'A script compares 21 workbook items with the web API, and a rounding fix came with regression tests.'],
  ),
  result: step(
    [
      [
        '대조한 21개 항목이 모두 허용 범위 ±10원 안에 들었고, 수정 전 대조에서 가장 큰 차이는 1원이었습니다. 반올림 수정과 회귀 테스트로 finz.kr 저장소 테스트는 184개에서 192개로 늘었으며, 외부 API는 모의 응답으로 대신해 네트워크 없이 실행됩니다.',
        'All 21 compared items fell within the ±10 won tolerance, with a largest gap of 1 won before the fix. With the rounding fix and regression tests the finz.kr repository went from 184 to 192 tests, and they run offline with external APIs mocked.',
      ],
    ],
    ['21개 항목이 모두 맞았고, 저장소 테스트는 184개에서 192개가 됐습니다.', 'All 21 items matched, and the repository tests grew from 184 to 192.'],
  ),
}

const simpleAuth: Case = {
  title: k('AI 초안이 첫 연도에서 멈춘 간편인증', 'The simple-authentication flow where the AI draft stalled after the first year'),
  problem: step(
    [
      [
        '다년도 근로소득 지급명세서 조회의 첫 구현은 AI에게 CODEF 문서를 주고 만든 초안이었습니다. 연도마다 간편인증을 새로 요청하는 구조라 첫 연도만 조회되고 그 뒤에서 멈췄고, 그대로면 사용자가 연도 수만큼 휴대폰 인증을 해야 했습니다.',
        'The first implementation of the multi-year employment-income statement lookup was a draft built by handing the CODEF documentation to an AI. It requested a new simple authentication for every year, so the first year came back and then it stalled, and as it stood users would have had to approve on their phone once per year.',
      ],
    ],
    ['AI에게 CODEF 문서를 주고 만든 첫 구현은 첫 연도만 조회하고 멈췄습니다.', 'The first implementation, built by giving the AI the CODEF documentation, fetched only the first year and stopped.'],
  ),
  analysis: step(
    [
      [
        '코드를 직접 읽어 연도마다 인증을 새로 요청하는 것이 원인임을 확인했습니다. CODEF 문서와 인증 흐름을 다시 읽고, 제출내역 조회에 세션 데이터를 요청하면 인증 세션을 받아 그 세션으로 연도만 바꿔 재인증 없이 조회할 수 있다는 가설을 세웠습니다. 서비스 코드에서 바로 고치는 대신 서비스와 분리한 작은 스크립트로 가설부터 확인했습니다. 실패해도 서비스에 영향이 없고 확인이 빠르기 때문입니다.',
        'Reading the code confirmed the cause: a new authentication request for each year. Going back through the CODEF documentation and the authentication flow, I formed the hypothesis that asking the submission-list lookup for session data returns an authenticated session that can be reused with only the year changed. Rather than fixing it inside the service code, I checked the hypothesis first with a small script kept apart from the service: a failure there would not touch the service, and the check was fast.',
      ],
    ],
    ['AI에게 다시 맡기지 않고 코드와 문서를 직접 읽어 원인과 가설을 세웠습니다.', 'Instead of handing it back to the AI, I read the code and the docs myself to find the cause and form a hypothesis.'],
  ),
  action: step(
    [
      [
        '서비스와 분리한 Node.js 스크립트로 CODEF 개발 환경에서 간편인증 한 번에 5개 연도를 조회하고 홈택스에서 받은 자료와 대조했습니다. 확인된 방식대로 백엔드를 인증 단계와 조회 단계로 나눠 다시 구현했습니다. 조회는 3초 간격으로 하나씩 보내고, 같은 요청이 겹쳤다는 오류가 오면 5초, 10초를 기다렸다 다시 시도합니다. 인증 대기는 3초 간격으로 상태를 확인하고 270초가 지나면 만료로 처리하며, 대기·요청·확인 중·완료·실패·만료 여섯 상태를 하나의 타입으로 관리합니다.',
        'A Node.js script kept apart from the service fetched five years with one authentication in the CODEF development environment, and the results were checked against records downloaded from Hometax. The backend was then rebuilt the confirmed way, with authentication and lookup as separate steps. Lookups go out one at a time, 3 seconds apart, and an error saying identical requests overlapped is retried after 5 seconds, then 10. While waiting for approval the status is checked every 3 seconds and treated as expired after 270 seconds, and the six states (idle, requested, checking, done, failed, expired) are managed as one type.',
      ],
    ],
    ['분리한 스크립트로 가설을 확인한 뒤, 백엔드를 인증 단계와 조회 단계로 나눠 직접 다시 구현했습니다.', 'After confirming the hypothesis with the script, I rebuilt the backend myself with authentication and lookup as separate steps.'],
  ),
  result: step(
    [
      [
        '한 번의 간편인증으로 5개 연도를 조회하고, 결과는 홈택스에서 받은 자료와 대조했습니다. 가설 확인부터 백엔드 이식까지 이틀이 걸렸습니다.',
        'One simple authentication now fetches five years, checked against records downloaded from Hometax. From confirming the hypothesis to porting it into the backend took two days.',
      ],
    ],
    ['조회되는 연도 1개 → 5개, 휴대폰 인증 5번 → 1번.', 'Years fetched 1 → 5, phone approvals 5 → 1.'],
  ),
}

const failedDeploys: Case = {
  title: k('배포 9번 연속 실패', 'Nine failed deployments in a row'),
  problem: step(
    [['배포가 9번 잇달아 실패했는데, 코드 결함인지 서버 문제인지 불분명했습니다.', 'Deployments failed nine times running, and it was unclear whether the code or the server was at fault.']],
    ['배포 9번 연속 실패, 원인은 불분명했습니다.', 'Nine deployments failed in a row, and the cause was unclear.'],
  ),
  analysis: step(
    [
      [
        '블록체인 라이브러리 도입 전후를 같은 방법으로 재어 타입 검사 메모리가 36% 늘어난 것을 확인했고, 서버와 같은 메모리 상한에서 오류를 재현해 서버 메모리 부족이 원인임을 밝혔습니다.',
        'Measuring type-check memory the same way before and after the blockchain library arrived showed a 36% increase, and reproducing the crash under the server’s memory cap showed that the cause was a shortage of server memory.',
      ],
    ],
    ['추측 대신 도입 전후 측정과 같은 조건의 재현으로 원인을 확정했습니다.', 'Instead of guessing, I measured before and after and reproduced the failure under the same conditions.'],
  ),
  action: step(
    [['두 가지 해결책을 시험해 8GB 서버나 CI에서 이미지를 빌드하는 방식을 권했습니다.', 'After testing two fixes, I recommended an 8 GB server or building the image in CI.']],
    ['두 가지 해결책을 시험해 개발사에 권했습니다.', 'I tested two fixes and recommended them to the vendor.'],
  ),
  result: step(
    [['개발사는 진단이 맞다고 확인한 뒤 실패한 배포가 서비스를 멈추지 않도록 바꿨습니다.', 'The vendor confirmed the diagnosis and changed deployment so that a failed build no longer stops the service.']],
    ['개발사가 진단을 확인하고, 배포 실패가 서비스를 멈추지 않게 바꿨습니다.', 'The vendor confirmed the diagnosis and changed deployment so a failed build no longer takes the service down.'],
  ),
}

export const finz: Project = {
  slug: 'finz',
  name: 'Finz',
  years: [2026],
  tier: 'featured',
  showcase: 'work',
  kind: 'work',
  title: k('Finz 개인 세금 계산기', 'Finz personal tax calculators'),
  workTitle: k('주식회사 Finz Labs · 개발 총괄', 'Finz Labs · Head of development'),
  product: k(
    '부동산 6Way 비교, 디지털 자산 세금, 해외주식 양도세·증여 평가를 회원가입 없이 계산하고, 계산마다 세법 조문 근거를 함께 보여 주는 웹 서비스',
    'A web service that works out tax on disposing of two homes (6Way), on digital assets and on foreign stocks (capital gains and gift valuation) without sign-up, citing the statute behind each step',
  ),
  period: '2026.01–',
  team: k('직원 5명', 'Five people'),
  role: k('개발 총괄', 'Head of development'),
  status: k('운영 중 (finz.kr)', 'Live (finz.kr)'),
  statusCheckedAt: '2026-10-29',
  stack: ['Next.js', 'TypeScript', 'React', 'Vitest', 'Expo', 'FastAPI'],
  summary: k(
    '부동산·디지털 자산·해외주식 세금 계산기가 있는 회사 웹 finz.kr을 혼자 설계·개발·운영하고, Finz 모바일 앱(청년 세금 환급 MVP 등)을 만들었습니다.',
    'I designed, built and run the company website finz.kr on my own, with its property, digital-asset and foreign-stock tax calculators, and built the Finz mobile app (a tax refund MVP and more).',
  ),
  overview: {
    highlights: pairs([
      ['finz.kr에서 계산기 4종 운영', 'Four calculators live at finz.kr'],
      ['저장소 테스트 192개', '192 repository tests'],
      ['배포 9번 연속 실패 원인 재현', 'Reproduced the cause of nine failed deployments in a row'],
      ['2026 AI·블록체인 BM 경진대회 우수상 (Finz 앱)', 'Excellence Award at the 2026 AI & Blockchain Business Model Competition (Finz app)'],
    ]),
    aiUse: k(
      '회사 웹은 명세 → 계획 → AI 구현 순서로 만들고 기준 사례 대조와 테스트 192개로 검증했습니다. 모바일 앱의 간편인증은 AI 초안이 멈춘 원인을 찾아 프로토타입으로 확인한 뒤 직접 구현했습니다.',
      "The company website was built spec → plan → AI implementation and verified against the reference case and 192 tests. For the app's simple authentication I found why the AI draft stalled, confirmed the fix with a prototype and built it myself.",
    ),
  },
  resumeItems: pairs([
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
      ['회사 웹 finz.kr 전체: 화면, 계산 라이브러리, 시세·환율·실거래가 연동, API (2026.04–)', 'All of the company website finz.kr: screens, calculation library, market-data and price integrations, API (2026.04–)'],
      ['해외주식 양도세 엔진과 증여세 추정, 시세·환율 데이터 계층, 부동산 6Way 엔진과 PDF 리포트', 'The foreign-stock capital gains engine and gift-tax estimate, the market-data layer, the property 6Way engine and its PDF report'],
      [
        '디지털 자산 엔진·증여 평가 모듈: 세무사용 FINZ, 즉 회사 세무 SaaS의 코드를 개인용으로 옮기고 연도 판정·대체값·오류 문구를 더함',
        'Digital-asset engine and gift valuation module: code from FINZ for tax accountants (the company SaaS) adapted for individuals, adding tax-year filtering, fallbacks and plain-language errors',
      ],
      ['Finz 모바일 앱과 백엔드 (Expo · FastAPI, 미출시)', 'The Finz mobile app and its backend (Expo · FastAPI, not released)'],
      ['세무사용 FINZ 가격 정책·기능 잠금 범위 사양 작성', 'The pricing and feature-lock spec for FINZ for tax accountants'],
    ]),
    joint: pairs([
      ['세금 계산 로직 정리 (세무사)', 'Working out the tax logic (with a tax accountant)'],
      [
        '세무사용 FINZ의 세금 계산 엔진 초안, 외부 API 연동, 배포·운영 방식, 개발 도구 (협력 개발사)',
        'For FINZ for tax accountants: the tax-engine draft, external API integrations, the deployment and operations approach and the development tools (with the partner developer)',
      ],
    ]),
    verified: pairs([
      ['기준 워크북 사례와 대조: 6Way 웹 API 21개 항목, Python 엔진 테스트 43개', 'Checked against a reference workbook case: 21 items through the 6Way web API, 43 tests on the Python engine'],
      [
        'finz.kr 저장소 테스트 192개 통과: 계산 엔진 53개(가상자산 25·해외주식 28), 시세·환율 데이터 소스 31개 포함',
        'All 192 tests in the finz.kr repository pass, including 53 calculation-engine tests (crypto 25, foreign stocks 28) and 31 market-data tests',
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
  },
  media: [
    video(
      '/media/finz/web-demo.mp4',
      '/media/finz/web-demo-poster.webp',
      1280,
      800,
      ['부동산 6Way 시연: 두 주택 입력, 결과 비교, 조건 변경 후 재계산', 'Property 6Way demo: entering two homes, comparing results, recalculating after a change'],
      ['부동산 6Way · 운영 사이트 실제 화면 · 예시 입력 → 결과 → B주택을 조정대상지역으로 바꿔 재계산', 'Property 6Way · live site · sample input → results → recalculated with home B in a regulated area'],
      '2026-10-29',
    ),
    shot('/media/finz/web-crypto.webp', 1600, 1449, ['가상자산 매수·매도 거래를 입력하고 2027년 예상 세금을 계산한 화면', 'Crypto buys and sells entered, with the 2027 tax estimate'], ['디지털 자산 세금 계산기 · 운영 사이트 실제 화면 · 사이트 예시 입력', 'Digital-asset tax calculator · live site · the site’s own sample input'], '2026-10-29'),
    shot('/media/finz/web-stock.webp', 1600, 1409, ['결제일 환율로 해외주식 양도세를 계산하고 이익을 주가 몫과 환율 몫으로 나눈 화면', 'Foreign-stock gains converted at settlement-date rates and split into price and currency effects'], ['해외주식 양도세 계산기 · 운영 사이트 실제 화면 · 사이트 예시 입력', 'Foreign-stock capital gains calculator · live site · the site’s own sample input'], '2026-10-29'),
    shot('/media/finz/web-stock-gift.webp', 1600, 1483, ['증여일 전후 2개월 평균 종가로 해외주식 증여 평가액과 증여세를 계산한 화면', 'Gift value of a foreign stock from the two-month average close, with the gift tax'], ['해외주식 증여 평가 계산기 · 운영 사이트 실제 화면 · 사이트 예시 입력', 'Foreign-stock gift valuation calculator · live site · the site’s own sample input'], '2026-10-29'),
    shot('/media/finz/web-six-way.webp', 1600, 956, ['여섯 가지 처분 방법별 중과 유예 전후 세금 비교', 'Tax for the six options before and after the surcharge grace period'], ['여섯 가지 경우 비교 · 운영 사이트 실제 화면 · 예시 입력', 'Six-way comparison · live site · sample input'], '2026-10-29'),
  ],
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
      '192 통과',
      [
        '계산 엔진 53개(가상자산 25 · 해외주식 28, 익명화한 실제 증여 사례 포함), 시세·환율 데이터 소스 31개, 화면·입력 변환 등',
        'Calculation engines 53 (crypto 25 · foreign stocks 28, including an anonymised real gift case), market-data sources 31, plus screens and input mapping',
      ],
      ['Vitest, 외부 API는 모의 응답, 로컬 실행', 'Vitest with mocked external APIs, run locally'],
      'measured',
      '2026-11-06',
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
    { kind: 'site', label: k('회사 웹 finz.kr', 'Company website finz.kr'), href: 'https://www.finz.kr' },
    { kind: 'live', label: k('부동산 6Way', 'Property 6Way'), href: 'https://www.finz.kr/personal/property' },
    { kind: 'live', label: k('디지털 자산 계산기', 'Digital-asset calculator'), href: 'https://www.finz.kr/personal/digital-asset/calculator' },
    { kind: 'live', label: k('해외주식 양도세 계산기', 'Foreign-stock gains calculator'), href: 'https://www.finz.kr/personal/foreign-stock/capital-gains' },
    { kind: 'live', label: k('해외주식 증여 평가 계산기', 'Foreign-stock gift valuation'), href: 'https://www.finz.kr/personal/foreign-stock/valuation' },
  ],
  background: pairs([
    [
      '주식회사 Finz는 설명 가능한 AI와 등록 세무사가 함께하는 세무 자동화 플랫폼입니다. 세무대리와 최종 판단은 세무사가 수행합니다.',
      'Finz Inc. is a tax automation platform where explainable AI works together with registered tax accountants. Tax representation and final judgments are made by the tax accountants.',
    ],
  ]),
  duties: pairs([
    [
      '초기 창업 멤버로 함께했고 회사 내의 유일한 개발자로 서비스를 개발하고 검증하는 역할을 맡았고 단순 개발뿐 아니라 기획, 투자 제안, 웹, 모바일 어플리케이션 개발, 협력 개발사와의 공동 개발 등 회사 내에서 개발 총괄로 일했습니다.',
      'I joined as an early founding member and, as the only developer in the company, took on building and verifying the service. Beyond development itself I worked as head of development across planning, investor proposals, web and mobile app development and joint development with a partner company.',
    ],
  ]),
  products: [
    {
      id: 'calculators',
      name: k('개인 세금 계산기', 'Personal tax calculators'),
      status: k('운영 중', 'Live'),
      role: k('설계·개발·운영', 'Design · build · operation'),
      intro: pairs([
        [
          '부동산 6Way 비교, 디지털 자산 세금, 해외주식 양도세·증여 평가를 회원가입 없이 계산하고, 계산마다 세법 조문 근거를 함께 보여 주는 웹 서비스입니다.',
          'A web service that works out tax on disposing of two homes (6Way), on digital assets and on foreign stocks (capital gains and gift valuation) without sign-up, citing the statute behind each step.',
        ],
        [
          '세무를 잘 모르는 사람이 쓰는 계산기라 결과 숫자 하나가 큰 결정을 바꿉니다. 화면을 빨리 만드는 것보다 숫자가 맞는 것과, 그 숫자가 어느 조문에서 나왔는지 보여 주는 것이 먼저였습니다.',
          'People who know little about tax use these calculators, so one number can change a big decision. Getting the numbers right, and showing which statute each one comes from, came before getting screens out quickly.',
        ],
      ]),
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
      cases: [portedEngine],
    },
    {
      id: 'refund-app',
      name: k('Finz 모바일 앱', 'Finz mobile app'),
      status: k('미출시', 'Not released'),
      role: k('앱·백엔드', 'App and backend'),
      intro: pairs([
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
      ]),
      media: [
        video(
          '/media/finz/app-demo.mp4',
          '/media/finz/app-demo-poster.webp',
          1280,
          720,
          ['청년 세금 환급 앱 시연 영상', 'Youth tax refund app demo video'],
          ['청년 세금 환급 · 실제 앱 화면을 단계별 설명과 함께 편집한 영상', 'Youth tax refund · real app screens edited with step captions'],
          '2026-09-10',
        ),
      ],
      cases: [simpleAuth],
    },
    {
      id: 'finz-saas',
      name: k('세무사용 FINZ', 'FINZ for tax accountants'),
      status: k('출시 전, 협력 개발사와 공동 개발', 'Pre-launch, co-developed with a partner company'),
      role: k('사양·검증·장애 분석·실배포 준비', 'Specs, verification, failure analysis, launch preparation'),
      intro: pairs([
        [
          '세무사용 FINZ는 같은 회사에서 협력 개발사와 함께 개발 중인 세무사용 SaaS입니다. 저는 회사 쪽 기술 책임자로 세금 계산 엔진 초안과 외부 API 연동, 배포·운영 방식, 개발 도구를 개발사와 함께 정하며 개발에 참여했고, 사양 작성과 검증, 장애 원인 분석을 맡았습니다.',
          'FINZ for tax accountants is a SaaS for tax accountants being developed at the same company together with a partner development company. As the company-side technical lead I took part in development, deciding the tax-engine draft, external API integrations, the deployment and operations approach and the development tools together with the vendor, and I wrote the specs, verified the work and found the causes of failures.',
        ],
      ]),
      cases: [failedDeploys],
    },
  ],
  results: pairs([
    ['부동산 6Way, 디지털 자산, 해외주식 양도세·증여 평가 계산기를 finz.kr에서 운영하고 있습니다.', 'The property 6Way, digital-asset and foreign-stock capital gains and gift-valuation calculators are live at finz.kr.'],
    [
      '세무사와 함께 만든 6Way 계산 로직을 웹으로 옮긴 뒤 기준 워크북의 결과 항목 21개와 대조해 최대 차이가 1원인 것을 확인했습니다.',
      'After the 6Way logic built with a tax accountant was ported to the web, all 21 result items checked against the reference workbook matched with a largest gap of 1 won.',
    ],
    [
      'Finz 모바일 앱(청년 세금 환급·부동산 6Way)으로 출품한 2026 AI-SW중심대학 AI·블록체인 비즈니스모델 경진대회에서 우수상을 받았습니다(2026.05).',
      'The Finz mobile app (youth tax refund and property 6Way) won an Excellence Award at the 2026 AI-SW-Centered University AI & Blockchain Business Model Competition (May 2026).',
    ],
    [
      'Finz 모바일 앱에서는 간편인증 한 번으로 여러 연도의 근로소득 지급명세서를 조회하도록 바꿨고, CODEF 개발 환경에서 5개 연도를 조회해 홈택스에서 받은 자료와 대조했습니다.',
      'In the Finz mobile app, a single simple authentication now fetches several years of employment-income statements; five years were fetched in the CODEF development environment and checked against records downloaded from Hometax.',
    ],
    [
      '세무사용 FINZ에서는 개발사가 완료했다고 보고한 작업 269건을 코드·테스트·화면 근거로 하나씩 다시 확인해 233건을 확인하고 36건은 미완료로 남겼으며, 새 결함 45건을 찾았습니다. 그중 2건은 출시 전에 막아야 할 결함(결제·요금제 잠금)이었고, 기준시가가 비어 있는 필지가 경고 없이 세액 계산에서 빠져 세액이 적게 나오는 결함은 원인 코드 위치까지 찾아 1순위 수정 요청으로 넘겼습니다.',
      'For FINZ for tax accountants, each of the 269 items the vendor reported as done was re-checked against code, tests and screens: 233 confirmed and 36 left open, plus 45 new defects. Two had to be fixed before launch (payment and plan locking), and for a defect where a parcel with no standard price was silently dropped from the tax and understated it, the exact code was traced and sent as the top fix request.',
    ],
    [
      '문서 인식(OCR) 현장 시험(서류 11종, 17개 파일)에서 결과가 끊기는 원인을 출력 토큰 상한(1,200)으로 짚었고, 개발사가 상한을 8,000으로 올려 해결했습니다. CI에는 한 줄짜리 버그 7개를 심어 7개 모두 잡아내는 것을 확인했습니다.',
      'In an OCR field test (11 document types, 17 files) the cut-off was traced to the output-token cap (1,200), which the vendor raised to 8,000 to fix it. Seven one-line bugs planted in CI were all caught.',
    ],
  ]),
  retro: pairs([
    [
      '계산기를 만드는 시간보다 결과가 맞는지 확인하는 시간이 더 길었습니다. 세무사가 만든 기준 사례와 숫자를 하나씩 맞추면서, 기능을 끝냈다고 말하기 전에 무엇으로 확인했는지부터 설명하는 습관이 생겼습니다.',
      'Checking that the results were right took longer than building the calculators. Matching the numbers one by one against the tax accountant’s reference case left me with a habit: before saying a feature is done, explain how it was checked.',
    ],
    [
      '간편인증이나 결제처럼 외부 시스템과 이어지는 흐름에서는, 성공하는 길보다 중간에 끊기거나 같은 요청이 겹치는 경우를 먼저 그려 봐야 한다는 것을 배웠습니다.',
      'In flows that depend on an outside system, such as simple authentication or payment, I learned to map out the interrupted and duplicated cases before the happy path.',
    ],
  ]),
  material: pairs([
    [
      '코드는 회사 비공개 저장소에 있어 링크하지 않습니다. 대신 운영 화면과 시연 영상, 검증 조건과 수치를 이 페이지에 적었습니다. 기준 사례의 단지 이름과 금액은 고객 정보일 수 있어 공개하지 않습니다.',
      "The code is in the company's private repositories, so it is not linked. The live screens, demo videos and the verification conditions and figures are on this page instead. The reference case's apartment names and amounts are not shown because they may be client data.",
    ],
  ]),
}
