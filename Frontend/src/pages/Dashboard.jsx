// import { Progress, Rate, Card } from "antd";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [completion, setCompletion] = useState(0);
//   const [rating, setRating] = useState(0); // ⭐ stars value

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

//   return (
//     <div className="pt-40 max-w-md mx-auto">
//         <h1>Track your job search progress in one place.</h1>
//       <Card title="Profile Overview">
//         <h3 className="mb-2">Profile Completion</h3>
//         <Progress percent={completion} />

//         <h3 className="mt-4 mb-2">Profile Strength</h3>
//         <Rate disabled value={rating} />
//         <p className="text-sm text-gray-500 mt-1">
//           {rating} / 5 stars
//         </p>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh', paddingTop: "60px" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#ffffff", paddingTop:"4px" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/Dashboard",
              icon: <UserOutlined />,
              label: "Profile Completion",
            },
            {
              key: "/Dashboard/ApplicationsbyStatus",
              icon: <VideoCameraOutlined />,
              label: "Applications by Status",
            },
             {
              key: "/Dashboard/SourceAndStrategy",
              icon: <UserOutlined />,
              label: "Source And Strategy",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Nested route content will render here */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
