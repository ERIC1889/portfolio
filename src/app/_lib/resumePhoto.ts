import { existsSync } from 'node:fs'
import { join } from 'node:path'

/** The portrait, committed with the site at the user's request; the guard keeps a checkout without the file rendering the placeholder */
export const RESUME_PHOTO = '/images/resume/photo.jpg'
export const resumePhoto = () => (existsSync(join(process.cwd(), 'public', RESUME_PHOTO)) ? RESUME_PHOTO : undefined)
