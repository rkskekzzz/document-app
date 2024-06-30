export type Category = {
  id: string
  spaceId: string
  createdAt: number
  updatedAt: number
  slug: string
  name?: string
  description?: string
  coverImageUrl?: string
  opengraphMetaImageUrl?: string
  opengraphMetaTitle?: string
  opengraphMetaDescription?: string
  website: {
    url: string
  }
}

export function getCoverImageUrl(category: Category) {
  return category.coverImageUrl || category.opengraphMetaImageUrl
}

export function getOpenGraphMetaTitle(category: Category) {
  return category.opengraphMetaTitle || category.name
}

export function getOpenGraphMetaDescription(category: Category) {
  return category.opengraphMetaDescription || category.description
}

export function getOpenGraphMetaImageUrl(category: Category) {
  return category.opengraphMetaImageUrl || category.coverImageUrl
}

export function getWebsiteUrl(category: Category) {
  return category.website.url
}
