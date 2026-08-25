/**
 * PDF-Generator für das Heft "Dein Körper sagt Nein"
 * Nutzt Puppeteer, um das HTML-Template als A4-PDF zu rendern.
 *
 * Aufruf: node generate-pdf.js
 * Output: downloads/dein-koerper-sagt-nein.pdf
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    const inputHtml = path.resolve(__dirname, 'heft/dein-koerper-sagt-nein.html');
    const outputPdf = path.resolve(__dirname, 'downloads/dein-koerper-sagt-nein.pdf');

    // Sicherstellen, dass der Output-Ordner existiert
    fs.mkdirSync(path.dirname(outputPdf), { recursive: true });

    console.log('→ Puppeteer starten...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--font-render-hinting=none'
        ]
    });

    const page = await browser.newPage();

    // Wichtig für Bilder: file:// als Basis
    console.log('→ HTML laden...');
    await page.goto('file://' + inputHtml, {
        waitUntil: 'networkidle0',
        timeout: 60000
    });

    // Kurz warten, damit Google Fonts + Bilder sicher geladen sind
    await new Promise(r => setTimeout(r, 2500));

    console.log('→ PDF generieren...');
    await page.pdf({
        path: outputPdf,
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        preferCSSPageSize: true
    });

    await browser.close();

    const stats = fs.statSync(outputPdf);
    console.log('✓ PDF erstellt:', outputPdf);
    console.log('  Größe:', (stats.size / 1024).toFixed(1), 'KB');
})();
