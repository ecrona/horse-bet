import { Endpoints } from '@shared/endpoints'

export const mockEndpoints: Endpoints = {
  user: {
    login: credentials => new Promise(resolve => resolve())
  }
}
