import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  message,
  Space,
  InputNumber,
  Upload,
} from "antd";
// import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import profileImage from "../../assets/profileImage.jpg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // ✅ correct import
import "../../index.css";
import bgDashboard from "../../assets/bg5.jpg";
// import star from "../../assets/stars.avif";

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const baseClass = `
  !w-100
  !mb-4
  !text-md
  !bg-transparent
  !border
  !border-white/50
  !rounded-none
  !text-white
  placeholder:!text-white/60
  placeholder:!text-sm
  focus:!border-white/100
  hover:!border-white/100
  focus:!shadow-none
`;

let fieldIndex = 0;

const numberedLabel = (text) => {
  fieldIndex += 1;
  return (
    <span className="text-white text-lg font-medium">
      {fieldIndex}. {text}
    </span>
  );
};

const ApplicationsForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation(); // get passed application for editing
  const { id } = useParams(); // id from route, if editing

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const { user } = useContext(AuthContext);

  const SalaryRangeInput = () => (
    <Space>
      <Form.Item
        name={["salaryRange", "min"]}
        rules={[{ required: true, message: "Enter min salary" }]}
      >
        <InputNumber placeholder="Min Salary" min={0} style={{ width: 150 }} />
      </Form.Item>

      <span>to</span>

      <Form.Item
        name={["salaryRange", "max"]}
        rules={[{ required: true, message: "Enter max salary" }]}
      >
        <InputNumber placeholder="Max Salary" min={0} style={{ width: 150 }} />
      </Form.Item>
    </Space>
  );

  //   useEffect(() => {
  //     const fetchApplication = async () => {
  //       try {
  //         const res = await fetch(`${backendURL}/applications`, {
  //           method: "GET",
  //           credentials: "include", // send cookie
  //         });
  //         // const data = await res.json();
  //         const text = await res.text(); // 👈 read as text first
  //         let data;

  //         try {
  //           data = JSON.parse(text); // 👈 try converting to JSON
  //         } catch {
  //           throw new Error("Backend did not return JSON: " + text);
  //         }

  //         if (res.ok) {
  //           // populate form with existing data
  //         form.resetFields();
  //         } else {
  //           message.error(data.message || "Failed to fetch applications");
  //         }
  //       } catch (err) {
  //         message.error("Error fetching applications");
  //         console.error(err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchApplication();
  //   }, [backendURL, form]);

  useEffect(() => {
    if (state?.application) {
      // Prefill form with existing data
      form.setFieldsValue({
        ...state.application,
        applicationDate: state.application.applicationDate
          ? dayjs(state.application.applicationDate)
          : null,
      });
    }
  }, [state, form]);

  //   const onFinish = async (values) => {
  //     console.log("Backend URL:", backendURL);

  //     console.log("Form Values:", values);

  //     try {

  //         const payload = {
  //     ...values,
  //     applicationDate: values.applicationDate
  //       ? values.applicationDate.toDate()
  //       : undefined,
  //   };

  //   const method = id ? "PUT" : "POST";
  // const url = id ? `${backendURL}/applications/${id}` : `${backendURL}/applications`;

  //       const response = await fetch(url, {
  //         method,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //         credentials: "include",
  //       });

  //       const text = await response.text();
  //       let data;

  //       try {
  //         data = JSON.parse(text);
  //       } catch {
  //         throw new Error("Backend did not return JSON: " + text);
  //       }

  //       if (response.ok) {
  //         message.success("application added  successfully");
  //         //   form.resetFields();
  //           navigate("/applications/ApplicationsCard"); // redirect to list page
  //       } else {
  //         message.error(data.message || "Failed to save application");
  //         console.error("Error:", data);
  //       }
  //     } catch (error) {
  //       message.error("Something went wrong");
  //       console.error(error);
  //     }
  //   };

  //   if (loading) return <p>Loading profile...</p>;

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        applicationDate: values.applicationDate
          ? values.applicationDate.toDate()
          : undefined,
        user: user?.id || user?._id, // attach logged-in user
      };

      const method = id ? "PUT" : "POST";
      const url = id
        ? `${backendURL}/api/applications/${id}`
        : `${backendURL}/api/applications`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        message.error(data.message || "Failed to save application");
        return console.error("Error:", data);
      }

      // ✅ Correctly get applicationId
      const applicationId = data?._id || data?.application?._id || id;
      if (!applicationId) {
        message.error("Application creation failed. Cannot upload documents.");
        return;
      }

      if (values.resume?.length > 0 || values.coverLetter?.length > 0) {
        const formData = new FormData();
        if (values.resume?.length)
          formData.append("resume", values.resume[0].originFileObj);
        if (values.coverLetter?.length)
          formData.append("coverLetter", values.coverLetter[0].originFileObj);
        formData.append("applicationId", applicationId);

        const uploadResponse = await fetch(`${backendURL}/api/upload-docs`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok) {
          message.error(uploadData.message || "Document upload failed");
          return console.error("Upload Error:", uploadData);
        }
      }

      message.success("Application submitted successfully!");
      navigate("/applications/ApplicationsCard");
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="h-auto w-full bg-cover bg-center bg-fixed flex items-start overflow-hidden"
      style={{ backgroundImage: `url(${bgDashboard})` }}
    >
      <div className="glass p-30 pt-28 h-auto w-full flex flex-col">
        <h1 className="text-center text-3xl font-bold tracking-widest text-white mb-8 pt-4">
          {id ? "EDIT YOUR APPLICATION" : "ADD YOUR APPLICATION"}
        </h1>
        <div className="flex flex-row border p-12 h-auto justify-between gap-8 rounded-4xl !shadow-[0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)]">
          {/* left div  */}
          <div className="w-screen">
            <Form
              {...formItemLayout}
              className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg  [&_.ant-form-item-control]:!mx-2"
              layout="horizontal"
              form={form} // ✅ lowercase
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
              // variant={variant || "outlined"}
              style={{ maxWidth: 600, color: "#388087" }}
              initialValues={{ variant: "filled" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={numberedLabel("Company Name")}
                name="companyName"
                rules={[
                  { required: true, message: "Please enter Company Name!" },
                ]}
              >
                <Input className={baseClass} />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Job Title")}
                name="jobTitle"
                rules={[
                  { required: true, message: "Please select your Job Title!" },
                ]}
              >
                <Select
                  // placeholder="Select your role"
                  className={baseClass}
                  options={[
                    { label: "Frontend dev", value: "Frontend dev" },
                    { label: "Junior dev", value: "Junior dev" },
                    { label: "SDE", value: "SDE" },
                    { label: "Senior manager", value: "Senior manager" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Job Location")}
                name="jobLocation"
                rules={[
                  {
                    required: true,
                    message: "Please enter your job location!",
                  },
                ]}
              >
                <Input className={baseClass} />
              </Form.Item>

              <Form.Item
                label={numberedLabel("job Type")}
                name="jobType"
                valuePropName="value"
                rules={[
                  { required: true, message: "Please select your Job Type!" },
                ]}
              >
                <Select
                  // placeholder="Select your role"
                  className={baseClass}
                  options={[
                    { label: "Full-time", value: "Full-time" },
                    { label: "Part-time", value: "Part-time" },
                    { label: "Internship", value: "Internship" },
                    { label: "Contract", value: "Contract" },
                    { label: "Remote", value: "Remote" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("status")}
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please select status of your application",
                  },
                ]}
              >
                <Select
                  // placeholder="Select experience level"
                  className={baseClass}
                  options={[
                    { label: "Saved", value: "Saved" },
                    { label: "Applied", value: "Applied" },
                    { label: "Shortlisted", value: "Shortlisted" },
                    {
                      label: "Interview Scheduled",
                      value: "Interview Scheduled",
                    },
                    { label: "Offer", value: "Offer" },
                    { label: "Rejected", value: "Rejected" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Salary Range")}
                name="salaryRange"
              >
                <SalaryRangeInput className="min-h-10 !w-[120%] !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]" />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Application Date")}
                name="applicationDate"
              >
                <DatePicker
                  // className="min-h-10 !w-[120%] !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]"
                  className={baseClass}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Source")}
                name="appliedVia"
                valuePropName="value"
                rules={[{ required: true, message: "Please select Source!" }]}
              >
                <Select
                  // placeholder="It is required field"
                  className={baseClass}
                  options={[
                    { label: "LinkedIn", value: "LinkedIn" },
                    { label: "Company Site", value: "Company Site" },
                    { label: "Referral", value: "Referral" },
                    { label: "Indeed", value: "Indeed" },
                    { label: "Other", value: "Other" },
                  ]}
                />
              </Form.Item>

              {/* <Form.Item
                label={numberedLabel("Application Link")}
                name="applicationLink"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
              >
                <Input
                  // placeholder="https://company.com/jobs/123"
                  className={baseClass}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Company Link")}
                name="CompanyCareerPage"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
              >
                <Input
                  // placeholder="https://company.com/jobs/123"
                  className={baseClass}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Portfolio / GitHub / LinkedIn")}
                name="PortfolioGitHubLinkedIn"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
              >
                <Input
                  // placeholder="https://company.com/jobs/123"
                  className={baseClass}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Resume")}
                name="resume"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList} // Extract fileList for form
                rules={[
                  { required: true, message: "Please upload your resume!" },
                ]}
              >
                <Upload.Dragger
                  name="resume"
                  multiple={false}
                  beforeUpload={() => false} // Prevent auto upload, we handle submit manually
                  accept=".pdf,.doc,.docx"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Only PDF/Word files accepted.
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item
                label={numberedLabel("Cover Letter")}
                name="coverLetter"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList}
              >
                <Upload.Dragger
                  name="coverLetter"
                  multiple={false}
                  beforeUpload={() => false}
                  accept=".pdf,.doc,.docx"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Only PDF/Word files accepted.
                  </p>
                </Upload.Dragger>
              </Form.Item> */}
            </Form>
          </div>

          {/* right div */}
          <div className="w-screen">
            <Form
              {...formItemLayout}
              form={form} // ✅ lowercase
              className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg  [&_.ant-form-item-control]:!mx-2"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
              layout="horizontal"
              style={{ maxWidth: 600, color: "#388087" }}
              initialValues={{ variant: "filled" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label={numberedLabel("Add notes")} name="notes">
                <TextArea rows={3} className={baseClass} />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Application Link")}
                name="applicationLink"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
              >
                <Input
                  // placeholder="https://company.com/jobs/123"
                  className={baseClass}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Company Link")}
                name="CompanyCareerPage"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
              >
                <Input
                  // placeholder="https://company.com/jobs/123"
                  className={baseClass}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Portfolio Link")}
                name="PortfolioGitHubLinkedIn"
                rules={[{ type: "url", message: "Please enter a valid URL" }]}
              >
                <Input
                  // placeholder="https://company.com/jobs/123"
                  className={baseClass}
                />
              </Form.Item>

              <Form.Item
                label={numberedLabel("Resume")}
                name="resume"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList} // Extract fileList for form
                rules={[
                  { required: true, message: "Please upload your resume!" },
                ]}
              >
                <Upload.Dragger
                  name="resume"
                  multiple={false}
                  beforeUpload={() => false} // Prevent auto upload, we handle submit manually
                  accept=".pdf,.doc,.docx"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Only PDF/Word files accepted.
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item
                label={numberedLabel("Cover Letter")}
                name="coverLetter"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList}
              >
                <Upload.Dragger
                  name="coverLetter"
                  multiple={false}
                  beforeUpload={() => false}
                  accept=".pdf,.doc,.docx"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Only PDF/Word files accepted.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* -----------------------------SAVE BUTTON---------------------------- */}
        <div className="px-80 my-10">
          <Form
            {...formItemLayout}
            form={form} // ✅ lowercase
            className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg"
            // layout="horizontal"
            style={{ maxWidth: 600, color: "#388087" }}
            initialValues={{ variant: "filled" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label={null}>
              <Button
                htmlType="submit"
                className="
  !w-80 !py-6
    !px-4 !py-2
    !border !border-white/90
    !text-white/90
    !font-semibold
    !text-xl
    !rounded-md
    !bg-white/30
    !cursor-pointer
    !transition-all !duration-200
    hover:!bg-transparent
    hover:!shadow-[0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)]
  "
              >
                SAVE
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsForm;
