// import {
//   Button,
//   Card,
//   Dropdown,
//   Empty,
//   message,
//   Space,
//   Tooltip,
//   Tag,
//   Input,
// } from "antd";
// import {
//   DownOutlined,
//   EllipsisOutlined,
//   UserOutlined,
//   PlusOutlined,
// } from "@ant-design/icons";
// const { Search } = Input;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import Search from "antd/es/transfer/search";
// // import { Navigate } from "react-router-dom";

// // const handleButtonClick = (e) => {
// //   if (key === "date") sortByDate();
// //   if (key === "company") sortByCompany();
// // };

// const tagOptions = [
//   { label: "Interview", value: "Interview" },
//   { label: "Applied", value: "Applied" },
//   { label: "Remote", value: "Remote" },
//   { label: "Onsite", value: "Onsite" },
//   { label: "LinkedIn", value: "LinkedIn" },
// ];

// const items = [
//   {
//     label: "oldest - newest",
//     key: "dateO",
//     icon: <UserOutlined />,
//   },
//   {
//     label: "Company Name (A → Z)",
//     key: "companyA",
//     icon: <UserOutlined />,
//   },
//   {
//     label: "Company Name (Z → A)",
//     key: "companyZ",
//     icon: <UserOutlined />,
//   },
//   {
//     label: "newest - oldest",
//     key: "dateN",
//     icon: <UserOutlined />,
//     danger: true,
//   },
//   {
//     label: "4rd menu item",
//     key: "4",
//     icon: <UserOutlined />,
//     danger: true,
//     disabled: true,
//   },
// ];

// const ApplicationCard = ({ app, navigate, confirmDelete }) => {
//       if (!app) return null; // safety check

//   return (
//   <Card key={app._id} title={app.companyName} bordered className="shadow-md">
//     <p>
//       <b>Role:</b> {app.jobTitle}
//     </p>
//     <p>
//       <b>Location:</b> {app.jobLocation}
//     </p>
//     <p>
//       <b>Status:</b> {app.status}
//     </p>
//     <p>
//       <b>Applied Via:</b> {app.appliedVia}
//     </p>
//     <p>
//       <b>Date:</b> {new Date(app.applicationDate).toLocaleDateString()}
//     </p>
//     <Button type="link" onClick={() => navigate(`/applications/${app._id}`)}>
//       View
//     </Button>
//     <Button
//       onClick={() =>
//         navigate(`/applications/edit/${app._id}`, {
//           state: { application: app },
//         })
//       }
//     >
//       Edit
//     </Button>
//     <Button type="link" onClick={() => confirmDelete(app._id)}>
//       Delete
//     </Button>
//   </Card>
//  );
// };

// const ApplicationsCard = () => {
//   const [applications, setApplications] = useState([]);
//   const backendURL = import.meta.env.VITE_BACKEND_URL;
//   const navigate = useNavigate(); // ✅ TOP LEVEL
//   const [deleteAppId, setDeleteAppId] = useState(null);
//   //   const [selectedTags, setSelectedTags] = useState([]);
//   const [filters, setFilters] = useState({
//     status: [],
//     jobLocation: [],
//     appliedVia: [],
//   });
//   const [searchTerm, setSearchTerm] = useState(""); // ✅ Missing in your code

//   const [inputVisible, setInputVisible] = useState(false);

//   //   const [filteredApps, setFilteredApps] = useState([]); // cards use this
//   const [sortBy, setSortBy] = useState(null);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const res = await fetch(`${backendURL}/applications`, {
//           credentials: "include",
//         });

//         const data = await res.json();
//         setApplications(data.applications);
//       } catch (error) {
//         console.error("Fetch error:", error);

//         message.error("Failed to load applications");
//       }
//     };

//     fetchApplications();
//   }, []);

//   const confirmDelete = (id) => {
//     setDeleteAppId(id); // show modal
//   };

//   const handleConfirmDelete = async (id) => {
//     try {
//       const response = await fetch(
//         `${backendURL}/applications/delete/${deleteAppId}`,
//         {
//           method: "DELETE",
//           credentials: "include", // to send JWT cookie if using auth
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         message.success(data.message || "Application deleted successfully");

//         // Update local state to remove the deleted card
//         setApplications((prev) => prev.filter((app) => app._id !== id));
//       } else {
//         message.error(data.message || "Failed to delete application");
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("Something went wrong while deleting");
//       setDeleteAppId(null);
//     }
//   };

//   const filterOptions = {
//     status: ["Applied", "Interview"],
//     jobLocation: ["Remote", "Onsite"],
//     appliedVia: ["LinkedIn"],
//   };

//   const handleMenuClick = ({ key }) => {
//     setSortBy(key);
//     //    if (key === "dateN") sortByDateNewest();
//     //    if (key === "dateO") sortByDateOldest();
//     //   if (key === "companyA") sortByCompanyAtoZ();
//     //   if (key === "companyZ") sortByCompanyZtoA();
//   };

//   const menuProps = {
//     items,
//     onClick: handleMenuClick,
//   };

