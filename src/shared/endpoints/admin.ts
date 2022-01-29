import { AdminFixture } from '@shared/models/admin-fixture'
import { Endpoint, EndpointsMeta, RequestMethod } from '@shared/utils/endpoints'

interface AdminBaseEndpoints {
  get: any
  save: any
}

export interface AdminEndpointsData extends AdminBaseEndpoints {
  get: Endpoint<void, Array<AdminFixture>>
  save: Endpoint<Array<AdminFixture>, void>
}

export const adminEndpointsMeta: EndpointsMeta<AdminBaseEndpoints> = {
  get: { route: '/admin/get', requestMethod: RequestMethod.Get },
  save: { route: '/admin/save', requestMethod: RequestMethod.Post },
}
