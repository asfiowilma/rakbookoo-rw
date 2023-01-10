import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ShelvesCell from 'src/components/Shelf/ShelvesCell'

const ShelvesPage = () => {
  return (
    <>
      <MetaTags title="Shelves" description="Shelves page" />

      <div className="flex w-full justify-between">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a href={routes.home()} className="link link-hover">
                Rakbookoo
              </a>
            </li>
            <li>Rak Saya</li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <span>Tampilkan</span>
          <div className="tabs tabs-boxed">
            <div
              key="BOOKS-TAB"
              onClick={() => navigate(routes.library(), { replace: true })}
              className="tab transition"
            >
              Buku
            </div>
            <div key="SHELVES-TAB" className="tab tab-active transition">
              Rak
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-h1 mb-8">My Library</h1>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ShelvesCell />
      </div>
    </>
  )
}

export default ShelvesPage
