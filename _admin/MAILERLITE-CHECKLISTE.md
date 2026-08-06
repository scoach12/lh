# MailerLite-Setup — Schritt-für-Schritt für Sabrina

Alles, was du brauchst, damit dein Gratis-Heft-Funnel läuft.
Zeitaufwand: **ca. 45–60 Minuten**, komplett kostenlos.

---

## Vorbereitung (5 Min)

Halte bereit:
- Deine Business-E-Mail-Adresse (`kontakt@liebeheilung.de`)
- Das Gratis-Heft als PDF (`Was_du_erlebt_hast_zaehlt.pdf`)
- Ein Profilbild von dir (kann später ergänzt werden)
- Ausweisdaten (nur falls MailerLite eine Identitätsprüfung verlangt — meist nicht nötig)

---

## Schritt 1 — Account anlegen (5 Min)

1. Gehe auf **https://www.mailerlite.com/de**
2. Klick oben rechts auf **„Kostenlos starten"**
3. Trage ein:
   - Deine E-Mail-Adresse
   - Ein starkes Passwort
   - Firmenname: `Dr. Sabrina Kising · Liebe und Heilung`
   - Website: `https://liebeheilung.de`
4. Bestätige die E-Mail (Link in deinem Posteingang anklicken)
5. Wähle beim ersten Login:
   - Branche: **„Coaching / Beratung / Consulting"**
   - Kontakte: **„weniger als 500"** (das ist die kostenlose Stufe)

**Fertig, wenn:** Du im Dashboard bist.

---

## Schritt 2 — Absender-Domain verifizieren (10 Min)

Damit deine E-Mails nicht im Spam landen.

1. Gehe zu **Account → Domains**
2. Klick auf **„Domain hinzufügen"**
3. Gib ein: `liebeheilung.de`
4. MailerLite zeigt dir jetzt **zwei DNS-Einträge** (SPF und DKIM) — kopiere sie
5. Logge dich in dein **Cloudflare-Konto** ein (dort verwaltest du liebeheilung.de)
6. Gehe zu **DNS → Records → „Add record"** und trage beide TXT-Einträge ein
7. Zurück zu MailerLite, klick **„Verify"**

**Falls das zu technisch wird:** Sag mir Bescheid — ich helfe dir mit den DNS-Einträgen konkret weiter, sobald du die Werte von MailerLite hast.

**Fertig, wenn:** Bei der Domain ein grüner Haken steht.

---

## Schritt 3 — DPA / AVV (Datenverarbeitungsvertrag) sichern (2 Min) ⚠️ PFLICHT

**Wichtige Änderung (Stand August 2026):** MailerLite hat den separaten AVV-Prozess
abgeschafft. Der DPA ist jetzt **fester Bestandteil der AGB**. Sobald du die
Nutzungsbedingungen bei der Anmeldung akzeptiert hast, ist der DPA
**automatisch geschlossen**. Es gibt keinen "Sign"-Button mehr im Dashboard.

**Für deine Datenschutz-Akte brauchst du trotzdem eine schriftliche Kopie:**

