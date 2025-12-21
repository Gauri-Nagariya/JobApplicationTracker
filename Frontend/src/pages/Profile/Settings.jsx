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
// const { RangePicker } = DatePicker;
import profileImage from "../../assets/profileImage.jpg";
import { AuthContext } from "../../context/AuthContext";
import Password from "antd/es/input/Password";
import "../../index.css";
import bgDashboard from "../../assets/bg2.jpg";
import star from "../../assets/stars.avif";


const Settings = () => {

    const [form] = Form.useForm();
    //   const navigate = useNavigate();
      const { updateUser, user  } = useContext(AuthContext);
//   const [loading, setLoading] = useState(true);


useEffect(() => {
  if (user) {
    form.setFieldsValue({
      username: user.username,
    //   email: user.email,
    //   Password: user.Password,
    });
  }
}, [user, form]);



 const onFinish = async (values) => {
    // Remove empty fields
    const payload = {};
    if (values.username) payload.username = values.username;
    if (values.password) payload.password = values.password;

    if (Object.keys(payload).length === 0) {
      return message.warning("Nothing to update");
    }

    try {
      await updateUser(payload);
      message.success("Updated successfully");
      form.resetFields(["password"]); // clear password field
    } catch (error) {
      message.error("Update failed");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


return (
 <div
      className="md:h-140 w-full bg-cover bg-center bg-fixed flex items-start overflow-hidden"
      // style={{ backgroundImage: `url(${bgDashboard})` }}
    >
            <div className="pt-18 h-screen w-full flex justify-center">
        <div className=" md:px-0 px-6 pr-6 md:py-12 w-full max-w-md md:w-130
        py-10 
        ">
          {/* Title */}
          <h1 className="text-center md:text-2xl text-xl font-bold tracking-widest text-white/90 mb-10 py-2 md:px-6 border-b-2 rounded-t-md">
            UPDATE YOUR CREDENTIALS
          </h1>

          <Form 
           form={form}
            className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg"
            layout="vertical"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            {/* Username */}
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your new username!" },
              ]}
            >
              <Input
                placeholder="username"
className="
                  md:!w-110
                  !text-lg
                  !mb-4
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
    "              />
            </Form.Item>

    
            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password
                placeholder="password"
className="
                  !w-110
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
    "              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                htmlType="submit"
                  className="!h-10 md:!w-110 !w-72 !border !border-white/50 !text-white/90 !text-xl !font-bold !py-2 !my-6 !rounded-md !bg-white/30 hover:!bg-transparent
    hover:!shadow-[0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)]"
              >
                SAVE
              </Button>
            </Form.Item>
          </Form>
        </div>
        
      </div>
    </div>
  );
}

export default Settings