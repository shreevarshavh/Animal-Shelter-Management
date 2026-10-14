import { Activity, HeartPulse, PawPrint, Scissors, Plus, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard.jsx";
import AnimalIntakeGraph from "../components/dashboard/AnimalIntakeGraph.jsx";
import ShelterCapacityGraph from "../components/dashboard/ShelterCapacityGraph.jsx";
import TodaysAgenda from "../components/dashboard/TodaysAgenda.jsx";
import RecentAnimalsTable from "../components/dashboard/RecentAnimalsTable.jsx";
import useAnimals from "../hooks/useAnimals.js";

export default function Dashboard() {
  const animals = useAnimals();
  const total = animals.length;
  const medical = animals.filter((a) => ["Needs Medical Attention", "Under Treatment", "Critical"].includes(a.condition || a.healthStatus)).length;
  const vaccinated = animals.filter((a) => a.vaccinationStatus === "Vaccinated").length;
  const pending = animals.filter((a) => (a.sterilizationStatus || "Pending") === "Pending").length;

  const stats = [
    { label: "Total animals registered", value: total, hint: "Across all intake records", icon: PawPrint, tone: "green" },
    { label: "Need medical attention", value: medical, hint: "Review health records", icon: HeartPulse, tone: "orange" },
    { label: "Vaccinated", value: vaccinated, hint: "Documented as vaccinated", icon: Activity, tone: "blue" },
    { label: "Awaiting sterilization", value: pending, hint: "Pending procedure", icon: Scissors, tone: "purple" },
  ];

  return (
    <div className="page">
      <div className="page-heading dashboard-heading">
        <div><div className="eyebrow"><Sparkles size={14} /> SHELTER OVERVIEW</div><h1>Good day, shelter team <span>👋</span></h1><p>Here's what's happening at your shelter today.</p></div>
        <Link to="/register" className="button button-primary"><Plus size={17} /> Register animal</Link>
      </div>
      <div className="stat-grid">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</div>
      <div className="charts-grid"><AnimalIntakeGraph /><ShelterCapacityGraph /></div>
      <TodaysAgenda />
      <RecentAnimalsTable animals={animals} />
      <p className="demo-disclaimer">Prototype note: chart, capacity and agenda values are illustrative demo data. Animal counts are calculated from records saved in this browser.</p>
    </div>
  );
}