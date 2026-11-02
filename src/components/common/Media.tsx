'use client'

import Image from 'next/image'
import { useLang } from '@/components/providers/LanguageProvider'
import type { Media } from '@/content/types'
import { UI } from '@/content/ui'

const isPortrait = (media: Media) => media.height > media.width

export function MediaFigure({ media, sizes, priority = false }: { media: Media; sizes: string; priority?: boolean }) {
  const { t } = useLang()
  const frame =
    media.shape === 'phone' || media.shape === 'device'
      ? media.shape
      : media.kind === 'mockup'
        ? 'mockup'
        : media.kind === 'video' || isPortrait(media)
          ? 'plain'
          : 'browser'
  return (
    <figure className={`media media-${frame}${isPortrait(media) ? ' is-portrait' : ''}`}>
      <div className="media-frame">
        {media.kind === 'video' ? (
          <video controls preload="none" playsInline poster={media.poster} width={media.width} height={media.height} aria-label={t(media.alt)}>
            <source src={media.src} type="video/mp4" />
            {t(UI.videoFallback)}
          </video>
        ) : (
          <a href={media.src} target="_blank" rel="noopener noreferrer" className="media-open">
            <Image src={media.src} alt={t(media.alt)} width={media.width} height={media.height} sizes={sizes} priority={priority} />
            <span className="sr-only">{t(UI.openOriginal)}</span>
          </a>
        )}
        {media.kind === 'mockup' && <span className="badge badge-warn media-badge">{t(UI.mockupBadge)}</span>}
      </div>
      <figcaption>{t(media.caption)}</figcaption>
    </figure>
  )
}

export function Gallery({ media }: { media: Media[] }) {
  if (media.length === 0) return null
  const [first, ...rest] = media
  const lead = isPortrait(first) ? undefined : first
  const others = lead ? rest : media
  const wide = others.filter((m) => !isPortrait(m))
  const tall = others.filter(isPortrait)
  return (
    <div className="gallery">
      {lead && <MediaFigure media={lead} sizes="(max-width: 840px) 100vw, 760px" />}
      {wide.length > 0 && (
        <div className="gallery-wide">
          {wide.map((m) => (
            <MediaFigure key={m.src} media={m} sizes="(max-width: 640px) 100vw, 380px" />
          ))}
        </div>
      )}
      {tall.length > 0 && (
        <div className="gallery-tall">
          {tall.map((m) => (
            <MediaFigure key={m.src} media={m} sizes="(max-width: 640px) 50vw, 250px" />
          ))}
        </div>
      )}
    </div>
  )
}
