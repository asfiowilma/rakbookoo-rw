import { useAuth } from '@redwoodjs/auth'
import NewShelf from 'src/components/Shelf/NewShelf'

const NewShelfPage = () => {
  const { userMetadata: user } = useAuth()

  return <NewShelf userUid={user?.id} />
}

export default NewShelfPage
