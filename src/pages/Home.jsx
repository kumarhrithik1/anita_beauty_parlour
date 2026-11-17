import { Link } from "react-router-dom";
import { CATEGORIES, HERO_IMAGES, TESTIMONIALS } from "../data/services";
import VideoSection from "../components/VideoSection";
import { SITE } from "../config/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>Your wedding day look, planned with you.</h1>
            <p className="lead">{SITE.name} does bridal makeup, mehndi, skin care, nails and hair in one studio, so every part of your look matches.</p>
            <div className="row">
              <Link className="btn" to="/contact">Book appointment</Link>
              <Link className="btn btn-ghost" to="/services">See services</Link>
            </div>
          </div>
          <div className="arches" aria-hidden="true">
            {HERO_IMAGES.map((src, i) => <img key={i} src={src} alt="" className={`arch a${i}`} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>What we do</h2>
          <div className="cat-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to={`/services/${c.slug}`} className="cat">
                <img src={c.image} alt="" loading="lazy" />
                <h3>{c.name}</h3>
                <p>{c.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <div className="head-row">
            <div>
              <h2>From our YouTube channel</h2>
              <p className="muted">Our 10 newest videos, updated automatically.</p>
            </div>
            <Link className="btn btn-ghost" to="/videos">All videos</Link>
          </div>
          <VideoSection limit={10} showTabs={false} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>What clients say</h2>
          <div className="quotes">
            {TESTIMONIALS.map((t) => (
              <figure key={t.who}><blockquote>“{t.quote}”</blockquote><figcaption>{t.who}</figcaption></figure>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Wedding in the next few months?</h2>
          <p>Book bridal slots early. We confirm availability within a day.</p>
          <Link className="btn btn-light" to="/contact">Check availability</Link>
        </div>
      </section>
    </>
  );
}
