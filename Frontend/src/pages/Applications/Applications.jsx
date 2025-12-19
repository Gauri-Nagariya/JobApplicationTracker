import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "../../index.css";

const Applications = () => {
  return (
     <div className='glass'>
      <div className="w-full bg-transparent backdrop-blur-none fixed top-0 z-40">
        <ul className="flex gap-8 px-8 pt-18 text-white/90 font-semibold">
          <li>
            <Link to="">Add Applications</Link>
          </li>
          <li>
            <Link to="ApplicationsCard">Your Applications</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}

export default Applications