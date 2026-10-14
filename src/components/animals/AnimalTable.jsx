import { MapPin, Search, ArrowUpDown, PawPrint } from "lucide-react";
import { useMemo, useState } from "react";

function Badge({ value }) {
  let kind = "neutral";
  if (["Healthy", "Vaccinated", "Completed"].includes(value)) kind = "success";
  if (["Needs Medical Attention", "Under Treatment", "Critical", "Pending"].includes(value)) kind = "warning";
  return <span className={`status-badge ${kind}`}>{value || "Unknown"}</span>;
}

export default function AnimalTable({ animals }) {
  const [query, setQuery] = useState("");
  const [species, setSpecies] = useState("All");
  const [sortNewest, setSortNewest] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...animals]
      .filter((a) => species === "All" || a.species === species)
      .filter((a) => [a.id, a.name, a.species, a.breed, a.location].some((v) => String(v || "").toLowerCase().includes(q)))
      .sort((a, b) => sortNewest
        ? new Date(b.createdAt || b.dateReceived) - new Date(a.createdAt || a.dateReceived)
        : new Date(a.createdAt || a.dateReceived) - new Date(b.createdAt || b.dateReceived));
  }, [animals, query, species, sortNewest]);

  return (
    <div className="panel animal-list-panel">
      <div className="list-toolbar">
        <label className="search-box"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, ID or location..." /></label>
        <select className="filter-select" value={species} onChange={(e) => setSpecies(e.target.value)}><option>All</option><option>Dog</option><option>Cat</option><option>Other</option></select>
        <button className="button button-secondary" onClick={() => setSortNewest((v) => !v)}><ArrowUpDown size={15} /> {sortNewest ? "Newest first" : "Oldest first"}</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Animal</th><th>Intake date</th><th>Rescue location</th><th>Initial condition</th><th>Vaccination</th><th>Sterilization</th></tr></thead>
          <tbody>{filtered.map((animal) => (
            <tr key={animal.id}>
              <td><div className="animal-cell">{animal.image ? <img className="animal-photo-small" src={animal.image} alt="" /> : <span className="animal-avatar"><PawPrint size={17} /></span>}<span><strong>{animal.name || "Unnamed animal"}</strong><small>{animal.id} · {animal.species}{animal.breed ? ` · ${animal.breed}` : ""}</small></span></div></td>
              <td>{animal.dateReceived || "—"}</td>
              <td><span className="location-cell"><MapPin size={13} />{animal.location || "—"}</span></td>
              <td><Badge value={animal.condition || animal.healthStatus} /></td>
              <td><Badge value={animal.vaccinationStatus} /></td>
              <td><Badge value={animal.sterilizationStatus} /></td>
            </tr>
          ))}</tbody>
        </table>
        {!filtered.length && <div className="empty-state">No matching animals found. Try another search or register an animal.</div>}
      </div>
      <div className="table-footer">Showing <strong>{filtered.length}</strong> of <strong>{animals.length}</strong> animal records <span>Demo records are illustrative</span></div>
    </div>
  );
}