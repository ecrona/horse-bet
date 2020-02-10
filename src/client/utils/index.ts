export function getNumberOrdinal(number: number): string {
  return ['st', 'nd', 'rd'][((((number + 90) % 100) - 10) % 10) - 1] || 'th'
}
