// import React, { useContext } from "react";
// import { Button, Checkbox, Form, Input, message } from "antd";
// import { useNavigate } from "react-router-dom";
// // import loginimg from "../assets/loginImage.png";
// import { AuthContext } from "../context/AuthContext";
// import "../index.css";
// import bgDashboard from "../assets/bg3.jpg";

// const login = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const onFinish = async (values) => {
//     try {
//       await login(values); // 🔑 central auth logic
//       message.success("logged in successfully");
//       navigate("/profile");
//     } catch (error) {
//       message.error("login failed");
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         width: "100%",
//         backgroundImage: `url(${bgDashboard})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed",
//         // display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="glass flex flex-row items-center justify-center align-middle">
//         <div className="w-full h-screen py-[20vh] text-white">
//           <p className="text-5xl font-bold px-20 pt-20 leading-normal">
//             One Place To Track All Your Oppotunity{" "}
//           </p>
//           <p className="text-lg px-20 py-4">No more table and raws</p>
//         </div>
//         <div className="min-h-screen w-screen flex items-center justify-center">
//           <div className="w-120 px-10 py-12 flex flex-col">
//             {/* Title */}
//             <h1 className="text-center text-2xl font-bold tracking-widest text-white mb-10 py-2 px-6 border-b">
//               LOGIN
//             </h1>

//             <Form
//               layout="vertical"
//               className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg"
//               name="basic"
//               labelCol={{ span: 8 }}
//               wrapperCol={{ span: 16 }}
//               style={{ maxWidth: 600 }}
//               initialValues={{ remember: true }}
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//               autoComplete="off"
//             >
//               {/* Username */}
//               <Form.Item
//                 label="Username"
//                 name="username"
//                 rules={[
//                   { required: true, message: "Please input your username!" },
//                 ]}
//               >
//                 <Input
//                   placeholder="username"
//                   className="
//                   !w-100
//                   !text-lg
//       !bg-transparent
//       !border-0
//       !border-b
//       !border-white/50
//       !rounded-none
//       !text-white
//       placeholder:!text-white/60
//       placeholder:!text-sm
//       focus:!border-white/100
//       hover:!border-white/100
//       focus:!shadow-none
//     "
//                 />
//               </Form.Item>

//               {/* Password */}
//               <Form.Item
//                 label="Password"
//                 name="password"
//                 rules={[
//                   { required: true, message: "Please input your password!" },
//                 ]}
//               >
//                 <Input.Password
//                   placeholder="password"
//                   className="
//                   !w-100
//                   !text-lg
//       !bg-transparent
//       !border-0
//       !border-b
//       !border-white/50
//       !rounded-none
//       !text-white
//       placeholder:!text-white/60
//       placeholder:!text-sm
//       focus:!border-white/100
//       hover:!border-white/100
//       focus:!shadow-none
//     "
//                 />
//               </Form.Item>

//               {/* Submit Button */}
//               {/* Submit Button */}
//               <Form.Item>
//                 <Button
//                   htmlType="submit"
//                   className="!h-10 !w-100 !border !border-white/50 !text-white/90 !text-xl !font-bold !py-2 !px-6 !rounded-md !bg-transparent !hover:bg-white/50"
//                 >
//                   Submit
//                 </Button>
//               </Form.Item>

//               <p className="text-center !text-white/90 py-2">
//                 Don't have an account?
//               </p>
//               <a
//                 onClick={() => navigate("/register")}
//                 className="mx-[10vw] !text-white/90 cursor-pointer !hover:underline"
//               >
//                 REGISTER
//               </a>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default login;





import React, { useContext } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
// import loginimg from "../assets/loginImage.png";
import { AuthContext } from "../context/AuthContext";
import "../index.css";
import bgDashboard from "../assets/bg3.jpg";

const login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      await login(values); // 🔑 central auth logic
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
  <div
    style={{
      minHeight: "100vh",
      width: "100%",
      backgroundImage: `url(${bgDashboard})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div className="glass flex flex-col md:flex-row items-center justify-center">
      
      {/* ===== LEFT TEXT (HIDDEN ON MOBILE) ===== */}
      <div className="hidden md:block w-full h-screen py-[20vh] text-white">
        <p className="text-5xl font-bold px-20 pt-20 leading-normal">
          One Place To Track All Your Opportunity
        </p>
        <p className="text-lg px-20 py-4">
          {/* No more table and raws */}
          No more spreadsheets—everything in one place.
        </p>
      </div>

      {/* ===== FORM SECTION (ALWAYS VISIBLE) ===== */}
      <div className="min-h-screen w-full md:w-screen flex items-center justify-center">
        <div className="w-full max-w-md px-6 md:px-10 py-12 flex flex-col">
          
          {/* Title */}
          <h1 className="text-center text-2xl font-bold tracking-widest text-white mb-10 py-2 px-6 border-b">
            LOGIN
          </h1>

          <Form
            layout="vertical"
            className="[&_.ant-form-item-label>label]:!text-white [&_.ant-form-item-label>label]:!text-lg"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 26 }}
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
                placeholder="username"
                className="
                  !w-full
                  !text-lg
                  !bg-transparent
                  !border-0
                  !border-b
                  !border-white/50
                  !rounded-none
                  !text-white
                  placeholder:!text-white/60
                  placeholder:!text-sm
                  focus:!border-white
                  hover:!border-white
                  focus:!shadow-none
                "
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="password"
                className="
                  !w-full
                  !text-lg
                  !bg-transparent
                  !border-0
                  !border-b
                  !border-white/50
                  !rounded-none
                  !text-white
                  placeholder:!text-white/60
                  placeholder:!text-sm
                  focus:!border-white
                  hover:!border-white
                  focus:!shadow-none
                "
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                htmlType="submit"
                className="!h-10 !w-full !border !border-white/50 !text-white/90 !text-xl !font-bold !rounded-md !bg-transparent !hover:bg-white/50"
              >
                Submit
              </Button>
            </Form.Item>

            <p className="text-center !text-white/90 py-2">
              Don't have an account?
            </p>

            <p
              onClick={() => navigate("/register")}
              className="text-center !text-white/90 cursor-pointer hover:underline"
            >
              REGISTER
            </p>
          </Form>
        </div>
      </div>
    </div>
  </div>
);

};
export default login;
