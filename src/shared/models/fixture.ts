import { BetPlacement } from './bet-placement'
import { Round } from './round'

interface Team {
  name: string
  logo: string
}

export interface Fixture {
  awayTeam: Team
  homeTeam: Team
  round: Round
  matchStart: string
  betPlacement: BetPlacement
}
