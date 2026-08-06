# Projekt-Status — Liebe und Heilung

**Letzte Aktualisierung:** 06.08.2026
**Aktueller Commit auf `main`:** `464edba` — feat(funnel): MailerLite-Formular eingebettet
**Aktueller Branch für Änderungen:** `genspark_ai_developer`

> Diese Datei ist der Single Source of Truth über den Projekt-Stand.
> Nach jedem größeren Release wird sie aktualisiert.

---

## ✅ Erledigt

### August 2026 — Funnel LIVE (PR #13)
- ✅ **PR #13** — MailerLite-Formular direkt auf `index.html` eingebettet
  - MailerLite Universal Script (Account `2559380`) im `<head>`
  - Formular `data-form="CM6Vxh"` in `#gratis-heft`-Section
  - Custom CSS: Formular ans Website-Design angeglichen (Orange, Inter, weiche Karte)
  - **1-Klick-UX**: Frau trägt sich direkt auf liebeheilung.de ein
  - Success-Redirect (in MailerLite konfiguriert) → `https://liebeheilung.de/danke.html`
  - Double-Opt-In (DSGVO) aktiv
  - Blog-Artikel verlinken auf `#gratis-heft` (Sprung zur Section mit Formular)

### August 2026 — Doku + Danke-Seite (PRs #8–#12)
- ✅ **PR #8** — `_admin/CHAT-KONTEXT.md` + `PROJEKT-STATUS.md` (dauerhafte Doku im Repo)
- ✅ **PR #9** — bestehende Arbeits-Vereinbarungen in `CHAT-KONTEXT.md` festgeschrieben
- ✅ **PR #10** — `danke.html` als Weiterleitungsziel nach MailerLite-Anmeldung
  - live unter `https://liebeheilung.de/danke.html`
  - `noindex, nofollow` (nicht in Google)
- ✅ **PR #11** — `PROJEKT-STATUS.md` aktualisiert
- ✅ **PR #12** — `MAILERLITE-CHECKLISTE.md` Schritt 3 (DPA ist Teil der AGB)

### August 2026 — MailerLite-Setup durch Sabrina
- ✅ MailerLite-Account (`kontakt@liebeheilung.de`)
- ✅ Domain `liebeheilung.de` bei MailerLite authentifiziert (Entri/GoDaddy)
- ✅ DPA-PDF für die Unterlagen heruntergeladen
- ✅ Gruppe *"Gratis-Heft — Was du erlebt hast, zählt."* angelegt
- ✅ Eingebettetes Formular gestaltet (Name + E-Mail + DSGVO-Checkbox + Custom Success Page)
- ✅ Formular veröffentlicht — Embed-Code ins Repo integriert (PR #13)

### August 2026 (PR #7, Commit `7111a7c`)
- ✅ Business-Mail **kontakt@liebeheilung.de** LIVE (mailbox.org, Alias auf praxis-kising@mailbox.org)
- ✅ Domain vereinheitlicht: `liebe-heilung.de` → `liebeheilung.de` (82 Stellen im Code)
- ✅ Funnel-Grundgerüst: `#gratis-heft`-Section, sanfte CTAs in Blog-Artikeln
- ✅ **Datenschutz DSGVO-konform** inkl. MailerLite-Abschnitt 7b
- ✅ **`_admin/`-Ordner** angelegt mit `README.md`, `MAILERLITE-CHECKLISTE.md`, `EMAIL-VORLAGEN.md`
- ✅ PDF liegt bereit: `downloads/was-du-erlebt-hast-zaehlt.pdf` (6 Seiten)
- ✅ Meetergo-Buchung: `https://my.meetergo.com/form/cb039eee-9d0d-4f34-a61f-5a5e1c1f4fde`

### Juli–August 2026 (PRs #3–#6)
- ✅ Blog-Trio "Noch immer. · Noch wir. · Noch ich." veröffentlicht
- ✅ Startseite mit den drei Bewegungen (orange / emerald / pink)
- ✅ Hero-Bild responsive (Desktop / Tablet / Mobile)
- ✅ Menüleiste und Footer vereinheitlicht

---

## 🔄 In Arbeit / Offen

### Sabrina: MailerLite-Automation einrichten
**Wo:** MailerLite → Automation → neue Automation
**Vorlagen:** `_admin/EMAIL-VORLAGEN.md`
- [ ] **Willkommensmail** mit PDF-Link (Trigger: Bestätigt in Gruppe *Gratis-Heft*)
- [ ] **Double-Opt-In-Bestätigungsmail-Text** anpassen (Schritt 7 in Checkliste)

### Domain — Redirect propagieren lassen
- ⏳ **GoDaddy-Propagation** abwarten
- Nach Propagation testen: `https://liebeheilung.de` muss die Seite normal laden (keine Weiterleitung mehr auf `liebe-heilung.de`)
- Testbefehl: `curl -sI https://liebeheilung.de/`

### End-to-End-Test (nach Automation-Setup)
1. Sabrina trägt sich selbst auf `liebeheilung.de` ein
2. Weiterleitung zu `danke.html` erscheint
3. Bestätigungsmail kommt an, Bestätigungsklick funktioniert
4. Innerhalb weniger Minuten: Willkommensmail mit PDF-Link kommt an
5. PDF-Download funktioniert

---

## 🕰️ Deferred (später)

- **P4a — WHOIS-Kontakt** bei GoDaddy auf `kontakt@liebeheilung.de` umstellen
- **P4b — Datenschutz-Nummerierung** Feinschliff (nicht kritisch)
- **P4c — QR-Code neu generieren** (aktuell in `downloads/qr-code-liebe-heilung.png`, mit alter Domain — sollte auf `liebeheilung.de` zeigen)
- **Nurture-Sequenz** nach dem Willkommens-Mail (mehrere Mails über Wochen) — erst nach Funnel-Launch

---

## 📌 Wichtige Referenzen

| Was | Wo |
|---|---|
| Repo | https://github.com/scoach12/lh |
| Live-Website | https://liebeheilung.de |
| Business-Mail | kontakt@liebeheilung.de |
| MailerLite Account-ID | 2559380 |
| MailerLite Formular-ID | CM6Vxh |
| MailerLite Gruppe | Gratis-Heft — Was du erlebt hast, zählt. |
| Meetergo | https://my.meetergo.com/form/cb039eee-9d0d-4f34-a61f-5a5e1c1f4fde |
| Gratis-Heft PDF | `downloads/was-du-erlebt-hast-zaehlt.pdf` |
| MailerLite-Setup | `_admin/MAILERLITE-CHECKLISTE.md` |
| E-Mail-Texte | `_admin/EMAIL-VORLAGEN.md` |

---

## Wie du diese Datei aktuell hältst

Nach jedem größeren Schritt entweder:
- **selbst editieren** (die Datei ist einfach Markdown), oder
- der **KI sagen**: "Aktualisiere `PROJEKT-STATUS.md` — [was war der Schritt]"
