import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import useBookForm from 'src/hooks/useBookForm'

import BookForm from '../../Book/BookForm/BookForm'

const DELETE_SHELF_MUTATION = gql`
  mutation DeleteShelfMutation($id: Int!) {
    deleteShelf(id: $id) {
      id
    }
  }
`
const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Shelf = ({ shelf }) => {
  console.log('🚀 ~ file: Shelf.tsx ~ line 61 ~ Shelf ~ shelf', shelf)
  const {
    createBook,
    isCreateLoading,
    createError,
    formMethods,
    control,
    watch,
    setValue,
  } = useBookForm()
  const [deleteShelf] = useMutation(DELETE_SHELF_MUTATION, {
    onCompleted: () => {
      toast.success('Shelf deleted')
      navigate(routes.shelves())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = { ...input, rating: parseInt(input.rating) }
    createBook({ variables: { input: castInput } })
  }

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete shelf ' + id + '?')) {
      deleteShelf({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Shelf {shelf.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{shelf.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{shelf.name}</td>
            </tr>
            <tr>
              <th>User uid</th>
              <td>{shelf.userUid}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editShelf({ id: shelf.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(shelf.id)}
        >
          Delete
        </button>
      </nav>
      {shelf?.books.map((book) => jsonDisplay(book))}
      <BookForm
        {...{ formMethods, control, watch, setValue, onSave }}
        loading={isCreateLoading}
        error={createError}
        shelfId={shelf.id}
      />
    </>
  )
}

export default Shelf
