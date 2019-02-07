import * as JWT from 'jwt-client'
import { clientEnv } from '@env/client'
import { RequestMethod } from '@shared/utils/endpoints'
import { actions } from 'store/common/actions'
import { store } from 'index'

const requestMethodMap = {
  [RequestMethod.Get]: 'GET',
  [RequestMethod.Post]: 'POST',
  [RequestMethod.Put]: 'PUT',
  [RequestMethod.Patch]: 'PATCH',
  [RequestMethod.Delete]: 'DELETE'
}

const host =
  process.env.NODE_ENV === 'production'
    ? ''
    : `http://${clientEnv.host}:${clientEnv.serverPort}`

export const xhr = async (
  requestMethod: RequestMethod,
  url: string,
  data?: any
) => {
  let hostUrl = `${host}${url}`

  const options: RequestInit = {
    method: requestMethodMap[requestMethod],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: JWT.get()
    }
  }
  if (requestMethod === RequestMethod.Get && data) {
    hostUrl = `${hostUrl}?data=${JSON.stringify(data)}`
  }
  if (requestMethod !== RequestMethod.Get) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(hostUrl, options)

  if (response.ok) {
    const text = await response.text()

    return text && JSON.parse(text)
  }

  if (response.status === 403) {
    store.dispatch(actions.unauthenticate())
  }

  throw new Error(response.status.toString())
}
