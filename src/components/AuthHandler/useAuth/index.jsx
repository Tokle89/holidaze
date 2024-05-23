import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

/**
 * useAuth Hook that returns the AuthContext object, that lets you access the AuthContext values such as showModal, setShowModal, authMode, setAuthMode, showProfileForm, setShowProfileForm, and user.
 * @returns {object} - AuthContext object
 * @example
 * const { showModal, setShowModal, authMode, setAuthMode, showProfileForm, setShowProfileForm, user } = useAuth();
 
 */

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
