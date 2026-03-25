const translations = {
  ko: {
    nav: {
      about: '소개',
      projects: '프로젝트',
      papers: '논문',
      experience: '경험',
      work: '경력',
      skills: '기술',
      awards: '수상',
      certs: '자격',
      contact: '연락처'
    },
    hero: {
      greeting: '안녕하세요',
      name: '허준영',
      role: 'Software Developer & AI Researcher',
      subtitle: '웹 개발과 AI 기술을 융합하여 사람들의 삶에 실질적인 가치를 만드는 개발자',
      cta: '더 알아보기',
      stats: [
        { number: '10+', label: '프로젝트' },
        { number: '8', label: '논문' },
        { number: '10+', label: '수상' },
        { number: '20+', label: '경험' },
      ]
    },
    about: {
      title: 'About Me',
      intro: '웹 개발과 AI 기술을 융합하여 사람들의 삶에 실질적인 서비스를 만드는 개발자가 되기 위해 끊임없이 노력해 왔습니다.',
      fullText: '안녕하세요, 허준영입니다. 저는 AI와 웹 기술을 결합해 실제 사용자 문제를 해결하는 서비스를 만드는 개발자입니다. 기술을 단순히 구현의 대상으로 보지 않고, 사람들의 삶에 어떤 긍정적인 변화를 만들어낼 수 있는지까지 함께 고민하며 개발해왔습니다. 저의 관심사는 디지털 포용성, 교육 형평성, 자기 성찰과 성장입니다. 그래서 저는 단순한 기능 중심의 개발보다, 사용자의 변화와 경험을 만드는 서비스 개발에 더 큰 의미를 두고 있습니다. 이러한 방향성 아래 AI 기반 발표 코칭, 맞춤형 학습 피드백, 진로 탐색, 대화형 케어 서비스 등 다양한 프로젝트를 직접 기획하고 개발하며 문제 해결 역량을 키워왔습니다. 또한 WebDB 랩실 랩장과 여러 프로젝트의 팀 리더를 맡으며, 개발뿐 아니라 기획, 협업, 발표, 운영까지 전 과정을 주도해왔습니다. 이 과정에서 저는 좋은 서비스는 좋은 코드만으로 완성되지 않으며, 문제를 정의하고 구조화하며 끝까지 책임지는 사람에 의해 만들어진다는 점을 배웠습니다. 저는 주어진 과제를 성실하게 해결하는 사람에 머무르지 않고, 더 나은 방향을 스스로 고민하고 새로운 도전을 즐기며 성장하는 개발자이고자 합니다. 앞으로도 기술과 사람 사이의 간격을 줄이는 서비스를 만드는 개발자로 계속 나아가고 싶습니다.',
      readMore: '자세히 보기',
      values: [
        { icon: '🎯', title: '디지털 포용성', desc: '기술의 사회적 책임을 다하는 개발' },
        { icon: '📚', title: '교육 형평성', desc: 'AI 기술을 활용한 교육 기회 확대' },
        { icon: '🚀', title: '자기 성찰과 성장', desc: '끊임없는 도전과 발전 추구' }
      ],
      education: '학력',
      educationData: [
        { period: '2023.03 ~ 2027.03', school: '한신대학교 소프트웨어', gpa: '3.7 / 4.5', status: '재학' },
        { period: '2019.03 ~ 2022.03', school: '양재고등학교', gpa: '', status: '졸업' }
      ]
    },
    projects: {
      title: 'Projects',
      viewDetail: '상세 보기',
      period: '기간',
      type: '유형',
      description: '설명',
      data: [
        {
          name: 'Pitches',
          tags: ['공모전', '논문', '프로젝트'],
          period: '2024.10 ~ 2025.05',
          summary: '실시간 발표 분석 및 코칭 AI 웹 서비스',
          detail: '발표자의 음성을 실시간 분석하여 피드백을 제공하는 서비스로, SenseVoice Small 음성 분석 모델과 GPT4o-mini 언어 모델을 결합해 구현했습니다. 발표 속도, 어조, 감정 등을 자동으로 분석하고, 그 결과를 기반으로 실시간 코칭 및 사후 리포트를 제공하여 사용자들이 자신의 발표 능력을 향상시킬 수 있도록 도왔습니다.',
          competitions: '캡스톤 디자인 및 AI 해커톤, SW중심대학 AI 창업 아이디어 경진대회, APIC-IST 2025'
        },
        {
          name: 'EduMatrix',
          tags: ['공모전', '논문', '졸업작품', '프로젝트'],
          period: '2025.03 ~ 2025.12',
          summary: 'AI 기반 개인 맞춤형 학습 피드백 플랫폼',
          detail: '학생들의 집중도, 성취도, 학습 패턴 데이터를 수집 및 분석하여 개인별 학습 피드백을 제공하는 웹 플랫폼을 개발했습니다. AI 모델을 통한 학습자 프로파일링과 성과 예측 기법을 적용하여 각 학생에게 최적화된 학습 전략과 개선점을 제시함으로써 교육 효과를 높이고자 했습니다.',
          competitions: '2025 하계/추계 학술대회 대학생 논문 경진대회'
        },
        {
          name: 'InnoView',
          tags: ['공모전', '프로젝트'],
          period: '2025.05 ~ 2025.08',
          summary: 'AI 면접 질문 생성 및 음성 분석 리포트 서비스',
          detail: '사전에 학습된 인공지능을 활용하여 면접 질문을 자동으로 생성하고 사용자의 면접 음성을 분석하여 종합 리포트를 제공함으로써, 사용자가 스스로를 객관적으로 점검할 수 있도록 하는 어플리케이션을 개발했습니다.',
          competitions: '오픈소스 개발자 대회'
        },
        {
          name: 'Label Light',
          tags: ['공모전', '프로젝트'],
          period: '2024.04 ~ 2024.11',
          summary: '시니어 정신건강 케어 AI 챗봇',
          detail: '시니어의 일상 대화를 통해 우울감 척도(GDS)를 평가해주는 AI 챗봇 서비스를 개발했습니다. 팀 리더로서 전체 기획과 백엔드 개발을 담당했으며, OpenAI GPT-4o 모델의 파인튜닝과 RAG 기법, 음성 인식(STT) 기술을 활용하여 사용자 맞춤형 상담 및 음성 대화 기능을 구현했습니다.',
          competitions: '한신 AISW 페스티벌, 하계 학술대회 논문 경진대회'
        },
        {
          name: 'LLM 디지털 돌봄 서비스',
          tags: ['공모전'],
          period: '2024.06 ~ 2024.12',
          summary: 'LLM + 메타버스 기반 시니어 가상 돌봄 시스템',
          detail: 'Meta Quest 3 XR 디바이스와 GPT4o-mini 모델을 활용하여 메타버스 공간에 가상 NPC 돌봄이를 배치하고, 시니어 사용자와 자연스러운 대화를 주고받을 수 있는 서비스를 개발했습니다. 대화 내용을 바탕으로 사용자의 심리 상태를 분석·기록하는 기능을 구현했습니다.',
          competitions: 'SW 인재 페스티벌, SW중심대학 우수작품 경진대회, 디지털 경진대회'
        },
        {
          name: '특허 분석 챗봇',
          tags: ['프로젝트'],
          period: '2024.01 ~ 2024.04',
          summary: 'GPT API + RAG 기반 특허 Q&A 챗봇',
          detail: 'OpenAI의 GPT-3.5-Turbo 및 GPT-4 API를 활용하여 방대한 특허 데이터로부터 사용자의 질문에 답변하는 챗봇을 개발했습니다. 프롬프트 엔지니어링과 RAG 기법을 적용하여 질문 의도를 정확히 파악하고 관련 특허 정보를 추출하는 챗봇의 초안을 구성했습니다.',
          competitions: ''
        },
        {
          name: 'Media Pulse',
          tags: ['프로젝트'],
          period: '2023.03 ~ 2023.10',
          summary: 'Node.js + MongoDB 웹 데이터 시각화 플랫폼',
          detail: 'Node.js(Express)와 MongoDB, Plotly.js를 사용하여 웹상의 데이터를 수집·저장하고 시각화하는 플랫폼을 구축했습니다. 네이버 API로 수집한 데이터를 바탕으로 트렌드 분석 차트를 생성하고, 키워드 검색 기능을 구현하여 사용자 편의성을 높였습니다.',
          competitions: ''
        },
        {
          name: 'DreamTrack',
          tags: ['공모전', '프로젝트'],
          period: '2025.10',
          summary: '개인 맞춤형 AI 커리어 디자인 플랫폼',
          detail: 'DreamTrack은 불확실성 속에서 행동으로 나아가게 돕는 개인 맞춤형 커리어 디자인 플랫폼입니다.',
          competitions: 'SUMTECH 해커톤'
        },
        {
          name: 'SkillPilot',
          tags: ['프로젝트'],
          period: '2025.09 ~ 진행중',
          summary: 'IT 커리어 전 과정 올인원 학습 플랫폼',
          detail: '학습 → 자격증 → 포트폴리오 → 면접에 이르는 IT 커리어 전 과정을 한 곳에서 지원하는 올인원 플랫폼입니다. 대학생 및 취업준비생이 희망 직무에 맞는 자격증을 찾고, 체계적인 학습 로드맵을 따라 공부하며, 모의시험으로 실력을 점검하고 포트폴리오 구축까지 이어지는 종합적인 커리어 관리 서비스를 제공합니다.',
          competitions: ''
        },
        {
          name: 'RestPlanner',
          tags: ['프로젝트'],
          period: '2025.09 ~ 2025.12',
          summary: '멀티 에이전트 기반 지능형 일정 관리 플랫폼',
          detail: '멀티 에이전트 협업 시스템을 활용한 지능형 일정 관리 플랫폼: Agent-to-Agent 통신 기반 웰니스 최적화 스케줄링 시스템입니다.',
          competitions: ''
        },
        {
          name: 'TeamFlow',
          tags: ['프로젝트'],
          period: '2025.09 ~ 진행중',
          summary: 'AI 기반 협업 인지·감성 분석 SaaS 플랫폼',
          detail: 'TeamFlow는 협업팀을 위한 AI 기반 협업 인지·감성 분석 SaaS 플랫폼입니다.',
          competitions: ''
        },
        {
          name: 'UniFit',
          tags: ['프로젝트'],
          period: '2025.11 ~ 2026.03',
          summary: '대학생 학업·진로·협업 통합 AI 플랫폼',
          detail: 'UniFit은 대학생의 학업·진로·협업 과정 전반을 데이터 기반으로 분석하고, AI 기술을 활용하여 개인화된 학습 경험과 체계적인 팀 프로젝트 환경을 제공하는 통합 플랫폼입니다.',
          competitions: ''
        }
      ]
    },
    papers: {
      title: 'Publications',
      authors: '저자',
      venue: '학회/대회',
      data: [
        { title: '메타버스와 LLM을 활용한 디지털 돌봄 서비스 개발', authors: '허준영, 이세연, 임익수', type: '공모전, 논문', venue: '2024 한신 ABC 캠프 해커톤' },
        { title: 'LLM을 활용한 시니어 정신 건강 검사 서비스 개발', authors: '허준영, 안정빈, 원용준', type: '논문, 학술대회', venue: '2025 한국디지털콘텐츠학회 하계종합학술대회' },
        { title: '개인 맞춤형 AI 학습 비서 시스템: EduMatrix 설계', authors: '권혁진, 김범수, 이혜연, 허준영', type: '논문, 학술대회', venue: '2025 한국디지털콘텐츠학회 하계종합학술대회' },
        { title: '제한적 고객 프로파일 정보에서의 라벨 추정 기반 고객 분류 기법', authors: '김진학, 허준영, 이영우, 최현범, 안현, 서정욱', type: '논문, 학술대회', venue: '한국인터넷정보통신학회, 2025' },
        { title: '인적, 사회적 요인을 고려한 다요인 산불 예측 모델 설계', authors: '허준영, 이지민, 이진우', type: '공모전, 논문', venue: '2025 통계청 논문 공모전' },
        { title: 'Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI', authors: '안상현, 허준영, 김은하', type: '논문, 학술대회', venue: 'APIC-IST 2025 (국제학술대회)' },
        { title: '개인 맞춤형 AI 학습 비서 시스템: EduMatrix 설계 및 제작', authors: '권혁진, 김범수, 이혜연, 허준영', type: '논문, 학술대회', venue: '2025 한국디지털콘텐츠학회 추계종합학술대회' },
        { title: 'LLM을 활용한 시니어 정신건강 검사 서비스 개발', authors: '허준영', type: '공모전, 논문', venue: '2024 한신 AISW 페스티벌' }
      ]
    },
    experience: {
      title: 'Experience',
      data: [
        { name: 'WebDB 랩장', period: '2025.01 ~ 현재', location: '한신대학교', org: 'WebDB 랩실', highlight: true },
        { name: '한신대학교 AID 랩실 학부 연구생', period: '2024.01 ~ 2025.06', location: '한신대학교', org: 'AID 랩실', highlight: true },
        { name: 'CES 2026 참여', period: '2026.01.05 ~ 2026.01.11', location: 'Las Vegas', org: 'CTA', highlight: true },
        { name: 'EF 브라이튼 어학 연수', period: '2024.12.15 ~ 2025.03.01', location: 'Brighton, UK', org: 'EF Brighton', highlight: true },
        { name: 'APIC-IST 2025 국제학술대회', period: '2025.07.07 ~ 2025.07.08', location: '한국 인터넷 정보 학회', org: '한국 인터넷 정보 학회', highlight: false },
        { name: '2025 하계 학술대회 논문 경진대회 (2개 분야)', period: '2025.07.03 ~ 2025.07.05', location: '한국 디지털 콘텐츠 학회', org: '한국 디지털 콘텐츠 학회', highlight: false },
        { name: '2025 추계 학술대회 논문 경진대회', period: '2025.11.06 ~ 2025.11.07', location: '한국 디지털 콘텐츠 학회', org: '한국 디지털 콘텐츠 학회', highlight: false },
        { name: '2025 한신 AISW 페스티벌 (3개 부문)', period: '2025.11', location: '한신대학교', org: '한신대학교 SW중심대학 사업단', highlight: false },
        { name: '한신대 쏘랩 시연', period: '2025.11.11', location: '한신대학교', org: '한신대학교', highlight: false },
        { name: '한신대 AI 면접 특강 진행', period: '2025.10.16 ~ 2025.10.21', location: '한신대학교', org: '한신대학교', highlight: false },
        { name: '오픈소스 개발자 대회', period: '2025.05.20 ~ 2025.08.21', location: '과학기술정보통신부', org: '과학기술정보통신부', highlight: false },
        { name: '2025 SW중심대학 AI 창업 아이디어 경진대회', period: '2025.05.16', location: '고려대학교', org: '고려대학교 SW중심대학 사업단', highlight: false },
        { name: '2025 산학협력 프로젝트', period: '2025.04.15 ~ 2025.09.17', location: '한신대학교', org: '한신대학교', highlight: false },
        { name: '제 23회 통계청 논문 공모전', period: '2025', location: '통계청', org: '통계청', highlight: false },
        { name: '웹 프로그래밍 멘토링/스터디 멘토', period: '2023 ~ 2025', location: '한신대학교', org: 'WebDB 랩실', highlight: false },
        { name: 'SW 인재 페스티벌', period: '2024.12.05 ~ 2024.12.06', location: '세종대 광개토관 컨벤션홀', org: 'SW 중심 대학', highlight: false },
        { name: 'SW중심대학 서포터즈', period: '2024.11 ~ 2024.12', location: '한신대학교', org: '한신대학교', highlight: false },
        { name: 'GEEKS 2024', period: '2024.11.30', location: '코엑스 E홀 전관', org: 'GEEKS 조직 위원회', highlight: false },
        { name: '2024 산학 협력 프로젝트', period: '2024.11.05 ~ 2025.02.07', location: '한신대학교', org: '한신대학교', highlight: false },
        { name: 'SW중심 대학 우수 작품 경진대회', period: '2024.09.09 ~ 2024.10.07', location: 'SW 중심 대학', org: 'SW 중심 대학', highlight: false },
        { name: '2024 SW중심 대학 디지털 경진대회', period: '2024.07.01 ~ 2024.08.06', location: '온라인 (데이콘)', org: 'SW 중심 대학', highlight: false },
        { name: '오산시 해커톤 대회 멘토', period: '2024.07.01 ~ 2024.08.06', location: '운천중학교, 오산시', org: '오산시', highlight: false }
      ]
    },
    work: {
      title: 'Work Experience',
      data: [
        {
          company: '(주)수지하우스',
          role: 'CTO (Chief Technology Officer)',
          period: '2026.01 ~',
          summary: '기술 전략 수립과 기술 개발, 혁신을 총괄',
          detail: '기술 전략 수립과 기술 개발, 혁신을 총괄하며 연구개발(R&D), 인프라 관리, 제품 개발을 책임지고 있습니다.',
          current: true
        },
        {
          company: '컴세바 입시 컨설팅 학원',
          role: '코딩 강사',
          period: '2025.07 ~ 2025.10',
          summary: '초·중·고등학생 대상 코딩 교육',
          detail: '초·중·고등학생 대상 코딩 강사로 활동하며, 대회 작품 제작 보조 및 문서 작업 보조를 수행했습니다.',
          current: false
        },
        {
          company: '오산시 해커톤',
          role: '해커톤 멘토',
          period: '2024.07 ~ 2024.08',
          summary: '데이터 분석 기반 해커톤 멘토링',
          detail: '데이터 분석(공영주차장 입출차 데이터, 경기도 범죄율) 기반 해커톤 멘토링 및 Orange3를 활용한 데이터 분석 방법 멘토링을 수행했습니다.',
          current: false
        }
      ]
    },
    skills: {
      title: 'Technical Skills',
      categories: {
        Frontend: 'Frontend',
        BackEnd: 'Backend',
        AI: 'AI / ML',
        DataBase: 'Database',
        Cloude: 'Cloud',
        Programming: 'Programming',
        Tools: 'Tools'
      }
    },
    awards: {
      title: 'Awards',
      data: [
        { date: '2024.10', award: '캡스톤 디자인 및 AI 해커톤 대상 (1등)', org: '한국 컴퓨터 교육 학회', rank: 'gold' },
        { date: '2024.11', award: '2024 한신 AISW 페스티벌 일반부 특별상 (1등)', org: '한신대 SW중심 대학', rank: 'gold' },
        { date: '2024.09', award: '한신 ABC 캠프 해커톤 우수상', org: '한신대 AI빅데이터 센터', rank: 'silver' },
        { date: '2025.05', award: 'SW중심대학 AI 창업 아이디어 경진대회 특별상', org: '고려대 SW중심 대학', rank: 'silver' },
        { date: '2025.07', award: '하계 학술대회 대학생 논문 경진대회 은상', org: '한국 디지털 콘텐츠 학회', rank: 'silver' },
        { date: '2025.11', award: '추계 학술대회 대학생 논문 경진대회 은상', org: '한국 디지털 콘텐츠 학회', rank: 'silver' },
        { date: '2025.07', award: '하계 학술대회 대학생 논문 경진대회 동상', org: '한국 디지털 콘텐츠 학회', rank: 'bronze' },
        { date: '2025.10', award: 'SUMTECH 해커톤 장려상', org: 'SW 중심 대학', rank: 'bronze' },
        { date: '2025.11', award: '2025 한신 AISW 페스티벌 캡스톤디자인 부문 특별상', org: '한신대학교', rank: 'bronze' },
        { date: '2025.11', award: '2025 한신 AISW 페스티벌 창업 아이디어 부문 장려상', org: '한신대학교', rank: 'bronze' },
        { date: '2025.11', award: '2025 한신 AISW 페스티벌 일반 부문 장려상', org: '한신대학교', rank: 'bronze' }
      ]
    },
    certs: {
      title: 'Certifications & Education',
      data: [
        { name: 'EF 브라이튼 어학연수', detail: '교육기간: 2024.12.15 ~ 2025.03.01', icon: '🇬🇧' },
        { name: 'TOPCIT 2수준', detail: '2024년', icon: '📋' },
        { name: 'TOEIC 515점', detail: '', icon: '📝' },
        { name: '운전 면허증 2종 보통', detail: '도로교통공단', icon: '🚗' },
        { name: '한국사 능력 검정 6급', detail: '국사편찬위원회', icon: '📜' }
      ]
    },
    contact: {
      title: 'Contact',
      phone: '전화',
      email: '이메일',
      address: '주소',
      addressValue: '서울특별시 서초구',
      languages: '언어',
      languagesValue: '한국어, 영어'
    },
    modal: { close: '닫기' },
    footer: { copyright: '© 2026 허준영. All rights reserved.' }
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      papers: 'Papers',
      experience: 'Experience',
      work: 'Work',
      skills: 'Skills',
      awards: 'Awards',
      certs: 'Certs',
      contact: 'Contact'
    },
    hero: {
      greeting: 'Hello',
      name: 'Heo Jun Young',
      role: 'Software Developer & AI Researcher',
      subtitle: 'Building impactful services by fusing web development and AI technology',
      cta: 'Learn More',
      stats: [
        { number: '12+', label: 'Projects' },
        { number: '8', label: 'Papers' },
        { number: '11', label: 'Awards' },
        { number: '20+', label: 'Experience' }
      ]
    },
    about: {
      title: 'About Me',
      intro: 'I have been constantly striving to become a developer who creates practical services that make a real difference in people\'s lives by combining web development and AI technology.',
      fullText: 'Hello, my name is Junyoung Heo. I am a developer who builds services that solve real user problems by combining AI and web technologies. Rather than seeing technology as something to simply implement, I focus on how it can create meaningful positive changes in people’s lives. My core interests lie in digital inclusion, educational equity, and self-reflection and growth. For this reason, I place greater value on building services that shape user experience and drive real change, rather than just developing feature-focused solutions. Under this direction, I have planned and developed various projects including AI-based speech coaching, personalized learning feedback systems, career exploration platforms, and conversational care services, through which I have strengthened my problem-solving capabilities. In addition, as the leader of the WebDB lab and a team lead on multiple projects, I have taken ownership of the entire process from planning and development to collaboration, presentation, and operation. Through these experiences, I learned that great services are not built by good code alone, but by those who can define problems, structure solutions, and take responsibility until the end. I strive to go beyond simply completing given tasks and instead become a developer who continuously seeks better directions, embraces new challenges, and grows through them. Moving forward, I aim to keep building services that bridge the gap between technology and people.',
      readMore: 'Read More',
      values: [
        { icon: '🎯', title: 'Digital Inclusion', desc: 'Technology with social responsibility' },
        { icon: '📚', title: 'Educational Equity', desc: 'Expanding opportunities through AI' },
        { icon: '🚀', title: 'Growth & Reflection', desc: 'Pursuing continuous challenges' }
      ],
      education: 'Education',
      educationData: [
        { period: '2023.03 ~ 2027.03', school: 'Hanshin Univ. Software Engineering', gpa: '3.7 / 4.5', status: 'Enrolled' },
        { period: '2019.03 ~ 2022.03', school: 'Yangjae High School', gpa: '', status: 'Graduated' }
      ]
    },
    projects: {
      title: 'Projects',
      viewDetail: 'View Detail',
      period: 'Period',
      type: 'Type',
      description: 'Description',
      data: [
        {
          name: 'Pitches',
          tags: ['Contest', 'Paper', 'Project'],
          period: '2024.10 ~ 2025.05',
          summary: 'Real-time presentation analysis & AI coaching service',
          detail: 'A service that provides real-time feedback by analyzing the speaker\'s voice, combining the SenseVoice Small speech analysis model with GPT4o-mini language model. It automatically analyzes speech speed, tone, and emotion, providing real-time coaching and post-presentation reports.',
          competitions: 'Capstone Design & AI Hackathon, SW AI Startup Contest, APIC-IST 2025'
        },
        {
          name: 'EduMatrix',
          tags: ['Contest', 'Paper', 'Capstone', 'Project'],
          period: '2025.03 ~ 2025.12',
          summary: 'AI-based personalized learning feedback platform',
          detail: 'Developed a web platform that collects and analyzes student focus, achievement, and learning pattern data to provide personalized learning feedback. Applied learner profiling and performance prediction through AI models to present optimized learning strategies.',
          competitions: '2025 Summer/Fall Academic Conference Student Paper Competition'
        },
        {
          name: 'InnoView',
          tags: ['Contest', 'Project'],
          period: '2025.05 ~ 2025.08',
          summary: 'AI interview question generation & voice analysis service',
          detail: 'Developed an application that automatically generates interview questions using pre-trained AI and analyzes user interview voice to provide comprehensive reports for objective self-assessment.',
          competitions: 'Open Source Developer Competition'
        },
        {
          name: 'Label Light',
          tags: ['Contest', 'Project'],
          period: '2024.04 ~ 2024.11',
          summary: 'Senior mental health care AI chatbot',
          detail: 'Developed an AI chatbot service that evaluates depression scale (GDS) through daily conversations with seniors. Led overall planning and backend development, implementing personalized counseling and voice conversation features using GPT-4o fine-tuning, RAG, and STT.',
          competitions: 'Hanshin AISW Festival, Summer Academic Conference'
        },
        {
          name: 'LLM Digital Care',
          tags: ['Contest'],
          period: '2024.06 ~ 2024.12',
          summary: 'LLM + Metaverse senior virtual care system',
          detail: 'Developed a virtual care system using Meta Quest 3 XR device and GPT4o-mini model, placing virtual NPC caregivers in metaverse space for natural conversations with senior users. Implemented psychological state analysis based on conversation content.',
          competitions: 'SW Talent Festival, SW Excellence Contest, Digital Contest'
        },
        {
          name: 'Patent Analysis Chatbot',
          tags: ['Project'],
          period: '2024.01 ~ 2024.04',
          summary: 'GPT API + RAG based patent Q&A chatbot',
          detail: 'Developed a chatbot using GPT-3.5-Turbo and GPT-4 API to answer questions from vast patent data. Applied prompt engineering and RAG techniques to accurately identify question intent and extract relevant patent information.',
          competitions: ''
        },
        {
          name: 'Media Pulse',
          tags: ['Project'],
          period: '2023.03 ~ 2023.10',
          summary: 'Node.js + MongoDB web data visualization platform',
          detail: 'Built a platform to collect, store and visualize web data using Node.js (Express), MongoDB, and Plotly.js. Created trend analysis charts based on data collected through Naver API with keyword search functionality.',
          competitions: ''
        },
        {
          name: 'DreamTrack',
          tags: ['Contest', 'Project'],
          period: '2025.10',
          summary: 'Personalized AI career design platform',
          detail: 'DreamTrack is a personalized career design platform that helps people take action in the face of uncertainty.',
          competitions: 'SUMTECH Hackathon'
        },
        {
          name: 'SkillPilot',
          tags: ['Project'],
          period: '2025.09 ~ Ongoing',
          summary: 'All-in-one IT career learning platform',
          detail: 'An all-in-one platform supporting the entire IT career process from learning to certification to portfolio to interview preparation. Provides comprehensive career management services with personalized recommendations and AI-based learning support.',
          competitions: ''
        },
        {
          name: 'RestPlanner',
          tags: ['Project'],
          period: '2025.09 ~ 2025.12',
          summary: 'Multi-agent intelligent scheduling platform',
          detail: 'An intelligent scheduling management platform utilizing multi-agent collaboration systems: wellness-optimized scheduling based on Agent-to-Agent communication.',
          competitions: ''
        },
        {
          name: 'TeamFlow',
          tags: ['Project'],
          period: '2025.09 ~ Ongoing',
          summary: 'AI-based team collaboration cognitive analysis SaaS',
          detail: 'TeamFlow is an AI-based collaborative cognitive and emotional analysis SaaS platform for teams.',
          competitions: ''
        },
        {
          name: 'UniFit',
          tags: ['Project'],
          period: '2025.11 ~ 2026.03',
          summary: 'University student academic & career integrated AI platform',
          detail: 'UniFit is an integrated platform that analyzes university students\' academic, career, and collaboration processes using data-driven approaches and AI technology to provide personalized learning experiences.',
          competitions: ''
        }
      ]
    },
    papers: {
      title: 'Publications',
      authors: 'Authors',
      venue: 'Venue',
      data: [
        { title: 'Development of Digital Care Service Using Metaverse and LLM', authors: 'Heo Jun Young, Lee Se Yeon, Lim Ik Su', type: 'Contest, Paper', venue: '2024 Hanshin ABC Camp Hackathon' },
        { title: 'Development of Senior Mental Health Screening Service Using LLM', authors: 'Heo Jun Young, Ahn Jeong Bin, Won Yong Jun', type: 'Paper, Conference', venue: '2025 Korean Digital Contents Society Summer Conference' },
        { title: 'Personalized AI Learning Assistant System: EduMatrix Design', authors: 'Kwon Hyuk Jin, Kim Beom Su, Lee Hye Yeon, Heo Jun Young', type: 'Paper, Conference', venue: '2025 Korean Digital Contents Society Summer Conference' },
        { title: 'Label Estimation-based Customer Classification with Limited Profile Information', authors: 'Kim Jin Hak, Heo Jun Young, Lee Young Woo, Choi Hyun Beom, Ahn Hyun, Seo Jeong Uk', type: 'Paper, Conference', venue: 'Korean Internet Information & Communications Society, 2025' },
        { title: 'Multi-factor Wildfire Prediction Model Considering Human and Social Factors', authors: 'Heo Jun Young, Lee Ji Min, Lee Jin Woo', type: 'Contest, Paper', venue: '2025 Statistics Korea Paper Contest' },
        { title: 'Pitches: Real-Time Presentation Coaching with Low-Latency Speech Analysis and Generative AI', authors: 'Ahn Sang Hyun, Heo Jun Young, Kim Eun Ha', type: 'Paper, Conference', venue: 'APIC-IST 2025 (International Conference)' },
        { title: 'Personalized AI Learning Assistant: EduMatrix Design & Implementation', authors: 'Kwon Hyuk Jin, Kim Beom Su, Lee Hye Yeon, Heo Jun Young', type: 'Paper, Conference', venue: '2025 Korean Digital Contents Society Fall Conference' },
        { title: 'Development of Senior Mental Health Screening Service Using LLM', authors: 'Heo Jun Young', type: 'Contest, Paper', venue: '2024 Hanshin AISW Festival' }
      ]
    },
    experience: {
      title: 'Experience',
      data: [
        { name: 'WebDB Lab Manager', period: '2025.01 ~ Present', location: 'Hanshin University', org: 'WebDB Lab', highlight: true },
        { name: 'Undergraduate Researcher, AID Lab', period: '2024.01 ~ 2025.06', location: 'Hanshin University', org: 'AID Lab', highlight: true },
        { name: 'CES 2026 Attendee', period: '2026.01.05 ~ 2026.01.11', location: 'Las Vegas', org: 'CTA', highlight: true },
        { name: 'EF Brighton Language Program', period: '2024.12.15 ~ 2025.03.01', location: 'Brighton, UK', org: 'EF Brighton', highlight: true },
        { name: 'APIC-IST 2025 International Conference', period: '2025.07.07 ~ 2025.07.08', location: 'Korean Internet Information Society', org: 'Korean Internet Info Society', highlight: false },
        { name: '2025 Summer Conference Paper Competition (2 fields)', period: '2025.07.03 ~ 2025.07.05', location: 'Korean Digital Contents Society', org: 'Korean Digital Contents Society', highlight: false },
        { name: '2025 Fall Conference Paper Competition', period: '2025.11.06 ~ 2025.11.07', location: 'Korean Digital Contents Society', org: 'Korean Digital Contents Society', highlight: false },
        { name: '2025 Hanshin AISW Festival (3 categories)', period: '2025.11', location: 'Hanshin University', org: 'Hanshin SW-Centered Univ.', highlight: false },
        { name: 'Hanshin SoLab Demo', period: '2025.11.11', location: 'Hanshin University', org: 'Hanshin University', highlight: false },
        { name: 'Hanshin AI Interview Lecture', period: '2025.10.16 ~ 2025.10.21', location: 'Hanshin University', org: 'Hanshin University', highlight: false },
        { name: 'Open Source Developer Competition', period: '2025.05.20 ~ 2025.08.21', location: 'MSIT', org: 'MSIT', highlight: false },
        { name: 'SW AI Startup Idea Competition', period: '2025.05.16', location: 'Korea University', org: 'Korea Univ. SW-Centered Univ.', highlight: false },
        { name: '2025 Industry-Academia Project', period: '2025.04.15 ~ 2025.09.17', location: 'Hanshin University', org: 'Hanshin University', highlight: false },
        { name: '23rd Statistics Korea Paper Contest', period: '2025', location: 'Statistics Korea', org: 'Statistics Korea', highlight: false },
        { name: 'Web Programming Mentor & Study Leader', period: '2023 ~ 2025', location: 'Hanshin University', org: 'WebDB Lab', highlight: false },
        { name: 'SW Talent Festival', period: '2024.12.05 ~ 2024.12.06', location: 'Sejong Univ. Convention Hall', org: 'SW-Centered University', highlight: false },
        { name: 'SW-Centered University Supporters', period: '2024.11 ~ 2024.12', location: 'Hanshin University', org: 'Hanshin University', highlight: false },
        { name: 'GEEKS 2024', period: '2024.11.30', location: 'COEX Hall E', org: 'GEEKS Committee', highlight: false },
        { name: '2024 Industry-Academia Project', period: '2024.11.05 ~ 2025.02.07', location: 'Hanshin University', org: 'Hanshin University', highlight: false },
        { name: 'SW Excellence Project Competition', period: '2024.09.09 ~ 2024.10.07', location: 'SW-Centered University', org: 'SW-Centered University', highlight: false },
        { name: '2024 SW Digital Competition', period: '2024.07.01 ~ 2024.08.06', location: 'Online (Dacon)', org: 'SW-Centered University', highlight: false },
        { name: 'Osan City Hackathon Mentor', period: '2024.07.01 ~ 2024.08.06', location: 'Uncheon Middle School, Osan', org: 'Osan City', highlight: false }
      ]
    },
    work: {
      title: 'Work Experience',
      data: [
        {
          company: 'SuziHouse Inc.',
          role: 'CTO (Chief Technology Officer)',
          period: '2026.01 ~',
          summary: 'Overseeing technology strategy, development & innovation',
          detail: 'Leading overall technology strategy, R&D, infrastructure management, and product development as Chief Technology Officer.',
          current: true
        },
        {
          company: 'CompSeba Academy',
          role: 'Coding Instructor',
          period: '2025.07 ~ 2025.10',
          summary: 'Coding education for K-12 students',
          detail: 'Worked as a coding instructor for elementary, middle, and high school students, assisting with competition project development and documentation.',
          current: false
        },
        {
          company: 'Osan City Hackathon',
          role: 'Hackathon Mentor',
          period: '2024.07 ~ 2024.08',
          summary: 'Data analysis-based hackathon mentoring',
          detail: 'Provided data analysis mentoring (parking data, crime rates) and Orange3-based data analysis methodology guidance for hackathon participants.',
          current: false
        }
      ]
    },
    skills: {
      title: 'Technical Skills',
      categories: {
        Frontend: 'Frontend',
        BackEnd: 'Backend',
        AI: 'AI / ML',
        DataBase: 'Database',
        Cloude: 'Cloud',
        Programming: 'Programming',
        Tools: 'Tools'
      }
    },
    awards: {
      title: 'Awards',
      data: [
        { date: '2024.10', award: 'Capstone Design & AI Hackathon Grand Prize (1st)', org: 'Korean Computer Education Society', rank: 'gold' },
        { date: '2024.11', award: '2024 Hanshin AISW Festival Special Award (1st)', org: 'Hanshin SW-Centered Univ.', rank: 'gold' },
        { date: '2024.09', award: 'Hanshin ABC Camp Hackathon Excellence Award', org: 'Hanshin AI Big Data Center', rank: 'silver' },
        { date: '2025.05', award: 'SW AI Startup Idea Contest Special Award', org: 'Korea Univ. SW-Centered Univ.', rank: 'silver' },
        { date: '2025.07', award: 'Summer Conference Student Paper Silver Award', org: 'Korean Digital Contents Society', rank: 'silver' },
        { date: '2025.11', award: 'Fall Conference Student Paper Silver Award', org: 'Korean Digital Contents Society', rank: 'silver' },
        { date: '2025.07', award: 'Summer Conference Student Paper Bronze Award', org: 'Korean Digital Contents Society', rank: 'bronze' },
        { date: '2025.10', award: 'SUMTECH Hackathon Encouragement Award', org: 'SW-Centered University', rank: 'bronze' },
        { date: '2025.11', award: '2025 AISW Festival Capstone Special Award', org: 'Hanshin University', rank: 'bronze' },
        { date: '2025.11', award: '2025 AISW Festival Startup Encouragement Award', org: 'Hanshin University', rank: 'bronze' },
        { date: '2025.11', award: '2025 AISW Festival General Encouragement Award', org: 'Hanshin University', rank: 'bronze' }
      ]
    },
    certs: {
      title: 'Certifications & Education',
      data: [
        { name: 'EF Brighton Language Program', detail: 'Dec 2024 ~ Mar 2025', icon: '🇬🇧' },
        { name: 'TOPCIT Level 2', detail: '2024', icon: '📋' },
        { name: 'TOEIC 515', detail: '', icon: '📝' },
        { name: 'Driver\'s License (Class 2)', detail: 'Korea Road Traffic Authority', icon: '🚗' },
        { name: 'Korean History Level 6', detail: 'National Institute of Korean History', icon: '📜' }
      ]
    },
    contact: {
      title: 'Contact',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      addressValue: 'Seocho-gu, Seoul',
      languages: 'Languages',
      languagesValue: 'Korean, English'
    },
    modal: { close: 'Close' },
    footer: { copyright: '© 2026 Heo Jun Young. All rights reserved.' }
  }
}

