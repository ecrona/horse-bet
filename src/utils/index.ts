import { Round } from "@client/../shared/models/round"

export function getNumberOrdinal(number: number): string {
  return ['st', 'nd', 'rd'][((((number + 90) % 100) - 10) % 10) - 1] || 'th'
}

export const getRoundName = (round: Round) => ({
  [Round.Final]: 'Final',
  [Round.SemiFinals]: 'Semi Finals',
  [Round.QuarterFinals]: 'Quarter Finals',
  [Round.RoundOf16]: 'Round of 16',
})[round]

export const head = xs => xs.slice().shift()

export const tryCatch = (f, e, x) => {
  try {
    return f(x)
  } catch {
    return e()
  }
}

export const inputSetter = f => evt => f(evt.target.value)