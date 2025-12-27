// import {
//   Button,
//   Card,
//   Dropdown,
//   Empty,
//   message,
//   Space,
//   Tag,
//   Input,
//   Spin,
// } from "antd";
// import {
//   DownOutlined,
//   EllipsisOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// const { Search } = Input;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../index.css";
// import bgDashboard from "../../assets/bg2.jpg";

// const tagOptions = [
//   { label: "Saved", value: "Saved" },
//   { label: "Applied", value: "Applied" },
//   { label: "Interview", value: "Interview" },
//   { label: "Remote", value: "Remote" },
//   { label: "Onsite", value: "Onsite" },
//   { label: "LinkedIn", value: "LinkedIn" },
// ];

// const items = [
//   { label: "oldest - newest", key: "dateO", icon: <UserOutlined /> },
//   { label: "Company Name (A → Z)", key: "companyA", icon: <UserOutlined /> },
//   { label: "Company Name (Z → A)", key: "companyZ", icon: <UserOutlined /> },
//   {
//     label: "newest - oldest",
//     key: "dateN",
//     icon: <UserOutlined />,
//     danger: true,
//   },
//   {
//     label: "4th menu item",
//     key: "4",
//     icon: <UserOutlined />,
//     danger: true,
//     disabled: true,
//   },
// ];

// const ApplicationCard = ({ app, navigate, confirmDelete }) => {
//   if (!app) return null;

//   return (
//     <Card
//       key={app._id}
//       title={
//         <span className="text-white text-2xl font-semibold">
//           {app.companyName}
//         </span>
//       }
//       bordered
//       className="shadow-md !bg-white/20 !border-0 !text-white/90 !text-lg"
//     >
//       <p>
//         <b>Role:</b> {app.jobTitle}
//       </p>
//       <p>
//         <b>Location:</b> {app.jobLocation}
//       </p>
//       <p>
//         <b>Status:</b> {app.status}
//       </p>
//       <p>
//         <b>Applied Via:</b> {app.appliedVia}
//       </p>
//       <p>
//         <b>Date:</b> {new Date(app.applicationDate).toLocaleDateString()}
//       </p>

//       <Space>
//         <Button
//           type="link"
//           onClick={() => navigate(`/applications/${app._id}`)}
//           className="!text-blue-400 !text-lg !underline"
//         >
//           View
//         </Button>
//         {/* <Button
//           onClick={() =>
// navigate(`/applications/${app._id}/edit`, { state: { application: app } })            // navigate(`/applications/edit/${app._id}`)
//           }
//         >
//           Edit
//         </Button> */}
//         <Button
//           type="link"
//           onClick={() => confirmDelete(app._id)}
//           className="!text-red-400 !text-lg !underline"
//         >
//           Delete
//         </Button>
//       </Space>
//     </Card>
//   );
// };

// const ApplicationsCard = () => {
//   const [applications, setApplications] = useState([]);
//   const [filters, setFilters] = useState({
//     status: [],
//     jobType: [],
//     appliedVia: [],
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState(null);
//   const [deleteAppId, setDeleteAppId] = useState(null);
//   const [sortOpen, setSortOpen] = useState(false);
//   const [loading, setLoading] = useState(true); // default true while fetching

//   const backendURL = import.meta.env.VITE_BACKEND_URL;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchApplications = async () => {
//       setLoading(true); // start loading
//       try {
//         const res = await fetch(`${backendURL}/applications`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setApplications(data.applications);
//       } catch (error) {
//         console.error("Fetch error:", error);
//         message.error("Failed to load applications");
//       } finally {
//         setLoading(false); // stop loading
//       }
//     };
//     fetchApplications();
//   }, []);

//   const toggleFilter = (category, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [category]: prev[category].includes(value)
//         ? prev[category].filter((v) => v !== value)
//         : [...prev[category], value],
//     }));
//   };

//   const FilterDropdown = ({ title, options, category }) => (
//     <Dropdown
//       menu={{
//         items: options.map((opt) => ({
//           key: opt,
//           label: (
//             <Tag
//               closable={filters[category].includes(opt)}
//               color={filters[category].includes(opt) ? "blue" : "default"}
//               onClose={(e) => {
//                 e.preventDefault();
//                 toggleFilter(category, opt);
//               }}
//               onClick={() => toggleFilter(category, opt)}
//             >
//               {opt}
//             </Tag>
//           ),
//         })),
//       }}
//       trigger={["click"]}
//     >
//       <Button>
//         {title} <DownOutlined />
//       </Button>
//     </Dropdown>
//   );

//   const menuProps = { items, onClick: ({ key }) => setSortBy(key) };

