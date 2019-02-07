import { BetPlacement } from '@shared/models/bet-placement'
import { Team } from '@shared/models/fixture'
import { MatchWinner } from '@client/../shared/models/match-winner'

export interface DashboardFixture {
  awayTeam: Team
  homeTeam: Team
  betPlacement: BetPlacement
  matchWinner: MatchWinner
  placeable: boolean
  firstMatchStart: string
  secondMatchStart: string
  score: string
}
