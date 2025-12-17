import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

// Create context
export const AuthContext = createContext();

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores logged-in user
  const [loading, setLoading] = useState(true); // to prevent flicker

  
  // 1️⃣ Check login status when app loads
  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/me`,
        { withCredentials: true } // 🔑 sends cookie
      );

      setUser(res.data.user); // user is authenticated
    } catch (err) {
      setUser(null); // not logged in
    } finally {
      setLoading(false);
    }
  };

  // run once on app start
  useEffect(() => {
    checkAuth();
  }, []);

  // 2️⃣ Login function
  const login = async (data) => {
    await axios.post(`${backendURL}/login`, data, {
      withCredentials: true,
    });
    await checkAuth(); // refresh user state
  };

  // 3️⃣ Register function
  const register = async (data) => {
    await axios.post(`${backendURL}/register`, data, {
      withCredentials: true,
    });
    await checkAuth();
  };

  // 4️⃣ Logout function
  const logout = async () => {
    await axios.post(
      `${backendURL}/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  //UPDATE FUNCTION 
 const updateUser = async (values) => {
  try {
    const response = await axios.put(`${backendURL}/update`, values, {
      withCredentials: true,
    });
      setUser(response.data.user); 
          return response.data;

      
    // if (response.status === 200) {
    // //   message.success(response.data.message);
    //   await checkAuth(); // refresh user state
    // }
  } catch (err) {
    console.error(err);
    message.error("Failed to update user");
  }
};

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
