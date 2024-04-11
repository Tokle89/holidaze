import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = () => {
  return (
    <main>
      <h2>Home</h2>
    </main>
  );
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
