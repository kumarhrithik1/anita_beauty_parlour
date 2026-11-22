import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="premiumLogo" to="/" aria-label="Anita Studio home">
      <span className="logoFlourish" aria-hidden="true">A</span>
      <span className="logoWords">
        <b>ANITA</b>
        <small>STUDIO</small>
        <i>BEAUTY • MAKEUP • MEHNDI</i>
      </span>
    </Link>
  );
}
