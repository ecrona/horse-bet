import { Placement } from './placement'

export interface Bet {
  id: string
  userId: string
  fixtureId: string
  placement: Placement
}
