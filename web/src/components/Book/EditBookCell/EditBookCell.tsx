import type { EditBookById } from 'types/graphql'

import { back, navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookForm from 'src/components/Book/BookForm'
import { UPDATE_BOOK_MUTATION } from '../mutations'
import { useBookStore } from '../../../hooks/useBookStore'
import { useEffect } from 'react'
import useBookForm from 'src/hooks/useBookForm'

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
      tags {
        id
        name
      }
      authors {
        id
        name
      }
      Shelf {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ book }: CellSuccessProps<EditBookById>) => {
  const { setBook } = useBookStore()
  const {
    setValue,
    cleanFormData,
    updateBook,
    editError,
    formMethods,
    watch,
    isEditLoading,
  } = useBookForm(book)

  useEffect(() => {
    if (book) setBook(book)
  }, [book])

  const onSave = (input, id) => {
    updateBook({ variables: { id, input: cleanFormData(input) } })
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-h2">Edit Buku</h2>
        <button className="btn btn-ghost" onClick={back}>
          Kembali
        </button>
      </div>
      <BookForm
        book={book}
        shelfId={book.shelfId}
        onSave={onSave}
        watch={watch}
        formMethods={formMethods}
        error={editError}
        setValue={setValue}
        loading={isEditLoading}
      />
    </>
  )
}
