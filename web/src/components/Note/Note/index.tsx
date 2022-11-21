import React from 'react'
import moment from 'src/utils/moment'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

const Note = (note: Note) => {
  return (
    <div className="card card-compact bg-base-200">
      <div className="card-body">
        <div className="flex justify-between font-bold">
          <span>{moment(note.createdAt).format('Do MMMM YYYY, hh:mm')}</span>{' '}
          <div>
            <div className="btn btn-ghost btn-square btn-sm text-error">
              <FaTrash />
            </div>
            <div className="btn btn-ghost btn-square btn-sm">
              <FaPencilAlt />
            </div>
          </div>
        </div>
        {note.content}
      </div>
    </div>
  )
}

export default Note
