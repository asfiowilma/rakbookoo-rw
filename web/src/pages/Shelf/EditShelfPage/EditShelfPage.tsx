import EditShelfCell from 'src/components/Shelf/EditShelfCell'

type ShelfPageProps = {
  id: number
}

const EditShelfPage = ({ id }: ShelfPageProps) => {
  return <EditShelfCell id={id} />
}

export default EditShelfPage
