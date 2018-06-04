import { User } from 'models/user'

export interface Endpoints {
  get: (endpoint: 'users') => Array<User>
}
