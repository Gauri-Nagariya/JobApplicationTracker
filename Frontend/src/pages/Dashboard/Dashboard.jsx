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









// import React, { useState } from 'react';
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
// import { Button, Layout, Menu, theme } from 'antd';
// import "../../index.css";

// const { Header, Sider, Content } = Layout;

// const Dashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <div>
//       <div>

//     <Layout style={{ minHeight: '100vh', paddingTop: "60px" , backgroundColor: "transparent"}}>
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         style={{ backgroundColor: "transparent", paddingTop:"4px" }}
//       >
//         <div className="[&_.ant-menu-item:hover]:!bg-white/30 [&_.ant-menu-submenu-title:hover]:!bg-white/30"/>
//         <Menu
//           theme="dark"
//           mode="inline"
//           style={{ backgroundColor: "transparent"}}
//           selectedKeys={[location.pathname]}
//           onClick={({ key }) => navigate(key)}
//           items={[
//             {
//               key: "/Dashboard",
//               icon: <UserOutlined />,
//               label: "Profile Completion",
//             },
//             {
//               key: "/Dashboard/ApplicationsbyStatus",
//               icon: <VideoCameraOutlined />,
//               label: "Applications by Status",
//             },
//              {
//               key: "/Dashboard/SourceAndStrategy",
//               icon: <UserOutlined />,
//               label: "Source And Strategy",
//             },
//           ]}
//         />
//       </Sider>
//       <Layout style={{backgroundColor: "#080328"}}>
//         {/* <Header style={{ padding: 0, background: "red" }}> */}
//           {/* <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{ fontSize: 16, width: 64, height: 64 }}
//           /> */}
//         {/* </Header> */}
//         <Content
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//             background: "#080328",
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           {/* Nested route content will render here */}
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//     </div>
//     </div>

//   );
// };

// export default Dashboard;






import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Grid, theme } from "antd";
import "../../index.css";

const { Sider, Content, Header } = Layout;
const { useBreakpoint } = Grid;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/Dashboard",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "/Dashboard/ApplicationsbyStatus",
      icon: <VideoCameraOutlined />,
      label: "Applications",
    },
    {
      key: "/Dashboard/SourceAndStrategy",
      icon: <UserOutlined />,
      label: "Source",
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        paddingTop: "60px",
        background: "#080328",
      }}
    >
      {/* MOBILE → TOP MENU */}
      {!screens.md && (
        <Header
          style={{
            background: "#080328",
            padding: 0,
          }}
        >
          <Menu
            mode="horizontal"
            theme="dark"
              className="mobile-top-menu"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            items={menuItems}
            style={{ background: "transparent", borderRadius: "20px" }}
          />
        </Header>
      )}

      <Layout>
        {/* DESKTOP → SIDE MENU */}
        {screens.md && (
          <Sider
            width={220}
            style={{
              background: "#080328",
              paddingTop: "4px",
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              onClick={({ key }) => navigate(key)}
              items={menuItems}
              style={{ background: "transparent" }}
            />
          </Sider>
        )}

        {/* CONTENT */}
        <Layout style={{ background: "#080328" }}>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#080328",
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
