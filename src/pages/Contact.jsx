import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock, Mail, MapPin, Phone } from "lucide-react";
import { CATEGORIES } from "../data/services";
import { SITE } from "../config/site";
import { api, apiReady } from "../lib/api";
import PageHead from "../components/PageHead";

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
      <PageHead eyebrow="BOOK AN APPOINTMENT" title={<>Let's create your <em>signature look.</em></>}
        text="Send your details and we reply on WhatsApp to confirm your slot." />
      <section className="section top">
        <div className="wrap contact-grid">
          <div>
            <div className="info"><CalendarDays /><div><b>Advance booking</b><small>Recommended for bridal & special events.</small></div></div>
            <div className="info"><MapPin /><div><b>Studio location</b><small>{SITE.address}</small></div></div>
            <div className="info"><Clock /><div><b>Hours</b><small>{SITE.hours}</small></div></div>
            <div className="info"><Phone /><div><b>Phone</b><small><a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></small></div></div>
            <div className="info"><Mail /><div><b>Email</b><small><a href={`mailto:${SITE.email}`}>{SITE.email}</a></small></div></div>
          </div>
          <form onSubmit={submit}>
            <label>Name<input required value={form.name} onChange={set("name")} autoComplete="name" placeholder="Your name" /></label>
            <label>Phone<input required type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+91 XXXXX XXXXX" /></label>
            <label>Service
              <select required value={form.service} onChange={set("service")}>
                <option value="">Choose a service</option>
                {CATEGORIES.map((c) => <option key={c.slug}>{c.name}</option>)}
              </select>
            </label>
            <label>Preferred date<input type="date" value={form.date} onChange={set("date")} /></label>
            <label className="full">Message<textarea rows="5" value={form.message} onChange={set("message")} placeholder="Event, style ideas, number of people" /></label>
            <button className="gold full">Send on WhatsApp <ArrowRight size={18} /></button>
            {saved && <p className="full saved">Request saved. We will call you to confirm.</p>}
          </form>
        </div>
      </section>
    </>
  );
}
