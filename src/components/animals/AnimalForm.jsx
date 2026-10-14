import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronDown, PawPrint } from "lucide-react";
import AnimalImageUpload from "./AnimalImageUpload.jsx";
import { getNextAnimalId, registerAnimal } from "../../services/animalService.js";

const initialForm = {
  name: "", species: "Dog", breed: "", sex: "", age: "", intakeType: "Rescue",
  dateReceived: new Date().toISOString().slice(0, 10), location: "", condition: "Needs Medical Attention",
  notes: "", image: "",
};

function Field({ label, required, children, className = "" }) {
  return <label className={`form-field ${className}`}><span className="field-label">{label}{required && <b> *</b>}</span>{children}</label>;
}

export default function AnimalForm() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const animalId = useMemo(() => getNextAnimalId(form.species), [form.species, success]);

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
    setSuccess("");
  }

  function submit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.location.trim() || !form.dateReceived) {
      setError("Please fill in animal name, date received, and rescue location.");
      return;
    }
    try {
      registerAnimal({
        id: getNextAnimalId(form.species),
        ...form,
        name: form.name.trim(),
        location: form.location.trim(),
        healthStatus: form.condition,
        sterilizationStatus: "Pending",
        vaccinationStatus: "Unknown",
        createdAt: new Date().toISOString(),
      });
      setSuccess(`Animal registered successfully. ID: ${getNextAnimalId(form.species)}`);
      setForm({ ...initialForm, dateReceived: new Date().toISOString().slice(0, 10) });
    } catch (err) {
      setError(err.message || "Unable to save this record.");
    }
  }

  return (
    <form className="registration-form" onSubmit={submit}>
      <section className="form-section">
        <div className="form-section-title"><span className="section-icon"><PawPrint size={17} /></span><div><h2>Animal information</h2><p>Basic details to identify the animal</p></div><span className="id-preview">{animalId}</span></div>
        <div className="form-grid">
          <Field label="Animal name" required className="span-2"><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Bruno" /></Field>
          <Field label="Animal species" required><span className="select-wrap"><select value={form.species} onChange={(e) => update("species", e.target.value)}><option>Dog</option><option>Cat</option><option>Other</option></select><ChevronDown size={15} /></span></Field>
          <Field label="Animal breed"><input value={form.breed} onChange={(e) => update("breed", e.target.value)} placeholder="e.g. Indie / unknown" /></Field>
          <Field label="Sex"><span className="select-wrap"><select value={form.sex} onChange={(e) => update("sex", e.target.value)}><option value="">Select sex</option><option>Male</option><option>Female</option><option>Unknown</option></select><ChevronDown size={15} /></span></Field>
          <Field label="Estimated age"><input value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="e.g. 2 years" /></Field>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-title"><span className="section-icon"><CalendarDays size={17} /></span><div><h2>Intake information</h2><p>Record when and where the animal arrived</p></div></div>
        <div className="form-grid">
          <Field label="Intake type"><span className="select-wrap"><select value={form.intakeType} onChange={(e) => update("intakeType", e.target.value)}><option>Rescue</option><option>Stray Intake</option><option>Owner Surrender</option><option>Transfer</option><option>Other</option></select><ChevronDown size={15} /></span></Field>
          <Field label="Date received" required><input type="date" value={form.dateReceived} onChange={(e) => update("dateReceived", e.target.value)} /></Field>
          <Field label="Rescue location" required><input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Gokulam, Mysuru" /></Field>
          <Field label="Initial condition"><span className="select-wrap"><select value={form.condition} onChange={(e) => update("condition", e.target.value)}><option>Healthy</option><option>Needs Medical Attention</option><option>Under Treatment</option><option>Critical</option><option>Unknown</option></select><ChevronDown size={15} /></span></Field>
          <Field label="Intake notes" className="span-2"><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Describe rescue circumstances, visible injuries, or other relevant observations..." rows={4} /></Field>
        </div>
      </section>

      <AnimalImageUpload value={form.image} onChange={(value) => update("image", value)} />

      {error && <div className="form-message error" role="alert">{error}</div>}
      {success && <div className="form-message success" role="status"><CheckCircle2 size={17} />{success}</div>}
      <div className="form-actions"><p><span>*</span> Required fields</p><button className="button button-primary" type="submit"><PawPrint size={17} /> Register animal</button></div>
    </form>
  );
}