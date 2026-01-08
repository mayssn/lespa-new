import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EtiquettePage from "./pages/EtiquettePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/etiquette" element={<EtiquettePage />} />
    </Routes>
  );
}
