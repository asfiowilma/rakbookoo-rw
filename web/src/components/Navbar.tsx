import { useAuth } from '@redwoodjs/auth'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  const { currentUser, logOut } = useAuth()

  if (!currentUser) return null

  return (
    <div className="navbar navbar-end w-full px-6">
      <div className="mr-2 font-medium">{currentUser.user_metadata.name}</div>
      <div className="dropdown-end dropdown">
        <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
          <div className="w-10 rounded-full">
            <img
              src={currentUser.user_metadata.avatar_url}
              alt={currentUser.user_metadata.name}
              referrerPolicy="no-referrer"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
        >
          <li>
            <a className="justify-between">Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a onClick={logOut}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
