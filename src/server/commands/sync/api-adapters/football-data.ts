import { ApiAdapter } from './api-adapter'
import { xhr } from '../xhr'
import { RequestMethod } from '@shared/utils/endpoints'
import { Round } from '@shared/models/round'
import { MatchWinner } from '@shared/models/match-winner'
import { ApiFixture } from './api-fixture'

interface Season {
  id: number
  startDate: string
  endDate: string
  currentMatchDay: number
}

type Status =
  | 'SCHEDULED'
  | 'POSTPONED'
  | 'CANCELED'
  | 'SUSPENDED'
  | 'IN_PLAY'
  | 'PAUSED'
  | 'AWARDED'
  | 'FINISHED'
type Stage =
  | '1ST_QUALIFYING_ROUND'
  | '2ND_QUALIFYING_ROUND'
  | '3RD_QUALIFYING_ROUND'
  | 'PLAY_OFF_ROUND'
  | 'GROUP_STAGE'
  | 'ROUND_OF_16'
  | 'QUARTER_FINALS'
  | 'SEMI_FINALS'
  | 'FINAL'
type Winner = 'DRAW' | 'HOME_TEAM' | 'AWAY_TEAM'
type Duration = 'REGULAR' | 'EXTRA_TIME' | 'PENALTY_SHOOTOUT'

interface ScoreSet {
  homeTeam?: number
  awayTeam?: number
}

interface Score {
  winner: Winner
  duration: Duration
  fullTime: ScoreSet
  halfTime: ScoreSet
  extraTime: ScoreSet
  penalties: ScoreSet
}

interface Team {
  id: number
  name: string
}

interface Referee {
  id: number
  name: string
  nationality: void
}

interface Match {
  id: number
  season: Season
  utcDate: string
  status: Status
  matchday: void
  stage: Stage
  group: string
  lastUpdated: string
  score: Score
  homeTeam: Team
  awayTeam: Team
  referees: Array<Referee>
}

interface ApiResponse {
  matches: Array<Match>
}

export class FootballData implements ApiAdapter {
  private getRound(stage: Stage) {
    switch (stage) {
      case 'FINAL':
        return Round.Final
      case 'SEMI_FINALS':
        return Round.SemiFinals
      case 'QUARTER_FINALS':
        return Round.QuarterFinals
      case 'ROUND_OF_16':
        return Round.RoundOf16
    }
  }

  private getWinner(winner: Winner) {
    switch (winner) {
      case 'HOME_TEAM':
        return MatchWinner.Home
      case 'AWAY_TEAM':
        return MatchWinner.Away
      default:
        return MatchWinner.InProgress
    }
  }

  async getFixtures() {
    const response = await xhr<ApiResponse>(
      RequestMethod.Get,
      'https://api.football-data.org/v2/competitions/CL/matches',
      { 'X-Auth-Token': 'eeb28e8044a04e7089b7f2939403967e' }
    )

    return response.matches
      .filter(match => match.utcDate.substr(0, 4) === '2019')
      .map(match => ({
        homeTeam: match.homeTeam.name,
        awayTeam: match.awayTeam.name,
        matchStart: match.utcDate,
        round: this.getRound(match.stage),
        winner: this.getWinner(match.score.winner),
        homeScore:
          match.score.extraTime.homeTeam || match.score.fullTime.homeTeam || 0,
        awayScore:
          match.score.extraTime.awayTeam || match.score.fullTime.awayTeam || 0,
        penalties: match.score.duration === 'PENALTY_SHOOTOUT',
        lastUpdated: match.lastUpdated
      }))
      .reduce(
        (matches, match) => {
          const previousMatch = matches.find(
            _match =>
              _match.awayTeam === match.homeTeam &&
              _match.homeTeam === match.awayTeam
          )

          if (previousMatch) {
            return matches.map(_match => {
              if (
                _match.awayTeam === match.homeTeam &&
                _match.homeTeam === match.awayTeam
              ) {
                return { ...match, matchStart: _match.matchStart }
              }

              return _match
            })
          }

          return [...matches, match]
        },
        [] as Array<ApiFixture>
      )
  }
}
