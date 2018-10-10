import { UserEndpointsData, userEndpointsMeta } from '@shared/endpoints/user'

export interface Endpoints {
  user: UserEndpointsData
}

export const endpointsMeta = {
  user: userEndpointsMeta
}
