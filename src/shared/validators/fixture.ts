import { BetPlacement } from '@shared/models/bet-placement'

export const hasFixtureBegun = (fixture: { firstMatchStart: Date }) =>
  new Date() > fixture.firstMatchStart

export const isValidBetPlacement = (placement: BetPlacement) =>
  placement === BetPlacement.Away || placement === BetPlacement.Home
