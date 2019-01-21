import * as JWT from 'jwt-client'
import 'isomorphic-fetch'
import { clientEnv } from '@env/client'
import { RequestMethod } from '@shared/utils/endpoints'

const requestMethodMap = {
  [RequestMethod.Get]: 'GET',
  [RequestMethod.Post]: 'POST',
  [RequestMethod.Put]: 'PUT',
  [RequestMethod.Patch]: 'PATCH',
  [RequestMethod.Delete]: 'DELETE'
}

export const xhr = async (
  requestMethod: RequestMethod,
  url: string,
  headers?: any,
  data?: any
) => {
  const options: RequestInit = {
    method: requestMethodMap[requestMethod],
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }
  if (requestMethod === RequestMethod.Get && data) {
    url = `${url}?data=${JSON.stringify(data)}`
  }
  if (requestMethod !== RequestMethod.Get) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)

  if (response.ok) {
    const text = await response.text()

    return text && JSON.parse(text)
  }

  if (response.status === 401) {
    // store.dispatch(actions.unauthenticate())
  }

  throw new Error(response.status.toString())
}
