# 허준영 | Portfolio

> 익숙한 기술에 머물기보다, 필요한 것을 직접 만들어 왔습니다.

**Live:** https://junyoung-portfolio.vercel.app

백엔드 중심 풀스택 개발자 허준영의 포트폴리오입니다.
대표 프로젝트 하나(수지하우스 부동산 세금 비교)를 실제 화면·시연 영상·검증 결과와 함께 먼저 보여 주고,
기술 표 → 다른 프로젝트(SkillPilot · ClosetMate) → 경험 → 연락 순서로 이어집니다.
한국어가 기본이고 영어로 바꿀 수 있으며, 밝은 화면이 기본이고 어두운 화면을 고를 수 있습니다.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router, 정적 생성), React 19, TypeScript |
| **Media** | next/image(WebP 화면), MP4 시연 영상 |
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
├── app/                     # 홈, /projects/[slug], /story, /archive, /resume, 404, sitemap·robots
│   └── _lib/pages.ts        # 페이지 메타데이터와 조회 함수
├── components/
│   ├── home/                # 소개, 대표 프로젝트, 기술 표, 다른 프로젝트, 경험, 연락
│   ├── case/                # 프로젝트 상세: 목차, 기여 표, 요청 흐름, 수치 표
│   ├── pages/               # 4년 이야기, 전체 기록, 이력서
│   ├── common/              # 화면·영상과 캡션, 상태 표시, 링크
│   ├── shell/               # 상단 메뉴, 페이지 이동, 푸터
│   └── providers/           # 테마·언어
├── content/                 # 모든 글과 데이터(한/영)와 검증
└── lib/                     # 테마 초기화
scripts/check-release.ts     # 빌드 전 공개 보류 검사
public/media/                # 프로젝트 실제 화면(WebP)과 시연 영상(MP4)
public/resume.pdf            # /resume 페이지를 A4로 인쇄한 이력서
public/og.png                # 공유 카드 이미지
```

프로젝트 상세는 팝업 없이 전체 페이지로 열리고, 화면은 새 탭에서 원본 크기로 볼 수 있습니다.
예전 연도 페이지(`/journey/2023`~`2026`)는 `/story#y2023`처럼 해당 연도로 영구 이동합니다.

---

## 콘텐츠 수정

화면의 모든 문장은 `src/content`에 `{ ko, en }` 쌍으로 있습니다.

| File | 내용 |
|------|------|
| `profile.ts` | 이름·직무·첫 문장, 연락처 |
| `chapters.ts` | 4년 이야기 |
| `projects.ts` | 프로젝트 — `featured`는 상세 페이지(`showcase`로 홈의 자리: 대표·다른 프로젝트·그 밖의 작업), `card`·`line`은 전체 기록 |
| `archive.ts` | 논문(종류·저자 순서), 수상, 활동, 경력, 기술 표, 학력 |
| `ui.ts` | 메뉴·버튼 같은 화면 문구 |

수정한 뒤 `npm test`를 돌리면 다음을 검사합니다.

- 한국어·영어 빈 문장
- 허용된 공개 링크만 쓰는지, 로컬 경로나 전화번호가 드러나지 않는지
- 상세 페이지의 섹션 구성과 순서, 모든 화면·영상의 캡션과 촬영일, 목업 표시
- 모든 수치에 측정 대상·조건·출처·확인일이 있는지
- 코드로 확인되지 않은 주장(프로젝트별 금지 표현)이 들어가지 않았는지

이력서 내용을 바꾸면 `/resume` 페이지를 A4로 인쇄해 `public/resume.pdf`를 다시 만듭니다.

---

## 배포 (Vercel)

`main`에 push하면 운영 배포됩니다. 미리보기만 올릴 때는 `npx vercel --target=preview`를 씁니다.

### 공개 보류 (`hold`)

공개 여부를 아직 정하지 않은 상세 섹션에는 `hold: true`를 붙입니다.

- 미리보기 배포에서는 "공개 보류" 표시와 함께 보이고, 빌드 로그에 경고가 남습니다.
- 운영 배포(`VERCEL_ENV=production`)는 보류 항목이 하나라도 남아 있으면 빌드 단계에서 멈춥니다.

공개하기로 하면 `hold`를 지우고, 공개하지 않기로 하면 그 섹션을 지웁니다.

---

## License

© 2026 Heo Jun Young. All rights reserved.
