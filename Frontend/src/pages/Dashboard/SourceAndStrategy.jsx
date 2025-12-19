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
    .then(res => res.json())
    .then(data => {
      console.log("Applications fetched:", data); // check the structure
      const appsArray = Array.isArray(data) ? data : (data.applications || []);
      setApplications(appsArray);
      setLoading(false);
    })
    .catch(err => {
      console.error("Failed to fetch applications:", err);
      setLoading(false);
    });
}, [user]);


  if (loading) return <p>Loading...</p>;

  // Calculate stats
  const totalApplications = applications.length;
  const appliedCount = applications.filter(a => a.status === "Applied").length;
  const interviewCount = applications.filter(a => a.status === "Interview Scheduled").length;
  const offerCount = applications.filter(a => a.status === "Offer").length;

  const sources = applications.reduce((acc, app) => {
  const src = app.appliedVia || "Unknown";
  acc[src] = (acc[src] || 0) + 1;
  return acc;
}, {});

  const pendingFollowUps = applications.filter(app => {
    if (!app.updatedAt) return false;
    const updatedDate = new Date(app.updatedAt);
    const diffDays = (new Date() - updatedDate) / (1000 * 60 * 60 * 24);
    return diffDays >= 10;
  }).length;

  const interviewRate = appliedCount ? Math.round((interviewCount / appliedCount) * 100) : 0;
  const offerRate = interviewCount ? Math.round((offerCount / interviewCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 📈 Conversion Rates */}
      <Card title="Conversion Rates">
        <div className="space-y-4">
          <div>
            <Statistic
              title="Interview Conversion"
              value={interviewRate}
              suffix="%"
              prefix={<RiseOutlined />}
            />
            <Progress percent={interviewRate} size="small" />
            <p className="text-xs text-gray-500">Interviews ÷ Applications</p>
          </div>

          <div>
            <Statistic
              title="Offer Conversion"
              value={offerRate}
              suffix="%"
              prefix={<RiseOutlined />}
            />
            <Progress percent={offerRate} size="small" />
            <p className="text-xs text-gray-500">Offers ÷ Interviews</p>
          </div>
        </div>
      </Card>

      {/* 🌍 Applications by Source */}
      <Card title="Applications by Source">
        <div className="space-y-2">
          {Object.entries(sources).map(([source, count]) => (
            <div key={source} className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <LinkOutlined />
                {source}
              </span>
              <Tag color="blue">{count}</Tag>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Focus more on sources with better conversions
        </p>
      </Card>

      {/* ⏰ Pending Follow-Ups */}
      <Card
        title="Pending Follow-Ups"
        className="border-l-4 border-orange-400 bg-orange-50"
      >
        <Statistic
          value={pendingFollowUps}
          prefix={<ClockCircleOutlined />}
        />
        <p className="text-sm text-gray-600 mt-1">
          Applications not updated in 10+ days
        </p>
        <p className="text-xs text-gray-500">
          Following up improves response rates
        </p>
      </Card>
    </div>
  );
};

export default SourceAndStrategy;
