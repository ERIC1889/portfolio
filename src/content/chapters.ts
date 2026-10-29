import type { Chapter } from './types'

// Source: the four-year reflection (ex.md), condensed to what matters for a developer's story.
// Left out on purpose: military-service and job-hunting plans, present-tense distress,
// private details (people, places, social life) and the specifics of internal disagreements at SuziHouse.
export const chapters: Chapter[] = [
  {
    year: 2023,
    name: { ko: '배우다', en: 'Learning' },
    lesson: { ko: '모르는 것을 끝까지 파고들며 기초를 다진 해', en: "The year I dug into what I didn't know and built my foundations" },
    essay: [
      {
        ko: '한신대학교 AISW계열에 입학했습니다. 배울 것이 많았기에 모르는 것은 끝까지 묻고 부딪히며 공부했고, 1년 동안 개발의 기초를 단단히 다졌습니다.',
        en: 'I started in the AI·SW division at Hanshin University. With so much to learn, I kept asking and working through whatever I did not understand until it made sense, and spent the year building solid foundations in development.',
      },
      {
        ko: '첫 웹 서비스 Media Pulse에서는 검색 API가 비율밖에 주지 않자, 광고 API의 실제 검색 수를 엮어 원하는 숫자를 만들어 냈습니다. 도구가 주지 않는 것을 응용해 결과를 만든 이 경험이 이후의 습관이 됐습니다.',
        en: "In my first web service, Media Pulse, the search API gave me only ratios, so I combined them with the real search counts from the ad API to get the numbers I needed. Making a result out of something a tool didn't give me became a habit from then on.",
      },
    ],
  },
  {
    year: 2024,
    name: { ko: '만들다', en: 'Building' },
    lesson: { ko: '연구실과 첫 대상, 그리고 언어를 배우러 간 브라이튼', en: 'A research lab, a first grand prize, and Brighton to learn English' },
    essay: [
      {
        ko: '학부 연구생이 되어 팀 프로젝트와 대회를 본격적으로 경험했습니다. 해커톤에서 발표 코칭 서비스 Pitches의 백엔드와 AI를 맡아 대상을 받았고, 시니어 정신건강 챗봇 Label Light로 교내 페스티벌에서도 결과를 냈습니다.',
        en: 'As an undergraduate researcher, I took on team projects and competitions in earnest. I built the backend and AI for Pitches, a presentation-coaching service that won the grand prize at a hackathon, and Label Light, a mental-health chatbot for seniors, earned an award at the campus festival.',
      },
      {
        ko: '그리고 언어의 중요성을 깨닫고, 학기가 끝난 뒤 영국 브라이튼에서 3개월 동안 영어를 공부했습니다. 다른 문화의 사람들과 지내며 시야도 넓힐 수 있었습니다.',
        en: 'I also came to see how much language matters, so after the semester I spent three months studying English in Brighton, England. Living among people from other cultures broadened my view.',
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
        ko: '캡스톤 SkillPilot의 팀장과 백엔드를 맡으면서 산학협력, 공모전, 학술대회까지 많은 일을 동시에 맡았습니다. 그 과정에서 일의 우선순위를 정하는 법과, 제가 감당할 수 있는 범위를 아는 것이 얼마나 중요한지 배웠습니다. 이듬해 1월에는 학교 대표로 CES 2026을 참관했습니다(2026.01.06~09).',
        en: "While leading the SkillPilot capstone team and building its backend, I also took on industry-academia projects, competitions and conferences, all at once. Along the way I learned to set priorities, and how much it matters to know how much I can take on. The following January, I visited CES 2026 as a representative of my school (Jan 6–9, 2026).",
      },
    ],
  },
  {
    year: 2026,
    name: { ko: '책임지다', en: 'Taking responsibility' },
    lesson: { ko: '실무에서 소통과 검증을 배운 해', en: 'The year real work taught me communication and verification' },
    essay: [
      {
        ko: '스타트업 수지하우스에서 CTO로 웹과 앱을 맡아, 처음으로 실제 서비스를 만드는 실무를 경험했습니다. 실무에서는 코드만큼 소통과 의사결정이 중요하다는 것을 배웠습니다.',
        en: "At the startup SuziHouse, I took charge of the web and app as CTO and built a real service on the job for the first time. I learned that in real work, communication and decision-making matter as much as code.",
      },
      {
        ko: '무엇보다 만드는 것과 그 결과가 맞는지 확인하는 것은 다른 일이라는 것을 배웠습니다. 그래서 지금은 기능을 끝냈다고 말하기 전에, 무엇으로 확인했는지부터 설명하려고 합니다. 그 와중에도 ClosetMate를 만들고 Pitches를 혼자 다시 설계했습니다.',
        en: 'Above all, I learned that building something and checking that its results are right are two different jobs. So now, before I say a feature is done, I start by explaining how I checked it. Along the way, I also built ClosetMate and redesigned Pitches on my own.',
      },
      {
        ko: '어떤 상황에서도 할 수 있는 일을 찾아 움직였습니다. 저는 아직 성장 중이고, 앞으로도 계속 부딪히고 배우며 제 방향을 찾아가겠습니다.',
        en: "Whatever situation I was in, I found something I could do and acted on it. I'm still growing, and I'll keep taking things head-on, learning, and finding my own direction.",
      },
    ],
  },
]
