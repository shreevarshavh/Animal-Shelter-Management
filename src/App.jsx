import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AnimalDetails from "./pages/AnimalDetails.jsx";
import RegisterAnimal from "./pages/RegisterAnimal.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/animals" element={<AnimalDetails />} />
        <Route path="/register" element={<RegisterAnimal />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}