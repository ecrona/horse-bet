import { ApiFixture } from './api-fixture'

export interface ApiAdapter {
  getFixtures(): Promise<Array<ApiFixture>>
}
