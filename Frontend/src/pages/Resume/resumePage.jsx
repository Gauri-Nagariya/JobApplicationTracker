// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Steps,
//   Upload,
//   Button,
//   Input,
//   Select,
//   message,
//   Progress,
//   Card,
//   Row,
//   Col,
//   Tag,
//   Space,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";

// const { TextArea } = Input;

// const ResumePage = () => {
//   const [current, setCurrent] = useState(0);
//   const [fileList, setFileList] = useState([]);
//   const [jdText, setJdText] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [customJob, setCustomJob] = useState("");
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const backendURL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     const savedStep = localStorage.getItem("resumeCurrentStep");
//     if (savedStep) setCurrent(Number(savedStep));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("resumeCurrentStep", current);
//   }, [current]);

//   const handleScan = async () => {
//     if (!fileList.length || !jdText || !jobTitle) {
//       message.error("Please upload resume, select job title and paste job description");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("resume", fileList[0].originFileObj);
//       formData.append("jobDescription", jdText);

//       const res = await fetch(`${backendURL}/analyze-resume`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       const data = await res.json();
//       if (!data.success) {
//         message.error("Resume analysis failed");
//         return;
//       }

//       setAnalysis(data.analysis);
//       setCurrent(2); // go to results
//     } catch (err) {
//       message.error("Server error during analysis");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const steps = [
//     {
//       title: "Upload Resume",
//       content: (
//         <Upload
//           beforeUpload={() => false}
//           fileList={fileList}
//           onChange={({ fileList }) => setFileList(fileList)}
//         >
//           <Button icon={<UploadOutlined />}>Click to Upload Resume</Button>
//         </Upload>
//       ),
//     },
//     {
//       title: "Add Job",
//       content: (
//         <div className="flex flex-col gap-4 md:flex-row">
//           <div style={{ flex: 1 }}>
//             <TextArea
//               rows={6}
//               placeholder="Copy and paste a job description here"
//               value={jdText}
//               onChange={(e) => setJdText(e.target.value)}
//             />
//           </div>
//           <div style={{ flex: 1 }}>
//             <Select
//               style={{ width: "100%" }}
//               placeholder="Select or add job title"
//               value={jobTitle || undefined}
//               onChange={(value) => setJobTitle(value)}
//               popupRender={(menu) => (
//                 <>
//                   {menu}
//                   <div style={{ display: "flex", padding: 8 }}>
//                     <Input
//                       style={{ flex: "auto" }}
//                       value={customJob}
//                       onChange={(e) => setCustomJob(e.target.value)}
//                       placeholder="Add new job title"
//                     />
//                     <Button
//                       type="text"
//                       onClick={() => {
//                         if (customJob && !jobTitle) {
//                           setJobTitle(customJob);
//                           setCustomJob("");
//                           message.success("Job title added!");
//                         }
//                       }}
//                     >
//                       Add
//                     </Button>
//                   </div>
//                 </>
//               )}
//               options={[
//                 { label: "Full Stack Developer", value: "Full Stack Developer" },
//                 { label: "Frontend Developer", value: "Frontend Developer" },
//                 { label: "Backend Developer", value: "Backend Developer" },
//               ]}
//             />
//           </div>
//           <div className="mt-4 md:mt-0 md:ml-4">
//             <Button type="primary" onClick={handleScan} loading={loading}>
//               Scan Resume
//             </Button>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "View Results",
//       content: analysis && (
//         <div>
//           <h2 className="mb-6 text-2xl font-bold">Resume Analysis</h2>

//           {/* Searchability */}
//           <Card title="Searchability" className="mb-4">
//             <Progress percent={analysis.searchabilityScore} />
//           </Card>

//           {/* Hard Skills */}
//           <Card title="Hard Skills" className="mb-4">
//             <p>Matched</p>
//             <Space wrap>
//               {analysis.hardSkills.matched.map((s) => (
//                 <Tag color="green" key={s}>{s}</Tag>
//               ))}
//             </Space>
//             <p className="mt-3">Missing</p>
//             <Space wrap>
//               {analysis.hardSkills.missing.map((s) => (
//                 <Tag color="red" key={s}>{s}</Tag>
//               ))}
//             </Space>
//           </Card>

