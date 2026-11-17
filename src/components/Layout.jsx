import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { SITE } from "../config/site";

const LINKS = [
  ["/", "Home"], ["/services", "Services"], ["/videos", "Videos"], ["/about", "About"], ["/contact", "Contact"],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className="header">
        <div className="wrap bar">
          <Link to="/" className="logo" aria-label={`${SITE.name} home`}>
            <span className="logo-arch" aria-hidden="true" />
            Anita Studio
          </Link>
          <nav className={open ? "nav open" : "nav"} aria-label="Main">
            {LINKS.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>
            ))}
            <Link className="btn btn-sm" to="/contact">Book appointment</Link>
          </nav>
          <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      <main id="main"><Outlet /></main>
      <footer className="footer">
        <div className="wrap foot">
          <div>
            <p className="logo">Anita Studio</p>
            <p className="muted">{SITE.tagline}.</p>
          </div>
          <div>
            <p className="foot-h">Visit</p>
            <p>{SITE.address}</p>
            <p>{SITE.hours}</p>
          </div>
          <div>
            <p className="foot-h">Reach us</p>
            <p><a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></p>
            <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <p className="social">
              {Object.entries(SITE.social).map(([k, v]) => (
                <a key={k} href={v} target="_blank" rel="noreferrer">{k[0].toUpperCase() + k.slice(1)}</a>
              ))}
            </p>
          </div>
        </div>
        <p className="wrap copy">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
      </footer>
    </>
  );
}
