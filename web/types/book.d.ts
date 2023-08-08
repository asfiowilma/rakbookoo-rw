interface BookInputData {
  id: number
  isbn?: string
  title: string
  authors: AuthorInput[]
  tags: TagInput[]
  coverImage?: string
  blurb?: string
  rating: string
  shelfId: number
  chooseImageBy: 'Upload' | 'URL' | 'Search'
}

type BaseItemInput = {
  id: number | null
  name: string
}

type AuthorInput = BaseItemInput

type TagInput = BaseItemInput

type Note = {
  id?: number
  createdAt?: string
  content: string
  bookId: number
}
