// // // import { useParams } from "react-router-dom";
// // // import { useEffect, useState } from "react";
// // // import { Card } from "antd";

// // // const ApplicationDetails = () => {
// // //   const { id } = useParams();
// // //   const [application, setApplication] = useState(null);

// // //   useEffect(() => {
// // //     fetch(`${import.meta.env.VITE_BACKEND_URL}/applications/${id}`, {
// // //       credentials: "include",
// // //     })
// // //       .then((res) => res.json())
// // //       .then((data) => setApplication(data.application));
// // //   }, [id]);

// // //   if (!application) return <p>Loading...</p>;

// // //   return (
// // //     <Card title={application.companyName}>
// // //       <p>
// // //         <b>Job Title:</b> {application.jobTitle}
// // //       </p>
// // //       <p>
// // //         <b>Location:</b> {application.jobLocation}
// // //       </p>
// // //       <p>
// // //         <b>Job Type:</b> {application.jobType}
// // //       </p>
// // //       <p>
// // //         <b>Status:</b> {application.status}
// // //       </p>
// // //       <p>
// // //         <b>Salary Range:</b>{" "}
// // //           ₹ {application.salaryRange?.min} – ₹ {application.salaryRange?.max}

// // //       </p>
// // //       <p>
// // //         <b>Applied Via:</b> {application.appliedVia}
// // //       </p>
// // //       <p>
// // //         <b>Date:</b> {new Date(application.applicationDate).toDateString()}
// // //       </p>

// // //       <p>
// // //         <b>Application Link:</b>{" "}
// // //         <a
// // //           href={application.applicationLink}
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //           className="text-blue-600 underline"
// // //         >
// // //           {application.applicationLink}
// // //         </a>
// // //       </p>

// // //       <p>
// // //         <b>CompanyCareer Page:</b>
// // //         <a
// // //           href={application.applicationLink}
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //           className="text-blue-600 underline"
// // //         >
// // //           {application.CompanyCareerPage}
// // //         </a>
// // //       </p>
// // //       <p>
// // //         <b>Portfolio/GitHub/LinkedIn:</b>
// // //         <a
// // //           href={application.applicationLink}
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //           className="text-blue-600 underline"
// // //         >
// // //           {application.PortfolioGitHubLinkedIn}
// // //         </a>
// // //       </p>

// // //       <p>
// // //         <b>resume:</b>
// // //         <a
// // //           href={application.resume}
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //           className="text-blue-600 underline"
// // //         >
// // //           {application.resume}
// // //         </a>
// // //       </p>

// // //       <p>
// // //         <b>coverLetter</b>
// // //         <a
// // //           href={application.coverLetter}
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //           className="text-blue-600 underline"
// // //         >
// // //           {application.coverLetter}
// // //         </a>
// // //       </p>

// // //       <p>
// // //         <b>Notes:</b> {application.notes}
// // //       </p>
// // //     </Card>
// // //   );
// // // };

// // // export default ApplicationDetails;

// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { Card } from "antd";

// // const ApplicationDetails = () => {
// //   const { id } = useParams();
// //   const [application, setApplication] = useState(null);
// //   const [files, setFiles] = useState({ resume: null, coverLetter: null });

// //   useEffect(() => {
// //     const backendURL = import.meta.env.VITE_BACKEND_URL;

// //     // 1️⃣ Fetch application details
// //     const fetchApplication = async () => {
// //       try {
// //         const res = await fetch(`${backendURL}/applications/${id}`, {
// //           credentials: "include",
// //         });
// //         const data = await res.json();
// //         setApplication(data.application);
// //       } catch (err) {
// //         console.error("Error fetching application:", err);
// //       }
// //     };

// //     // 2️⃣ Fetch uploaded files
// //     const fetchFiles = async () => {
// //       try {
// //         const res = await fetch(`${backendURL}/upload-docs/${id}`, {
// //           credentials: "include",
// //         });
// //         const data = await res.json();
// //         setFiles({
// //           resume: data.resume || null,
// //           coverLetter: data.coverLetter || null,
// //         });
// //       } catch (err) {
// //         console.error("Error fetching uploaded files:", err);
// //       }
// //     };

