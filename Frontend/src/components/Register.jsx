import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../index.css";
import bgDashboard from "../assets/bg3.jpg";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      await register(values); // 🔑 central auth logic
      message.success("Registered successfully");
      navigate("/profile");
    } catch (error) {
      message.error("Registration failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${bgDashboard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="glass flex flex-row items-center">
        <div className="w-full h-screen py-[20vh] text-white">
          <p className="text-5xl font-bold px-20 pt-20 leading-normal">
            One Place To Track All Your Oppotunity{" "}
          </p>
          <p className="text-lg px-20 py-4">No more table and raws</p>
        </div>
        
        <div className="min-h-screen w-screen flex items-center justify-center">
          <div className="w-120 px-10 py-12">
            {/* Title */}
            <h1 className="text-center text-2xl font-bold tracking-widest text-white mb-10 py-2 px-6 border-b">
              REGISTER
            </h1>

            <Form
              layout="vertical"
  className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg"
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
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  placeholder="Enter username"
                  className="
                  !w-100
                  !text-lg
      !bg-transparent
      !border-0
      !border-b
      !border-white/50
      !rounded-none
      !text-white
      placeholder:!text-white/60
      placeholder:!text-sm
      focus:!border-white/100
      hover:!border-white/100
      focus:!shadow-none
    "
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  placeholder="Enter email"
                  className="
      !w-100
                  !text-lg
      !bg-transparent
      !border-0
      !border-b
      !border-white/50
      !rounded-none
      !text-white
      placeholder:!text-white/60
      placeholder:!text-sm
      focus:!border-white/100
      hover:!border-white/100
      focus:!shadow-none
    "
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Enter password"
                  className="
       !w-100
                  !text-lg
      !bg-transparent
      !border-0
      !border-b
      !border-white/50
      !rounded-none
      !text-white
      placeholder:!text-white/60
      placeholder:!text-sm
      focus:!border-white/100
      hover:!border-white/100
      focus:!shadow-none
    "
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="!h-10 !w-100 !border !border-white/50 !text-white/90 !text-xl !font-bold !py-2 !px-6 !rounded-md !bg-black !hover:bg-white/50"
                >
                  Submit
                </Button>
              </Form.Item>

              <p className="text-center !text-white/90 py-2">
                Already have an account?
              </p>
              <a
                onClick={() => navigate("/login")}
                className="mx-[12vw] !text-white/90 cursor-pointer !hover:underline"
              >
                LOGIN
              </a>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
