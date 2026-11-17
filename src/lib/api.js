// Talks to the owner's Google Apps Script (see google-apps-script/Code.gs).
const BASE = import.meta.env.VITE_APPS_SCRIPT_URL;
export const apiReady = !!BASE;
export const DRIVE_URL = import.meta.env.VITE_DRIVE_FOLDER_URL;

const call = async (params) => (await fetch(`${BASE}?${new URLSearchParams(params)}`)).json();

export const api = {
  media: () => call({ action: "media" }),
  book: (b) => call({ action: "book", ...b }),
  bookings: (key) => call({ action: "bookings", key }),
  setStatus: (key, row, status) => call({ action: "status", key, row, status }),
  remove: (key, row) => call({ action: "delete", key, row }),
};
