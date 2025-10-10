/**
 * Make.com Konfiguration
 * Liebe Heilung - Dr. med. Sabrina Kising
 * 
 * ANLEITUNG:
 * 1. Ersetzen Sie 'IHRE_MAKE_WEBHOOK_URL_HIER' durch Ihre echte Make Webhook URL
 * 2. Die URL erhalten Sie in Make.com unter Webhooks -> Custom webhook
 * 3. Speichern Sie diese Datei nach der Änderung
 */

// ✅ Make.com Webhook URL konfiguriert
const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/nemwz0dqwdc75biaulbspitdsaoclgpe';

// Konfiguration anwenden
document.addEventListener('DOMContentLoaded', function() {
    if (window.MakeIntegration && MAKE_WEBHOOK_URL !== 'IHRE_MAKE_WEBHOOK_URL_HIER') {
        window.MakeIntegration.setWebhookUrl(MAKE_WEBHOOK_URL);
        console.log('✅ Make.com Integration konfiguriert');
    } else {
        console.warn('⚠️ Make.com Webhook URL nicht konfiguriert. Bitte js/make-config.js anpassen.');
    }
});