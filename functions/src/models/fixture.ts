import { Winner } from './winner'

interface BaseFixture {
  competitionId: string
  home: string
  away: string
  date: string | Date
  stage: string
  winner: Winner
}

export interface Fixture extends BaseFixture {}

export interface IdentifableFixture extends BaseFixture {
  id: string
}