// //     fetchApplication();
// //     fetchFiles();
// //   }, [id]);

// //   if (!application) return <p>Loading...</p>;

// //   return (
// //     <Card title={application.companyName}>
// //       <p><b>Job Title:</b> {application.jobTitle}</p>
// //       <p><b>Location:</b> {application.jobLocation}</p>
// //       <p><b>Job Type:</b> {application.jobType}</p>
// //       <p><b>Status:</b> {application.status}</p>
// //       <p><b>Salary Range:</b> ₹ {application.salaryRange?.min} – ₹ {application.salaryRange?.max}</p>
// //       <p><b>Applied Via:</b> {application.appliedVia}</p>
// //       <p><b>Date:</b> {new Date(application.applicationDate).toDateString()}</p>

// //       <p>
// //         <b>Application Link:</b>{" "}
// //         <a href={application.applicationLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
// //           {application.applicationLink}
// //         </a>
// //       </p>
// //       <p>
// //         <b>Company Career Page:</b>{" "}
// //         <a href={application.CompanyCareerPage} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
// //           {application.CompanyCareerPage}
// //         </a>
// //       </p>
// //       <p>
// //         <b>Portfolio/GitHub/LinkedIn:</b>{" "}
// //         <a href={application.PortfolioGitHubLinkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
// //           {application.PortfolioGitHubLinkedIn}
// //         </a>
// //       </p>

// //      <p>
// //   <b>Resume:</b>{" "}
// //   {application.resume?.data && (
// //     <>
// //       <a
// //         href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/resume`}
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="text-blue-600 underline mr-4"
// //       >
// //         View
// //       </a>
// //       <a
// //         href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/resume?download=true`}
// //         className="text-green-600 underline"
// //       >
// //         Download
// //       </a>
// //     </>
// //   )}
// // </p>

// // <p>
// //   <b>Cover Letter:</b>{" "}
// //   {application.coverLetter?.data && (
// //     <>
// //       <a
// //         href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/coverLetter`}
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="text-blue-600 underline mr-4"
// //       >
// //         View
// //       </a>
// //       <a
// //         href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/coverLetter?download=true`}
// //         className="text-green-600 underline"
// //       >
// //         Download
// //       </a>
// //     </>
// //   )}
// // </p>

// //       <p><b>Notes:</b> {application.notes}</p>
// //     </Card>
// //   );
// // };

// // export default ApplicationDetails;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Card, Input, Button, message, DatePicker, Select, Upload } from "antd";
// import dayjs from "dayjs";
// import { UploadOutlined } from "@ant-design/icons";
// import "../../index.css";
// import bgDashboard from "../../assets/bg2.jpg";

// const { TextArea } = Input;
// const { Option } = Select;

// const ApplicationDetails = () => {
//   const { id } = useParams();
//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fieldEditMode, setFieldEditMode] = useState({});
//   const [resumeFile, setResumeFile] = useState(null);
//   const [coverLetterFile, setCoverLetterFile] = useState(null);

//   const backendURL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     const fetchApplication = async () => {
//       try {
//         const res = await fetch(`${backendURL}/applications/${id}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setApplication(data.application);
//       } catch (err) {
//         console.error("Error fetching application:", err);
//       }
//     };

//     fetchApplication();
//   }, [id]);

//   if (!application) return <p>Loading...</p>;

//   const toggleFieldEdit = (field) => {
//     setFieldEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handleChange = (field, value) => {
//     setApplication((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSaveField = async (field) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${backendURL}/applications/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ [field]: application[field] }),
//       });
//       if (!res.ok) throw new Error("Failed to update field");
//       message.success(`${field} updated successfully`);
//       toggleFieldEdit(field);
//     } catch (err) {
//       console.error(err);
//       message.error(err.message || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const renderField = (label, field, type = "text", options = []) => {
//   //   return (
//   //     <div
//   //     // style={{ display: "flex", alignItems: "center", marginBottom: 8}}
//   //      style={{
//   //       display: "flex",
//   //       alignItems: "flex-start", // 👈 important for wrapped text
//   //       gap: 16,                  // 👈 space between label & value
//   //       marginBottom: 12,
//   //       padding: "4px 14px",
//   //       borderRadius: 10,
//   //       border: "1px solid rgba(255,255,255,0.2)",
//   //       background: "rgba(255,255,255,0.12)",
//   //       backdropFilter: "blur(10px)",
//   //     }}
//   //     >
//   //       <b style={{
//   //         width: 160,
//   //         flexShrink: 0,           // 👈 label never shrinks
//   //         // color: "white",
//   //         fontSize: 15,
//   //       }}>{label}:</b>