1. Öffne im Browser: **https://www.mailerlite.com/legal/data-processing-agreement**
2. `Strg + P` → **„Als PDF speichern"**
3. Speichern als: `MailerLite-DPA-JJJJ-MM-TT.pdf`
4. Ablegen in deine Datenschutz-Akte (z.B. Ordner „DSGVO / AVVs")

**Für Behörden / Kontrollen** sichere zusätzlich:
- Screenshot oder E-Mail der MailerLite-Anmelde-Bestätigung (Betreff „Welcome to MailerLite")
- Das gespeicherte DPA-PDF

Beides zusammen belegt: Du hast am Anmeldedatum die AGB inklusive DPA akzeptiert.

**Fertig, wenn:** Das DPA-PDF in deinen Unterlagen liegt.

---

## Schritt 4 — Gruppe „Gratis-Heft" anlegen (2 Min)

Eine „Gruppe" ist wie ein Ordner für deine Kontakte.

1. Gehe zu **Subscribers → Groups**
2. Klick **„Create group"**
3. Name: `Gratis-Heft — Was du erlebt hast, zählt.`
4. Speichern

---

## Schritt 5 — Formular anlegen (10 Min)

Das ist die eigentliche Anmelde-Seite.

1. Gehe zu **Forms → Landing pages**
2. Klick **„Create landing page"**
3. Name: `Gratis-Heft Landingpage`
4. Wähle **Template** — nimm eins mit hellem, ruhigem Design (z.B. „Simple" oder „Bold")
5. **Formularfelder festlegen:**
   - Name: **„Vorname"** (Pflichtfeld)
   - Email: **„E-Mail-Adresse"** (Pflichtfeld)
   - Alle anderen Standardfelder **entfernen**
6. **DSGVO-Zustimmung** (unter Form settings → GDPR):
   - Häkchen bei **„Enable GDPR fields"**
   - Text der Checkbox:
     > Ja, ich möchte das Heft „Was du erlebt hast, zählt." kostenlos per E-Mail erhalten und Sabrinas Impulse zu Geburtserlebnis, Beziehung und Selbst gelegentlich in meinem Postfach lesen. Meine Zustimmung kann ich jederzeit widerrufen. Details in der [Datenschutzerklärung](https://liebeheilung.de/datenschutz.html#newsletter).
7. **Double-Opt-In** (unter Form settings → Confirmation):
   - **AN**schalten! (Standardmäßig aktiv, überprüfen)
8. **Danach-Seite** (unter „Success page"):
   - Optional: „Danke — bitte prüfe dein Postfach und bestätige die Anmeldung."
   - Empfohlen: **weiterleiten** zu `https://liebeheilung.de/danke.html` (bauen wir später)
9. **Gruppe zuweisen:** Alle Anmelder gehen in die Gruppe `Gratis-Heft — Was du erlebt hast, zählt.`

**Landingpage veröffentlichen:**
10. Ganz oben rechts: **„Publish"**
11. Kopiere die **URL** (z.B. `https://sabrinakising.mailerlite.io/gratis-heft`)
12. **Diese URL schickst du mir** — ich trage sie an einer Stelle im Website-Code ein.

**Fertig, wenn:** Die Landingpage öffnet und du dich testweise selbst eintragen kannst.

---

## Schritt 6 — Automation „Gratis-Heft-Zustellung" (15 Min)

Das ist das Herzstück: Wer sich einträgt, bekommt automatisch das PDF.

1. Gehe zu **Automations → Create new automation**
2. Name: `Gratis-Heft-Zustellung`
3. **Trigger:** „When subscriber joins a group"
4. **Group:** `Gratis-Heft — Was du erlebt hast, zählt.`
5. **Wait time:** 5 Minuten (damit die Willkommens-E-Mail nicht in derselben Sekunde wie die Double-Opt-In-Bestätigung kommt)
6. Klick auf **„+" → „Email"**
7. **Betreff und Text** siehe unten in `_admin/EMAIL-VORLAGEN.md` (Willkommensmail)
8. **PDF als Datei-Anhang** hochladen:
   - Beim Erstellen der E-Mail: „Attach file" → PDF hochladen
   - Alternativ (empfohlen!): PDF als **Link** einbetten (kleinere Mail, keine Spam-Probleme)
9. **Speichern und aktivieren** (Toggle oben rechts auf „On")

**Fertig, wenn:** Du dich selbst testweise einträgst und die Mail mit PDF erhältst.

---

## Schritt 7 — Bestätigungsmail (Double-Opt-In) anpassen (5 Min)

Die Mail, die kommt, BEVOR sie in deiner Liste ist.

1. Gehe zu **Forms → deine Landingpage → Confirmation email**
2. Ersetze den Standard-Text durch deinen (siehe `_admin/EMAIL-VORLAGEN.md`, Abschnitt „Bestätigungsmail")
3. Speichern

---

## Schritt 8 — URL an mich weitergeben

Sobald deine Landingpage steht, gib mir:
- Die **Landingpage-URL** (z.B. `https://sabrinakising.mailerlite.io/gratis-heft`)

Ich trage sie an **einer einzigen Stelle** in `index.html` ein, alles ist verbunden.

---

## Schritt 9 — Für Instagram nutzen

Sobald der Funnel läuft:

1. Deine **Landingpage-URL kürzen** (optional) — mit `bit.ly` oder `kurzelinks.de`:
   Bsp. `bit.ly/gratis-heft-sabrina`
2. In Instagram-**Bio** eintragen: „**Kostenloses Heft: bit.ly/gratis-heft-sabrina** 🎁"
3. In Reels und Posts sagen: „Link in Bio" oder „Kommentiere HEFT und ich schick dir den Link"

**Vorteil:** Egal ob jemand von deiner Website ODER von Instagram kommt — beide landen auf DERSELBEN Landingpage. Du siehst in den MailerLite-Statistiken sogar, wie viele über welchen Kanal kamen.

---

## Optional (später): Nurture-Sequenz aufbauen

Nach der Willkommensmail kannst du automatisch weitere Mails schicken lassen —
z.B. eine Mail pro Woche über 4–6 Wochen. Das ist der eigentliche **Funnel**.
Sag Bescheid, wenn du dahin willst — ich helfe dir dann mit Inhalten und Struktur.

---

## Häufige Probleme

**„Meine Mails landen im Spam"**
→ Domain-Verifizierung (Schritt 2) unbedingt abschließen.

**„Der Absender heißt komisch"**
→ Bei jeder Automation: **Sender = deine Adresse mit vollem Namen** setzen:
`Dr. Sabrina Kising <kontakt@liebeheilung.de>`

**„Ich sehe keine Anmeldungen"**
→ Prüfe: Ist das Formular veröffentlicht (nicht nur gespeichert)?
Hast du die Gruppe zugewiesen? Ist die Automation aktiv?

---

**Bei Fragen:** Sag mir Bescheid, ich helfe dir Schritt für Schritt weiter.
