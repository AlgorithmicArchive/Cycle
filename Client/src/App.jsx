import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Navigation } from "./components/Common/Navigation";
import Home from "./components/User/Home";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path="/User/Index" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
