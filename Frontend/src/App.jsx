import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import ProtectedRoute from "./context/ProtectedRoute";
import ProfileForm from "./components/ProfileForm";
import Settings from "./components/Settings";
import ApplicationsForm from "./components/ApplicationsForm";
import Applications from "./pages/Applications";
import ApplicationsCard from "./components/ApplicationsCard";
import ApplicationsDetails from "./components/ApplicationsDetails";
import Dashboard from "./pages/Dashboard";
import ProfileCompletion from "./components/ProfileCompletion";
import ApplicationsbyStatus from "./components/ApplicationsbyStatus";
import SourceAndStrategy from "./components/SourceAndStrategy";

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
