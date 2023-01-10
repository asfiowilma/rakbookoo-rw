import { Shelf } from 'types/graphql'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface ShelfState {
  shelfId: number
  shelfName: string
  isShelfModalOpen: boolean
  setShelfModalOpen: (to: boolean) => void
  setShelf: (to: Partial<Shelf>) => void
}

export const useShelfStore = create<ShelfState>()(
  devtools((set) => ({
    shelfId: 0,
    shelfName: '',
    isShelfModalOpen: false,
    setShelf: (to) =>
      set((state) => ({ ...state, shelfId: to.id, shelfName: to.name })),
    setShelfModalOpen: (to) =>
      set((state) => ({ ...state, isShelfModalOpen: to })),
  }))
)
