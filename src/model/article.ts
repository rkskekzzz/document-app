// import type { Block } from '@channel-io/blocks'

export type Article = {
  id: string
  spaceId: string
  createdAt: number
  updatedAt: number
  publishedRevisionId?: string
  publishedAt?: number
  slug: string
  topicIds: string[]
  website?: {
    url: string
  }
  authorId?: string
  coverImageUrl?: string
  opengraphMetaImageUrl?: string
  opengraphMetaTitle?: string
  opengraphMetaDescription?: string
  title?: string
  summary?: string
  subtitle?: string
  body?: any[]
}

export function getCoverImageUrl(article: Article): string | undefined {
  return article.coverImageUrl || article.opengraphMetaImageUrl
}

export function getWebsiteUrl(article: Article) {
  return article.website?.url
}
