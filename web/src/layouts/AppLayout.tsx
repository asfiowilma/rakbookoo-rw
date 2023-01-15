import { Link, routes } from '@redwoodjs/router'
import React, { ReactNode } from 'react'
import { BiPlus } from 'react-icons/bi'
import Navbar from 'src/components/Navbar'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex flex-col items-start px-6 pt-4 pb-16 lg:max-w-screen-lg xl:max-w-screen-xl">
        {children}
      </div>
      <div className=" fixed bottom-6 right-6">
        <div className="dropdown-end dropdown dropdown-top">
          <label tabIndex={0}>
            <button className="btn btn-primary btn-circle">
              <BiPlus className="h-6 w-6" />
            </button>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-48 bg-base-200 p-2 shadow"
          >
            <li>
              <Link to={routes.newShelf()}>
                <BiPlus className="h-5 w-5" />
                Rak Baru
              </Link>
            </li>
            <li>
              <Link to={routes.newBook()}>
                <BiPlus className="h-5 w-5" />
                Buku Baru
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
