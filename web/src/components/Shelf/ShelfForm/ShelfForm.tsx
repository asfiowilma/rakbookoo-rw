import { useAuth } from '@redwoodjs/auth'
import TextField from 'src/components/Form/TextField'
import { Form, FormError, Submit, HiddenField, useForm } from '@redwoodjs/forms'
import ShelfThumbnail from '../ShelfThumbnail'
import useDebounce from 'src/hooks/useDebounce'
import { back } from '@redwoodjs/router'

const ShelfForm = ({ shelf, onSave, loading, error }) => {
  const formMethods = useForm()
  const previewThumbnail = formMethods.watch('name', shelf?.name ?? '')
  const debouncedThumbnail: string = useDebounce<string>(previewThumbnail, 500)
  const { userMetadata: user } = useAuth()

  const onSubmit = (data) => {
    onSave(data, shelf?.id)
  }

  return (
    <Form
      onSubmit={onSubmit}
      formMethods={formMethods}
      error={error}
      className="rounded-box flex flex-col gap-4 bg-base-200 p-6"
    >
      <FormError
        error={error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />
      <div className="flex items-center gap-4">
        <ShelfThumbnail
          size={72}
          name={(debouncedThumbnail as string) ?? ''}
          className="flex-none"
        />
        <TextField
          label="Nama Rak"
          name="name"
          placeholder={`Masukkan nama rak ${!shelf?.id ? 'baru' : ''}`}
          defaultValue={shelf?.name}
          validation={{ required: true }}
          className="flex-1"
        />
      </div>
      <HiddenField name="userUid" defaultValue={user.id} />

      <div className="self-end">
        <button type="button" className="btn btn-ghost" onClick={back}>
          Batal
        </button>
        <Submit disabled={loading} className="btn btn-primary">
          Simpan
        </Submit>
      </div>
    </Form>
  )
}

export default ShelfForm
