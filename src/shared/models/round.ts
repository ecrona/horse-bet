import { Fixture } from './fixture'

interface Day {
  title: string
  fixtures: Array<Fixture>
}

interface MatchDay {
  days: Array<Day>
}

export interface Round {
  title: string
  matchDays: Array<MatchDay>
}
