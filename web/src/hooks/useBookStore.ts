import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface BookState {
  bookId: number
  isBookModalOpen: boolean
  setBookModalOpen: (to: boolean) => void
  setBookId: (to: number) => void
}

export const useBookStore = create<BookState>()(
  devtools((set) => ({
    bookId: 0,
    isBookModalOpen: false,
    setBookId: (to) => set((state) => ({ ...state, bookId: to })),
    setBookModalOpen: (to) =>
      set((state) => ({ ...state, isBookModalOpen: to })),
  }))
)
