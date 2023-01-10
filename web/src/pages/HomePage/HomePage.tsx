import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import BookModal from 'src/components/Book/Book/BookModal'
import LibraryCell from 'src/components/LibraryCell'

const HomePage = () => {
  const auth = useAuth()
  const { isAuthenticated, currentUser, logOut } = auth

  if (!isAuthenticated) navigate(routes.login())

  return (
    <>
      <MetaTags title="Home" description="Home page" />

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
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
        <LibraryCell userUid={currentUser?.sub} />
      </div>
      <BookModal />
    </>
  )
}

export default HomePage
