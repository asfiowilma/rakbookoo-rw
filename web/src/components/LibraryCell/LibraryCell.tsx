import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import {
  FindBooksByUserUidVariables,
  FindBooksByUserUid,
} from '../../../types/graphql'
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

export const beforeQuery = ({ userUid }) => {
  return {
    variables: { userUid },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindBooksByUserUidVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  books,
}: CellSuccessProps<FindBooksByUserUid, FindBooksByUserUidVariables>) => {
  return (
    <>
      {books.map((book) => (
        <BookThumbnail key={book.id} book={book} />
      ))}
    </>
  )
}
