import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock, Mail, MapPin, Phone } from "lucide-react";
import { CATEGORIES, findCategory, findType, findOption, priceOf, typeMinPrice, fromPrice, PRICE_DISCLAIMER } from "../data/services";
import { SITE } from "../config/site";
import { api, apiReady } from "../lib/api";
import PageHead from "../components/PageHead";

export default function Contact() {
  const [params] = useSearchParams();
  const initCat = findCategory(params.get("service"));
  const initType = findType(initCat, params.get("type"));
  const initOpt = findOption(initType, params.get("option"));

  const [form, setForm] = useState({
    name: "", phone: "", date: "", message: "",
    category: initCat?.slug || "", type: initType?.id || "", option: initOpt?.id || "",
  });
  const [saved, setSaved] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const category = findCategory(form.category);
  const type = findType(category, form.type);
  const option = findOption(type, form.option);

  const onCategory = (e) => setForm({ ...form, category: e.target.value, type: "", option: "" });
  const onType = (e) => {
    const t = findType(category, e.target.value);
    setForm({ ...form, type: e.target.value, option: t?.options.length === 1 ? t.options[0].id : "" });
  };

  const estimate = useMemo(() => {
    if (option) return { label: "Estimated price", value: priceOf(option) + (option.unit ? ` / ${option.unit}` : "") };
    if (type) return { label: "Prices start", value: fromPrice(typeMinPrice(type)).replace(/^\S+\s/, "") };
    return null;
  }, [option, type]);

  const serviceLabel = [category?.name, type?.name, option?.name].filter(Boolean).join(" – ");
  const priceText = estimate && option ? ` (${estimate.value})` : "";

  // Opens WhatsApp with the details pre-filled and records the booking in the studio's Google Sheet.
  const submit = (e) => {
    e.preventDefault();
    const text = `Hi ${SITE.name}, I'd like to book.\nName: ${form.name}\nPhone: ${form.phone}\nService: ${serviceLabel}${priceText}\nDate: ${form.date || "flexible"}\n${form.message}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    if (apiReady) api.book({ name: form.name, phone: form.phone, service: serviceLabel + priceText, date: form.date, message: form.message }).then((d) => setSaved(!d.error)).catch(() => {});
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
          <form className="form" onSubmit={submit}>
            <label>Name<input required value={form.name} onChange={set("name")} autoComplete="name" placeholder="Your name" /></label>
            <label>Phone<input required type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+91 XXXXX XXXXX" /></label>

            <label>Service
              <select required value={form.category} onChange={onCategory}>
                <option value="">Choose a service</option>
                {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </label>
            <label>Style
              <select required disabled={!category} value={form.type} onChange={onType}>
                <option value="">{category ? "Choose a style" : "Select a service first"}</option>
                {category?.types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
            <label>Option
              <select required={!!type?.options.length} disabled={!type} value={form.option} onChange={set("option")}>
                <option value="">{type ? "Choose an option" : "Select a style first"}</option>
                {type?.options.map((o) => <option key={o.id} value={o.id}>{o.name} — {priceOf(o)}{o.unit ? ` / ${o.unit}` : ""}</option>)}
              </select>
            </label>
            <label>Preferred date<input type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={set("date")} /></label>

            {estimate && (
              <div className="estimate full" aria-live="polite">
                <span>{estimate.label}</span><strong>{estimate.value}</strong>
                <small>{PRICE_DISCLAIMER}</small>
              </div>
            )}

            <label className="full">Message<textarea rows="5" value={form.message} onChange={set("message")} placeholder="Event, style ideas, number of people" /></label>
            <button className="gold full">Send on WhatsApp <ArrowRight size={18} /></button>
            {saved && <p className="full saved">Request saved. We will call you to confirm.</p>}
          </form>
        </div>
      </section>
    </>
  );
}