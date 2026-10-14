import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function StatusBadge({ value }) {
  const key = value === "Vaccinated" || value === "Healthy" || value === "Completed"
    ? "success"
    : value === "Under Treatment" || value === "Needs Medical Attention" || value === "Pending"
      ? "warning" : "neutral";
  return <span className={`status-badge ${key}`}>{value || "Unknown"}</span>;
}

export default function RecentAnimalsTable({ animals }) {
  const recent = [...animals].sort((a, b) => new Date(b.createdAt || b.dateReceived) - new Date(a.createdAt || a.dateReceived)).slice(0, 5);
  return (
    <section className="panel recent-panel">
      <div className="panel-heading">
        <div><h2>Recent animal records</h2><p>Latest registered animals</p></div>
        <Link className="text-link" to="/animals">View all <ArrowUpRight size={15} /></Link>
      </div>
      {recent.length ? (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Animal</th><th>Rescue location</th><th>Condition</th><th>Vaccination</th></tr></thead>
            <tbody>{recent.map((animal) => (
              <tr key={animal.id}>
                <td><div className="animal-cell"><span className="animal-avatar">{animal.species === "Cat" ? "🐈" : "🐕"}</span><span><strong>{animal.name || animal.id}</strong><small>{animal.id} · {animal.species}</small></span></div></td>
                <td><span className="location-cell"><MapPin size={13} />{animal.location || "Not recorded"}</span></td>
                <td><StatusBadge value={animal.condition || animal.healthStatus} /></td>
                <td><StatusBadge value={animal.vaccinationStatus} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : <div className="empty-state">No animal records yet. Register the first animal to get started.</div>}
    </section>
  );
}