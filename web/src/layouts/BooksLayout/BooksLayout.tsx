import { Link, routes } from '@redwoodjs/router'
type BookLayoutProps = {
  children: React.ReactNode
}

const BooksLayout = ({ children }: BookLayoutProps) => {
  return (
    <div className="mx-auto py-16 lg:max-w-screen-lg">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href={routes.home()} className="link link-hover">
              Rakbookoo
            </a>
          </li>
          <li>Nama Rak</li>
          <li>Judul Buku</li>
        </ul>
      </div>
      {/* <header className="flex justify-between">
        <h1>
          <Link to={routes.books()} className="rw-link">
            Books
          </Link>
        </h1>
        <Link to={routes.newBook()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Book
        </Link>
      </header> */}
      <main className="w-full">{children}</main>
    </div>
  )
}

export default BooksLayout