//   const filteredApplications = applications
//     .filter((app) => {
//       const company = app.companyName || "";
//       const role = app.jobTitle || "";
//       return (
//         company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         role.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     })
//     .filter((app) => {
//       if (filters.status.length && !filters.status.includes(app.status))
//         return false;
//       if (filters.jobType.length && !filters.jobType.includes(app.jobType))
//         return false;
//       if (
//         filters.appliedVia.length &&
//         !filters.appliedVia.includes(app.appliedVia)
//       )
//         return false;
//       return true;
//     })
//     .sort((a, b) => {
//       if (sortBy === "dateN")
//         return new Date(b.applicationDate) - new Date(a.applicationDate);
//       if (sortBy === "dateO")
//         return new Date(a.applicationDate) - new Date(b.applicationDate);
//       if (sortBy === "companyA")
//         return a.companyName.localeCompare(b.companyName);
//       if (sortBy === "companyZ")
//         return b.companyName.localeCompare(a.companyName);
//       return 0;
//     });

//   const handleConfirmDelete = async (id) => {
//     try {
//       const res = await fetch(`${backendURL}/applications/delete/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       if (res.ok) {
//         message.success("Application deleted successfully");
//         // Remove deleted app from state
//         setApplications((prev) => prev.filter((app) => app._id !== id));
//       } else {
//         message.error("Failed to delete application");
//       }
//     } catch (err) {
//       console.error(err);
//       message.error("Error deleting application");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full bg-cover bg-center bg-fixed flex items-start overflow-hidden"
//       // style={{ backgroundImage: `url(${bgDashboard})` }}
//     >
//       <div className=" p-4 pt-6 pb-10 min-h-screen w-full flex flex-col">
//         <div className="h-auto">
//           {/* -----Nav----- */}
//           <div className="flex justify-between px-4">
//             {/* Filters */}
//             <div className="flex gap-3 py-4">
//               <FilterDropdown
//                 title="Status"
//                 options={[
//                   "Saved",
//                   "Applied",
//                   "Shortlisted",
//                   "Interview",
//                   "Offer",
//                   "Rejected",
//                 ]}
//                 category="status"
//               />
//               <FilterDropdown
//                 title="Job Type"
//                 options={[
//                   "Remote",
//                   "Full-time",
//                   "Part-time",
//                   "Internship",
//                   "Contract",
//                 ]}
//                 category="jobType"
//               />
//               <FilterDropdown
//                 title="Applied Via"
//                 category="appliedVia"
//                 options={[
//                   "LinkedIn",
//                   "Company Website",
//                   "Referral",
//                   "Indeed",
//                   "Glassdoor",
//                   "Naukri",
//                   "Wellfound",
//                   "Internshala",
//                   "Recruiter Outreach",
//                   "Campus Placement",
//                   "Job Fair",
//                   "Cold Email",
//                   "Other",
//                 ]}
//               />
//             </div>

//             {/* Search */}
//             <div className="flex justify-end py-4">
//               <Search
//                 placeholder="Search by company or role"
//                 allowClear
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="!bg-transparent !text-white !border-white !w-100"
//               />
//             </div>

//             {/* Sort */}
//             <div className="flex justify-end py-4">
//               <Space.Compact>
//                 <Button onClick={() => setSortOpen((prev) => !prev)}>
//                   Sort
//                 </Button>

//                 <Dropdown
//                   open={sortOpen}
//                   onOpenChange={(open) => setSortOpen(open)}
//                   menu={menuProps}
//                   placement="bottomRight"
//                   trigger={["click"]}
//                 >
//                   <Button icon={<EllipsisOutlined />} />
//                 </Dropdown>
//               </Space.Compact>
//             </div>
//           </div>

//           {/* Applications */}
//           {/* <div className="grid grid-cols-3 gap-6 p-4">
//             {filteredApplications.length > 0 ? (
//               filteredApplications.map((app) => (
//                 <ApplicationCard
//                   key={app._id}
//                   app={app}
//                   navigate={navigate}
//                   confirmDelete={setDeleteAppId}
//                 />
//               ))
//             ) : (
//               <div className="h-screen text-white">
//                 <Empty description="No applications found" />
//               </div>
//             )}
//           </div> */}

