import { MailerService } from '@nest-modules/mailer'
import { Injectable } from '@nestjs/common'
import { differenceInHours } from 'date-fns'
import { Command } from 'nestjs-command'
import { FixtureService } from 'services/fixture'
import { UserService } from 'services/user'

@Injectable()
export class MailCommand {
  constructor(
    private readonly fixtureService: FixtureService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService
  ) {}

  @Command({
    command: 'mail:invite'
  })
  async invite() {
    const users = await this.userService.getUsers()

    for (const user of users) {
      await this.mailerService.sendMail({
        to: user.email,
        from: 'ecrona@gmail.com',
        subject: 'Välkommen till Hästbett!',
        text: `
          Du har blivit nogrann utvald till att delta i det välkända Hästbettet.
          Gå till https://hästbett.se för att logga in och delta!
          \n\n
          Alla deltagare som vill vara med måste swisha 100:- till 0762027637, där de främsta hästbettarna kommer att dela på potten.
        `,
        html: `
          Du har blivit nogrann utvald till att delta i det välkända Hästbettet.
          Gå till <a href="https://hästbett.se">https://hästbett.se</a> för att logga in och delta!
          <br /> <br />
          Alla deltagare som vill vara med måste swisha 100:- till <b>0762027637</b>, där de främsta hästbettarna kommer att dela på potten.
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
    const closeFixtures = (
      await this.fixtureService.getActiveFixtures()
    ).filter(fixture => differenceInHours(fixture.firstMatchStart, now) <= 12)

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
      await this.mailerService.sendMail({
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
      })
    }
  }
}
