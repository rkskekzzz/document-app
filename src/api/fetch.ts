const DOCUMENT_BASE_URL = 'https://document-api.channel.io'

function httpClient(baseUrl: string, instanceInit: RequestInit = {}) {
  return async function http<T>(path: string, init: RequestInit = {}) {
    const response = await fetch(`${baseUrl}${path}`, {
      ...instanceInit,
      ...init,
      cache: 'no-cache',
    })

    const contentType = response.headers.get('content-type')

    if (!response.ok) {
      if (contentType?.includes('application/json')) {
        const data = await response.json()

        if (data.errors && data.errors.length > 0) {
          throw new Error(data.errors[0].message)
        }
      }

      throw new Error(response.statusText)
    }

    let data
    if (contentType?.includes('application/json')) {
      data = await response.json()
    }

    return data as T
  }
}

export const document = httpClient(DOCUMENT_BASE_URL)
