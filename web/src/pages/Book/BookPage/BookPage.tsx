import { useEffect } from 'react'
import BookCell from 'src/components/Book/BookCell'
import { useBookStore } from 'src/hooks/useBookStore'

type BookPageProps = {
  id: number
}

const BookPage = ({ id }: BookPageProps) => {
  const { setBookModalOpen } = useBookStore()

  useEffect(() => {
    setBookModalOpen(false)
  }, [])

  return <BookCell id={id} />
}

export default BookPage