//   const visibleApplications = [...applications]
//     // 1️⃣ Apply filter first
//     .filter((app) => {
//       // STATUS
//       if (filters.status.length && !filters.status.includes(app.status))
//         return false;

//       // JOB LOCATION
//       if (
//         filters.jobLocation.length &&
//         !filters.jobLocation.includes(app.jobLocation)
//       )
//         return false;

//       // APPLIED VIA
//       if (
//         filters.appliedVia.length &&
//         !filters.appliedVia.includes(app.appliedVia)
//       )
//         return false;

//       return true;
//     })
//     // 2️⃣ Apply sorting on the filtered array
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

//   // const filteredApplications = applications.filter(app => {
//   //   return selectedTags.every(tag => {
//   //     if (tag === "Interview") return app.status === "Interview";
//   //     if (tag === "Applied") return app.status === "Applied";

//   //     if (tag === "Remote") return app.jobLocation === "Remote";
//   //     if (tag === "Onsite") return app.jobLocation === "Onsite";

//   //     if (tag === "LinkedIn") return app.appliedVia === "LinkedIn";

//   //     return true;
//   //   });
//   // });

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

// const filteredApplications = applications.filter((app) => {
//   const company = app.companyName || "";
//   const role = app.jobTitle || "";
//   return company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//          role.toLowerCase().includes(searchTerm.toLowerCase());
// });


//   return (
//     <div className="flex flex-col">
//       {/* <Space wrap> */}

//       <div className="flex gap-3 px-16 mb-4">
//         <FilterDropdown
//           title="Status"
//           options={filterOptions.status}
//           category="status"
//         />

//         <FilterDropdown
//           title="Job Type"
//           options={filterOptions.jobLocation}
//           category="jobLocation"
//         />

//         <FilterDropdown
//           title="Applied Via"
//           options={filterOptions.appliedVia}
//           category="appliedVia"
//         />
//       </div>

//      <div className="px-16 grid grid-cols-3 gap-6">
//   {filteredApplications.length > 0 ? (
//     filteredApplications.map(app => (
//       <ApplicationCard key={app._id} app={app} navigate={navigate} confirmDelete={setDeleteAppId} />
//     ))
//   ) : (
//     <Empty description="No applications found" />
//   )}
// </div>

//       {/* Search */}
//       <div className="py-4 flex justify-end px-16">
//        <Search
//   placeholder="Search by company or role"
//   allowClear
//   onChange={(e) => setSearchTerm(e.target.value)}
//   style={{ width: 300 }}
// />
//       </div>

//       <div className="py-4 flex justify-end px-16">
//         <Space.Compact>
//           <Button>Sort</Button>
//           <Dropdown menu={menuProps} placement="bottomRight">
//             <Button icon={<EllipsisOutlined />} />
//           </Dropdown>
//         </Space.Compact>
//         {/* </Space> */}
//       </div>

//       <div className="grid grid-cols-3 gap-6 flex">
//         {visibleApplications.map((app) => (
//           <Card
//             key={app._id}
//             title={app.companyName}
//             bordered
//             className="shadow-md"
//           >
//             <p>
//               <b>Role:</b> {app.jobTitle}
//             </p>
//             <p>
//               <b>Location:</b> {app.jobLocation}
//             </p>
//             <p>
//               <b>Status:</b> {app.status}
//             </p>
//             <p>
//               <b>Applied Via:</b> {app.appliedVia}
//             </p>
//             <p>
//               <b>Date:</b> {new Date(app.applicationDate).toLocaleDateString()}
//             </p>

//             <Button
//               type="link"
//               onClick={() => navigate(`/applications/${app._id}`)} // ✅ SAFE
//             >
//               View
//             </Button>

//             <Button
//               onClick={() =>
//                 navigate(`/applications/edit/${app._id}`, {
//                   state: { application: app },
//                 })
//               }
//             >
//               Edit
//             </Button>

//             <Button type="link" onClick={() => confirmDelete(app._id)}>
//               Delete
//             </Button>
//           </Card>
//         ))}
//         {applications.length === 0 && (
//           <Empty description="No applications added yet" />
//         )}

//         {/* 🔥 LOGOUT CONFIRMATION MODAL */}
//         {deleteAppId && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-80 text-center">
//               <p className="text-lg font-semibold text-[#388087] mb-4">
//                 Are you sure you want to delete this application?
//               </p>

//               <div className="flex justify-center gap-6">
//                 <button
//                   // onClick={handleConfirmDelete}
//                   onClick={() => {
//                     handleConfirmDelete(deleteAppId); // call delete API
//                     setDeleteAppId(null); // close modal
//                   }}
//                   className="px-4 py-2 bg-[#388087] text-white rounded-md hover:opacity-90  cursor-pointer"
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
} from "antd";
import { DownOutlined, EllipsisOutlined, UserOutlined } from "@ant-design/icons";
const { Search } = Input;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const tagOptions = [
  { label: "Interview", value: "Interview" },
  { label: "Applied", value: "Applied" },
  { label: "Remote", value: "Remote" },
  { label: "Onsite", value: "Onsite" },
  { label: "LinkedIn", value: "LinkedIn" },
];

