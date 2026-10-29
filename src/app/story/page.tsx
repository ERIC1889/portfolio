import { Story } from '@/components/pages/Story'
import { pageMetadata, getStoryYears } from '../_lib/pages'

export const metadata = pageMetadata({
  title: '4년 이야기',
  description: '허준영이 2023년부터 2026년까지 해마다 만든 것과 배운 것.',
  path: '/story',
})

export default function StoryPage() {
  return <Story years={getStoryYears()} />
}
