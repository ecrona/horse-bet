export interface Match {
  name: number
  type: 'group' | 'qualified' | 'winner' | 'loser'
  home_team: number
  away_team: number
  home_result: string
  away_result: string
  date: string
  stadium: number
  channels: Array<number>
  finished: boolean
  matchday: number
}
