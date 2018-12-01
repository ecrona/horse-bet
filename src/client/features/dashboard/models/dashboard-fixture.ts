import { BetPlacement } from '@shared/models/bet-placement'
import { Team } from '@shared/models/fixture'

export interface DashboardFixture {
  awayTeam: Team
  homeTeam: Team
  betPlacement: BetPlacement
  placeable: boolean
  startTime: string
}
