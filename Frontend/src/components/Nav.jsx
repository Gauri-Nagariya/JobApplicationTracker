import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userImageGif from "../assets/icons8-user.gif";
import userImageStatic from "../assets/icons8-user-48.png";
import { AuthContext } from "../context/AuthContext";
import "../index.css";


const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  console.log("Nav user:", user);


  return (
    <nav className="backdrop-blur-md bg-[rgba(211,50,50,0.03)]  flex justify-between px-8 py-2 fixed w-full z-50">
  <h1 className="text-2xl text-[#F6F6F2] font-bold flex items-center">
    Job Application Tracker
  </h1>

  <ul className="flex gap-12 text-lg text-[#F6F6F2] items-center">
    {user && (
      <>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/applications">Applications</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li className="flex items-center gap-2  text-white text-lg whitespace-nowrap cursor-pointer">
          Hi! {user.username || "User"}
          <div className="w-1/2 flex justify-center items-center">
            <div className="group relative w-[90%] overflow-hidden rounded-2xl">
              {/* Static image */}
              <img
                src={userImageStatic}
                alt="Profile Illustration"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </li>
      </>
    )}

    {!user && (
      <>
        <li>
          <Link to="/Dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/applications">Applications</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </>
    )}
  </ul>
</nav>

  );
};

export default Nav;
