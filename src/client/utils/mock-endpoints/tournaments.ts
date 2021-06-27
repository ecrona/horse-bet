import { MatchWinner } from '@client/../shared/models/match-winner'
import { TournamentEndpointsData } from '@shared/endpoints/tournament'
import { BetPlacement } from '@shared/models/bet-placement'
import { createMockPromise } from '../create-mock-promise'

export const tournamentMockEndpoints: TournamentEndpointsData = {
  getAll: createMockPromise([
    {
      id: 1,
      name: 'Champions League 21/22',
      slug: 'champions-league-21-22',
    },
  ]),
  modify: ({ id, name }) =>
    createMockPromise({
      id,
      name,
      slug: name.toLowerCase().replace(/ \//g, '-'),
    })(),
  create: ({ name, firstRound, fixtures }) =>
    createMockPromise({
      id: Math.ceil(Math.random() * 100),
      name,
      slug: name,
      fixtures: fixtures.map((fixture) => ({
        ...fixture,
        awayTeam: {
          name: fixture.awayTeam,
          logo: `/assets/logotypes/${fixture.awayTeam
            .toLowerCase()
            .replace(/ /g, '-')}.png`,
        },
        homeTeam: {
          name: fixture.homeTeam,
          logo: `/assets/logotypes/${fixture.homeTeam
            .toLowerCase()
            .replace(/ /g, '-')}.png`,
        },
        round: firstRound,
        matchWinner: MatchWinner.None,
        betPlacement: BetPlacement.NotPlaced,
        score: '0-0',
        bets: [],
      })),
    })(),
  concludeRound: ({ id, fixtures }) =>
    createMockPromise({
      id,
      name: 'Champions League 20/21',
      slug: 'champions-league-20-21',
      fixtures: fixtures.map((fixture) => ({
        ...fixture,
        awayTeam: {
          name: fixture.awayTeam,
          logo: `/assets/logotypes/${fixture.awayTeam
            .toLowerCase()
            .replace(/ /g, '-')}.png`,
        },
        homeTeam: {
          name: fixture.homeTeam,
          logo: `/assets/logotypes/${fixture.homeTeam
            .toLowerCase()
            .replace(/ /g, '-')}.png`,
        },
        round: Math.log2(fixtures.length),
        matchWinner: MatchWinner.None,
        betPlacement: BetPlacement.NotPlaced,
        score: '0-0',
        bets: [],
      })),
    })(),
}
