import type { VercelRequest, VercelResponse } from "@vercel/node";

const HTML = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <title>Area Gym Brașov — Ofertă personalizată | Glass Display</title>
  <meta name="description" content="Ofertă personalizată pentru Area Gym Brașov. Ecrane LED transparente pentru vitrinele alese." />
  <meta name="robots" content="noindex, nofollow" />
  <link rel="canonical" href="https://glasspanel.ro/demo/areagym/oferta" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://glasspanel.ro/demo/areagym/oferta" />
  <meta property="og:title" content="Area Gym Brașov — Ofertă personalizată | Glass Display" />
  <meta property="og:description" content="Ofertă personalizată pentru Area Gym Brașov. Ecrane LED transparente pentru vitrinele alese." />
  <meta property="og:image" content="https://glasspanel.ro/demo/areagym/oferta/og-oferta.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Area Gym Brașov — Ofertă personalizată | Glass Display" />
  <meta name="twitter:description" content="Ofertă personalizată pentru Area Gym Brașov. Ecrane LED transparente pentru vitrinele alese." />
  <meta name="twitter:image" content="https://glasspanel.ro/demo/areagym/oferta/og-oferta.png" />
  <meta http-equiv="refresh" content="0;url=https://glasspanel.ro/demo/areagym/oferta" />
</head>
<body>
  <p>Redirecting to <a href="https://glasspanel.ro/demo/areagym/oferta">Area Gym Ofertă</a>...</p>
</body>
</html>`;

const BOT_UA = /bot|crawl|spider|facebookexternalhit|WhatsApp|Slack|Telegram|Twitter|LinkedIn|Discord|Embed/i;

export default function handler(req: VercelRequest, res: VercelResponse) {
  const ua = req.headers["user-agent"] || "";

  if (BOT_UA.test(ua)) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(HTML);
  }

  // Regular users get redirected to SPA
  res.setHeader("Location", "/demo/areagym/oferta");
  return res.status(302).end();
}
