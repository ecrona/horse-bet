import { ClientEnv } from '@env/interfaces/client'
import { baseEnv } from './base'

export const clientEnv: ClientEnv = {
  ...baseEnv,
  clientPort: 8080
}