//           <div className="grid grid-cols-3 gap-6 p-4">
//             {loading ? (
//               <div className="col-span-3 flex flex-col justify-center items-center h-80">
//                 <Spin size="large" tip="Loading applications..." />
//                 <p className="text-white mt-4">
//                   This might take a few seconds...
//                 </p>
//               </div>
//             ) : filteredApplications.length > 0 ? (
//               filteredApplications.map((app) => (
//                 <ApplicationCard
//                   key={app._id}
//                   app={app}
//                   navigate={navigate}
//                   confirmDelete={setDeleteAppId}
//                 />
//               ))
//             ) : (
//               <div className="h-screen text-white col-span-3">
//                 <Empty description="No applications found" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Delete Modal */}
//         {deleteAppId && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-80 text-center">
//               <p className="text-lg font-semibold text-[#388087] mb-4">
//                 Are you sure you want to delete this application?
//               </p>
//               <div className="flex justify-center gap-6">
//                 <button
//                   onClick={() => {
//                     handleConfirmDelete(deleteAppId);
//                     setDeleteAppId(null);
//                   }}
//                   className="px-4 py-2 bg-[#388087] text-white rounded-md hover:opacity-90 cursor-pointer"
//                 >
//                   Yes
//                 </button>
//                 <button
//                   onClick={() => setDeleteAppId(null)}
//                   className="px-4 py-2 border border-[#388087] text-[#388087] rounded-md hover:bg-gray-100 cursor-pointer"
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplicationsCard;

import {
  Button,
  Card,
  Dropdown,
  Empty,
  message,
  Space,
  Tag,
  Input,
  Spin,
} from "antd";
import {
  DownOutlined,
  EllipsisOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Search } = Input;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import bgDashboard from "../../assets/bg2.jpg";

const tagOptions = [
  { label: "Saved", value: "Saved" },
  { label: "Applied", value: "Applied" },
  { label: "Interview", value: "Interview" },
  { label: "Remote", value: "Remote" },
  { label: "Onsite", value: "Onsite" },
  { label: "LinkedIn", value: "LinkedIn" },
];

