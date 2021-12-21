import { UserEndpointsData } from '@shared/endpoints/user'
import { createMockPromise } from '../create-mock-promise'

export const userMockEndpoints: UserEndpointsData = {
  login: () => new Promise((resolve) => resolve()),
  me: createMockPromise({ admin: true }),
}