//   //       {fieldEditMode[field] ? (
//   //         <>
//   //           {type === "text" && (
//   //             <Input
//   //               value={application[field]}
//   //               onChange={(e) => handleChange(field, e.target.value)}
//   //               style={{ marginRight: 8 }}
//   //             />
//   //           )}
//   //           {type === "textarea" && (
//   //             <TextArea
//   //               value={application[field]}
//   //               onChange={(e) => handleChange(field, e.target.value)}
//   //               rows={2}
//   //               style={{ marginRight: 8 }}
//   //             />
//   //           )}
//   //           {type === "select" && (
//   //             <Select
//   //               value={application[field]}
//   //               onChange={(val) => handleChange(field, val)}
//   //               style={{ marginRight: 8, minWidth: 150 }}
//   //             >
//   //               {options.map((opt) => (
//   //                 <Option key={opt} value={opt}>
//   //                   {opt}
//   //                 </Option>
//   //               ))}
//   //             </Select>
//   //           )}
//   //           {type === "date" && (
//   //             <DatePicker
//   //               value={dayjs(application[field])}
//   //               onChange={(date) => handleChange(field, date.toISOString())}
//   //               style={{ marginRight: 8 }}
//   //             />
//   //           )}
//   //           <Button
//   //             type="primary"
//   //             size="small"
//   //             onClick={() => handleSaveField(field)}
//   //           >
//   //             Save
//   //           </Button>
//   //           <Button
//   //             size="small"
//   //             style={{ marginLeft: 4 }}
//   //             onClick={() => toggleFieldEdit(field)}
//   //           >
//   //             Cancel
//   //           </Button>
//   //         </>
//   //       ) : (
//   //         <>
//   //           <span style={{ marginRight: 8 }}>
//   //             {type === "date"
//   //               ? new Date(application[field]).toDateString()
//   //               : application[field]}
//   //           </span>
//   //           <Button size="small" onClick={() => toggleFieldEdit(field)}>
//   //             Edit
//   //           </Button>
//   //         </>
//   //       )}
//   //     </div>
//   //   );
//   // };

//   const renderField = (label, field, type = "text", options = []) => {
//     return (
//       <div
//         style={{
//           // fontSize: "16px",
//           display: "flex",
//           alignItems: "flex-start", // 👈 important for wrapped text
//           gap: 16, // 👈 space between label & value
//           marginBottom: 12,
//           padding: "0px 14px",
//           borderRadius: 10,
//           border: "1px solid rgba(255,255,255,0.2)",
//           background: "rgba(255,255,255,0.12)",
//           backdropFilter: "blur(10px)",
//         }}
//       >
//         {/* Label */}
//         <b
//           style={{
//             width: 270,
//             flexShrink: 0, // 👈 label never shrinks
//             // color: "white",
//             fontSize: 19,
//           }}
//         >
//           {label}:
//         </b>

//         {/* VALUE AREA */}
//         <div
//           style={{
//             flex: 1, // 👈 takes remaining space
//             // fontSize: "20px",
//             maxWidth: "70%", // 👈 prevents stretching too much
//             wordBreak: "break-word", // 👈 wraps long text
//           }}
//         >
//           {fieldEditMode[field] ? (
//             <>
//               {type === "text" && (
//                 <Input
//                   value={application[field]}
//                   onChange={(e) => handleChange(field, e.target.value)}
//                   style={{
//                     background: "transparent",
//                     border: "2px",
//                     // color: "  white",
//                     fontSize: "18px",
//                     borderColor: "rgba(255,255,255,0.3)",
//                   }}
//                 />
//               )}

