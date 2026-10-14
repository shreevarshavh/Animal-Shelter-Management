import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const capacity = [
  { name: "Occupied", value: 320 },
  { name: "Available", value: 80 },
];
const COLORS = ["#26745c", "#e6eee8"];

export default function ShelterCapacityGraph() {
  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div><h2>Shelter capacity</h2><p>Illustrative capacity: 400 animals</p></div>
        <span className="chart-tag">Demo data</span>
      </div>
      <div className="capacity-content">
        <div className="capacity-chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={capacity} dataKey="value" nameKey="name" innerRadius="65%" outerRadius="88%" paddingAngle={3} stroke="none">
                {capacity.map((entry, index) => <Cell key={entry.name} fill={COLORS[index]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="capacity-center"><strong>80%</strong><span>occupied</span></div>
        </div>
        <div className="capacity-legend">
          <div><span className="legend-dot occupied" /><span>Occupied</span><strong>320</strong></div>
          <div><span className="legend-dot available" /><span>Available</span><strong>80</strong></div>
          <p>Replace this sample capacity with your shelter's verified capacity.</p>
        </div>
      </div>
    </section>
  );
}