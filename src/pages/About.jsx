import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import PageHead from "../components/PageHead";
import { ABOUT_IMAGE } from "../data/services";

const POINTS = [
  ["One studio for the whole look", "Makeup, mehndi, nails and hair are planned together so colours and styles agree."],
  ["Trials before the big day", "Book a bridal trial and change anything you want before the event."],
  ["Clean tools every time", "Brushes and tools are sanitised between clients."],
];

export default function About() {
  return (
    <>
      <PageHead eyebrow="ABOUT ANITA STUDIO" title={<>Beauty built around <em>your style.</em></>}
        text="A neighbourhood parlour for everyday care and for the biggest days of your life." />
      <section className="section">
        <div className="wrap split about">
          <img src={ABOUT_IMAGE} alt="" loading="lazy" />
          <div>
            <h2>One studio.<br /><em>Many ways to feel beautiful.</em></h2>
            <div className="checks">
              {POINTS.map(([t, d]) => (
                <div key={t}>
                  <Check />
                  <span><strong>{t}</strong><small>{d}</small></span>
                </div>
              ))}
            </div>
            <Link className="gold" to="/contact">Book Appointment <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
