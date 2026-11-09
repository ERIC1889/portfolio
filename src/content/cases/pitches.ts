import type { Project } from '../types'
import { column, diagram, footer, k, metric, node, pairs, shot, step, video } from './helpers'

export const pitches: Project = {
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
  stack: ['SenseVoice-Small', 'FunASR', 'WebSocket', 'asyncio', 'GPT-5-nano', 'AWS', 'Fastify', 'Socket.IO', 'BullMQ', 'Redis', 'PostgreSQL', 'Whisper', 'Expo'],
  summary: k(
    '발표 중 말 속도와 감정을 분석해 알려 주는 코칭 서비스. 해커톤 대상과 창업 경진대회 특별상, 국제학술대회 논문으로 이어졌고 2026년에 혼자 다시 설계했습니다.',
    'A coaching service that analyzes speaking pace and emotion during a talk. It won a hackathon grand prize and a startup competition award, became an international conference paper, and I redesigned it alone in 2026.',
  ),
  overview: {
    highlights: pairs([
      ['캡스톤 디자인 및 AI 해커톤 대상(1등, 2024.10)', 'Grand prize (1st place) at the Capstone Design & AI Hackathon (Oct 2024)'],
      ['SW중심대학 AI 창업 아이디어 경진대회 특별상(2025.05)', 'Special award at the SW-Centered University AI Startup Idea Competition (May 2025)'],
      ['APIC-IST 2025 국제학술대회에 논문 발표', 'Paper presented at the APIC-IST 2025 international conference'],
    ]),
  },
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
    ['해커톤 대상(1등) · 창업 경진대회 특별상 · APIC-IST 2025 논문 2저자', 'Hackathon grand prize (1st) · startup competition special award · second author of the APIC-IST 2025 paper'],
  ]),
  contribution: {
    direct: pairs([
      ['팀 버전: 백엔드 개발, AI 모델 선정·적용, 연구와 발표, 논문 2저자', 'Team version: backend, choosing and applying the AI models, research and presenting, second author of the paper'],
      ['2026 리뉴얼: 전체', '2026 renewal: all of it'],
    ]),
    others: pairs([['팀 버전의 앱 UI', 'The app UI of the team version']]),
  },
  media: [
    video(
      '/media/pitches/demo.mp4',
      '/media/pitches/demo-poster.webp',
      720,
      1566,
      ['Pitches 앱 시연 영상', 'Pitches app demo video'],
      ['시연 · iOS 시뮬레이터 실제 앱 화면 · 실시간 피드백 → 분석 → 결과 → 보고서 → PDF', 'Demo · real app in the iOS simulator · live feedback → analysis → results → report → PDF'],
      '2026-11-02',
    ),
    shot('/media/pitches/live-green.webp', 720, 1566, ['초록 원과 함께 말해 보라고 안내하는 실시간 분석 화면', 'Live analysis screen with a green circle, prompting the speaker'], ['실시간 피드백 · iOS 시뮬레이터 실제 앱 화면', 'Live feedback · real app in the iOS simulator'], '2026-11-02', 'phone'),
    shot('/media/pitches/live-red.webp', 720, 1566, ['빨간 원과 음량 안내, 개선 팁이 나온 실시간 분석 화면', 'Live analysis screen with a red circle, a volume prompt and a tip'], ['판정에 따라 바뀌는 색과 팁 · iOS 시뮬레이터 실제 앱 화면', 'The color and tip change with each judgment · real app in the iOS simulator'], '2026-11-02', 'phone'),
    shot('/media/pitches/result.webp', 720, 1566, ['종합 점수, 달라진 점, 점수 그래프가 있는 결과 화면', 'Results screen with the overall score, what changed and a score graph'], ['분석 결과 · iOS 시뮬레이터 실제 앱 화면 · 시험 세션', 'Results · real app in the iOS simulator · test session'], '2026-11-02', 'phone'),
    shot('/media/pitches/report.webp', 720, 1566, ['발표 분석 요약과 음성 분석이 있는 코칭 보고서 화면', 'Coaching report with the talk summary and voice analysis'], ['AI 코칭 보고서 · iOS 시뮬레이터 실제 앱 화면 · 시험 세션', 'AI coaching report · real app in the iOS simulator · test session'], '2026-11-02', 'phone'),
    shot('/media/pitches/history.webp', 720, 1566, ['점수 추이 그래프와 지난 발표 목록', 'Score trend graph and the list of past talks'], ['발표 기록 · iOS 시뮬레이터 실제 앱 화면 · 시험 세션', 'Talk history · real app in the iOS simulator · test session'], '2026-11-02', 'phone'),
  ],
  metrics: [
    metric(
      ['음성→지표 지연 (논문)', 'Speech-to-indicator latency (paper)'],
      '평균 125ms · 최악 170ms',
      ['음성 입력부터 화면의 지표 갱신까지, 동시 20세션', 'From speech input to the indicator update on screen, 20 concurrent sessions'],
      ['NVIDIA A10G 1개, 5명의 3분 발표(영어 3 · 한국어 2), 추론·네트워크·화면 표시 포함 · 2024–25 팀 버전 구조', 'One NVIDIA A10G, 3-minute talks by 5 people (3 in English, 2 in Korean), inference, network and rendering included · the 2024–25 team architecture'],
      'paper',
      '2026-10-29',
    ),
    metric(
      ['실시간 파이프라인 테스트 (2026)', 'Real-time pipeline tests (2026)'],
      '10개 중 5개가 실패·생략 경로',
      ['전사 시간 초과 · 전사 실패 · 감정 서비스 실패 · 무음 생략 경로', 'Transcript timeout, transcript failure, emotion-service failure and silence-skip paths'],
      ['Vitest, 외부 호출은 모의 응답, 로컬 실행 · API 단위 테스트 전체 41개 통과', 'Vitest with mocked external calls, run locally · all 41 API unit tests pass'],
      'measured',
      '2026-11-09',
    ),
  ],
  background: pairs([
    [
      '현대 사회에서 스피치 능력은 개인의 핵심 경쟁력으로 자리잡고 있습니다. 한 조사에 따르면 고용주들이 가장 중요하게 생각하는 소프트 스킬 중 효과적인 커뮤니케이션 능력이 1위를 차지했으며, **말로 자신의 생각을 명확하게 전달하는 능력**이 성공의 중요한 열쇠가 되고 있습니다. 이렇듯 말하기 능력은 중요해졌지만 오프라인 코칭은 접근성, 비용의 제약이 크고 기존의 서비스는 녹음 이후 분석이 대부분이거나 영어 중심이거나 실시간 피드백이 부재하다는 문제점이 있습니다. 이러한 문제점들을 해결하기 위해 **접근성이 높고, 데이터에 기반하며, 실시간 피드백을 제공**하고, 여러 언어를 지원하는 솔루션을 만들었습니다.',
      "Public speaking has become a core competency. In one survey, effective communication ranked first among the soft skills employers value most, and **the ability to convey one's thoughts clearly in speech** has become a key to success. Yet even as speaking skills grew more important, in-person coaching is limited by access and cost, and existing services mostly analyze after the recording, focus on English or offer no real-time feedback. To address these problems we built a solution that is **accessible, data-driven and gives real-time feedback**, and supports several languages.",
    ],
  ]),
  architecture: {
    diagram: diagram(
      [
        column(
          ['모바일 앱', 'Mobile app'],
          [
            node('app', 'mine', ['모바일 앱', 'Mobile app'], {
              icon: 'phone',
              subtitle: ['Expo · React Native', 'Expo · React Native'],
              items: [
                ['Pitches Circle · 5초마다 색 피드백', 'Pitches Circle · color feedback every 5 s'],
                ['녹음 · 결과 · PDF', 'Recording · results · PDF'],
              ],
              links: [
                ['api', ['음성 · 피드백', 'audio · feedback'], 'realtime'],
                ['api', ['REST', 'REST'], 'sync'],
              ],
            }),
          ],
        ),
        column(
          ['API 서버 · 워커', 'API server · worker'],
          [
            node('api', 'mine', ['API 서버', 'API server'], {
              icon: 'server',
              subtitle: ['Node.js · Fastify · Socket.IO', 'Node.js · Fastify · Socket.IO'],
              items: [
                ['5초 판정 · 음량 · 속도 · 간투사 · 감정', '5 s judgment · volume · pace · fillers · emotion'],
                ['REST · JWT', 'REST · JWT'],
              ],
              links: [
                ['emotion', ['5초 음성', '5 s audio'], 'local'],
                ['openai', ['부분 전사', 'partial transcript'], 'paid'],
                ['worker', ['종료 → 보고서 잡', 'end → report job'], 'async'],
                ['db', ['세션', 'sessions'], 'sync'],
              ],
            }),
            node('worker', 'mine', ['보고서 워커', 'Report worker'], {
              icon: 'repeat',
              subtitle: ['BullMQ · 전사 → GPT → PDF', 'BullMQ · transcript → GPT → PDF'],
              links: [
                ['openai', ['전사 · 보고서', 'transcript · report'], 'paid'],
                ['redis', ['작업 큐', 'job queue'], 'async'],
                ['db', ['보고서', 'reports'], 'sync'],
                ['files', ['PDF', 'PDF'], 'sync'],
              ],
            }),
          ],
        ),
        column(
          ['AI 분석', 'AI analysis'],
          [
            node('emotion', 'local', ['감정 분석', 'Emotion analysis'], {
              icon: 'cpu',
              subtitle: ['SenseVoice-Small · emotion2vec+', 'SenseVoice-Small · emotion2vec+'],
              items: [['로컬 CPU · 무료', 'Local CPU · free']],
            }),
            node('openai', 'external', ['OpenAI', 'OpenAI'], {
              icon: 'sparkles',
              subtitle: ['Whisper · gpt-5-nano', 'Whisper · gpt-5-nano'],
              items: [['유일한 유료 항목', 'The only paid item']],
            }),
          ],
        ),
      ],
      ['2026 리뉴얼 구조 · 발표 음성을 5초마다 분석해 색으로 피드백하고, 끝나면 AI 코칭 보고서를 만든다', '2026 renewal · audio is analyzed every 5 s for color feedback, and an AI coaching report follows the talk'],
      footer(
        ['데이터', 'Data'],
        'database',
        [
          node('db', 'data', ['PostgreSQL', 'PostgreSQL'], { icon: 'database', subtitle: ['사용자 · 세션 · 보고서', 'Users · sessions · reports'] }),
          node('redis', 'data', ['Redis', 'Redis'], { icon: 'layers', subtitle: ['보고서 작업 큐', 'Report job queue'] }),
          node('files', 'data', ['uploads/', 'uploads/'], { icon: 'folder', subtitle: ['녹음 WAV · 보고서 PDF', 'Recording WAV · report PDF'] }),
        ],
      ),
    ),
    body: pairs([
      [
        'Expo 모바일 앱이 발표 음성을 스트리밍하면 Fastify·Socket.IO 서버가 5초 단위로 음량·말 속도·간투사·감정을 분석하고, 규칙에 따라 색상과 개선 팁을 제공하는 구조입니다. 전사는 Whisper, 감정 분석은 별도 Python 서비스의 SenseVoice-Small과 emotion2vec+가 담당하며, 분석별 대기 시간을 제한해 일부 요청이 실패해도 확보한 지표로 피드백을 이어갑니다. 무음 구간은 외부 분석을 생략하고, 확신도가 높은 감정만 판정에 반영합니다. 발표 종료 후 전체 전사·지표 집계·gpt-5-nano 보고서 작성·PDF 생성은 BullMQ 워커에서 비동기로 처리합니다. 데이터는 PostgreSQL, 작업 큐는 Redis, 녹음과 PDF는 로컬 디스크에 저장합니다. 앱과 API 서버는 공유 Zod 스키마로 데이터 형식을 맞추고 GPT 출력도 검증하며, 외부 호출을 분리해 실제 API 호출 없이 처리 로직을 테스트할 수 있도록 구성했습니다.',
        "When the Expo mobile app streams the talk's audio, a Fastify · Socket.IO server analyzes volume, speaking pace, filler words and emotion every 5 seconds and returns a color and an improvement tip according to rules. Whisper handles transcription; SenseVoice-Small and emotion2vec+ in a separate Python service handle emotion analysis, and each analysis has its own time limit, so feedback continues from the metrics already in hand even when some requests fail. Silent stretches skip the external analyses, and only high-confidence emotions count toward the judgment. After the talk ends, the full transcript, metric aggregation, the gpt-5-nano report and PDF generation run asynchronously in a BullMQ worker. Data lives in PostgreSQL, the job queue in Redis, and recordings and PDFs on local disk. The app and the API server share Zod schemas to keep their data formats aligned and to validate GPT output as well, and external calls are isolated so the processing logic can be tested without real API calls.",
      ],
    ]),
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
          k('보고서 화면까지 구현, 단위 테스트 41개 통과, iOS 시뮬레이터 시연', 'Built through the report screen; 41 unit tests pass; demonstrated in the iOS simulator'),
        ],
      ],
    },
  },
  cases: [
    {
      title: k('실시간 피드백이 멈추지 않는 구조', 'A live feedback loop that does not stall'),
      problem: step(
        [
          [
            '발표 중 상태를 바로 보여줘 조절하도록 돕는 서비스인 만큼 실시간성이 가장 중요합니다. 이 지표를 만들기 위해 5초마다 Whisper API로 부분 전사와 별도의 감정 분석 서비스의 응답이 필요했습니다. 모든 결과를 기다리면 피드백이 늦어지고, 분석 하나의 실패가 그 구간의 피드백 전체를 막을 수 있습니다.',
            "The service shows the speaker's state as they talk so they can adjust, so real-time behaviour matters most. To produce the indicators it needed a partial transcript from the Whisper API every 5 seconds and a response from a separate emotion-analysis service. Waiting for every result would delay the feedback, and one failed analysis could block the whole window's feedback.",
          ],
        ],
        ['분석의 대기로 인해 실시간 피드백의 지연', 'Waiting on analysis delayed the real-time feedback'],
      ),
      analysis: step(
        [
          [
            '음량은 받은 음성에서 바로 계산되지만, 말 속도, 간투사, 자막은 전사가, 감정은 별도 모델이 필요합니다. 두 분석은 서로를 기다릴 필요가 없어 동시에 요청하고 다음 5초 구간이 쌓이기 전에 끝나도록 제한 시간을 그보다 짧게 두었습니다. 만약 분석이 시간을 넘기게 되면 그 구간에서 빠져 그 지표만 판정하지 못합니다.',
            'Volume is computed directly from the incoming audio, but pace, filler words and captions need the transcript, and emotion needs a separate model. The two analyses do not depend on each other, so they are requested at the same time with a time limit shorter than the 5-second window so they finish before the next window piles up. An analysis that runs over is dropped from that window, and only that indicator goes unjudged.',
          ],
          [
            '자막의 경우 감정 분석 모델인 SenseVoice-Small이 같은 구간을 받아쓰고 있어 대체가 가능했지만, 두 모델은 숫자 표기와 간투사 처리 방식이 달라 판정에는 Whisper 결과만 사용하도록 구현했습니다.',
            'For captions, the emotion model SenseVoice-Small was already transcribing the same window, so it could stand in; but the two models differ in how they write numbers and handle filler words, so only the Whisper result is used for judgments.',
          ],
        ],
        ['필요한 분석과 가능한 대기 시간의 분배', 'Deciding which analyses were needed and how long each could wait'],
      ),
      action: step(
        [
          [
            '서버는 약 5초 분량의 음성이 모이면 음량을 먼저 계산하고, 무음이면 두 분석 호출을 생략합니다. 말소리가 있으면 부분 전사(Whisper API)와 감정 분석(SenseVoice-Small·emotion2vec+)을 동시에 요청하고 제한 시간은 각각 4초, 3초로 제한해 재시도하지 않습니다. 실패한 항목은 빼고 나머지 성공한 결과를 바탕으로 피드백을 생성합니다. 발표 후 전체 전사와 LLM 보고서·PDF 생성은 BullMQ 작업으로 넘겨 별도 워커가 처리합니다.',
            'Once about 5 seconds of audio has arrived, the server computes volume first and skips both analysis calls if the window is silent. If there is speech, it requests the partial transcript (Whisper API) and emotion analysis (SenseVoice-Small · emotion2vec+) at the same time, limited to 4 s and 3 s respectively, with no retries. Failed items are dropped and the feedback is built from the results that succeeded. After the talk, the full transcript and the LLM report and PDF are handed to BullMQ jobs processed by a separate worker.',
          ],
        ],
        ['동시 요청, 제한 시간, 실패 처리', 'Parallel requests, time limits, failure handling'],
      ),
      result: step(
        [
          [
            '제한 시간 설계상 한 구간의 판정은 최대 4초 안에 끝나 5초를 넘지 않습니다. 시험 발표 5회에서 구간 피드백은 5초 구간이 끝난 뒤 평균 1.6초, 최대 3.2초 안에 도착했습니다. Whisper를 끈 시험에서도 말소리 구간 24개 중 24개에 자막이 표시됐고 실패, 생략 경로는 실시간 파이프라인 테스트 10개 중 5개로 확인했습니다.',
            "By design, a window's judgment finishes within 4 seconds at most and never exceeds the 5-second period. In 5 test talks, window feedback arrived on average 1.6 s and at most 3.2 s after the window ended. With Whisper turned off, captions still appeared on 24 of 24 speech windows, and the failure and skip paths are covered by 5 of the 10 real-time pipeline tests.",
          ],
        ],
        ['분석의 오류를 피드백과 자막 표시', 'Analysis errors show up in the feedback and captions'],
      ),
    },
    {
      title: k('무음, 잡음 구간 처리', 'Handling silence and noise'),
      problem: step(
        [
          [
            'Whisper는 무음·잡음 구간에서 영상 자막과 전사 내용을 만들어 냅니다. 이 문장이 섞이는 경우 말 속도와 간투사 수가 틀어지고 하지 않은 말이 자막으로 뜨고 분석 결과에 활용됩니다.',
            'In silent or noisy stretches Whisper produces video-caption phrases and transcript text. When those sentences get mixed in, pace and filler-word counts go wrong, words that were never said appear as captions, and they feed into the analysis.',
          ],
        ],
        ['Whisper의 무음 구간 전사를 만들어내는 문제', 'Whisper invented transcripts for silent stretches'],
      ),
      analysis: step(
        [
          [
            '완전한 무음의 경우 음량으로 알 수 있어 호출 자체를 막으면 비용이 줄어들지만 기준을 넘는 잡음의 경우 같은 문구가 나올 수 있어 문구 목록이 더 필요했습니다. 때문에 Whisper가 무음 구간에 자주 만들어내는 내용을 수집 정제해 발표에서 쓰지 않는 몇 가지를 바탕으로 방지했습니다.',
            'Complete silence can be detected from volume alone, and skipping the call there also saves cost; but noise above the threshold can produce the same phrases, so a phrase list was needed as well. I collected and cleaned the text Whisper tends to produce in silence and based the filter on a handful of phrases that never occur in a talk.',
          ],
        ],
        ['음량 기준, 문구 목록 두 가지의 방지 방법', 'Two safeguards: a volume threshold and a phrase list'],
      ),
      action: step(
        [
          [
            '음량이 -50dB 미만인 구간은 전사와 감정 분석을 호출하지 않습니다. 전사 결과는 공백과 문장 부호를 지운 뒤 문구 목록과 비교해 잡히면 지우도록 설계했습니다.',
            'Windows below -50 dB are not sent for transcription or emotion analysis. Transcripts have whitespace and punctuation removed and are compared against the phrase list, and anything that matches is cleared.',
          ],
        ],
        ['무음은 호출 이전에 지어낸 문구의 경우에는 호출 이후에', 'Silence is handled before the call, invented phrases after it'],
      ),
      result: step(
        [
          [
            '시험 발표 5회에서 5초 구간의 18%를 무음으로 건너뛰어 Whisper 호출을 줄였고 무음 구간에 잡음으로 인해 Whisper가 만들어낸 3건의 문장을 걸러냈습니다.',
            'In 5 test talks, 18% of the 5-second windows were skipped as silence, cutting that many Whisper calls, and 3 sentences Whisper had produced from noise in silent stretches were filtered out.',
          ],
        ],
        ['무음은 호출하지 않고 지어낸 문장은 빠집니다.', 'Silence is never sent, and invented sentences drop out.'],
      ),
    },
  ],
  results: pairs([
    ['캡스톤 디자인 및 AI 해커톤 대상(1등, 2024.10)과 SW중심대학 AI 창업 아이디어 경진대회 특별상(2025.05)을 받았습니다.', 'Won the grand prize (1st place) at the Capstone Design & AI Hackathon (Oct 2024) and a special award at the SW-Centered University AI Startup Idea Competition (May 2025).'],
    ['APIC-IST 2025 국제학술대회에 논문을 발표했습니다.', 'Presented a paper at the APIC-IST 2025 international conference.'],
    [
      '음성→지표 지연은 평균 125ms(σ=18ms), 동시 20세션에서 최악 170ms입니다(추론·네트워크·화면 표시 포함, NVIDIA A10G 1개, 5명의 3분 발표 · 영어 3·한국어 2). 2024–25 팀 버전 구조를 논문에서 측정한 값입니다.',
      'The speech-to-indicator latency is 125 ms on average (σ = 18 ms) and 170 ms at worst with 20 concurrent sessions (inference, network and rendering included; one NVIDIA A10G; 3-minute talks by 5 people, 3 in English and 2 in Korean). These are the paper’s measurements of the 2024–25 team architecture.',
    ],
    ['소규모 사용자 조사(5명)에서 5명 모두 실시간 표시가 말 속도 교정에 도움이 된다고 답했습니다.', 'In a small user survey (5 people), all five said the live indicators helped them correct their pace.'],
  ]),
  retro: pairs([
    ['실시간 피드백에서는 모델의 속도보다 무엇을 먼저 보내고 무엇을 기다리게 할지 정하는 설계가 더 중요하다는 것을 배웠습니다.', 'In live feedback, deciding what to send first and what can wait mattered more than the speed of the model.'],
    ['5명뿐인 사용자 조사였지만, 실제 발표자가 색 표시를 보며 말 속도를 고치는 모습이 어떤 수치보다 설계 판단에 큰 영향을 줬습니다.', 'The user survey had only five people, but watching real speakers correct their pace from the color cues shaped the design more than any number did.'],
  ]),
  material: pairs([
    [
      '2024·2026 코드는 공개하지 않았습니다. 2026 앱은 단위 테스트 41개가 통과하고 전체 흐름을 재현 스크립트로 확인했으며, iOS 시뮬레이터에서 로그인부터 보고서 PDF 저장까지 시연했습니다. 시연 영상과 화면은 이 페이지에 있고, 지연 수치는 APIC-IST 2025 발표 논문을 기준으로 적었습니다.',
      'The 2024 and 2026 code are not public. For the 2026 app, 41 unit tests pass, a script replays the whole flow, and it was demonstrated in the iOS simulator from login to saving the report PDF. The demo video and screens are on this page, and the latency figures follow the paper presented at APIC-IST 2025.',
    ],
  ]),
}
