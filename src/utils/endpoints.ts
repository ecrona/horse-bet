import { Bet } from 'models/bet'
import { Fixture } from 'models/fixture'
import { User } from 'models/user'

export interface Endpoints {
  get(endpoint: 'users'): Array<User>
  get(endpoint: 'fixtures'): Array<Fixture>
  get(endpoint: 'bets', from: string, to: string): Array<Bet>
  get(endpoint: 'bet_placements', from: string, to: string): Array<Bet>

  add(endpoint: 'bets', data: Bet): void
  add(endpoint: 'bet_placements', data: Bet): void

  update(endpoint: 'bet_placements', data: Bet): void
}
