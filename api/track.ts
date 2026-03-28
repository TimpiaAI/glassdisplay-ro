import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { page } = req.body ?? {};
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    "unknown";
  const ua = req.headers["user-agent"] || "unknown";
  const referer = req.headers["referer"] || "direct";
  const now = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });

  try {
    await resend.emails.send({
      from: "GlassPanel <hello@timpia.ai>",
      to: "ovidiu@timpia.ai",
      subject: `[Vizită] ${page || "/"} — ${ip}`,
      html: `
        <div style="font-family:sans-serif;padding:20px;">
          <h2 style="margin:0 0 16px;">Vizită nouă pe ${page || "/"}</h2>
          <table style="border-collapse:collapse;">
            <tr><td style="padding:6px 12px;font-weight:bold;color:#666;">IP</td><td style="padding:6px 12px;">${ip}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;color:#666;">Pagină</td><td style="padding:6px 12px;">${page || "/"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;color:#666;">Data</td><td style="padding:6px 12px;">${now}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;color:#666;">Referer</td><td style="padding:6px 12px;">${referer}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;color:#666;">User Agent</td><td style="padding:6px 12px;font-size:12px;">${ua}</td></tr>
          </table>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Track error:", err);
    return res.status(500).json({ error: "Failed" });
  }
}
