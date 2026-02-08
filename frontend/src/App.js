import { BrowserRouter, Route, Routes } from "react-router-dom";
import api from "./api/axios";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Trainers from "./pages/Trainers";
import Workouts from "./pages/Workouts";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <Routes> {/* to make react accept URL */}
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/trainers" element={<Trainers />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
}

export default App;
