import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { FindBooks } from 'types/graphql'

import BookThumbnail from '../Book/Book/BookThumbnail'

export const QUERY = gql`
  query FindBooks {
    books {
      id
      title
      coverImage
      authors {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No books yet. '}
      <Link to={routes.newBook()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ books }: CellSuccessProps<FindBooks>) => {
  return (
    <>
      {books.map((book) => (
        <BookThumbnail key={book.id} book={book} />
      ))}
    </>
  )
}