const items = [
  { label: "oldest - newest", key: "dateO", icon: <UserOutlined /> },
  { label: "Company Name (A → Z)", key: "companyA", icon: <UserOutlined /> },
  { label: "Company Name (Z → A)", key: "companyZ", icon: <UserOutlined /> },
  {
    label: "newest - oldest",
    key: "dateN",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "4th menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

const ApplicationCard = ({ app, navigate, confirmDelete }) => {
  if (!app) return null;

  return (
    <Card
      key={app._id}
      title={
        <span className="text-white md:text-2xl text-lg font-semibold">
          {app.companyName}
        </span>
      }
      bordered
      className="shadow-md !bg-white/20 h-56 md:h-full !border-1 md:!border-0 !text-white/90 md:!text-lg !text-md md:text-center"
    >
      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        <b>Role:</b> {app.jobTitle}
      </p>
      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        <b>Location:</b> {app.jobLocation}
      </p>
      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        <b>Status:</b> {app.status}
      </p>
      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        <b>Applied Via:</b> {app.appliedVia}
      </p>
      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        <b>Date:</b> {new Date(app.applicationDate).toLocaleDateString()}
      </p>

      <Space>
        <Button
          type="link"
          onClick={() => navigate(`/applications/${app._id}`)}
          className="!text-blue-400 md:!text-lg !text-md !underline"
        >
          View
        </Button>
        {/* <Button
          onClick={() =>
navigate(`/applications/${app._id}/edit`, { state: { application: app } })            // navigate(`/applications/edit/${app._id}`)
          }
        >
          Edit
        </Button> */}
        <Button
          type="link"
          onClick={() => confirmDelete(app._id)}
          className="!text-red-400 md:!text-lg !text-md !underline"
        >
          Delete
        </Button>
      </Space>
    </Card>
  );
};

const ApplicationsCard = () => {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    jobType: [],
    appliedVia: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [deleteAppId, setDeleteAppId] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [loading, setLoading] = useState(true); // default true while fetching

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true); // start loading
      try {
        const res = await fetch(`${backendURL}/applications`, {
          credentials: "include",
        });
        const data = await res.json();
        setApplications(data.applications);
      } catch (error) {
        console.error("Fetch error:", error);
        message.error("Failed to load applications");
      } finally {
        setLoading(false); // stop loading
      }
    };
    fetchApplications();
  }, []);

  const toggleFilter = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const FilterDropdown = ({ title, options, category }) => (
    <Dropdown
      menu={{
        items: options.map((opt) => ({
          key: opt,
          label: (
            <Tag
              closable={filters[category].includes(opt)}
              color={filters[category].includes(opt) ? "blue" : "default"}
              onClose={(e) => {
                e.preventDefault();
                toggleFilter(category, opt);
              }}
              onClick={() => toggleFilter(category, opt)}
            >
              {opt}
            </Tag>
          ),
        })),
      }}
      trigger={["click"]}
    >
      <Button>
        {title} <DownOutlined />
      </Button>
    </Dropdown>
  );

  const menuProps = { items, onClick: ({ key }) => setSortBy(key) };

  const filteredApplications = applications
    .filter((app) => {
      const company = app.companyName || "";
      const role = app.jobTitle || "";
      return (
        company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .filter((app) => {
      if (filters.status.length && !filters.status.includes(app.status))
        return false;
      if (filters.jobType.length && !filters.jobType.includes(app.jobType))
        return false;
      if (
        filters.appliedVia.length &&
        !filters.appliedVia.includes(app.appliedVia)
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "dateN")
        return new Date(b.applicationDate) - new Date(a.applicationDate);
      if (sortBy === "dateO")
        return new Date(a.applicationDate) - new Date(b.applicationDate);
      if (sortBy === "companyA")
        return a.companyName.localeCompare(b.companyName);
      if (sortBy === "companyZ")
        return b.companyName.localeCompare(a.companyName);
      return 0;
    });

  const handleConfirmDelete = async (id) => {
    try {
      const res = await fetch(`${backendURL}/applications/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        message.success("Application deleted successfully");
        // Remove deleted app from state
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } else {
        message.error("Failed to delete application");
      }
    } catch (err) {
      console.error(err);
      message.error("Error deleting application");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed flex items-start overflow-hidden"
      // style={{ backgroundImage: `url(${bgDashboard})` }}
    >
      <div className=" p-4 pt-6 pb-10 min-h-screen w-full flex flex-col">
        <div className="h-auto">
          {/* -----Nav----- */}
          <div className="flex flex-col md:flex-row md:justify-between md:px-4">
            {/* Filters */}
            <div className="flex md:gap-3 md:py-4 py-0">
              <FilterDropdown
                title="Status"
                options={[
                  "Saved",
                  "Applied",
                  "Shortlisted",
                  "Interview",
                  "Offer",
                  "Rejected",
                ]}
                category="status"
              />
              <FilterDropdown
                title="Job Type"
                options={[
                  "Remote",
                  "Full-time",
                  "Part-time",
                  "Internship",
                  "Contract",
                ]}
                category="jobType"
              />
              <FilterDropdown
                title="Applied Via"
                category="appliedVia"
                options={[
                  "LinkedIn",
                  "Company Website",
                  "Referral",
                  "Indeed",
                  "Glassdoor",
                  "Naukri",
                  "Wellfound",
                  "Internshala",
                  "Recruiter Outreach",
                  "Campus Placement",
                  "Job Fair",
                  "Cold Email",
                  "Other",
                ]}
              />
            </div>

            <div className="flex md:flex-row flex-row w-full justify-between">
              {/* Search */}
              <div className="md:flex flex w-56 md:w-full md:justify-center h-fit md:py-4 py-1">
                <Search
                  placeholder="Search by company or role"
                  allowClear
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="!bg-transparent !text-white !border-white !w-100"
                />
              </div>

              {/* Sort */}
              <div className="flex md:justify-end md:py-4 py-1">
                <Space.Compact>
                  <Button onClick={() => setSortOpen((prev) => !prev)}>
                    Sort
                  </Button>

                  <Dropdown
                    open={sortOpen}
                    onOpenChange={(open) => setSortOpen(open)}
                    menu={menuProps}
                    placement="bottomRight"
                    trigger={["click"]}
                  >
                    <Button icon={<EllipsisOutlined />} />
                  </Dropdown>
                </Space.Compact>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 md:gap-6 md:p-4 grid-cols-1 gap-4 p-4">
            {loading ? (
              <div className="col-span-3 flex flex-col justify-center items-center md:h-80 h-100">
                <Spin size="large" tip="Loading applications..." />
                <p className="text-white mt-4">
                  This might take a few seconds...
                </p>
              </div>
            ) : filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <ApplicationCard
                  key={app._id}
                  app={app}
                  navigate={navigate}
                  confirmDelete={setDeleteAppId}
                />
              ))
            ) : (
              <div className="h-screen text-white col-span-3">
                <Empty description="No applications found" />
              </div>
            )}
          </div>
        </div>

        {/* Delete Modal */}
        {deleteAppId && (
          <div className="glass min-h-screen fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div
              className=" border w-100 md:h-60 p-10 text-center 
           rounded-2xl mx-10
          bg-white/6 shadow-2xl
    transition-all duration-300 hover:shadow-[0_0_18px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
            >
              <p cclassName="text-2xl py-2 font-bold font-semibold text-whhite/90 mb-4">
                Are you sure you want to delete this application?
              </p>
              <div className="flex justify-center gap-6 pt-6">
                <button
                  onClick={() => {
                    handleConfirmDelete(deleteAppId);
                    setDeleteAppId(null);
                  }}
                  className="px-4 py-2 bg-white/90 text-black rounded-md hover:opacity-80  cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteAppId(null)}
                  className="px-4 py-2 border border-white-90 text-white/90 rounded-md hover:bg-white/10 cursor-pointer"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsCard;
