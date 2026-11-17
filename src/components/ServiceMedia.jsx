import { useEffect, useState } from "react";
import { api, apiReady } from "../lib/api";

let cache; // one request shared by all pages
const PAGE = 12;
const slugify = (s) => s.toLowerCase().trim().replace(/\s+/g, "-");
const thumb = (id, w) => `https://lh3.googleusercontent.com/d/${id}=w${w}`;

function Thumb({ id, w }) {
  const [tries, setTries] = useState(0);
  const [failed, setFailed] = useState(false);
  const onError = () => {
    if (tries >= 3) return setFailed(true);
    setTimeout(() => setTries((t) => t + 1), 1500 * (tries + 1)); // wait, then retry
  };
  if (failed) return <span className="muted" style={{ padding: 8, fontSize: ".8rem" }}>Preview unavailable</span>;
  return (
    <img
      key={tries}
      src={tries ? `${thumb(id, w)}?r=${tries}` : thumb(id, w)}
      alt=""
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={onError}
    />
  );
}

export default function ServiceMedia({ category }) {
  const [state, setState] = useState({ items: [], loading: apiReady, error: "" });
  const [open, setOpen] = useState(null);
  const [count, setCount] = useState(PAGE);

  useEffect(() => {
    if (!apiReady) return;
    setCount(PAGE);
    setState((s) => ({ ...s, loading: true }));
    cache ??= api.media();
    cache
      .then((d) => setState({ items: (d.media || []).filter((m) => slugify(m.folder) === category.slug), loading: false, error: d.error || "" }))
      .catch(() => { cache = null; setState({ items: [], loading: false, error: "Photos could not be loaded." }); });
  }, [category.slug]);

  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  if (!apiReady) return null;
  const { items, loading, error } = state;

  return (
    <div className="work">
      <h2>{category.name} work</h2>
      {loading && <p className="muted">Loading photos and videos…</p>}
      {error && <p className="muted">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">Photos and videos for this service are coming soon.</p>}
      <div className="mgrid">
        {items.slice(0, count).map((m) => (
          <button key={m.id} className="mtile" onClick={() => setOpen(m)} aria-label={`Open ${m.kind}: ${m.name}`}>
            <Thumb id={m.id} w={400} />
            {m.kind === "video" && <span className="vplay" aria-hidden="true">▶</span>}
          </button>
        ))}
      </div>
      {items.length > count && (
        <p className="center"><button className="btn btn-ghost" onClick={() => setCount(count + PAGE)}>Show more</button></p>
      )}
      {open && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          {open.kind === "video" ? (
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="modal-x" onClick={() => setOpen(null)} aria-label="Close">×</button>
              <iframe src={`https://drive.google.com/file/d/${open.id}/preview`} title={open.name} allow="autoplay" allowFullScreen />
            </div>
          ) : (
            <img className="lightbox" src={thumb(open.id, 1600)} referrerPolicy="no-referrer" alt="" onClick={(e) => e.stopPropagation()} />
          )}
        </div>
      )}
    </div>
  );
}