import { useBookStore } from 'src/hooks/useBookStore'

import BookCell from '../BookCell'

const BookModal = () => {
  const { bookId, isBookModalOpen, setBookModalOpen } = useBookStore()
  const closeModal = () => setBookModalOpen(false)
  return (
    <div
      aria-hidden
      className={`modal modal-bottom sm:items-center ${
        isBookModalOpen ? 'modal-open' : ''
      }`}
      onClick={closeModal}
    >
      <div
        aria-hidden
        onClick={(e) => e.stopPropagation()}
        className="modal-box relative max-w-screen-md pr-0 sm:rounded-b-box"
      >
        <button
          className="btn btn-circle btn-sm absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>

        <div className="rak-scrollbar rounded-box mr-2 max-h-[calc(100vh-8em)] overflow-y-scroll pr-6">
          <BookCell id={bookId} />
        </div>
      </div>
    </div>
  )
}

export default BookModal
