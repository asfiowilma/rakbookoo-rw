import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import type { FindShelfById, Shelf as IShelf } from 'types/graphql'

import Shelf from 'src/components/Shelf/Shelf'
import { useEffect } from 'react'
import { useShelfStore } from '../../../hooks/useShelfStore'

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
  const { setShelf } = useShelfStore()

  useEffect(() => {
    if (shelf) setShelf(shelf as IShelf)
  }, [shelf])

  return <Shelf shelf={shelf} />
}
