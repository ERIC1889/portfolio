import { Contact } from '@/components/home/Contact'
import { Experience } from '@/components/home/Experience'
import { Flagship } from '@/components/home/Flagship'
import { Intro } from '@/components/home/Intro'
import { Showcase } from '@/components/home/Showcase'
import { Skills } from '@/components/home/Skills'
import { archive, getRecordStats, getShowcase, getTopAwards, profile } from '@/content'
import { HOME_IDS, SECTION_LEADS, SECTION_TITLES } from '@/content/ui'

export default function Home() {
  const [flagship] = getShowcase('flagship')
  return (
    <main id="main">
      <Intro profile={profile} />
      {flagship && <Flagship project={flagship} />}
      <Skills rows={archive.skills} />
      <Showcase id={HOME_IDS.supporting} title={SECTION_TITLES.supporting} projects={getShowcase('supporting')} />
      <Showcase id={HOME_IDS.other} title={SECTION_TITLES.other} lead={SECTION_LEADS.other} projects={getShowcase('other')} compact />
      <Experience archive={archive} topAwards={getTopAwards()} stats={getRecordStats().slice(0, 3)} />
      <Contact profile={profile} />
    </main>
  )
}
