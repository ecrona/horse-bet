import { Fixture } from './fixture'

enum Placement {
  None,
  Away,
  Home
}

interface Bet {
  user: string
  placement: Placement
}

export interface MatchDetails {
  fixture: Fixture
  matchDay: number
  score: string
  bets: Array<Bet>
  awayBetPercent: number
  homeBetPercent: number
}
