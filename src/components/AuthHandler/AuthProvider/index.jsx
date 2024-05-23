import { createContext, useEffect, useState } from "react";

/**
 * AuthProvider component is a context provider that provides the loggedIn state to the entire application. It also provides the authMode state to toggle between login and register form, and showModal state to toggle the visibility of the login/register form. It also provides the showProfileForm state to toggle the visibility of the profile form.
 */

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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

export default AuthProvider;
