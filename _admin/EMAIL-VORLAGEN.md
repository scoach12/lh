# E-Mail-Vorlagen für den Gratis-Heft-Funnel

Zwei Mails. Beide schon im "du"-Ton, passend zu deiner Website.
Du kannst sie 1:1 in MailerLite kopieren — Platzhalter mit `{{...}}` werden automatisch ersetzt.

---

## 1) Bestätigungsmail (Double-Opt-In)

Diese Mail geht direkt nach dem Eintragen raus.
**Wo einfügen:** Forms → deine Landingpage → Confirmation email

### Absender
- **From-Name:** Dr. Sabrina Kising
- **From-Email:** kontakt@liebeheilung.de
- **Reply-to:** kontakt@liebeheilung.de

### Betreff (eine Zeile)
```
Kurz noch bestätigen – dann kommt dein Heft
```

### Vorschautext (Preview)
```
Ein Klick, dann ist es unterwegs zu dir.
```

### Text der Mail

```
Hallo {{fields.name|default:""}},

schön, dass du da bist.

Bevor ich dir das Heft schicken darf, brauche ich noch ein
kurzes „Ja" von dir. So stelle ich sicher, dass wirklich du
diese Anmeldung ausgelöst hast – und nicht jemand anderes
für dich.

Ein Klick genügt:

👉 [Ja, ich möchte das Heft erhalten](CONFIRM_LINK)

Danach ist es unterwegs zu dir.

Wenn du dich nicht angemeldet hast, ignoriere diese Mail einfach –
dann passiert nichts weiter.

Herzlich,
Sabrina

---
Dr. Sabrina Kising · Liebe und Heilung
Fachärztin, Paar- und Sexualtherapeutin
https://liebeheilung.de
```

**Wichtig in MailerLite:** Der Button/Link `CONFIRM_LINK` wird automatisch durch das echte Bestätigungs-Element ersetzt (in MailerLite meist als spezieller `{$confirmation_link}`-Platzhalter oder als Standard-Button — schau in der aktuellen Version, welchen Namen der hat, wenn du den Editor öffnest).

---

## 2) Willkommensmail mit Heft-Zustellung

Diese Mail geht ca. 5 Minuten nach der Bestätigung raus.
**Wo einfügen:** Automations → „Gratis-Heft-Zustellung" → Email-Step

### Absender
- **From-Name:** Dr. Sabrina Kising
- **From-Email:** kontakt@liebeheilung.de
- **Reply-to:** kontakt@liebeheilung.de

### Betreff
```
Da ist es – dein Heft. Und ein Gedanke dazu.
```

### Vorschautext
```
Was du erlebt hast, zählt. Nimm dir kurz Zeit.
```

### Text der Mail

```
Hallo {{fields.name|default:""}},

hier ist es – dein Heft.

👉 [Heft öffnen und lesen (PDF)](PDF_LINK)

Sechs Seiten. Ohne Ratgeberstimme.
Nichts, was du tun musst.
Nur das, was ich dir gerne persönlich sagen würde,
wenn wir uns gegenübersitzen könnten.

Vielleicht liest du es jetzt gleich.
Vielleicht speicherst du es dir für einen Moment,
in dem du kurz nichts mehr weißt.
Beides ist richtig.

---

Und wenn du magst –
und wirklich nur, wenn du magst:

Schreib mir eine Zeile zurück.

Was trägst du gerade?
Was bringt dich her?

Ich lese jede Antwort. Selbst.
Ich verspreche keinen langen Austausch –
aber ich verspreche, dass ich dich lese.

Herzlich,
Sabrina

---
Dr. Sabrina Kising · Liebe und Heilung
Fachärztin für Frauenheilkunde und Geburtshilfe
Paar- und Sexualtherapeutin

📞 +49 (0) 30 12345678
✉️ kontakt@liebeheilung.de
🌐 https://liebeheilung.de

Du erhältst diese E-Mail, weil du dich für mein Gratis-Heft
angemeldet hast. Wenn du keine weiteren Nachrichten von mir
erhalten möchtest: {$unsubscribe} (dieser Platzhalter wird
in MailerLite automatisch gesetzt).
```

**Wichtig:**
- **PDF_LINK** ersetzt du durch den echten Link zu deinem PDF in MailerLite.
  Option A (empfohlen): PDF in MailerLite hochladen, dort automatisch generierten Link nehmen.
  Option B: PDF im Website-Repo unter `downloads/was-du-erlebt-hast-zaehlt.pdf` — Link wäre dann:
  `https://liebeheilung.de/downloads/was-du-erlebt-hast-zaehlt.pdf`
- **{$unsubscribe}** — dieser Platzhalter setzt MailerLite automatisch.
  Wichtig für DSGVO-Konformität!

---

## Kleiner Tipp zur Ansprache

Beide Mails sind bewusst **nicht überladen**. Kein Farbfeuerwerk, kein „P.S. Achtung, Angebot!".
Das passt zu deinem Ton auf der Website: **still, warm, präsent**.

Wenn du später eine Nurture-Sequenz aufbaust (mehrere Mails über Wochen),
halten wir denselben Ton durch. Sag Bescheid, wenn du soweit bist – dann
schreibe ich dir die weiteren Mails.

---

## Test-Ablauf (nachdem alles eingerichtet ist)

1. Melde dich **mit einer Test-Adresse** (nicht deiner Business-Mail) selbst an
2. **Bestätigungsmail** prüfen — kommt sie? Sieht sie schön aus?
3. Klick auf den Bestätigungslink
4. Warte 5 Minuten (Automation-Delay)
5. **Willkommensmail** prüfen — kommt sie? Ist das PDF anhänglich/verlinkt?
6. Klick auf den Abmelde-Link — funktioniert er?

Wenn alle 6 Schritte klappen: **Der Funnel läuft.** 🎉
