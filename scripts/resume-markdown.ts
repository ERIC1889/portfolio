/**
 * Prints the résumé as Markdown. Usage: npx tsx --tsconfig tsconfig.json scripts/resume-markdown.ts [daangn]
 * The daangn copy reads RESUME_PHONE, RESUME_SERVICE_KO and RESUME_APPLY_DATE from the environment (.env.local), like the page does.
 */
import { SITE_URL, archive, profile, projects } from '../src/content'
import { RESUME_SITE, daangnVariant } from '../src/content/resume'
import { CASE_ORDER, projectTitle, selectPaperCounts } from '../src/content/select'
import type { L, PaarStep } from '../src/content/types'
import { PAPER_KINDS, RESUME_SECTIONS, UI, authorOrderLabel } from '../src/content/ui'

const ko = (l: L) => l.ko
const startOf = (range: string) => range.split('~')[0].trim()
const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
const newestFirst = <T,>(items: T[], key: (item: T) => string) => [...items].sort((a, b) => startOf(key(b)).localeCompare(startOf(key(a))))
const leadOf = (step?: PaarStep): L | undefined => step?.lead ?? step?.body[0]
const monthsSince = (period: string) => {
  const m = period.match(/(\d{4})\.(\d{2})/)
  if (!m) return 0
  const now = new Date()
  return (now.getFullYear() - Number(m[1])) * 12 + (now.getMonth() + 1 - Number(m[2])) + 1
}
const rangeOf = (period: string, open: string) => {
  const [from, to] = period.split('–')
  return `${from} ~ ${to ? to : open}`
}

const isDaangn = process.argv.includes('daangn')
const serviceKo = process.env.RESUME_SERVICE_KO
const variant = isDaangn
  ? daangnVariant(serviceKo ? { ko: serviceKo, en: process.env.RESUME_SERVICE_EN ?? serviceKo } : undefined, process.env.RESUME_PHONE || undefined, process.env.RESUME_APPLY_DATE || undefined)
  : RESUME_SITE

const order = CASE_ORDER as readonly string[]
const ordered = [...projects].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
const work = ordered.filter((p) => p.showcase === 'work')
const own = ordered.filter((p) => p.showcase === 'main')
const nameOf = (slug?: string) => projects.find((p) => p.slug === slug)?.name
const job = archive.experience[0]
const linked = work.find((p) => p.slug === job?.project)
const site = linked?.links?.find((l) => l.kind === 'site')?.href
const months = job ? monthsSince(job.period) : 0
const counts = selectPaperCounts(archive.papers)
const awards = newestFirst(variant.topAwards.flatMap((name) => archive.awards.filter((a) => a.name.ko === name)), (a) => a.date)
const papers = variant.topPapers.flatMap((title) => archive.papers.filter((p) => p.title === title))
const activities = newestFirst(
  variant.topActivities.flatMap((top) => archive.activities.filter((a) => a.name.ko === top.name).map((a) => ({ ...a, lines: top.lines }))),
  (a) => a.period,
)
const contacts = profile.contacts.filter((c) => c.kind === 'email' || c.kind === 'github')
const archiveUrl = `${SITE_URL}/archive`

const out: string[] = []
const line = (s = '') => out.push(s)
const h2 = (title: L, tag?: string) => {
  line()
  line(`## ${ko(title)}${tag ? `  _${tag}_` : ''}`)
  line()
}

