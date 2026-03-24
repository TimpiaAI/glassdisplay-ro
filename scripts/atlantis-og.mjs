import { readFileSync, writeFileSync, mkdirSync } from "fs";

const html = readFileSync("dist/index.html", "utf-8");

const atlantis = html
  .replace(/<title>.*?<\/title>/, "<title>Atlantis 10 — Simulare vitrina digitala | Glass Display</title>")
  .replace(/<meta name="title"[^>]*>/, '<meta name="title" content="Atlantis 10 — Simulare vitrina digitala | Glass Display" />')
  .replace(/<meta name="description"[^>]*>/, '<meta name="description" content="Simulare pentru magazinul Atlantis 10. Cum ar arata vitrina cu ecran LED transparent lipit direct pe geam." />')
  .replace(/<link rel="canonical"[^>]*>/, '<link rel="canonical" href="https://glasspanel.ro/demo/atlantis" />')
  .replace(/<meta property="og:url"[^>]*>/, '<meta property="og:url" content="https://glasspanel.ro/demo/atlantis" />')
  .replace(/<meta property="og:title"[^>]*>/, '<meta property="og:title" content="Atlantis 10 — Simulare vitrina digitala | Glass Display" />')
  .replace(/<meta property="og:description"[^>]*>/, '<meta property="og:description" content="Simulare pentru magazinul Atlantis 10. Cum ar arata vitrina cu ecran LED transparent lipit direct pe geam." />')
  .replace(/<meta property="og:image"[^>]*>/, '<meta property="og:image" content="https://glasspanel.ro/demo/atlantis/og.jpg" />')
  .replace(/<meta property="og:image:type"[^>]*>/, '<meta property="og:image:type" content="image/jpeg" />')
  .replace(/<meta name="twitter:url"[^>]*>/, '<meta name="twitter:url" content="https://glasspanel.ro/demo/atlantis" />')
  .replace(/<meta name="twitter:title"[^>]*>/, '<meta name="twitter:title" content="Atlantis 10 — Simulare vitrina digitala | Glass Display" />')
  .replace(/<meta name="twitter:description"[^>]*>/, '<meta name="twitter:description" content="Simulare pentru magazinul Atlantis 10. Cum ar arata vitrina cu ecran LED transparent lipit direct pe geam." />')
  .replace(/<meta name="twitter:image"[^>]*>/, '<meta name="twitter:image" content="https://glasspanel.ro/demo/atlantis/og.jpg" />');

mkdirSync("dist/demo/atlantis", { recursive: true });
writeFileSync("dist/demo/atlantis/index.html", atlantis);
console.log("✓ Created dist/demo/atlantis/index.html with custom OG tags");
