import { useEffect, useState } from "react";
import { useVideos, formatViews, timeAgo } from "../hooks/useVideos";
import { SITE } from "../config/site";

function Player({ video, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close video">×</button>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function VideoSection({ limit = 10, showTabs = true }) {
  const [sort, setSort] = useState("latest");
  const [playing, setPlaying] = useState(null);
  const { videos, loading, error } = useVideos(sort);
  const list = videos.slice(0, limit);

  return (
    <div>
      {showTabs && (
        <div className="tabs" role="tablist">
          {[["latest", "Latest"], ["popular", "Most watched"]].map(([k, l]) => (
            <button key={k} role="tab" aria-selected={sort === k} className={sort === k ? "tab on" : "tab"} onClick={() => setSort(k)}>{l}</button>
          ))}
        </div>
      )}

      {loading && (
        <div className="vgrid">{Array.from({ length: Math.min(limit, 8) }).map((_, i) => <div key={i} className="skel" />)}</div>
      )}

      {!loading && error && (
        <div className="empty">
          <h3>Videos could not be loaded</h3>
          <p>{error}</p>
          <a className="btn" href={SITE.social.youtube} target="_blank" rel="noreferrer">Watch on YouTube</a>
        </div>
      )}

      {!loading && !error && list.length === 0 && (
        <div className="empty"><h3>No videos yet</h3><p>New uploads will appear here automatically.</p></div>
      )}

      {!loading && !error && list.length > 0 && (
        <div className="vgrid">
          {list.map((v) => (
            <button key={v.id} className="vcard" onClick={() => setPlaying(v)} aria-label={`Play ${v.title}`}>
              <span className="vthumb">
                <img src={v.thumbnail} alt="" loading="lazy" />
                <span className="vplay" aria-hidden="true">▶</span>
              </span>
              <span className="vtitle">{v.title}</span>
              <span className="vmeta">{formatViews(v.views)} · {timeAgo(v.published)}</span>
            </button>
          ))}
        </div>
      )}
      {playing && <Player video={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}
