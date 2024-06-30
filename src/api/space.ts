import qs from 'qs'
import { document } from './fetch'
import { Hit } from '../model/search'
import { Article } from '../model/article'
import { Category } from '../model/category'

type SpaceIdentifier = {
  systemDomain: string
  languageCode: string
}

type SearchQuery = {
  query: {
    keyword: string
    limit?: number
  }
}

export type Search = {
  maxScore: number
  hits: Hit[]
  articles: Article[]
  categories: Category[]
}

export async function searchDocument({
  query,
  ...identifier
}: SpaceIdentifier & SearchQuery) {
  const response = await document<Search>(
    `/website/v1/${identifier.languageCode}/spaces/$${
      identifier.systemDomain
    }/search?${qs.stringify(query)}`
  )

  return response
}
