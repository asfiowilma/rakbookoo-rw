import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const BookForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.book?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="isbn"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Isbn
        </Label>

        <TextField
          name="isbn"
          defaultValue={props.book?.isbn}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isbn" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.book?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="coverImage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Cover image
        </Label>

        <TextField
          name="coverImage"
          defaultValue={props.book?.coverImage}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="coverImage" className="rw-field-error" />

        <Label
          name="blurb"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Blurb
        </Label>

        <TextField
          name="blurb"
          defaultValue={props.book?.blurb}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="blurb" className="rw-field-error" />

        <Label
          name="rating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rating
        </Label>

        <NumberField
          name="rating"
          defaultValue={props.book?.rating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="rating" className="rw-field-error" />

        <Label
          name="shelfId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Shelf id
        </Label>

        <NumberField
          name="shelfId"
          defaultValue={props.shelfId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="shelfId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookForm
