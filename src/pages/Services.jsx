import { Link, useParams, Navigate } from "react-router-dom";
import { CATEGORIES } from "../data/services";
import ServiceMedia from "../components/ServiceMedia";

export default function Services() {
  const { slug } = useParams();
  const current = slug ? CATEGORIES.find((c) => c.slug === slug) : null;
  if (slug && !current) return <Navigate to="/services" replace />;
  const shown = current ? [current] : CATEGORIES;

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{current ? current.name : "Services"}</h1>
          <p className="lead">{current ? current.intro : "Pick a service to see the styles we offer."}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="tabs">
            <Link className={!current ? "tab on" : "tab"} to="/services">All</Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} className={current?.slug === c.slug ? "tab on" : "tab"} to={`/services/${c.slug}`}>{c.name}</Link>
            ))}
          </div>
          {shown.map((c) => (
            <div key={c.slug} className="svc-block">
              <img src={c.image} alt="" loading="lazy" className="svc-img" />
              <div>
                <h2>{c.name}</h2>
                <ul className="svc-list">
                  {c.items.map((i) => (
                    <li key={i.name}><strong>{i.name}</strong><span>{i.note}</span></li>
                  ))}
                </ul>
                <div className="row">
                  <Link className="btn" to={`/contact?service=${encodeURIComponent(c.name)}`}>Book {c.name.toLowerCase()}</Link>
                  {!current && <Link className="btn btn-ghost" to={`/services/${c.slug}`}>See photos and videos</Link>}
                </div>
              </div>
            </div>
          ))}
          {current && <ServiceMedia category={current} />}
        </div>
      </section>
    </>
  );
}
