import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "../../index.css";

const Applications = () => {
  return (
     <div className='md:pt-4 pt-22 md:p-2'>
      <div className="w-full bg-transparent backdrop-blur-none">
        <ul className="flex md:gap-8 md:px-8 md:pt-18 text-white/90 font-semibold justify-center md:justify-start gap-2 px-2">
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