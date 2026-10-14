import { CalendarClock, CheckCircle2, Clock3 } from "lucide-react";
import { demoAgenda } from "../../data/demoAnimals.js";

export default function TodaysAgenda() {
  return (
    <section className="panel agenda-panel">
      <div className="panel-heading">
        <div><h2>Today's agenda</h2><p>Appointments and tasks for the shelter team</p></div>
        <span className="agenda-date"><CalendarClock size={15} /> Demo schedule</span>
      </div>
      <div className="agenda-list">
        {demoAgenda.map((item, index) => (
          <div className="agenda-item" key={item.title}>
            <div className="agenda-time"><Clock3 size={15} />{item.time}</div>
            <div className="agenda-marker"><span /></div>
            <div className="agenda-description"><strong>{item.title}</strong><p>{item.detail}</p></div>
            <span className={`agenda-type type-${index}`}>{item.type}</span>
            <CheckCircle2 className="agenda-check" size={18} />
          </div>
        ))}
      </div>
    </section>
  );
}