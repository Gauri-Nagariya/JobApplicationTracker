// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Card } from "antd";

// const ApplicationDetails = () => {
//   const { id } = useParams();
//   const [application, setApplication] = useState(null);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BACKEND_URL}/applications/${id}`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => setApplication(data.application));
//   }, [id]);

//   if (!application) return <p>Loading...</p>;

//   return (
//     <Card title={application.companyName}>
//       <p>
//         <b>Job Title:</b> {application.jobTitle}
//       </p>
//       <p>
//         <b>Location:</b> {application.jobLocation}
//       </p>
//       <p>
//         <b>Job Type:</b> {application.jobType}
//       </p>
//       <p>
//         <b>Status:</b> {application.status}
//       </p>
//       <p>
//         <b>Salary Range:</b>{" "}
//           ₹ {application.salaryRange?.min} – ₹ {application.salaryRange?.max}
        
//       </p>
//       <p>
//         <b>Applied Via:</b> {application.appliedVia}
//       </p>
//       <p>
//         <b>Date:</b> {new Date(application.applicationDate).toDateString()}
//       </p>

//       <p>
//         <b>Application Link:</b>{" "}
//         <a
//           href={application.applicationLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 underline"
//         >
//           {application.applicationLink}
//         </a>
//       </p>

//       <p>
//         <b>CompanyCareer Page:</b>
//         <a
//           href={application.applicationLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 underline"
//         >
//           {application.CompanyCareerPage}
//         </a>
//       </p>
//       <p>
//         <b>Portfolio/GitHub/LinkedIn:</b>
//         <a
//           href={application.applicationLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 underline"
//         >
//           {application.PortfolioGitHubLinkedIn}
//         </a>
//       </p>

//       <p>
//         <b>resume:</b>
//         <a
//           href={application.resume}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 underline"
//         >
//           {application.resume}
//         </a>
//       </p>

//       <p>
//         <b>coverLetter</b>
//         <a
//           href={application.coverLetter}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 underline"
//         >
//           {application.coverLetter}
//         </a>
//       </p>

//       <p>
//         <b>Notes:</b> {application.notes}
//       </p>
//     </Card>
//   );
// };

// export default ApplicationDetails;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "antd";

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [files, setFiles] = useState({ resume: null, coverLetter: null });

  useEffect(() => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    // 1️⃣ Fetch application details
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

    // 2️⃣ Fetch uploaded files
    const fetchFiles = async () => {
      try {
        const res = await fetch(`${backendURL}/upload-docs/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setFiles({
          resume: data.resume || null,
          coverLetter: data.coverLetter || null,
        });
      } catch (err) {
        console.error("Error fetching uploaded files:", err);
      }
    };

    fetchApplication();
    fetchFiles();
  }, [id]);

  if (!application) return <p>Loading...</p>;

  return (
    <Card title={application.companyName}>
      <p><b>Job Title:</b> {application.jobTitle}</p>
      <p><b>Location:</b> {application.jobLocation}</p>
      <p><b>Job Type:</b> {application.jobType}</p>
      <p><b>Status:</b> {application.status}</p>
      <p><b>Salary Range:</b> ₹ {application.salaryRange?.min} – ₹ {application.salaryRange?.max}</p>
      <p><b>Applied Via:</b> {application.appliedVia}</p>
      <p><b>Date:</b> {new Date(application.applicationDate).toDateString()}</p>

      <p>
        <b>Application Link:</b>{" "}
        <a href={application.applicationLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {application.applicationLink}
        </a>
      </p>
      <p>
        <b>Company Career Page:</b>{" "}
        <a href={application.CompanyCareerPage} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {application.CompanyCareerPage}
        </a>
      </p>
      <p>
        <b>Portfolio/GitHub/LinkedIn:</b>{" "}
        <a href={application.PortfolioGitHubLinkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {application.PortfolioGitHubLinkedIn}
        </a>
      </p>

     <p>
  <b>Resume:</b>{" "}
  {application.resume?.data && (
    <>
      <a
        href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/resume`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mr-4"
      >
        View
      </a>
      <a
        href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/resume?download=true`}
        className="text-green-600 underline"
      >
        Download
      </a>
    </>
  )}
</p>

<p>
  <b>Cover Letter:</b>{" "}
  {application.coverLetter?.data && (
    <>
      <a
        href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/coverLetter`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mr-4"
      >
        View
      </a>
      <a
        href={`${import.meta.env.VITE_BACKEND_URL}/files/${application._id}/coverLetter?download=true`}
        className="text-green-600 underline"
      >
        Download
      </a>
    </>
  )}
</p>



      <p><b>Notes:</b> {application.notes}</p>
    </Card>
  );
};

export default ApplicationDetails;
