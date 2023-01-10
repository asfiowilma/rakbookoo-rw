import { useEffect, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import BookModal from 'src/components/Book/Book/BookModal'
import LibraryCell from 'src/components/LibraryCell'

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
            <div key="BOOKS-TAB" className="tab tab-active transition">
              Buku
            </div>
            <div
              key="SHELVES-TAB"
              onClick={() => navigate(routes.shelves(), { replace: true })}
              className="tab transition"
            >
              Rak
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-h1 mb-8">My Library</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
        <LibraryCell />
      </div>
      <BookModal />
    </>
  )
}

export default LibraryPage
