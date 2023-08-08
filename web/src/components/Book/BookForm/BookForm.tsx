import { BiBookHeart, BiGlobe, BiSearch } from 'react-icons/bi'
import {
  Form,
  FormError,
  RWGqlError,
  Submit,
  UseFormReturn,
  UseFormSetValue,
  UseFormWatch,
} from '@redwoodjs/forms'

import { Book } from 'types/graphql'
import CoverImageField from 'src/components/Form/CoverImageField'
import { FaUpload } from 'react-icons/fa'
import { MdError } from 'react-icons/md'
import RakLabel from 'src/components/Form/Label'
import RatingField from 'src/components/Form/RatingField'
import SelectAuthorField from 'src/components/Form/SelectAuthorField'
import SelectShelfField from 'src/components/Form/SelectShelfField'
import SelectTagField from 'src/components/Form/SelectTagField'
import TextAreaField from 'src/components/Form/TextAreaField'
import TextField from 'src/components/Form/TextField'
import { back } from '@redwoodjs/router'
import { book } from '../../../../../api/src/services/books/books'
import { useEffect } from 'react'

interface BookFormProps {
  book?: Partial<Book>
  onSave: CallableFunction
  error: RWGqlError
  loading: boolean
  formMethods?: UseFormReturn<BookInputData, object>
  setValue?: UseFormSetValue<BookInputData>
  watch?: UseFormWatch<BookInputData>
  shelfId: number
}

const BookForm = ({
  book,
  onSave,
  error,
  loading,
  setValue,
  watch,
  formMethods,
  shelfId,
}: BookFormProps) => {
  const onSubmit = (data) => {
    onSave(data, book?.id)
  }

  useEffect(() => {
    if (shelfId) setValue && setValue('shelfId', shelfId)
  }, [shelfId])

  return (
    <Form
      {...{ formMethods, onSubmit, error }}
      className="rounded-box flex flex-col gap-4 bg-base-200 bg-opacity-80 p-6"
    >
      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <MdError className="h-6 w-6" />
            <FormError error={error} />
          </div>
        </div>
      )}
      <div>
        <div className="flex w-full gap-6">
          <div className="flex flex-none flex-col">
            <CoverImageField watch={watch} setValue={setValue} book={book} />
            <RatingField name="rating" label="Rating" watch={watch} />
          </div>
          <div className="flex flex-1 flex-col">
            <SelectShelfField setValue={setValue} />
            <TextField
              name="title"
              label="Judul"
              placeholder="Masukkan judul buku"
              validation={{ required: true }}
            />
            <SelectAuthorField setValue={setValue} />
            <SelectTagField setValue={setValue} />
            <TextAreaField name="blurb" label="Blurb" cols={6} />
            <TextField name="isbn" label="ISBN" />
          </div>
        </div>
      </div>
      <div className="self-end">
        <button type="button" className="btn btn-ghost" onClick={back}>
          Batal
        </button>
        <Submit disabled={loading} className="btn btn-primary self-end">
          Simpan
        </Submit>
      </div>
    </Form>
  )
}

export default BookForm
