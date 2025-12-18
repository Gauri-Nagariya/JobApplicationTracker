import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "antd";

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/applications/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setApplication(data.application));
  }, [id]);

  if (!application) return <p>Loading...</p>;

  return (
    <Card title={application.companyName}>
      <p>
        <b>Job Title:</b> {application.jobTitle}
      </p>
      <p>
        <b>Location:</b> {application.jobLocation}
      </p>
      <p>
        <b>Job Type:</b> {application.jobType}
      </p>
      <p>
        <b>Status:</b> {application.status}
      </p>
      <p>
        <b>Salary Range:</b>{" "}
          ₹ {application.salaryRange?.min} – ₹ {application.salaryRange?.max}
        
      </p>
      <p>
        <b>Applied Via:</b> {application.appliedVia}
      </p>
      <p>
        <b>Date:</b> {new Date(application.applicationDate).toDateString()}
      </p>

      <p>
        <b>Application Link:</b>{" "}
        <a
          href={application.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {application.applicationLink}
        </a>
      </p>

      <p>
        <b>CompanyCareer Page:</b>
        <a
          href={application.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {application.CompanyCareerPage}
        </a>
      </p>
      <p>
        <b>Portfolio/GitHub/LinkedIn:</b>
        <a
          href={application.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {application.PortfolioGitHubLinkedIn}
        </a>
      </p>

      <p>
        <b>Notes:</b> {application.notes}
      </p>
    </Card>
  );
};

export default ApplicationDetails;
