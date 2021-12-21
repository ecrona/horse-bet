import { Round } from '@shared/models/round'
import { MatchWinner } from '@shared/models/match-winner'

export interface ApiFixture {
  homeTeam: string
  awayTeam: string
  firstMatchStart: string
  secondMatchStart: string
  round: Round
  winner: MatchWinner
  homeScore: number
  awayScore: number
  penalties: boolean
  lastUpdated: string
}
