import { BetPlacement } from '@shared/models/bet-placement'
import { Team } from '@shared/models/fixture'
import { MatchWinner } from '@client/../shared/models/match-winner'

export interface DashboardFixture {
  awayTeam: Team
  homeTeam: Team
  betPlacement: BetPlacement
  matchWinner: MatchWinner
  placeable: boolean
  startDate: string
  startDay: string
  startTime: string
  score: string
}
