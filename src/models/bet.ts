import { Winner } from './winner'

export interface Bet {
  user: string
  home: string
  away: string
  date: string
  winner: Winner.Home | Winner.Away
}
