import { endpointsMeta } from '@shared/endpoints'
import { xhr } from 'utils/xhr'

export const endpoints = {}

for (const endpointCollection in endpointsMeta) {
  endpoints[endpointCollection] = {}

  for (const endpoint in endpointsMeta[endpointCollection]) {
    const endpointMeta = endpointsMeta[endpointCollection][endpoint]

    endpoints[endpointCollection][endpoint] = data =>
      xhr(endpointMeta.requestMethod, endpointMeta.route, data)
  }
}

console.log(endpoints)
