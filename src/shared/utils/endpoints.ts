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
