import { useBookStore } from 'src/hooks/useBookStore'
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
      <img
        src={book.coverImage}
        alt={book.title}
        className="aspect-[2/3] w-full rounded-lg bg-base-300 object-cover"
      />
      <p className="font-bold line-clamp-2">{book.title}</p>
      <p>{book.authors?.[0]?.name}</p>
    </button>
  )
}

export default BookThumbnail
