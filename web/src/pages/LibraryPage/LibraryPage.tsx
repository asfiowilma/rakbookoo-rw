import { useEffect, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import BookModal, { Location } from 'src/components/Book/Book/BookModal'
import LibraryCell from 'src/components/LibraryCell'
import { BiPlus } from 'react-icons/bi'

const LibraryPage = () => {
  const auth = useAuth()
  const { isAuthenticated, currentUser } = auth

  if (!isAuthenticated) navigate(routes.login())

  return (
    <>
      <MetaTags title="Library" description="Library page" />

      <div className="flex w-full justify-between">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a href={routes.library()} className="link link-hover">
                Rakbookoo
              </a>
            </li>
            <li>Buku Saya</li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <span>Tampilkan</span>
          <div className="tabs tabs-boxed">
            <div
              key="SHELVES-TAB"
              onClick={() => navigate(routes.shelves(), { replace: true })}
              className="tab transition"
            >
              Rak
            </div>
            <div key="BOOKS-TAB" className="tab tab-active transition">
              Buku
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <h1 className="text-h1 mb-8">My Library</h1>
        <Link to={routes.newBook()} className="btn mt-4 gap-2 pl-2">
          <BiPlus className="h-6 w-6" />
          Buku Baru
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
        <LibraryCell />
      </div>
      <BookModal location={Location.library} />
    </>
  )
}

export default LibraryPage
