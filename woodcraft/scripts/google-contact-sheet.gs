/**
 * Bind this script to your Google Sheet:
 * 1. Create a sheet named "Contact" with headers:
 *    Timestamp | Name | Email | Phone | Subject | Message
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Type: Web app
 *    Execute as: Me
 *    Who has access: Anyone
 * 4. Copy the web app URL into woodcraft/.env.local as:
 *    VITE_GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec
 * 5. Restart `npm run dev`. Add the same env var on Vercel for production.
 */

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "Arileon contact" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Contact");
    if (!sheet) {
      sheet = ss.insertSheet("Contact");
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Subject", "Message"]);
    }
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.subject || "",
      data.message || "",
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
