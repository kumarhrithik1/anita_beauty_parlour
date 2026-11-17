import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, apiReady } from "../../lib/api";
import BookingsTab from "./BookingsTab";
import MediaTab from "./MediaTab";

function Gate({ onOk }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault(); setErr("");
    try {
      const d = await api.bookings(pw);
      d.bookings ? onOk(pw) : setErr(d.error || "Could not log in.");
    } catch { setErr("Could not reach Google. Check the script URL and that it is deployed for Anyone."); }
  };
  return (
    <form className="gate" onSubmit={submit}>
      <label>Admin passcode<input type="password" required value={pw} onChange={(e) => setPw(e.target.value)} /></label>
      {err && <p className="err">{err}</p>}
      <button className="btn">Open admin</button>
    </form>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState("bookings");
  const [key, setKey] = useState(sessionStorage.getItem("akey") || "");
  const login = (k) => { sessionStorage.setItem("akey", k); setKey(k); };
  const logout = () => { sessionStorage.removeItem("akey"); setKey(""); };

  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots"; m.content = "noindex";
    document.head.appendChild(m);
    return () => m.remove();
  }, []);

  return (
    <div className="wrap admin">
      <div className="admin-top">
        <h1>Studio admin</h1>
        <div className="row">
          {key && <button className="btn btn-ghost btn-sm" onClick={logout}>Log out</button>}
          <Link className="btn btn-ghost btn-sm" to="/">View website</Link>
        </div>
      </div>

      {!apiReady ? (
        <div className="empty"><h3>Connect Google first</h3><p>Add VITE_APPS_SCRIPT_URL to your .env file. Steps are in the README under “Google setup”.</p></div>
      ) : !key ? <Gate onOk={login} /> : (
        <>
          <div className="tabs">
            <button className={tab === "bookings" ? "tab on" : "tab"} onClick={() => setTab("bookings")}>Appointments</button>
            <button className={tab === "media" ? "tab on" : "tab"} onClick={() => setTab("media")}>Photos and videos</button>
          </div>
          {tab === "bookings" ? <BookingsTab pass={key} onBadKey={logout} /> : <MediaTab />}
        </>
      )}
    </div>
  );
}
