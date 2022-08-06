import type { FindShelves } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Shelves from 'src/components/Shelf/Shelves'

export const QUERY = gql`
  query FindShelves($userUid: String!) {
    shelves(userUid: $userUid) {
      id
      name
      userUid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No shelves yet. '}
      <Link to={routes.newShelf()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ shelves }: CellSuccessProps<FindShelves>) => {
  return <Shelves shelves={shelves} />
}
