import {
  UserEndpointsData,
  userEndpointsMeta,
  LoginRequest,
  LoginResponse
} from '@shared/endpoints/user'
import { EndpointsDecorator, getUrl, EndpointsBase } from 'utils/endpoints'
import { xhr } from 'utils/xhr'

@EndpointsDecorator(userEndpointsMeta)
export class UserEndpoints extends EndpointsBase implements UserEndpointsData {
  public login(credentials: LoginRequest): Promise<LoginResponse> {
    return xhr(this._requestMethod, getUrl(this._url), credentials)
  }
}
