import type { EditShelfById } from 'types/graphql'

import { back } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShelfForm from 'src/components/Shelf/ShelfForm'
import { useShelfStore } from 'src/hooks/useShelfStore'
import { useEffect } from 'react'

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
  const { setShelf } = useShelfStore()

  useEffect(() => {
    if (shelf) setShelf(shelf)
  }, [shelf])

  const [updateShelf, { loading, error }] = useMutation(UPDATE_SHELF_MUTATION, {
    onCompleted: () => {
      toast.success('Rak berhasil diperbarui~')
      back()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateShelf({ variables: { id, input } })
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-h2">Edit Rak {shelf?.name}</h2>
        <button className="btn btn-ghost" onClick={back}>
          Kembali
        </button>
      </div>
      <ShelfForm
        shelf={shelf}
        onSave={onSave}
        error={error}
        loading={loading}
      />
    </>
  )
}
