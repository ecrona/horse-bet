import { BetPlacement } from './bet-placement'
import { MatchWinner } from './match-winner'
import { Round } from './round'

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

export interface FixtureModel {
  awayTeam: Team
  homeTeam: Team
  firstMatchStart: string
  secondMatchStart: string
  matchWinner: MatchWinner
  score: string
}