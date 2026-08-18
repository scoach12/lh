# Checkliste vor Veröffentlichung neuer Inhalte

**Immer durchgehen, bevor ein neuer Blogpost, eine neue Seite oder ein neuer Text online geht.**

Diese Liste ist keine Bevormundung — sie ist deine Absicherung. In 5 Minuten durchgegangen. Rot = potenziell abmahnfähig.

---

## 🔴 Absolut nicht verwenden (Titel + geschützte Begriffe)

| Nicht verwenden | Stattdessen |
|---|---|
| „Psychotherapie" (als eigenes Angebot) | „Begleitung", „psychologische Beratung" |
| „Psychotherapeut/in" (als Selbst-Bezeichnung) | „Fachärztin", „Paar- und Sexualtherapeutin" |
| „Online-Psychotherapie" | „Online-Begleitung" |
| „Systemische Therapie" / „Systemische Therapeutin" | „Paar- und Sexualtherapeutin" (deine echte Ausbildung) |
| „Verhaltenstherapie" / „Tiefenpsychologie" / „Psychoanalyse" (als eigenes Angebot) | Neutrale Umschreibung der Methode |
| „Heilpraktikerin für Psychotherapie" (ohne Erlaubnis) | irrelevant, du bist Ärztin |

**Ausnahme:** Diese Begriffe dürfen im **Disclaimer** verwendet werden, um dein Angebot davon abzugrenzen (z.B. „...ersetzt keine Psychotherapie nach § 1 PsychThG").

---

## 🟡 Heikel — mit Vorsicht formulieren

| Vermeiden | Stattdessen |
|---|---|
| „Online-Behandlung" | „Online-Begleitung" |
| „Ich behandle..." (im therapeutischen Kontext) | „Ich begleite...", „Ich unterstütze...", „Ich arbeite mit..." |
| „Trauma-Therapie" | „Geburtstrauma-Begleitung", „traumasensible Begleitung" |
| „garantiert", „nachweislich", „wissenschaftlich bewiesen", „100 %" | Sachlich beschreibend („Studien zeigen, dass...") |
| „bester", „führender", „einzigartig" | Konkrete, überprüfbare Angaben |
| Absolute Erfolgsversprechen („Sie werden wieder glücklich") | Ergebnis-offen („kann helfen, dass...", „unterstützt dabei, dass...") |
| Preis-Vorteile-Werbung („günstiger als...") | Nicht vergleichend werben |

---

## 🟢 Zulässig und SEO-relevant (bewusst behalten)

- „Paartherapie" / „Paar-Therapie" ✓
- „Sexualtherapie" / „Sexual-Therapie" ✓
- „Paar- und Sexualtherapeutin" ✓
- „Fachärztin für Gynäkologie und Geburtshilfe" ✓
- „Geburtstrauma" (als Zustandsbeschreibung) ✓
- „Online-Begleitung", „Online-Beratung" ✓
- „Begleitung nach der Geburt" ✓

---

## ✅ Vor jedem Publish — 5-Minuten-Check

### 1. Sichtbarer Text (H1, H2, Fließtext, Buttons)
- [ ] Kein „Psychotherapie" / „Psychotherapeut" außerhalb des Disclaimer-Kontexts
- [ ] Kein „Systemische Therapie" / „Systemische Therapeutin"
- [ ] Kein „Online-Behandlung"
- [ ] Kein Heilversprechen („garantiert", „100 %", „nachweislich erfolgreich")
- [ ] Keine 5-Sterne-Grafiken über Testimonials
- [ ] Keine Vergleichsformulierungen mit anderen Anbietern
- [ ] Keine Telefonnummer (Grundsatzentscheidung: nur Kontaktformular + Buchungslink)

### 2. Meta-Tags (im `<head>`)
- [ ] `<title>` enthält keinen geschützten Titel
- [ ] `<meta name="description">` enthält keinen geschützten Titel
- [ ] `<meta name="keywords">` enthält kein „Online-Therapie", „Online-Psychotherapie", „Systemische Therapie"
- [ ] `<meta property="og:title">` und `og:description` geprüft
- [ ] `<meta name="twitter:title">` und `twitter:description` geprüft

### 3. Bilder
- [ ] Alle `alt`-Attribute geprüft — keine geschützten Titel im alt-Text
- [ ] Keine Bildunterschriften mit unbelegten Aussagen

### 4. Schema.org / JSON-LD (strukturierte Daten)
- [ ] `"jobTitle"` enthält nur echte, belegbare Qualifikationen
- [ ] `"name"` und `"description"` von `MedicalTherapy` / `MedicalWebPage` frei von geschützten Titeln (außer wenn zutreffend)
- [ ] `"alternateName"`-Arrays geprüft — keine unerlaubten Synonyme
- [ ] `"medicalSpecialty"` bleibt bei englischen Standardwerten („Gynecology", nicht „Psychotherapy")

### 5. HTML-Kommentare
- [ ] Kommentare (`<!-- ... -->`) enthalten keine kompromittierenden Notizen
- (Kommentare sind für Menschen unsichtbar, aber im Quelltext lesbar)

---

## 🔧 Schneller Selbst-Check im Terminal

Falls du selbst mal prüfen willst — im Repo-Verzeichnis:

```bash
# 1. Verbotene Begriffe im Quelltext suchen
grep -rniE "online[- ]?(psycho)?therap|online-behandl|systemische therap" *.html blog/*.html

# 2. Nur Meta-Keywords prüfen
grep -rn 'name="keywords"' *.html blog/*.html | grep -iE "online-therap|systemische|online-behandl"

# 3. Nur alt-Attribute mit heiklen Begriffen
grep -rn "alt=" *.html blog/*.html | grep -iE "trauma-therap|psychotherap|systemische"
```

**Wenn alle drei Kommandos ohne Ausgabe zurückkehren → sauber.**

---

## 📋 Wenn du unsicher bist

**Frag lieber einmal zu viel.**

- Für **rechtliche Fragen**: Landesärztekammer Bayern → 089 / 4147-0 (kostenlose Erstauskunft)
- Für **technische Fragen** an der Website: Repo-Historie prüfen (`git log`) und siehe `compliance/COMPLIANCE-REPORT.md`
- Bei **Zweifeln zu einem konkreten Text**: Einen Absatz lieber neutraler formulieren statt am Rand des Erlaubten balancieren.

---

## 🛡️ Grundregel

Sachliche Information über deine Leistung ist erlaubt.
Anpreisung, Vergleich, Erfolgsversprechen sind es nicht.
Alles was du sagst, muss belegbar sein.

Wenn du nach dem Motto schreibst: **„Was würde ich einer Kollegin auf einem Fachkongress sagen?"** — dann bist du meistens auf der sicheren Seite.

---

*Version 1.0 · 18.08.2026 · liebeheilung.de*
