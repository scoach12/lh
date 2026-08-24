# Compliance-Report liebeheilung.de

**Stand:** 18.08.2026
**Verantwortlich:** Dr. med. Sabrina Kising
**Fachrichtung:** Fachärztin für Gynäkologie und Geburtshilfe
**Zusatzqualifikation:** Paar- und Sexualtherapeutin (IBD)
**Zweck:** Dokumentierter Nachweis der berufsrechtlichen und wettbewerbsrechtlichen Prüfung und Bereinigung der Website liebeheilung.de.

---

## 1. Rechtliche Grundlage

Die Bereinigung orientiert sich an folgenden Rechtsnormen:

| Norm | Relevanz |
|---|---|
| **§ 27 MBO-Ä** (Musterberufsordnung der Ärzte) | Verbot berufswidriger Werbung; sachliche Information über die berufliche Tätigkeit ist gestattet, anpreisende, irreführende oder vergleichende Werbung ist untersagt. |
| **§ 11 HWG** (Heilmittelwerbegesetz) | Verbot der Werbung mit Patientendarstellungen, Erfolgsmeldungen, Dankschreiben und Empfehlungen außerhalb der Fachkreise. Besondere Anforderungen an fernbehandelnde Werbeaussagen. |
| **§ 5 UWG** (Gesetz gegen den unlauteren Wettbewerb) | Verbot irreführender geschäftlicher Handlungen. Verwendung geschützter Berufsbezeichnungen ohne die entsprechende Qualifikation ist irreführend. |
| **§ 1 PsychThG** (Psychotherapeutengesetz) | „Psychotherapie" als heilkundliche Behandlung ist Approbationsberufen vorbehalten. „Psychotherapeut/in" ist gesetzlich geschützte Berufsbezeichnung. |
| **§ 1 HeilprG** (Heilpraktikergesetz) | Ausübung der Heilkunde ohne Approbation ist erlaubnispflichtig. „Behandlung" ist heilkundliche Tätigkeit. |
| **§ 132 BGB / § 5 TMG** | Impressumspflicht mit korrekter Berufsbezeichnung. |

**Zentrale Erkenntnis:** Auch **Meta-Tags, Keywords, Schema.org-Auszeichnungen und alt-Attribute** im Quelltext sind Werbung im Sinne des UWG. Für Abmahnkanzleien und die Wettbewerbszentrale ist der Quelltext leicht auszulesen und wird routinemäßig geprüft.

---

## 2. Was wurde bereinigt (2 Runden, Aug 2026)

### Runde 1 — Sichtbare Ebene + Meta-Grundbereinigung (Commit `8fb0c5e`, PR #33)

| # | Änderung | Umfang |
|---|---|---|
| 1 | Nav-/Footer-/Menü-Label „Trauma-Therapie" → „Geburtstrauma" | 19 HTML-Dateien, 59 Textstellen. Link zeigt weiter auf `geburtstrauma-begleitung.html` (URL bleibt aus SEO- und Backlink-Gründen unverändert). |
| 2 | Kontaktformular auf 5 Seiten: „Coaching-Bereich" → „Anliegen"; Dropdown „Trauma-Therapie (Nach der Geburt)" → „Geburtstrauma (Nach der Geburt)" | `index.html`, `paar-therapie.html`, `sexual-therapie.html`, `geburtstrauma-begleitung.html`, `ueber-mich.html` |
| 3 | `index.html` Meta-Tags komplett neu (Title, Description, Keywords, OpenGraph, Twitter Card, Schema.org MedicalTherapy-Name, alt-Attribute) | Startseite |
| 4 | `geburtstrauma-begleitung.html`: OpenGraph + Twitter Card getauscht | 4 Meta-Tags |
| 5 | „Online-Therapie" / „Online-Psychotherapie" / „Online-Therapeutin" aus allen Meta-Tags entfernt | `ueber-mich.html`, `paar-therapie.html`, `sexual-therapie.html`, `hebammen-information.html` |
| 6 | Telefonnummer „+49 (0) 89 123 456 789" + „Mo–Fr: 9:00–18:00 Uhr" gelöscht | `geburtstrauma-begleitung.html` |
| 7 | 10 × 5-Sterne-Rating-Grafiken über Testimonials entfernt (Zitate bleiben) | `index.html` (3), `paar-therapie.html` (2), `sexual-therapie.html` (3), `geburtstrauma-begleitung.html` (2) |

### Runde 2 — Tiefe Quelltext-Compliance (Commit `4afd0e5`, PR #33)

| # | Änderung | Umfang |
|---|---|---|
| 1 | „Online-Behandlung" → „Online-Begleitung" (Heilkunde-Wortlaut vermieden) | 5 Stellen: `sexual-therapie.html` (twitter:desc + Schema.org), `paar-therapie.html` (twitter:desc + Schema.org), `geburtstrauma-begleitung.html` (mehrere), `hebammen-information.html` (Schema.org) |
| 2 | Schema.org `alternateName`-Arrays: **nur** Trauma-Varianten raus, Paar-/Sexualtherapie-SEO-Begriffe bewusst behalten | `geburtstrauma-begleitung.html` (jetzt: „Begleitung bei Geburtstrauma", „traumasensible Begleitung nach der Geburt") |
| 3 | „Systemische Therapie" / „Systemische Therapeutin" entfernt (nicht zertifiziertes Richtlinienverfahren) | 4 Stellen: `blog/index.html` (title + desc), `blog/artikel-template.html` (jobTitle Schema.org + Autoren-Bio), `blog/erste-schritte-aus-der-beziehungskrise.html` (jobTitle + keyword + H4 + Absatz) |
| 4 | „Trauma-, Paar- und Sexualtherapie" → „Begleitung bei Geburtstrauma, Paar- und Sexualtherapie" | `kontakt.html` meta-description |
| 5 | alt-Attribute mit „Trauma-Therapie" | `geburtstrauma-begleitung.html` (2 Bilder) |

