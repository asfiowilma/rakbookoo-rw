import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Books from 'src/components/Book/Books'
import { FindBooks } from 'types/graphql'

export const QUERY = gql`
  query FindBooks {
    books {
      id
      isbn
      title
      coverImage
      blurb
      rating
      shelfId
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
  return <Books books={books} />
}
