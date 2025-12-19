import { Progress, Rate, Card } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfileCompletion = ({ items }) => {
  const { user } = useContext(AuthContext);
  const [completion, setCompletion] = useState(0);
  const [rating, setRating] = useState(0); // ⭐ stars value
  const [missingProfileItems, setMissingProfileItems] = useState([]);


  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!user) return;

    fetch(`${backendURL}/api/profile/completion`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCompletion(data.profileCompletion);

        // ⭐ Convert completion % → stars (out of 5)
        const stars = Math.round((data.profileCompletion / 100) * 5);
        setRating(stars);
      })
      .catch((err) => console.error(err));
  }, [user]);

useEffect(() => {
  console.log("Fetching profile...");

  fetch(`${backendURL}/api/profile`, {
    credentials: "include",
  })
    .then(res => {
      console.log("Profile API status:", res.status);
      return res.json();
    })
    .then(profile => {
      console.log("Profile data:", profile);

      const missing = [];

    //   const missing = [];

// PHONE → must exist AND be 10 digits
if (
  profile.user.phone === undefined ||
  profile.user.phone === null ||
  String(profile.user.phone).trim().length < 10
) {
  missing.push({
    id: 1,
    name: "Phone",
    description: "Add your phone number",
    link: "/profile#phone",
  });
}

// LOCATION → empty string check
if (!profile.user.location || profile.user.location.trim() === "") {
  missing.push({
    id: 2,
    name: "Location",
    description: "Add your location",
    link: "/profile#location",
  });
}

if (!profile.user.currentRole || profile.user.currentRole.trim() === "") {
  missing.push({
    id: 3,
    name: "currentRole",
    description: "Add your Current Role",
    link: "/profile#currentRole",
  });
}

if (!profile.user.experienceLevel || profile.user.experienceLevel.trim() === "") {
  missing.push({
    id: 4,
    name: "Experience Level",
    description: "Add your Experience Level",
    link: "/profile#experienceLevel",
  });
}

// SKILLS → array length check
if (!Array.isArray(profile.user.skills) || profile.user.skills.length === 0) {
  missing.push({
    id: 5,
    name: "Skills",
    description: "Add your skills",
    link: "/profile#skills",
  });
}

if (!profile.user.Portfolio || profile.user.Portfolio.trim() === "") {
  missing.push({
    id: 6,
    name: "Portfolio Link",
    description: "Add your Portfolio Link",
    link: "/profile#experienceLevel",
  });
}

setMissingProfileItems(missing);
    if (!profile.user.GitHub || profile.user.GitHub.trim() === "") {
  missing.push({
    id: 7,
    name: "GitHub Link",
    description: "Add your GitHub Link",
    link: "/profile#GitHub",
  });
}if (!profile.user.LinkedIn || profile.user.LinkedIn.trim() === "") {
  missing.push({
    id: 8,
    name: "LinkedIn Link",
    description: "Add your LinkedIn Link",
    link: "/profile#LinkedIn",
  });
}  console.log("missing data:", missing);


    //   setMissingProfileItems(missing);
    })
    .catch(err => console.error("Fetch error:", err));
}, []);


  return (
    <div>

        <p className="text-xl font-semibold py-4">Check how complete is my job profile?</p>

    <div className="flex flex-row gap-6">
      {/* Profile Overview Card */}
      <Card title="Profile Overview" className="w-full">
        <h3 className="mb-2">Profile Completion</h3>
        <Progress percent={completion} />

        <h3 className="mt-4 mb-2">Profile Strength</h3>
        <Rate disabled value={rating} />
        <p className="text-sm text-gray-500 mt-1">
          {rating} / 5 stars
        </p>
      </Card>

      {/* Missing Profile Items */}
      <div className="p-4 bg-white shadow rounded-md w-full">
        <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
        <ul className="space-y-3">


{/* Missing Profile Items */}
<div className="p-4 bg-white shadow rounded-md w-full">
  {/* <h2 className="text-xl font-semibold mb-4">
    Complete Your Profile
  </h2> */}

  {missingProfileItems.length === 0 ? (
    <p className="text-sm text-green-600">
      🎉 Your profile is fully complete!
    </p>
  ) : (
    <ul className="space-y-3">
      {missingProfileItems.map(item => (
        <li
          key={item.id}
          className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 transition"
        >
          <div>
            <p className="font-medium capitalize">{item.name}</p>
            <p className="text-sm text-gray-500">
              {item.description}
            </p>
          </div>

          <a
            href={item.link}
            className="text-blue-600 font-semibold hover:underline"
          >
            Complete
          </a>
        </li>
      ))}
    </ul>
  )}
</div>



        </ul>
      </div>
    </div>
    {/* <div className="bg-amber-200 w-40 h-40">
    </div> */}

    </div>
  );
};

export default ProfileCompletion;
