import { Command, Positional } from 'nestjs-command'
import { Injectable, Inject } from '@nestjs/common'
import { UserService } from 'services/user'

@Injectable()
export class NotifyCommand {
  constructor(
    private readonly userService: UserService,
    @Inject('MailerProvider') private readonly mailerProvider
  ) {}

  @Command({
    command: 'notify:invite'
  })
  async notify() {
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
}
