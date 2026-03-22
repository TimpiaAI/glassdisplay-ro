import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, address, message } = req.body;

  if (!name || !phone || !address) {
    return res.status(400).json({ error: "Nume, telefon și adresa sunt obligatorii." });
  }

  try {
    // 1. Create ClickUp task (lead)
    const clickupRes = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: CLICKUP_API_KEY!,
      },
      body: JSON.stringify({
        name: `Lead: ${name}`,
        description: [
          `**Nume:** ${name}`,
          `**Telefon:** ${phone}`,
          `**Adresa magazin:** ${address}`,
          message ? `**Mesaj:** ${message}` : "",
          `---`,
          `Trimis de pe glasspanel.ro la ${new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" })}`,
        ]
          .filter(Boolean)
          .join("\n"),
        priority: 2, // high
        tags: ["glasspanel-lead"],
      }),
    });

    if (!clickupRes.ok) {
      console.error("ClickUp error:", await clickupRes.text());
    }

    // 2. Send confirmation email via Resend
    // Only send if phone looks like it could contain an email, or we send to ourselves
    await resend.emails.send({
      from: "GlassPanel <hello@timpia.ai>",
      to: ["hello@timpia.ai"],
      subject: `Cerere nouă de la ${name} — GlassPanel.ro`,
      html: getNotificationEmail(name, phone, address, message),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "A apărut o eroare. Încearcă din nou." });
  }
}

function getNotificationEmail(name: string, phone: string, address: string, message?: string) {
  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#FAFAFA;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAFA;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border:2px solid #111111;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#111111;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#FFFFFF;font-size:24px;font-weight:300;letter-spacing:1px;">
                Glass<strong>Panel</strong><span style="color:#00FF88;font-size:14px;vertical-align:super;">®</span>
              </h1>
            </td>
          </tr>

          <!-- Green accent bar -->
          <tr>
            <td style="background-color:#00FF88;height:4px;"></td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 8px;color:#111111;font-size:22px;font-weight:700;">
                Cerere nouă de ofertă
              </h2>
              <p style="margin:0 0 32px;color:#666666;font-size:14px;">
                ${new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" })}
              </p>

              <!-- Lead details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;border:2px solid #111111;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #E0E0E0;">
                          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Nume</span><br>
                          <strong style="color:#111;font-size:16px;">${escapeHtml(name)}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #E0E0E0;">
                          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Telefon</span><br>
                          <a href="tel:${escapeHtml(phone)}" style="color:#111;font-size:16px;font-weight:700;text-decoration:none;">${escapeHtml(phone)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;${message ? "border-bottom:1px solid #E0E0E0;" : ""}">
                          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Adresa magazin</span><br>
                          <strong style="color:#111;font-size:16px;">${escapeHtml(address)}</strong>
                        </td>
                      </tr>
                      ${message ? `
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Mesaj</span><br>
                          <span style="color:#111;font-size:14px;">${escapeHtml(message)}</span>
                        </td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="https://app.clickup.com/90152205085/v/l/li/901522319514"
                       style="display:inline-block;background-color:#00FF88;color:#111111;padding:14px 32px;border-radius:8px;font-weight:700;text-decoration:none;font-size:14px;border:2px solid #111111;">
                      Vezi în ClickUp →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F5F5F5;padding:24px 40px;text-align:center;border-top:1px solid #E0E0E0;">
              <p style="margin:0;color:#999;font-size:12px;">
                glasspanel.ro — un proiect Timpia
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
