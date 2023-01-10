import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Shelf/ShelvesCell'
import { FaEllipsisV, FaPencilAlt, FaTrash } from 'react-icons/fa'
import Avatar from 'boring-avatars'
import { BiBookHeart } from 'react-icons/bi'

const DELETE_SHELF_MUTATION = gql`
  mutation DeleteShelfMutation($id: Int!) {
    deleteShelf(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 32

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const ShelvesList = ({ shelves }) => {
  const [deleteShelf] = useMutation(DELETE_SHELF_MUTATION, {
    onCompleted: () => {
      toast.success('Shelf deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete shelf ' + id + '?')) {
      deleteShelf({ variables: { id } })
    }
  }

  return shelves.map((shelf) => (
    <div
      title={'Buka rak ' + shelf.name}
      className="rounded-box flex gap-3 overflow-visible bg-base-200 p-3"
      key={shelf.id}
    >
      <Link
        to={routes.shelf({ id: shelf.id })}
        className="rounded-box flex-none overflow-hidden"
      >
        <Avatar
          size={72}
          name={shelf.name}
          square
          variant="beam"
          colors={['#6419E6', '#732DFA', '#A083FF', '#BFB0FF', '#EBE7FF']}
        />
      </Link>
      <div className="relative flex-1 space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <Link to={routes.shelf({ id: shelf.id })} className="flex-1">
            {truncate(shelf.name)}
          </Link>
          <div className="dropdown-bottom dropdown-end dropdown flex-none">
            <label
              onClick={(e) => e.stopPropagation()}
              tabIndex={0}
              className="btn btn-square btn-ghost btn-sm"
            >
              <FaEllipsisV />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-300 p-2 shadow"
            >
              <li>
                <Link
                  to={routes.editShelf({ id: shelf.id })}
                  title={'Edit shelf ' + shelf.name}
                >
                  <FaPencilAlt />
                  Edit Rak
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  title={'Hapus rak ' + shelf.name}
                  onClick={() => onDeleteClick(shelf.id)}
                  className="text-error"
                >
                  <FaTrash />
                  Hapus Rak
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="absolute -bottom-6 mx-auto grid w-48 grid-cols-4 grid-rows-1 gap-3 lg:-bottom-8 lg:w-full xl:w-3/4">
          {shelf.books.map((book, idx) =>
            book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                key={idx}
                className="aspect-[2/3] w-full rounded-md bg-neutral shadow"
              />
            ) : (
              <div
                key={idx}
                className="grid aspect-[2/3] w-full place-items-center rounded-md bg-neutral text-neutral-content shadow"
              >
                <BiBookHeart className="h-5 w-5" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  ))
}

export default ShelvesList
