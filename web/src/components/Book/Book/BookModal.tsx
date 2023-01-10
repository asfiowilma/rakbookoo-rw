import { navigate, routes } from '@redwoodjs/router'
import { useEffect } from 'react'
import { useBookStore } from 'src/hooks/useBookStore'

import BookCell from '../BookCell'
import { useShelfStore } from '../../../hooks/useShelfStore'

const RESET_BOOK_ID = 0
export enum Location {
  library,
  shelf,
}

const BookModal = ({
  location,
  shelfId,
}: {
  location: Location
  shelfId?: number
}) => {
  const { bookId, isBookModalOpen, setBookModalOpen, setBookId } =
    useBookStore()

  const getBookRoute = (withBook: boolean = true) => {
    const book = { book: bookId }
    if (location == Location.library)
      return routes.library(withBook ? book : {})
    else if (location == Location.shelf)
      return routes.shelf({ id: shelfId, ...(withBook ? book : {}) })
  }

  useEffect(() => {
    if (isBookModalOpen && bookId) navigate(getBookRoute(), { replace: true })
    else navigate(getBookRoute(false), { replace: true })
  }, [bookId, isBookModalOpen])

  const closeModal = () => {
    setBookModalOpen(false)
    setBookId(RESET_BOOK_ID)
  }

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
