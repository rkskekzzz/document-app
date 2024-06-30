export interface PaginationQuery<T = string> {
  readonly since?: Readonly<T> | null
  readonly limit?: number
}


export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
  BOTH = 'both',
}

