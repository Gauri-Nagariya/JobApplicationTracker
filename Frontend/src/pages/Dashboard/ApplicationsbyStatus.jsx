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
        console.log("Applications API response:", data);
        // set applications to the array inside the response
        setApplications(data.applications || data || []); // adjust based on API shape
        setTotal((data.applications || data || []).length);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const stats = {
    applied: applications.filter((app) => app.status === "Applied").length,
    interview: applications.filter(
      (app) => app.status === "Interview Scheduled"
    ).length,
    rejected: applications.filter((app) => app.status === "Rejected").length,
    offer: applications.filter((app) => app.status === "Offer").length,
  };

  const activeApplications = stats.applied + stats.interview;
  const activePercentage =
    total > 0 ? Math.round((activeApplications / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 🔥 Total Applications */}
      <Card className="shadow-sm !bg-white/20 !border-0">
        <Statistic
          title={<span className="text-white text-2xl !font-semibold">Total Applications</span>}
          value={total}
  prefix={<FileTextOutlined />}
  valueStyle={{ color: 'white', fontSize: "30px" }}
        />
        <p className="text-lg text-white mt-1">
          Jobs you’ve applied to so far
        </p>
        <p className="text-mg text-white">
          Consistency matters — keep applying
        </p>
      </Card>

      {/* 📊 Applications by Status */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Applications by Status</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition !bg-white/20 !border-0">
            <Statistic
              title={<span className="text-white text-2xl !font-semibold">Applied</span>}
              value={stats.applied}
              prefix={<ClockCircleOutlined />}
                valueStyle={{ color: 'white', fontSize: "30px" }}
            />
          </Card>

          <Card className="hover:shadow-md transition !bg-white/20 !border-0">
            <Statistic
              title={<span className="text-white text-2xl !font-semibold">Interview</span>}
              value={stats.interview}
              prefix={<FireOutlined />}
                valueStyle={{ color: 'white', fontSize: "30px" }}
            />
          </Card>

          <Card className="hover:shadow-md transition !bg-white/20 !border-0">
            <Statistic
              title={<span className="text-white text-2xl !font-semibold">Rejected</span>}
              value={stats.rejected}
              prefix={<CloseCircleOutlined />}
                valueStyle={{ color: 'white', fontSize: "30px" }}
            />
          </Card>

          <Card className="hover:shadow-md transition !bg-white/20 !border-0">
            <Statistic
              title={<span className="text-white text-2xl !font-semibold">Offer</span>}
              value={stats.offer}
              prefix={<TrophyOutlined />}
                valueStyle={{ color: 'white', fontSize: "30px" }}
            />
          </Card>
        </div>
      </div>

      {/* 🚀 Active Applications */}
      <Card className="border-l-4 border-blue-500 bg-blue-50 !bg-white/20 !border-0">
        <Statistic
          title={<span className="text-white text-2xl !font-semibold">Active Applications</span>}
          value={activeApplications}
          prefix={<FireOutlined />}
            valueStyle={{ color: 'white', fontSize: "30px" }}
        />
        <p className="text-lg text-white mt-1">
          Still in progress (Applied + Interview)
        </p>
        <p className="text-mg text-white">
          {activePercentage}% of your applications are still alive
        </p>
      </Card>
    </div>
  );
};

export default ApplicationsByStatus;
