import { CATEGORIES } from "../../data/services";
import { DRIVE_URL } from "../../lib/api";

export default function MediaTab() {
  return (
    <div className="help">
      <h2>Add photos and videos</h2>
      <ol>
        <li>Open your Google Drive folder (button below, or the Drive app on your phone).</li>
        <li>Open the folder for the service: {CATEGORIES.map((c) => c.name).join(", ")}.</li>
        <li>Upload or drag in your photos and videos.</li>
        <li>They appear on that service page within 5 minutes.</li>
      </ol>
      <p className="muted">To remove one, delete it from the same Drive folder. Folder names must match the service names exactly.</p>
      {DRIVE_URL
        ? <a className="btn" href={DRIVE_URL} target="_blank" rel="noreferrer">Open Drive folder</a>
        : <p className="err">Add VITE_DRIVE_FOLDER_URL to .env to show the Drive button here.</p>}
    </div>
  );
}
