// import {
//   Button,
//   DatePicker,
//   Form,
//   Input,
//   Select,
//   message,
//   Space,
//   InputNumber,
//   Upload,
// } from "antd";
// import { InboxOutlined } from "@ant-design/icons";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import dayjs from "dayjs";
// import { useEffect, useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import "../../index.css";
// import bgDashboard from "../../assets/bg2.jpg";

// const { TextArea } = Input;

// const formItemLayout = {
//   labelCol: { xs: { span: 24 }, sm: { span: 6 } },
//   wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
// };

// const baseClass = `
//   !w-100
//   !mb-4
//   !text-md
//   !bg-transparent
//   !border
//   !border-white/50
//   !rounded-none
//   !text-white
//   placeholder:!text-white/60
//   focus:!border-white
//   hover:!border-white
//   focus:!shadow-none
// `;

// const EditApplications = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(true);
//   const [appData, setAppData] = useState(null);

//   const backendURL = import.meta.env.VITE_BACKEND_URL;

//   const SalaryRangeInput = () => (
//     <Space>
//       <Form.Item
//         name={["salaryRange", "min"]}
//         rules={[{ required: true, message: "Enter min salary" }]}
//       >
//         <InputNumber placeholder="Min Salary" min={0} />
//       </Form.Item>
//       <span className="text-white">to</span>
//       <Form.Item
//         name={["salaryRange", "max"]}
//         rules={[{ required: true, message: "Enter max salary" }]}
//       >
//         <InputNumber placeholder="Max Salary" min={0} />
//       </Form.Item>
//     </Space>
//   );

//   // ---------- FETCH APPLICATION DATA ----------
//  useEffect(() => {
//   const fetchApplication = async () => {
//     try {
//       let data;

//       if (state?.application) {
//         // User came from ApplicationsCard → use state
//         data = state.application;
//       } else {
//         // Direct reload → fetch from backend
//         const res = await fetch(`${backendURL}/applications/${id}`, {
//           credentials: "include", // important for JWT auth
//         });
//         if (!res.ok) throw new Error("Application not found");
//         const result = await res.json();
//         data = result.application;
//       }

//       setAppData({
//         ...data,
//         applicationDate: data.applicationDate ? dayjs(data.applicationDate) : null,
//       });

//       // Prefill the form
//       form.setFieldsValue({
//         ...data,
//         applicationDate: data.applicationDate ? dayjs(data.applicationDate) : null,
//       });

//     } catch (err) {
//       console.error(err);
//       message.error(err.message || "Failed to load application");
//       navigate("/applications/ApplicationsCard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchApplication();
// }, [id, state, backendURL, navigate, form]);


//   // ---------- SUBMIT ----------
//   const onFinish = async (values) => {
//     try {
//       const payload = {
//         ...values,
//         applicationDate: values.applicationDate?.toDate(),
//         user: user?._id || user?.id,
//       };

//       const response = await fetch(
//         id
//           ? `${backendURL}/applications/${id}`
//           : `${backendURL}/applications`,
//         {
//           method: id ? "PUT" : "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//           credentials: "include",
//         }
//       );

//       const data = await response.json();
//       if (!response.ok) {
//         message.error(data.message || "Failed to save");
//         return;
//       }

//       const applicationId = data?.application?._id || id;

//       if (values.resume?.length || values.coverLetter?.length) {
//         const formData = new FormData();
//         values.resume?.length &&
//           formData.append("resume", values.resume[0].originFileObj);
//         values.coverLetter?.length &&
//           formData.append("coverLetter", values.coverLetter[0].originFileObj);
//         formData.append("applicationId", applicationId);

//         await fetch(`${backendURL}/upload-docs`, {
//           method: "POST",
//           body: formData,
//           credentials: "include",
//         });
//       }

//       message.success("Application saved successfully!");
//       navigate("/applications/ApplicationsCard");
//     } catch (err) {
//       message.error("Something went wrong");
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-white">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div
//       className="h-auto w-full bg-cover bg-center bg-fixed"
//       style={{ backgroundImage: `url(${bgDashboard})` }}
//     >
//       <div className="glass p-30 pt-28">
//         <h1 className="text-center text-3xl font-bold text-white mb-8">
//           {id ? "EDIT YOUR APPLICATION" : "ADD YOUR APPLICATION"}
//         </h1>

//         <Form
//           {...formItemLayout}
//           form={form}
//           onFinish={onFinish}
//           autoComplete="off"
//           className="[&_.ant-form-item-label>label]:!text-white"
//         >
//           <Form.Item
//             label="Company Name"
//             name="companyName"
//             rules={[{ required: true }]}
//           >
//             <Input className={baseClass} />
//           </Form.Item>

//           <Form.Item
//             label="Job Title"
//             name="jobTitle"
//             rules={[{ required: true, message: "Select or enter Job Title" }]}
//           >
//             <Select
//               mode="combobox"
//               allowClear
//               className={baseClass}
//               placeholder="Select or type job title"
//               options={[
//                 { label: "Frontend Developer", value: "Frontend Developer" },
//                 { label: "Junior Developer", value: "Junior Developer" },
//                 { label: "SDE", value: "SDE" },
//                 { label: "Senior Manager", value: "Senior Manager" },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item
//             label="Job Location"
//             name="jobLocation"
//             rules={[{ required: true }]}
//           >
//             <Input className={baseClass} />
//           </Form.Item>

//           <Form.Item
//             label="Job Type"
//             name="jobType"
//             rules={[{ required: true }]}
//           >
//             <Select
//               className={baseClass}
//               options={[
//                 { label: "Full-time", value: "Full-time" },
//                 { label: "Part-time", value: "Part-time" },
//                 { label: "Internship", value: "Internship" },
//                 { label: "Contract", value: "Contract" },
//                 { label: "Remote", value: "Remote" },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item label="Salary Range">
//             <SalaryRangeInput />
//           </Form.Item>

//           <Form.Item label="Application Date" name="applicationDate">
//             <DatePicker className={baseClass} />
//           </Form.Item>

//           <Form.Item label="Notes" name="notes">
//             <TextArea rows={3} className={baseClass} />
//           </Form.Item>

//           <Form.Item
//             label="Resume"
//             name="resume"
//             valuePropName="fileList"
//             getValueFromEvent={(e) => e?.fileList}
//           >
//             <Upload.Dragger beforeUpload={() => false}>
//               <InboxOutlined />
//               <p className="text-white">Upload Resume</p>
//             </Upload.Dragger>
//           </Form.Item>

//           <Form.Item className="flex justify-center">
//             <Button htmlType="submit" className="!text-white !border-white">
//               SAVE
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default EditApplications;
