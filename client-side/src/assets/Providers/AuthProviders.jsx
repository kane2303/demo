import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

// A lightweight local auth provider that stores user info in localStorage
// and cooperates with the existing backend JWT flow (/jwt, /logout).
const STORAGE_KEY = "vms_user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch { }
    setLoading(false);
  }, []);

  const persistUser = (u) => {
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch { }
  };

  // Register: for demo, accept email/password locally
  const registerAccount = async (email, password) => {
    setLoading(true);
    const result = { user: { email } };
    persistUser({ email });
    setLoading(false);
    return result;
  };

  // Login: for demo, accept email/password locally
  const logIn = async (email, password) => {
    setLoading(true);
    const result = { user: { email } };
    persistUser({ email });
    setLoading(false);
    return result;
  };

  // Update local profile only
  const updateUserProfile = (name, email, image) => {
    const updated = { ...user, displayName: name, email, photoURL: image };
    persistUser(updated);
    return;
  };

  // Logout: clear local user and inform backend to clear cookie
  const logOut = async () => {
    setLoading(true);
    try {
      await axios(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Logout failed:", error);
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { }
    setUser(null);
    setLoading(false);
  };

  // Social logins disabled in local mode
  const disabled = () =>
    Promise.reject(new Error("Social login is disabled in local auth mode."));
  const googleLogIn = disabled;
  const githubLogin = disabled;
  const facebookLogin = disabled;

  const allValues = {
    registerAccount,
    logIn,
    googleLogIn,
    user,
    loading,
    githubLogin,
    facebookLogin,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthProvider;
