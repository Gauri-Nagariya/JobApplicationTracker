import React, { useContext, useEffect, useState } from "react";
import { Card, Statistic } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";

const ApplicationsByStatus = () => {


    const { user } = useContext(AuthContext);
 const [total, setTotal] = useState(0);
 const [applications, setApplications] = useState([]);


    const backendURL = import.meta.env.VITE_BACKEND_URL;
  
useEffect(() => {
  if (!user) return;

  fetch(`${backendURL}/applications`, { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      console.log("Applications API response:", data);
      // set applications to the array inside the response
      setApplications(data.applications || data || []); // adjust based on API shape
      setTotal((data.applications || data || []).length);
    })
    .catch(err => console.error(err));
}, [user]);


const stats = {
  applied: applications.filter(app => app.status === "Applied").length,
  interview: applications.filter(app => app.status === "Interview Scheduled").length,
  rejected: applications.filter(app => app.status === "Rejected").length,
  offer: applications.filter(app => app.status === "Offer").length,
};

const activeApplications = stats.applied + stats.interview;
const activePercentage = total > 0 ? Math.round((activeApplications / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 🔥 Total Applications */}
      <Card className="shadow-sm">
        <Statistic
          title="Total Applications"
          value={ total }
          prefix={<FileTextOutlined />}
        />
        <p className="text-sm text-gray-500 mt-1">
          Jobs you’ve applied to so far
        </p>
        <p className="text-xs text-gray-400">
          Consistency matters — keep applying
        </p>
      </Card>

      {/* 📊 Applications by Status */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Applications by Status
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition">
            <Statistic
              title="Applied"
              value={stats.applied}
              prefix={<ClockCircleOutlined />}
            />
          </Card>

          <Card className="hover:shadow-md transition">
            <Statistic
              title="Interview"
              value={stats.interview}
              prefix={<FireOutlined />}
            />
          </Card>

          <Card className="hover:shadow-md transition">
            <Statistic
              title="Rejected"
              value={stats.rejected}
              prefix={<CloseCircleOutlined />}
            />
          </Card>

          <Card className="hover:shadow-md transition">
            <Statistic
              title="Offer"
              value={stats.offer}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </div>
      </div>

      {/* 🚀 Active Applications */}
      <Card className="border-l-4 border-blue-500 bg-blue-50">
        <Statistic
          title="Active Applications"
          value={activeApplications}
          prefix={<FireOutlined />}
        />
        <p className="text-sm text-gray-600 mt-1">
          Still in progress (Applied + Interview)
        </p>
        <p className="text-xs text-gray-500">
          {activePercentage}% of your applications are still alive
        </p>
      </Card>
    </div>
  );
};

export default ApplicationsByStatus;
