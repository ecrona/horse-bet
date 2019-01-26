import { DashboardEndpointsData } from '@shared/endpoints/dashboard'
import { Round } from '@shared/models/round'
import { BetPlacement } from '@shared/models/bet-placement'
import { createMockPromise } from '../create-mock-promise'
import { MatchWinner } from '@client/../shared/models/match-winner'

export const dashboardMockEndpoints: DashboardEndpointsData = {
  get: createMockPromise([
    {
      round: 3,
      startDate: '2019-02-13',
      startDay: 'Wednesday',
      startTime: '21:00',
      homeTeam: {
        name: 'Real Madrid',
        logo: '/assets/logotypes/real-madrid.png'
      },
      awayTeam: { name: 'Ajax', logo: '/assets/logotypes/ajax.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    },
    {
      round: 3,
      startDate: '2019-02-20',
      startDay: 'Wednesday',
      startTime: '21:00',
      homeTeam: { name: 'Juventus', logo: '/assets/logotypes/juventus.png' },
      awayTeam: {
        name: 'Atlético Madrid',
        logo: '/assets/logotypes/atlético-madrid.png'
      },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    },
    {
      round: 3,
      startDate: '2019-02-19',
      startDay: 'Tuesday',
      startTime: '21:00',
      homeTeam: {
        name: 'Bayern München',
        logo: '/assets/logotypes/bayern-münchen.png'
      },
      awayTeam: { name: 'Liverpool', logo: '/assets/logotypes/liverpool.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    },
    {
      round: 3,
      startDate: '2019-02-19',
      startDay: 'Tuesday',
      startTime: '21:00',
      homeTeam: { name: 'Barcelona', logo: '/assets/logotypes/barcelona.png' },
      awayTeam: { name: 'Lyon', logo: '/assets/logotypes/lyon.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    },
    {
      round: 3,
      startDate: '2019-02-12',
      startDay: 'Tuesday',
      startTime: '21:00',
      homeTeam: { name: 'PSG', logo: '/assets/logotypes/psg.png' },
      awayTeam: { name: 'Man Utd', logo: '/assets/logotypes/man-utd.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    },
    {
      round: 3,
      startDate: '2019-02-12',
      startDay: 'Tuesday',
      startTime: '21:00',
      homeTeam: { name: 'Porto', logo: '/assets/logotypes/porto.png' },
      awayTeam: { name: 'Roma', logo: '/assets/logotypes/roma.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    },
    {
      round: 3,
      startDate: '2019-02-20',
      startDay: 'Wednesday',
      startTime: '21:00',
      homeTeam: { name: 'Man City', logo: '/assets/logotypes/man-city.png' },
      awayTeam: { name: 'Schalke', logo: '/assets/logotypes/schalke.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    },
    {
      round: 3,
      startDate: '2019-02-13',
      startDay: 'Wednesday',
      startTime: '21:00',
      homeTeam: { name: 'Dortmund', logo: '/assets/logotypes/dortmund.png' },
      awayTeam: { name: 'Tottenham', logo: '/assets/logotypes/tottenham.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.InProgress,
      score: ''
    }
  ]),
  placeBet: createMockPromise(undefined)
}
