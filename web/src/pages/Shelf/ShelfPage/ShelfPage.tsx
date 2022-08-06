import ShelfCell from 'src/components/Shelf/ShelfCell'

type ShelfPageProps = {
  id: number
}

const ShelfPage = ({ id }: ShelfPageProps) => {
  return <ShelfCell id={id} />
}

export default ShelfPage
