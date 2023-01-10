import type { EditBookById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookForm from 'src/components/Book/BookForm'
import { UPDATE_BOOK_MUTATION } from '../mutations'

export const QUERY = gql`
  query EditBookById($id: Int!) {
    book(id: $id) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ book }: CellSuccessProps<EditBookById>) => {
  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK_MUTATION, {
    onCompleted: () => {
      toast.success('Book updated')
      navigate(routes.books())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { shelfId: parseInt(input.shelfId) })
    updateBook({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Book {book.id}</h2>
      </header>
      <div className="rw-segment-main">
        <BookForm
          book={book}
          shelfId={book.shelfId}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
