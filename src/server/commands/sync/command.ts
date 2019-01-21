import { Command, Positional } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { FixtureService } from 'services/fixture'
import { FootballData } from './api-adapters/football-data'

@Injectable()
export class SyncCommand {
  constructor(private readonly fixtureService: FixtureService) {}

  @Command({
    command: 'sync:fixtures <test>',
    describe: 'sync all the fixtures'
  })
  async fixtures(
    @Positional({
      name: 'test'
    })
    test: number
  ) {
    console.log('hej')
    const api = new FootballData()
    await api.getFixtures()
  }
}
