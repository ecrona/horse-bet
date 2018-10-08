import { RequestMethod as NestRequestMethod } from '@nestjs/common'
import {
  PATH_METADATA,
  METHOD_METADATA,
  ROUTE_ARGS_METADATA
} from '@nestjs/common/constants'
import { RouteParamtypes } from '@nestjs/common/enums/route-paramtypes.enum'
import {
  EndpointsMeta,
  EndpointsMetaBase,
  RequestMethod
} from '@shared/utils/endpoints'

const RequestMethodMap = {
  [RequestMethod.Get]: NestRequestMethod.GET,
  [RequestMethod.Post]: NestRequestMethod.POST,
  [RequestMethod.Put]: NestRequestMethod.PUT,
  [RequestMethod.Patch]: NestRequestMethod.PATCH,
  [RequestMethod.Delete]: NestRequestMethod.DELETE
}

export const Endpoints = (
  meta: EndpointsMeta<EndpointsMetaBase>
): ClassDecorator => target => {
  for (const method in meta) {
    if (meta.hasOwnProperty(method)) {
      const methodMeta = meta[method]
      Reflect.defineMetadata(
        PATH_METADATA,
        methodMeta.route,
        target.prototype[method]
      )
      Reflect.defineMetadata(
        METHOD_METADATA,
        RequestMethodMap[methodMeta.requestMethod],
        target.prototype[method]
      )
      Reflect.defineMetadata(
        ROUTE_ARGS_METADATA,
        {
          [`${RouteParamtypes.QUERY}:0`]: {
            index: 0,
            data: 'test',
            pipes: []
          },
          [`${RouteParamtypes.RESPONSE}:1`]: {
            index: 1,
            data: undefined,
            pipes: []
          }
        },
        target,
        method
      )
    }
  }

  return target
}
