import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DetailedVenue from "./pages/Details";
import ProfilePage from "./pages/Profile";
import UserBookingsAndVenues from "./components/UserBookingsAndVenues";
import DetailedCard from "./components/Cards/DetailedCard";
import { AuthProvider } from "./components/AuthHandler";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="venue/:id" element={<DetailedVenue />} />
            <Route path="/profile/:userName" element={<ProfilePage />}>
              <Route index element={<UserBookingsAndVenues />} />
              <Route path=":view" element={<UserBookingsAndVenues />} />
              <Route path=":view/:bookingId" element={<DetailedCard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
