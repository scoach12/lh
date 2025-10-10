# 📝 Blog-System Anleitung

## Einfache Blog-Artikel erstellen - OHNE HTML!

Ihr neues Blog-System ermöglicht es Ihnen, Artikel in **Markdown** zu schreiben - einer sehr einfachen Textformatierung, die automatisch in schöne HTML-Seiten umgewandelt wird.

## 🚀 So funktioniert es

### 1. Artikel in der blog.html Datei hinzufügen

Öffnen Sie die Datei `blog.html` und suchen Sie das JavaScript Array `blogArticles` (etwa Zeile 200). Hier fügen Sie neue Artikel hinzu.

### 2. Neuen Artikel hinzufügen

Kopieren Sie dieses Template und fügen Sie es in das `blogArticles` Array ein:

```javascript
{
    id: 'ihr-artikel-name',           // Eindeutige ID (nur Buchstaben, Zahlen, Bindestriche)
    title: 'Ihr Artikel Titel',      // Der Haupttitel des Artikels
    excerpt: 'Kurze Beschreibung des Artikels für die Übersicht.',  // Vorschautext
    date: '2024-03-20',              // Datum im Format YYYY-MM-DD
    readTime: '5 Min',               // Geschätzte Lesezeit
    content: `# Ihr Artikel Titel

Hier schreiben Sie Ihren Artikel in Markdown...

## Überschrift 2

Text mit **fettgedruckten** und *kursiven* Wörtern.

### Überschrift 3

- Aufzählungspunkt 1
- Aufzählungspunkt 2

> "Ein inspirierendes Zitat"

Weiterer Text...`
}
```

## 📝 Markdown-Formatierung Cheat Sheet

### Überschriften
```
# Hauptüberschrift (H1)
## Zwischenüberschrift (H2)  
### Kleinere Überschrift (H3)
```

### Textformatierung
```
**Fettgedruckt**
*Kursiv*
***Fett und kursiv***
```

### Listen
```
Aufzählung:
- Punkt 1
- Punkt 2
- Punkt 3

Nummerierte Liste:
1. Erster Punkt
2. Zweiter Punkt
3. Dritter Punkt
```

### Zitate
```
> "Dies ist ein Zitat oder wichtiger Gedanke"
```

### Absätze
```
Ein Absatz Text.

Ein neuer Absatz (durch Leerzeile getrennt).
```

## 🎨 Automatische Styling

Ihr Blog-System wendet automatisch das Orange-Emerald Design auf alle Artikel an:
- Überschriften werden entsprechend formatiert
- Zitate erhalten einen orangenen Rahmen
- Links und Hervorhebungen nutzen die Website-Farben
- Responsive Design für alle Geräte

## 📋 Beispiel-Workflow

1. **Neuen Artikel planen**: Überlegen Sie sich Titel und Inhalt
2. **Markdown schreiben**: Nutzen Sie die Vorlage `blog/artikel-vorlage.md` als Orientierung
3. **Artikel hinzufügen**: Kopieren Sie das Template und füllen Sie es aus
4. **In blog.html einfügen**: Fügen Sie das neue Artikel-Objekt zum `blogArticles` Array hinzu
5. **Testen**: Öffnen Sie blog.html im Browser und prüfen Sie das Ergebnis

## ⚠️ Wichtige Hinweise

- **Eindeutige IDs**: Jeder Artikel braucht eine einzigartige `id`
- **Datum Format**: Verwenden Sie immer YYYY-MM-DD (z.B. 2024-03-20)
- **Anführungszeichen**: Verwenden Sie `\`` (Backticks) für den `content` Bereich
- **Sonderzeichen**: Setzen Sie Backslash vor Anführungszeichen im Text: `\"`

## 🔧 Beispiel-Artikel im Code

```javascript
{
    id: 'selbstliebe-lernen',
    title: 'Selbstliebe lernen: Ein Weg zu mehr Zufriedenheit',
    excerpt: 'Selbstliebe ist kein Egoismus, sondern die Grundlage für gesunde Beziehungen zu anderen.',
    date: '2024-03-20',
    readTime: '7 Min',
    content: `# Selbstliebe lernen: Ein Weg zu mehr Zufriedenheit

Selbstliebe wird oft missverstanden. Es geht nicht um Narzissmus oder Egoismus, sondern um eine gesunde Beziehung zu sich selbst.

## Was ist Selbstliebe?

Selbstliebe bedeutet:

- **Sich selbst akzeptieren** mit allen Stärken und Schwächen
- **Grenzen setzen** und diese respektieren  
- **Mitgefühl mit sich haben** in schwierigen Zeiten
- **Für sich sorgen** wie für einen guten Freund

## Praktische Schritte

### 1. Negative Selbstgespräche erkennen

> "Achten Sie darauf, wie Sie mit sich selbst sprechen. Würden Sie so mit einem Freund reden?"

### 2. Tägliche Selbstfürsorge-Rituale

- Morgens: 5 Minuten Dankbarkeit praktizieren
- Mittags: Bewusste Pause einlegen
- Abends: Erfolge des Tages würdigen

### 3. Grenzen setzen lernen

Es ist okay, **Nein** zu sagen wenn:
- Sie überfordert sind
- Etwas gegen Ihre Werte geht
- Sie Zeit für sich brauchen

*Selbstliebe ist eine lebenslange Reise, kein Ziel. Seien Sie geduldig mit sich und feiern Sie jeden kleinen Fortschritt.*`
}
```

## 🌟 Tipps für gute Blog-Artikel

1. **Persönlich schreiben**: Nutzen Sie Ihre Erfahrung als Therapeutin
2. **Praktische Tipps geben**: Konkrete Hilfestellungen sind wertvoll
3. **Empathisch sein**: Zeigen Sie Verständnis für die Herausforderungen Ihrer Leser
4. **Struktur nutzen**: Klare Überschriften und Absätze erleichtern das Lesen
5. **Call-to-Action**: Ermutigen Sie Leser, professionelle Hilfe zu suchen wenn nötig

## 📞 Support

Bei Fragen zum Blog-System können Sie sich jederzeit melden. Das System ist so konzipiert, dass Sie sich auf das Schreiben konzentrieren können - um die technische Darstellung kümmert sich die Website automatisch!