interface Tournament  {
  matchups: Matchup[]
  numberOfMatches: number
  startPhase: Phase
  title: string
}

interface Matchup {
  firstTeam: string
  firstTeamLogo: string
  matchDates: string[]
  secondTeam: string
  secondTeamLogo: string
}

enum Phase {
  RoundOf32,
  RoundOf16,
  QuarterFinals,
  SemiFinals,
  Final
}

interface ConcludeRound {
  matchups: Matchup[]
  numberOfMatches: number
}

interface UpdateFixture {
  firstTeam: string
  firstTeamScore: number
  secondTeam: string
  secondTeamScore: number
  matchDates: string[]
  
  // set winner on conclude round?
  winner?: string
}