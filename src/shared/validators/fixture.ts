import { BetPlacement } from '@shared/models/bet-placement'

export const hasFixtureBegun = (fixture: { matchStart: string }) =>
  new Date() > new Date(fixture.matchStart)

export const isValidBetPlacement = (placement: BetPlacement) =>
  placement === BetPlacement.Away || placement === BetPlacement.Home
