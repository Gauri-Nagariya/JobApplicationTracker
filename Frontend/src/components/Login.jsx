import React, { useContext } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import loginimg from "../assets/loginImage.png";
import { AuthContext } from "../context/AuthContext";

const login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


const onFinish = async (values) => {
  try {
    await login(values);   // 🔑 central auth logic
    message.success("logged in successfully");
    navigate("/profile");
  } catch (error) {
    message.error("login failed");
  }
};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-row items-center justify-center align-middle">
      <div className="w-full h-screen justify-center align-middle items-center flex text-[#388087]">
        <img src={loginimg} alt="login_image" className="w-[40vw]" />
      </div>
      <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="w-120 px-10 py-12 flex flex-col">
          {/* Title */}
          <h1 className="text-center text-2xl font-bold tracking-widest text-[#388087] mb-10 py-2 px-6 border rounded-t-md">
            LOG IN
          </h1>

          <Form
            layout="vertical"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* Username */}
            <Form.Item
              // label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="username"
                className="h-10 !w-92 !mx-4  !mb-2 items-center rounded-md hover:!border-[#388087]"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="password"
                className="h-10 !w-92 !mx-4 !mb-2 items-center rounded-md hover:!border-[#388087]"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                htmlType="submit"
                className="!h-12 w-92 !mx-4 !border-2 !border-[#388087] !text-[#388087] !text-2xl !font-bold !py-2 !px-6 rounded-md !hover:bg-[#5f9ea0]"
              >
                Submit
              </Button>
            </Form.Item>

            <p className="text-center !text-[#388087] py-2">
              Don't have an account?
            </p>
            <a
              onClick={() => navigate("/register")}
              className="mx-[11vw] !text-[#388087] cursor-pointer !hover:underline"
            >
              REGISTER
            </a>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default login;

