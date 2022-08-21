import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import BookModal from 'src/components/Book/Book/BookModal'
import LibraryCell from 'src/components/LibraryCell'

const HomePage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <div className="mx-auto flex  flex-col items-start py-16 lg:max-w-screen-lg xl:max-w-screen-xl">
      <MetaTags title="Home" description="Home page" />

      {isAuthenticated && <button onClick={logOut}>Log out</button>}
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href={routes.home()} className="link link-hover">
              Rakbookoo
            </a>
          </li>
          <li>Buku Saya</li>
        </ul>
      </div>
      <h1 className="text-h1 mb-8">My Library</h1>
      <div className="grid grid-cols-6 gap-6">
        <LibraryCell userUid={currentUser?.sub} />
      </div>
      <BookModal />
    </div>
  )
}

export default HomePage
