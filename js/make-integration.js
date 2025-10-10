/**
 * Make.com Integration für Kontaktformular
 * Einfache Webhook-Integration
 */

document.addEventListener('DOMContentLoaded', function() {
    // Ihr Make.com Webhook URL - HIER EINTRAGEN!
    const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/IHRE_WEBHOOK_URL_HIER';
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Original Submit Handler überschreiben für Make.com
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Verhindert normales Form Submit
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
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
                    quelle: 'Website Kontaktformular'
                };
                
                // An Make.com senden
                const response = await fetch(MAKE_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    // Erfolg
                    showNotification('Nachricht erfolgreich gesendet!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Make.com Webhook-Fehler');
                }
                
            } catch (error) {
                console.error('Make.com Integration Fehler:', error);
                
                // Fallback: Netlify Forms verwenden
                showNotification('Nachricht wird über Backup-System gesendet...', 'info');
                
                // Netlify Forms als Fallback
                setTimeout(() => {
                    contactForm.removeEventListener('submit', arguments.callee);
                    contactForm.submit();
                }, 1000);
            } finally {
                // Button zurücksetzen
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});

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
        <div class="flex items-center">
            <i class="${icons[type] || icons.info} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Einblenden
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Ausblenden nach 4 Sekunden
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/**
 * Make.com Webhook URL Validator
 */
function validateMakeWebhookUrl(url) {
    const makeUrlPattern = /^https:\/\/hook\.(eu1|us1|us2)\.make\.com\/[a-zA-Z0-9]+$/;
    return makeUrlPattern.test(url);
}

// Export für Testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showNotification, validateMakeWebhookUrl };
}