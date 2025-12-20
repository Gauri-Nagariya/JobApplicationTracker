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
import bgDashboard from "../../assets/bg2.jpg";
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

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        applicationDate: values.applicationDate
          ? values.applicationDate.toDate()
          : undefined,
        user: user?.id || user?._id,
      };

      const method = id ? "PUT" : "POST";
      const url = id
        ? `${backendURL}/applications/${id}`
        : `${backendURL}/applications`;

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

        const uploadResponse = await fetch(`${backendURL}/upload-docs`, {
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

      console.log("Edit data:", state?.application);

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
      // style={{ backgroundImage: `url(${bgDashboard})` }}
    >
      <div className="p-30 pt-6 h-auto w-full flex flex-col">
        <h1 className="text-center text-3xl font-bold tracking-widest text-white mb-8 pt-4">
          {id ? "EDIT YOUR APPLICATION" : "ADD YOUR APPLICATION"}
        </h1>
        <div className="flex flex-row border p-12 h-auto justify-between gap-8 rounded-4xl ">
          <div className="w-screen">
            <Form
              {...formItemLayout}
              className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg  [&_.ant-form-item-control]:!mx-2"
              layout="horizontal"
              form={form}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 12 }}
              // variant={variant || "outlined"}
              style={{ maxWidth: 600, color: "#388087" }}
              initialValues={{ variant: "filled" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="flex gap-8">
                {/* left div  */}
                <div className="w-fit pr-40">
                  <Form.Item
                    label="Company Name"
                    name="companyName"
                    rules={[
                      { required: true, message: "Please enter Company Name!" },
                    ]}
                  >
                    <Input className={baseClass} />
                  </Form.Item>

                  <Form.Item
  label="Job Title"
  name="jobTitle"
  rules={[
    {
      required: true,
      message: "Please select or enter a job title",
    },
  ]}
              getValueFromEvent={(value) =>
    Array.isArray(value) ? value[value.length - 1] : value
  }
>
  <Select
    mode="tags"
allowClear
    placeholder="Select or type job title"
    className={baseClass}
    options={[
      { label: "Frontend Developer", value: "Frontend Developer" },
      { label: "Backend Developer", value: "Backend Developer" },
      { label: "Full Stack Developer", value: "Full Stack Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Software Development Engineer (SDE)", value: "SDE" },
      { label: "Senior Software Engineer", value: "Senior Software Engineer" },
      { label: "Mobile App Developer", value: "Mobile App Developer" },
      { label: "UI/UX Designer", value: "UI/UX Designer" },
      { label: "Tech Lead", value: "Tech Lead" },
      { label: "Senior Manager", value: "Senior Manager" },
    ]}
  />
</Form.Item>


                  <Form.Item
                    label="Job Location"
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
                    label="job Type"
                    name="jobType"
                    valuePropName="value"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Job Type!",
                      },
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
                    label="status"
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
                    label="Salary Range"
                    // name="salaryRange"
                    className="salary-range-wrapper"
                  >
                    <SalaryRangeInput />
                  </Form.Item>

                  <Form.Item label="Application Date" name="applicationDate">
                    <DatePicker
                      // className="min-h-10 !w-[120%] !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]"
                      className={baseClass}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Source"
                    name="appliedVia"
                    valuePropName="value"
                    rules={[
                      { required: true, message: "Please select Source!" },
                    ]}
                  >
                    <Select
                      // placeholder="It is required field"
                      className={baseClass}
                      options={[
                        { label: "LinkedIn", value: "LinkedIn" },
                        { label: "Company Website", value: "Company Website" },
                        { label: "Referral", value: "Referral" },
                        { label: "Indeed", value: "Indeed" },
                        { label: "Glassdoor", value: "Glassdoor" },
                        { label: "Naukri", value: "Naukri" },
                        { label: "Wellfound (AngelList)", value: "Wellfound" },
                        { label: "Internshala", value: "Internshala" },
                        {
                          label: "Recruiter Outreach",
                          value: "Recruiter Outreach",
                        },
                        {
                          label: "Campus Placement",
                          value: "Campus Placement",
                        },
                        { label: "Job Fair", value: "Job Fair" },
                        { label: "Cold Email", value: "Cold Email" },
                        { label: "Other", value: "Other" },
                      ]}
                    />
                  </Form.Item>
                </div>

                {/* RIGHT fields */}
                <div className="w-fit">
                  <Form.Item label="Add notes" name="notes">
                    <TextArea rows={3} className={baseClass} />
                  </Form.Item>

                  <Form.Item
                    label="Application Link"
                    name="applicationLink"
                    rules={[
                      { type: "url", message: "Please enter a valid URL" },
                    ]}
                  >
                    <Input
                      // placeholder="https://company.com/jobs/123"
                      className={baseClass}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Company Link"
                    name="CompanyCareerPage"
                    rules={[
                      { type: "url", message: "Please enter a valid URL" },
                    ]}
                  >
                    <Input
                      // placeholder="https://company.com/jobs/123"
                      className={baseClass}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Portfolio Link"
                    name="PortfolioGitHubLinkedIn"
                    rules={[
                      { type: "url", message: "Please enter a valid URL" },
                    ]}
                  >
                    <Input
                      // placeholder="https://company.com/jobs/123"
                      className={baseClass}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Resume"
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
                    label="Cover Letter"
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
                </div>
              </div>

              <Form.Item label={null}>
                <Button
                  htmlType="submit"
                  className="
  !w-80 !py-6
    !px-4 !py-2
    !ml-40
    !border !border-white/90
    !text-white/90
    !font-semibold
    !text-xl
    !rounded-md
    !bg-white/30
    !cursor-pointer
    !transition-all !duration-200
    hover:!bg-transparent
hover:!shadow-[0_0_20px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,0.1)]  "
                >
                  SAVE
                </Button>
              </Form.Item>
              {/* </div> */}
            </Form>
          </div>
        </div>

        {/* -----------------------------SAVE BUTTON---------------------------- */}
        {/* <div className="px-80 my-10">
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
           
          </Form>
        </div> */}
      </div>
    </div>
  );
};

export default ApplicationsForm;
