import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return <AuthContext.Provider value={{ loggedIn, setLoggedIn, authMode, setAuthMode, showModal, setShowModal, showProfileForm, setShowProfileForm }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
