import { BetPlacement } from './bet-placement'
import { Round } from './round'
import { MatchWinner } from './match-winner'

interface Bet {
  name: string
  placement: BetPlacement
}

export interface Team {
  name: string
  logo: string
}

export interface Fixture {
  awayTeam: Team
  homeTeam: Team
  round: Round
  firstMatchStart: string
  secondMatchStart: string
  betPlacement: BetPlacement
  matchWinner: MatchWinner
  score: string
  bets: Array<Bet>
}
