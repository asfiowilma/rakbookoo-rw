import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShelfForm from 'src/components/Shelf/ShelfForm'

const CREATE_SHELF_MUTATION = gql`
  mutation CreateShelfMutation($input: CreateShelfInput!) {
    createShelf(input: $input) {
      id
    }
  }
`

interface NewShelfProps {
  userUid: number
}

const NewShelf = ({ userUid }: NewShelfProps) => {
  const [createShelf, { loading, error }] = useMutation(CREATE_SHELF_MUTATION, {
    onCompleted: () => {
      toast.success('Shelf created')
      navigate(routes.shelves())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createShelf({ variables: { input: { userUid, ...input } } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Shelf</h2>
      </header>
      <div className="rw-segment-main">
        <ShelfForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewShelf
