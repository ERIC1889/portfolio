import type { Project } from '../types'
import { column, diagram, k, metric, node, pairs, shot, step, video } from './helpers'

export const closetmate: Project = {
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
  overview: {
    highlights: pairs([
      ['사진 등록 → 분류 → 후보 생성 → LLM 추천 → 서버 검증까지 전체 흐름을 혼자 구현', 'The whole flow, from adding a photo through labeling, candidates, LLM suggestion and server check, built alone'],
      ['같은 조건 비교로 ResNet50의 약 15분의 1 크기(6.0MB) 모델 채택', 'A model about one fifteenth the size of ResNet50 (6.0 MB) chosen after a same-conditions comparison'],
      ['LLM 추천 서버 검증: 실측 23회 중 최종 실패 0건', 'Server-side check of LLM suggestions: 0 final failures in 23 measured runs'],
    ]),
  },
  features: pairs([
    ['사진 기반 옷 등록과 자동 분류, 카테고리별 옷장', 'Adding clothes by photo with automatic labels, and a wardrobe by category'],
    ['글·음성 코디 요청, 날씨와 상황을 반영한 추천', 'Outfit requests by text or voice, with suggestions that reflect the weather and occasion'],
    ['착용 기록, 옷장 통계, 선택형 OpenAI Vision 상세 분석', 'Wear history, wardrobe stats and optional detailed OpenAI Vision analysis'],
  ]),
  resumeItems: pairs([
    ['LLM 추천을 서버에서 형식 → 옷 ID → 후보 조합 순서로 검증하고, 어긋나면 보조 모델로 다시 받기', 'Checking LLM suggestions on the server in the order format → clothing IDs → candidate outfit, and asking a backup model when anything is off'],
    ['MobileNetV3·ResNet50 전이학습 비교 후 MobileNetV3를 서버에서 ONNX로 추론', 'Compared transfer learning on MobileNetV3 and ResNet50, then served MobileNetV3 with ONNX on the server'],
    ['Expo 앱: 사진 등록·분류 확인, 옷장, 통계, 음성 입력(Whisper)', 'The Expo app: adding photos and checking labels, the wardrobe, stats and voice input (Whisper)'],
  ]),
  contribution: {
    direct: pairs([['기획 · 모델 학습 · 모바일·API 개발', 'Planning · model training · mobile and API development']]),
  },
  media: [
    video('/media/closetmate/demo.mp4', '/media/closetmate/demo-poster.webp', 540, 1030, ['ClosetMate 시연 영상', 'ClosetMate demo video'], ['시연 · 실제 앱 화면 녹화', 'Demo · real app screen recording'], '2026-05-25', 'device'),
    shot('/media/closetmate/recommend.webp', 560, 893, ['상황을 입력해 받은 코디 추천 결과', 'Outfit suggestions for a described occasion'], ['추천 결과 · 실제 앱 화면 · gpt-5.4-nano, 후보 10개', 'Suggestions · real app screen · gpt-5.4-nano, 10 candidates'], '2026-05-25', 'device'),
    shot('/media/closetmate/classify.webp', 560, 974, ['사진을 분류한 결과를 확인하고 고치는 화면', 'Checking and correcting the classification of a photo'], ['옷 추가 · 실제 앱 화면 · MobileNetV3 분류', 'Adding a garment · real app screen · MobileNetV3 label'], '2026-05-25', 'device'),
    shot('/media/closetmate/wardrobe.webp', 560, 891, ['카테고리별로 정리된 옷장', 'The wardrobe grouped by category'], ['옷장 · 실제 앱 화면', 'Wardrobe · real app screen'], '2026-05-25', 'device'),
    shot('/media/closetmate/voice.webp', 560, 993, ['음성으로 상황을 말하는 추천 화면', 'Describing the occasion by voice'], ['음성 입력 · 실제 앱 화면', 'Voice input · real app screen'], '2026-05-25', 'device'),
    shot(
      '/media/closetmate/stats.webp',
      560,
      967,
      ['옷장 구성, 활용률, 분류 확인이 필요한 옷 수를 보여 주는 통계 화면', 'Stats screen with the wardrobe mix, how often clothes are worn and how many labels need checking'],
      ['통계: 신뢰도 50% 미만 분류는 확인 필요로 표시 · 실제 앱 화면 · 시험용 옷장 데이터', 'Stats: labels under 50% confidence are flagged for checking · real app screen · test wardrobe data'],
      '2026-05-25',
      'device',
    ),
  ],
  metrics: [
    metric(
      ['추천 검증 (실측)', 'Suggestion check (measured)'],
      '23회 중 최종 실패 0',
      ['기본 모델 통과 19 · 보조 모델 처리 4 · 최종 실패 0', 'Base model passed 19 · backup model handled 4 · final failures 0'],
      ['추천 요청 23회, 서버 검증 게이트(형식 → 옷 ID → 후보 조합) 기준', '23 suggestion requests, judged by the server verification gate (format → clothing IDs → candidate outfit)'],
      'measured',
      '2026-11-09',
    ),
    metric(
      ['분류 추론 시간', 'Classification inference time'],
      'MobileNetV3-Small 30.83ms · ResNet50 20.45ms',
      ['이미지 1장 분류 추론 평균', 'Average inference for one image'],
      ['PyTorch, Apple M5 CPU, 224×224 무작위 입력 1장, 워밍업 5회·측정 30회', 'PyTorch on an Apple M5 CPU, one random 224×224 input, 5 warm-up and 30 measured runs'],
      'measured',
      '2026-05-25',
    ),
    metric(['가중치 크기', 'Weights size'], '6.0MB · 90.2MB', ['MobileNetV3-Small · ResNet50 PyTorch 가중치 파일', 'MobileNetV3-Small · ResNet50 PyTorch weight files'], ['학습 결과 파일 기준', 'From the trained weight files'], 'measured', '2026-05-25'),
    metric(
      ['전체 흐름 확인', 'End-to-end run'],
      '43장',
      ['사진 업로드부터 추천까지', 'From photo upload to suggestion'],
      ['직접 찍은 옷 사진과 학습 데이터셋 이미지, 수동 실행 · 정확도 수치 아님', 'My own clothing photos plus dataset images, run by hand · not an accuracy figure'],
      'measured',
      '2026-05-25',
    ),
  ],
  background: pairs([
    [
      '많은 사람들은 옷장이 꽉 차 있는데도 매일 아침 무엇을 입지를 고민합니다. 실제로 옷이 없는 것이 아니라, 내가 가진 옷을 제대로 기억하지 못하고, 상황에 맞게 조합하지 못하는 것이 문제라고 생각해 이 문제를 사용자는 옷 사진을 찍어 등록하고 필요할 때는 말이나 텍스트로 원하는 상황을 입력하고 AI가 옷장 데이터를 바탕으로 날씨와 상황에 맞는 옷을 추천하도록 구현했습니다.',
      'Many people stand in front of a full wardrobe every morning and still wonder what to wear. The problem is not a lack of clothes but that we do not remember what we own and cannot combine it for the occasion. So I built an app where the user photographs clothes to add them, describes the occasion by voice or text when needed, and AI recommends clothes that suit the weather and the occasion from the wardrobe data.',
    ],
  ]),
  architecture: {
    diagram: diagram(
      [
        column(
          ['모바일 앱', 'Mobile app'],
          [
            node('app', 'mine', ['Mobile App', 'Mobile App'], {
              subtitle: ['Expo SDK 56 · React Native', 'Expo SDK 56 · React Native'],
              items: [
                ['5탭 (홈 · 옷장 · 추천 · 통계 · 설정) + 옷 추가', '5 tabs (home · wardrobe · suggestions · stats · settings) + add clothes'],
                ['사진 선택 → 서버에서 AI 분류', 'Pick a photo → AI label on the server'],
                ['음성으로 코디 요청 (expo-audio)', 'Outfit request by voice (expo-audio)'],
                ['위치 → 날씨 반영 (expo-location)', 'Location → weather (expo-location)'],
                ['"이거 입었어요" → 착용 기록 누적', '"I wore this" → wear history'],
                ['기기 안 TFLite 분류기 번들 (dev build용 · 지금은 서버 추론 사용)', 'Bundled TFLite classifier (dev build only · server inference in use)'],
              ],
              links: [['api', ['HTTPS · JSON · multipart · x-user-id 헤더', 'HTTPS · JSON · multipart · x-user-id header'], 'sync']],
            }),
          ],
        ),
        column(
          ['백엔드 API', 'Backend API'],
          [
            node('api', 'mine', ['Backend API', 'Backend API'], {
              subtitle: ['Next.js 16 · Vercel 배포 대상', 'Next.js 16 · deploys to Vercel'],
              items: [
                ['인증: x-user-id 헤더', 'Auth: x-user-id header'],
                ['이미지 분류: MobileNetV3 ONNX 서버 추론', 'Image labels: MobileNetV3 ONNX on the server'],
                ['음성 → 텍스트 (Whisper)', 'Speech → text (Whisper)'],
                ['추천: 룰 기반 후보 → LLM 선택 → 서버 검증 → 실패 시 보조 모델로 재생성', 'Suggestions: rule-based candidates → LLM pick → server check → backup model on failure'],
                ['옷장 · 착장 · 통계 CRUD (Drizzle ORM)', 'Wardrobe · outfits · stats CRUD (Drizzle ORM)'],
              ],
              links: [
                ['openai', ['추천 · Whisper · Vision', 'suggestions · Whisper · Vision'], 'paid'],
                ['weather', ['날씨 조회', 'weather lookup'], 'sync'],
                ['db', ['SQL', 'SQL'], 'sync'],
                ['blob', ['파일 저장', 'file storage'], 'sync'],
              ],
            }),
          ],
        ),
        column(
          ['외부 서비스 · 데이터', 'External services · data'],
          [
            node('openai', 'external', ['OpenAI API', 'OpenAI API'], { items: [['추천 모델 · whisper-1 · Vision', 'Suggestion model · whisper-1 · Vision']] }),
            node('weather', 'external', ['OpenWeather', 'OpenWeather'], { items: [['위치 → 온도 · 비/눈 여부', 'Location → temperature · rain or snow']] }),
            node('db', 'data', ['PostgreSQL', 'PostgreSQL'], { items: [['Drizzle ORM · 로컬 Docker / 배포 Neon', 'Drizzle ORM · local Docker / Neon in deployment']] }),
            node('blob', 'data', ['이미지 저장소', 'Image storage'], { items: [['로컬 파일 → 배포 시 Vercel Blob', 'Local files → Vercel Blob in deployment']] }),
          ],
        ),
        column(
          ['Python ML (오프라인 학습)', 'Python ML (offline training)'],
          [
            node('train', 'local', ['전이학습 파이프라인', 'Transfer-learning pipeline'], {
              subtitle: ['PyTorch · Fashion Product Images (Small)', 'PyTorch · Fashion Product Images (Small)'],
              items: [
                ['약 35,000장 · 8:2 분할', 'About 35,000 images · 8:2 split'],
                ['ImageNet 백본 동결 + 분류 헤드 3개 학습 (카테고리 7 · 색상 11 · 스타일 5)', 'Frozen ImageNet backbone + 3 heads trained (7 categories · 11 colors · 5 styles)'],
                ['MobileNetV3-Small vs ResNet50 비교 → MobileNetV3-Small 채택', 'MobileNetV3-Small vs ResNet50 → MobileNetV3-Small chosen'],
              ],
              links: [
                ['api', ['fashion_classifier.onnx → 서버 추론 (현재 활성)', 'fashion_classifier.onnx → server inference (active)'], 'local'],
                ['app', ['fashion_classifier.tflite → dev build 기기 추론 (현재 비활성)', 'fashion_classifier.tflite → dev-build inference (inactive)'], 'local'],
              ],
            }),
          ],
        ),
      ],
      ['멀티모달 입력(사진 · 음성 · 위치 · 착용 기록) → Next.js 백엔드 → LLM 추천 + 자체 전이학습 분류기', 'Multimodal input (photo · voice · location · wear history) → Next.js backend → LLM suggestions + my own transfer-learned classifier'],
    ),
    body: pairs([
      [
        '전체 시스템을 세 부분으로 나눴습니다. 모바일 앱은 Expo SDK 기반의 React Native 앱으로 사용자 인터렉션과 결과 표시를 담당하고 백엔드의 경우 Next.js와 PostgreSQL로 데이터를 저장하고 OpenAI API와 학습된 머신러닝 모델을 호출하는 역할을 합니다.',
        'The system is split into three parts. The mobile app, a React Native app on the Expo SDK, handles user interaction and displays the results; the backend stores data with Next.js and PostgreSQL and calls the OpenAI API and the trained machine-learning model.',
      ],
    ]),
    decisions: pairs([
      [
        '서버 추론: Expo Go에서는 기기 안에서 모델을 불러올 수 없어 서버에서 ONNX로 추론했습니다. 비용이 드는 Vision 분석은 사용자가 직접 누를 때만 호출합니다.',
        'Server inference: Expo Go could not load the model on the phone, so inference runs on the server with ONNX. The paid Vision analysis is called only when the user taps for it.',
      ],
    ]),
  },
  cases: [
    {
      title: k('옷장에 없는 옷을 추천하는 LLM', 'An LLM that recommended clothes not in the wardrobe'),
      problem: step(
        [
          [
            'LLM 모델에 옷 추천을 맡기게 되는 경우 없는 옷의 ID를 만들어 내거나 상의만 고르는 등 만들 수 없는 조합을 만들어 내는 경우가 있었습니다.',
            'When an LLM was left to pick outfits, it sometimes invented clothing IDs that did not exist or produced impossible combinations, such as choosing only tops.',
          ],
        ],
        ['LLM의 할루시네이션 예방', 'Preventing LLM hallucination'],
      ),
      analysis: step(
        [
          [
            '세 가지 선택지가 있었습니다. 프롬프트 엔지니어링을 통한 응답 지시를 해 원하는 응답을 기대하거나 응답 형식 부분만 강제해 결과를 얻어내는 방법, 또는 후보를 규칙으로 먼저 만들고 그 안에서만 고를 수 있게 그리고 서버 검증까지 시키는 방식을 고려했습니다.',
            'There were three options: instruct the model through prompt engineering and hope for the right answer, force only the response format and take the result, or build candidates by rules first, let the model choose only among them, and verify on the server as well.',
          ],
        ],
        ['프롬프트 엔지니어링, 응답 형식 강제?', 'Prompt engineering, or forcing the response format?'],
      ),
      action: step(
        [
          [
            '먼저 사용자의 프롬프트, 위치, 날씨, 옷장 데이터를 입력으로 들어옵니다. 그럼 먼저 서버가 룰 기반으로 후보 조합을 만듭니다. 상의, 하의, 아우터, 신발 조합을 색상, 스타일, 날씨 적합성, 최근 착용으로 필터링해 좁히게 되고 이 후보 리스트들을 GPT에게 넘기되 OpenAI의 구조화된 출력을 통해 응답 포맷을 강제합니다. 이후 가장 중요한 검증 게이트를 통해 GPT가 반환한 Clothes_id가 실제 존재하는지 확인하고 성공 시 반환하고 실패 시 자동으로 mini 모델을 재호출해 재생성합니다.',
            "The user's prompt, location, weather and wardrobe data come in as input. The server first builds candidate combinations by rules, narrowing top, bottom, outerwear and shoe combinations by color, style, weather suitability and recent wear. The candidate list is handed to GPT with the response format enforced through OpenAI's structured outputs. Then the most important step, the verification gate, checks that every Clothes_id GPT returned actually exists; on success it is returned, and on failure the mini model is called again automatically to regenerate.",
          ],
        ],
        ['LLM의 할루시네이션 방지를 위해 걸어둔 규칙', 'The rules put in place against hallucination'],
      ),
      result: step([
        [
          '이 결과를 통해 형식이 틀리거나 옷장에 없는 옷을 담은 추천은 사용자에게 가지 않습니다. 실측한 23번의 테스트에서는 기본 모델 통과가 19번, 보조 모델 처리가 4건, 최종 실패는 0건이었습니다.',
          'As a result, a recommendation with the wrong format or with clothes not in the wardrobe never reaches the user. In 23 measured runs, the base model passed 19 times, the backup model handled 4, and there were 0 final failures.',
        ],
      ]),
    },
    {
      title: k('분류 모델 선택과 적용', 'Choosing and applying the classification model'),
      problem: step([
        [
          '옷 사진을 종류, 색상, 스타일로 분류할 모델이 필요했습니다. 크기와 속도가 서로 달랐고 파라미터 수 모델 크기 등 모바일에 최적화되어 돌아가야 하는 상황이었습니다. 모든 요청을 별도의 서버에서 처리하게 되면 서버의 비용은 올라가고 지연시간도 생깁니다. 때문에 모바일 최적화되고 속도가 빠른 효율성 있는 모델을 찾는 것이 중요했습니다.',
          'I needed a model to classify clothing photos by type, color and style. The candidates differed in size and speed, and in parameter count and model size it had to run well on mobile. Handling every request on a separate server raises server cost and adds latency, so finding an efficient, fast model optimized for mobile mattered.',
        ],
      ]),
      analysis: step([
        [
          '같은 조건으로 MobileNetV3-Small과 ResNet50을 비교했습니다. 백본을 고정해 전이학습 했고 3만 5천 장의 Fashion Product Images를 활용해 10 epoch 학습시켜 두 모델을 비교했습니다. 크기는 MobileNet이 6.0MB, ResNet은 90.2MB였고 CPU 추론은 ResNet이 더 빨랐습니다. 하지만 정확도의 경우 거의 동일했고 서버 리소스 사용 측면에서 MobileNet 모델이 더 좋은 성능을 냈습니다. 단순 추론 속도보다 모바일 최적화에 신경썼습니다.',
          'I compared MobileNetV3-small and ResNet50 under the same conditions: transfer learning with a frozen backbone, trained for 10 epochs on 35,000 Fashion Product Images. MobileNet was 6.0 MB and ResNet 90.2 MB, and ResNet was faster at CPU inference. Accuracy was nearly identical, though, and MobileNet used server resources better. I weighted mobile optimization over raw inference speed.',
        ],
      ]),
      action: step([
        [
          'MobileNetV3 모델을 선택했고 고정 백본 위에 카테고리 7가지, 색상 11가지, 스타일 5가지의 헤드를 얹어 모델 하나로 세 가지의 분류를 했고 현재는 서버에서 ONNX로 추론합니다.',
          'I chose MobileNetV3 and put heads for 7 categories, 11 colors and 5 styles on the frozen backbone, so one model does all three classifications; it currently runs on the server with ONNX.',
        ],
      ]),
      result: step([
        [
          '가중치는 ResNet 대비 15분의 1이었고 학습 시간은 절반 정도의 시간이었습니다. 하지만 추론 평균 시간이 조금 더 길었습니다. 그런데도 MobileNetV3 모델을 선택한 이유는 이후 온디바이스 추론으로의 확장성까지 고려한 선택이었습니다.',
          'The weights were one fifteenth of ResNet and training took about half the time, though average inference was a little slower. I still chose MobileNetV3 with later extension to on-device inference in mind.',
        ],
      ]),
    },
  ],
  results: pairs([
    ['사진 등록부터 분류, 후보 생성, LLM 추천, 서버 검증까지 전체 흐름을 구현했습니다.', 'Built the whole flow from adding a photo through labeling, candidate outfits, LLM suggestions and the server check.'],
    ['MobileNetV3-Small과 ResNet50을 같은 조건으로 비교해 약 15분의 1 크기(6.0MB 대 90.2MB)인 MobileNetV3-Small을 채택했습니다.', 'Compared MobileNetV3-Small and ResNet50 under the same settings and adopted MobileNetV3-Small at about one fifteenth of the size (6.0 MB against 90.2 MB).'],
    ['형식이 틀렸거나 옷장에 없는 옷을 담은 추천은 사용자에게 보내기 전에 차단합니다. 실측 23회에서 기본 모델이 19회 통과하고 보조 모델이 4회 처리했으며 최종 실패는 0건이었습니다.', 'Suggestions with the wrong format or with clothes not in the wardrobe are blocked before they reach the user. In 23 measured runs the base model passed 19 times, the backup model handled 4, and there were 0 final failures.'],
  ]),
  retro: pairs([
    ['LLM의 답을 그대로 믿지 않고 후보를 정해 주고 서버에서 다시 검증하는 구조가, 어떤 모델을 쓰느냐보다 결과의 신뢰도에 더 큰 차이를 냈습니다.', 'Giving the LLM a fixed set of candidates and re-checking its answer on the server made more difference to the reliability of the results than which model was used.'],
  ]),
  material: pairs([['코드는 비공개 저장소에 있습니다. 화면과 시연 영상, 측정 조건을 이 페이지에 둡니다.', 'The code is in a private repository. Screens, a demo video and the measurement conditions are on this page.']]),
}
