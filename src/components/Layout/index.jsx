import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import useAuth from "../AuthHandler/useAuth";
import AuthForm from "../Forms/AuthForm";
import ProfileForm from "../Forms/ProfileForm";

/**
 *  A layout component that displays the Header, Footer, and AuthForm components.
 * It uses the useAuth hook to access the showModal, showProfileForm  and authMode states.
 * @returns {JSX.Element}
 * @example
 * <Layout />
 */

const Layout = () => {
  const { showModal, authMode, showProfileForm } = useAuth();

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
