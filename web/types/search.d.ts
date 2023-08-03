declare interface SearchData {
  keyword?: string
  tags?: BaseItemInput[]
  authors?: BaseItemInput[]
  sortBy?: SortBy
}

declare enum SortBy {
  alpha_asc,
  alpha_desc,
  author_asc,
  author_desc,
  date_added_asc,
  dat_added_desc,
  random,
}
