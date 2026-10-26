import type { Project } from './types'

type Logger = { error(message: string): void; warn(message: string): void }

/** "{slug}#{holdKey}" for every section marked hold (falls back to the section id). */
export function findHolds(projects: Project[]): string[] {
  return projects.flatMap((project) =>
    (project.sections ?? []).filter((section) => section.hold).map((section) => `${project.slug}#${section.holdKey ?? section.id}`),
  )
}

export function shouldBlock(vercelEnv: string | undefined, holds: string[]): boolean {
  return vercelEnv === 'production' && holds.length > 0
}

/** Exit code for the prebuild step: 1 stops a production deploy while anything is still on hold. */
export function runReleaseCheck(projects: Project[], vercelEnv: string | undefined, log: Logger = console): number {
  const holds = findHolds(projects)
  if (shouldBlock(vercelEnv, holds)) {
    log.error(`공개 보류 항목이 남아 있어 운영 배포를 중단합니다: ${holds.join(', ')}`)
    return 1
  }
  if (holds.length > 0) log.warn(`공개 보류 항목(운영 배포 전에 결정 필요): ${holds.join(', ')}`)
  return 0
}
