import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookForm from 'src/components/Book/BookForm'
import { CREATE_BOOK_MUTATION } from '../mutations'
import useBookForm from 'src/hooks/useBookForm'

const NewBook = () => {
  const {
    createBook,
    isCreateLoading,
    createError,
    control,
    watch,
    setValue,
    formMethods,
  } = useBookForm()

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
        <BookForm
          onSave={onSave}
          loading={isCreateLoading}
          error={createError}
          formMethods={formMethods}
          setValue={setValue}
          watch={watch}
          control={control}
          shelfId={0}
        />
      </div>
    </>
  )
}

export default NewBook
