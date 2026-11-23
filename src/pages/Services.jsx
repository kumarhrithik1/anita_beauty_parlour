import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, bookUrl, categoryMinPrice, typeMinPrice, fromPrice, priceOf } from "../data/services";
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
          text={`Explore Anita Studio's ${CATEGORIES.length} core services. Each service page lists its styles with prices and shows our latest photos and videos.`} />
        <section className="section top">
          <div className="wrap serviceCategoryGrid">
            {CATEGORIES.map((x) => (
              <Link key={x.slug} className="serviceCategoryCard" to={`/services/${x.slug}`}>
                <div className="serviceCategoryImage">
                  <img src={x.image} alt="" loading="lazy" />
                  <span aria-hidden="true">{x.icon}</span>
                </div>
                <div className="serviceCategoryBody">
                  <span className="eyebrow dark">{String(x.types.length).padStart(2, "0")} STYLES · {fromPrice(categoryMinPrice(x)).toUpperCase()}</span>
                  <h2>{x.name}</h2>
                  <p>{x.intro}</p>
                  <b>Explore {x.name} <ArrowRight size={14} /></b>
                </div>
              </Link>
            ))}
          </div>
          <p className="center"><Link className="btn btn-ghost" to="/pricing">See the full price list</Link></p>
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
              <p>Explore the {c.name.toLowerCase()} styles available at Anita Studio, compare prices, then book the one that suits you.</p>
            </div>
          </div>
          <div className="variationHeader">
            <div>
              <span className="eyebrow dark">STYLES & PRICING</span>
              <h2>Choose a <em>style.</em></h2>
            </div>
            <span className="pill">{c.types.length} styles</span>
          </div>
          <div className="variationGrid">
            {c.types.map((t, idx) => (
              <article key={t.id} className="variationCard">
                <div className="variationImage">
                  <img src={t.image} alt="" loading="lazy" />
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="variationBody">
                  <small>{c.name} · {fromPrice(typeMinPrice(t))}</small>
                  <h3>{t.name}</h3>
                  {t.note && <p>{t.note}</p>}
                  <ul className="optionList">
                    {t.options.map((o) => (
                      <li key={o.id}>
                        <Link to={bookUrl(c, t, o)} aria-label={`Book ${o.name}`}>
                          <span className="optName">{o.name}{o.duration && <small>{o.duration}</small>}</span>
                          <span className="price">{priceOf(o)}{o.unit && <small> / {o.unit}</small>}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="cardLink" to={bookUrl(c, t)}>Book this style <ArrowRight size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
          <p className="center">
            <Link className="gold" to={bookUrl(c)}>Book {c.name.toLowerCase()} <ArrowRight size={18} /></Link>
          </p>
          <ServiceMedia category={c} />
        </div>
      </section>
    </>
  );
}