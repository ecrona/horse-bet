import { Winner } from './winner'

export interface Fixture {
  home: string
  away: string
  date: string
  winner: Winner
}
