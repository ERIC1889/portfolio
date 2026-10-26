# 허준영 | Portfolio

> 주어진 도구가 주는 데서 멈추지 않는다 — I don't stop where my tools stop.

**Live:** https://junyoung-portfolio.vercel.app

AI 기능을 웹·모바일 제품에 연결하고 그 결과가 맞는지 끝까지 확인하는 개발자, 허준영의 포트폴리오입니다.
이력을 나열하는 대신 **사람 → 4년의 이야기(2023–2026) → 한 가지 → 대표 사례 → 아카이브 → 연락처** 순서로 보여 줍니다.
한국어가 기본이고 영어로 바꿀 수 있으며, 다크/라이트 테마를 지원합니다.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router, 정적 생성), React 19, TypeScript |
| **3D · Motion** | Three.js, React Three Fiber, Drei, Framer Motion |
| **Test** | Vitest, Testing Library (jsdom) |
| **Deploy** | Vercel |

---

## Getting Started

```bash
npm install
npm run dev         # http://localhost:3000
npm test            # 콘텐츠 검증 + 컴포넌트·라우트 테스트
npm run typecheck
npm run build       # 공개 보류 검사 후 next build
```

---

## Project Structure

```
src/
├── app/                     # 홈, /projects/[slug], /journey/[year], 404
│   ├── @modal/              # 사이트 안에서 이동하면 사례·연도를 팝업으로 여는 라우트
│   └── _lib/pages.ts        # 전체 페이지와 팝업이 함께 쓰는 조회 함수
├── components/
│   ├── home/                # Hero, 4년의 이야기, 한 가지, 대표 사례, 아카이브, 연락처
│   ├── case/                # 사례 페이지
│   ├── journey/             # 연도 페이지와 프로젝트 카드
│   ├── shell/               # 메뉴, 페이지 이동, 팝업, 3D 배경, 푸터
│   ├── term/                # − 막힌 지점 / + 내가 한 것 diff 블록
│   └── providers/           # 테마·언어
├── content/                 # 모든 글과 데이터(한/영)와 검증
└── lib/                     # 테마 초기화, 화면 크기 훅
scripts/check-release.ts     # 빌드 전 공개 보류 검사
public/                      # 프로필 사진, 프로젝트 이미지
```

사례(`/projects/…`)와 연도(`/journey/…`)는 사이트 안에서 누르면 팝업으로 열리고,
주소로 바로 들어가거나 새로고침하면 전체 페이지로 열립니다. 주소는 그대로 공유할 수 있습니다.

---

## 콘텐츠 수정

화면의 모든 문장은 `src/content`에 `{ ko, en }` 쌍으로 있습니다.

| File | 내용 |
|------|------|
| `profile.ts` | 첫 화면 문구, 연락처 |
| `chapters.ts` | 4년의 이야기 |
| `projects.ts` | 프로젝트 — `featured`는 사례 페이지, `card`는 연도 페이지 카드, `line`은 아카이브 한 줄 |
| `archive.ts` | 논문, 수상, 활동, 기술, 학력 |
| `ui.ts` | 메뉴·버튼 같은 화면 문구 |

수정한 뒤 `npm test`를 돌리면 다음을 검사합니다.

- 한국어·영어 빈 문장
- 허용된 공개 링크만 쓰는지, 로컬 경로가 드러나지 않는지
- 대표 사례의 섹션 구성과 순서, '한 가지' 장면 1–7이 하나씩 있는지
- 코드로 확인되지 않은 주장(프로젝트별 금지 표현)이 들어가지 않았는지

---

## 배포 (Vercel)

```bash
npx vercel          # 미리보기
npx vercel --prod   # 운영
```

### 공개 보류 (`hold`)

공개 여부를 아직 정하지 않은 사례 섹션에는 `hold: true`를 붙입니다.

- 미리보기 배포에서는 "공개 보류" 표시와 함께 보이고, 빌드 로그에 경고가 남습니다.
- 운영 배포(`VERCEL_ENV=production`)는 보류 항목이 하나라도 남아 있으면 빌드 단계에서 멈춥니다.

공개하기로 하면 `hold`를 지우고, 공개하지 않기로 하면 그 섹션을 지웁니다.

---

## License

© 2026 Heo Jun Young. All rights reserved.
