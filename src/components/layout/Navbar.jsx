import { PawPrint, LayoutDashboard, ClipboardList, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/animals", label: "Animal Details", icon: ClipboardList },
  { to: "/register", label: "Register", icon: PlusCircle },
];

export default function Navbar() {
  return (
    <header className="topbar">
      <NavLink to="/" className="brand" aria-label="PawTrack home">
        <span className="brand-mark"><PawPrint size={22} /></span>
        <span className="brand-name">Paw<span>Track</span></span>
      </NavLink>
      <nav className="nav-links" aria-label="Main navigation">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="profile-chip"><span className="avatar">PS</span><span className="profile-label">Shelter staff</span></div>
    </header>
  );
}