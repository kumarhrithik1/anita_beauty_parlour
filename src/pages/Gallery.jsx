import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { CATEGORIES } from "../data/services";
import { api, apiReady } from "../lib/api";
import PageHead from "../components/PageHead";

const PAGE = 16;
const slugify = (s) => s.toLowerCase().trim().replace(/\s+/g, "-");
const thumb = (id, w) => `https://lh3.googleusercontent.com/d/${id}=w${w}`;

// Shows every photo and video from the Google Drive category folders (same data as the service pages).
export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [state, setState] = useState({ items: [], loading: apiReady, error: "" });
  const [open, setOpen] = useState(null);
  const [count, setCount] = useState(PAGE);

  useEffect(() => {
    if (!apiReady) return;
    let live = true;
    api.media()
      .then((d) => live && setState({ items: d.media || [], loading: false, error: d.error || "" }))
      .catch(() => live && setState({ items: [], loading: false, error: "Photos could not be loaded." }));
    return () => { live = false; };
  }, []);

  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const { items, loading, error } = state;
  const list = filter === "all" ? items : items.filter((m) => slugify(m.folder) === filter);

  return (
    <>
      <PageHead eyebrow="PORTFOLIO" title={<>A gallery of <em>real beauty.</em></>}
        text="Photos and videos of our recent work, added straight from the studio." />
      <section className="section top">
        <div className="wrap">
          <div className="filter">
            <button className={filter === "all" ? "active" : ""} onClick={() => { setFilter("all"); setCount(PAGE); }}>All</button>
            {CATEGORIES.map((c) => (
              <button key={c.slug} className={filter === c.slug ? "active" : ""} onClick={() => { setFilter(c.slug); setCount(PAGE); }}>{c.icon} {c.name}</button>
            ))}
          </div>

          {!apiReady && (
            <div className="gallerygrid">
              {CATEGORIES.map((c, i) => (
                <Link key={c.slug} className={i % 5 === 0 ? "g big" : "g"} to={`/services/${c.slug}`}>
                  <img src={c.image} alt="" loading="lazy" />
                  <div><small>Service</small><strong>{c.name}</strong></div>
                </Link>
              ))}
            </div>
          )}
          {apiReady && loading && <p className="muted">Loading photos and videos…</p>}
          {apiReady && error && <p className="muted">{error}</p>}
          {apiReady && !loading && !error && list.length === 0 && (
            <div className="empty"><h3>Nothing here yet</h3><p>Photos and videos added to the Drive folder will appear here.</p></div>
          )}
          {apiReady && list.length > 0 && (
            <div className="gallerygrid">
              {list.slice(0, count).map((m, i) => (
                <button key={m.id} className={i % 5 === 0 ? "g big" : "g"} onClick={() => setOpen(m)} aria-label={`Open ${m.kind}: ${m.name}`}>
                  <img src={thumb(m.id, 600)} alt="" loading="lazy" referrerPolicy="no-referrer" />
                  {m.kind === "video" && <span className="vplay" aria-hidden="true"><Play size={18} fill="white" /></span>}
                  <div><small>{m.folder}</small></div>
                </button>
              ))}
            </div>
          )}
          {list.length > count && (
            <p className="center"><button className="btn btn-ghost" onClick={() => setCount(count + PAGE)}>Show more</button></p>
          )}
        </div>
      </section>

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
    </>
  );
}
