import { ArrowLeft, ClipboardPlus } from "lucide-react";
import { Link } from "react-router-dom";
import AnimalForm from "../components/animals/AnimalForm.jsx";

export default function RegisterAnimal() {
  return (
    <div className="page register-page">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to dashboard</Link>
      <div className="page-heading register-heading"><div><div className="eyebrow"><ClipboardPlus size={14} /> NEW INTAKE</div><h1>Register new animal</h1><p>Create a digital intake record for a rescued animal.</p></div><span className="step-indicator"><span>01</span> / 01 · Intake details</span></div>
      <AnimalForm />
    </div>
  );
}