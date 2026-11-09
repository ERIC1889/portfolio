import type { ReactNode } from 'react'

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`)/g

export function richNodes(text: string): ReactNode[] {
  return text
    .split(TOKEN)
    .filter((part) => part !== '')
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="mono inline-code">
            {part.slice(1, -1)}
          </code>
        )
      }
      return part
    })
}

export function Rich({ text }: { text: string }) {
  return <>{richNodes(text)}</>
}
