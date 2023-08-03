import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookForm from 'src/components/Book/BookForm'
import { CREATE_BOOK_MUTATION } from '../mutations'
import useBookForm from 'src/hooks/useBookForm'
import { back } from '@redwoodjs/router'

const NewBook = () => {
  const {
    createBook,
    isCreateLoading,
    createError,
    watch,
    setValue,
    formMethods,
    cleanFormData,
  } = useBookForm()

  const onSave = (input) => {
    createBook({ variables: { input: cleanFormData(input) } })
  }

  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-h1">Buku Baru</h1>
        <button className="btn btn-ghost" onClick={back}>
          Kembali
        </button>
      </header>
      <div>
        <BookForm
          onSave={onSave}
          loading={isCreateLoading}
          error={createError}
          formMethods={formMethods}
          setValue={setValue}
          watch={watch}
          shelfId={0}
        />
      </div>
    </>
  )
}

export default NewBook
