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
        text: `
          Du har blivit nogrann utvald till att delta i det välkända Hästbettet.
          Gå till https://hästbett.se för att logga in och delta!
          \n\n
          Alla deltagare som vill vara med måste swisha 100:- till 0762027637, där vinnarna kommer få potten.
        `,
        html: `
          Du har blivit nogrann utvald till att delta i det välkända Hästbettet.
          Gå till <a href="https://hästbett.se">https://hästbett.se</a> för att logga in och delta!
          <br /> <br />
          Alla deltagare som vill vara med måste swisha 100:- till <b>0762027637</b>, där vinnarna kommer få potten.
        `
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
      fixture => differenceInHours(fixture.firstMatchStart, now) <= 12
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

    console.log(closeFixtures, usersWithoutBets)

    for (const user of usersWithoutBets) {
      /*await this.mailerProvider.sendMail({
        to: user.email,
        from: 'ecrona@gmail.com',
        subject: 'Glöm inte Hästbett!',
        text: `
          Du har väl inte glömt att betta på kvällens matcher?!
          Gå till https://hästbett.se för att lägga dina bet!
        `,
        html: `
          Du har väl inte glömt att betta på kvällens matcher?!
          Gå till <a href="https://hästbett.se">https://hästbett.se</a> för att lägga dina bet!
        `
      })*/
    }
  }
}
