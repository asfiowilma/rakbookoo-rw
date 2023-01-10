import { Link, routes, useParams } from '@redwoodjs/router'
import AppLayout from './AppLayout'

type ShelfLayoutProps = {
  children: React.ReactNode
}

const ShelvesLayout = ({ children }: ShelfLayoutProps) => {
  const { id } = useParams()
  console.log('🚀 ~ file: ShelvesLayout.tsx:10 ~ ShelvesLayout ~ id', id)

  return (
    <AppLayout>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href={routes.shelves()} className="link link-hover">
              Rakbookoo
            </a>
          </li>
          {id ? <li>Nama Rak</li> : <li>Rak Saya</li>}
        </ul>
      </div>
      <main className="w-full">{children}</main>
    </AppLayout>
  )
}

export default ShelvesLayout
