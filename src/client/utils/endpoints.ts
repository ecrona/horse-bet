import * as Route from 'route-parser'
import {
  EndpointsMeta,
  EndpointsMetaBase,
  RequestMethod
} from '@shared/endpoints'

export class EndpointsBase {
  public _requestMethod: RequestMethod = RequestMethod.Get
  public _url: string = ''
}

export const EndpointsDecorator = (
  meta: EndpointsMeta<EndpointsMetaBase>
): ClassDecorator => target => {
  for (const method in meta) {
    if (meta.hasOwnProperty(method)) {
      const methodMeta = meta[method]
      target.prototype[method] = target.prototype[method].bind({
        _requestMethod: methodMeta.requestMethod,
        _url: methodMeta.route
      })
    }
  }

  return target
}

export const getUrl = (
  url: string,
  params: { [key: string]: any } = {}
): string => {
  return new Route(url).reverse(params) || ''
}
