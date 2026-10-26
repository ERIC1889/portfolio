import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Personal details the owner removed from the site. Written as escapes so this file
// does not publish them; the scan covers everything that goes to GitHub.
const REMOVED = ['\uC7AC\uC218', '\uC548\uC0C1\uD604']

const ROOT = join(__dirname, '..')

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? files(path) : [path]
  })
}

describe('published source', () => {
  it('carries none of the personal details the owner removed', () => {
    const sources = [...files(join(ROOT, 'src')), ...files(join(ROOT, 'scripts')), join(ROOT, 'README.md')]
    const hits = sources.flatMap((path) => {
      const text = readFileSync(path, 'utf8')
      return REMOVED.filter((word) => text.includes(word)).map(() => path.slice(ROOT.length + 1))
    })
    expect(hits).toEqual([])
  })
})
