import { Winner } from './winner'

export interface Fixture {
  id: string
  home: string
  away: string
  date: string
  stage: string
  winner: Winner
}
