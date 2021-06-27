import { Endpoint, EndpointsMeta, RequestMethod } from '@shared/utils/endpoints'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

interface UserBaseEndpoints {
  login: any
  me: any
}

export interface UserEndpointsData extends UserBaseEndpoints {
  login: Endpoint<LoginRequest, void>
  me: Endpoint<void, { admin: boolean }>
}

export const userEndpointsMeta: EndpointsMeta<UserBaseEndpoints> = {
  login: { route: '/user/login', requestMethod: RequestMethod.Get },
  me: { route: '/user/me', requestMethod: RequestMethod.Get },
}
