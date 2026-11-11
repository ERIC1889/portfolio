import { existsSync } from 'node:fs'
import { join } from 'node:path'

/** The portrait is read from disk at build time and only the submission copy uses it: the file is kept out of the repository, so the public page and public/resume.pdf never carry it */
export const RESUME_PHOTO = '/images/resume/photo.jpg'
export const resumePhoto = () => (existsSync(join(process.cwd(), 'public', RESUME_PHOTO)) ? RESUME_PHOTO : undefined)
