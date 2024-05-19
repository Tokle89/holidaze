import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DetailedVenue from "./pages/Details";
import ProfilePage from "./pages/Profile";
import UserBookingsAndVenues from "./components/UserBookingsAndVenues";
import DetailedCard from "./components/Cards/DetailedCard";
import { AuthProvider } from "./components/AuthHandler";
import { MessageProvider } from "./components/Message/MessageProvider";
import VenueForm from "./components/VenueForm";
import SearchPage from "./pages/Search";
import HostPage from "./pages/Host";

const App = () => {
  return (
    <>
      <AuthProvider>
        <MessageProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="venue/:id" element={<DetailedVenue />} />
              <Route path="/profile/:userName" element={<ProfilePage />}>
                <Route index element={<UserBookingsAndVenues />} />
                <Route path=":view" element={<UserBookingsAndVenues />} />
                <Route path=":view/:id" element={<DetailedCard />} />
              </Route>
              <Route path="/venueForm" element={<VenueForm />} />
              <Route path="/search" element={<SearchPage />}>
                <Route path=":id" element={<SearchPage />} />
              </Route>
              <Route path="/host" element={<HostPage />} />
            </Route>
          </Routes>
        </MessageProvider>
      </AuthProvider>
    </>
  );
};

export default App;
