import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../index.css";
import bgDashboard from "../../assets/bg2.jpg";
import star from "../../assets/stars.avif";

const baseClass =
  "!w-full !mb-1 !text-lg !bg-transparent !border-0 !border-b !border-gray-300 !rounded-none !text-white placeholder:!text-gray-400 placeholder:!text-sm focus:!border-blue-500 focus:!shadow-none";

const ProfileForm = () => {
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${backendURL}/profile`, {
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
      const response = await fetch(`${backendURL}/profile`, {
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

  // if (loading)
  //   return <p className="text-white text-center mt-20">Loading profile...</p>;

  return (
    <div
      className="h-auto w-full bg-cover bg-center bg-fixed flex items-start overflow-hidden"
      // style={{ backgroundImage: `url(${bgDashboard})` }}
    >
      <div className=" pt-8 h-auto w-full">
        <h1 className="text-3xl w-screen text-white font-bold mb-0 text-center">
          CREATE YOUR PROFILE
        </h1>

        <div className="flex flex-row  px-0 h-auto">
          {/* LEFT FORM */}
          <div className="flex px-0 py-10 w-full h-auto">
            <Form
              form={form}
              className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg"
              layout="horizontal"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              style={{ width: 800, maxWidth: "100%", margin: "0 260px" }}
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
                // label={<span className="range-wrapper">Phone</span>}
                label="Phone"
                className="range-wrapper"
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
                // getValueFromEvent={(value) => value?.slice(-1)}
              >
                <Select
                  // placeholder="Select your role"
                  // mode="tags"
                  // maxTagCount={1}
                  placeholder="Select or type your role"
                  allowClear
                  className={baseClass}
                  options={[
                    {
                      label: "Frontend Developer",
                      value: "Frontend Developer",
                    },
                    { label: "Backend Developer", value: "Backend Developer" },
                    {
                      label: "Full Stack Developer",
                      value: "Full Stack Developer",
                    },
                    { label: "Junior Developer", value: "Junior Developer" },
                    {
                      label: "Software Development Engineer (SDE)",
                      value: "SDE",
                    },
                    {
                      label: "Senior Software Engineer",
                      value: "Senior Software Engineer",
                    },
                    { label: "Tech Lead", value: "Tech Lead" },
                    {
                      label: "Engineering Manager",
                      value: "Engineering Manager",
                    },
                    { label: "Product Manager", value: "Product Manager" },
                    { label: "Senior Manager", value: "Senior Manager" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Experience Level"
                name="experienceLevel"
                // rules={[
                // { required: true, message: "Please select Experience Level!" },
                // ]}
                // getValueFromEvent={(value) => value?.slice(-1)}
              >
                <Select
                  // placeholder="Select your role"
                  // mode="tags"
                  // maxTagCount={1}
                  // placeholder="Select or type your role"
                  // allowClear
                  className={baseClass}
                  options={[
                    { label: "Intern", value: "Intern" },
                    {
                      label: "Fresher / Entry Level",
                      value: "Fresher / Entry Level",
                    },
                    { label: "Junior", value: "Junior" },
                    { label: "Mid-Level", value: "Mid-Level" },
                    { label: "Senior", value: "Senior" },
                    { label: "Lead", value: "Lead" },
                    { label: "Staff", value: "Staff" },
                    { label: "Principal", value: "Principal" },
                    { label: "Manager", value: "Manager" },
                    { label: "Director", value: "Director" },
                  ]}
                />
              </Form.Item>

              {/* Skills */}
              <Form.Item label="Skills" name="skills">
                <Select
                  // placeholder="Add skills"
                  className={baseClass}
                  mode="tags"
                  options={[
                    { label: "HTML", value: "HTML" },
                    { label: "CSS", value: "CSS" },
                    { label: "JavaScript", value: "JavaScript" },
                    { label: "TypeScript", value: "TypeScript" },
                    { label: "React", value: "React" },
                    { label: "Node.js", value: "Node.js" },
                    { label: "Express.js", value: "Express.js" },
                    { label: "MongoDB", value: "MongoDB" },
                    { label: "Git", value: "Git" },
                    { label: "REST API", value: "REST API" },
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
                  className="!h-10 !w-128 !border !ml-70 !border-white/50 !text-white/90 !text-xl !font-bold !py-2 !rounded-md !bg-transparent !bg-white/30 hover:!bg-transparent
    hover:!shadow-[0_0_20px_rgba(255,255,255,0.1),0_0_10px_rgba(255,255,255,0.1)]"
                >
                  SAVE
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* RIGHT FORM */}
         
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
