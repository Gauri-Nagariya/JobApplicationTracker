import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Segmented,
  Select,
  TreeSelect,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
import profileImage from "../assets/profileImage.jpg";
import { AuthContext } from "../context/AuthContext";


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
const ProfileForm = () => {
  const { user } = useContext(AuthContext); // get logged-in user
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

    // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${backendURL}/profile`, {
          method: "GET",
          credentials: "include", // send cookie
        });
        const data = await res.json();
        if (res.ok) {
          // populate form with existing data
          form.setFieldsValue(data.user);
        } else {
          message.error(data.message || "Failed to fetch profile");
        }
      } catch (err) {
        message.error("Error fetching profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [backendURL, form]);

  const onFinish = async (values) => {
    console.log("Backend URL:", backendURL);

    console.log("Form Values:", values);

    try {
      const response = await fetch(`${backendURL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // send username, email, password
        credentials: "include", // to allow cookie if backend sets JWT cookie
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Profile updated successfully");
        console.log("User logged-in:", data.user);
        form.setFieldsValue(data.user); // update form with saved data
        // Optionally redirect to login page
        // window.location.href = "/login";
      } else {
        message.error(data.message || "Failed to update profile");
        console.error("Error:", data);
      }
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    }
  };

    if (loading) return <p>Loading profile...</p>;


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

// const variant = Form.useWatch("variant", form);

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
            CREATE YOUR PROFILE
          </h1>

          <Form
            {...formItemLayout}
            form={form}
            // variant={variant || "outlined"}
            style={{ maxWidth: 600, color: "#388087" }}
            initialValues={{ variant: "filled" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="fullName"
              name="fullName"
              rules={[
                { required: true, message: "Please enter your fullName!" },
              ]}
            >
              <Input
                placeholder="Full Name"
                className="h-10 !w-[120%] !mx-5 !text-[#388087] items-center rounded-md !border-[#388087]"
              />
            </Form.Item>

            <Form.Item
              label="phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
            >
              <InputNumber
                placeholder="Phone"
                // style={{
                //   width: "120%",
                //   height: "40px",
                //   marginLeft: "1.25rem", // same as mx-5 (≈ 20px)
                //   color: "#388087",
                //   border: "1px solid #388087",
                //   borderRadius: "0.375rem", // rounded-md
                // }}
                  className="!text-[#388087] !w-[120%] !ml-5 !h-10 !rounded-md !border-[#388087]"
              />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: "Please enter your location!" },
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
              label="Current Role"
              name="currentRole"
              valuePropName="value"
              rules={[
                { required: true, message: "Please select your Current Role!" },
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
              label="Experience Level"
              name="experienceLevel"
              rules={[
                { required: true, message: "Please select experience level" },
              ]}
            >
              <Select
                placeholder="Select experience level"
                className="h-10 !w-[120%] !mx-5 !text-[#388087] items-center rounded-md !border-[#388087]"
                options={[
                  { label: "Fresher", value: "Fresher" },
                  { label: "Junior", value: "Junior" },
                  { label: "Mid", value: "Mid" },
                  { label: "Senior", value: "Senior" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Skills"
              name="skills"
              rules={[
                { required: true, message: "Please add at least one skill" },
              ]}
            >
              <Select
                mode="tags"
                placeholder="Add skills"
                className="min-h-10 !w-[120%] !mx-5  !text-[#388087] items-center rounded-md !border-[#388087]"
                options={[
                  { label: "HTML", value: "HTML" },
                  { label: "CSS", value: "CSS" },
                  { label: "JavaScript", value: "JavaScript" },
                  { label: "React", value: "React" },
                  { label: "Node.js", value: "Node.js" },
                ]}
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
export default ProfileForm;
