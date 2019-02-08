import 'isomorphic-fetch'
import { Data } from '../models/data'
import { Fixture } from '../models/fixture'
import { Winner } from '../models/winner'

class DataManager {
  constructor(private data: Data) {}

  public getTeam(id: number): string {
    const team = this.data.teams.find(team => team.id === id)

    return team ? team.name : id.toString()
  }

  public getFixtures() {
    const knockout = this.data.knockout
    let matches: Array<Fixture> = []
    const rounds = Object.keys(knockout).map(round => {
      const knockoutMatches = knockout[round].matches
      matches = matches.concat(
        knockoutMatches
          .filter(
            match =>
              typeof match.home_team === 'number' &&
              match.home_team <= 32 &&
              typeof match.away_team === 'number' &&
              match.away_team <= 32
          )
          .map(match => ({
            competitionId: 'SFVpat7sB1cCU3DClA3D',
            home: this.getTeam(match.home_team),
            away: this.getTeam(match.away_team),
            date: new Date(match.date),
            stage: knockout[round].name,
            winner: match.finished
              ? match.winner === match.home_team
                ? Winner.Home
                : Winner.Away
              : Winner.None
          }))
      )
    })

    return matches
  }
}

// Factory
export const createDataManager = (data: Data) => {
  return new DataManager(data)
}
