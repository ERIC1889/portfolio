import type { Chapter } from './types'

export const chapters: Chapter[] = [
  {
    year: 2023,
    name: { ko: '배우다', en: 'Learning' },
    lesson: { ko: '모르는 것을 끝까지 파고들며 기초를 다진 해', en: "The year I dug into what I didn't know and built my foundations" },
    essay: [
      {
        ko: '한신대학교 AI·SW계열에 입학했습니다. 배울 것이 많았기에 모르는 것은 끝까지 묻고 부딪히며 공부했고, 1년 동안 개발의 기초를 단단히 다졌습니다.',
        en: 'I started in the AI·SW division at Hanshin University. With so much to learn, I kept asking and working through whatever I did not understand until it made sense, and spent the year building solid foundations in development.',
      },
      {
        ko: '첫 웹 서비스 Media Pulse에서는 검색 API가 비율만 주자, 광고 API의 실제 검색 수를 기준으로 삼아 월별 검색량을 추정해 냈습니다. 도구가 바로 주지 않는 답을 다른 데이터를 엮어 만든 이 경험이 이후의 습관이 됐습니다.',
        en: "In my first web service, Media Pulse, the search API gave only ratios, so I used the real search counts from the ad API as a baseline and estimated monthly search volume. Working out an answer a tool doesn't give directly, by combining other data, became a habit from then on.",
      },
    ],
  },
  {
    year: 2024,
    name: { ko: '만들다', en: 'Building' },
    lesson: { ko: '처음으로 팀과 대회를 경험한 해', en: 'The year I first experienced teams and competitions' },
    essay: [
      {
        ko: '대학원 연구실(AID 랩)의 학부 연구생이 되어 팀 프로젝트와 대회를 본격적으로 경험했습니다. 해커톤에서는 발표 코칭 서비스 Pitches의 백엔드와 AI를 맡아 대상을, 교내 페스티벌에서는 시니어 정신건강 챗봇 Label Light로 특별상을 받았습니다.',
        en: 'As an undergraduate researcher in a graduate lab (the AID Lab), I took on team projects and competitions in earnest. I built the backend and AI for Pitches, a presentation-coaching service that won the grand prize at a hackathon, and Label Light, a mental-health chatbot for seniors, won a special award at the campus festival.',
      },
      {
        ko: '영어가 필요하다는 것을 느껴 학기가 끝난 뒤 영국 브라이튼에서 3개월 동안 영어를 공부했고, 다른 문화의 사람들과 지내며 시야를 넓혔습니다.',
        en: 'Feeling I needed English, I spent three months after the semester studying it in Brighton, England, and living among people from other cultures broadened my view.',
      },
    ],
  },
  {
    year: 2025,
    name: { ko: '함께하다', en: 'Working together' },
    lesson: { ko: '내 한계를 알게 된 해', en: 'The year I found my limits' },
    essay: [
      {
        ko: 'WebDB 연구실 랩장을 맡으며 처음으로 자리의 무게를 느꼈습니다. 제 일만 잘하는 것을 넘어, 함께하는 사람들을 챙기고 스터디를 이끄는 법을 배웠습니다.',
        en: 'Leading the WebDB lab, I felt the weight of a role for the first time. Beyond doing my own work well, I learned how to look after the people I work with and how to lead a study group.',
      },
      {
        ko: '캡스톤 SkillPilot의 팀장과 백엔드를 맡은 채로 산학협력, 공모전, 학술대회까지 동시에 진행했습니다. 그 과정에서 일의 우선순위를 정하는 법과, 제가 감당할 수 있는 범위를 아는 것이 얼마나 중요한지 배웠습니다. 이듬해 1월에는 학교 대표로 CES 2026을 참관했습니다(2026.01.06~09).',
        en: "While leading the SkillPilot capstone team and building its backend, I also ran industry-academia projects, competitions and conferences at the same time. Along the way I learned to set priorities, and how much it matters to know how much I can take on. The following January, I visited CES 2026 as a representative of my school (Jan 6–9, 2026).",
      },
    ],
  },
  {
    year: 2026,
    name: { ko: '책임지다', en: 'Taking responsibility' },
    lesson: { ko: '실무에서 소통과 검증을 배운 해', en: 'The year real work taught me communication and verification' },
    essay: [
      {
        ko: '스타트업 Finz Labs에서 웹과 앱을 맡아 처음으로 실제 서비스를 만들었습니다. 현장에서는 코드만큼 소통과 의사결정이 중요하다는 것을 배웠습니다.',
        en: "At the startup Finz Labs I took charge of the web and the app and built a real service for the first time. On the job I learned that communication and decision-making matter as much as code.",
      },
      {
        ko: '무엇보다 만드는 것과 그 결과가 맞는지 확인하는 것은 다른 일이라는 것을 배웠습니다. 그래서 지금은 기능을 끝냈다고 말하기 전에, 무엇으로 확인했는지부터 설명하려고 합니다. 회사 일과 별개로 ClosetMate를 만들고 Pitches를 혼자 다시 설계했습니다.',
        en: 'Above all, I learned that building something and checking that its results are right are two different jobs. So now, before I say a feature is done, I start by explaining how I checked it. Apart from work, I also built ClosetMate and redesigned Pitches on my own.',
      },
      {
        ko: '돌아보면 해마다 상황은 달랐지만 그때 할 수 있는 일을 찾아 움직였습니다. 저는 아직 성장 중이고, 앞으로도 계속 부딪히고 배우며 제 방향을 찾아가겠습니다.',
        en: "Looking back, each year was different, but I always found something I could do then and acted on it. I'm still growing, and I'll keep taking things head-on, learning, and finding my own direction.",
      },
    ],
  },
]