const items = [
  { label: "oldest - newest", key: "dateO", icon: <UserOutlined /> },
  { label: "Company Name (A → Z)", key: "companyA", icon: <UserOutlined /> },
  { label: "Company Name (Z → A)", key: "companyZ", icon: <UserOutlined /> },
  { label: "newest - oldest", key: "dateN", icon: <UserOutlined />, danger: true },
  { label: "4th menu item", key: "4", icon: <UserOutlined />, danger: true, disabled: true },
];

const ApplicationCard = ({ app, navigate, confirmDelete }) => {
  if (!app) return null;

  return (
    <Card key={app._id} title={app.companyName} bordered className="shadow-md">
      <p><b>Role:</b> {app.jobTitle}</p>
      <p><b>Location:</b> {app.jobLocation}</p>
      <p><b>Status:</b> {app.status}</p>
      <p><b>Applied Via:</b> {app.appliedVia}</p>
      <p><b>Date:</b> {new Date(app.applicationDate).toLocaleDateString()}</p>

      <Space>
        <Button type="link" onClick={() => navigate(`/applications/${app._id}`)}>View</Button>
        <Button onClick={() => navigate(`/applications/edit/${app._id}`, { state: { application: app } })}>Edit</Button>
        <Button type="link" onClick={() => confirmDelete(app._id)}>Delete</Button>
      </Space>
    </Card>
  );
};

const ApplicationsCard = () => {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({ status: [], jobLocation: [], appliedVia: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [deleteAppId, setDeleteAppId] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${backendURL}/applications`, { credentials: "include" });
        const data = await res.json();
        setApplications(data.applications);
      } catch (error) {
        console.error("Fetch error:", error);
        message.error("Failed to load applications");
      }
    };
    fetchApplications();
  }, []);

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value],
    }));
  };

  const FilterDropdown = ({ title, options, category }) => (
    <Dropdown
      menu={{
        items: options.map(opt => ({
          key: opt,
          label: (
            <Tag
              closable={filters[category].includes(opt)}
              color={filters[category].includes(opt) ? "blue" : "default"}
              onClose={e => { e.preventDefault(); toggleFilter(category, opt); }}
              onClick={() => toggleFilter(category, opt)}
            >
              {opt}
            </Tag>
          ),
        })),
      }}
      trigger={["click"]}
    >
      <Button>{title} <DownOutlined /></Button>
    </Dropdown>
  );

  const menuProps = { items, onClick: ({ key }) => setSortBy(key) };

  const filteredApplications = applications
    .filter(app => {
      const company = app.companyName || "";
      const role = app.jobTitle || "";
      return company.toLowerCase().includes(searchTerm.toLowerCase()) ||
             role.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter(app => {
      if (filters.status.length && !filters.status.includes(app.status)) return false;
      if (filters.jobLocation.length && !filters.jobLocation.includes(app.jobLocation)) return false;
      if (filters.appliedVia.length && !filters.appliedVia.includes(app.appliedVia)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "dateN") return new Date(b.applicationDate) - new Date(a.applicationDate);
      if (sortBy === "dateO") return new Date(a.applicationDate) - new Date(b.applicationDate);
      if (sortBy === "companyA") return a.companyName.localeCompare(b.companyName);
      if (sortBy === "companyZ") return b.companyName.localeCompare(a.companyName);
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
      setApplications(prev => prev.filter(app => app._id !== id));
    } else {
      message.error("Failed to delete application");
    }
  } catch (err) {
    console.error(err);
    message.error("Error deleting application");
  }
};


  return (
    <div className="flex flex-col gap-6 px-16">
      {/* Filters */}
      <div className="flex gap-3">
        <FilterDropdown title="Status" options={["Applied", "Interview"]} category="status" />
        <FilterDropdown title="Job Type" options={["Remote", "Onsite"]} category="jobLocation" />
        <FilterDropdown title="Applied Via" options={["LinkedIn"]} category="appliedVia" />
      </div>

      {/* Search */}
      <div className="flex justify-end py-4">
        <Search
          placeholder="Search by company or role"
          allowClear
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      {/* Applications */}
      <div className="grid grid-cols-3 gap-6">
        {filteredApplications.length > 0 ? (
          filteredApplications.map(app => (
            <ApplicationCard key={app._id} app={app} navigate={navigate} confirmDelete={setDeleteAppId} />
          ))
        ) : (
          <Empty description="No applications found" />
        )}
      </div>

      {/* Sort */}
      <div className="flex justify-end py-4">
        <Space.Compact>
          <Button>Sort</Button>
          <Dropdown menu={menuProps} placement="bottomRight">
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space.Compact>
      </div>

      {/* Delete Modal */}
      {deleteAppId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <p className="text-lg font-semibold text-[#388087] mb-4">
              Are you sure you want to delete this application?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => { handleConfirmDelete(deleteAppId); setDeleteAppId(null); }}
                className="px-4 py-2 bg-[#388087] text-white rounded-md hover:opacity-90 cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteAppId(null)}
                className="px-4 py-2 border border-[#388087] text-[#388087] rounded-md hover:bg-gray-100 cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsCard;
