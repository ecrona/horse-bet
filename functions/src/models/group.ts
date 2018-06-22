import { Match } from './match'

export interface Group {
  name: string
  winner: string
  runnerup: null
  matches: Array<Match>
}
