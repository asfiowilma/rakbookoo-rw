import React, { useState } from 'react'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import NoteForm from '../NoteForm'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { DELETE_NOTE_MUTATION } from '../queries'
import moment from 'moment'

const Note = (note: Note) => {
  const [deleteBook] = useMutation(DELETE_NOTE_MUTATION, {
    onCompleted: () => {
      toast.success('Note dihapus')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Yakin ingin menghapus note ' + id + '?')) {
      deleteBook({ variables: { id }, refetchQueries: ['FindBookById'] })
    }
  }

  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="card card-compact bg-base-200">
      {!isEditing ? (
        <div className="card-body">
          <div className="flex justify-between font-bold">
            <span>
              {moment(note.createdAt)
                .locale('id')
                .format('Do MMMM YYYY, hh:mm')}
            </span>{' '}
            <div>
              <div
                className="btn btn-ghost btn-square btn-sm text-error"
                onClick={() => onDeleteClick(note.id)}
              >
                <FaTrash />
              </div>
              <div
                className="btn btn-ghost btn-square btn-sm"
                onClick={() => setIsEditing(true)}
              >
                <FaPencilAlt />
              </div>
            </div>
          </div>
          {note.content}
        </div>
      ) : (
        <div className="card-body">
          <div>
            Edit Note dari{' '}
            <span className="font-bold">
              {moment(note.createdAt).format('Do MMMM YYYY, hh:mm')}
            </span>
          </div>
          <NoteForm note={note} onCancel={() => setIsEditing(false)} />
        </div>
      )}
    </div>
  )
}

export default Note
