import { Link, routes, useLocation, useParams } from '@redwoodjs/router'
import Avatar from 'boring-avatars'
import ShelfThumbnail from 'src/components/Shelf/ShelfThumbnail'
import { useShelfStore } from 'src/hooks/useShelfStore'
import AppLayout from './AppLayout'

type ShelfLayoutProps = {
  children: React.ReactNode
}

const ShelvesLayout = ({ children }: ShelfLayoutProps) => {
  const { pathname } = useLocation()
  const { shelfId, shelfName } = useShelfStore()

  return (
    <AppLayout>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={routes.shelves()} className="link link-hover">
              Rakbookoo
            </Link>
          </li>
          {shelfId ? (
            <li>
              <Link
                to={routes.shelf({ id: shelfId })}
                className="link link-hover"
              >
                {shelfName}
              </Link>
            </li>
          ) : (
            <li>Rak Saya</li>
          )}
          {pathname.endsWith('edit') && <li>Edit</li>}
        </ul>
      </div>
      {pathname.endsWith('edit') && (
        <h1 className="text-h1 mb-8 flex items-start gap-3">
          Edit {shelfName}
        </h1>
      )}
      <main className="w-full">{children}</main>
    </AppLayout>
  )
}

export default ShelvesLayout
