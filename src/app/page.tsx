import { Contact } from '@/components/home/Contact'
import { Experience } from '@/components/home/Experience'
import { Flagship } from '@/components/home/Flagship'
import { Intro } from '@/components/home/Intro'
import { Showcase } from '@/components/home/Showcase'
import { Skills } from '@/components/home/Skills'
import { archive, getCaseNames, getRecordStats, getShowcase, getTopAwards, profile, projects } from '@/content'
import { HOME_IDS, SECTION_TITLES } from '@/content/ui'

export default function Home() {
  const [flagship] = getShowcase('flagship')
  return (
    <main id="main">
      <Intro profile={profile} />
      {flagship && <Flagship project={flagship} />}
      <Showcase id={HOME_IDS.main} title={SECTION_TITLES.main} projects={getShowcase('main')} hideHeading />
      <Skills rows={archive.skills} />
      <Showcase id={HOME_IDS.supporting} title={SECTION_TITLES.supporting} projects={getShowcase('supporting')} more total={projects.length} />
      <Experience archive={archive} topAwards={getTopAwards()} stats={getRecordStats().slice(0, 3)} caseNames={getCaseNames()} />
      <Contact profile={profile} />
    </main>
  )
}
