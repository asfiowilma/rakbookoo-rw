import { useBookStore } from 'src/hooks/useBookStore'
import { BiBookHeart } from 'react-icons/bi'
import { truncate } from '../../../utils/truncate'

const MAX_STRING_LENGTH = 32

const BookThumbnail = ({ book }) => {
  const { setBookId, setBookModalOpen } = useBookStore()

  const openBookInfo = () => {
    setBookId(book.id)
    setBookModalOpen(true)
  }

  return (
    <button
      aria-hidden
      onClick={openBookInfo}
      className="flex flex-col text-left"
    >
      {book.coverImage ? (
        <img
          src={book.coverImage}
          alt={book.title}
          className="aspect-[5/8] w-full rounded-lg bg-base-300 object-cover"
        />
      ) : (
        <div className="flex aspect-[5/8] w-full flex-col items-center justify-center rounded-md bg-neutral text-center text-neutral-content shadow">
          <BiBookHeart className="h-12 w-12" />
          {truncate(book.title, MAX_STRING_LENGTH)}
        </div>
      )}
      <p className="font-bold line-clamp-2">{book.title}</p>
      <p>{book.authors?.[0]?.name}</p>
    </button>
  )
}

export default BookThumbnail