---

## 3. Was bewusst BLEIBT (mit Begründung)

Nicht alles wurde entfernt — bewusst nicht. Grund: Sachliche Berufsbezeichnungen sind zulässig und SEO-relevant.

| Was bleibt | Warum |
|---|---|
| „Paartherapie" / „Paar-Therapie" (Seitentitel, H1, keywords, alternateName) | Keine geschützte Berufsbezeichnung. Als Paar- und Sexualtherapeutin (IBD-Ausbildung) bist du zur Führung berechtigt. |
| „Sexualtherapie" / „Sexual-Therapie" (Seitentitel, H1, keywords, alternateName) | Ebenfalls kein geschützter Titel; deine Ausbildung deckt das ab. |
| „Paartherapie online" / „Sexualtherapie online" in Meta-Keywords und `alternateName` | Zentrale Suchanfragen — Frauen googeln nicht „Paarberatung", sondern „Paartherapie". Ohne diese Begriffe wärst du für deine Zielgruppe unauffindbar. Sachliche Werbung mit realer Leistung ist erlaubt. |
| „Fachärztin für Gynäkologie und Geburtshilfe" | Belegter Facharzttitel. |
| „Paar- und Sexualtherapeutin" (im jobTitle Schema.org und in Autoren-Bios) | Belegte Zusatzqualifikation. |
| „Psychotherapeuten" als **Zielgruppen-Ansprache** auf `hebammen-information.html` | Rechtlich korrekte Nennung einer Berufsgruppe, an die sich die Seite richtet — kein Selbst-Etikett. |
| Disclaimer auf `ueber-mich.html`: „...ist ein beratendes und unterstützendes Angebot. Es ersetzt keine Psychotherapie nach dem Psychotherapeutengesetz (§ 1 PsychThG) und keine ärztliche Behandlung. Es erfolgt keine Diagnosestellung." | **Absichtliche und korrekte** Verwendung — grenzt das Angebot rechtssicher gegen Psychotherapie ab. |
| URL-Pfad `geburtstrauma-begleitung.html` (Dateiname) | Nicht öffentlich sichtbar. Änderung würde Backlinks brechen und Google-Ranking kosten. Nur die anzeigten Labels wurden auf „Geburtstrauma" umgestellt. |
| Der Claim „Heilung beginnt da, wo Liebe Raum bekommt." | Poetischer Markenclaim (`Liebe & Heilung`), kein Heilversprechen im Sinne des HWG. |

---

## 4. Verifikation (grep-Sweeps am 18.08.2026)

Nach Abschluss beider Runden systematisch geprüft:

```
Suche                                    Treffer
--------------------------------------  --------
"Online-Behandlung"                          0 ✓
"Online-Therapie" / "Online-Psychotherapie"  0 ✓
"Online-Therapeutin"                         0 ✓
"Systemische Therapie" / "S. Therapeutin"    0 ✓
sichtbares "Trauma-Therapie" (nicht URL)     0 ✓
5-Sterne-Testimonial-Grafiken                0 ✓
Telefonnummer                                0 ✓
```

---

## 5. Was bei einer Anfrage / Abmahnung zu tun ist

**Wenn eine Abmahnung, Beschwerde oder Anfrage einer Wettbewerbszentrale eingeht:**

1. **Ruhe bewahren.** Keine sofortige Reaktion, keine Unterschrift unter Unterlassungserklärungen ohne anwaltliche Prüfung.
2. **Sofort dokumentieren** — Screenshot der Abmahnung, Datum, Absender, kompletter Text.
3. **Dieses Dokument bereithalten** — es zeigt: Systematische, dokumentierte Compliance-Prüfung fand statt. Das ist ein wichtiges Argument gegen den Vorwurf der Vorsätzlichkeit.
4. **Commit-Historie im Repo prüfen** — bei GitHub unter `https://github.com/scoach12/lh/commits/main` sind alle Änderungen mit Datum und Autor versioniert. Das ist ein **gerichtsverwertbarer Nachweis**, wann etwas geändert wurde.
5. **Anwalt einschalten** — spezialisiert auf Medizinrecht/Wettbewerbsrecht. Nicht der allgemeine Hausanwalt.
6. **Frist prüfen** — Abmahnungen setzen meist kurze Fristen (oft 3–7 Tage). Diese Frist ist meistens verhandelbar, aber muss beachtet werden.

**Adressen für eine schnelle anwaltliche Erstberatung im Medizinrecht:**
- Landesärztekammer (LÄK) → hat oft kostenlose Erstberatung für Mitglieder
- Deutsche Gesellschaft für Medizinrecht (DGMR) → Anwaltssuche

---

## 6. Referenzen im Repo

| Datei | Zweck |
|---|---|
| `compliance/COMPLIANCE-REPORT.md` | Dieses Dokument |
| `compliance/CHECKLISTE-NEUE-INHALTE.md` | Prüfliste vor jedem neuen Blogpost / jeder Änderung |
| Git-Commits `8fb0c5e` und `4afd0e5` | Die technische Umsetzung der Compliance-Runden |
| PR #33 auf GitHub | https://github.com/scoach12/lh/pull/33 |

---

*Erstellt: 18.08.2026 · liebeheilung.de · Dr. med. Sabrina Kising*
