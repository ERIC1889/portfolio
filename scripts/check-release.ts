// Runs as the first half of `npm run build`, before `next build`. Vercel sets VERCEL_ENV=production for production deploys.
import { projects } from '../src/content/projects'
import { runReleaseCheck } from '../src/content/release'

process.exit(runReleaseCheck(projects, process.env.VERCEL_ENV))
