import { useAuth } from '@redwoodjs/auth'
import ShelvesCell from 'src/components/Shelf/ShelvesCell'

const ShelvesPage = () => {
  const { currentUser } = useAuth()

  return <ShelvesCell userUid={currentUser.sub as string} />
}

export default ShelvesPage
