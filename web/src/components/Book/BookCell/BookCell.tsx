import type { FindBookById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Book from 'src/components/Book/Book'
import { useBookStore } from 'src/hooks/useBookStore'
import { useEffect } from 'react'

export const QUERY = gql`
  query FindBookById($id: Int!) {
    book: book(id: $id) {
      id
      isbn
      title
      coverImage
      blurb
      rating
      shelfId
      Shelf {
        name
      }
      authors {
        name
      }
      tags {
        name
      }
      notes {
        content
        createdAt
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Book not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ book }: CellSuccessProps<FindBookById>) => {
  const { setBook } = useBookStore()

  useEffect(() => {
    if (book) setBook(book)
  }, [book])

  return <Book book={book} />
}
