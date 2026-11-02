import { projects } from '../src/content/projects'
import { runReleaseCheck } from '../src/content/release'

process.exit(runReleaseCheck(projects, process.env.VERCEL_ENV))
