interface Team {
  name: string
  logo: string
}

export interface Fixture {
  awayTeam: Team
  homeTeam: Team
  matchStart: string
}
