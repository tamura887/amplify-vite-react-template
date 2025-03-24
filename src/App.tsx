import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SP20101 from "./components/SP20101";
import SP20102 from "./components/SP20102";
import SP20103 from "./components/SP20103";
import SP20201 from "./components/SP20201";
import SP20202 from "./components/SP20202";
import SP20401 from "./components/SP20401";
import SP20402 from "./components/SP20402";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SP20101 />} />
        <Route path="/SP20102" element={<SP20102 />} />
        <Route path="/SP20103" element={<SP20103 />} />
        <Route path="/SP20201" element={<SP20201 />} />
        <Route path="/SP20202" element={<SP20202 />} />
        <Route path="/SP20401" element={<SP20401 />} />
        <Route path="/SP20402" element={<SP20402 />} />
      </Routes>
    </Router>
  );
}

export default App;