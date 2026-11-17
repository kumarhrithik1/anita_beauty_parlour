import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../data/services";
import { SITE } from "../config/site";
import { api, apiReady } from "../lib/api";

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ name: "", phone: "", service: params.get("service") || "", date: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const [saved, setSaved] = useState(false);

  // Opens WhatsApp with the details pre-filled and records the booking in the studio's Google Sheet.
  const submit = (e) => {
    e.preventDefault();
    const text = `Hi ${SITE.name}, I'd like to book.\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nDate: ${form.date || "flexible"}\n${form.message}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    if (apiReady) api.book({ name: form.name, phone: form.phone, service: form.service, date: form.date, message: form.message }).then((d) => setSaved(!d.error)).catch(() => {});
  };

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Book an appointment</h1>
          <p className="lead">Send your details and we reply on WhatsApp to confirm your slot.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap contact-grid">
          <form onSubmit={submit}>
            <label>Name<input required value={form.name} onChange={set("name")} autoComplete="name" /></label>
            <label>Phone<input required type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" /></label>
            <label>Service
              <select required value={form.service} onChange={set("service")}>
                <option value="">Choose a service</option>
                {CATEGORIES.map((c) => <option key={c.slug}>{c.name}</option>)}
              </select>
            </label>
            <label>Preferred date<input type="date" value={form.date} onChange={set("date")} /></label>
            <label className="full">Message<textarea rows="4" value={form.message} onChange={set("message")} placeholder="Event, style ideas, number of people" /></label>
            <button className="btn full">Send on WhatsApp</button>
            {saved && <p className="full">Request saved. We will call you to confirm.</p>}
          </form>
          <aside>
            <h3>Studio</h3>
            <p>{SITE.address}</p>
            <p>{SITE.hours}</p>
            <p><a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></p>
            <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </aside>
        </div>
      </section>
    </>
  );
}