if (variant.applying) line(`${ko(UI.resumeApplyField)} : ${ko(variant.applying.field)}${variant.applying.date ? ` · ${ko(UI.resumeApplyDate)} : ${variant.applying.date}` : ''}`)
line()
line(`# ${ko(profile.name)}  \`${ko(variant.role ?? profile.role)}\``)
line()
line(`> ${ko(variant.tagline)}`)
line()
line([...contacts.map((c) => `${ko(c.label)} ${c.value}`), ...(variant.phone ? [`${ko(UI.resumePhone)} ${variant.phone}`] : []), `${ko(UI.resumeSite)} ${host(SITE_URL)}`].join(' · '))
line()
line(`| ${ko(UI.resumeCardEducation)} | ${ko(UI.resumeCardCareer)} | ${ko(UI.resumeCardRecord)} | ${variant.service ? ko(UI.resumeCardService) : ko(UI.resumeCardActivities)} | ${ko(UI.resumeCardPortfolio)} |`)
line('|---|---|---|---|---|')
line(
  `| ${ko(archive.education.school)} · ${ko(UI.resumeUniversity)} ${ko(UI.resumeGraduating)} | ${job ? `${ko(job.org).replace(/\s*\(.*\)$/, '')} · ${ko(job.title)} · ${ko(UI.resumeTotal)} ${months}${ko(UI.resumeMonths)}` : ''} | ${archive.awards.length}${ko(UI.resumeItems)} · ${archive.papers.length}${ko(UI.resumePaperUnit)} (국제 논문 ${counts.international}편 · 1저자 ${counts.firstAuthor}편) | ${variant.service ? ko(variant.service) : `${archive.activities.length}${ko(UI.resumeItems)} · 프로젝트 ${projects.length}개`} | ${host(SITE_URL)} |`,
)
line()
line(`**${ko(RESUME_SECTIONS.skills)}** ${variant.skills.map((s) => `\`${s}\``).join(' ')}`)

h2(RESUME_SECTIONS.education, `${ko(UI.resumeUniversity)} ${ko(UI.resumeGraduating)}`)
line(`**${ko(archive.education.school)}** · ${ko(archive.education.major)} — ${rangeOf(archive.education.period, ko(UI.resumeGraduating))}`)
line(`- ${ko(UI.gpa)} | ${archive.education.gpa}`)
line(`- ${ko(UI.resumeTrack)} | ${ko(archive.education.note).replace(/^졸업 예정 · /, '')}`)

if (job) {
  h2(RESUME_SECTIONS.career, `${ko(UI.resumeTotal)} ${months}${ko(UI.resumeMonths)}`)
  line(`**${ko(job.org)}** · ${ko(job.title)} · ${ko(job.context)}${site ? ` · ${host(site)}` : ''} — ${rangeOf(job.period, ko(UI.resumeWorking))}`)
  line(`- ${ko(UI.resumeContent)} | ${ko(variant.work.content)}`)
  if (linked) line(`- ${ko(UI.resumeEnv)} | ${(linked.resumeStack ?? linked.stack).join(' · ')}`)
  line(`- ${ko(UI.resumeCareerResults)}`)
  for (const item of job.responsibilities) line(`  - ${ko(item)}`)
}

h2(RESUME_SECTIONS.projects, `${own.length}개`)
own.forEach((project, i) => {
  const repo = project.links?.find((l) => l.kind === 'code')?.href
  const mine = variant.projects[project.slug]
  const solve =
    mine?.solve ??
    (project.cases ?? []).slice(0, 2).flatMap((item) => {
      const problem = leadOf(item.problem)
      const action = leadOf(item.action)
      return problem && action ? [{ ko: `${item.title.ko} — ${problem.ko} → ${action.ko}`, en: '' }] : []
    })
  const results = mine?.results ?? (project.results ?? []).slice(0, 3)
  const tags = [project.team, project.role].flatMap((part) => (part ? [ko(part)] : []))
  if (i > 0) line()
  line(`### ${ko(projectTitle(project))}${project.status ? ` \`${ko(project.status)}\`` : ''} — ${project.period.replace('–', ' ~ ')}`)
  line(`${tags.join(' · ')}${repo ? ` · ${host(repo)}` : ''}`)
  line(`- ${ko(UI.resumeContent)} | ${ko(project.product ?? project.summary)}`)
  line(`- ${ko(UI.resumeEnv)} | ${(project.resumeStack ?? project.stack).join(' · ')}`)
  if (solve.length > 0) {
    line(`- ${ko(UI.resumeSolve)}`)
    for (const item of solve) {
      const [title, rest] = ko(item).split(' — ')
      line(`  - **${title}**${rest ? ` — ${rest}` : ''}`)
    }
  }
  if (results.length > 0) {
    line(`- ${ko(UI.resumeResult)}`)
    for (const item of results) line(`  - ${ko(item)}`)
  }
})

h2(RESUME_SECTIONS.awards, `${ko(UI.resumeTotal)} ${archive.awards.length}${ko(UI.resumeItems)}`)
for (const award of awards) {
  const name = nameOf(award.project)
  line(`- ${startOf(award.date)} · **${ko(award.name)}** · ${[name, ko(award.org)].filter(Boolean).join(' · ')}`)
}
if (archive.awards.length > awards.length) line(`- **외 ${archive.awards.length - awards.length}건** · ${host(archiveUrl)}`)

h2(RESUME_SECTIONS.experiences, `${ko(UI.resumeTotal)} ${archive.activities.length}${ko(UI.resumeItems)} · ${ko(UI.resumePaperList)} ${archive.papers.length}${ko(UI.resumePaperUnit)}`)
for (const activity of activities) {
  line(`- ${activity.period} · **${ko(activity.name)}** · ${ko(activity.org)}`)
  for (const l of activity.lines) line(`  - ${ko(l)}`)
}
if (archive.activities.length > activities.length) line(`- **외 ${archive.activities.length - activities.length}건** · ${host(archiveUrl)}`)
line()
line(`**${ko(UI.resumePaperList)}** _학술대회 ${counts.conference}편 (국제 ${counts.international} · 1저자 ${counts.firstAuthor}) · 공모전·교내 ${archive.papers.length - counts.conference}편_`)
line()
for (const paper of papers) {
  line(`- ${paper.year} · **${paper.title}** · ${[ko(paper.venue), paper.kind === 'international' ? ko(PAPER_KINDS[paper.kind]) : '', paper.authorOrder ? ko(authorOrderLabel(paper.authorOrder)) : ''].filter(Boolean).join(' · ')}`)
}
if (archive.papers.length > papers.length) line(`- **외 ${archive.papers.length - papers.length}편**`)

h2(RESUME_SECTIONS.intro)
for (const p of [variant.intro, ...variant.summary]) {
  line(ko(p).replace(/\n/g, ' '))
  line()
}
if (variant.motivation?.length) {
  line(`### ${ko(UI.resumeMotivation)}`)
  line()
  for (const p of variant.motivation) {
    line(ko(p))
    line()
  }
}

process.stdout.write(out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n')
