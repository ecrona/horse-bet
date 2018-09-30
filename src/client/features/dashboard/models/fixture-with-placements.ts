import { Fixture } from 'models/fixture'
import { Placement } from 'models/placement'

export interface FixtureWithPlacements extends Fixture {
  placements: Array<Placement>
}
