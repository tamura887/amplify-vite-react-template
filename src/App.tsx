import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SP20101 from "./components/SP20101";
import SP20102 from "./components/SP20102";
import SP20103 from "./components/SP20103";
import SP20103_dummy from "./components/SP20103_dummy";
import SP20103_callback from "./components/SP20103_callback";
import SP20201 from "./components/SP20201";
import SP20202 from "./components/SP20202";
import SP20301 from "./components/SP20301";
import SP20302 from "./components/SP20302";
import SP20401 from "./components/SP20401";
import SP20402 from "./components/SP20402";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SP20101 />} />
        <Route path="/SP20102" element={<SP20102 />} />
        <Route path="/SP20103" element={<SP20103 />} />
        <Route path="/SP20103_dummy" element={<SP20103_dummy />} />
        <Route path="/SP20103_callback" element={<SP20103_callback />} />
        <Route path="/SP20201" element={<SP20201 />} />
        <Route path="/SP20202" element={<SP20202 />} />
        <Route path="/SP20301" element={<SP20301 />} />
        <Route path="/SP20302" element={<SP20302 />} />
        <Route path="/SP20401" element={<SP20401 />} />
        <Route path="/SP20402" element={<SP20402 />} />
      </Routes>
    </Router>
  );
}

export default App;