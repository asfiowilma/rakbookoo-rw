import { navigate, routes } from '@redwoodjs/router'
import { useEffect } from 'react'
import { useBookStore } from 'src/hooks/useBookStore'

import BookCell from '../BookCell'

const BookModal = () => {
  const { bookId, isBookModalOpen, setBookModalOpen } = useBookStore()

  useEffect(() => {
    if (isBookModalOpen && bookId)
      navigate(routes.library({ book: bookId }), { replace: true })
    else navigate(routes.library(), { replace: true })
  }, [bookId, isBookModalOpen])

  const closeModal = () => setBookModalOpen(false)
  return bookId ? (
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
        className="modal-box relative m-4 max-w-screen-md pr-0 sm:rounded-b-box"
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
  ) : null
}

export default BookModal
