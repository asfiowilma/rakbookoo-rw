import { Form, FormError, useForm } from '@redwoodjs/forms'

import TextAreaField from 'src/components/Form/TextAreaField'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { CREATE_NOTE_MUTATION, UPDATE_NOTE_MUTATION } from '../queries'

interface NoteFormProps {
  note?: Note
  bookId?: number
  onCancel: () => void
}

const NoteForm = ({ note, bookId, onCancel }: NoteFormProps) => {
  const formMethods = useForm({ defaultValues: note })
  const [postNote, { loading, error }] = useMutation(
    note ? UPDATE_NOTE_MUTATION : CREATE_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success(`Note berhasil ${note ? 'diupdate' : 'dibuat'}.`)
        formMethods.reset()
        onCancel()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    const noteData = { id: note?.id, bookId: bookId, ...data }
    postNote({
      variables: { id: note?.id, input: noteData },
      refetchQueries: ['FindBookById'],
    })
  }

  return (
    <Form {...{ onSubmit, error, formMethods }} className="flex flex-col gap-2">
      <FormError
        error={error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />
      <TextAreaField
        name="content"
        placeholder="Masukkan catatan"
        validation={{ required: true }}
        defaultValue={note?.content}
      />
      <div className="space-x-2 self-end">
        <button type="button" onClick={onCancel} className="btn btn-ghost">
          Batal
        </button>
        <button
          type="submit"
          className={`btn btn-primary ${loading && 'loading'}`}
        >
          {loading ? 'Loading' : 'Submit'}
        </button>
      </div>
    </Form>
  )
}

export default NoteForm
