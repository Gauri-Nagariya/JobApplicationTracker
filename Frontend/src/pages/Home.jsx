import React, { useContext } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import bgDashboard from "../assets/bg3.jpg";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
   const { user, logout } = useContext(AuthContext);
    console.log("Nav user:", user);
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${bgDashboard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="glass">
        <div className=" flex flex-row w-full h-fit">
          {/* Left side: text */}
          <div className="flex-1 flex flex-col text-start w-[50vw] py-30 px-16">
            <h1 className="text-6xl md:text-7xl text-white font-bold leading-18">
              Take Charge of <br />
              Your Career, Fully <br />
              Organized and <br />
              One Step Ahead.
            </h1>
            <p className="text-white text-2xl mt-6 max-w-lg">
              Finding your dream job can be overwhelming—but managing your
              applications doesn’t have to be. Track applications, deadlines,
              interviews, and follow-ups effortlessly in one place. Stay
              organized, stay prepared, and take control of your career journey
              with ease.{" "}
            </p>
          </div>

          {/* Right side: button */}
          <div className="flex flex-col w-[50vw] py-60 h-full items-center">
            {use && (
              <>
               <Link
              to="/profile"
              className="
    relative inline-block w-fit my-2 px-8 py-4 rounded-full
    bg-white text-black font-semibold
    border border-white
    transition-all duration-300 in-ease-out
    hover:scale-102
    hover:-rotate-4
    hover:shadow-[0_0_12px_rgba(56,128,135,0.6),0_0_30px_rgba(56,128,135,0.4)]
    hover:border-[#fbfeff]
  
  "
            >
              GET STARTED ➜
            </Link>
              </>
            )}

            {!user && (
              <>
               <Link
              to="/register"
              className="
    relative inline-block w-fit my-2 px-8 py-4 rounded-full
    bg-white text-black font-semibold
    border border-white
    transition-all duration-300 in-ease-out
    hover:scale-102
    hover:-rotate-4
    hover:shadow-[0_0_12px_rgba(56,128,135,0.6),0_0_30px_rgba(56,128,135,0.4)]
    hover:border-[#fbfeff]
  
  "
            >
              GET STARTED ➜
            </Link>
              </>
            )}
           

            <a
              href="#about"
              className="relative inline-block w-fit my-4 px-16 py-4 rounded-full
    bg-black text-white font-semibold
    border border-none
    transition-all duration-300 in-ease-out
    hover:scale-102
    hover:-rotate-4
    hover:shadow-[0_0_18px_rgba(255,255,255,0.6),0_0_30px_rgba(255,255,255,0.4)]
    hover:border-[#fbfeff] scroll-smooth"
            >
              ABOUT
            </a>
          </div>
        </div>

        <div
          id="about"
          className="w-full px-6 md:px-12 py-20 space-y-20 scroll-smooth"
        >
          {/* ===== ABOUT PROJECT ===== */}
          <div
            className="
    max-w-5xl mx-auto rounded-3xl p-10
    bg-white/6 shadow-2xl
    transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_18px_rgba(255,255,255,0.3),0_0_10px_rgba(255,255,255,0.2)]"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              About the Project
            </h2>

            <p className="text-white/90 leading-relaxed text-xl">
              The Job Application Tracker is a centralized platform built to
              simplify and organize the entire job search process. Instead of
              managing multiple spreadsheets, notes, and emails, users can
              store, track, and update all job applications in one secure place.
              The application helps users stay consistent, avoid missed
              deadlines, and focus more on interview preparation and skill
              development.
            </p>
          </div>

          {/* ===== HOW IT WORKS ===== */}
          <div className="max-w-6xl mx-auto ">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-12 text-center ">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              {/* Step 1 */}
              <div
                className="
        rounded-2xl p-8
          bg-white/6 shadow-2xl
    transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_18px_rgba(255,255,255,0.3),0_0_10px_rgba(255,255,255,0.2)]  hover:-translate-y-2
      "
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  1. Add Applications
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Users can add job applications with company name, role,
                  experience level, resume, cover letter, and application date.
                  All data is stored securely and can be edited at any time.
                </p>
              </div>

              {/* Step 2 */}
              <div
                className="
        rounded-2xl p-8
          bg-white/6 shadow-2xl
    transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_18px_rgba(255,255,255,0.3),0_0_10px_rgba(255,255,255,0.2)]  hover:-translate-y-2
      "
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  2. Track Progress
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Each application has a clear status such as Applied, Interview
                  Scheduled, Offer Received, or Rejected. This helps users
                  quickly understand where they stand in their job search.
                </p>
              </div>

              {/* Step 3 */}
              <div
                className="
   rounded-2xl p-8
          bg-white/6 shadow-2xl
    transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_18px_rgba(255,255,255,0.3),0_0_10px_rgba(255,255,255,0.2)]
        hover:-translate-y-2
      "
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  3. Stay Organized
                </h3>
                <p className="text-white/90 leading-relaxed">
                  By keeping everything in one dashboard, users avoid missed
                  deadlines, reduce stress, and stay focused on interview
                  preparation instead of managing scattered information.
                </p>
              </div>
            </div>
          </div>

          {/* ===== TECH STACK ===== */}
          <div
            className="
    max-w-5xl mx-auto rounded-3xl p-10
     bg-white/6 shadow-2xl
    transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_18px_rgba(255,255,255,0.3),0_0_10px_rgba(255,255,255,0.2)]  hover:-translate-y-2
  "
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
              Technology Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
              <div>
                <p className="text-lg font-semibold mb-1">Frontend</p>
                <p className="text-white/80">React.js, Tailwind CSS</p>
              </div>

              <div>
                <p className="text-lg font-semibold mb-1">Backend</p>
                <p className="text-white/80">Node.js, Express.js</p>
              </div>

              <div>
                <p className="text-lg font-semibold mb-1">Database</p>
                <p className="text-white/80">MongoDB (Atlas)</p>
              </div>

              <div>
                <p className="text-lg font-semibold mb-1">
                  Authentication & Tools
                </p>
                <p className="text-white/80">
                  JWT Authentication, Axios, Ant Design
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
