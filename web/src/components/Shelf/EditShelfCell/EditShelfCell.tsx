import type { EditShelfById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShelfForm from 'src/components/Shelf/ShelfForm'

export const QUERY = gql`
  query EditShelfById($id: Int!) {
    shelf: shelf(id: $id) {
      id
      name
      userUid
    }
  }
`
const UPDATE_SHELF_MUTATION = gql`
  mutation UpdateShelfMutation($id: Int!, $input: UpdateShelfInput!) {
    updateShelf(id: $id, input: $input) {
      id
      name
      userUid
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ shelf }: CellSuccessProps<EditShelfById>) => {
  const [updateShelf, { loading, error }] = useMutation(UPDATE_SHELF_MUTATION, {
    onCompleted: () => {
      toast.success('Shelf updated')
      navigate(routes.shelves())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateShelf({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Shelf {shelf.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ShelfForm shelf={shelf} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
