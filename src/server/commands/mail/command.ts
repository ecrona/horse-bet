import { Command, Positional } from 'nestjs-command'
import { Injectable, Inject } from '@nestjs/common'
import { FixtureService } from 'services/fixture'
import { UserService } from 'services/user'
import { differenceInHours } from 'date-fns'

@Injectable()
export class MailCommand {
  constructor(
    private readonly fixtureService: FixtureService,
    private readonly userService: UserService,
    @Inject('MailerProvider') private readonly mailerProvider
  ) {}

  @Command({
    command: 'mail:invite'
  })
  async invite() {
    const users = await this.userService.getUsers()

    for (const user of users) {
      await this.mailerProvider.sendMail({
        to: user.email,
        from: 'ecrona@gmail.com',
        subject: 'Välkommen till Hästbett!',
        text:
          'Du har blivit nogrann utvald till att delta i det välkända Hästbettet. Gå till https://hästbett.se för att logga in och delta!',
        html:
          'Du har blivit nogrann utvald till att delta i det välkända Hästbettet. Gå till <a href="https://hästbett.se">https://hästbett.se</a> för att logga in och delta!'
      })
    }
  }

  @Command({
    command: 'mail:notify'
  })
  async notify() {
    const now = new Date()
    const userBets = await this.userService.getUserBets()
    const closeFixtures = (await this.fixtureService.getActiveFixtures()).filter(
      fixture => differenceInHours(fixture.matchStart, now) <= 12
    )

    const usersWithoutBets = userBets.filter(
      userBet =>
        !closeFixtures.every(fixture =>
          Boolean(
            userBet.bets.find(
              bet =>
                bet.awayTeam === fixture.awayTeam &&
                bet.homeTeam === fixture.homeTeam
            )
          )
        )
    )

    for (const user of usersWithoutBets) {
      await this.mailerProvider.sendMail({
        to: user.email,
        from: 'ecrona@gmail.com',
        subject: 'Glöm inte Hästbett!',
        text:
          'Det är mindre än 12 timmar kvar till nästa match, gå till https://hästbett.se för att lägga dina bet!',
        html:
          'Det är mindre än 12 timmar kvar till nästa match, gå till <a href="https://hästbett.se">https://hästbett.se</a> för att lägga dina bet!'
      })
    }
  }
}
