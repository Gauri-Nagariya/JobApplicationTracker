// import { Progress, Rate, Card } from "antd";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import "../../index.css";

// const ProfileCompletion = ({ items }) => {
//   const { user } = useContext(AuthContext);
//   const [completion, setCompletion] = useState(0);
//   const [rating, setRating] = useState(0); // ⭐ stars value
//   const [missingProfileItems, setMissingProfileItems] = useState([]);

//   const backendURL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     if (!user) return;

//     fetch(`${backendURL}/profile/completion`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setCompletion(data.profileCompletion);

//         // ⭐ Convert completion % → stars (out of 5)
//         const stars = Math.round((data.profileCompletion / 100) * 5);
//         setRating(stars);
//       })
//       .catch((err) => console.error(err));
//   }, [user]);

//   useEffect(() => {
//     console.log("Fetching profile...");

//     fetch(`${backendURL}/profile`, {
//       credentials: "include",
//     })
//       .then((res) => {
//         console.log("Profile API status:", res.status);
//         return res.json();
//       })
//       .then((profile) => {
//         console.log("Profile data:", profile);

//         const missing = [];

//         //   const missing = [];

//         // PHONE → must exist AND be 10 digits
//         if (
//           profile.user.phone === undefined ||
//           profile.user.phone === null ||
//           String(profile.user.phone).trim().length < 10
//         ) {
//           missing.push({
//             id: 1,
//             name: "Phone",
//             description: "Add your phone number",
//             link: "/profile#phone",
//           });
//         }

//         // LOCATION → empty string check
//         if (!profile.user.location || profile.user.location.trim() === "") {
//           missing.push({
//             id: 2,
//             name: "Location",
//             description: "Add your location",
//             link: "/profile#location",
//           });
//         }

//         if (
//           !profile.user.currentRole ||
//           profile.user.currentRole.trim() === ""
//         ) {
//           missing.push({
//             id: 3,
//             name: "currentRole",
//             description: "Add your Current Role",
//             link: "/profile#currentRole",
//           });
//         }

//         if (
//           !profile.user.experienceLevel ||
//           profile.user.experienceLevel.trim() === ""
//         ) {
//           missing.push({
//             id: 4,
//             name: "Experience Level",
//             description: "Add your Experience Level",
//             link: "/profile#experienceLevel",
//           });
//         }

//         // SKILLS → array length check
//         if (
//           !Array.isArray(profile.user.skills) ||
//           profile.user.skills.length === 0
//         ) {
//           missing.push({
//             id: 5,
//             name: "Skills",
//             description: "Add your skills",
//             link: "/profile#skills",
//           });
//         }

//         if (!profile.user.Portfolio || profile.user.Portfolio.trim() === "") {
//           missing.push({
//             id: 6,
//             name: "Portfolio Link",
//             description: "Add your Portfolio Link",
//             link: "/profile#experienceLevel",
//           });
//         }

//         setMissingProfileItems(missing);
//         if (!profile.user.GitHub || profile.user.GitHub.trim() === "") {
//           missing.push({
//             id: 7,
//             name: "GitHub Link",
//             description: "Add your GitHub Link",
//             link: "/profile#GitHub",
//           });
//         }
//         if (!profile.user.LinkedIn || profile.user.LinkedIn.trim() === "") {
//           missing.push({
//             id: 8,
//             name: "LinkedIn Link",
//             description: "Add your LinkedIn Link",
//             link: "/profile#LinkedIn",
//           });
//         }
//         console.log("missing data:", missing);

//         //   setMissingProfileItems(missing);
//       })
//       .catch((err) => console.error("Fetch error:", err));
//   }, []);

//   return (
//     <div className=" bg-[#080328] h-full p-4">
//       <p className="text-xl font-semibold py-4">
//         Check how complete is my job profile?
//       </p>

//       <div className="flex flex-row gap-6">
//         {/* Profile Overview Card */}
//         <Card
//           title={<span className="text-white !text-xl !font-semibold">Profile Overview</span>}
//           className="w-full !bg-white/20 !text-white !border-0"
//         >
//           <h3 className="mb-2 text-lg font-semibold">Profile Completion</h3>
//           <Progress
//             percent={completion}
//             format={(percent) => <span className="text-white">{percent}%</span>}
//           />
//           <h3 className="mt-4 mb-2 text-lg">Profile Strength</h3>
//           <Rate disabled value={rating} />
//           <p className="text-lg text-white mt-1">{rating} / 5 stars</p>
//         </Card>

//         {/* Missing Profile Items */}
//         <div className="p-4 bg-white/20 shadow rounded-md w-full">
//           <h2 className="text-xl text-white font-semibold mb-4">
//             Complete Your Profile
//           </h2>
//           <ul className="space-y-3">
//             {/* Missing Profile Items */}
//             <div className="p-4  font-semibold !text-lg text-white shadow rounded-md w-full">
//               {/* <h2 className="text-xl font-semibold mb-4">
//     Complete Your Profile
//   </h2> */}

