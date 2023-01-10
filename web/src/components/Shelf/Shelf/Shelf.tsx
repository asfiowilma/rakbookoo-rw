import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { FaEdit, FaPencilAlt, FaTrash } from 'react-icons/fa'
import BookModal, { Location } from 'src/components/Book/Book/BookModal'

import useBookForm from 'src/hooks/useBookForm'

import BookThumbnail from '../../Book/Book/BookThumbnail'
import BookForm from '../../Book/BookForm/BookForm'
import ShelfThumbnail from '../ShelfThumbnail'

const DELETE_SHELF_MUTATION = gql`
  mutation DeleteShelfMutation($id: Int!) {
    deleteShelf(id: $id) {
      id
    }
  }
`
const Shelf = ({ shelf }) => {
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
      <div className="flex justify-between">
        <h1 className="text-h1 mb-8 flex items-start gap-3">
          <ShelfThumbnail size={72} name={shelf.name} className="flex-none" />
          {shelf.name}
        </h1>
        <div>
          <div
            className="btn btn-square btn-ghost btn-sm text-error"
            onClick={() => onDeleteClick(shelf.id)}
            title="Hapus rak"
          >
            <FaTrash />
          </div>
          <Link
            to={routes.editShelf({ id: shelf.id })}
            className="btn btn-square btn-ghost btn-sm"
            title="Edit rak"
          >
            <FaPencilAlt />
          </Link>
        </div>
      </div>
      <div className="mx-auto grid max-w-screen-lg grid-cols-6 gap-4">
        {shelf?.books.map((book) => (
          <BookThumbnail key={book.id} {...{ book }} />
        ))}
      </div>
      <BookModal location={Location.shelf} shelfId={shelf.id} />
    </>
  )
}

export default Shelf
