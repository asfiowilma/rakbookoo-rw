import { useEffect } from 'react'

import {
  Form,
  FormError,
  Submit,
  RWGqlError,
  UseFormReturn,
  Control,
  UseFormSetValue,
  UseFormWatch,
} from '@redwoodjs/forms'

import NumberField from 'src/components/Form/NumberField'
import TextAreaField from 'src/components/Form/TextAreaField'
import TextField from 'src/components/Form/TextField'
import SelectAuthorField from 'src/components/Form/SelectAuthorField'
import SelectShelfField from 'src/components/Form/SelectShelfField'
import SelectTagField from 'src/components/Form/SelectTagField'

interface BookFormProps {
  book?: BookInputData
  onSave: CallableFunction
  error: RWGqlError
  loading: boolean
  formMethods?: UseFormReturn<BookInputData, object>
  control?: Control<BookInputData, object>
  setValue?: UseFormSetValue<BookInputData>
  watch?: UseFormWatch<BookInputData>
  shelfId: number
}

const BookForm = ({
  book,
  onSave,
  error,
  loading,
  control,
  setValue,
  watch,
  formMethods,
  shelfId,
}: BookFormProps) => {
  const onSubmit = (data) => {
    console.log('🚀 ~ file: BookForm.tsx ~ line 22 ~ onSubmit ~ data', data)
    onSave(data, book?.id)
  }

  useEffect(() => {
    if (shelfId) setValue && setValue('shelfId', shelfId)
  }, [shelfId])

  return (
    <div>
      <Form {...{ formMethods, onSubmit, error }}>
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <TextField name="isbn" label="ISBN" defaultValue={book?.isbn} />
        <TextField
          name="title"
          label="Title"
          defaultValue={book?.title}
          validation={{ required: true }}
        />
        <SelectAuthorField
          {...{ control, setValue, watch }}
          defaultValue={book?.authors ?? []}
        />
        <TextField
          name="coverImage"
          label="Book Cover"
          defaultValue={book?.coverImage}
        />
        <SelectTagField
          {...{ control, setValue, watch }}
          defaultValue={book?.tags ?? []}
        />
        <TextAreaField
          name="blurb"
          label="Blurb"
          cols={6}
          defaultValue={book?.blurb}
        />
        <NumberField
          name="rating"
          label="Rating"
          defaultValue={book?.rating ?? 0}
        />
        <SelectShelfField
          {...{ control, setValue, watch }}
          defaultValue={shelfId}
        />
        <div className="rw-button-group">
          <Submit disabled={loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookForm
