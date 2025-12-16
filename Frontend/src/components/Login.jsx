import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    console.log("Backend URL:", backendURL);

    console.log("Form Values:", values);

    try {
      const response = await fetch(`${backendURL}/login`, {
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
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <a href="#" onClick={(e) => e.preventDefault()} className="ml-[13vw]">
        Forget Password
      </a>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <p>Don't have an account?</p>
        <a
          onClick={() => navigate("/register")}
          className="ml-[13vw] cursor-pointer"
        >
          Register
        </a>
      </Form.Item>
    </Form>
  );
};
export default login;
