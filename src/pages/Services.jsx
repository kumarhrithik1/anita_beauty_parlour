import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "../data/services";
import ServiceMedia from "../components/ServiceMedia";
import PageHead from "../components/PageHead";

export default function Services() {
  const { slug } = useParams();
  const c = slug ? CATEGORIES.find((x) => x.slug === slug) : null;
  if (slug && !c) return <Navigate to="/services" replace />;

  if (!c) {
    return (
      <>
        <PageHead eyebrow="OUR SERVICES" title={<>Beauty, <em>your way.</em></>}
          text="Explore Anita Studio's five core services. Each service page lists its styles and shows our latest photos and videos." />
        <section className="section top">
          <div className="wrap serviceCategoryGrid">
            {CATEGORIES.map((x) => (
              <Link key={x.slug} className="serviceCategoryCard" to={`/services/${x.slug}`}>
                <div className="serviceCategoryImage">
                  <img src={x.image} alt="" loading="lazy" />
                  <span aria-hidden="true">{x.icon}</span>
                </div>
                <div>
                  <span className="eyebrow dark">{String(x.items.length).padStart(2, "0")} VARIATIONS</span>
                  <h2>{x.name}</h2>
                  <p>{x.intro}</p>
                  <b>Explore {x.name} <ArrowRight size={14} /></b>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHead eyebrow={`ANITA STUDIO • ${c.name.toUpperCase()}`} title={<>{c.name} <em>services.</em></>} text={c.intro} />
      <section className="section top">
        <div className="wrap">
          <div className="categoryIntro">
            <div className="categoryIntroIcon" aria-hidden="true">{c.icon}</div>
            <div>
              <span className="eyebrow dark">CHOOSE YOUR STYLE</span>
              <h2>{c.name}, personalised for you.</h2>
              <p>Explore the {c.name.toLowerCase()} styles available at Anita Studio, then book the one that suits you.</p>
            </div>
          </div>
          <div className="variationHeader">
            <div>
              <span className="eyebrow dark">VARIATIONS</span>
              <h2>Choose a <em>style.</em></h2>
            </div>
            <span>{c.items.length} options</span>
          </div>
          <div className="variationGrid">
            {c.items.map((i, idx) => (
              <Link key={i.name} className="variationCard" to={`/contact?service=${encodeURIComponent(c.name)}`}>
                <div className="variationImage">
                  <img src={i.image} alt="" loading="lazy" />
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="variationBody">
                  <small>{c.name}</small>
                  <h3>{i.name}</h3>
                  <p>{i.note}</p>
                  <b>Book this style <ArrowRight size={13} /></b>
                </div>
              </Link>
            ))}
          </div>
          <p className="center">
            <Link className="gold" to={`/contact?service=${encodeURIComponent(c.name)}`}>Book {c.name.toLowerCase()} <ArrowRight size={18} /></Link>
          </p>
          <ServiceMedia category={c} />
        </div>
      </section>
    </>
  );
}
