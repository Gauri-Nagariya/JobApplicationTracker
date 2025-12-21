// import React, { useContext, useEffect, useState } from "react";
// import { Card, Statistic, Progress, Tag } from "antd";
// import {
//   RiseOutlined,
//   LinkOutlined,
//   ClockCircleOutlined,
// } from "@ant-design/icons";
// import { AuthContext } from "../../context/AuthContext";

// const SourceAndStrategy = () => {
//   const { user } = useContext(AuthContext);
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const backendURL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     if (!user) return;

//     fetch(`${backendURL}/applications`, { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Applications fetched:", data); // check the structure
//         const appsArray = Array.isArray(data) ? data : data.applications || [];
//         setApplications(appsArray);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch applications:", err);
//         setLoading(false);
//       });
//   }, [user]);

//   if (loading) return <p>Loading...</p>;

//   // Calculate stats
//   const totalApplications = applications.length;
//   const appliedCount = applications.filter(
//     (a) => a.status === "Applied"
//   ).length;
//   const interviewCount = applications.filter(
//     (a) => a.status === "Interview Scheduled"
//   ).length;
//   const offerCount = applications.filter((a) => a.status === "Offer").length;

//   const sources = applications.reduce((acc, app) => {
//     const src = app.appliedVia || "Unknown";
//     acc[src] = (acc[src] || 0) + 1;
//     return acc;
//   }, {});

//   const pendingFollowUps = applications.filter((app) => {
//     if (!app.updatedAt) return false;
//     const updatedDate = new Date(app.updatedAt);
//     const diffDays = (new Date() - updatedDate) / (1000 * 60 * 60 * 24);
//     return diffDays >= 10;
//   }).length;

//   const interviewRate = appliedCount
//     ? Math.round((interviewCount / appliedCount) * 100)
//     : 0;
//   const offerRate = interviewCount
//     ? Math.round((offerCount / interviewCount) * 100)
//     : 0;

//   return (
//     <div className="space-y-6 flex flex-col">
//       {/* 📈 Conversion Rates */}
//       <Card
//         title={
//           <span className="text-white text-2xl !font-semibold">
//             Conversion Rates
//           </span>
//         }
//         className="shadow-sm !bg-white/20 !border-0 !mb-8"
//       >
//         <div className="space-y-4 flex flex-row gap-8 my-6">
//           <div className="w-full !text-white">
//             <Statistic
//               title={
//                 <span className="text-white text-lg !font-semibold">
//                   Interview Conversion
//                 </span>
//               }
//               value={interviewRate}
//               suffix="%"
//               prefix={<RiseOutlined />}
//               valueStyle={{ color: "white", fontSize: "30px" }}
//             />
//             <Progress
//               percent={interviewRate}
//               size="small"
//               strokeColor="#f97316" // Orange bar
//               trailColor="rgba(255, 255, 255, 0.3)" // Darker track
//               valueStyle={{ color: "white", fontSize: "30px" }}
//               format={(percent) => (
//                 <span style={{ color: "white", fontSize: "16px" }}>
//                   {percent}%
//                 </span>
//               )}
//             />
//             <p className="text-md text-white">Interviews ÷ Applications</p>
//           </div>

//           <div className="w-full !text-white">
//             <Statistic
//               title={
//                 <span className="text-white text-lg !font-semibold">
//                   Offer Conversion
//                 </span>
//               }
//               value={offerRate}
//               suffix="%"
//               prefix={<RiseOutlined />}
//               valueStyle={{ color: "white", fontSize: "30px" }}
//             />
//             <Progress
//               percent={interviewRate}
//               size="small"
//               strokeColor="#f97316" // Orange bar
//               trailColor="rgba(255, 255, 255, 0.3)" // Darker track
//               format={(percent) => (
//                 <span style={{ color: "white", fontSize: "16px" }}>
//                   {percent}%
//                 </span>
//               )}
//             />
//             <p className="text-md text-white">Offers ÷ Interviews</p>
//           </div>
//         </div>
//       </Card>

//       <div className=" flex flex-row gap-6 text-white min-h-50">
//         {/* 🌍 Applications by Source */}
//         <Card
//           title={
//             <span className="text-white text-xl !font-semibold">
//               Applications by Source
//             </span>
//           }
//           className="shadow-sm !bg-white/20 !border-0 !w-full"
//         >
//           <div className="space-y-2">
//             {Object.entries(sources).map(([source, count]) => (
//               <div key={source} className="flex justify-between items-center">
//                 <span className="flex items-center gap-2 text-white text-lg">
//                   <LinkOutlined />
//                   {source}
//                 </span>
//                 <Tag color="blue" style={{ color: "black", fontSize: "18px" }}>
//                   {count}
//                 </Tag>
//               </div>
//             ))}
//           </div>
//           <p className="text-md text-white mt-3">
//             Focus more on sources with better conversions
//           </p>
//         </Card>

