import { Book } from 'types/graphql'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface BookState {
  bookId: number
  book: Partial<Book> | null
  isBookModalOpen: boolean
  setBookModalOpen: (to: boolean) => void
  setBookId: (to: number) => void
  setBook: (to: Partial<Book>) => void
}

export const useBookStore = create<BookState>()(
  devtools((set) => ({
    bookId: 0,
    book: null,
    isBookModalOpen: false,
    setBookId: (to) => set((state) => ({ ...state, bookId: to })),
    setBookModalOpen: (to) =>
      set((state) => ({ ...state, isBookModalOpen: to })),
    setBook: (to) => set((state) => ({ ...state, book: to })),
  }))
)