//               {type === "textarea" && (
//                 <TextArea
//                   value={application[field]}
//                   onChange={(e) => handleChange(field, e.target.value)}
//                   rows={2}
//                   style={{
//                     background: "transparent",
//                     // color: "white",
//                     fontSize: "18px",
//                     border: "2px",
//                     borderColor: "rgba(255,255,255,0.3)",
//                   }}
//                 />
//               )}

//               {/* {type === "select" && (
//                 <Select
//                   value={application[field]}
//                   onChange={(val) => handleChange(field, val)}
//                   style={{ minWidth: 180, fontSize: "18px", }}
//                 >
//                   {options.map((opt) => (
//                     <Option key={opt} value={opt}>
//                       {opt}
//                     </Option>
//                   ))}
//                 </Select>
//               )} */}

//               {type === "select" && (
//                 <Select
//                   mode="tags" // allow custom input
//                   value={application[field] ? [application[field]] : []} // convert string to array
//                   onChange={(val) =>
//                     handleChange(field, val.length ? val[val.length - 1] : "")
//                   } // store only last value as string
//                   style={{ minWidth: 180, fontSize: "18px" }}
//                   placeholder={`Select or type ${label.toLowerCase()}`}
//                 >
//                   {options.map((opt) => (
//                     <Option key={opt} value={opt}>
//                       {opt}
//                     </Option>
//                   ))}
//                 </Select>
//               )}

//               {type === "date" && (
//                 <DatePicker
//                   value={dayjs(application[field])}
//                   style={{ fontSize: "18px" }}
//                   onChange={(date) => handleChange(field, date.toISOString())}
//                 />
//               )}

//               <div style={{ marginTop: 8 }}>
//                 <Button
//                   type="primary"
//                   size="small"
//                   onClick={() => handleSaveField(field)}
//                 >
//                   Save
//                 </Button>
//                 <Button
//                   size="small"
//                   style={{ marginLeft: 6 }}
//                   onClick={() => toggleFieldEdit(field)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <>
//               <span
//                 style={{
//                   // color: "rgba(255,255,255,0.9)",
//                   fontSize: 18,
//                   lineHeight: 1.2, // 👈 nicer wrapping
//                   // paddingRight: "40px"
//                   display: "block",
//                 }}
//               >
//                 {type === "date"
//                   ? new Date(application[field]).toDateString()
//                   : application[field] || "-"}
//               </span>

//               <Button
//                 size="small"
//                 type="link"
//                 style={{ padding: 0, color: "#60a5fa" }}
//                 onClick={() => toggleFieldEdit(field)}
//               >
//                 Edit
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       className="h-auto w-full bg-cover bg-center bg-fixed flex items-start overflow-hidden"
//       // style={{ backgroundImage: `url(${bgDashboard})` }}
//     >
//       <div className="p-30 pt-6 pb-10 h-auto w-full flex flex-col mx-26">
//         <div className="h-auto bg-transparent rounded-xl">
//           <Card
//             title={
//               <span
//                 style={{
//                   // color: "white",
//                   backgroundColor: "transparent",
//                   fontSize: "26px",
//                   fontWeight: 700,
//                   letterSpacing: "0.5px",
//                   textTransform: "uppercase",
//                   letterSpacing: "2px",
//                   paddingLeft: 12,
//                 }}
//               >
//                 {application.companyName}
//               </span>
//             }
//             style={{
//               backgroundColor: "white",
//               opacity: "0.8",
//               fontSize: "18px",
//               textAlign: "left",
//               gap: "20px",
//               paddingInline: "20px",
//             }}
//           >
//             {renderField("Job Title", "jobTitle", "select", [
//               "Frontend Developer",
//               "Backend Developer",
//               "Full Stack Developer",
//               "Junior Developer",
//               "Software Development Engineer (SDE)",
//               "Senior Software Engineer",
//               "Mobile App Developer",
//               "UI/UX Designer",
//               "Tech Lead",
//               "Senior Manager",
//             ])}

