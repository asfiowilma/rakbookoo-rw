import { Form, FormError } from '@redwoodjs/forms'

import TextAreaField from 'src/components/Form/TextAreaField'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'

const CREATE_NOTE_MUTATION = gql`
  mutation createNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      content
      bookId
    }
  }
`

const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNoteMutation($id: Int!, $input: UpdateNoteInput!) {
    updateNote(id: $id, input: $input) {
      content
      bookId
    }
  }
`

const NoteForm = ({ onCancel }: { onCancel: () => void }) => {
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note created')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    console.log('🚀 ~ file: NoteForm.tsx ~ line 21 ~ onSubmit ~ data', data)
  }

  return (
    <Form {...{ onSubmit, error }} className="flex flex-col gap-2">
      <FormError
        error={error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />
      <TextAreaField name="note" placeholder="Masukkan catatan" />
      <div className="space-x-2 self-end">
        <button onClick={onCancel} className="btn btn-ghost">
          Batal
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </Form>
  )
}

export default NoteForm