//         {/* ⏰ Pending Follow-Ups */}
//         <Card
//           title={
//             <span className="text-white text-xl !font-semibold">
//               Pending Follow-Ups{" "}
//             </span>
//           }
//           className="shadow-sm !bg-white/20 !border-0 !w-full"
//         >
//           <Statistic
//             value={pendingFollowUps}
//             prefix={<ClockCircleOutlined />}
//             valueStyle={{ color: "white", fontSize: "30px" }}
//           />
//           <p className="text-md text-white mt-1">
//             Applications not updated in 10+ days
//           </p>
//           <p className="text-sm text-white">
//             Following up improves response rates
//           </p>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default SourceAndStrategy;





import React, { useContext, useEffect, useState } from "react";
import { Card, Statistic, Progress, Tag } from "antd";
import {
  RiseOutlined,
  LinkOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";

const SourceAndStrategy = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!user) return;

    fetch(`${backendURL}/applications`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const appsArray = Array.isArray(data)
          ? data
          : data.applications || [];
        setApplications(appsArray);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (loading) return <p className="text-white">Loading...</p>;

  const totalApplications = applications.length;
  const appliedCount = applications.filter(a => a.status === "Applied").length;
  const interviewCount = applications.filter(
    a => a.status === "Interview Scheduled"
  ).length;
  const offerCount = applications.filter(a => a.status === "Offer").length;

  const sources = applications.reduce((acc, app) => {
    const src = app.appliedVia || "Unknown";
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});

  const pendingFollowUps = applications.filter(app => {
    if (!app.updatedAt) return false;
    const diffDays =
      (new Date() - new Date(app.updatedAt)) / (1000 * 60 * 60 * 24);
    return diffDays >= 10;
  }).length;

  const interviewRate = appliedCount
    ? Math.round((interviewCount / appliedCount) * 100)
    : 0;

  const offerRate = interviewCount
    ? Math.round((offerCount / interviewCount) * 100)
    : 0;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* 📈 Conversion Rates */}
      <Card
        title={
          <span className="text-white text-lg md:text-2xl font-semibold">
            Conversion Rates
          </span>
        }
        className="!bg-white/20 !border-0"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {[{
            title: "Interview Conversion",
            value: interviewRate,
            desc: "Interviews ÷ Applications"
          },{
            title: "Offer Conversion",
            value: offerRate,
            desc: "Offers ÷ Interviews"
          }].map((item) => (
            <div key={item.title} className="w-full">
              <Statistic
                title={
                  <span className="text-white text-sm md:text-lg font-semibold">
                    {item.title}
                  </span>
                }
                value={item.value}
                suffix="%"
                prefix={<RiseOutlined />}
                valueStyle={{
                  color: "white",
                  fontSize: "clamp(22px, 5vw, 30px)",
                }}
              />
              <Progress
                percent={item.value}
                size="small"
                strokeColor="#f97316"
                trailColor="rgba(255,255,255,0.3)"
                format={(p) => (
                  <span className="text-white text-sm">{p}%</span>
                )}
              />
              <p className="text-xs md:text-sm text-white">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Bottom Cards */}
      <div className="flex flex-col md:flex-row gap-4 md:pt-6 pt-4 md:gap-6">
        {/* 🌍 Applications by Source */}
        <Card
          title={
            <span className="text-white text-base md:text-xl font-semibold">
              Applications by Source
            </span>
          }
          className="!bg-white/20 !border-0 w-full"
        >
          <div className="space-y-2">
            {Object.entries(sources).map(([source, count]) => (
              <div key={source} className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm md:text-lg text-white">
                  <LinkOutlined /> {source}
                </span>
                <Tag color="blue" style={{ color: "black" }}>
                  {count}
                </Tag>
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm text-white mt-3">
            Focus more on sources with better conversions
          </p>
        </Card>

        {/* ⏰ Pending Follow-Ups */}
        <Card
          title={
            <span className="text-white text-base md:text-xl font-semibold">
              Pending Follow-Ups
            </span>
          }
          className="!bg-white/20 !border-0 w-full"
        >
          <Statistic
            value={pendingFollowUps}
            prefix={<ClockCircleOutlined />}
            valueStyle={{
              color: "white",
              fontSize: "clamp(22px, 5vw, 30px)",
            }}
          />
          <p className="text-xs md:text-sm text-white mt-1">
            Applications not updated in 10+ days
          </p>
          <p className="text-xs text-white">
            Following up improves response rates
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SourceAndStrategy;
