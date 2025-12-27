// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import userImageGif from "../assets/icons8-user.gif";
// import userImageStatic from "../assets/icons8-user-48.png";
// import { AuthContext } from "../context/AuthContext";
// import "../index.css";


// const Nav = () => {
//   const { user, logout } = useContext(AuthContext);
//   console.log("Nav user:", user);


//   return (
//     <nav className="backdrop-blur-md bg-[rgba(211,50,50,0.03)]  flex justify-between px-8 py-2 fixed w-full z-50">
//   <h1 className="text-2xl text-[#F6F6F2] font-bold flex items-center">
//     Job Application Tracker
//   </h1>

//   <ul className="flex gap-12 text-lg text-[#F6F6F2] items-center">
//     {user && (
//       <>
//       <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/Dashboard">Dashboard</Link>
//         </li>
//         <li>
//           <Link to="/applications">Applications</Link>
//         </li>
//         <li>
//           <Link to="/profile">Profile</Link>
//         </li>
//         <li className="flex items-center gap-2  text-white text-lg whitespace-nowrap cursor-pointer">
//           Hi! {user.username || "User"}
//           <div className="w-1/2 flex justify-center items-center">
//             <div className="group relative w-[90%] overflow-hidden rounded-2xl">
//               {/* Static image */}
//               <img
//                 src={userImageStatic}
//                 alt="Profile Illustration"
//                 className="w-full h-full object-cover rounded-2xl"
//               />
//             </div>
//           </div>
//         </li>
//       </>
//     )}

//     {!user && (
//       <>
//         <li>
//           <Link to="/Dashboard">Dashboard</Link>
//         </li>
//         <li>
//           <Link to="/applications">Applications</Link>
//         </li>
//         <li>
//           <Link to="/profile">Profile</Link>
//         </li>
//       </>
//     )}
//   </ul>
// </nav>

//   );
// };

// export default Nav;



import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userImageGif from "../assets/icons8-user.gif";
import userImageStatic from "../assets/icons8-user-48.png";
import { AuthContext } from "../context/AuthContext";
import "../index.css";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  console.log("Nav user:", user);

  return (
  <nav className="backdrop-blur-md bg-[rgba(211,50,50,0.03)] fixed w-full z-50 px-6 md:px-8 py-3">
    {/* ===== TOP ROW ===== */}
    <div className="flex justify-between items-center">
      {/* Title */}
      <h1 className="text-xl text-[#F6F6F2] font-semibold md:font-bold md:text-2xl">
        {/* Job Application Tracker */}
        CareerBoard
      </h1>

      {/* ===== DESKTOP NAV (INLINE) ===== */}
      <ul className="hidden md:flex gap-12 text-lg text-[#F6F6F2] items-center">
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
              <Link to="/Resume">Resume Checker</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li className="flex items-center gap-2 text-white whitespace-nowrap cursor-pointer">
              Hi! {user.username || "User"}
              <div className="w-8 h-8 flex justify-center items-center">
                <img
                  src={userImageStatic}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
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

      {/* ===== MOBILE MENU BUTTON ===== */}
      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
    </div>

    {/* ===== MOBILE DROPDOWN ===== */}
    {menuOpen && (
      <ul className="md:hidden flex flex-col gap-6 text-lg text-white mt-6 pb-4">
        {user && (
          <>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/applications" onClick={() => setMenuOpen(false)}>
                Applications
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
            </li>
            <li className="flex items-center gap-2">
              Hi! {user.username || "User"}
              <img
                src={userImageStatic}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </li>
          </>
        )}

        {!user && (
          <>
            <li>
              <Link to="/Dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/applications" onClick={() => setMenuOpen(false)}>
                Applications
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
            </li>
          </>
        )}
      </ul>
    )}
  </nav>
);

};

export default Nav;
