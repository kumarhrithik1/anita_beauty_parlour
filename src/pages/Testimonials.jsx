import { TESTIMONIALS } from "../data/services";
import PageHead from "../components/PageHead";

export default function Testimonials() {
  return (
    <>
      <PageHead eyebrow="CLIENT LOVE" title={<>Beautiful words from <em>beautiful people.</em></>}
        text="A place where every detail is designed around your comfort and confidence." />
      <section className="section top">
        <div className="wrap testimonialGrid">
          {TESTIMONIALS.map((t) => (
            <article className="testimonial" key={t.who}>
              <div className="stars" aria-label="5 stars">★★★★★</div>
              <p>“{t.quote}”</p>
              <b>{t.who}</b>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
