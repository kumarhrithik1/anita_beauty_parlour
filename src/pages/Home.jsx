import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { CATEGORIES, HERO_SLIDES, TESTIMONIALS, ABOUT_IMAGE, categoryMinPrice, typeMinPrice, fromPrice } from "../data/services";
import VideoSection from "../components/VideoSection";

function Hero() {
  const [slide, setSlide] = useState(0);
  const n = HERO_SLIDES.length;
  const s = HERO_SLIDES[slide];
  return (
    <section className="hero" aria-roledescription="carousel">
      <div className="heroImage" style={{ backgroundImage: `url(${s.image})` }} />
      <div className="heroOverlay" />
      <div className="wrap heroContent">
        <div className="heroCopy">
          <span className="heroKicker">ANITA STUDIO • BEAUTY & WELLNESS</span>
          <h1>{s.title}<br /><em>{s.accent}</em></h1>
          <div className="goldDivider"><span>◇</span></div>
          <p>{s.text}</p>
          <div className="actions">
            <Link className="gold" to="/services">Our Services <ArrowRight size={18} /></Link>
            <Link className="outline" to="/contact">Book Now <CalendarDays size={18} /></Link>
          </div>
        </div>
      </div>
      <button className="heroArrow left" aria-label="Previous slide" onClick={() => setSlide((slide + n - 1) % n)}>‹</button>
      <button className="heroArrow right" aria-label="Next slide" onClick={() => setSlide((slide + 1) % n)}>›</button>
      <div className="heroDots">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} aria-label={`Slide ${i + 1}`} className={i === slide ? "active" : ""} onClick={() => setSlide(i)} />
        ))}
      </div>
    </section>
  );
}

const FEATURES = [
  ["✿", "Premium Products", "Branded & Skin Friendly"],
  ["♧", "Experienced Artists", "Skilled & Certified Experts"],
  ["✣", "Hygienic & Safe", "Clean Tools, Safe Hands"],
  ["❀", "Customer Satisfaction", "Your Happiness, Our Pride"],
];

export default function Home() {
  // Which categories are "featured" is controlled by "featured": true in each catalog JSON.
  const featured = CATEGORIES.filter((c) => c.featured).slice(0, 2);
  const more = CATEGORIES.filter((c) => !featured.includes(c));
  return (
    <>
      <Hero />

      <section className="section homeServices">
        <div className="wrap">
          <div className="sectionTitle">
            <span className="eyebrow dark">OUR SERVICES</span>
            <h2>Beauty & Mehndi for <em>Every Beautiful You</em></h2>
            <div className="ornament">◇</div>
          </div>
          <div className="featuredServiceRows">
            {featured.map((c) => (
              <div className="serviceShowcase" key={c.slug}>
                <div className="serviceHeading"><span aria-hidden="true">{c.icon}</span><h3>{c.name} Services</h3></div>
                <div className="miniGrid">
                  {c.types.slice(0, 4).map((t) => (
                    <Link to={`/services/${c.slug}`} className="miniCard" key={t.id}>
                      <img src={t.image} alt="" loading="lazy" />
                      <span className="miniName">{t.name}</span>
                      <span className="miniPrice">{fromPrice(typeMinPrice(t))}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {more.length > 0 && (
            <div className="moreServices">
              <div className="moreServiceTitle">
                <span>MORE BEAUTY SERVICES</span>
                <p>{more.map((c) => c.name).join(" • ")}</p>
              </div>
              {more.map((c) => (
                <Link key={c.slug} to={`/services/${c.slug}`} className="moreServiceCard">
                  <img src={c.image} alt="" loading="lazy" />
                  <div>
                    <small>{c.icon} {c.types.length} styles · {fromPrice(categoryMinPrice(c))}</small>
                    <h3>{c.name}</h3>
                    <p>{c.intro}</p>
                    <b>Explore <ArrowRight size={14} /></b>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <Link className="viewAll" to="/services">View All Services <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="featureStrip">
        <div className="wrap featureGrid">
          {FEATURES.map((x) => (
            <div className="featureItem" key={x[1]}>
              <span aria-hidden="true">{x[0]}</span>
              <div><b>{x[1]}</b><small>{x[2]}</small></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section homeAbout">
        <div className="wrap split">
          <div>
            <span className="eyebrow dark">ANITA STUDIO</span>
            <h2>Beauty that feels <em>like you.</em></h2>
            <p className="muted">From bridal transformations to everyday grooming, Anita Studio combines skilled artistry, premium products and a warm, personal experience.</p>
            <div className="row">
              <Link className="gold darkGold" to="/about">Discover Anita Studio <ArrowRight size={18} /></Link>
              <Link className="btn btn-ghost darkGold" to="/pricing">View pricing</Link>
            </div>
          </div>
          <img src={ABOUT_IMAGE} alt="" loading="lazy" />
        </div>
      </section>

      <section className="section cream">
        <div className="wrap">
          <div className="head-row">
            <div>
              <span className="eyebrow dark">FROM OUR YOUTUBE CHANNEL</span>
              <h2>Watch our <em>latest work.</em></h2>
              <p className="muted">Our 10 newest videos, updated automatically.</p>
            </div>
            <Link className="btn btn-ghost" to="/videos">All videos</Link>
          </div>
          <VideoSection limit={10} showTabs={false} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sectionTitle">
            <span className="eyebrow dark">CLIENT LOVE</span>
            <h2>What clients <em>say</em></h2>
            <div className="ornament">◇</div>
          </div>
          <div className="testimonialGrid">
            {TESTIMONIALS.map((t) => (
              <article className="testimonial" key={t.who}>
                <div className="stars" aria-label="5 stars">★★★★★</div>
                <p>“{t.quote}”</p>
                <b>{t.who}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Wedding in the next few months?</h2>
          <p>Book bridal slots early. We confirm availability within a day.</p>
          <Link className="gold" to="/contact">Check availability <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}