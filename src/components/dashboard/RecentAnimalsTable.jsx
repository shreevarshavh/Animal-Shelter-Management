import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function PawIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="6.5" cy="8" rx="2.3" ry="3" />
      <ellipse cx="12" cy="5.5" rx="2.3" ry="3" />
      <ellipse cx="17.5" cy="8" rx="2.3" ry="3" />
      <ellipse cx="4" cy="13" rx="2" ry="2.6" />
      <path d="M12 11c-3.6 0-7 4.2-7 7.1 0 2 1.7 3.1 3.5 2.4 1.2-.5 2.3-1 3.5-1s2.3.5 3.5 1c1.8.7 3.5-.4 3.5-2.4 0-2.9-3.4-7.1-7-7.1Z" />
      <ellipse cx="20" cy="13" rx="2" ry="2.6" />
    </svg>
  );
}

function StatusBadge({ value }) {
  const key =
    value === "Vaccinated" ||
    value === "Healthy" ||
    value === "Completed"
      ? "success"
      : value === "Under Treatment" ||
          value === "Needs Medical Attention" ||
          value === "Pending"
        ? "warning"
        : "neutral";

  return (
    <span className={`status-badge ${key}`}>
      {value || "Unknown"}
    </span>
  );
}

export default function RecentAnimalsTable({ animals }) {
  const recent = [...animals]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.dateReceived) -
        new Date(a.createdAt || a.dateReceived)
    )
    .slice(0, 5);

  return (
    <section className="panel recent-panel">
      <div className="panel-heading">
        <div>
          <h2>Recent animal records</h2>
          <p>Latest registered animals</p>
        </div>

        <Link className="text-link" to="/animals">
          View all <ArrowUpRight size={15} />
        </Link>
      </div>

      {recent.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Animal</th>
                <th>Rescue location</th>
                <th>Condition</th>
                <th>Vaccination</th>
              </tr>
            </thead>

            <tbody>
              {recent.map((animal) => (
                <tr key={animal.id}>
                  <td>
                    <div className="animal-cell">
                      <span className="animal-avatar">
                        <PawIcon />
                      </span>

                      <span>
                        <strong>{animal.name || animal.id}</strong>
                        <small>
                          {animal.id} · {animal.species}
                        </small>
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="location-cell">
                      <MapPin size={13} />
                      {animal.location || "Not recorded"}
                    </span>
                  </td>

                  <td>
                    <StatusBadge
                      value={animal.condition || animal.healthStatus}
                    />
                  </td>

                  <td>
                    <StatusBadge value={animal.vaccinationStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          No animal records yet. Register the first animal to get started.
        </div>
      )}
    </section>
  );
}