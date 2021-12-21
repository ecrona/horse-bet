import { Fixture } from './fixture'

export interface Tournament {
  id: number
  name: string
  slug: string
}

export interface TournamentDetail extends Tournament {
  fixtures: Array<Fixture>
}
