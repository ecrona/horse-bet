import { MatchWinner } from './match-winner'
import { Round } from './round'

export interface AdminFixture {
  awayTeam: string
  homeTeam: string
  round: Round
  firstMatchStart: string
  secondMatchStart: string
  matchWinner: MatchWinner
  score: string
}
