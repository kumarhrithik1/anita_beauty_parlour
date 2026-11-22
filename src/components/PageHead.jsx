export default function PageHead({ eyebrow, title, text }) {
  return (
    <section className="pagehead">
      <div className="wrap">
        {eyebrow && <span className="eyebrow dark">{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
      </div>
    </section>
  );
}
