import { DashboardEndpointsData } from '@shared/endpoints/dashboard'
import { Round } from '@shared/models/round'
import { BetPlacement } from '@shared/models/bet-placement'
import { createMockPromise } from '../create-mock-promise'

export const dashboardMockEndpoints: DashboardEndpointsData = {
  get: createMockPromise([
    {
      awayTeam: { name: 'Bayern Münich', logo: '/' },
      homeTeam: { name: 'Juventus', logo: '/' },
      round: Round.RoundOf16,
      startDate: '2018-01-02',
      startDay: 'Monday',
      startTime: '18:00',
      betPlacement: BetPlacement.Away
    },
    {
      awayTeam: { name: 'Valencia', logo: '/' },
      homeTeam: { name: 'Manchester City', logo: '/' },
      round: Round.RoundOf16,
      startDate: '2018-01-02',
      startDay: 'Monday',
      startTime: '21:00',
      betPlacement: BetPlacement.Home
    },
    {
      awayTeam: { name: 'PSG', logo: '/' },
      homeTeam: { name: 'Napoli', logo: '/' },
      round: Round.RoundOf16,
      startDate: '2019-01-03',
      startDay: 'Wednesday',
      startTime: '21:00',
      betPlacement: BetPlacement.NotPlaced
    }
  ]),
  placeBet: createMockPromise(undefined)
}
