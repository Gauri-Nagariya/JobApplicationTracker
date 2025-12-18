import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  message,
  Space,
  InputNumber,
} from "antd";
import profileImage from "../assets/profileImage.jpg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect } from "react";


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

const ApplicationsForm = () => {
  const [form] = Form.useForm();
    const navigate = useNavigate();
   const { state } = useLocation(); // get passed application for editing
  const { id } = useParams(); // id from route, if editing

  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const SalaryRangeInput = () => (
  <Space>
    <Form.Item
      name={["salaryRange", "min"]}
      rules={[{ required: true, message: "Enter min salary" }]}
    >
      <InputNumber
        placeholder="Min Salary"
        min={0}
        style={{ width: 150 }}
      />
    </Form.Item>

    <span>to</span>

    <Form.Item
      name={["salaryRange", "max"]}
      rules={[{ required: true, message: "Enter max salary" }]}
    >
      <InputNumber
        placeholder="Max Salary"
        min={0}
        style={{ width: 150 }}
      />
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


  const onFinish = async (values) => {
    console.log("Backend URL:", backendURL);

    console.log("Form Values:", values);

    try {

        const payload = {
    ...values,
    applicationDate: values.applicationDate
      ? values.applicationDate.toDate()
      : undefined,
  };

  const method = id ? "PUT" : "POST";
const url = id ? `${backendURL}/applications/${id}` : `${backendURL}/applications`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), 
        credentials: "include",
      });

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Backend did not return JSON: " + text);
      }

      if (response.ok) {
        message.success("application added  successfully");
        //   form.resetFields(); 
          navigate("/applications/ApplicationsCard"); // redirect to list page
      } else {
        message.error(data.message || "Failed to save application");
        console.error("Error:", data);
      }
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    }
  };

//   if (loading) return <p>Loading profile...</p>;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-auto w-full flex justify-center items-center mb-10">
      <div className="bg-[#F6F6F2] w-[70vw] h-auto mt-12 rounded-2xl p-4 pt-0 px-0 !text-[#388087] flex flex-row justify-between">
        {/* <div className=" bg-[#F6F6F2]
  w-[70vw]
  mt-12
  rounded-2xl
  p-6 pt-0 px-0
  !text-[#388087]
  flex flex-row justify-between"> */}

        {/* left div  */}
        <div className="w-1/2 px-6 pt-0">
          <h1 className="text-center text-2xl font-bold tracking-widest text-[#388087] mb-6 pt-4 pl-24">
  {id ? "EDIT YOUR APPLICATION" : "ADD YOUR APPLICATION"}
</h1>

          <Form
            {...formItemLayout}
            form={form}   // ✅ lowercase
            // variant={variant || "outlined"}
            style={{ maxWidth: 600, color: "#388087" }}
            initialValues={{ variant: "filled" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="companyName"
              name="companyName"
              rules={[
                { required: true, message: "Please enter Company Name!" },
              ]}
            >
              <Input
                placeholder="company Name"
                className="h-10 !w-[120%] !mx-5 !text-[#388087] items-center rounded-md !border-[#388087]"
              />
            </Form.Item>

            <Form.Item
              label="Job Title"
              name="jobTitle"
              rules={[
                { required: true, message: "Please select your Job Title!" },
              ]}
            >
              <Select
                placeholder="Select your role"
                className="h-10 !w-[120%] !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]"
                options={[
                  { label: "Frontend dev", value: "Frontend dev" },
                  { label: "Junior dev", value: "Junior dev" },
                  { label: "SDE", value: "SDE" },
                  { label: "Senior manager", value: "Senior manager" },
                ]}
              />
            </Form.Item>

            <Form.Item
                          label="Job Location"
                          name="jobLocation"
                          rules={[
                            { required: true, message: "Please enter your job location!" },
                          ]}
                        >
                          <Input
                            placeholder="City, State"
                            style={{
                              width: "120%",
                              height: "40px",
                              marginLeft: "1.25rem", // same as mx-5 (≈ 20px)
                              color: "#388087",
                              border: "1px solid #388087",
                              borderRadius: "0.375rem", // rounded-md
                            }}
                          />
                        </Form.Item>

            <Form.Item
              label="job Type"
              name="jobType"
              valuePropName="value"
              rules={[
                { required: true, message: "Please select your Job Type!" },
              ]}
            >
              <Select
                placeholder="Select your role"
                className="h-10 !w-[120%] !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]"
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
                placeholder="Select experience level"
                className="h-10 !w-[120%] !mx-5 !text-[#388087] items-center rounded-md !border-[#388087]"
                options={[
                  { label: "Saved", value: "Saved" },
                  { label: "Applied", value: "Applied" },
                  { label: "Shortlisted", value: "Shortlisted" },
                  { label: "Interview Scheduled", value: "Interview Scheduled" },
                  { label: "Offer", value: "Offer" },
                  { label: "Rejected", value: "Rejected" },
                ]}
              />
            </Form.Item>

              <Form.Item label="Salary Range" name="salaryRange">
          <SalaryRangeInput  
                className="min-h-10 !w-[120%] !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]"
          />
        </Form.Item>

            <Form.Item label="Application Date"
              name="applicationDate"
            >
          <DatePicker 
                className="min-h-10 !w-[120%] !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]"
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
                placeholder="It is required field"
                className="h-10 !w-[120%] !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]"
                options={[
                 { label: "LinkedIn", value: "LinkedIn" },
                  { label: "Company Site", value: "Company Site" },
                  { label: "Referral", value: "Referral" },
                  { label: "Indeed", value: "Indeed" },
                  { label: "Other", value: "Other" },
                ]}
              />
            </Form.Item>

            <Form.Item
  label="Application Link"
  name="applicationLink"
  rules={[
    { type: "url", message: "Please enter a valid URL" },
  ]}
>
  <Input
    placeholder="https://company.com/jobs/123"
    className="h-10 !w-[120%] !mx-5 !text-[#388087] rounded-md !border-[#388087]"
  />
</Form.Item>


<Form.Item
  label="Company Career Page Link"
  name="CompanyCareerPage"
  rules={[
    { type: "url", message: "Please enter a valid URL" },
  ]}
>
  <Input
    placeholder="https://company.com/jobs/123"
    className="h-10 !w-[120%] !mx-5 !text-[#388087] rounded-md !border-[#388087]"
  />
</Form.Item>


<Form.Item
  label="Portfolio / GitHub / LinkedIn"
  name="PortfolioGitHubLinkedIn"
  rules={[
    { type: "url", message: "Please enter a valid URL" },
  ]}
>
  <Input
    placeholder="https://company.com/jobs/123"
    className="h-10 !w-[120%] !mx-5 !text-[#388087] rounded-md !border-[#388087]"
  />
</Form.Item>


            <Form.Item label="Notes" name="notes">
              <TextArea
                placeholder="Notes"
                rows={4}
                className="!min-h-10 !w-80 !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]"
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                htmlType="submit"
                className="!h-10 !w-86 !mx-5 !border-2 !border-[#388087] !text-[#388087] !text-xl !font-bold !py-2 !px-6 rounded-md !hover:bg-[#5f9ea0]"
              >
                SAVE
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* right div */}
        <div className="w-1/3 h-1/2 mt-20 mr-20 flex justify-center items-center">
          <img
            src={profileImage} // 🔁 replace with your image path
            alt="Profile Illustration"
            className="rounded-4xl object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationsForm;
