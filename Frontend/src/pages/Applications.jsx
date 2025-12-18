import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Applications = () => {
  return (
     <div>
      <nav className="bg-[#eeeee2] h-26 w-full">
        <ul className="flex gap-8 px-8 pt-18 text-[#388087] font-semibold">
          <li>
            <Link to="">Add Applications</Link>
          </li>
          <li>
            <Link to="ApplicationsCard">Your Applications</Link>
          </li>
          {/* <li>
            <button
              // onClick={() => setShowConfirm(true)}
              className="cursor-pointer"
            >
              Filters
            </button>
          </li> */}
        </ul>
      </nav>

      {/* 🔥 LOGOUT CONFIRMATION MODAL */}
      {/* {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <p className="text-lg font-semibold text-[#388087] mb-4">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#388087] text-white rounded-md hover:opacity-90  cursor-pointer"
              >
                Yes
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-[#388087] text-[#388087] rounded-md hover:bg-gray-100 cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )} */}

      <Outlet />
    </div>
  )
}

export default Applications