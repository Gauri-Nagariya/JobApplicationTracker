// import React, { useContext, useEffect, useState } from "react";
// import { Card, Statistic } from "antd";
// import {
//   FileTextOutlined,
//   ClockCircleOutlined,
//   CloseCircleOutlined,
//   TrophyOutlined,
//   FireOutlined,
// } from "@ant-design/icons";
// import { AuthContext } from "../../context/AuthContext";

// const ApplicationsByStatus = () => {
//   const { user } = useContext(AuthContext);
//   const [total, setTotal] = useState(0);
//   const [applications, setApplications] = useState([]);

//   const backendURL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     if (!user) return;

//     fetch(`${backendURL}/applications`, { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Applications API response:", data);
//         // set applications to the array inside the response
//         setApplications(data.applications || data || []); // adjust based on API shape
//         setTotal((data.applications || data || []).length);
//       })
//       .catch((err) => console.error(err));
//   }, [user]);

//   const stats = {
//     applied: applications.filter((app) => app.status === "Applied").length,
//     interview: applications.filter(
//       (app) => app.status === "Interview Scheduled"
//     ).length,
//     rejected: applications.filter((app) => app.status === "Rejected").length,
//     offer: applications.filter((app) => app.status === "Offer").length,
//   };

//   const activeApplications = stats.applied + stats.interview;
//   const activePercentage =
//     total > 0 ? Math.round((activeApplications / total) * 100) : 0;

//   return (
//     <div className="space-y-6">
//       {/* 🔥 Total Applications */}
//       <Card className="shadow-sm !bg-white/20 !border-0">
//         <Statistic
//           title={<span className="text-white text-2xl !font-semibold">Total Applications</span>}
//           value={total}
//   prefix={<FileTextOutlined />}
//   valueStyle={{ color: 'white', fontSize: "30px" }}
//         />
//         <p className="text-lg text-white mt-1">
//           Jobs you’ve applied to so far
//         </p>
//         <p className="text-mg text-white">
//           Consistency matters — keep applying
//         </p>
//       </Card>

//       {/* 📊 Applications by Status */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Applications by Status</h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <Card className="hover:shadow-md transition !bg-white/20 !border-0">
//             <Statistic
//               title={<span className="text-white text-2xl !font-semibold">Applied</span>}
//               value={stats.applied}
//               prefix={<ClockCircleOutlined />}
//                 valueStyle={{ color: 'white', fontSize: "30px" }}
//             />
//           </Card>

//           <Card className="hover:shadow-md transition !bg-white/20 !border-0">
//             <Statistic
//               title={<span className="text-white text-2xl !font-semibold">Interview</span>}
//               value={stats.interview}
//               prefix={<FireOutlined />}
//                 valueStyle={{ color: 'white', fontSize: "30px" }}
//             />
//           </Card>

//           <Card className="hover:shadow-md transition !bg-white/20 !border-0">
//             <Statistic
//               title={<span className="text-white text-2xl !font-semibold">Rejected</span>}
//               value={stats.rejected}
//               prefix={<CloseCircleOutlined />}
//                 valueStyle={{ color: 'white', fontSize: "30px" }}
//             />
//           </Card>

//           <Card className="hover:shadow-md transition !bg-white/20 !border-0">
//             <Statistic
//               title={<span className="text-white text-2xl !font-semibold">Offer</span>}
//               value={stats.offer}
//               prefix={<TrophyOutlined />}
//                 valueStyle={{ color: 'white', fontSize: "30px" }}
//             />
//           </Card>
//         </div>
//       </div>

//       {/* 🚀 Active Applications */}
//       <Card className="border-l-4 border-blue-500 bg-blue-50 !bg-white/20 !border-0">
//         <Statistic
//           title={<span className="text-white text-2xl !font-semibold">Active Applications</span>}
//           value={activeApplications}
//           prefix={<FireOutlined />}
//             valueStyle={{ color: 'white', fontSize: "30px" }}
//         />
//         <p className="text-lg text-white mt-1">
//           Still in progress (Applied + Interview)
//         </p>
//         <p className="text-mg text-white">
//           {activePercentage}% of your applications are still alive
//         </p>
//       </Card>
//     </div>
//   );
// };

// export default ApplicationsByStatus;






import React, { useContext, useEffect, useState } from "react";
import { Card, Statistic } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";

const ApplicationsByStatus = () => {
  const { user } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [applications, setApplications] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!user) return;

    fetch(`${backendURL}/applications`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const apps = data.applications || data || [];
        setApplications(apps);
        setTotal(apps.length);
      })
      .catch(console.error);
  }, [user]);

  const stats = {
    applied: applications.filter((a) => a.status === "Applied").length,
    interview: applications.filter(
      (a) => a.status === "Interview Scheduled"
    ).length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
    offer: applications.filter((a) => a.status === "Offer").length,
  };

  const activeApplications = stats.applied + stats.interview;
  const activePercentage =
    total > 0 ? Math.round((activeApplications / total) * 100) : 0;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* 🔥 Total Applications */}
      <Card className="!bg-white/20 !border-0 p-3 md:p-6">
        <Statistic
          title={
            <span className="text-white text-lg md:text-2xl font-semibold">
              Total Applications
            </span>
          }
          value={total}
          prefix={<FileTextOutlined />}
          valueStyle={{
            color: "white",
            fontSize: "clamp(22px, 5vw, 32px)",
          }}
        />
        <p className="text-sm md:text-lg text-white mt-1">
          Jobs you’ve applied to so far
        </p>
        <p className="text-xs md:text-sm text-white">
          Consistency matters — keep applying
        </p>
      </Card>

      {/* 📊 Applications by Status */}
      <div>
        <h2 className="text-base md:text-lg font-semibold mb-3 text-white">
          Applications by Status
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Applied", value: stats.applied, icon: <ClockCircleOutlined /> },
            { label: "Interview", value: stats.interview, icon: <FireOutlined /> },
            { label: "Rejected", value: stats.rejected, icon: <CloseCircleOutlined /> },
            { label: "Offer", value: stats.offer, icon: <TrophyOutlined /> },
          ].map((item) => (
            <Card
              key={item.label}
              className="!bg-white/20 !border-0 p-2 md:p-4"
            >
              <Statistic
                title={
                  <span className="text-white text-sm md:text-xl font-semibold">
                    {item.label}
                  </span>
                }
                value={item.value}
                prefix={item.icon}
                valueStyle={{
                  color: "white",
                  fontSize: "clamp(20px, 4vw, 30px)",
                }}
              />
            </Card>
          ))}
        </div>
      </div>

      {/* 🚀 Active Applications */}
      <Card className="!bg-white/20 !border-0 p-3 md:p-6">
        <Statistic
          title={
            <span className="text-white text-lg md:text-2xl font-semibold">
              Active Applications
            </span>
          }
          value={activeApplications}
          prefix={<FireOutlined />}
          valueStyle={{
            color: "white",
            fontSize: "clamp(22px, 5vw, 32px)",
          }}
        />
        <p className="text-sm md:text-lg text-white mt-1">
          Still in progress (Applied + Interview)
        </p>
        <p className="text-xs md:text-sm text-white">
          {activePercentage}% of your applications are still alive
        </p>
      </Card>
    </div>
  );
};

export default ApplicationsByStatus;
