import { Placement } from './placement'

export interface Bet {
  userId: string
  fixtureId: string
  placement: Placement
}
