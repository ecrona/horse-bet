import { ApiAdapter } from './api-adapter'
import { xhr } from '../xhr'
import { RequestMethod } from '@shared/utils/endpoints'

export class FootballData implements ApiAdapter {
  async getFixtures() {
    const response = await xhr(
      RequestMethod.Get,
      'https://api.football-data.org/v2/competitions/CL/matches',
      { 'X-Auth-Token': 'eeb28e8044a04e7089b7f2939403967e' }
    )

    const r = response.matches.filter(
      match => match.utcDate.substr(0, 4) === '2019'
    )
    console.log(response.matches[0], r)

    // fix all typings
    // retrieve existing features & last updated date
    // retrieve last updated to database, compare to competion last updated date
    // calculate new matches by comparing existing matches to fetched ones
    // add new matches
    // update existing matches with status and score
  }
}