//             {renderField("Location", "jobLocation")}
//             {renderField("Job Type", "jobType", "select", [
//               "Full-time",
//               "Part-time",
//               "Internship",
//               "Contract",
//               "Remote",
//             ])}
//             {renderField("Status", "status", "select", [
//               "Saved",
//               "Applied",
//               "Shortlisted",
//               "Interview Scheduled",
//               "Offer",
//               "Rejected",
//             ])}
//             {renderField("Applied Via", "appliedVia", "select", [
//               "LinkedIn",
//               "Company Website",
//               "Referral",
//               "Indeed",
//               "Glassdoor",
//               "Naukri",
//               "Wellfound (AngelList)",
//               "Internshala",
//               "Recruiter Outreach",
//               "Campus Placement",
//               "Job Fair",
//               "Cold Email",
//               "Other",
//             ])}

//             {renderField("Application Date", "applicationDate", "date")}
//             {renderField("Application Link", "applicationLink")}
//             {renderField("Company Career Page", "CompanyCareerPage")}
//             {renderField(
//               "Portfolio/GitHub/LinkedIn",
//               "PortfolioGitHubLinkedIn"
//             )}
//             {renderField("Notes", "notes", "textarea")}

//             {/* File Uploads */}
//             <div style={{ marginTop: 16, marginLeft: 16 }}>
//               <b>Resume:</b>
//               {/* <Upload
//             beforeUpload={(file) => {
//               setResumeFile(file);
//               return false;
//             }}
//             showUploadList={false}
//           >
//             <Button icon={<UploadOutlined />} style={{ marginLeft: 8 }}>
//               Upload
//             </Button>
//           </Upload> */}
//               {resumeFile && (
//                 <span style={{ marginLeft: 8 }}>{resumeFile.name}</span>
//               )}
//               {application.resume?.data && (
//                 <>
//                   <a
//                     href={`${backendURL}/files/${application._id}/resume`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ marginLeft: 210 }}
//                   >
//                     View
//                   </a>
//                   <a
//                     href={`${backendURL}/files/${application._id}/resume?download=true`}
//                     style={{ marginLeft: 32 }}
//                   >
//                     Download
//                   </a>
//                 </>
//               )}
//             </div>

//             <div style={{ marginTop: 16, marginLeft: 16 }}>
//               <b>Cover Letter:</b>
//               {/* <Upload
//             beforeUpload={(file) => {
//               setCoverLetterFile(file);
//               return false;
//             }}
//             showUploadList={false}
//           >
//             <Button icon={<UploadOutlined />} style={{ marginLeft: 8 }}>
//               Upload
//             </Button>
//           </Upload> */}
//               {coverLetterFile && (
//                 <span style={{ marginLeft: 8 }}>{coverLetterFile.name}</span>
//               )}
//               {application.coverLetter?.data && (
//                 <>
//                   <a
//                     href={`${backendURL}/files/${application._id}/coverLetter`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ marginLeft: 172 }}
//                   >
//                     View
//                   </a>
//                   <a
//                     href={`${backendURL}/files/${application._id}/coverLetter?download=true`}
//                     style={{ marginLeft: 32 }}
//                   >
//                     Download
//                   </a>
//                 </>
//               )}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationDetails;

// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { Card } from "antd";

// // const ApplicationDetails = () => {
// //   const { id } = useParams();
// //   const [application, setApplication] = useState(null);

// //   useEffect(() => {
// //     fetch(`${import.meta.env.VITE_BACKEND_URL}/applications/${id}`, {
// //       credentials: "include",
// //     })
// //       .then((res) => res.json())
// //       .then((data) => setApplication(data.application));
// //   }, [id]);

// //   if (!application) return <p>Loading...</p>;

// //   return (
// //     <Card title={application.companyName}>
// //       <p>
// //         <b>Job Title:</b> {application.jobTitle}
// //       </p>
// //       <p>
// //         <b>Location:</b> {application.jobLocation}
// //       </p>
// //       <p>
// //         <b>Job Type:</b> {application.jobType}
// //       </p>
// //       <p>
// //         <b>Status:</b> {application.status}
// //       </p>
// //       <p>
// //         <b>Salary Range:</b>{" "}
// //           ₹ {application.salaryRange?.min} – ₹ {application.salaryRange?.max}