export const skillsData = [
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Vue', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },
  { name: 'TypeScript', category: 'BackEnd' },
  { name: 'NodeJS', category: 'BackEnd' },
  { name: 'ExpressJS', category: 'BackEnd' },
  { name: 'Flask', category: 'BackEnd' },
  { name: 'Linux', category: 'BackEnd' },
  { name: 'Python', category: 'Programming' },
  { name: 'C', category: 'Programming' },
  { name: 'Java', category: 'Programming' },
  { name: 'MongoDB', category: 'DataBase' },
  { name: 'MongoDB Atlas', category: 'DataBase' },
  { name: 'MySQL', category: 'DataBase' },
  { name: 'Orange3', category: 'DataBase' },
  { name: 'ChatGPT', category: 'AI' },
  { name: 'Claude', category: 'AI' },
  { name: 'Gemini', category: 'AI' },
  { name: 'Ollama', category: 'AI' },
  { name: 'PyTorch', category: 'AI' },
  { name: 'TensorFlow', category: 'AI' },
  { name: 'Prophet', category: 'AI' },
  { name: 'LightGBM', category: 'AI' },
  { name: 'AWS', category: 'Cloude' },
  { name: 'CloudFlare', category: 'Cloude' },
  { name: 'Git', category: 'Tools' },
  { name: 'Figma', category: 'Tools' },
  { name: 'Notion', category: 'Tools' },
  { name: 'Cursor', category: 'Tools' }
]

export default translations
