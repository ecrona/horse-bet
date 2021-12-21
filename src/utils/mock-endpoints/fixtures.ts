import { MatchWinner } from '@client/../shared/models/match-winner'
import { FixtureEndpointsData } from '@shared/endpoints/fixtures'
import { BetPlacement } from '@shared/models/bet-placement'
import { Round } from '@shared/models/round'
import { createMockPromise } from '../create-mock-promise'

export const fixturesMockEndpoints: FixtureEndpointsData = {
  get: createMockPromise([
    {
      round: Round.QuarterFinals,
      firstMatchStart: '2020-04-15 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: { name: 'Austria', logo: '/assets/logotypes/juventus.png' },
      awayTeam: { name: 'England', logo: '/assets/logotypes/man-city.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.Home,
      score: '',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'KC', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
    {
      round: Round.QuarterFinals,
      firstMatchStart: '2020-04-15 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: { name: 'Romania', logo: '/assets/logotypes/juventus.png' },
      awayTeam: { name: 'Bassarabia', logo: '/assets/logotypes/man-city.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.Away,
      score: '',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'KC', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
    {
      round: Round.RoundOf16,
      firstMatchStart: '2020-02-20 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: { name: 'Juventus', logo: '/assets/logotypes/juventus.png' },
      awayTeam: {
        name: 'Atlético Madrid',
        logo: '/assets/logotypes/atlético-madrid.png',
      },
      betPlacement: BetPlacement.Away,
      matchWinner: MatchWinner.Home,
      score: '3-0',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
    {
      round: Round.RoundOf16,
      firstMatchStart: '2020-02-20 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: { name: 'Man City', logo: '/assets/logotypes/man-city.png' },
      awayTeam: { name: 'Schalke', logo: '/assets/logotypes/schalke.png' },
      betPlacement: BetPlacement.Home,
      matchWinner: MatchWinner.Home,
      score: '7-2',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
    {
      round: Round.RoundOf16,
      firstMatchStart: '2020-02-19 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: {
        name: 'Bayern München',
        logo: '/assets/logotypes/bayern-münchen.png',
      },
      awayTeam: { name: 'Liverpool', logo: '/assets/logotypes/liverpool.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.None,
      score: '',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
    {
      round: Round.RoundOf16,
      firstMatchStart: '2020-02-19 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: { name: 'Barcelona', logo: '/assets/logotypes/barcelona.png' },
      awayTeam: { name: 'Lyon', logo: '/assets/logotypes/lyon.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.None,
      score: '',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
    {
      round: Round.RoundOf16,
      firstMatchStart: '2020-02-13 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: {
        name: 'Real Madrid',
        logo: '/assets/logotypes/real-madrid.png',
      },
      awayTeam: { name: 'Ajax', logo: '/assets/logotypes/ajax.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.None,
      score: '',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
    {
      round: Round.RoundOf16,
      firstMatchStart: '2020-02-13 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: { name: 'Dortmund', logo: '/assets/logotypes/dortmund.png' },
      awayTeam: { name: 'Tottenham', logo: '/assets/logotypes/tottenham.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.None,
      score: '',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
    {
      round: Round.RoundOf16,
      firstMatchStart: '2020-02-12 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: { name: 'PSG', logo: '/assets/logotypes/psg.png' },
      awayTeam: { name: 'Man Utd', logo: '/assets/logotypes/man-utd.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.None,
      score: '',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
    {
      round: Round.RoundOf16,
      firstMatchStart: '2020-02-01 21:00',
      secondMatchStart: '2020-04-04 04:04',
      homeTeam: { name: 'Porto', logo: '/assets/logotypes/porto.png' },
      awayTeam: { name: 'Roma', logo: '/assets/logotypes/roma.png' },
      betPlacement: BetPlacement.NotPlaced,
      matchWinner: MatchWinner.None,
      score: '',
      bets: [
        { name: 'Eddie', placement: BetPlacement.Home },
        { name: 'Viktor', placement: BetPlacement.Away },
      ],
    },
  ]),
  update: ({ awayTeam, homeTeam, firstMatchStart, secondMatchStart }: any) =>
    createMockPromise({
      firstMatchStart,
      secondMatchStart,
      awayTeam: {
        name: awayTeam,
        logo: `/assets/logotypes/${awayTeam
          .toLowerCase()
          .replace(/ /g, '-')}.png`,
      },
      homeTeam: {
        name: homeTeam,
        logo: `/assets/logotypes/${homeTeam
          .toLowerCase()
          .replace(/ /g, '-')}.png`,
      },
      round: Round.RoundOf16,
      matchWinner: MatchWinner.None,
      betPlacement: BetPlacement.NotPlaced,
      score: '0-0',
      bets: [],
    })(),
  placeBet: createMockPromise(undefined),
}
