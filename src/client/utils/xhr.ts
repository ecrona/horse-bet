import * as JWT from 'jwt-client'
import { clientEnv } from '@env/client'
import { RequestMethod } from '@shared/endpoints'
// import { actions } from 'store/common/actions'
// import { store } from 'index'

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
  const response = await fetch(`${host}${url}`, {
    method: requestMethodMap[requestMethod],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: JWT.get()
    },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    const text = await response.text()

    return text && JSON.parse(text)
  }

  if (response.status === 401) {
    // store.dispatch(actions.unauthenticate())
  }

  throw new Error(response.status.toString())
}
