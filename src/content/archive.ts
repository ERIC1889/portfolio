import type { Archive } from './types'

const k = (ko: string, en: string) => ({ ko, en })

// Awards and activities: the user's latest list (2026-10-25, spec appendix A), official names, no medals.
export const archive: Archive = {
  papers: [
    {
      title: 'Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI',
      venue: k('APIC-IST 2025 (국제학술대회)', 'APIC-IST 2025 (international conference)'),
      year: 2025,
      international: true,
    },
    {
      title: '개인 맞춤형 AI 학습 비서 시스템: EduMatrix 설계 및 제작',
      titleEn: 'A Personalized AI Learning Assistant: Design and Implementation of EduMatrix',
      venue: k('한국디지털콘텐츠학회 추계종합학술대회', 'Korea Digital Contents Society, Fall Conference'),
      year: 2025,
    },
    {
      title: '개인 맞춤형 AI 학습 비서 시스템: EduMatrix 설계',
      titleEn: 'A Personalized AI Learning Assistant: Design of EduMatrix',
      venue: k('한국디지털콘텐츠학회 하계종합학술대회', 'Korea Digital Contents Society, Summer Conference'),
      year: 2025,
    },
    {
      title: 'LLM을 활용한 시니어 정신 건강 검사 서비스 개발',
      titleEn: 'Developing an LLM-Based Mental Health Screening Service for Seniors',
      venue: k('한국디지털콘텐츠학회 하계종합학술대회', 'Korea Digital Contents Society, Summer Conference'),
      year: 2025,
    },
    {
      title: '제한적 고객 프로파일 정보에서의 라벨 추정 기반 고객 분류 기법',
      titleEn: 'Customer Classification by Label Estimation from Limited Customer Profiles',
      venue: k('한국인터넷정보통신학회', 'Korean Society of Internet Information and Communications'),
      year: 2025,
    },
    {
      title: '인적, 사회적 요인을 고려한 다요인 산불 예측 모델 설계',
      titleEn: 'Designing a Multi-Factor Wildfire Prediction Model with Human and Social Factors',
      venue: k('제23회 통계청 논문 공모전', '23rd Statistics Korea Paper Contest'),
      year: 2025,
    },
    {
      title: '메타버스와 LLM을 활용한 디지털 돌봄 서비스 개발',
      titleEn: 'Developing a Digital Care Service with the Metaverse and LLMs',
      venue: k('한신 ABC 캠프 해커톤', 'Hanshin ABC Camp Hackathon'),
      year: 2024,
    },
    {
      title: 'LLM을 활용한 시니어 정신건강 검사 서비스 개발',
      titleEn: 'Developing an LLM-Based Mental Health Screening Service for Seniors',
      venue: k('한신 AISW 페스티벌', 'Hanshin AISW Festival'),
      year: 2024,
    },
  ],
  awards: [
    {
      date: '24.09.06',
      name: k('한신 ABC 캠프 해커톤 우수상', 'Hanshin ABC Camp Hackathon, Excellence Award'),
      org: k('한신대 AI빅데이터 센터', 'Hanshin University AI Big Data Center'),
    },
    {
      date: '24.10.24 ~ 24.10.27',
      name: k('캡스톤 디자인 및 AI 해커톤 대상(1등)', 'Capstone Design & AI Hackathon, Grand Prize (1st place)'),
      org: k('한국 컴퓨터 교육 학회', 'Korean Association of Computer Education'),
    },
    {
      date: '24.11.19',
      name: k('2024 한신 AISW 페스티벌 일반부 특별상', '2024 Hanshin AISW Festival, Special Award (General)'),
      org: k('한신대 SW중심 대학', 'Hanshin University SW-Centered University Program'),
    },
    {
      date: '25.05.16',
      name: k('SW 중심 대학 AI 창업 아이디어 경진대회 특별상', 'SW-Centered University AI Startup Idea Competition, Special Award'),
      org: k('고려대 SW 중심 대학', 'Korea University SW-Centered University Program'),
    },
    {
      date: '25.07.22',
      name: k('2025년도 하계 종합 학술 대회 및 대학생 논문 경진대회 은상', '2025 Summer Conference & Student Paper Competition, Silver Award'),
      org: k('한국 디지털 콘텐츠 학회', 'Korea Digital Contents Society'),
    },
    {
      date: '25.07.25',
      name: k('2025년도 하계 종합 학술 대회 및 대학생 논문 경진대회 동상', '2025 Summer Conference & Student Paper Competition, Bronze Award'),
      org: k('한국 디지털 콘텐츠 학회', 'Korea Digital Contents Society'),
    },
    {
      date: '25.10.30 ~ 25.10.31',
      name: k('SUMTECH 해커톤 장려상', 'SUMTECH Hackathon, Honorable Mention'),
      org: k('SW 중심 대학', 'SW-Centered University Program'),
    },
    {
      date: '25.11.06 ~ 25.11.07',
      name: k('2025년도 추계 종합 학술 대회 및 대학생 논문 경진대회 은상', '2025 Fall Conference & Student Paper Competition, Silver Award'),
      org: k('한국 디지털 콘텐츠 학회', 'Korea Digital Contents Society'),
    },
    {
      date: '25.11.18 ~ 25.11.19',
      name: k('2025 한신 AISW 페스티벌 캡스톤 디자인부문 특별상', '2025 Hanshin AISW Festival, Special Award (Capstone Design)'),
      org: k('한신대학교', 'Hanshin University'),
    },
    {
      date: '25.11.18 ~ 25.11.19',
      name: k('2025 한신 AISW 페스티벌 창업 아이디어부문 장려상', '2025 Hanshin AISW Festival, Honorable Mention (Startup Idea)'),
      org: k('한신대학교', 'Hanshin University'),
    },
    {
      date: '25.11.18 ~ 25.11.19',
      name: k('2025 한신 AISW 페스티벌 일반 부문 장려상', '2025 Hanshin AISW Festival, Honorable Mention (General)'),
      org: k('한신대학교', 'Hanshin University'),
    },
    {
      date: '26.05.11',
      name: k(
        '2026년 AI-SW중심대학 AI·블록체인 비즈니스모델 경진대회 우수상',
        '2026 AI-SW-Centered University AI & Blockchain Business Model Competition, Excellence Award',
      ),
      org: k('SW 중심 대학', 'SW-Centered University Program'),
    },
    {
      date: '26.07.22',
      name: k('2026년 하계종합학술대회 및 대학생논문경진대회 동상', '2026 Summer Conference & Student Paper Competition, Bronze Award'),
      org: k('한국 디지털 콘텐츠 학회', 'Korea Digital Contents Society'),
    },
  ],
  activities: [
    {
      period: '23.04 ~ 23.07 · 23.10 ~ 23.12 · 25.04 ~ 25.07',
      name: k('웹 프로그래밍 멘토링 멘토 · 스터디 리더', 'Web programming mentor · study leader'),
      org: k('한신대학교', 'Hanshin University'),
      desc: k(
        '멘토링 프로그램의 멘토로, 그리고 웹 프로그래밍 스터디를 이끌며 후배들의 웹 개발 학습을 지원',
        'Helped junior students learn web development, as a mentor in the mentoring program and as leader of a web programming study group',
      ),
    },
    {
      period: '24.01.04 ~ 25.06.17',
      name: k('AID 랩실 학부 연구생', 'Undergraduate researcher, AID Lab'),
      org: k('한신대학교 AID 랩실', 'AID Lab, Hanshin University'),
      desc: k('학부 연구생', 'Undergraduate researcher'),
    },
    {
      period: '24.07.01 ~ 24.08.06',
      name: k('2024 SW중심 대학 디지털 경진대회', '2024 SW-Centered University Digital Competition'),
      org: k('SW 중심 대학', 'SW-Centered University Program'),
      desc: k('디지털 아이디어 경진대회에 참가해 아이디어를 기획하고 구현', 'Planned and built an idea for a digital idea competition'),
    },
    {
      period: '24.07.08 ~ 24.08.23',
      name: k('오산시 해커톤 대회 멘토', 'Mentor, Osan City Hackathon'),
      org: k('운천중학교, 오산시', 'Uncheon Middle School, Osan City'),
      desc: k('초중고 학생 해커톤에서 구현 방안을 지도', 'Coached school students on how to build their ideas at a hackathon'),
    },
    {
      period: '24.09.09 ~ 24.10.07',
      name: k('SW중심 대학 우수 작품 경진대회', 'SW-Centered University Outstanding Project Competition'),
      org: k('SW 중심 대학', 'SW-Centered University Program'),
      desc: k('프로젝트 출품·발표', 'Entered and presented a project'),
    },
    {
      period: '24.11.01 ~ 24.12.31',
      name: k('SW중심 대학 서포터즈', 'SW-Centered University Supporters'),
      org: k('한신대학교', 'Hanshin University'),
      desc: k('교내 SW 교육 프로그램 홍보와 행사 지원', 'Promoted campus software education programs and helped run events'),
    },
    {
      period: '24.11.05 ~ 25.02.07',
      name: k('2024 산학 협력 프로젝트', '2024 Industry-Academia Project'),
      org: k('한신대학교', 'Hanshin University'),
      desc: k('기업 연계 프로젝트에 팀원으로 참여', 'Joined a company-linked project as a team member'),
    },
    {
      period: '24.11.30',
      name: k('GEEKS 2024', 'GEEKS 2024'),
      org: k('GEEKS 조직 위원회', 'GEEKS Organizing Committee'),
      desc: k('IT 컨퍼런스에서 부스 운영과 소개', 'Ran a booth and presented at an IT conference'),
    },
    {
      period: '24.12.05 ~ 24.12.06',
      name: k('SW 인재 페스티벌', 'SW Talent Festival'),
      org: k('SW 중심 대학', 'SW-Centered University Program'),
      desc: k('부스 운영과 작품 출품, 타 대학 학생들과 교류', 'Ran a booth, exhibited a project and met students from other universities'),
    },
    {
      period: '24.12.15 ~ 25.03.01',
      name: k('어학 연수', 'Language course'),
      org: k('EF 브라이튼', 'EF Brighton'),
      desc: k('영국 브라이튼 EF 어학원 영어 연수 수료', 'Completed an English course at EF Brighton, UK'),
    },
    {
      period: '25.01.01 ~ 26.07.01',
      name: k('WebDB 랩장', 'Lab lead, WebDB Lab'),
      org: k('한신대학교', 'Hanshin University'),
      desc: k('WebDB 연구실 운영 총괄, 프로젝트 기획·관리', 'Ran the WebDB lab and planned and managed its projects'),
    },
    {
      period: '25.04.15 ~ 25.09.17',
      name: k('2025 산학협력 프로젝트', '2025 Industry-Academia Project'),
      org: k('한신대학교', 'Hanshin University'),
      desc: k('산학 협력 프로젝트 기획·개발', 'Planned and developed an industry-academia project'),
    },
    {
      period: '25.05.20 ~ 25.08.21',
      name: k('오픈소스 개발자대회', 'Open Source Developer Competition'),
      org: k('과학기술정보통신부', 'Ministry of Science and ICT'),
      desc: k('대회에 참여해 서비스를 제작', 'Built a service for the competition'),
    },
    {
      period: '25.06.30',
      name: k('제23회 통계청 논문 공모전', '23rd Statistics Korea Paper Contest'),
      org: k('통계청', 'Statistics Korea'),
      desc: k('데이터 분석 연구 논문 제출', 'Submitted a data-analysis research paper'),
    },
    {
      period: '25.10.16 · 25.10.27',
      name: k('한신대 AI 면접 특강 진행', 'AI interview workshops at Hanshin University'),
      org: k('한신대학교', 'Hanshin University'),
      desc: k('AI 면접 서비스를 소개하고 학생들이 직접 시연', 'Introduced an AI interview service and had students try it themselves'),
    },
    {
      period: '25.11.11',
      name: k('한신대 쏘랩 시연', 'Demo at Hanshin SoLab'),
      org: k('한신대학교', 'Hanshin University'),
      desc: k('AI 면접 서비스 소개·시연', 'Introduced and demonstrated an AI interview service'),
    },
    {
      period: '26.01.06 ~ 26.01.09',
      name: k('CES 2026 참관', 'CES 2026 visit'),
      org: k('CES', 'CES'),
      desc: k(
        '한신대 학생 대표로 라스베이거스 세계 전자제품 박람회 참관',
        'Visited CES, the consumer electronics show in Las Vegas, as a Hanshin University student representative',
      ),
    },
  ],
  work: [{ company: k('컴세바 입시 컨설팅 학원', 'Comseba Admissions Consulting Academy'), role: k('코딩 강사', 'Coding instructor'), period: '2025.07–2025.10' }],
  skills: [
    { group: k('웹·API', 'Web · API'), items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js'] },
    { group: k('데이터·비동기 처리', 'Data · async processing'), items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'BullMQ'] },
    { group: k('모바일·Python', 'Mobile · Python'), items: ['Expo / React Native', 'Python', 'FastAPI'] },
    { group: k('AI·품질 도구', 'AI · quality tools'), items: ['OpenAI API', 'Whisper', 'ONNX Runtime', 'Vitest', 'pytest', 'GitHub Actions'] },
  ],
  education: {
    school: { ko: '한신대학교', en: 'Hanshin University' },
    major: { ko: 'AI·SW대학 소프트웨어전공', en: 'Software major, College of AI·SW' },
    period: '2023.03–2027.02',
    note: { ko: '졸업 예정 · 인지감성컴퓨팅 특화전공', en: 'Expected graduation · Cognitive & Affective Computing specialization' },
    gpa: '3.7 / 4.5',
  },
  certs: [{ name: k('TOPCIT 2수준', 'TOPCIT Level 2'), detail: k('2024', '2024') }],
}
