import { Placement } from './placement'

export interface Bet {
  user: string
  home: string
  away: string
  date: string
  placement: Placement
}
