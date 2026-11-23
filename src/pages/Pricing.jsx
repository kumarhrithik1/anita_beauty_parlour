import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, bookUrl, fromPrice, typeMinPrice, priceOf, PRICE_DISCLAIMER } from "../data/services";
import PageHead from "../components/PageHead";

export default function Pricing() {
  return (
    <>
      <PageHead eyebrow="PRICE LIST" title={<>Clear pricing, <em>no surprises.</em></>} text={PRICE_DISCLAIMER} />
      <section className="section top">
        <div className="wrap">
          <div className="filter" aria-label="Jump to category">
            {CATEGORIES.map((c) => <a key={c.slug} href={`#${c.slug}`}>{c.icon} {c.name}</a>)}
          </div>

          {CATEGORIES.map((c) => (
            <div className="priceGroup" id={c.slug} key={c.slug}>
              <div className="priceGroupHead">
                <h2><span aria-hidden="true">{c.icon}</span> {c.name}</h2>
                <Link className="btn btn-ghost btn-sm" to={bookUrl(c)}>Book {c.name.toLowerCase()} <ArrowRight size={14} /></Link>
              </div>
              <div className="priceCards">
                {c.types.map((t) => (
                  <article className="priceCard" key={t.id}>
                    <small className="priceFrom">{fromPrice(typeMinPrice(t))}</small>
                    <h3>{t.name}</h3>
                    {t.note && <p>{t.note}</p>}
                    <ul className="optionList">
                      {t.options.map((o) => (
                        <li key={o.id}>
                          <Link to={bookUrl(c, t, o)}>
                            <span className="optName">{o.name}{o.duration && <small>{o.duration}</small>}</span>
                            <span className="price">{priceOf(o)}{o.unit && <small> / {o.unit}</small>}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}