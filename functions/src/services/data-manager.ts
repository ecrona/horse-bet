import 'isomorphic-fetch'
import { Data } from '../models/data'
import { Fixture } from '../models/fixture'
import { Winner } from '../models/winner'

const url =
  'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json'

class DataManager {
  constructor(private data: Data) {}

  public getTeam(id: number): string {
    const team = this.data.teams.find(team => team.id === id)

    return team ? team.name : ''
  }

  public getFixtures() {
    const knockout = this.data.groups
    let matches: Array<Fixture> = []
    const rounds = Object.keys(knockout).map(round => {
      const knockoutMatches = knockout[round].matches
      matches = matches.concat(
        knockoutMatches
          .filter(match => match.home_team === 17 || match.away_team === 17)
          .map(match => ({
            competitionId: 'SFVpat7sB1cCU3DClA3D',
            home: this.getTeam(match.home_team),
            away: this.getTeam(match.away_team),
            date: match.date,
            stage: round,
            winner: match.home_team === 17 ? Winner.Home : Winner.None
          }))
      )
    })

    return matches
  }
}

// Factory
export const createDataManager = async () => {
  const response = await fetch(url)
  const json = await response.json()
  return new DataManager(json)
}
