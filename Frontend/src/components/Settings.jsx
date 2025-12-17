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
import profileImage from "../assets/profileImage.jpg";
import { AuthContext } from "../context/AuthContext";
import Password from "antd/es/input/Password";


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
    <div className="flex justify-center items-center">
      <div className="my-20">
        <div className="w-120 px-10 py-12">
          {/* Title */}
          <h1 className="text-center text-2xl font-bold tracking-widest text-[#388087] mb-10 py-2 px-6 border rounded-t-md">
            UPDATE YOUR CREDENTIALS
          </h1>

          <Form 
           form={form}
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
              // label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your new username!" },
              ]}
            >
              <Input
                placeholder="username"
                className="h-10 !w-92 !mx-4 !mb-2 items-center rounded-md hover:!border-[#388087]"
              />
            </Form.Item>

    
            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your new password!" },
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
                className="!h-12 !w-92 !mx-4 !border-2 !border-[#388087] !text-[#388087] !text-2xl !font-bold !py-2 !px-6 rounded-md !hover:bg-[#5f9ea0]"
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