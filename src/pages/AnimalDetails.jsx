import { PawPrint, Plus, SearchCheck } from "lucide-react";
import { Link } from "react-router-dom";
import AnimalTable from "../components/animals/AnimalTable.jsx";
import useAnimals from "../hooks/useAnimals.js";

export default function AnimalDetails() {
  const animals = useAnimals();
  return (
    <div className="page">
      <div className="page-heading"><div><div className="eyebrow"><SearchCheck size={14} /> SHELTER RECORDS</div><h1>Animal details</h1><p>Search and review the animals registered at your shelter.</p></div><Link to="/register" className="button button-primary"><Plus size={17} /> Register animal</Link></div>
      <div className="records-summary"><div className="records-summary-icon"><PawPrint size={21} /></div><div><strong>{animals.length} animals</strong><p>Records stored in this browser</p></div><span className="local-label"><span /> Local demo storage</span></div>
      <AnimalTable animals={animals} />
    </div>
  );
}