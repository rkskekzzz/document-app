import { Search } from '../api/space'
import { Article } from './article'
import { Category } from './category'

export type CategoryHit = {
  score: number
  source: {
    docType: 'category'
    id: string
    spaceId: string
    createdAt: number
    language: string
    categoryName: string
    categoryDescription: string
  }
  highlight: {
    categoryDescription?: string[]
    categoryName?: string[]
  }
}

export type DocumentHit = {
  score: number
  source: {
    docType: 'document'
    articleId: string
    createdAt: number
    documentBody: string
    documentSubtitle: string
    documentTitle: string
    id: string
    language: string
    spaceId: string
  }
  highlight: {
    documentTitle?: string[]
    documentBody?: string[]
    documentSubtitle?: string[]
  }
}

export type Hit = CategoryHit | DocumentHit

export type CategoryResult = {
  hit: CategoryHit
  category: Category
}

export type ArticleResult = {
  hit: DocumentHit
  article: Article
}

export type SearchResultType = CategoryResult | ArticleResult
export function isCategory(hit: Hit): hit is CategoryHit {
  return hit.source.docType === 'category'
}

export function getCategoryHitTitle(hit: CategoryHit): string {
  return hit.highlight.categoryName?.join() || hit.source.categoryName
}

export function getDocumentHitTitle(hit: DocumentHit): string {
  return hit.highlight.documentTitle?.join() || hit.source.documentTitle
}

export function getCategoryHitDescription(hit: CategoryHit): string {
  return (
    hit.highlight.categoryDescription?.join() || hit.source.categoryDescription
  )
}

export function getDocumentHitDescription(hit: DocumentHit): string {
  return (
    hit.highlight.documentSubtitle?.join() ||
    hit.highlight.documentBody?.join() ||
    hit.source.documentSubtitle ||
    hit.source.documentBody
  )
}

export function getTitle(hit: Hit): string {
  return isCategory(hit) ? getCategoryHitTitle(hit) : getDocumentHitTitle(hit)
}

export function getDescription(hit: Hit): string {
  return isCategory(hit)
    ? getCategoryHitDescription(hit)
    : getDocumentHitDescription(hit)
}

export function deserialize(search: Search): SearchResultType[] {
  return search.hits.map((hit) => {
    if (isCategory(hit)) {
      const category = search.categories.find(
        (_category) => _category.id === hit.source.id
      ) as Category

      return {
        hit,
        category,
      }
    }
    const article = search.articles.find(
      (_article) => _article.id === hit.source.articleId
    ) as Article

    return {
      hit,
      article,
    }
  })
}
