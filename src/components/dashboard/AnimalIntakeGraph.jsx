import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "May", intake: 24 },
  { month: "Jun", intake: 31 },
  { month: "Jul", intake: 27 },
  { month: "Aug", intake: 38 },
  { month: "Sep", intake: 34 },
  { month: "Oct", intake: 42 },
];

export default function AnimalIntakeGraph() {
  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div><h2>Animal intake</h2><p>Animals received each month</p></div>
        <span className="chart-tag">Demo data</span>
      </div>
      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 12, left: -14, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9eeeb" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#78847e", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#78847e", fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e4ebe6" }} />
            <Line type="monotone" dataKey="intake" name="Animals received" stroke="#26745c" strokeWidth={3} dot={{ r: 4, fill: "#26745c" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}