import { BetPlacement } from './bet-placement'
import { Round } from './round'

export interface Fixture {
  awayTeam: string
  homeTeam: string
  round: Round
  matchStart: string
  betPlacement: BetPlacement
}
