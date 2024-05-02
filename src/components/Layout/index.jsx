import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useAuth } from "../AuthHandler";
import AuthForm from "../AuthForm";
const Layout = () => {
  const { showModal, authMode } = useAuth();
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      {showModal && <AuthForm authMode={authMode} />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
