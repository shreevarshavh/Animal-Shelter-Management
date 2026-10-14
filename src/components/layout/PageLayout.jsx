import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function PageLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content"><Outlet /></main>
      <footer className="app-footer">PawTrack <span>·</span> Animal shelter management prototype</footer>
    </div>
  );
}