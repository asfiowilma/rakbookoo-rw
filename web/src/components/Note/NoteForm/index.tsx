import { Form, FormError } from '@redwoodjs/forms'

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
  const [postNote, { loading, error }] = useMutation(
    note ? UPDATE_NOTE_MUTATION : CREATE_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success(`Note berhasil ${note ? 'diupdate' : 'dibuat'}.`)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    const noteData = { ...(note ?? { bookId }), ...data }
    console.log(
      '🚀 ~ file: NoteForm.tsx ~ line 28 ~ onSubmit ~ noteData',
      noteData
    )
    postNote({ variables: { id: note?.id, input: noteData } })
  }

  return (
    <Form {...{ onSubmit, error }} className="flex flex-col gap-2">
      <FormError
        error={error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />
      <TextAreaField
        name="content"
        placeholder="Masukkan catatan"
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
