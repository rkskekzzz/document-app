import { Method } from 'axios'
import { general } from './fetch'

export type GetTokenAPI = {
  request: {
    secret: string
    channelId: string
  }

  response: {
    result: {
      accessToken: string
      refreshToken: string
      expiresIn: number
    }
  }
}

type GeneralImpl = {
  httpMethod: Method
  method: string
  params: Record<string, string>
}

function generalImpl({
  httpMethod,
  method,
  params,
}: GeneralImpl): Promise<GetTokenAPI['response']> {
  return general('', {
    method: httpMethod,
    body: JSON.stringify({
      method,
      params,
    }),
  })
}

export function getToken({
  secret,
  channelId,
}: GetTokenAPI['request']): Promise<GetTokenAPI['response']> {
  return generalImpl({
    httpMethod: 'PUT',
    method: 'issueToken',
    params: {
      secret,
      channelId,
    },
  })
}