//           {/* Soft Skills */}
//           <Card title="Soft Skills" className="mb-4">
//             <p>Matched</p>
//             <Space wrap>
//               {analysis.softSkills.matched.length === 0
//                 ? <Tag color="volcano">No matching soft skills</Tag>
//                 : analysis.softSkills.matched.map((s) => (
//                   <Tag color="green" key={s}>{s}</Tag>
//                 ))}
//             </Space>
//             <p className="mt-3">Missing</p>
//             <Space wrap>
//               {analysis.softSkills.missing.map((s) => (
//                 <Tag color="red" key={s}>{s}</Tag>
//               ))}
//             </Space>
//           </Card>

//           {/* Tools */}
//           {analysis.tools && (
//             <Card title="Tools / Technologies" className="mb-4">
//               <p>Matched</p>
//               <Space wrap>
//                 {analysis.tools.matched.map((s) => (
//                   <Tag color="green" key={s}>{s}</Tag>
//                 ))}
//               </Space>
//               <p className="mt-3">Missing</p>
//               <Space wrap>
//                 {analysis.tools.missing.map((s) => (
//                   <Tag color="red" key={s}>{s}</Tag>
//                 ))}
//               </Space>
//             </Card>
//           )}

//           {/* Missing Sections */}
//           <Card title="Missing Sections" className="mb-4">
//             {analysis.missingSections.length === 0
//               ? <Tag color="blue">All sections present</Tag>
//               : analysis.missingSections.map((s) => <Tag color="orange" key={s}>{s}</Tag>)
//             }
//           </Card>

//           {/* Recruiter Insights */}
//           <Card title="Recruiter Insights" className="mb-4">
//             <p>{analysis.recruiterInsights.reason}</p>
//             <Tag color="blue">Recruiter Time Saved: {analysis.recruiterInsights.recruiterTimeSaved}</Tag>
//           </Card>

//           {/* Improvement Tips */}
//           <Card title="Improvement Tips" className="mb-4">
//             <ul className="list-disc pl-5">
//               {analysis.improvementTips.map((tip, i) => <li key={i}>{tip}</li>)}
//             </ul>
//           </Card>

//           {/* Overall Resume Score */}
//           <Card title="Overall Resume Score" className="text-center">
//             <Progress type="circle" percent={analysis.overallResumeScore} />
//             <p className="mt-2 font-semibold">Score: {analysis.overallResumeScore}/100</p>
//             {analysis.funInsight && <p className="mt-2">{analysis.funInsight}</p>}
//           </Card>
//         </div>
//       ),
//     },
//   ];

//   const next = () => setCurrent(current + 1);
//   const prev = () => setCurrent(current - 1);

//   return (
//     <div className="p-8 min-h-screen bg-[#1B1B2F] text-white">
//       <Steps
//         current={current}
//         className="mb-6 text-white"
//         items={steps.map((item) => ({ key: item.title, title: item.title }))}
//       />
//       <div className="pt-6 mb-6">{steps[current].content}</div>
//       <div className="flex gap-2">
//         {current > 0 && <Button onClick={prev}>Previous</Button>}
//         {current < steps.length - 1 && current !== 1 && (
//           <Button type="primary" onClick={next} disabled={current === 0 && fileList.length === 0}>
//             Next
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResumePage;

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Steps,
//   Upload,
//   Button,
//   Input,
//   Select,
//   message,
//   Progress,
//   Card,
//   Space,
//   Tag,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";

// const { TextArea } = Input;

// const ResumePage = () => {
//   const [current, setCurrent] = useState(0);
//   const [fileList, setFileList] = useState([]);
//   const [jdText, setJdText] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [customJob, setCustomJob] = useState("");
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const backendURL = "http://localhost:5000";

