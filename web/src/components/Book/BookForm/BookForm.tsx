import { useEffect } from 'react'

import {
  Form,
  FormError,
  Submit,
  RWGqlError,
  UseFormReturn,
  UseFormSetValue,
  UseFormWatch,
} from '@redwoodjs/forms'

import TextAreaField from 'src/components/Form/TextAreaField'
import TextField from 'src/components/Form/TextField'
import SelectAuthorField from 'src/components/Form/SelectAuthorField'
import SelectShelfField from 'src/components/Form/SelectShelfField'
import SelectTagField from 'src/components/Form/SelectTagField'
import { FaStar } from 'react-icons/fa'
import { back } from '@redwoodjs/router'
import { BiBookHeart } from 'react-icons/bi'
import { Book } from 'types/graphql'
import RatingField from 'src/components/Form/RatingField'
import { MdError } from 'react-icons/md'

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
            {watch('coverImage') ? (
              <img
                src={watch('coverImage')}
                alt={book.title}
                className="aspect-[5/8] h-80 rounded-lg bg-base-300 object-cover"
              />
            ) : (
              <div className="flex aspect-[5/8] h-80 w-auto flex-col items-center justify-center rounded-md bg-neutral text-center text-neutral-content shadow">
                <BiBookHeart className="h-12 w-12" />
              </div>
            )}
            <RatingField name="rating" label="Rating" watch={watch} />
            <TextField name="coverImage" label="Book Cover" />
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
        <button className="btn btn-ghost" onClick={back}>
          Kembali
        </button>
        <Submit disabled={loading} className="btn btn-primary self-end">
          Simpan
        </Submit>
      </div>
    </Form>
  )
}

export default BookForm
