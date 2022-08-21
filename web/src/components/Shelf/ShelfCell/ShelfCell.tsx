import type { FindShelfById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Shelf from 'src/components/Shelf/Shelf'

export const QUERY = gql`
  query FindShelfById($id: Int!) {
    shelf: shelf(id: $id) {
      id
      name
      userUid
      books {
        id
        coverImage
        rating
        blurb
        isbn
        title
        authors {
          name
        }
        tags {
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Shelf not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ shelf }: CellSuccessProps<FindShelfById>) => {
  return <Shelf shelf={shelf} />
}
