import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DetailedVenue from "./pages/Details";
import ProfilePage from "./pages/Profile";
import { AuthProvider } from "./components/AuthHandler";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="venue/:id" element={<DetailedVenue />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