// //       </p>
// //       <p>
// //         <b>Applied Via:</b> {application.appliedVia}
// //       </p>
// //       <p>
// //         <b>Date:</b> {new Date(application.applicationDate).toDateString()}
// //       </p>

// //       <p>
// //         <b>Application Link:</b>{" "}
// //         <a
// //           href={application.applicationLink}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="text-blue-600 underline"
// //         >
// //           {application.applicationLink}
// //         </a>
// //       </p>

// //       <p>
// //         <b>CompanyCareer Page:</b>
// //         <a
// //           href={application.applicationLink}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="text-blue-600 underline"
// //         >
// //           {application.CompanyCareerPage}
// //         </a>
// //       </p>
// //       <p>
// //         <b>Portfolio/GitHub/LinkedIn:</b>
// //         <a
// //           href={application.applicationLink}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="text-blue-600 underline"
// //         >
// //           {application.PortfolioGitHubLinkedIn}
// //         </a>
// //       </p>

// //       <p>
// //         <b>resume:</b>
// //         <a
// //           href={application.resume}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="text-blue-600 underline"
// //         >
// //           {application.resume}
// //         </a>
// //       </p>

// //       <p>
// //         <b>coverLetter</b>
// //         <a
// //           href={application.coverLetter}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="text-blue-600 underline"
// //         >
// //           {application.coverLetter}
// //         </a>
// //       </p>

// //       <p>
// //         <b>Notes:</b> {application.notes}
// //       </p>
// //     </Card>
// //   );
// // };

// // export default ApplicationDetails;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Card } from "antd";

// const ApplicationDetails = () => {
//   const { id } = useParams();
//   const [application, setApplication] = useState(null);
//   const [files, setFiles] = useState({ resume: null, coverLetter: null });

//   useEffect(() => {
//     const backendURL = import.meta.env.VITE_BACKEND_URL;

//     // 1️⃣ Fetch application details
//     const fetchApplication = async () => {
//       try {
//         const res = await fetch(`${backendURL}/applications/${id}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setApplication(data.application);
//       } catch (err) {
//         console.error("Error fetching application:", err);
//       }
//     };

//     // 2️⃣ Fetch uploaded files
//     const fetchFiles = async () => {
//       try {
//         const res = await fetch(`${backendURL}/upload-docs/${id}`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setFiles({
//           resume: data.resume || null,
//           coverLetter: data.coverLetter || null,
//         });
//       } catch (err) {
//         console.error("Error fetching uploaded files:", err);
//       }
//     };

//     fetchApplication();
//     fetchFiles();
//   }, [id]);

//   if (!application) return <p>Loading...</p>;

//   return (
//     <Card title={application.companyName}>
//       <p><b>Job Title:</b> {application.jobTitle}</p>
//       <p><b>Location:</b> {application.jobLocation}</p>
//       <p><b>Job Type:</b> {application.jobType}</p>
//       <p><b>Status:</b> {application.status}</p>
//       <p><b>Salary Range:</b> ₹ {application.salaryRange?.min} – ₹ {application.salaryRange?.max}</p>
//       <p><b>Applied Via:</b> {application.appliedVia}</p>
//       <p><b>Date:</b> {new Date(application.applicationDate).toDateString()}</p>

//       <p>
//         <b>Application Link:</b>{" "}
//         <a href={application.applicationLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//           {application.applicationLink}
//         </a>
//       </p>
//       <p>
//         <b>Company Career Page:</b>{" "}
//         <a href={application.CompanyCareerPage} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//           {application.CompanyCareerPage}
//         </a>
//       </p>
//       <p>
//         <b>Portfolio/GitHub/LinkedIn:</b>{" "}
//         <a href={application.PortfolioGitHubLinkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//           {application.PortfolioGitHubLinkedIn}
//         </a>
//       </p>

//      <p>
//   <b>Resume:</b>{" "}
//   {application.resume?.data && (
//     <>
//       <a
//         href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/resume`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-600 underline mr-4"
//       >
//         View
//       </a>
//       <a
//         href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/resume?download=true`}
//         className="text-green-600 underline"
//       >
//         Download
//       </a>
//     </>
//   )}
// </p>

