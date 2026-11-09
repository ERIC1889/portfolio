import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Rich } from './Rich'

describe('Rich', () => {
  it('turns **bold** into strong and `code` into code, leaving the rest as text', () => {
    const { container } = render(
      <p>
        <Rich text="본문에 `SERVICE ERROR` 같은 문구가 **반환**됐습니다." />
      </p>,
    )
    expect(container.querySelector('strong')).toHaveTextContent('반환')
    expect(container.querySelector('code')).toHaveTextContent('SERVICE ERROR')
    expect(container.querySelector('p')).toHaveTextContent('본문에 SERVICE ERROR 같은 문구가 반환됐습니다.')
  })

  it('leaves plain text untouched, including stray asterisks and backticks', () => {
    const { container } = render(
      <p>
        <Rich text="a * b ` c" />
      </p>,
    )
    expect(container.querySelector('strong')).toBeNull()
    expect(container.querySelector('code')).toBeNull()
    expect(container.querySelector('p')).toHaveTextContent('a * b ` c')
  })
})
