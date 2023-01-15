import { Link, routes, useLocation } from '@redwoodjs/router'
import AppLayout from './AppLayout'
import { useBookStore } from '../hooks/useBookStore'
type BookLayoutProps = {
  children: React.ReactNode
}

const BooksLayout = ({ children }: BookLayoutProps) => {
  const { book } = useBookStore()
  const { pathname } = useLocation()

  return (
    <AppLayout>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={routes.library()} className="link link-hover">
              Rakbookoo
            </Link>
          </li>
          <li>
            {book?.shelfId && (
              <Link to={routes.shelf({ id: book.shelfId })}>
                {book.Shelf.name}
              </Link>
            )}
          </li>
          <li>
            {book?.id && (
              <Link to={routes.book({ id: book.id })}>{book.title}</Link>
            )}
          </li>
          {pathname.endsWith('edit') && <li>Edit</li>}
        </ul>
      </div>
      <main className="w-full">{children}</main>
    </AppLayout>
  )
}

export default BooksLayout
