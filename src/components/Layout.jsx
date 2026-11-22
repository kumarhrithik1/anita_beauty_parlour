import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ChevronDown, Facebook, Instagram, Menu, X, Youtube } from "lucide-react";
import { SITE } from "../config/site";
import { CATEGORIES } from "../data/services";
import Logo from "./Logo";

const ICONS = { facebook: Facebook, instagram: Instagram, youtube: Youtube };
const navClass = ({ isActive }) => (isActive ? "active" : "");

function Social({ className }) {
  return (
    <div className={className}>
      {Object.entries(SITE.social).map(([k, v]) => {
        const Icon = ICONS[k];
        return Icon ? (
          <a key={k} href={v} target="_blank" rel="noreferrer" aria-label={k}><Icon /></a>
        ) : null;
      })}
    </div>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); setServicesOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <div className="topbar">
        <div className="wrap topbarInner">
          <span>✨ Enhancing Your Beauty, Celebrating You</span>
          <Social className="topSocial" />
        </div>
      </div>
      <header className="header">
        <div className="wrap nav">
          <Logo />
          <nav className={open ? "navlinks show" : "navlinks"} aria-label="Main">
            <NavLink className={navClass} end to="/">Home</NavLink>
            <NavLink className={navClass} to="/about">About</NavLink>
            <div className="serviceDrop">
              <button className="serviceMenuBtn" aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)}>
                Services <ChevronDown size={15} className={servicesOpen ? "rot" : ""} />
              </button>
              <div className={servicesOpen ? "serviceMenu open" : "serviceMenu"}>
                <NavLink className={navClass} end to="/services">All Services</NavLink>
                {CATEGORIES.map((c) => (
                  <NavLink className={navClass} key={c.slug} to={`/services/${c.slug}`}>{c.icon} {c.name}</NavLink>
                ))}
              </div>
            </div>
            <NavLink className={navClass} to="/gallery">Gallery</NavLink>
            <NavLink className={navClass} to="/videos">Videos</NavLink>
            <NavLink className={navClass} to="/testimonials">Testimonials</NavLink>
            <NavLink className={navClass} to="/contact" end>Contact</NavLink>
            <Link className="book" to="/contact">Book Appointment</Link>
          </nav>
          <button className="hamb" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main"><Outlet /></main>
      <footer className="footer">
        <div className="wrap foot">
          <div>
            <Logo />
            <p className="foot-tag">{SITE.tagline}.</p>
          </div>
          <div className="footlinks">
            {CATEGORIES.map((c) => <Link key={c.slug} to={`/services/${c.slug}`}>{c.name}</Link>)}
          </div>
          <div className="foot-contact">
            <p>{SITE.address}</p>
            <p>{SITE.hours}</p>
            <p><a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <Social className="socials" />
          </div>
        </div>
        <div className="copy"><div className="wrap">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div></div>
      </footer>
    </>
  );
}
