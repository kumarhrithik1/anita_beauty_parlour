import { Link } from "react-router-dom";

const POINTS = [
  ["One studio for the whole look", "Makeup, mehndi, nails and hair are planned together so colours and styles agree."],
  ["Trials before the big day", "Book a bridal trial and change anything you want before the event."],
  ["Clean tools every time", "Brushes and tools are sanitised between clients."],
];

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>About Anita Studio</h1>
          <p className="lead">A neighbourhood parlour for everyday care and for the biggest days of your life.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap points">
          {POINTS.map(([t, d]) => (<div key={t}><h3>{t}</h3><p className="muted">{d}</p></div>))}
        </div>
        <p className="center"><Link className="btn" to="/contact">Book appointment</Link></p>
      </section>
    </>
  );
}
