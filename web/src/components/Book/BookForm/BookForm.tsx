import { Form, FormError, Submit, RWGqlError } from '@redwoodjs/forms'

import NumberField from 'src/components/Form/NumberField'
import TextAreaField from 'src/components/Form/TextAreaField'
import TextField from 'src/components/Form/TextField'

interface BookFormProps {
  book?: BookInputData
  onSave: CallableFunction
  error: RWGqlError
  loading: boolean
  shelfId: number
}

const BookForm = ({ book, onSave, error, loading, shelfId }: BookFormProps) => {
  const onSubmit = (data) => {
    onSave(data, book?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={error}>
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
        <TextField
          name="coverImage"
          label="Book Cover"
          defaultValue={book?.coverImage}
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
        {/*TODO: select shelf  */}
        <NumberField
          name="rating"
          label="Rating"
          defaultValue={shelfId}
          validation={{ required: true }}
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
