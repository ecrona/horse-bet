export interface EndpointsMetaBase {
  [key: string]: {
    route: string
    requestMethod: RequestMethod
  }
}

export type EndpointsMeta<T> = EndpointsMetaBase & T

export type Response<T> = T | Promise<T>

export enum RequestMethod {
  Get,
  Post,
  Put,
  Patch,
  Delete
}

interface Request {
  locals: {
    email: string
  }
}

export type Endpoint<TRequest, TResponse> = (payload?: TRequest, request?: Request) => Response<TResponse>
