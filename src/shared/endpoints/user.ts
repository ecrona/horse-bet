import { EndpointsMeta, Response, RequestMethod } from '@shared/utils/endpoints'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

interface UserBaseEndpoints {
  login: any
}

export interface UserEndpointsData extends UserBaseEndpoints {
  login: (credentials: LoginRequest) => any
}

export const userEndpointsMeta: EndpointsMeta<UserBaseEndpoints> = {
  login: { route: '/user/login', requestMethod: RequestMethod.Get }
}
