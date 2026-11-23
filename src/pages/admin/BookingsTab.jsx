import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";

const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];

export default function BookingsTab({ pass, onBadKey }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api.bookings(pass);
      if (d.error) return onBadKey();
      setRows([...d.bookings].reverse()); setError("");
    } catch { setError("Could not load bookings."); }
    setLoading(false);
  }, [pass, onBadKey]);
  useEffect(() => { load(); }, [load]);

  const setStatus = async (r, status) => { await api.setStatus(pass, r.row, status); load(); };
  const remove = async (r) => {
    if (confirm(`Delete ${r.name}'s booking permanently? To keep it as history, mark it Cancelled instead.`)) { await api.remove(pass, r.row); load(); }
  };

  const shown = useMemo(() => rows.filter((r) =>
    (filter === "all" || r.status === filter) && `${r.name} ${r.phone}`.toLowerCase().includes(q.toLowerCase())), [rows, filter, q]);
  const count = (s) => rows.filter((r) => r.status === s).length;

  return (
    <div>
      <div className="admin-bar">
        <div className="tabs">
          {["all", ...STATUSES].map((s) => (
            <button key={s} className={filter === s ? "tab on" : "tab"} onClick={() => setFilter(s)}>{s === "all" ? "All" : s} ({s === "all" ? rows.length : count(s)})</button>
          ))}
        </div>
        <div className="row admin-tools">
          <input className="search" placeholder="Search name or phone" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search bookings" />
          <button className="btn btn-ghost btn-sm" onClick={load}>Refresh</button>
        </div>
      </div>
      {error && <p className="err">{error}</p>}
      {loading ? <p className="muted">Loading…</p> : shown.length === 0 ? (
        <div className="empty"><h3>No appointments</h3><p>New bookings from the website appear here, newest first.</p></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Received</th><th>Client</th><th>Service</th><th>Preferred date</th><th>Message</th><th>Status</th><th /></tr></thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.row} className={r.status === "Cancelled" ? "dim" : ""}>
                  <td data-label="Received">{r.received}</td>
                  <td data-label="Client"><span><strong>{r.name}</strong><br /><a href={`tel:${r.phone}`}>{r.phone}</a></span></td>
                  <td data-label="Service">{r.service}</td>
                  <td data-label="Preferred date">{r.date || "Flexible"}</td>
                  <td data-label="Message" className="msg">{r.message || "–"}</td>
                  <td data-label="Status">
                    <select className={`st st-${String(r.status).toLowerCase()}`} value={r.status} onChange={(e) => setStatus(r, e.target.value)} aria-label="Status">
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td data-label=""><button className="link-danger" onClick={() => remove(r)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}