//   const handleScan = async () => {
//     if (!fileList.length || !jdText || !jobTitle) {
//       message.error("Please upload resume, select job title and paste job description");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("resume", fileList[0].originFileObj);
//       formData.append("jobDescription", jdText);

//       const res = await fetch(`${backendURL}/analyze-resume`, {
//         method: "POST",
//         body: formData,
//         credentials: 'include',
//       });

//       const data = await res.json();
//       if (!data.success) {
//         message.error("Resume analysis failed");
//         return;
//       }

//       setAnalysis(data.analysis);
//       setCurrent(2); // Go to results step
//     } catch (err) {
//       console.error(err);
//       message.error("Server error during analysis");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const steps = [
//     {
//       title: "Upload Resume",
//       content: (
//         <Upload
//           beforeUpload={() => false}
//           fileList={fileList}
//           onChange={({ fileList }) => setFileList(fileList)}
//         >
//           <Button icon={<UploadOutlined />}>Click to Upload Resume</Button>
//         </Upload>
//       ),
//     },
//     {
//       title: "Add Job",
//       content: (
//         <div className="flex flex-col gap-4 md:flex-row">
//           <div style={{ flex: 1 }}>
//             <TextArea
//               rows={6}
//               placeholder="Copy and paste a job description here"
//               value={jdText}
//               onChange={(e) => setJdText(e.target.value)}
//             />
//           </div>
//           <div style={{ flex: 1 }}>
//             <Select
//               style={{ width: "100%" }}
//               placeholder="Select or add job title"
//               value={jobTitle || undefined}
//               onChange={(value) => setJobTitle(value)}
//               popupRender={(menu) => (
//                 <>
//                   {menu}
//                   <div style={{ display: "flex", padding: 8 }}>
//                     <Input
//                       style={{ flex: "auto" }}
//                       value={customJob}
//                       onChange={(e) => setCustomJob(e.target.value)}
//                       placeholder="Add new job title"
//                     />
//                     <Button
//                       type="text"
//                       onClick={() => {
//                         if (customJob && !jobTitle) {
//                           setJobTitle(customJob);
//                           setCustomJob("");
//                           message.success("Job title added!");
//                         }
//                       }}
//                     >
//                       Add
//                     </Button>
//                   </div>
//                 </>
//               )}
//               options={[
//                 { label: "Full Stack Developer", value: "Full Stack Developer" },
//                 { label: "Frontend Developer", value: "Frontend Developer" },
//                 { label: "Backend Developer", value: "Backend Developer" },
//               ]}
//             />
//           </div>
//           <div className="mt-4 md:mt-0 md:ml-4">
//             <Button type="primary" onClick={handleScan} loading={loading}>
//               Scan Resume
//             </Button>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "View Results",
//       content: analysis && (
//         <div>
//           <h2 className="mb-6 text-2xl font-bold">Resume Analysis</h2>

//           {/* Searchability */}
//           <Card title="Searchability" className="mb-4">
//             <Progress percent={analysis.searchabilityScore} />
//           </Card>

//           {/* Hard Skills */}
//           <Card title="Hard Skills" className="mb-4">
//             <p>Matched</p>
//             <Space wrap>
//               {analysis.hardSkills.matched.map((skill) => (
//                 <Tag key={skill} color="green">{skill}</Tag>
//               ))}
//             </Space>
//             <p className="mt-3">Missing</p>
//             <Space wrap>
//               {analysis.hardSkills.missing.map((skill) => (
//                 <Tag key={skill} color="red">{skill}</Tag>
//               ))}
//             </Space>
//           </Card>

//           {/* Soft Skills */}
//           <Card title="Soft Skills" className="mb-4">
//             <p>Matched</p>
//             <Space wrap>
//               {analysis.softSkills.matched.length
//                 ? analysis.softSkills.matched.map((skill) => (
//                     <Tag key={skill} color="green">{skill}</Tag>
//                   ))
//                 : <Tag color="volcano">No matching soft skills</Tag>
//               }
//             </Space>
//             <p className="mt-3">Missing</p>
//             <Space wrap>
//               {analysis.softSkills.missing.map((skill) => (
//                 <Tag key={skill} color="red">{skill}</Tag>
//               ))}
//             </Space>
//           </Card>

