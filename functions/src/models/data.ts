import { Stadium } from './stadium'
import { TvChannel } from './tv-channel'
import { Team } from './team'
import { Group } from './group'
import { KnockoutRound } from './knockout-round'

export interface Data {
  stadiums: Array<Stadium>
  tvchannels: Array<TvChannel>
  teams: Array<Team>
  groups: {
    [key: string]: Group
  }
  knockout: {
    [key: string]: KnockoutRound
  }
}