// <p>
//   <b>Cover Letter:</b>{" "}
//   {application.coverLetter?.data && (
//     <>
//       <a
//         href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/coverLetter`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-600 underline mr-4"
//       >
//         View
//       </a>
//       <a
//         href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/coverLetter?download=true`}
//         className="text-green-600 underline"
//       >
//         Download
//       </a>
//     </>
//   )}
// </p>

//       <p><b>Notes:</b> {application.notes}</p>
//     </Card>
//   );
// };

// export default ApplicationDetails;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  message,
  DatePicker,
  Select,
  Upload,
  Flex,
} from "antd";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";
import "../../index.css";
import bgDashboard from "../../assets/bg2.jpg";

const { TextArea } = Input;
const { Option } = Select;

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldEditMode, setFieldEditMode] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(`${backendURL}/applications/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setApplication(data.application);
      } catch (err) {
        console.error("Error fetching application:", err);
      }
    };

    fetchApplication();
  }, [id]);

  if (!application) return <p>Loading...</p>;

  const toggleFieldEdit = (field) => {
    setFieldEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field, value) => {
    setApplication((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveField = async (field) => {
    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [field]: application[field] }),
      });
      if (!res.ok) throw new Error("Failed to update field");
      message.success(`${field} updated successfully`);
      toggleFieldEdit(field);
    } catch (err) {
      console.error(err);
      message.error(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, field, type = "text", options = []) => {
    return (
      <div className="flex flex-col md:flex-row md:items-start gap-0 md:gap-4 mb-0 px-3 py-1 rounded-xl border border-white/20 bg-white/10 backdrop-blur">
        {/* Label */}
        <b className="md:w-[270px] w-full flex-shrink-0 text-base md:text-lg">
          {label}:
        </b>

        {/* VALUE AREA */}
        <div className="flex-1 w-full md:max-w-[70%] break-words">
          {fieldEditMode[field] ? (
            <>
              {type === "text" && (
                <Input
                  value={application[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  style={{
                    background: "transparent",
                    border: "2px",
                    // color: "  white",
                    fontSize: "18px",
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                />
              )}

              {type === "textarea" && (
                <TextArea
                  value={application[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  rows={2}
                  style={{
                    background: "transparent",
                    // color: "white",
                    fontSize: "18px",
                    border: "2px",
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                />
              )}

              {/* {type === "select" && (
                <Select
                  value={application[field]}
                  onChange={(val) => handleChange(field, val)}
                  style={{ minWidth: 180, fontSize: "18px", }}
                >
                  {options.map((opt) => (
                    <Option key={opt} value={opt}>
                      {opt}
                    </Option>
                  ))}
                </Select>
              )} */}

              {type === "select" && (
                <Select
                  mode="tags" // allow custom input
                  value={application[field] ? [application[field]] : []} // convert string to array
                  onChange={(val) =>
                    handleChange(field, val.length ? val[val.length - 1] : "")
                  } // store only last value as string
                  style={{ minWidth: 180, fontSize: "18px" }}
                  placeholder={`Select or type ${label.toLowerCase()}`}
                >
                  {options.map((opt) => (
                    <Option key={opt} value={opt}>
                      {opt}
                    </Option>
                  ))}
                </Select>
              )}

              {type === "date" && (
                <DatePicker
                  value={dayjs(application[field])}
                  style={{ fontSize: "18px" }}
                  onChange={(date) => handleChange(field, date.toISOString())}
                />
              )}

              <div style={{ marginTop: 8 }}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleSaveField(field)}
                >
                  Save
                </Button>
                <Button
                  size="small"
                  style={{ marginLeft: 6 }}
                  onClick={() => toggleFieldEdit(field)}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <span
                style={{
                  // color: "rgba(255,255,255,0.9)",
                  fontSize: 18,
                  lineHeight: 1.2, // 👈 nicer wrapping
                  // paddingRight: "40px"
                  display: "block",
                }}
              >
                {type === "date"
                  ? new Date(application[field]).toDateString()
                  : application[field] || "-"}
              </span>

              <Button
                size="small"
                type="link"
                style={{ padding: 0, color: "#60a5fa" }}
                onClick={() => toggleFieldEdit(field)}
              >
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="h-auto w-full bg-cover bg-center bg-fixed flex items-start overflow-hidden"
      // style={{ backgroundImage: `url(${bgDashboard})` }}
    >
      {/* <div className="md:p-30 md:pt-6 md:pb-10 h-auto md:w-full w-80 p-2 flex md:flex-col md:mx-26 mt-6"> */}
      <div className="w-full max-w-5xl mx-auto px-3 md:px-8 py-4">
        <div className="h-auto bg-transparent md:rounded-xl md:w-full md:mx-0 w-70 mx-6">
          <Card
            title={
              <span
                style={{
                  // color: "white",
                  backgroundColor: "transparent",
                  fontSize: "26px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  paddingLeft: 12,
                }}
              >
                {application.companyName}
              </span>
            }
            style={{
              backgroundColor: "white",
              opacity: "0.8",
              fontSize: "18px",
              textAlign: "left",
              gap: "20px",
              paddingInline: "20px",
            }}
          >
            {renderField("Job Title", "jobTitle", "select", [
              "Frontend Developer",
              "Backend Developer",
              "Full Stack Developer",
              "Junior Developer",
              "Software Development Engineer (SDE)",
              "Senior Software Engineer",
              "Mobile App Developer",
              "UI/UX Designer",
              "Tech Lead",
              "Senior Manager",
            ])}

            {renderField("Location", "jobLocation")}
            {renderField("Job Type", "jobType", "select", [
              "Full-time",
              "Part-time",
              "Internship",
              "Contract",
              "Remote",
            ])}
            {renderField("Status", "status", "select", [
              "Saved",
              "Applied",
              "Shortlisted",
              "Interview Scheduled",
              "Offer",
              "Rejected",
            ])}
            {renderField("Applied Via", "appliedVia", "select", [
              "LinkedIn",
              "Company Website",
              "Referral",
              "Indeed",
              "Glassdoor",
              "Naukri",
              "Wellfound (AngelList)",
              "Internshala",
              "Recruiter Outreach",
              "Campus Placement",
              "Job Fair",
              "Cold Email",
              "Other",
            ])}

            {renderField("Application Date", "applicationDate", "date")}
            {renderField("Application Link", "applicationLink")}
            {renderField("Company Career Page", "CompanyCareerPage")}
            {renderField(
              "Portfolio/GitHub/LinkedIn",
              "PortfolioGitHubLinkedIn"
            )}
            {renderField("Notes", "notes", "textarea")}

            {/* File Uploads */}
            <div style={{ marginTop: 16, marginLeft: 16 }}>
              <b>Resume:</b>
              {/* <Upload
            beforeUpload={(file) => {
              setResumeFile(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} style={{ marginLeft: 8 }}>
              Upload
            </Button>
          </Upload> */}
              {resumeFile && (
                <span style={{ marginLeft: 0 }}>{resumeFile.name}</span>
              )}
              {application.resume?.data && (
                // <>

                <div className="gap-0 mt-0">
                  <a
                    href={`${backendURL}/files/${application._id}/resume`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 0 }}
                  >
                    View
                  </a>
                  <a
                    href={`${backendURL}/files/${application._id}/resume?download=true`}
                    style={{ marginLeft: 8 }}
                  >
                    Download
                  </a>
                </div>
                // </>
              )}
            </div>

            <div style={{ marginTop: 16, marginLeft: 16 }}>
              <b>Cover Letter:</b>
              {/* <Upload
            beforeUpload={(file) => {
              setCoverLetterFile(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} style={{ marginLeft: 8 }}>
              Upload
            </Button>
          </Upload> */}
              {coverLetterFile && (
                <span style={{ marginLeft: 8 }}>{coverLetterFile.name}</span>
              )}
              {application.coverLetter?.data && (
                <>
                  <div className="gap-0 mt-0">
                    <a
                      href={`${backendURL}/files/${application._id}/coverLetter`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: 0 }}
                    >
                      View
                    </a>
                    <a
                      href={`${backendURL}/files/${application._id}/coverLetter?download=true`}
                      style={{ marginLeft: 8 }}
                    >
                      Download
                    </a>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
