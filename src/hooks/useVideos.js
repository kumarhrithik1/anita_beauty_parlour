import { useEffect, useState } from "react";

export function useVideos(sort = "latest") {
  const [state, setState] = useState({ videos: [], loading: true, error: null });
  useEffect(() => {
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    fetch(`/api/videos?sort=${sort}`, { signal: ctrl.signal })
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok, d }) => setState({ videos: d.videos || [], loading: false, error: ok ? null : d.error || "Failed" }))
      .catch((e) => e.name !== "AbortError" && setState({ videos: [], loading: false, error: e.message }));
    return () => ctrl.abort();
  }, [sort]);
  return state;
}

export const formatViews = (n) =>
  n >= 1e6 ? `${(n / 1e6).toFixed(1)}M views` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K views` : `${n} views`;

export const timeAgo = (iso) => {
  const days = Math.floor((Date.now() - new Date(iso)) / 864e5);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};
