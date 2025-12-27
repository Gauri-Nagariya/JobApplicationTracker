// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { lazy, Suspense } from "react";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile/Profile";
// import Nav from "./components/Nav";
// import ProtectedRoute from "./context/ProtectedRoute";
// import ProfileForm from "./pages/Profile/ProfileForm";
// import Settings from "./pages/Profile/Settings";
// import ApplicationsForm from "./pages/Applications/ApplicationsForm";
// import Applications from "./pages/Applications/Applications";
// import ApplicationsCard from "./pages/Applications/ApplicationsCard";
// import ApplicationsDetails from "./pages/Applications/ApplicationsDetails";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import ProfileCompletion from "./pages/Dashboard/ProfileCompletion";
// import ApplicationsbyStatus from "./pages/Dashboard/ApplicationsbyStatus";
// import SourceAndStrategy from "./pages/Dashboard/SourceAndStrategy";
// // import EditApplications from './pages/Applications/EditApplications';

// function App() {
//   return (
//     <BrowserRouter>
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         /> */}

//         <Route
//           path="/Dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<ProfileCompletion />} />
//         <Route path="ApplicationsbyStatus" element={<ApplicationsbyStatus />} />
//           <Route path="SourceAndStrategy" element={<SourceAndStrategy/>} />
//           {/* <Route path="settings" element={<ApplicationsbyStatus/>} /> */}
//           {/* <Route path="settings" element={<ApplicationsbyStatus/>} /> */}

//         </Route>

        
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<ProfileForm />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>

//         <Route
//           path="/applications"
//           element={
//             <ProtectedRoute>
//               <Applications />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<ApplicationsForm />} />
//           <Route path="ApplicationsCard" element={<ApplicationsCard />} />
//           <Route path=":id" element={<ApplicationsDetails />} />
//           {/* <Route path=":id/edit" element={<EditApplications />} /> */}
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Nav from "./components/Nav";
import ProtectedRoute from "./context/ProtectedRoute";

// ❌ NOT LAZY (heavy data / cards)
import Applications from "./pages/Applications/Applications";
import ApplicationsForm from "./pages/Applications/ApplicationsForm";
import ApplicationsCard from "./pages/Applications/ApplicationsCard";
import ApplicationsDetails from "./pages/Applications/ApplicationsDetails";

// ✅ LAZY LOADED
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));

const Profile = lazy(() => import("./pages/Profile/Profile"));
const ProfileForm = lazy(() => import("./pages/Profile/ProfileForm"));
const Settings = lazy(() => import("./pages/Profile/Settings"));

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const ProfileCompletion = lazy(() =>
  import("./pages/Dashboard/ProfileCompletion")
);
const ApplicationsbyStatus = lazy(() =>
  import("./pages/Dashboard/ApplicationsbyStatus")
);
const SourceAndStrategy = lazy(() =>
  import("./pages/Dashboard/SourceAndStrategy")
);

const ResumePage = lazy(() => import("./pages/Resume/resumePage"));

// 🔄 Simple loader
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen text-white">
    Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileCompletion />} />
            <Route
              path="ApplicationsbyStatus"
              element={<ApplicationsbyStatus />}
            />
            <Route
              path="SourceAndStrategy"
              element={<SourceAndStrategy />}
            />
          </Route>

          <Route
            path="/Resume"
            element={
              <ProtectedRoute>
                <ResumePage />
              </ProtectedRoute>
            }
          >
            {/* <Route index element={<ProfileCompletion />} />
            <Route
              path="ApplicationsbyStatus"
              element={<ApplicationsbyStatus />}
            />
            <Route
              path="SourceAndStrategy"
              element={<SourceAndStrategy />}
            /> */}
          </Route>

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileForm />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* ❌ Applications (NOT LAZY) */}
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          >
            <Route index element={<ApplicationsForm />} />
            <Route path="ApplicationsCard" element={<ApplicationsCard />} />
            <Route path=":id" element={<ApplicationsDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
