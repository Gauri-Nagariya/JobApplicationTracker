import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile/Profile";
import Nav from "./components/Nav";
import ProtectedRoute from "./context/ProtectedRoute";
import ProfileForm from "./pages/Profile/ProfileForm";
import Settings from "./pages/Profile/Settings";
import ApplicationsForm from "./pages/Applications/ApplicationsForm";
import Applications from "./pages/Applications/Applications";
import ApplicationsCard from "./pages/Applications/ApplicationsCard";
import ApplicationsDetails from "./pages/Applications/ApplicationsDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileCompletion from "./pages/Dashboard/ProfileCompletion";
import ApplicationsbyStatus from "./pages/Dashboard/ApplicationsbyStatus";
import SourceAndStrategy from "./pages/Dashboard/SourceAndStrategy";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileCompletion />} />
        <Route path="ApplicationsbyStatus" element={<ApplicationsbyStatus />} />
          <Route path="SourceAndStrategy" element={<SourceAndStrategy/>} />
          {/* <Route path="settings" element={<ApplicationsbyStatus/>} /> */}
          {/* <Route path="settings" element={<ApplicationsbyStatus/>} /> */}

        </Route>

        
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
          <Route path="/applications/:id" element={<ApplicationsDetails />} />
          <Route path="/applications/edit/:id" element={<ApplicationsForm />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
