import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookForm from 'src/components/Book/BookForm'
import { CREATE_BOOK_MUTATION } from '../mutations'

const NewBook = () => {
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK_MUTATION, {
    onCompleted: () => {
      toast.success('Book created')
      navigate(routes.books())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { shelfId: parseInt(input.shelfId) })
    createBook({ variables: { input: castInput } })
  }

  return (
    <>
      <header className="prose">
        <h1 className="text-h1">Buku Baru</h1>
      </header>
      <div>
        <BookForm onSave={onSave} loading={loading} error={error} shelfId={0} />
      </div>
    </>
  )
}

export default NewBook