//               {missingProfileItems.length === 0 ? (
//                 <p className="text-lg text-green-500">
//                   🎉 Your profile is fully complete!
//                 </p>
//               ) : (
//                 <ul className="space-y-3">
//                   {missingProfileItems.map((item) => (
//                     <li
//                       key={item.id}
//                       className="flex justify-between items-center p-3 border rounded-md hover:bg-white/20 transition"
//                     >
//                       <div>
//                         <p className="font-medium capitalize">{item.name}</p>
//                         <p className="text-sm text-white">{item.description}</p>
//                       </div>

//                       <a
//                         href={item.link}
//                         className="!text-blue-500 font-semibold hover:underline"
//                       >
//                         Complete
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </ul>
//         </div>
//       </div>
//       {/* <div className="bg-amber-200 w-40 h-40">
//     </div> */}
//     </div>
//   );
// };

// export default ProfileCompletion;




import { Progress, Rate, Card } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../index.css";

const ProfileCompletion = () => {
  const { user } = useContext(AuthContext);
  const [completion, setCompletion] = useState(0);
  const [rating, setRating] = useState(0);
  const [missingProfileItems, setMissingProfileItems] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // ---------------- PROFILE COMPLETION ----------------
  useEffect(() => {
    if (!user) return;

    fetch(`${backendURL}/profile/completion`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCompletion(data.profileCompletion);
        setRating(Math.round((data.profileCompletion / 100) * 5));
      })
      .catch(console.error);
  }, [user]);

  // ---------------- PROFILE DETAILS ----------------
  useEffect(() => {
    fetch(`${backendURL}/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((profile) => {
        const missing = [];

        if (!profile.user.phone || String(profile.user.phone).length < 10) {
          missing.push({
            id: 1,
            name: "Phone",
            description: "Add your phone number",
            link: "/profile#phone",
          });
        }

        if (!profile.user.location?.trim()) {
          missing.push({
            id: 2,
            name: "Location",
            description: "Add your location",
            link: "/profile#location",
          });
        }

        if (!profile.user.currentRole?.trim()) {
          missing.push({
            id: 3,
            name: "Current Role",
            description: "Add your current role",
            link: "/profile#currentRole",
          });
        }

        if (!profile.user.experienceLevel?.trim()) {
          missing.push({
            id: 4,
            name: "Experience Level",
            description: "Add your experience level",
            link: "/profile#experienceLevel",
          });
        }

        if (!profile.user.skills?.length) {
          missing.push({
            id: 5,
            name: "Skills",
            description: "Add your skills",
            link: "/profile#skills",
          });
        }

        if (!profile.user.Portfolio?.trim()) {
          missing.push({
            id: 6,
            name: "Portfolio",
            description: "Add your portfolio link",
            link: "/profile#portfolio",
          });
        }

        if (!profile.user.GitHub?.trim()) {
          missing.push({
            id: 7,
            name: "GitHub",
            description: "Add your GitHub link",
            link: "/profile#github",
          });
        }

        if (!profile.user.LinkedIn?.trim()) {
          missing.push({
            id: 8,
            name: "LinkedIn",
            description: "Add your LinkedIn link",
            link: "/profile#linkedin",
          });
        }

        setMissingProfileItems(missing);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-[#080328] h-full p-4">
      <p className="text-lg md:text-xl font-semibold py-4 text-white">
        Check how complete is my job profile?
      </p>

      {/* MAIN RESPONSIVE LAYOUT */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* PROFILE OVERVIEW */}
        <Card
          title={
            <span className="text-white text-lg md:text-xl font-semibold">
              Profile Overview
            </span>
          }
          className="w-full !bg-white/20 !text-white !border-0"
        >
          <h3 className="mb-2 text-base md:text-lg font-semibold">
            Profile Completion
          </h3>

          <Progress
            percent={completion}
            format={(p) => <span className="text-white">{p}%</span>}
          />

          <h3 className="mt-4 mb-2 text-base md:text-lg">
            Profile Strength
          </h3>

          <Rate disabled value={rating} />
          <p className="text-sm md:text-lg text-white mt-1">
            {rating} / 5 stars
          </p>
        </Card>

        {/* MISSING PROFILE ITEMS */}
        <div className="p-4 bg-white/20 shadow rounded-md w-full">
          <h2 className="text-lg md:text-xl text-white font-semibold mb-4">
            Complete Your Profile
          </h2>

          {missingProfileItems.length === 0 ? (
            <p className="text-green-400 text-base md:text-lg">
              🎉 Your profile is fully complete!
            </p>
          ) : (
            <ul className="space-y-3">
              {missingProfileItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 p-3 border border-white/20 rounded-md hover:bg-white/20 transition"
                >
                  <div>
                    <p className="font-medium capitalize text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-white/80">
                      {item.description}
                    </p>
                  </div>

                  <a
                    href={item.link}
                    className="text-blue-400 font-semibold hover:underline"
                  >
                    Complete
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