//           {/* Tools */}
//           <Card title="Tools / Technologies" className="mb-4">
//             <p>Matched</p>
//             <Space wrap>
//               {analysis.tools.matched.map((skill) => (
//                 <Tag key={skill} color="green">{skill}</Tag>
//               ))}
//             </Space>
//             <p className="mt-3">Missing</p>
//             <Space wrap>
//               {analysis.tools.missing.map((skill) => (
//                 <Tag key={skill} color="red">{skill}</Tag>
//               ))}
//             </Space>
//           </Card>

//           {/* Missing Sections */}
//           <Card title="Missing Sections" className="mb-4">
//             {analysis.missingSections.length
//               ? analysis.missingSections.map((section) => (
//                   <Tag key={section} color="orange">{section}</Tag>
//                 ))
//               : <Tag color="green">All sections present</Tag>
//             }
//           </Card>

//           {/* Recruiter Insights */}
//           <Card title="Recruiter Insights" className="mb-4">
//             <p>{analysis.recruiterInsights.reason}</p>
//             <Tag color="blue">Recruiter Time Saved: {analysis.recruiterInsights.recruiterTimeSaved}</Tag>
//           </Card>

//           {/* Improvement Tips */}
//           <Card title="Improvement Tips" className="mb-4">
//             <ul className="list-disc pl-5">
//               {analysis.improvementTips.map((tip, i) => <li key={i}>{tip}</li>)}
//             </ul>
//           </Card>

//           {/* Overall Resume Score */}
//           <Card title="Overall Resume Score" className="text-center">
//             <Progress type="circle" percent={analysis.overallResumeScore} />
//             <p className="mt-2 font-semibold">Score: {analysis.overallResumeScore}/100</p>
//             <p>{analysis.funInsight}</p>
//           </Card>
//         </div>
//       ),
//     },
//   ];

//   const next = () => setCurrent(current + 1);
//   const prev = () => setCurrent(current - 1);

//   return (
//     <div className="p-8 min-h-screen bg-[#1B1B2F] text-white">
//       <Steps
//         current={current}
//         className="mb-6 text-white"
//         items={steps.map(item => ({ key: item.title, title: item.title }))}
//       />
//       <div className="pt-6 mb-6">{steps[current].content}</div>
//       <div className="flex gap-2">
//         {current > 0 && <Button onClick={prev}>Previous</Button>}
//         {current < steps.length - 1 && current !== 1 && <Button type="primary" onClick={next}>Next</Button>}
//       </div>
//     </div>
//   );
// };

// export default ResumePage;

// "use client";

