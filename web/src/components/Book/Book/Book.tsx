import { FaStar, FaPlus } from 'react-icons/fa'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import NoteForm from '../../Note/NoteForm'
import { useState } from 'react'
import Note from 'src/components/Note/Note'
import { DELETE_BOOK_MUTATION } from '../mutations'

const Book = ({ book }) => {
  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
    onCompleted: () => {
      toast.success('Book deleted')
      navigate(routes.books())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete book ' + id + '?')) {
      deleteBook({ variables: { id } })
    }
  }

  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false)

  return (
    <>
      <div className="absolute inset-0 -z-10 h-32 overflow-hidden opacity-40">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full scale-110 object-cover object-center blur"
        />
      </div>
      <div>
        <div className="flex w-full gap-6">
          <img
            src={book.coverImage}
            alt={book.title}
            className="aspect-[2/3] h-72 rounded-xl object-cover"
          />
          <header className="my-4 flex flex-1 flex-col">
            <nav className="mt-4 flex flex-1 gap-4 self-end">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => onDeleteClick(book.id)}
              >
                Hapus
              </button>
              <Link to={routes.editBook({ id: book.id })} className="btn">
                Edit
              </Link>
            </nav>
            <h2 className="text-h2">{book.title}</h2>
            <p className="mt-4 w-full">
              {book.authors?.map((author) => author.name).join(', ')}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {book.tags?.map((tag) => (
                <div key={tag.name} className="badge">
                  {tag.name}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-lg ${
                    i < book.rating ? 'text-neutral-content' : 'text-neutral'
                  }`}
                />
              ))}
            </div>
          </header>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-box col-span-2 space-y-6 bg-base-100 bg-opacity-70 p-4">
            <div>
              <h3 className="font-bold text-gray-500">Deskripsi</h3>
              <p>{book.blurb}</p>
            </div>
            <div>
              <h3 className="flex justify-between font-bold text-gray-500">
                Notes
                <button
                  onClick={() => setIsNoteFormOpen(true)}
                  className={`btn btn-sm gap-1 transition ease-in-out ${
                    isNoteFormOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <FaPlus /> tambah note
                </button>
              </h3>
              <div
                key="note-form"
                className={`overflow-hidden transition-all ease-in-out ${
                  isNoteFormOpen ? 'h-42 opacity-100' : 'h-0 opacity-0'
                }`}
              >
                <NoteForm
                  key={book.id}
                  bookId={book.id}
                  onCancel={() => setIsNoteFormOpen(false)}
                />
              </div>
              <div className="space-y-2 py-2">
                {book.notes.map((note) => (
                  <Note key={note.id} {...note} />
                ))}
                {!book.notes.length && (
                  <div className="card card-compact bg-base-200">
                    <div className="card-body text-center">
                      Belum ada catatan.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-box space-y-3 bg-base-100 bg-opacity-70 p-4">
              <p>
                <span className="block text-sm text-gray-500">ISBN </span>
                {book.isbn}
              </p>
              <p>
                <span className="block text-sm text-gray-500">Rak </span>
                {book.Shelf.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Book
