// Paste into Extensions > Apps Script of a Google Sheet. Set the two values below.
const ROOT_FOLDER_ID = "PASTE_DRIVE_FOLDER_ID"; // folder containing Makeup, Mehndi, Skin care, Nail art, Hair care
const ADMIN_KEY = "choose-a-passcode";            // passcode for the /admin page
const HEAD = ["Received", "Name", "Phone", "Service", "Date", "Message", "Status"];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName("Bookings");
  if (!s) { s = ss.insertSheet("Bookings"); s.appendRow(HEAD); s.setFrozenRows(1); }
  return s;
}
const out_ = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
const fmt_ = (d, p) => (d instanceof Date ? Utilities.formatDate(d, Session.getScriptTimeZone(), p) : d);

function doGet(e) {
  const p = e.parameter, a = p.action;
  if (a === "media") return out_({ media: media_() });
  if (a === "book") {                       // public: customers create a booking
    if (!p.name || !p.phone || !p.service) return out_({ error: "Missing details" });
    const clean = (v) => String(v || "").slice(0, 500).replace(/^[=+\-@]/, "'$&"); // block sheet formulas
    sheet_().appendRow([new Date(), clean(p.name), clean(p.phone), clean(p.service), clean(p.date), clean(p.message), "Pending"]);
    return out_({ ok: true });
  }
  if (p.key !== ADMIN_KEY) return out_({ error: "Wrong passcode" });   // everything below is admin only
  if (a === "bookings") {
    const rows = sheet_().getDataRange().getValues().slice(1).map((r, i) => ({
      row: i + 2, received: fmt_(r[0], "dd MMM yyyy HH:mm"), name: r[1], phone: r[2], service: r[3],
      date: fmt_(r[4], "yyyy-MM-dd"), message: r[5], status: r[6] }));
    return out_({ bookings: rows });
  }
  if (a === "status") { sheet_().getRange(Number(p.row), 7).setValue(p.status); return out_({ ok: true }); }
  if (a === "delete") { sheet_().deleteRow(Number(p.row)); return out_({ ok: true }); }
  return out_({ error: "Unknown action" });
}

function media_() {
  const cache = CacheService.getScriptCache();
  const hit = cache.get("media");
  if (hit) return JSON.parse(hit);
  const list = [];
  const folders = DriveApp.getFolderById(ROOT_FOLDER_ID).getFolders();
  while (folders.hasNext()) {
    const f = folders.next(), files = f.getFiles();
    while (files.hasNext()) {
      const x = files.next(), m = x.getMimeType();
      if (m.startsWith("image/") || m.startsWith("video/"))
        list.push({ id: x.getId(), name: x.getName(), kind: m.startsWith("video/") ? "video" : "photo", folder: f.getName(), created: x.getDateCreated().getTime() });
    }
  }
  list.sort((a, b) => b.created - a.created);
  cache.put("media", JSON.stringify(list), 300); // refresh every 5 minutes
  return list;
}
