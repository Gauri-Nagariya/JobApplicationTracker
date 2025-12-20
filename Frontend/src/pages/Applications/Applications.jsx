import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "../../index.css";

const Applications = () => {
  return (
     <div>
      <div className="w-full bg-transparent backdrop-blur-none">
        <ul className="flex gap-8 px-8 pt-18 text-white/90 font-semibold">
          <li className="bg-white/30 rounded py-1 px-4 hover:!bg-transparent hover:!shadow-[0_0_20px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,0.1)]">
            <Link to="">Add Applications</Link>
          </li>
          <li className="bg-white/30 rounded py-1 px-4 hover:!bg-transparent hover:!shadow-[0_0_20px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,0.1)]">
            <Link to="ApplicationsCard">Your Applications</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}

export default Applications