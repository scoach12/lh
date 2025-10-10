/**
 * Make.com Integration OHNE Netlify
 * Reine Make.com-Lösung für Kontaktformular
 */

document.addEventListener('DOMContentLoaded', function() {
    // Ihr Make.com Webhook URL - KONFIGURIERT!
    const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/nemwz0dqwdc75biaulbspitdsaoclgpe';
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Netlify-Attribute entfernen
        contactForm.removeAttribute('data-netlify');
        contactForm.removeAttribute('method');
        contactForm.removeAttribute('name');
        
        // Hidden input für Netlify entfernen
        const netlifyInput = contactForm.querySelector('input[name="form-name"]');
        if (netlifyInput) {
            netlifyInput.remove();
        }
        
        // Make.com Submit Handler
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Verhindert normales Form Submit
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Validierung vor dem Senden
            if (!validateForm(contactForm)) {
                showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
                return;
            }
            
            // Loading State
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird gesendet...';
            submitButton.disabled = true;
            
            try {
                // Form-Daten sammeln
                const formData = new FormData(contactForm);
                const data = {
                    vorname: formData.get('firstname'),
                    nachname: formData.get('lastname'),
                    email: formData.get('email'),
                    service: formData.get('service'),
                    nachricht: formData.get('message'),
                    datenschutz: formData.get('privacy') ? 'Zugestimmt' : 'Nicht zugestimmt',
                    zeitstempel: new Date().toISOString(),
                    quelle: 'Website Kontaktformular',
                    browserInfo: {
                        userAgent: navigator.userAgent,
                        sprache: navigator.language,
                        zeitzone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    }
                };
                
                // An Make.com senden
                const response = await fetch(MAKE_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok || response.status === 200) {
                    // Erfolg
                    showNotification('✅ Nachricht erfolgreich gesendet! Wir melden uns innerhalb von 24 Stunden bei Ihnen.', 'success');
                    contactForm.reset();
                    
                    // Optional: Google Analytics Event
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submit', {
                            event_category: 'Contact',
                            event_label: 'Contact Form'
                        });
                    }
                    
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
            } catch (error) {
                console.error('Make.com Integration Fehler:', error);
                
                // Detaillierte Fehlermeldung
                let errorMessage = 'Entschuldigung, es gab ein technisches Problem. ';
                
                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    errorMessage += 'Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.';
                } else if (error.message.includes('CORS')) {
                    errorMessage += 'Es gab ein Konfigurationsproblem. Bitte kontaktieren Sie uns direkt per E-Mail.';
                } else {
                    errorMessage += 'Bitte versuchen Sie es in wenigen Minuten erneut oder kontaktieren Sie uns direkt.';
                }
                
                showNotification(errorMessage, 'error');
                
                // E-Mail-Fallback anzeigen
                showEmailFallback(formData);
                
            } finally {
                // Button zurücksetzen
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});

/**
 * Formular-Validierung
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
            field.classList.remove('border-gray-300');
        } else {
            field.classList.remove('border-red-500');
            field.classList.add('border-gray-300');
        }
    });
    
    // E-Mail Format prüfen
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('border-red-500');
        }
    }
    
    return isValid;
}

/**
 * E-Mail Fallback anzeigen
 */
function showEmailFallback(formData) {
    const data = {
        vorname: formData.get('firstname'),
        nachname: formData.get('lastname'),
        email: formData.get('email'),
        service: formData.get('service'),
        nachricht: formData.get('message')
    };
    
    const emailBody = `Hallo,
    
hier sind meine Kontaktdaten von der Website:

Name: ${data.vorname} ${data.nachname}
E-Mail: ${data.email}
Gewünschter Service: ${data.service}

Meine Nachricht:
${data.nachricht}

Bitte melden Sie sich bei mir.

Viele Grüße
${data.vorname}`;
    
    const emailSubject = `Kontaktanfrage von ${data.vorname} ${data.nachname}`;
    const mailtoLink = `mailto:kontakt@liebe-heilung.de?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Fallback-Notification mit E-Mail-Link
    const fallbackNotification = document.createElement('div');
    fallbackNotification.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    fallbackNotification.innerHTML = `
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div class="text-center mb-4">
                <i class="fas fa-envelope text-orange-500 text-4xl mb-3"></i>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Alternative Kontaktmöglichkeit</h3>
                <p class="text-gray-600 text-sm mb-4">
                    Das Formular konnte nicht gesendet werden. Sie können uns auch direkt eine E-Mail schreiben:
                </p>
            </div>
            <div class="space-y-3">
                <a href="${mailtoLink}" class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    <i class="fas fa-envelope mr-2"></i>
                    E-Mail-Programm öffnen
                </a>
                <div class="text-center text-sm text-gray-500">
                    <p>Oder schreiben Sie direkt an:</p>
                    <p class="font-medium text-orange-500">kontakt@liebe-heilung.de</p>
                </div>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                    Schließen
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(fallbackNotification);
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    // Erstelle Notification Element
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white max-w-sm transition-all duration-300 transform translate-x-full`;
    
    // Farben je nach Type
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };
    
    notification.classList.add(colors[type] || colors.info);
    
    // Icons je nach Type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <div class="flex items-start">
            <i class="${icons[type] || icons.info} mr-3 mt-1"></i>
            <span class="text-sm leading-relaxed">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Einblenden
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Ausblenden nach längerer Zeit bei Erfolg/Info
    const duration = type === 'success' ? 6000 : (type === 'error' ? 8000 : 4000);
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

/**
 * Make.com Webhook URL Validator
 */
function validateMakeWebhookUrl(url) {
    const makeUrlPattern = /^https:\/\/hook\.(eu1|eu2|us1|us2)\.make\.com\/[a-zA-Z0-9]+$/;
    return makeUrlPattern.test(url);
}

// Webhook URL auf Korrektheit prüfen beim Laden
document.addEventListener('DOMContentLoaded', function() {
    const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/nemwz0dqwdc75biaulbspitdsaoclgpe';
    
    if (MAKE_WEBHOOK_URL.includes('IHRE_WEBHOOK_URL_HIER')) {
        console.warn('⚠️ Make.com Webhook URL noch nicht konfiguriert! Bitte tragen Sie Ihre echte Webhook-URL ein.');
    } else if (!validateMakeWebhookUrl(MAKE_WEBHOOK_URL)) {
        console.error('❌ Ungültige Make.com Webhook URL! Format sollte sein: https://hook.eu2.make.com/[ID]');
    } else {
        console.log('✅ Make.com Integration bereit!');
    }
});

// Export für Testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showNotification, validateMakeWebhookUrl, validateForm };
}