import { RequestMethod as NestRequestMethod } from '@nestjs/common'
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants'
import {
  EndpointsMeta,
  EndpointsMetaBase,
  RequestMethod
} from '@shared/endpoints'

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
    }
  }

  return target
}
