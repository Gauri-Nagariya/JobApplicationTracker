import React from "react";
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
const Profile = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
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
        message.success(data.message);
        console.log("User logged-in:", data.user);
        navigate("/profile");
        // Optionally redirect to login page
        // window.location.href = "/login";
      } else {
        message.error(data.message || "Registration failed");
        console.error("Error:", data);
      }
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      variant={variant || "filled"}
      style={{ maxWidth: 600 }}
      initialValues={{ variant: "filled" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="fullName"
        name="fullName"
        rules={[{ required: true, message: "Please enter your fullName!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="phone"
        name="phone"
        rules={[{ required: true, message: "Please enter your phone number!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Please enter your location!" }]}
      >
        <Input />
      </Form.Item>

     <Form.Item
  label="Current Role"
  name="currentRole"
  valuePropName="value"
  rules={[{ required: true, message: "Please select your Current Role!" }]}
>
  <Select
    placeholder="Select your role"
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
  rules={[{ required: true, message: "Please select experience level" }]}
>
  <Select
    placeholder="Select experience level"
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
        rules={[{ required: true, message: "Please add at least one skill" }]}
      >
        <Select
          mode="tags"
          placeholder="Add skills"
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Profile;
