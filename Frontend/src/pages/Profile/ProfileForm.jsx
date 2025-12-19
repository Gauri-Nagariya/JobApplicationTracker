import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../index.css";
import bgDashboard from "../../assets/bg2.jpg";
import star from "../../assets/stars.avif";

const baseClass = ` className="
                  !w-100
                  !mb-1
                  !text-md
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
                />`;

const ProfileForm = () => {
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${backendURL}/api/profile`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
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
    try {
      const response = await fetch(`${backendURL}/api/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Profile updated successfully");
        form.setFieldsValue(data.profile);
      } else {
        message.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    }
  };

  if (loading)
    return <p className="text-white text-center mt-20">Loading profile...</p>;

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-fixed flex items-start overflow-hidden"
      style={{ backgroundImage: `url(${bgDashboard})` }}
    >
      <div className="glass pt-28 h-screen w-full">
        <h1 className="text-3xl w-screen text-white font-bold mb-0 text-center">
          CREATE YOUR PROFILE
        </h1>

        <div className="flex flex-row justify-start px-30 h-[120%]">
          {/* LEFT FORM */}
          <div className="flex flex-col px-6 py-6 max-w-lg">
            <Form
              form={form}
              className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg"
              layout="horizontal"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              {/* Full Name */}
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                ]}
              >
                <Input className={baseClass} />
              </Form.Item>
              {/* Phone */}
              <Form.Item
                label={<span className="text-white text-lg">Phone</span>}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    pattern: /^\d{10,}$/, // At least 10 digits
                    message: "Phone number must be at least 10 digits",
                  },
                ]}
              >
                <InputNumber placeholder="Phone" className={baseClass} />
              </Form.Item>
              {/* Location */}
              <Form.Item label="Location" name="location">
                <Input className={baseClass} />
              </Form.Item>
              {/* Current Role */}
              <Form.Item
                label="Current Role"
                name="currentRole"
                rules={[
                  { required: true, message: "Please select your role!" },
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

              {/* Skills */}
              <Form.Item label="Skills" name="skills">
                <Select
                  // placeholder="Add skills"
                  className={baseClass}
                  options={[
                    { label: "HTML", value: "HTML" },
                    { label: "CSS", value: "CSS" },
                    { label: "JavaScript", value: "JavaScript" },
                    { label: "React", value: "React" },
                    { label: "Node.js", value: "Node.js" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white text-lg">Portfolio</span>}
                name="Portfolio"
              >
                <Input className={baseClass} />
              </Form.Item>

              <Form.Item
                label={<span className="text-white text-lg">GitHub</span>}
                name="GitHub"
              >
                <Input className={baseClass} />
              </Form.Item>

              <Form.Item
                label={<span className="text-white text-lg">LinkedIn</span>}
                name="LinkedIn"
              >
                <Input className={baseClass} />
              </Form.Item>

              {/* SAVE BUTTON */}
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="!h-10 !w-100 !border !border-white/50 !text-white/90 !text-xl !font-bold !py-2 !ml-39 !rounded-md !bg-transparent !hover:bg-white/50 !bg-white/30 hover:!bg-transparent
    hover:!shadow-[0_0_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.1)]"
                >
                  SAVE
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* RIGHT FORM */}
          <div className="relative w-full h-screen flex py-30 justify-center text-white">
            {/* Bottom Image */}
            {/* <img
    src={star}
    alt=""
    className="absolute -translate-x-24 -translate-y-16 w-50 opacity-50 z-10"
  /> */}

            {/* Text Layer */}
            {/* <p
    className="absolute z-20 text-lg font-semibold px-6 py-3
               bg-black/40 backdrop-blur-md rounded-lg
               -translate-x-4 -translate-y-2"
  >
    No more tables and rows
  </p> */}

            {/* Top Image */}
            <img
              src={star}
              alt=""
              className="absolute translate-x-24 translate-y-16 w-70 z-30 opacity-70"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
