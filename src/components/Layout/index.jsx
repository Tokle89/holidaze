import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useAuth } from "../AuthHandler";
import AuthForm from "../Forms/AuthForm";
import ProfileForm from "../Forms/ProfileForm";
import { useEffect } from "react";
const Layout = () => {
  const { showModal, authMode, showProfileForm } = useAuth();

  useEffect(() => {
    console.log("profile form", showProfileForm);
  }, [showProfileForm]);

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      {showModal && <AuthForm authMode={authMode} />}
      {showProfileForm && <ProfileForm />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
