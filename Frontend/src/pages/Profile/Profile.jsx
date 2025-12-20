import { useContext, useState } from "react";   // ✅ import useState
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../index.css";


const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [showConfirm, setShowConfirm] = useState(false); // ✅ boolean

  const handleLogout = async () => {
    await logout();
    setShowConfirm(false);
  };

  return (
    <div>
      {/* <div className="bg-black/90 backdrop-blur-md h-28 w-full"> */}
      <div className="w-full backdrop-blur-none top-0 z-40 h-26 ">
        <ul className="flex gap-8 px-8 pt-18 text-white/90 font-semibold">
          <li className="bg-white/30 rounded py-1 px-4 hover:!bg-transparent hover:!shadow-[0_0_20px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,0.1)]">
            <Link to="">Profile</Link>
          </li>
          <li className="bg-white/30 rounded py-1 px-4 hover:!bg-transparent hover:!shadow-[0_0_20px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,0.1)]">
            <Link to="settings">Settings</Link>
          </li>
          <li className="bg-white/30 rounded py-1 px-4 hover:!bg-transparent hover:!shadow-[0_0_20px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,0.1)]">
            <button
              onClick={() => setShowConfirm(true)}
              className="cursor-pointer"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* 🔥 LOGOUT CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="glass min-h-screen fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className=" border w-100 h-60 p-10 text-center 
           rounded-2xl p-8
          bg-white/6 shadow-2xl
    transition-all duration-300 hover:shadow-[0_0_18px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]">
            <p className="text-2xl py-2 font-bold font-semibold text-whhite/90 mb-4">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/90 text-black rounded-md hover:opacity-80  cursor-pointer"
              >
                Yes
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-white-90 text-white/90 rounded-md hover:bg-white/10 cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Profile;
