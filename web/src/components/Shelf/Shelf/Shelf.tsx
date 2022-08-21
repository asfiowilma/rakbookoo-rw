import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import useBookForm from 'src/hooks/useBookForm'

import BookThumbnail from '../../Book/Book/BookThumbnail'
import BookForm from '../../Book/BookForm/BookForm'

const DELETE_SHELF_MUTATION = gql`
  mutation DeleteShelfMutation($id: Int!) {
    deleteShelf(id: $id) {
      id
    }
  }
`
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
      <div className="mx-auto grid max-w-screen-lg grid-cols-6 gap-4">
        {shelf?.books.map((book) => (
          <BookThumbnail key={book.id} {...{ book }} />
        ))}
      </div>
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
