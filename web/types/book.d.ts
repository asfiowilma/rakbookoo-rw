interface BookInputData {
  id: number
  isbn?: string
  title: string
  authors: AuthorInput[]
  tags: TagInput[]
  coverImage?: string
  blurb?: string
  rating: number
  shelfId: number
}

type BaseItemInput = {
  id: number | null
  name: string
}

type AuthorInput = BaseItemInput

type TagInput = BaseItemInput