import React, { useState } from "react";
// import "../index.css";
import {
  Steps,
  Upload,
  Button,
  Input,
  Select,
  message,
  Progress,
  Card,
  Space,
  Tag,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import { useEffect } from "react";

const { TextArea } = Input;

const ResumePage = () => {
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [jdText, setJdText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [customJob, setCustomJob] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //   const savedStep = localStorage.getItem("resumeStep");
  //   if (savedStep) setCurrent(Number(savedStep));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("resumeStep", current);
  // }, [current]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleScan = async () => {
    if (!fileList.length || !jdText) {
      message.error("Please upload resume and paste job description");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", fileList[0].originFileObj);
      formData.append("jobDescription", jdText);

      const res = await fetch(`${backendURL}/analyze-resume`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) {
        message.error("Resume analysis failed");
        return;
      }

      setAnalysis(data.analysis);
      setCurrent(2); // Go to results
    } catch (err) {
      console.error(err);
      message.error("Server error during analysis");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Upload Resume",
      content: (
        <div className="flex flex-col items-center text-center px-4">
          {/* Tagline */}
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-8">
            Land interviews faster with a perfect resume
          </h2>

          {/* Description paragraph */}
          <p className="text-gray-400 text-sm md:text-xl mb-8 max-w-xl">
            Upload your resume and let our tool analyze it for key skills,
            experience, and achievements. Get actionable insights to ensure your
            resume stands out and matches the job requirements recruiters are
            looking for.
          </p>

          {/* Upload button */}
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList.slice(-1))}
              className="!text-white"
          >
            <Button
              icon={<UploadOutlined />}
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 border-none"
            >
              Click to Upload Resume
            </Button>
          </Upload>

          {/* Optional small note */}
          {fileList.length === 0 && (
            <p className="text-gray-500 text-xs mt-3">
              Supported formats: PDF, DOCX. Max size 5MB.
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Add Job",
      content: (
        <div className="flex flex-col items-center text-center px-4">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Paste Your Job Description
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl">
            Copy and paste the job description here so we can analyze your
            resume and highlight the skills and experience that match the role.
          </p>

          {/* Textarea */}
          <TextArea
            rows={10}
            placeholder="Paste job description here..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            className="mb-8 max-w-2xl"
          />

          {/* Scan button */}
          <Button
            type="primary"
            size="large"
            onClick={handleScan}
            loading={loading}
            className="bg-blue-600 mt-8 hover:bg-blue-700 border-none"
          >
            Scan Resume
          </Button>
        </div>
      ),
    },
    {
      title: "View Results",
      content: analysis && (
        <div className="flex flex-col items-center px-4 space-y-6">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Resume Analysis
          </h2>

          {/* Searchability */}
          <Card
            title="Searchability"
            className="w-full max-w-full !mb-2 bg-gray-800 text-white rounded-lg shadow-md"
          >
            <Progress
              percent={analysis.searchabilityScore}
              // strokeColor="#4ade80"
              strokeColor={
                analysis.searchabilityScore <= 50
                  ? "#f87171" // red
                  : analysis.searchabilityScore <= 75
                  ? "#facc15" // yellow/orange
                  : "#4ade80" // green
              }
              strokeWidth={12}
            />
          </Card>

          <div className=" border-0 md:grid md:grid-cols-2 md:gap-2 mb-2">
          {/* Hard Skills */}
          <Card
            title="Hard Skills"
            className="w-full max-w-3xl bg-gray-800 text-white md:!mb-0 !mb-2 rounded-lg shadow-md"
          >
            <p className="font-semibold">Matched:</p>
            <Space wrap>
              {analysis.hardSkills.matched.length ? (
                analysis.hardSkills.matched.map((skill) => (
                  <Tag key={skill} color="green">
                    {skill}
                  </Tag>
                ))
              ) : (
                <Tag color="volcano">No hard skills matched</Tag>
              )}
            </Space>

            <p className="mt-3 font-semibold">Missing:</p>
            <Space wrap>
              {analysis.hardSkills.missing.map((skill) => (
                <Tag key={skill} color="red">
                  {skill}
                </Tag>
              ))}
            </Space>
          </Card>

          {/* Soft Skills */}
          <Card
            title="Soft Skills"
            className="w-full max-w-3xl bg-gray-800 text-white rounded-lg shadow-md  md:!mb-0 !mb-2"
          >
            <p className="font-semibold">Matched:</p>
            <Space wrap>
              {analysis.softSkills.matched.length ? (
                analysis.softSkills.matched.map((skill) => (
                  <Tag key={skill} color="green">
                    {skill}
                  </Tag>
                ))
              ) : (
                <Tag color="volcano">No matching soft skills</Tag>
              )}
            </Space>

            <p className="mt-3 font-semibold">Missing:</p>
            <Space wrap>
              {analysis.softSkills.missing.map((skill) => (
                <Tag key={skill} color="red">
                  {skill}
                </Tag>
              ))}
            </Space>
          </Card>

          {/* Tools / Technologies */}
          <Card
            title="Tools / Technologies"
            className="w-full max-w-3xl bg-gray-800 text-white rounded-lg shadow-md  md:!mb-0 !mb-2"
          >
            <p className="font-semibold">Matched:</p>
            <Space wrap>
              {analysis.tools.matched.length ? (
                analysis.tools.matched.map((skill) => (
                  <Tag key={skill} color="green">
                    {skill}
                  </Tag>
                ))
              ) : (
                <Tag color="volcano">No tools matched</Tag>
              )}
            </Space>

            <p className="mt-3 font-semibold">Missing:</p>
            <Space wrap>
              {analysis.tools.missing.map((skill) => (
                <Tag key={skill} color="red">
                  {skill}
                </Tag>
              ))}
            </Space>
          </Card>

          {/* Missing Sections */}
          <Card
            title="Missing Sections"
            className="w-full max-w-3xl bg-gray-800 text-white rounded-lg shadow-md"
          >
            {analysis.missingSections.length ? (
              analysis.missingSections.map((section) => (
                <Tag key={section} color="orange">
                  {section}
                </Tag>
              ))
            ) : (
              <Tag color="green">All sections present</Tag>
            )}
          </Card>

          </div>


          {/* Recruiter Insights */}
          <Card
            title="Recruiter Insights"
            className="w-full max-w-full !mb-2 bg-gray-800 text-white rounded-lg shadow-md"
          >
            <p>{analysis.recruiterInsights.reason}</p>
            <Tag color="blue">
              Recruiter Time Saved:{" "}
              {analysis.recruiterInsights.recruiterTimeSaved}
            </Tag>
          </Card>

          {/* <div className="flex w-full gap-2"> */}
          {/* Improvement Tips */}
          <Card
            title="Improvement Tips"
            className="w-full max-w-full bg-gray-800 text-white rounded-lg shadow-md"
          >
            <ul className="list-disc pl-5">
              {analysis.improvementTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </Card>

          {/* Overall Resume Score */}
          <Card
            title="Overall Resume Score"
            className="w-full max-w-full text-center bg-gray-800 text-white rounded-lg shadow-md !my-2"
          >
            <Progress
              type="circle"
              percent={analysis.overallResumeScore}
              // strokeColor="#4ade80"
              strokeColor={
                analysis.searchabilityScore <= 50
                  ? "#f87171" // red
                  : analysis.searchabilityScore <= 75
                  ? "#facc15" // yellow/orange
                  : "#4ade80" // green
              }
              strokeWidth={12}
            />
            <p className="mt-2 font-semibold text-lg">
              Score: {analysis.overallResumeScore}/100
            </p>
            <p className="text-gray-400">{analysis.funInsight}</p>
          </Card>
          </div>

      ),
    },
  ];

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  return (
    <div className="p-4 md:p-26 md:pt-22 pt-22 min-h-screen bg-[#1B1B2F] text-white">
      <Steps
        current={current}
        direction="horizontal"   
        className="mb-8 custom-steps overflow-x-auto md:w-full w-full"
        items={steps.map((item) => ({ key: item.title, title: item.title }))}
          progressDot={false}
      />
      <div className="pt-6 mb-6">{steps[current].content}</div>
      {/* <div className="flex gap-2">
        {current > 0 && <Button onClick={prev}>Previous</Button>}
        {current < steps.length - 1 && current !== 1 && <Button type="primary" onClick={next}>Next</Button>}
      </div> */}
      <div className="flex items-center justify-center gap-2 mt-4 !text-white">
        {current > 0 && <Button onClick={prev}>Previous</Button>}
        {current < steps.length - 1 && current !== 1 && (
        <Button
  type="primary"
  className="w-20 !text-lg
    !bg-blue-500 
    disabled:!bg-gray-300 
    disabled:!text-gray-500 
    disabled:cursor-not-allowed
  "
  onClick={next}
  disabled={current === 0 && fileList.length === 0}
>
  Next
</Button>
        )}
      </div>
    </div>
  );
};

export default ResumePage;
