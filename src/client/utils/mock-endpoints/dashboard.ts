import { DashboardEndpointsData } from '@shared/endpoints/dashboard'
import { Round } from '@shared/models/round'
import { BetPlacement } from '@shared/models/bet-placement'
import { createMockPromise } from '../create-mock-promise'
import { MatchWinner } from '@client/../shared/models/match-winner'

export const dashboardMockEndpoints: DashboardEndpointsData = {
  get: createMockPromise([
    {
      awayTeam: { name: 'Bayern Münich', logo: 'assets/logotypes/bayern.png' },
      homeTeam: { name: 'Juventus', logo: 'assets/logotypes/juve.png' },
      round: Round.RoundOf16,
      startDate: '2018-01-02',
      startDay: 'Monday',
      startTime: '18:00',
      betPlacement: BetPlacement.Away,
      matchWinner: MatchWinner.Home,
      score: '4-1'
    },
    {
      awayTeam: { name: 'Real Madrid', logo: 'assets/logotypes/real.png' },
      homeTeam: {
        name: 'Manchester City',
        logo: 'assets/logotypes/man-utd.png'
      },
      round: Round.RoundOf16,
      startDate: '2018-01-02',
      startDay: 'Monday',
      startTime: '21:00',
      betPlacement: BetPlacement.Home,
      matchWinner: MatchWinner.InProgress,
      score: '0-1'
    },
    {
      awayTeam: { name: 'PSG', logo: 'assets/logotypes/psg.png' },
      homeTeam: { name: 'Man U', logo: 'assets/logotypes/man-utd.png' },
      round: Round.RoundOf16,
      startDate: '2019-01-03',
      startDay: 'Wednesday',
      startTime: '21:00',
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    },
    {
      awayTeam: { name: 'Liverpool', logo: 'assets/logotypes/liverpool.png' },
      homeTeam: { name: 'Roma', logo: 'assets/logotypes/roma.png' },
      round: Round.RoundOf16,
      startDate: '2019-01-03',
      startDay: 'Wednesday',
      startTime: '21:00',
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    },
    {
      awayTeam: { name: 'Inter', logo: 'assets/logotypes/roma.png' },
      homeTeam: { name: 'Tottenham', logo: 'assets/logotypes/tottenham.png' },
      round: Round.RoundOf16,
      startDate: '2019-01-03',
      startDay: 'Wednesday',
      startTime: '18:00',
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    }
  ]),
  placeBet: createMockPromise(undefined)
}
