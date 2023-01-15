import { back, navigate, routes } from '@redwoodjs/router'
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
    <>
      <div className="flex justify-between">
        <h1 className="text-h1">Rak Baru</h1>
        <button className="btn btn-ghost" onClick={back}>
          Kembali
        </button>
      </div>
      <ShelfForm onSave={onSave} loading={loading} error={error} />
    </>
  )
}

export default NewShelf
