import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col justify-around items-center align-middle px-50 py-50">
      <p className="text-[#388087] font-semibold text-xl text-center justify-center">
        Manage your entire job search from a single, organized platform. Keep track of applications, deadlines, interviews, and progress without the stress of scattered notes or forgotten follow-ups. Stay focused, stay prepared, and move closer to your career goals with clarity and confidence.
      </p>
      <a href="/Register" className="text-[#388087] font-semibold border-3 rounded px-8 py-2 my-8 hover:transition-transform hover:scale-103">Get Started</a>
    </div>
  );
};

export default Home;
