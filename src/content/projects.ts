import { closetmate } from './cases/closetmate'
import { finz } from './cases/finz'
import { mediaPulse, others } from './cases/others'
import { pitches } from './cases/pitches'
import { skillpilot } from './cases/skillpilot'
import { edumatrix, innoview, labelLight } from './cases/supporting'
import type { Project } from './types'

const [wildfire, restplanner, aiHiringTextmining, jarvis, llmDolbom, patentry, dreamtrack, teamflow, unifit] = others

export const projects: Project[] = [
  finz,
  skillpilot,
  closetmate,
  pitches,
  mediaPulse,
  labelLight,
  wildfire,
  edumatrix,
  innoview,
  restplanner,
  aiHiringTextmining,
  jarvis,
  llmDolbom,
  patentry,
  dreamtrack,
  teamflow,
  unifit,
]
