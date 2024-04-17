import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const Venue = () => {
  return <h1>Venue</h1>;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venue/:id" element={<Venue />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
